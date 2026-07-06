import { writeLuminaMap, writeRenderManifest, writeRoutesManifest } from "@lumina/compiler";
import type { RouteNode } from "@lumina/core";
import { createElement, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { createServer, type ViteDevServer } from "vite";

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
  close: () => Promise<void>;
};

export async function startLuminaDevServer(options: LuminaDevServerOptions): Promise<LuminaDevServer> {
  const routesResult = writeRoutesManifest({ appRoot: options.appRoot });
  writeRenderManifest({ appRoot: options.appRoot });
  writeLuminaMap({ appRoot: options.appRoot });

  const routes = routesResult.manifest.routes.filter((route) => route.kind === "page");

  let vite: ViteDevServer;
  vite = await createServer({
    appType: "custom",
    configFile: false,
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    optimizeDeps: {
      include: ["react", "react-dom/server"],
    },
    root: options.appRoot,
    logLevel: options.logLevel ?? "info",
    server: {
      host: options.host ?? "127.0.0.1",
      port: options.port ?? 5173,
      strictPort: false,
    },
    plugins: [
      {
        name: "lumina-dev-renderer",
        configureServer(server) {
          server.middlewares.use(async (request, response, next) => {
            const url = normalizeRequestPath(request.url ?? "/");
            if (shouldPassThroughToVite(request.method, url)) {
              next();
              return;
            }

            const route = findRoute(routes, url);

            if (!route) {
              response.statusCode = 404;
              response.setHeader("Content-Type", "text/html; charset=utf-8");
              response.end(`<!doctype html><h1>Route not found: ${escapeHtml(url)}</h1>`);
              return;
            }

            try {
              const html = await renderRoute(server, route, url);
              response.statusCode = 200;
              response.setHeader("Content-Type", "text/html; charset=utf-8");
              response.end(html);
            } catch (error) {
              if (error instanceof Error) server.ssrFixStacktrace(error);
              response.statusCode = 500;
              response.setHeader("Content-Type", "text/html; charset=utf-8");
              response.end(`<!doctype html><h1>Lumina dev render failed</h1><pre>${escapeHtml(error instanceof Error ? error.message : String(error))}</pre>`);
            }
          });
        },
      },
    ],
  });

  await vite.listen();

  return {
    url: resolveServerUrl(vite),
    routes,
    close: () => vite.close(),
  };
}

async function renderRoute(server: ViteDevServer, route: RouteNode, url: string): Promise<string> {
  const pageModule = await server.ssrLoadModule(`/${route.sourceFile}`);
  const Page = pageModule.default;
  if (typeof Page !== "function") {
    throw new Error(`${route.sourceFile} must export a default page component.`);
  }

  let app: ReactNode = createElement(Page);

  for (const layout of [...route.layouts].reverse()) {
    const layoutModule = await server.ssrLoadModule(`/${layout}`);
    const Layout = layoutModule.default;
    if (typeof Layout !== "function") {
      throw new Error(`${layout} must export a default layout component.`);
    }
    app = createElement(Layout, { children: app });
  }

  const appHtml = renderToString(app);
  const html = `<!doctype html>${appHtml}<div data-lumina-route="${escapeAttribute(route.path)}"></div><script type="module" src="/@vite/client"></script>`;
  return server.transformIndexHtml(url, html);
}

function findRoute(routes: RouteNode[], url: string): RouteNode | undefined {
  return routes.find((route) => route.path === url);
}

function normalizeRequestPath(url: string): string {
  const pathname = new URL(url, "http://lumina.local").pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function shouldPassThroughToVite(method: string | undefined, pathname: string): boolean {
  if (method && method !== "GET" && method !== "HEAD") return true;
  return pathname.startsWith("/@vite/")
    || pathname.startsWith("/@fs/")
    || pathname.startsWith("/node_modules/")
    || /\.[a-zA-Z0-9]+$/.test(pathname);
}

function resolveServerUrl(server: ViteDevServer): string {
  const local = server.resolvedUrls?.local[0];
  if (!local) throw new Error("Vite dev server did not expose a local URL.");
  return local.replace(/\/$/, "");
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll("\"", "&quot;");
}
