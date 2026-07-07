import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { loadLuminaConfig, writeLuminaMap, writeRenderManifest, writeRoutesManifest } from "@lumina/compiler";
import type { LuminaAdapter, NormalizedLuminaConfig, RouteNode } from "@lumina/core";
import { getAffectedRoutes } from "@lumina/map";
import { createElement, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { createServer, type ModuleNode, type ViteDevServer } from "vite";

export const luminaVitePluginStatus = {
  name: "@lumina/vite-plugin",
  phase: "implemented",
  implementsRuntimeBehavior: true,
} as const;

export type LuminaDevServerOptions = {
  appRoot: string;
  host?: string;
  port?: number;
  logLevel?: "info" | "warn" | "error" | "silent";
};

export type LuminaDevServer = {
  url: string;
  routes: RouteNode[];
  phases: LuminaBuildPhase[];
  durationMs: number;
  close: () => Promise<void>;
};

export type LuminaBuildResult = {
  routes: RouteNode[];
  outputs: string[];
  manifests: string[];
  diagnostics: unknown[];
  phases: LuminaBuildPhase[];
  durationMs: number;
};

export type LuminaBuildPhase = {
  name: string;
  durationMs: number;
  status: "ok";
};

type RouteParams = Record<string, string | string[]>;
type SearchParams = Record<string, string | string[]>;

type RouteMatch = {
  route: RouteNode;
  params: RouteParams;
};

const virtualRoutesModuleId = "virtual:lumina/routes";
const resolvedVirtualRoutesModuleId = `\0${virtualRoutesModuleId}`;
const buildLocks = new Map<string, Promise<void>>();

export async function startLuminaDevServer(options: LuminaDevServerOptions): Promise<LuminaDevServer> {
  const devStartedAt = Date.now();
  const phaseTimings: LuminaBuildPhase[] = [];
  const appRoot = resolve(options.appRoot);
  let routeState = regenerateArtifacts(appRoot, undefined, ".lumina", phaseTimings);
  let clientBundleWrite: Promise<void> = Promise.resolve();
  const queueClientBundleWrite = () => {
    const write = writeClientBundles(appRoot, routeState.routes);
    clientBundleWrite = write.catch(() => undefined);
    return write;
  };
  await timePhase(phaseTimings, "client bundles", queueClientBundleWrite);

  let vite: ViteDevServer | undefined;
  await timePhase(phaseTimings, "vite server", async () => {
    vite = await createServer({
      appType: "custom",
      configFile: false,
      esbuild: {
        jsx: "automatic",
        jsxImportSource: "react",
      },
      optimizeDeps: {
        include: [],
        noDiscovery: true,
      },
      ssr: {
        external: ["react", "react-dom", "react-dom/client", "react-dom/server", "react/jsx-dev-runtime", "react/jsx-runtime"],
      },
      root: appRoot,
      logLevel: options.logLevel ?? "info",
      server: {
        host: options.host ?? "127.0.0.1",
        port: options.port ?? 5173,
        strictPort: true,
      },
      plugins: [
        {
          name: "lumina-dev-renderer",
          resolveId(id) {
            if (id === virtualRoutesModuleId) return resolvedVirtualRoutesModuleId;
          },
          load(id) {
            if (id === resolvedVirtualRoutesModuleId) {
              return [
                `export const routes = ${JSON.stringify(routeState.routes)};`,
                `export const manifest = ${JSON.stringify(routeState.manifest)};`,
              ].join("\n");
            }
          },
          configureServer(server) {
            server.watcher.add(resolve(appRoot, "app"));
            const knownRouteFiles = new Set(routeState.routes.map((route) => route.sourceFile));
            const rememberRouteFiles = () => {
              knownRouteFiles.clear();
              for (const route of routeState.routes) knownRouteFiles.add(route.sourceFile);
            };

            const watchAddedDirectory = (directory: string) => {
              if (!isAppDirectory(appRoot, directory)) return;
              server.watcher.add(directory);
              setTimeout(() => {
                const routeFile = findRouteSourceInDirectory(directory);
                if (routeFile) updateRouteState(routeFile);
              }, 50).unref();
            };

            const updateRouteState = (file: string) => {
              if (!isAppSourceFile(appRoot, file)) return;
              routeState = regenerateArtifacts(appRoot, file);
              rememberRouteFiles();
              void queueClientBundleWrite().catch(() => undefined);
              const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualRoutesModuleId);
              if (virtualModule) server.moduleGraph.invalidateModule(virtualModule);
              server.ws.send({
                type: "custom",
                event: "lumina:routes-updated",
                data: {
                  changedFile: toRelativePath(appRoot, file),
                  routes: routeState.routes.map((route) => route.path),
                },
              });
              server.ws.send({ type: "full-reload" });
            };

            const scanForAddedRouteFiles = () => {
              for (const routeFile of findAppPageFiles(resolve(appRoot, "app"))) {
                const sourceFile = toRelativePath(appRoot, routeFile);
                if (!knownRouteFiles.has(sourceFile)) {
                  updateRouteState(routeFile);
                  break;
                }
              }
            };
            const routeFilePoll = setInterval(scanForAddedRouteFiles, 250);
            routeFilePoll.unref();
            server.httpServer?.once("close", () => clearInterval(routeFilePoll));

            server.watcher.on("addDir", watchAddedDirectory);
            server.watcher.on("add", updateRouteState);
            server.watcher.on("unlink", updateRouteState);

            server.middlewares.use(async (request, response, next) => {
              const rawUrl = request.url ?? "/";
              const url = normalizeRequestPath(rawUrl);
              if (url.startsWith("/@lumina/client/")) {
                await serveClientBundle(appRoot, url, response, routeState.routes);
                return;
              }
              if (shouldPassThroughToVite(request.method, url)) {
                next();
                return;
              }

              const match = findRoute(routeState.routes, url);
              const searchParams = readSearchParams(rawUrl);

              if (!match) {
                const notFoundFile = findNotFoundFile(appRoot, url);
                if (notFoundFile) {
                  try {
                    const html = await renderSpecialFile(server, appRoot, notFoundFile, url, {
                      searchParams,
                    });
                    response.statusCode = 404;
                    response.setHeader("Content-Type", "text/html; charset=utf-8");
                    response.end(html);
                    return;
                  } catch {
                    // Fall through to the stable generic 404 if the user's not-found component fails.
                  }
                }
                response.statusCode = 404;
                response.setHeader("Content-Type", "text/html; charset=utf-8");
                response.end(`<!doctype html><h1>Route not found: ${escapeHtml(url)}</h1>`);
                return;
              }

              try {
                const html = await renderRoute(server, match.route, url, {
                  params: match.params,
                  searchParams,
                });
                response.statusCode = 200;
                response.setHeader("Content-Type", "text/html; charset=utf-8");
                response.end(html);
              } catch (error) {
                if (error instanceof Error) {
                  try {
                    server.ssrFixStacktrace(error);
                  } catch {
                    // Vite's stacktrace mapper can fail for synthetic modules; keep the dev response reliable.
                  }
                }
                const errorFile = findErrorFile(appRoot, match.route);
                if (errorFile) {
                  try {
                    const html = await renderSpecialFile(server, appRoot, errorFile, url, {
                      error: error instanceof Error ? error : new Error(String(error)),
                      params: match.params,
                      searchParams,
                    });
                    response.statusCode = 500;
                    response.setHeader("Content-Type", "text/html; charset=utf-8");
                    response.end(html);
                    return;
                  } catch {
                    // Fall through to the stable generic 500 if the user's error component fails.
                  }
                }
                response.statusCode = 500;
                response.setHeader("Content-Type", "text/html; charset=utf-8");
                response.end(`<!doctype html><h1>Lumina dev render failed</h1><pre>${escapeHtml(error instanceof Error ? error.message : String(error))}</pre>`);
              }
            });
          },
          handleHotUpdate({ file, server, modules, timestamp }) {
            if (!isAppSourceFile(appRoot, file)) {
              writeSourceHmrReport(appRoot, file);
              return;
            }
            routeState = regenerateArtifacts(appRoot, file);
            void queueClientBundleWrite().catch(() => undefined);
            const invalidatedModules = new Set<ModuleNode>();
            for (const mod of modules) {
              server.moduleGraph.invalidateModule(mod, invalidatedModules, timestamp, true);
            }
            const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualRoutesModuleId);
            if (virtualModule) server.moduleGraph.invalidateModule(virtualModule, invalidatedModules, timestamp, true);
            server.ws.send({
              type: "custom",
              event: "lumina:routes-updated",
              data: {
                changedFile: toRelativePath(appRoot, file),
                routes: routeState.routes.map((route) => route.path),
              },
            });
            server.ws.send({ type: "full-reload" });
            return [];
          },
        },
      ],
    });

    const watcherReady = waitForWatcherReady(vite);
    await vite.listen();
    await watcherReady;
  });
  if (!vite) throw new Error("Vite dev server failed to initialize.");
  const devServer = vite;

  return {
    url: resolveServerUrl(devServer),
    routes: routeState.routes,
    phases: phaseTimings,
    durationMs: elapsedSince(devStartedAt),
    close: async () => {
      await clientBundleWrite;
      await devServer.close();
    },
  };
}

export async function buildLuminaStaticApp(options: LuminaDevServerOptions): Promise<LuminaBuildResult> {
  const appRoot = resolve(options.appRoot);
  return await withBuildLock(appRoot, () => buildLuminaStaticAppLocked(options, appRoot));
}

async function buildLuminaStaticAppLocked(options: LuminaDevServerOptions, appRoot: string): Promise<LuminaBuildResult> {
  const buildStartedAt = Date.now();
  const phaseTimings: LuminaBuildPhase[] = [];
  const configResult = await timePhase(phaseTimings, "config", () => loadLuminaConfig({ appRoot, mode: "production" }));
  if (configResult.diagnostics.some((diagnostic) => diagnostic.severity === "error")) {
    return {
      routes: [],
      outputs: [],
      manifests: [],
      diagnostics: configResult.diagnostics,
      phases: phaseTimings,
      durationMs: elapsedSince(buildStartedAt),
    };
  }

  const routeState = regenerateBuildArtifacts(appRoot, configResult.config.outputDir, phaseTimings);
  const outputs: string[] = [];
  const manifests = [
    ".lumina/routes.json",
    ".lumina/render-manifest.json",
    ".lumina/map.json",
  ];

  const clientOutputs = await timePhase(phaseTimings, "client bundles", async () => {
    clearBuildOutput(appRoot);
    await writeClientBundles(appRoot, routeState.routes);
    return copyClientBundlesToPublic(appRoot);
  });

  await timePhase(phaseTimings, "static output", async () => {
    const vite = await createServer({
      appType: "custom",
      configFile: false,
      esbuild: {
        jsx: "automatic",
        jsxImportSource: "react",
      },
      optimizeDeps: {
        include: [],
        noDiscovery: true,
      },
      ssr: {
        external: ["react", "react-dom", "react-dom/client", "react-dom/server", "react/jsx-dev-runtime", "react/jsx-runtime"],
      },
      root: appRoot,
      logLevel: options.logLevel ?? "silent",
      server: {
        middlewareMode: true,
      },
      plugins: [
        {
          name: "lumina-static-build-virtual-routes",
          resolveId(id) {
            if (id === virtualRoutesModuleId) return resolvedVirtualRoutesModuleId;
          },
          load(id) {
            if (id === resolvedVirtualRoutesModuleId) {
              return [
                `export const routes = ${JSON.stringify(routeState.routes)};`,
                `export const manifest = ${JSON.stringify(routeState.manifest)};`,
              ].join("\n");
            }
          },
        },
      ],
    });

    try {
      for (const route of routeState.routes) {
        if (route.kind !== "page" || route.renderMode !== "static" || route.params.length > 0) continue;
        const html = await renderRoute(vite, route, route.path, {
          includeViteClient: false,
          includeClientEntry: true,
          clientBasePath: "/_lumina/client",
        });
        const outputPath = staticHtmlOutputPath(route.path);
        writeTextArtifact(appRoot, outputPath, html);
        outputs.push(outputPath);
      }
      outputs.push(...clientOutputs);
    } finally {
      await vite.close();
    }
  });

  const ssrOutputs = await timePhase(phaseTimings, "ssr server bundle", () => {
    return writeSsrServerBundle(appRoot, routeState.routes.filter((route) => route.kind === "page" && route.renderMode === "ssr"));
  });
  outputs.push(...ssrOutputs);

  const docsOutputs = await timePhase(phaseTimings, "public docs artifacts", () => writePublicDocsArtifacts(appRoot));
  outputs.push(...docsOutputs);

  const serverEntryPath = await timePhase(phaseTimings, "adapter output", () => {
    copyJsonArtifact(appRoot, ".lumina/routes.json", "dist/routes.manifest.json", routeState.manifest);
    copyJsonArtifact(appRoot, ".lumina/render-manifest.json", "dist/render.manifest.json", routeState.renderManifest);
    const entryPath = writeServerEntry(appRoot, configResult.config.adapter);
    const adapterManifest = createBunAdapterManifest({
      hasSsrOutput: routeState.routes.some((route) => route.kind === "page" && route.renderMode === "ssr"),
      config: configResult.config,
      configSource: configResult.sourceFile,
      serverEntry: entryPath,
    });
    copyJsonArtifact(appRoot, "", "dist/adapter.manifest.json", adapterManifest);
    return entryPath;
  });

  const buildTracePath = ".lumina/build-trace.json";
  const perfReportPath = ".lumina/perf.report.json";
  writeJsonArtifact(appRoot, buildTracePath, createBuildTrace([...manifests, serverEntryPath, ...outputs, "dist/routes.manifest.json", "dist/render.manifest.json", "dist/adapter.manifest.json"], phaseTimings));
  writeJsonArtifact(appRoot, perfReportPath, createPerfReport(routeState.routes, outputs, appRoot));

  manifests.push(serverEntryPath, buildTracePath, perfReportPath, "dist/routes.manifest.json", "dist/render.manifest.json", "dist/adapter.manifest.json");

  return {
    routes: routeState.routes,
    outputs: outputs.sort(compareStrings),
    manifests,
    diagnostics: [
      ...routeState.manifest.diagnostics,
      ...routeState.renderManifest.diagnostics,
      ...routeState.map.diagnostics,
    ],
    phases: phaseTimings,
    durationMs: elapsedSince(buildStartedAt),
  };
}

async function withBuildLock<T>(appRoot: string, action: () => Promise<T>): Promise<T> {
  const previous = buildLocks.get(appRoot) ?? Promise.resolve();
  let release!: () => void;
  const current = new Promise<void>((resolveRelease) => {
    release = resolveRelease;
  });
  const chained = previous.then(() => current);
  buildLocks.set(appRoot, chained);
  await previous;

  try {
    return await action();
  } finally {
    release();
    if (buildLocks.get(appRoot) === chained) {
      buildLocks.delete(appRoot);
    }
  }
}

function regenerateArtifacts(appRoot: string, changedFile?: string, outputDir = ".lumina", phaseTimings?: LuminaBuildPhase[]) {
  const routesResult = phaseTimings
    ? timeSyncPhase(phaseTimings, "route discovery", () => writeRoutesManifest({ appRoot, outputDir }))
    : writeRoutesManifest({ appRoot, outputDir });
  const renderResult = phaseTimings
    ? timeSyncPhase(phaseTimings, "render manifest", () => writeRenderManifest({ appRoot, outputDir }))
    : writeRenderManifest({ appRoot, outputDir });
  const mapResult = phaseTimings
    ? timeSyncPhase(phaseTimings, "map generation", () => writeLuminaMap({ appRoot, outputDir }))
    : writeLuminaMap({ appRoot, outputDir });
  const routes = routesResult.manifest.routes.filter((route) => route.kind === "page");

  if (changedFile) {
    writeHmrReport(appRoot, {
      changedFile: toRelativePath(appRoot, changedFile),
      routes,
      artifacts: [
        ".lumina/routes.json",
        ".lumina/render-manifest.json",
        ".lumina/map.json",
        ".lumina/hmr-report.json",
      ],
    });
  }

  return {
    manifest: routesResult.manifest,
    renderManifest: renderResult.manifest,
    map: mapResult.map,
    routes,
  };
}

function regenerateBuildArtifacts(appRoot: string, outputDir: string, phaseTimings: LuminaBuildPhase[]) {
  const routesResult = timeSyncPhase(phaseTimings, "route discovery", () => writeRoutesManifest({ appRoot, outputDir }));
  const renderResult = timeSyncPhase(phaseTimings, "render manifest", () => writeRenderManifest({ appRoot, outputDir }));
  const mapResult = timeSyncPhase(phaseTimings, "map generation", () => writeLuminaMap({ appRoot, outputDir }));
  const routes = routesResult.manifest.routes.filter((route) => route.kind === "page");

  return {
    manifest: routesResult.manifest,
    renderManifest: renderResult.manifest,
    map: mapResult.map,
    routes,
  };
}

function writeSourceHmrReport(appRoot: string, changedFile: string): void {
  if (!isLocalSourceFile(appRoot, changedFile)) return;

  const relativeChangedFile = toRelativePath(appRoot, changedFile);
  const mapResult = writeLuminaMap({ appRoot });
  const affectedRoutes = getAffectedRoutes(mapResult.map, relativeChangedFile);
  if (affectedRoutes.length === 0) return;

  writeHmrReport(appRoot, {
    changedFile: relativeChangedFile,
    routes: affectedRoutes,
    artifacts: [".lumina/hmr-report.json", ".lumina/map.json"],
  });
}

function writeHmrReport(
  appRoot: string,
  report: {
    changedFile: string;
    routes: Array<Pick<RouteNode, "id" | "path" | "sourceFile"> & { reason?: string }>;
    artifacts: string[];
  },
): void {
  const path = resolve(appRoot, ".lumina", "hmr-report.json");
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(
    path,
    JSON.stringify({
      schemaVersion: "lumina.hmr-report.v0",
      generatedBy: {
        package: "@lumina/vite-plugin",
        version: "0.0.0",
      },
      changedFile: report.changedFile,
      routes: report.routes.map((route) => ({
        id: route.id,
        path: route.path,
        sourceFile: route.sourceFile,
        ...(route.reason ? { reason: route.reason } : {}),
      })),
      artifacts: report.artifacts.sort(compareStrings),
    }),
    "utf8",
  );
}

async function renderRoute(
  server: ViteDevServer,
  route: RouteNode,
  url: string,
  options: { includeViteClient?: boolean; includeClientEntry?: boolean; clientBasePath?: string; params?: RouteParams; searchParams?: SearchParams } = { includeViteClient: true },
): Promise<string> {
  const pageModule = await server.ssrLoadModule(`/${route.sourceFile}`);
  const Page = pageModule.default;
  if (typeof Page !== "function") {
    throw new Error(`${route.sourceFile} must export a default page component.`);
  }

  const params = options.params ?? {};
  const searchParams = options.searchParams ?? {};
  let app: ReactNode = createElement(Page, { params, searchParams });

  for (const layout of [...route.layouts].reverse()) {
    const layoutModule = await server.ssrLoadModule(`/${layout}`);
    const Layout = layoutModule.default;
    if (typeof Layout !== "function") {
      throw new Error(`${layout} must export a default layout component.`);
    }
    app = createElement(Layout, { children: app, params, searchParams });
  }

  const appHtml = renderToString(app);
  const includeViteClient = options.includeViteClient ?? true;
  const viteClient = includeViteClient ? '<script type="module" src="/@vite/client"></script>' : "";
  const includeClientEntry = options.includeClientEntry ?? includeViteClient;
  const clientEntry = includeClientEntry ? `<script type="module" src="${clientEntryUrl(route, options.clientBasePath)}"></script>` : "";
  const html = `<!doctype html>${appHtml}<div data-lumina-route="${escapeAttribute(route.path)}"></div>${viteClient}${clientEntry}`;
  return server.transformIndexHtml(url, html);
}

async function renderSpecialFile(
  server: ViteDevServer,
  appRoot: string,
  sourceFile: string,
  url: string,
  props: Record<string, unknown>,
): Promise<string> {
  const specialModule = await server.ssrLoadModule(`/${sourceFile}`);
  const Special = specialModule.default;
  if (typeof Special !== "function") {
    throw new Error(`${sourceFile} must export a default component.`);
  }

  let app: ReactNode = createElement(Special, props);
  for (const layout of [...layoutsForSpecialFile(appRoot, sourceFile)].reverse()) {
    const layoutModule = await server.ssrLoadModule(`/${layout}`);
    const Layout = layoutModule.default;
    if (typeof Layout !== "function") {
      throw new Error(`${layout} must export a default layout component.`);
    }
    app = createElement(Layout, { ...props, children: app });
  }

  const appHtml = renderToString(app);
  const html = `<!doctype html>${appHtml}<script type="module" src="/@vite/client"></script>`;
  return server.transformIndexHtml(url, html);
}

async function writeClientBundles(appRoot: string, routes: RouteNode[]): Promise<void> {
  const entryRoot = resolve(appRoot, ".lumina", "generated", "client");
  const outdir = resolve(appRoot, ".lumina", "client");
  rmSync(entryRoot, { recursive: true, force: true });
  rmSync(outdir, { recursive: true, force: true });
  mkdirSync(entryRoot, { recursive: true });
  mkdirSync(outdir, { recursive: true });

  const entrypoints = routes
    .filter((route) => route.kind === "page")
    .map((route) => {
      const entry = resolve(entryRoot, `${route.id}.tsx`);
      writeFileSync(entry, createClientEntryModule(route, (sourceFile) => relativeModulePath(entry, appRoot, sourceFile)), "utf8");
      return entry;
    });

  if (entrypoints.length === 0) return;

  const result = await Bun.build({
    entrypoints,
    outdir,
    target: "browser",
    splitting: false,
    sourcemap: "none",
    minify: false,
    naming: "[name].[ext]",
    plugins: [
      {
        name: "lumina-client-virtual-routes",
        setup(build) {
          build.onResolve({ filter: /^virtual:lumina\/routes$/ }, () => ({
            path: virtualRoutesModuleId,
            namespace: "lumina",
          }));
          build.onLoad({ filter: /^virtual:lumina\/routes$/, namespace: "lumina" }, () => ({
            contents: [
              `export const routes = ${JSON.stringify(routes)};`,
              `export const manifest = ${JSON.stringify({ routes })};`,
            ].join("\n"),
            loader: "js",
          }));
        },
      },
    ],
  });

  if (!result.success) {
    throw new Error(`Lumina client bundle failed: ${result.logs.map((log) => log.message).join("; ")}`);
  }
}

function createClientEntryModule(route: RouteNode, modulePath = (sourceFile: string) => `/${sourceFile}`): string {
  const imports = [
    `import { createElement } from "react";`,
    `import { hydrateRoot } from "react-dom/client";`,
    `import Page from "${modulePath(route.sourceFile)}";`,
    ...route.layouts.map((layout, index) => `import Layout${index} from "${modulePath(layout)}";`),
  ];
  const layoutApplications = route.layouts
    .map((_, index) => `app = createElement(Layout${index}, { children: app, params, searchParams });`)
    .reverse();

  return [
    ...imports,
    "",
    `const luminaRouteSegments = ${JSON.stringify(route.segments)};`,
    "",
    "function readLuminaRouteParams(pathname) {",
    "  const parts = pathname.replace(/^\\/+|\\/+$/g, \"\").split(\"/\").filter(Boolean).map((part) => decodeURIComponent(part));",
    "  const params = {};",
    "  let partIndex = 0;",
    "  for (const segment of luminaRouteSegments) {",
    "    if (segment.kind === \"group\") continue;",
    "    if (segment.kind === \"static\") {",
    "      partIndex += 1;",
    "      continue;",
    "    }",
    "    if (segment.kind === \"dynamic\") {",
    "      params[segment.name] = parts[partIndex];",
    "      partIndex += 1;",
    "      continue;",
    "    }",
    "    if (segment.kind === \"catchAll\") {",
    "      params[segment.name] = parts.slice(partIndex);",
    "      break;",
    "    }",
    "  }",
    "  return params;",
    "}",
    "",
    "function readLuminaSearchParams(search) {",
    "  const values = new URLSearchParams(search);",
    "  const searchParams = {};",
    "  for (const [key, value] of values) {",
    "    if (Object.prototype.hasOwnProperty.call(searchParams, key)) {",
    "      const existing = searchParams[key];",
    "      searchParams[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];",
    "    } else {",
    "      searchParams[key] = value;",
    "    }",
    "  }",
    "  return searchParams;",
    "}",
    "",
    "const params = readLuminaRouteParams(window.location.pathname);",
    "const searchParams = readLuminaSearchParams(window.location.search);",
    "let app = createElement(Page, { params, searchParams });",
    ...layoutApplications,
    "hydrateRoot(document, app);",
  ].join("\n");
}

async function writeSsrServerBundle(appRoot: string, routes: RouteNode[]): Promise<string[]> {
  if (routes.length === 0) return [];

  const entryRoot = resolve(appRoot, ".lumina", "generated", "server");
  const outdir = resolve(appRoot, "dist", "server");
  const entry = resolve(entryRoot, "ssr-routes.tsx");
  mkdirSync(entryRoot, { recursive: true });
  mkdirSync(outdir, { recursive: true });
  writeFileSync(entry, createSsrRoutesModule(routes, entry, appRoot), "utf8");

  const result = await Bun.build({
    entrypoints: [entry],
    outdir,
    target: "bun",
    format: "esm",
    splitting: false,
    sourcemap: "none",
    minify: false,
    naming: "[name].[ext]",
  });

  if (!result.success) {
    throw new Error(`Lumina SSR bundle failed: ${result.logs.map((log) => log.message).join("; ")}`);
  }

  return ["dist/server/ssr-routes.js"];
}

async function writePublicDocsArtifacts(appRoot: string): Promise<string[]> {
  const indexModulePath = resolve(appRoot, "lib", "docs-index.ts");
  const sourceModulePath = resolve(appRoot, "lib", "public-docs-source.ts");
  if (!existsSync(indexModulePath) || !existsSync(sourceModulePath)) return [];

  const [indexModule, sourceModule] = await Promise.all([
    importAppModule(indexModulePath),
    importAppModule(sourceModulePath),
  ]);
  const docsIndex = Array.isArray(indexModule.docsIndex) ? indexModule.docsIndex.map(normalizeDocsIndexEntry) : [];
  const markdownRecords = Array.isArray(sourceModule.publicDocsMarkdown)
    ? sourceModule.publicDocsMarkdown.map(normalizeDocsMarkdownRecord)
    : [];
  if (docsIndex.length === 0) return [];

  const markdownBySlug = new Map(markdownRecords.map((record) => [record.slug, record]));
  const docsIndexArtifact = {
    schemaVersion: "lumina.docs-index.v0",
    docsVersion: "unreleased",
    pages: docsIndex.map((entry) => ({
      slug: entry.slug,
      href: entry.href,
      lane: entry.lane,
      title: entry.title,
      description: entry.description,
      status: entry.status,
      source: entry.source,
      related: entry.related,
      headings: entry.headings,
      keywords: entry.keywords,
      searchText: entry.searchText,
    })),
  };
  const docsNavigationArtifact = normalizeDocsNavigationArtifact(indexModule.docsNavigation);

  const llmsTxt = createLlmsTxt(docsIndex);
  const llmsFullTxt = createLlmsFullTxt(docsIndex, markdownBySlug);
  const outputs = [
    "dist/public/docs-index.json",
    "dist/public/docs-navigation.json",
    "dist/public/llms.txt",
    "dist/public/llms-full.txt",
  ];

  writeJsonArtifact(appRoot, outputs[0]!, docsIndexArtifact);
  writeJsonArtifact(appRoot, outputs[1]!, docsNavigationArtifact);
  writeTextArtifact(appRoot, outputs[2]!, llmsTxt);
  writeTextArtifact(appRoot, outputs[3]!, llmsFullTxt);
  return outputs;
}

async function importAppModule(modulePath: string): Promise<Record<string, unknown>> {
  const version = statSync(modulePath).mtimeMs;
  return await import(`${pathToFileURL(modulePath).href}?mtime=${version}`);
}

type PublicDocsIndexArtifactEntry = {
  slug: string;
  href: string;
  lane: string;
  title: string;
  description: string;
  status: string;
  source: string;
  related: string[];
  headings: string[];
  keywords: string[];
  searchText: string;
};

type PublicDocsMarkdownArtifactRecord = {
  slug: string;
  source: string;
  markdown: string;
};

type PublicDocsNavigationArtifact = {
  schemaVersion: string;
  docsVersion: string;
  sections: Array<{
    title: string;
    kind: string;
    links: Array<{
      title: string;
      href: string;
      status: string;
      source: string;
      lane: string;
      description: string;
    }>;
  }>;
};

function normalizeDocsIndexEntry(value: unknown): PublicDocsIndexArtifactEntry {
  const entry = isRecord(value) ? value : {};
  return {
    slug: stringValue(entry.slug),
    href: stringValue(entry.href),
    lane: stringValue(entry.lane),
    title: stringValue(entry.title),
    description: stringValue(entry.description),
    status: stringValue(entry.status),
    source: normalizeArtifactPath(stringValue(entry.source)),
    related: stringArrayValue(entry.related).map(normalizeArtifactPath).sort(compareStrings),
    headings: stringArrayValue(entry.headings),
    keywords: stringArrayValue(entry.keywords).sort(compareStrings),
    searchText: stringValue(entry.searchText),
  };
}

function normalizeDocsMarkdownRecord(value: unknown): PublicDocsMarkdownArtifactRecord {
  const record = isRecord(value) ? value : {};
  return {
    slug: stringValue(record.slug),
    source: normalizeArtifactPath(stringValue(record.source)),
    markdown: stringValue(record.markdown).replace(/\r\n/g, "\n"),
  };
}

function normalizeDocsNavigationArtifact(value: unknown): PublicDocsNavigationArtifact {
  const navigation = isRecord(value) ? value : {};
  return {
    schemaVersion: stringValue(navigation.schemaVersion) || "lumina.docs-navigation.v0",
    docsVersion: stringValue(navigation.docsVersion) || "unreleased",
    sections: arrayValue(navigation.sections).map((sectionValue) => {
      const section = isRecord(sectionValue) ? sectionValue : {};
      return {
        title: stringValue(section.title),
        kind: stringValue(section.kind),
        links: arrayValue(section.links).map((linkValue) => {
          const link = isRecord(linkValue) ? linkValue : {};
          return {
            title: stringValue(link.title),
            href: stringValue(link.href),
            status: stringValue(link.status),
            source: normalizeArtifactPath(stringValue(link.source)),
            lane: stringValue(link.lane),
            description: stringValue(link.description),
          };
        }),
      };
    }),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stringArrayValue(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function arrayValue(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function normalizeArtifactPath(value: string): string {
  return value.replace(/\\/g, "/").replace(/^\.\//, "");
}

function createLlmsTxt(entries: PublicDocsIndexArtifactEntry[]): string {
  return [
    "# Lumina Documentation",
    "",
    "> Public docs index for Lumina. Generated from the bundled `docs/public/` website inventory.",
    "",
    "## Pages",
    "",
    ...entries.map((entry) => `- [${entry.title}](${entry.href}) - ${entry.status}; ${entry.lane}; source: ${entry.source}`),
    "",
  ].join("\n");
}

function createLlmsFullTxt(
  entries: PublicDocsIndexArtifactEntry[],
  markdownBySlug: Map<string, PublicDocsMarkdownArtifactRecord>,
): string {
  const sections = entries.map((entry) => {
    const markdown = markdownBySlug.get(entry.slug)?.markdown.trim() ?? "";
    return [
      `# ${entry.title}`,
      "",
      `Route: ${entry.href}`,
      `Status: ${entry.status}`,
      `Lane: ${entry.lane}`,
      `Source: ${entry.source}`,
      "",
      markdown,
      "",
    ].join("\n");
  });

  return [
    "# Lumina Full Documentation",
    "",
    "> Full public docs text for AI-assisted reading. Generated from the bundled `docs/public/` website inventory.",
    "",
    ...sections,
  ].join("\n");
}

function createSsrRoutesModule(routes: RouteNode[], fromFile: string, appRoot: string): string {
  const imports = [
    `import { createElement } from "react";`,
    `import { renderToString } from "react-dom/server";`,
  ];
  const entries: string[] = [];

  routes.forEach((route, routeIndex) => {
    const pageName = `Page${routeIndex}`;
    imports.push(`import ${pageName} from ${JSON.stringify(relativeModulePath(fromFile, appRoot, route.sourceFile))};`);
    route.layouts.forEach((layout, layoutIndex) => {
      imports.push(`import Layout${routeIndex}_${layoutIndex} from ${JSON.stringify(relativeModulePath(fromFile, appRoot, layout))};`);
    });

    const layoutApplications = route.layouts
      .map((_, layoutIndex) => `    app = createElement(Layout${routeIndex}_${layoutIndex}, { children: app, params, searchParams });`)
      .reverse();
    const clientEntry = `<script type="module" src="${clientEntryUrl(route, "/_lumina/client")}"></script>`;

    entries.push([
      "  {",
      `    path: ${JSON.stringify(route.path)},`,
      `    segments: ${JSON.stringify(route.segments)},`,
      "    render(context) {",
      "      const params = context.params ?? {};",
      "      const searchParams = context.searchParams ?? {};",
      `      let app = createElement(${pageName}, { params, searchParams });`,
      ...layoutApplications,
      "      const appHtml = renderToString(app);",
      `      return "<!doctype html>" + appHtml + ${JSON.stringify(`<div data-lumina-route="${escapeAttribute(route.path)}"></div>${clientEntry}`)};`,
      "    },",
      "  }",
    ].join("\n"));
  });

  return [
    ...imports,
    "",
    "export const ssrRoutes = [",
    entries.join(",\n"),
    "];",
    "",
  ].join("\n");
}

function clientEntryUrl(route: RouteNode, basePath = "/@lumina/client"): string {
  return `${basePath}/${route.id}.js`;
}

async function serveClientBundle(
  appRoot: string,
  url: string,
  response: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body: string | Uint8Array) => void },
  routes: RouteNode[],
): Promise<void> {
  const requestedFile = url.slice("/@lumina/client/".length);
  if (!/^[a-zA-Z0-9.-]+\.js$/.test(requestedFile)) {
    response.statusCode = 400;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Invalid Lumina client bundle path.");
    return;
  }

  const bundlePath = resolve(appRoot, ".lumina", "client", requestedFile);
  if (!existsSync(bundlePath)) {
    await writeClientBundles(appRoot, routes);
  }

  if (!existsSync(bundlePath)) {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Lumina client bundle not found.");
    return;
  }

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/javascript; charset=utf-8");
  response.end(await Bun.file(bundlePath).bytes());
}

function relativeModulePath(fromFile: string, appRoot: string, sourceFile: string): string {
  const target = resolve(appRoot, ...sourceFile.split("/"));
  const relativePath = relative(dirname(fromFile), target).replaceAll("\\", "/");
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
}

function findRoute(routes: RouteNode[], url: string): RouteMatch | undefined {
  for (const route of routes) {
    const params = matchRoute(route, url);
    if (params) return { route, params };
  }
  return undefined;
}

function matchRoute(route: RouteNode, url: string): RouteParams | undefined {
  const parts = splitRoutePath(url);
  if (!parts) return undefined;

  const params: RouteParams = {};
  let partIndex = 0;

  for (const segment of route.segments) {
    if (segment.kind === "group") continue;

    if (segment.kind === "static") {
      if (parts[partIndex] !== segment.value) return undefined;
      partIndex += 1;
      continue;
    }

    if (segment.kind === "dynamic") {
      const value = parts[partIndex];
      if (!value) return undefined;
      params[segment.name] = value;
      partIndex += 1;
      continue;
    }

    if (segment.kind === "catchAll") {
      const rest = parts.slice(partIndex);
      if (rest.length === 0) return undefined;
      params[segment.name] = rest;
      partIndex = parts.length;
    }
  }

  if (partIndex !== parts.length) return undefined;
  return params;
}

function splitRoutePath(pathname: string): string[] | undefined {
  const rawParts = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const parts: string[] = [];
  for (const part of rawParts) {
    try {
      parts.push(decodeURIComponent(part));
    } catch {
      return undefined;
    }
  }
  return parts;
}

function findNotFoundFile(appRoot: string, url: string): string | undefined {
  const parts = splitRoutePath(url) ?? [];
  const candidates: string[] = [];
  for (let index = parts.length; index >= 0; index -= 1) {
    const prefix = parts.slice(0, index);
    candidates.push(["app", ...prefix, "not-found.tsx"].join("/"));
    candidates.push(["app", ...prefix, "not-found.jsx"].join("/"));
  }
  return findFirstExistingSource(appRoot, candidates);
}

function findErrorFile(appRoot: string, route: RouteNode): string | undefined {
  const sourceParts = route.sourceFile.split("/");
  sourceParts.pop();
  const candidates: string[] = [];
  for (let index = sourceParts.length; index >= 1; index -= 1) {
    const prefix = sourceParts.slice(0, index);
    candidates.push([...prefix, "error.tsx"].join("/"));
    candidates.push([...prefix, "error.jsx"].join("/"));
  }
  return findFirstExistingSource(appRoot, candidates);
}

function layoutsForSpecialFile(appRoot: string, sourceFile: string): string[] {
  const sourceParts = sourceFile.split("/");
  sourceParts.pop();
  const layouts: string[] = [];
  for (let index = 1; index <= sourceParts.length; index += 1) {
    const layout = [...sourceParts.slice(0, index), "layout.tsx"].join("/");
    if (existsSync(resolve(appRoot, ...layout.split("/")))) layouts.push(layout);
  }
  return layouts;
}

function findFirstExistingSource(appRoot: string, candidates: string[]): string | undefined {
  return candidates.find((candidate) => existsSync(resolve(appRoot, ...candidate.split("/"))));
}

function isAppSourceFile(appRoot: string, file: string): boolean {
  const normalized = toRelativePath(appRoot, file);
  return normalized.startsWith("app/")
    && (normalized.endsWith(".ts") || normalized.endsWith(".tsx") || normalized.endsWith(".js") || normalized.endsWith(".jsx"));
}

function isLocalSourceFile(appRoot: string, file: string): boolean {
  const normalized = toRelativePath(appRoot, file);
  if (normalized === ".." || normalized.startsWith("../")) return false;
  if (normalized.startsWith(".lumina/")) return false;
  if (normalized.startsWith("dist/")) return false;
  if (normalized.startsWith("node_modules/")) return false;
  return normalized.endsWith(".ts") || normalized.endsWith(".tsx") || normalized.endsWith(".js") || normalized.endsWith(".jsx");
}

function isAppDirectory(appRoot: string, directory: string): boolean {
  const normalized = toRelativePath(appRoot, directory);
  return normalized === "app" || normalized.startsWith("app/");
}

function findRouteSourceInDirectory(directory: string): string | undefined {
  for (const file of ["page.tsx", "page.ts", "page.jsx", "page.js"]) {
    const candidate = resolve(directory, file);
    if (existsSync(candidate)) return candidate;
  }
}

function findAppPageFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  const files: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...findAppPageFiles(path));
      continue;
    }
    if (entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      files.push(path);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function waitForWatcherReady(server: ViteDevServer): Promise<void> {
  const watcher = server.watcher as ViteDevServer["watcher"] & { _readyEmitted?: boolean };
  if (watcher._readyEmitted) return Promise.resolve();

  return new Promise((resolveReady) => {
    const timeout = setTimeout(resolveReady, 1_000);
    watcher.once("ready", () => {
      clearTimeout(timeout);
      resolveReady();
    });
  });
}

function toRelativePath(root: string, file: string): string {
  return relative(root, file).replaceAll("\\", "/");
}

function normalizeRequestPath(url: string): string {
  const pathname = new URL(url, "http://lumina.local").pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function readSearchParams(url: string): SearchParams {
  const values = new URL(url, "http://lumina.local").searchParams;
  const searchParams: SearchParams = {};
  for (const [key, value] of values) {
    const existing = searchParams[key];
    if (Array.isArray(existing)) {
      existing.push(value);
    } else if (typeof existing === "string") {
      searchParams[key] = [existing, value];
    } else {
      searchParams[key] = value;
    }
  }
  return searchParams;
}

function shouldPassThroughToVite(method: string | undefined, pathname: string): boolean {
  if (method && method !== "GET" && method !== "HEAD") return true;
  return pathname.startsWith("/@vite/")
    || pathname.startsWith("/@id/")
    || pathname.startsWith("/@fs/")
    || pathname.startsWith("/node_modules/")
    || /\.[a-zA-Z0-9]+$/.test(pathname);
}

function resolveServerUrl(server: ViteDevServer): string {
  const local = server.resolvedUrls?.local[0];
  if (!local) throw new Error("Vite dev server did not expose a local URL.");
  return local.replace(/\/$/, "");
}

function clearBuildOutput(appRoot: string): void {
  rmSync(resolve(appRoot, "dist"), { recursive: true, force: true });
}

function copyClientBundlesToPublic(appRoot: string): string[] {
  const sourceDir = resolve(appRoot, ".lumina", "client");
  const publicDir = resolve(appRoot, "dist", "public", "_lumina", "client");
  if (!existsSync(sourceDir)) return [];
  mkdirSync(publicDir, { recursive: true });

  return readdirSync(sourceDir)
    .filter((file) => /^[a-zA-Z0-9.-]+\.js$/.test(file))
    .sort(compareStrings)
    .map((file) => {
      copyFileSync(resolve(sourceDir, file), resolve(publicDir, file));
      return `dist/public/_lumina/client/${file}`;
    });
}

function staticHtmlOutputPath(routePath: string): string {
  if (routePath === "/") return "dist/public/index.html";
  return `dist/public${routePath}/index.html`;
}

function writeTextArtifact(appRoot: string, outputPath: string, value: string): void {
  const absolutePath = resolve(appRoot, ...outputPath.split("/"));
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, value, "utf8");
}

function writeJsonArtifact(appRoot: string, outputPath: string, value: unknown): void {
  writeTextArtifact(appRoot, outputPath, JSON.stringify(value));
}

function copyJsonArtifact(appRoot: string, _sourcePath: string, outputPath: string, value: unknown): void {
  writeJsonArtifact(appRoot, outputPath, value);
}

function writeServerEntry(appRoot: string, adapter: LuminaAdapter): string {
  const outputPath = ".lumina/generated/server-entry.ts";
  writeTextArtifact(appRoot, outputPath, createServerEntryModule(adapter));
  return outputPath;
}

function createServerEntryModule(adapter: LuminaAdapter): string {
  if (adapter === "bun") {
    return [
      'import { startBuiltLuminaApp } from "@lumina/adapter-bun";',
      "",
      'export const adapter = "bun";',
      'export const runtime = "bun";',
      "export { startBuiltLuminaApp };",
      "",
    ].join("\n");
  }

  throw new Error(`Unsupported adapter: ${adapter}`);
}

function createBunAdapterManifest(options: {
  hasSsrOutput?: boolean;
  config: NormalizedLuminaConfig;
  configSource: "lumina.config.ts" | null;
  serverEntry: string;
}) {
  const hasSsrOutput = options.hasSsrOutput ?? false;
  return {
    schemaVersion: "lumina.adapter.v0",
    adapter: "bun",
    package: "@lumina/adapter-bun",
    generatedBy: {
      package: "@lumina/vite-plugin",
      version: "0.0.0",
    },
    source: {
      config: options.configSource,
      normalizedConfig: options.config,
      routesManifest: "dist/routes.manifest.json",
      renderManifest: "dist/render.manifest.json",
      serverEntry: options.serverEntry,
      ssrRoutes: hasSsrOutput ? "dist/server/ssr-routes.js" : null,
    },
    runtime: {
      name: "bun",
    },
    publicDir: "dist/public",
    capabilities: {
      staticAssets: true,
      prerenderedHtml: true,
      ssr: hasSsrOutput,
      api: false,
      hotApi: false,
      streaming: false,
      healthEndpoint: false,
    },
    unsupported: [
      ...(hasSsrOutput ? [] : [{
        feature: "ssr",
        reason: "No SSR routes were emitted in this build output.",
      }]),
      {
        feature: "api",
        reason: "API routes are outside the current MVP build slice.",
      },
    ],
    diagnostics: [],
  };
}

function createBuildTrace(
  artifacts: string[],
  phases: LuminaBuildPhase[],
) {
  return {
    schemaVersion: "lumina.build-trace.v0",
    generatedBy: {
      package: "@lumina/compiler",
      version: "0.0.0",
    },
    phases: phases.map((phase) => ({
      name: phase.name,
      durationMs: 0,
      status: phase.status,
    })),
    artifacts: artifacts.sort(compareStrings),
    diagnostics: [],
  };
}

function createPerfReport(routes: RouteNode[], outputs: string[], appRoot: string) {
  return {
    schemaVersion: "lumina.perf-report.v0",
    generatedBy: {
      package: "@lumina/compiler",
      version: "0.0.0",
    },
    status: "not implemented",
    summary: {
      routeCount: routes.length,
      staticHtmlFiles: outputs.filter((output) => output.endsWith(".html")).length,
      note: "Initial MVP build report; measured browser payload and benchmark evidence are not implemented.",
    },
    routes: routes
      .filter((route) => route.kind === "page")
      .map((route) => {
        const outputPath = staticHtmlOutputPath(route.path);
        const hasStaticHtml = route.renderMode === "static" && route.params.length === 0 && outputs.includes(outputPath);
        return {
          routeId: route.id,
          path: route.path,
          mode: route.renderMode,
          htmlOutput: hasStaticHtml ? outputPath : null,
          htmlBytes: hasStaticHtml ? byteLengthOfFile(appRoot, outputPath) : 0,
          budgets: [],
          diagnostics: [],
        };
      }),
    benchmarks: [],
    diagnostics: [],
  };
}

function byteLengthOfFile(appRoot: string, outputPath: string): number {
  const absolutePath = resolve(appRoot, ...outputPath.split("/"));
  if (!existsSync(absolutePath)) return 0;
  return statSync(absolutePath).size;
}

function compareStrings(left: string, right: string): number {
  return left.localeCompare(right, "en");
}

async function timePhase<T>(phases: LuminaBuildPhase[], name: string, action: () => Promise<T> | T): Promise<T> {
  const startedAt = Date.now();
  const result = await action();
  phases.push({
    name,
    durationMs: elapsedSince(startedAt),
    status: "ok",
  });
  return result;
}

function timeSyncPhase<T>(phases: LuminaBuildPhase[], name: string, action: () => T): T {
  const startedAt = Date.now();
  const result = action();
  phases.push({
    name,
    durationMs: elapsedSince(startedAt),
    status: "ok",
  });
  return result;
}

function elapsedSince(startedAt: number): number {
  return Math.max(0, Date.now() - startedAt);
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll("\"", "&quot;");
}
