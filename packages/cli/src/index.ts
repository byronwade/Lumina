import { resolve } from "node:path";
import {
  writeLuminaMap,
  writeRenderManifest,
  writeRoutesManifest,
} from "@lumina/compiler";
import { startLuminaDevServer } from "@lumina/vite-plugin";

export const luminaCliStatus = {
  name: "@lumina/cli",
  phase: "implemented",
  implementsRuntimeBehavior: false,
} as const;

export type CliIo = {
  stdout?: (text: string) => void;
  stderr?: (text: string) => void;
};

export async function runCli(argv: string[], io: CliIo = {}): Promise<number> {
  const stdout = io.stdout ?? ((text: string) => console.log(text));
  const stderr = io.stderr ?? ((text: string) => console.error(text));
  const [command, appPath, ...flags] = argv;

  if (command === "routes" && appPath && flags.includes("--json")) {
    const result = writeRoutesManifest({ appRoot: resolve(appPath) });
    stdout(
      JSON.stringify({
        schemaVersion: "lumina.cli.v0",
        command: "lumina routes",
        status: "ok",
        data: {
          artifact: result.path,
          routes: result.manifest.routes,
        },
        diagnostics: result.manifest.diagnostics,
        meta: {
          cwd: ".",
        },
      }),
    );
    return 0;
  }

  if (command === "inspect" && appPath && flags.includes("--json")) {
    const inspection = inspectApp(resolve(appPath));
    stdout(
      JSON.stringify({
        schemaVersion: "lumina.cli.v0",
        command: "lumina inspect",
        status: "ok",
        data: {
          target: ".",
          summary: inspection.summary,
          related: inspection.artifacts,
        },
        diagnostics: inspection.diagnostics,
        meta: {
          cwd: ".",
        },
      }),
    );
    return 0;
  }

  if (command === "inspect" && appPath && flags[0] === "why" && flags[1]) {
    const inspection = inspectApp(resolve(appPath));
    const route = inspection.routes.find((candidate) => candidate.path === flags[1]);
    if (!route) {
      stderr(`Route not found: ${flags[1]}`);
      return 3;
    }

    stdout(
      [
        `Route ${route.path}`,
        `Source: ${route.sourceFile}`,
        `Render mode: ${route.renderMode}`,
        `Layouts: ${route.layouts.length ? route.layouts.join(", ") : "none"}`,
        `Artifacts: ${inspection.artifacts.join(", ")}`,
        `Why: ${route.sourceFile} defines the ${route.path} route; ${route.layouts.length ? `${route.layouts.join(", ")} wraps it` : "no layout wraps it"}; the render manifest records ${route.renderMode} mode.`,
      ].join("\n"),
    );
    return 0;
  }

  if (command === "dev" && appPath) {
    const appRoot = resolve(appPath);
    const portFlagIndex = flags.indexOf("--port");
    const port = portFlagIndex >= 0 ? Number(flags[portFlagIndex + 1]) : undefined;
    const dev = await startLuminaDevServer({
      appRoot,
      port: Number.isFinite(port) ? port : undefined,
    });

    stdout(
      [
        `Lumina dev ${appPath}`,
        `Local ${dev.url}`,
        `Routes ${dev.routes.length}`,
        "Artifacts .lumina/routes.json, .lumina/render-manifest.json, .lumina/map.json",
      ].join("\n"),
    );

    if (flags.includes("--once")) {
      await dev.close();
      return 0;
    }

    await waitForShutdown(dev.close);
    return 0;
  }

  stderr("Usage: lumina dev <appPath> [--port <port>] | lumina routes <appPath> --json | lumina inspect <appPath> --json | lumina inspect <appPath> why <route>");
  return 2;
}

function inspectApp(appRoot: string) {
  const routesResult = writeRoutesManifest({ appRoot });
  const renderResult = writeRenderManifest({ appRoot });
  const mapResult = writeLuminaMap({ appRoot });
  const routes = routesResult.manifest.routes;

  return {
    routes,
    artifacts: [
      routesResult.path,
      renderResult.path,
      mapResult.path,
    ],
    diagnostics: [
      ...routesResult.manifest.diagnostics,
      ...renderResult.manifest.diagnostics,
      ...mapResult.map.diagnostics,
    ],
    summary: {
      routeCount: routes.length,
      pageCount: routes.filter((route) => route.kind === "page").length,
      apiRouteCount: routes.filter((route) => route.kind === "api").length,
      staticRouteCount: routes.filter((route) => route.renderMode === "static").length,
      artifactCount: 3,
    },
  };
}

async function waitForShutdown(close: () => Promise<void>): Promise<void> {
  await new Promise<void>((resolveShutdown) => {
    const shutdown = () => resolveShutdown();
    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
  });
  await close();
}

if (import.meta.main) {
  const exitCode = await runCli(process.argv.slice(2));
  process.exit(exitCode);
}
