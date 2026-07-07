import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:net";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import * as cli from "../packages/cli/src/index";

const repoRoot = join(import.meta.dir, "..");
const wwwRoot = join(repoRoot, "apps", "www");

describe("static build and Bun start integration", () => {
  test("Bun adapter request path stays generated-output only", () => {
    const adapterSource = readFileSync(join(repoRoot, "packages", "adapters", "bun", "src", "index.ts"), "utf8");

    for (const forbidden of [
      "@lumina/compiler",
      "@lumina/map",
      "@lumina/agent",
      "@lumina/mcp",
      "@lumina/devtools",
      "node:fs",
      "readFile",
      "readdir",
      "glob",
      ".lumina/build-trace",
      ".lumina/hmr-report",
      "docs/",
    ]) {
      expect(adapterSource).not.toContain(forbidden);
    }

    expect(adapterSource).toContain("dist/public");
    expect(adapterSource).toContain("Bun.file");
  });

  test("CLI build emits static HTML, manifests, and early build reports for apps/www", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["build", wwwRoot, "--json"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = JSON.parse(stdout[0]!);
    expect(output.schemaVersion).toBe("lumina.cli.v0");
    expect(output.command).toBe("lumina build");
    expect(output.status).toBe("ok");
    expect(output.data.routes).toBe(19);
    expect(output.data.outputs).toContain("dist/public/index.html");
    expect(output.data.outputs).toContain("dist/public/about/index.html");
    expect(output.data.outputs).toContain("dist/public/docs/reference/cli/index.html");
    expect(output.data.outputs).toContain("dist/server/ssr-routes.js");
    expect(output.data.outputs).toContain("dist/public/docs-index.json");
    expect(output.data.outputs).toContain("dist/public/docs-navigation.json");
    expect(output.data.outputs).toContain("dist/public/llms.txt");
    expect(output.data.outputs).toContain("dist/public/llms-full.txt");
    expect(output.data.outputs).toContain("dist/public/_lumina/client/app.page.js");
    expect(output.data.manifests).toContain(".lumina/build-trace.json");
    expect(output.data.manifests).toContain(".lumina/perf.report.json");
    expect(output.data.manifests).toContain("dist/adapter.manifest.json");

    for (const artifact of [
      ".lumina/routes.json",
      ".lumina/render-manifest.json",
      ".lumina/map.json",
      ".lumina/build-trace.json",
      ".lumina/perf.report.json",
      "dist/routes.manifest.json",
      "dist/render.manifest.json",
      "dist/adapter.manifest.json",
      "dist/public/docs-index.json",
      "dist/public/docs-navigation.json",
    ]) {
      const artifactPath = join(wwwRoot, artifact);
      expect(existsSync(artifactPath)).toBe(true);
      expect(readFileSync(artifactPath, "utf8")).not.toContain("\n");
    }

    const docsIndexText = readFileSync(join(wwwRoot, "dist", "public", "docs-index.json"), "utf8");
    const docsIndex = JSON.parse(docsIndexText);
    expect(docsIndex.schemaVersion).toBe("lumina.docs-index.v0");
    expect(docsIndex.docsVersion).toBe("unreleased");
    expect(docsIndex.pages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          slug: "reference/security",
          href: "/docs/reference/security",
          source: "docs/public/reference/security.md",
        }),
      ]),
    );
    expect(docsIndexText).not.toContain(wwwRoot);
    expect(docsIndexText).not.toMatch(/[A-Za-z]:\\/);

    const docsNavigationText = readFileSync(join(wwwRoot, "dist", "public", "docs-navigation.json"), "utf8");
    const docsNavigation = JSON.parse(docsNavigationText);
    expect(docsNavigation.schemaVersion).toBe("lumina.docs-navigation.v0");
    expect(docsNavigation.docsVersion).toBe("unreleased");
    expect(docsNavigation.sections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Reference",
          kind: "curated",
          links: expect.arrayContaining([
            expect.objectContaining({
              href: "/docs/reference/security",
              source: "docs/public/reference/security.md",
            }),
          ]),
        }),
        expect.objectContaining({
          title: "Reference",
          kind: "inventory",
          links: expect.arrayContaining([
            expect.objectContaining({
              href: "/docs/reference/security",
              source: "docs/public/reference/security.md",
            }),
          ]),
        }),
      ]),
    );
    expect(docsNavigationText).not.toContain(wwwRoot);
    expect(docsNavigationText).not.toMatch(/[A-Za-z]:\\/);

    const llmsTxt = readFileSync(join(wwwRoot, "dist", "public", "llms.txt"), "utf8");
    expect(llmsTxt).toContain("# Lumina Documentation");
    expect(llmsTxt).toContain("/docs/reference/security");
    expect(llmsTxt).not.toContain(wwwRoot);

    const llmsFullTxt = readFileSync(join(wwwRoot, "dist", "public", "llms-full.txt"), "utf8");
    expect(llmsFullTxt).toContain("# Security");
    expect(llmsFullTxt).toContain("Do not treat Lumina as security-audited");
    expect(llmsFullTxt).not.toContain(wwwRoot);

    const homeHtml = readFileSync(join(wwwRoot, "dist", "public", "index.html"), "utf8");
    expect(homeHtml).toContain("<h1>Your app ships with a map.</h1>");
    expect(homeHtml).toContain("data-theme-toggle");
    expect(homeHtml).toContain("Switch to light mode");
    expect(homeHtml).toContain("Graph relationship preview");
    expect(homeHtml).toContain("Generated outputs");
    expect(homeHtml).toContain("5 relationship edges");
    expect(homeHtml).toContain('data-lumina-route="/"');
    expect(homeHtml).toContain('aria-label="Site footer"');
    expect(homeHtml).toContain("Your app ships with a map.");
    expect(homeHtml).toContain("Docs artifacts");
    expect(homeHtml).toContain("docs-index.json");
    expect(homeHtml).toContain("Website fixture: apps/www");
    expect(homeHtml).toContain('<script type="module" src="/_lumina/client/app.page.js"></script>');
    expect(readFileSync(join(wwwRoot, "dist", "public", "_lumina", "client", "app.page.js"), "utf8")).toContain("hydrateRoot");

    const aboutHtml = readFileSync(join(wwwRoot, "dist", "public", "about", "index.html"), "utf8");
    expect(aboutHtml).toContain('aria-label="Why Lumina Exists page evidence"');
    expect(aboutHtml).toContain("app/about/page.tsx");
    expect(aboutHtml).toContain("Current thesis");

    const benchmarksHtml = readFileSync(join(wwwRoot, "dist", "public", "benchmarks", "index.html"), "utf8");
    expect(benchmarksHtml).toContain('aria-label="Benchmarks page evidence"');
    expect(benchmarksHtml).toContain("app/benchmarks/page.tsx");
    expect(benchmarksHtml).toContain("Measured surfaces");

    const examplesHtml = readFileSync(join(wwwRoot, "dist", "public", "examples", "index.html"), "utf8");
    expect(examplesHtml).toContain('aria-label="Examples page evidence"');
    expect(examplesHtml).toContain("app/examples/page.tsx");
    expect(examplesHtml).toContain("Fixture catalog");

    const roadmapHtml = readFileSync(join(wwwRoot, "dist", "public", "roadmap", "index.html"), "utf8");
    expect(roadmapHtml).toContain('aria-label="Roadmap page evidence"');
    expect(roadmapHtml).toContain("app/roadmap/page.tsx");
    expect(roadmapHtml).toContain("Alpha path");

    const docsHomeHtml = readFileSync(join(wwwRoot, "dist", "public", "docs", "index.html"), "utf8");
    expect(docsHomeHtml).toContain('aria-label="Documentation page evidence"');
    expect(docsHomeHtml).toContain("app/docs/page.tsx");
    expect(docsHomeHtml).toContain("Docs index");
    expect(docsHomeHtml).toContain("Jump straight to the contract you need.");
    expect(docsHomeHtml).toContain("docs-navigation.json");
    expect(docsHomeHtml).toContain("/docs/search?q=performance");

    const docsStartHtml = readFileSync(join(wwwRoot, "dist", "public", "docs", "start", "index.html"), "utf8");
    expect(docsStartHtml).toContain('aria-label="Breadcrumb"');
    expect(docsStartHtml).toContain("Docs version");
    expect(docsStartHtml).toContain("Unreleased");
    expect(docsStartHtml).toContain("Navigation JSON");
    expect(docsStartHtml).toContain("Page contents");
    expect(docsStartHtml).toContain("Reader context");
    expect(docsStartHtml).toContain("Search docs");
    expect(docsStartHtml).toContain("Open source");
    expect(docsStartHtml).toContain("Edit this page on GitHub");
    expect(docsStartHtml).toContain("Scroll to top");

    const buildTrace = readFileSync(join(wwwRoot, ".lumina", "build-trace.json"), "utf8");
    const perfReport = readFileSync(join(wwwRoot, ".lumina", "perf.report.json"), "utf8");
    const secondBuildExitCode = await cli.runCli(["build", wwwRoot, "--json"], {
      stdout: () => {},
      stderr: (text) => stderr.push(text),
    });
    expect(secondBuildExitCode).toBe(0);
    expect(readFileSync(join(wwwRoot, ".lumina", "build-trace.json"), "utf8")).toBe(buildTrace);
    expect(readFileSync(join(wwwRoot, ".lumina", "perf.report.json"), "utf8")).toBe(perfReport);
  }, 20_000);

  test("CLI build human output shows stable timed phases", async () => {
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["build", wwwRoot], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);

    const output = stdout[0]!;
    expect(output).toContain(`Lumina build ${wwwRoot}`);
    expect(output).toContain("Routes     19");
    expect(output).toContain("Artifacts  .lumina/routes.json, .lumina/render-manifest.json, .lumina/map.json");
    expect(output).toContain("Phase                 Time      Status");
    expect(output).toMatch(/^config\s+\d+ms\s+ok$/m);
    expect(output).toMatch(/^route discovery\s+\d+ms\s+ok$/m);
    expect(output).toMatch(/^render manifest\s+\d+ms\s+ok$/m);
    expect(output).toMatch(/^map generation\s+\d+ms\s+ok$/m);
    expect(output).toMatch(/^client bundles\s+\d+ms\s+ok$/m);
    expect(output).toMatch(/^static output\s+\d+ms\s+ok$/m);
    expect(output).toMatch(/^public docs artifacts\s+\d+ms\s+ok$/m);
    expect(output).toMatch(/^adapter output\s+\d+ms\s+ok$/m);
    expect(output).toMatch(/^Done in \d+ms$/m);
  }, 20_000);

  test("CLI build loads lumina.config.ts and emits adapter-aware server entry", async () => {
    const appRoot = createConfiguredBuildStartApp();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const exitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(exitCode).toBe(0);
      expect(stderr).toEqual([]);
      expect(stdout).toHaveLength(1);

      const output = JSON.parse(stdout[0]!);
      expect(output.data.manifests).toContain(".lumina/generated/server-entry.ts");
      expect(output.data.manifests).toContain("dist/adapter.manifest.json");

      const serverEntryPath = join(appRoot, ".lumina", "generated", "server-entry.ts");
      expect(existsSync(serverEntryPath)).toBe(true);
      const serverEntry = readFileSync(serverEntryPath, "utf8");
      expect(serverEntry).toContain('@lumina/adapter-bun');
      expect(serverEntry).toContain('export const adapter = "bun"');
      expect(serverEntry).toContain("startBuiltLuminaApp");

      const adapterManifest = JSON.parse(readFileSync(join(appRoot, "dist", "adapter.manifest.json"), "utf8"));
      expect(adapterManifest.adapter).toBe("bun");
      expect(adapterManifest.runtime.name).toBe("bun");
      expect(adapterManifest.source.config).toBe("lumina.config.ts");
      expect(adapterManifest.source.normalizedConfig).toEqual({
        schemaVersion: "lumina.config.v0",
        appDir: "app",
        outputDir: ".lumina",
        outDir: "dist",
        runtime: "bun",
        adapter: "bun",
        mode: "production",
      });
      expect(adapterManifest.source.serverEntry).toBe(".lumina/generated/server-entry.ts");
      expect(JSON.stringify(adapterManifest)).not.toContain(appRoot);
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("CLI build reports config diagnostics for unsupported adapters in JSON mode", async () => {
    const appRoot = createConfiguredBuildStartApp({ adapter: "edge" });
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const exitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(exitCode).toBe(3);
      expect(stderr).toEqual([]);
      expect(stdout).toHaveLength(1);

      const output = JSON.parse(stdout[0]!);
      expect(output.schemaVersion).toBe("lumina.cli.v0");
      expect(output.command).toBe("lumina build");
      expect(output.status).toBe("error");
      expect(output.data).toEqual({
        routes: 0,
        outputs: [],
        manifests: [],
      });
      expect(output.diagnostics).toEqual([
        expect.objectContaining({
          code: "CONFIG_INVALID_ADAPTER",
          severity: "error",
          category: "config",
          message: 'Unsupported adapter "edge".',
          source: {
            file: "lumina.config.ts",
            owner: "compiler",
          },
        }),
      ]);
      expect(existsSync(join(appRoot, "dist", "adapter.manifest.json"))).toBe(false);
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("Bun adapter serves built static output without source route files", async () => {
    const appRoot = createBuildStartApp();

    try {
      const buildExitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: () => {},
        stderr: () => {},
      });
      expect(buildExitCode).toBe(0);

      rmSync(join(appRoot, "app"), { recursive: true, force: true });

      const { startBuiltLuminaApp } = await import("../packages/adapters/bun/src/index");
      expect(typeof startBuiltLuminaApp).toBe("function");

      const port = await getFreePort();
      const server = await startBuiltLuminaApp({
        appRoot,
        host: "127.0.0.1",
        port,
      });

      try {
        const home = await fetchWithTimeout(`${server.url}/`);
        expect(home.status).toBe(200);
        expect(home.headers.get("content-type")).toContain("text/html");
        expect(home.headers.get("cache-control")).toBe("no-store");
        expect(await home.text()).toContain("<h1>Built Home</h1>");

        const about = await fetchWithTimeout(`${server.url}/about`);
        expect(about.status).toBe(200);
        expect(about.headers.get("cache-control")).toBe("no-store");
        expect(await about.text()).toContain("<h1>Built About</h1>");

        const clientBundle = await fetchWithTimeout(`${server.url}/_lumina/client/app.page.js`);
        expect(clientBundle.status).toBe(200);
        expect(clientBundle.headers.get("content-type")).toContain("application/javascript");
        expect(clientBundle.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
        expect(await clientBundle.text()).toContain("hydrateRoot");

        const missing = await fetchWithTimeout(`${server.url}/missing`);
        expect(missing.status).toBe(404);
        expect(missing.headers.get("cache-control")).toBe("no-store");
        expect(await missing.text()).toContain("Lumina route not found");

        const malformedAsset = await fetchWithTimeout(`${server.url}/%E0%A4%A.js`);
        expect(malformedAsset.status).toBe(400);
        expect(malformedAsset.headers.get("content-type")).toContain("text/html");
        expect(malformedAsset.headers.get("cache-control")).toBe("no-store");
        const malformedBody = await malformedAsset.text();
        expect(malformedBody).toContain("Lumina request invalid");
        expect(malformedBody).not.toContain("URIError");
        expect(malformedBody).not.toContain("decodeURIComponent");
      } finally {
        await server.close();
      }
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("Bun adapter serves the public docs inventory catch-all from built SSR output", async () => {
    const buildExitCode = await cli.runCli(["build", wwwRoot, "--json"], {
      stdout: () => {},
      stderr: () => {},
    });
    expect(buildExitCode).toBe(0);

    const { startBuiltLuminaApp } = await import("../packages/adapters/bun/src/index");
    const server = await startBuiltLuminaApp({
      appRoot: wwwRoot,
      host: "127.0.0.1",
      port: await getFreePort(),
    });

    try {
      const security = await fetchWithTimeout(`${server.url}/docs/reference/security`);
      expect(security.status).toBe(200);
      const securityHtml = await security.text();
      expect(securityHtml).toContain("<h1>Security</h1>");
      expect(securityHtml).toContain("docs/public/reference/security.md");
      expect(securityHtml).toContain("<h2 id=\"current-status\">Current Status</h2>");
      expect(securityHtml).toContain("Do not treat Lumina as security-audited");
      expect(securityHtml).toContain("<li>Auth and sessions.</li>");
      expect(securityHtml).toContain('data-lumina-route="/docs/*"');
      expect(securityHtml).toContain("Agent-Safe Workflows");
      expect(securityHtml).toContain('aria-current="page" href="/docs/reference/security"');
      expect(securityHtml).toContain("<span>Route</span>");
      expect(securityHtml).toContain("<code>/docs/reference/security</code>");
      expect(securityHtml).toContain("<small>Previous</small>");
      expect(securityHtml).toContain("<small>Next</small>");
      expect(securityHtml).toContain("Related source docs");
      expect(securityHtml).toContain("docs/security-contract.md");
      expect(securityHtml).toContain("Page contents");
      expect(securityHtml).toContain("Reader context");
      expect(securityHtml).toContain("Markdown snapshot");
      expect(securityHtml).toContain("Open source");
      expect(securityHtml).toContain("Edit this page on GitHub");
      expect(securityHtml).toContain("Scroll to top");
      expect(securityHtml).toContain('aria-label="Breadcrumb"');
      expect(securityHtml).toContain("Docs version");
      expect(securityHtml).toContain("Navigation JSON");
      expect(securityHtml).toContain("/docs-navigation.json");
      expect(securityHtml).toContain("/llms.txt");
      expect(securityHtml).toContain("https://github.com/byronwade/Lumina/blob/main/docs/public/reference/security.md");

      const cache = await fetchWithTimeout(`${server.url}/docs/reference/cache`);
      expect(cache.status).toBe(200);
      const cacheHtml = await cache.text();
      expect(cacheHtml).toContain("<h1>Cache</h1>");
      expect(cacheHtml).toContain("docs-table-scroll");
      expect(cacheHtml).toContain("<table>");
      expect(cacheHtml).toContain("<th>Surface</th>");
      expect(cacheHtml).toContain("<td>Hashed static assets</td>");
      expect(cacheHtml).toContain("<td>Public immutable cache.</td>");
      expect(cacheHtml).toContain("<code>no-store</code>");

      const search = await fetchWithTimeout(`${server.url}/docs/search?q=adapter`);
      expect(search.status).toBe(200);
      const searchHtml = await search.text();
      expect(searchHtml).toContain("<h1>Search Lumina docs</h1>");
      expect(searchHtml).toContain('aria-label="Search Lumina docs page evidence"');
      expect(searchHtml).toContain("app/docs/search/page.tsx");
      expect(searchHtml).toContain("SSR search");
      expect(searchHtml).toContain('aria-label="Site footer"');
      expect(searchHtml).toContain("Docs artifacts");
      expect(searchHtml).toContain("llms-full.txt");
      expect(searchHtml).toContain('value="adapter"');
      expect(searchHtml).toContain("<h3>Adapters</h3>");
      expect(searchHtml).toContain("docs/public/reference/adapters.md");
      expect(searchHtml).toContain("Search uses the same bundled docs index that ships as JSON.");
      expect(searchHtml).toContain("/docs/search?q=security");
      expect(searchHtml).toContain('data-lumina-route="/docs/search"');

      const docsIndex = await fetchWithTimeout(`${server.url}/docs-index.json`);
      expect(docsIndex.status).toBe(200);
      expect(docsIndex.headers.get("content-type")).toContain("application/json");
      const docsIndexBody = await docsIndex.text();
      expect(docsIndexBody).toContain('"schemaVersion":"lumina.docs-index.v0"');
      expect(docsIndexBody).toContain('"href":"/docs/reference/security"');

      const docsNavigation = await fetchWithTimeout(`${server.url}/docs-navigation.json`);
      expect(docsNavigation.status).toBe(200);
      expect(docsNavigation.headers.get("content-type")).toContain("application/json");
      const docsNavigationBody = await docsNavigation.text();
      expect(docsNavigationBody).toContain('"schemaVersion":"lumina.docs-navigation.v0"');
      expect(docsNavigationBody).toContain('"kind":"inventory"');
      expect(docsNavigationBody).toContain('"href":"/docs/reference/security"');

      const llms = await fetchWithTimeout(`${server.url}/llms.txt`);
      expect(llms.status).toBe(200);
      expect(llms.headers.get("content-type")).toContain("text/plain");
      expect(await llms.text()).toContain("# Lumina Documentation");

      const llmsFull = await fetchWithTimeout(`${server.url}/llms-full.txt`);
      expect(llmsFull.status).toBe(200);
      expect(llmsFull.headers.get("content-type")).toContain("text/plain");
      expect(await llmsFull.text()).toContain("# Security");
    } finally {
      await server.close();
    }
  }, 20_000);

  test("Bun adapter serves built SSR output without source route files and sanitizes SSR errors", async () => {
    const appRoot = createSsrBuildStartApp();

    try {
      const stdout: string[] = [];
      const buildExitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: (text) => stdout.push(text),
        stderr: () => {},
      });
      expect(buildExitCode).toBe(0);

      const output = JSON.parse(stdout[0]!);
      expect(output.data.outputs).toContain("dist/public/index.html");
      expect(output.data.outputs).toContain("dist/server/ssr-routes.js");

      const adapterManifest = JSON.parse(readFileSync(join(appRoot, "dist", "adapter.manifest.json"), "utf8"));
      expect(adapterManifest.capabilities.ssr).toBe(true);
      expect(adapterManifest.unsupported.map((item: { feature: string }) => item.feature)).not.toContain("ssr");

      rmSync(join(appRoot, "app"), { recursive: true, force: true });

      const { startBuiltLuminaApp } = await import("../packages/adapters/bun/src/index");
      const server = await startBuiltLuminaApp({
        appRoot,
        host: "127.0.0.1",
        port: await getFreePort(),
      });

      try {
        const dashboard = await fetchWithTimeout(`${server.url}/dashboard?tab=reports`);
        expect(dashboard.status).toBe(200);
        expect(dashboard.headers.get("content-type")).toContain("text/html");
        expect(dashboard.headers.get("cache-control")).toBe("no-store");
        const dashboardBody = await dashboard.text();
        expect(dashboardBody).toContain("<h1>SSR Dashboard</h1>");
        expect(dashboardBody).toContain("reports");
        expect(dashboardBody).toContain('data-lumina-route="/dashboard"');

        const broken = await fetchWithTimeout(`${server.url}/broken`);
        expect(broken.status).toBe(500);
        expect(broken.headers.get("cache-control")).toBe("no-store");
        const brokenBody = await broken.text();
        expect(brokenBody).toContain("Lumina server error");
        expect(brokenBody).not.toContain("Exploded SSR secret");
        expect(brokenBody).not.toContain(appRoot);
      } finally {
        await server.close();
      }
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("CLI can smoke-start built output and close", async () => {
    const appRoot = createBuildStartApp();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const buildExitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: () => {},
        stderr: () => {},
      });
      expect(buildExitCode).toBe(0);

      const port = await getFreePort();
      const startExitCode = await cli.runCli(["start", appRoot, "--port", String(port), "--once"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(startExitCode).toBe(0);
      expect(stderr).toEqual([]);
      expect(stdout).toHaveLength(1);
      expect(stdout[0]).toContain(`Lumina start ${appRoot}`);
      expect(stdout[0]).toContain("Local http://127.0.0.1:");
      expect(stdout[0]).toContain("Routes 2");
      expect(stdout[0]).toContain("Serving dist/public");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("CLI start reports a clean error before build output exists", async () => {
    const appRoot = createBuildStartApp();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const port = await getFreePort();
      const startExitCode = await cli.runCli(["start", appRoot, "--port", String(port), "--once"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(startExitCode).toBe(4);
      expect(stdout).toEqual([]);
      expect(stderr).toHaveLength(1);
      expect(stderr[0]).toContain("Build output not found");
      expect(stderr[0]).toContain("lumina build");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);
});

function createBuildStartApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-build-start-"));
  mkdirSync(join(appRoot, "app", "about"), { recursive: true });

  writeFileSync(
    join(appRoot, "app", "layout.tsx"),
    [
      "export default function RootLayout({ children }: { children: unknown }) {",
      "  return <html lang=\"en\"><body>{children}</body></html>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "page.tsx"),
    [
      "export default function HomePage() {",
      "  return <main><h1>Built Home</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "about", "page.tsx"),
    [
      "export default function AboutPage() {",
      "  return <main><h1>Built About</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

function createConfiguredBuildStartApp(options: { adapter?: string } = {}): string {
  const appRoot = createBuildStartApp();
  const adapter = options.adapter ?? "bun";
  writeFileSync(
    join(appRoot, "lumina.config.ts"),
    [
      'import { defineConfig } from "lumina";',
      "",
      "export default defineConfig({",
      '  appDir: "app",',
      '  outputDir: ".lumina",',
      '  outDir: "dist",',
      '  runtime: "bun",',
      `  adapter: "${adapter}",`,
      "});",
      "",
    ].join("\n"),
    "utf8",
  );
  return appRoot;
}

function createSsrBuildStartApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-ssr-build-start-"));
  for (const directory of ["app", "app/dashboard", "app/broken"]) {
    mkdirSync(join(appRoot, directory), { recursive: true });
  }

  writeFileSync(
    join(appRoot, "app", "layout.tsx"),
    [
      "export default function RootLayout({ children }: { children: unknown }) {",
      "  return <html lang=\"en\"><body>{children}</body></html>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "page.tsx"),
    [
      "export default function HomePage() {",
      "  return <main><h1>Static Home</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "dashboard", "page.tsx"),
    [
      "import { ssr } from \"@lumina/react\";",
      "export const render = ssr();",
      "export default function DashboardPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {",
      "  return <main><h1>SSR Dashboard</h1><p>{searchParams.tab}</p></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "broken", "page.tsx"),
    [
      "import { ssr } from \"@lumina/react\";",
      "export const render = ssr();",
      "export default function BrokenPage() {",
      "  throw new Error(\"Exploded SSR secret\");",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

async function getFreePort(): Promise<number> {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address === "object" && address) {
        const port = address.port;
        server.close(() => resolve(port));
      } else {
        server.close(() => reject(new Error("Unable to allocate a localhost port.")));
      }
    });
  });
}

async function fetchWithTimeout(url: string): Promise<Response> {
  return await fetch(url, { signal: AbortSignal.timeout(5_000) });
}
