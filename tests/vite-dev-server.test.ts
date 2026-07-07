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
import { startLuminaDevServer } from "../packages/vite-plugin/src/index";

const repoRoot = join(import.meta.dir, "..");
const wwwRoot = join(repoRoot, "apps", "www");
const expectedWwwRoutes = [
  "/docs/concepts/app-graph",
  "/docs/guides/create-app",
  "/docs/reference/cli",
  "/docs/reference/manifest-contracts",
  "/docs/reference/routing",
  "/docs/community",
  "/docs/concepts",
  "/docs/deployment",
  "/docs/guides",
  "/docs/reference",
  "/docs/search",
  "/docs/start",
  "/about",
  "/benchmarks",
  "/docs",
  "/examples",
  "/roadmap",
  "/docs/*",
  "/",
];

describe("Vite dev integration", () => {
  test("serves apps/www routes with generated route, render, and map artifacts", async () => {
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot: wwwRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      expect(dev.routes.map((route) => route.path)).toEqual(expectedWwwRoutes);
      expect(dev.url).toStartWith("http://127.0.0.1:");

      const home = await fetch(`${dev.url}/`);
      expect(home.status).toBe(200);
      expect(home.headers.get("content-type")).toContain("text/html");
      const homeHtml = await home.text();
      expect(homeHtml).toContain("<h1>Your app ships with a map.</h1>");
      expect(homeHtml).toContain("data-theme-toggle");
      expect(homeHtml).toContain("Switch to light mode");
      expect(homeHtml).toContain("Graph relationship preview");
      expect(homeHtml).toContain("Generated outputs");
      expect(homeHtml).toContain("5 relationship edges");
      expect(homeHtml).toContain('data-lumina-route="/"');
      expect(homeHtml).toContain('<script type="module" src="/@lumina/client/app.page.js"></script>');

      const clientEntry = await fetch(`${dev.url}/@lumina/client/app.page.js`);
      expect(clientEntry.status).toBe(200);
      const clientEntryJs = await clientEntry.text();
      expect(clientEntryJs).toContain("hydrateRoot");
      expect(clientEntryJs).toContain("Your app ships with a map.");
      expect(clientEntryJs).toContain("document");

      const docs = await fetch(`${dev.url}/docs`);
      expect(docs.status).toBe(200);
      const docsHtml = await docs.text();
      expect(docsHtml).toContain("<h1>Documentation</h1>");
      expect(docsHtml).toContain('href="/docs/search"');
      expect(docsHtml).toContain("indexed pages");
      expect(docsHtml).toContain("All public docs pages");
      expect(docsHtml).toContain("SEO-First Rendering");

      const docsSearch = await fetch(`${dev.url}/docs/search?q=security`);
      expect(docsSearch.status).toBe(200);
      const docsSearchHtml = await docsSearch.text();
      expect(docsSearchHtml).toContain("<h1>Search Lumina docs</h1>");
      expect(docsSearchHtml).toContain('value="security"');
      expect(docsSearchHtml).toContain("<h3>Security</h3>");
      expect(docsSearchHtml).toContain("docs/public/reference/security.md");

      const cliDocs = await fetch(`${dev.url}/docs/reference/cli`);
      expect(cliDocs.status).toBe(200);
      expect(await cliDocs.text()).toContain("<h1>CLI Reference</h1>");

      const securityDocs = await fetch(`${dev.url}/docs/reference/security`);
      expect(securityDocs.status).toBe(200);
      const securityDocsHtml = await securityDocs.text();
      expect(securityDocsHtml).toContain("<h1>Security</h1>");
      expect(securityDocsHtml).toContain("<h2 id=\"current-status\">Current Status</h2>");
      expect(securityDocsHtml).toContain("Do not treat Lumina as security-audited");
      expect(securityDocsHtml).toContain("Agent-Safe Workflows");
      expect(securityDocsHtml).toContain('aria-current="page" href="/docs/reference/security"');

      const viteClient = await fetch(`${dev.url}/@vite/client`);
      expect(viteClient.status).toBe(200);
      expect(await viteClient.text()).toContain("createHotContext");

      const missing = await fetch(`${dev.url}/missing`);
      expect(missing.status).toBe(404);
      expect(await missing.text()).toContain("Route not found: /missing");

      for (const artifact of [
        ".lumina/routes.json",
        ".lumina/render-manifest.json",
        ".lumina/map.json",
      ]) {
        const path = join(wwwRoot, artifact);
        expect(existsSync(path)).toBe(true);
        expect(readFileSync(path, "utf8")).not.toContain("\n");
      }
    } finally {
      await dev.close();
    }
  }, 15_000);

  test("CLI can smoke-start and close the dev server", async () => {
    const port = await getFreePort();
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await cli.runCli(["dev", wwwRoot, "--port", String(port), "--once"], {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toEqual([]);
    expect(stdout).toHaveLength(1);
    expect(stdout[0]).toContain(`Lumina dev ${wwwRoot}`);
    expect(stdout[0]).toContain("Local http://127.0.0.1:");
    expect(stdout[0]).toContain(`Routes ${expectedWwwRoutes.length}`);
    expect(stdout[0]).toContain("Artifacts .lumina/routes.json, .lumina/render-manifest.json, .lumina/map.json");
    expect(stdout[0]).toContain("Phase                 Time      Status");
    expect(stdout[0]).toMatch(/route discovery\s+\d+ms\s+ok/);
    expect(stdout[0]).toMatch(/render manifest\s+\d+ms\s+ok/);
    expect(stdout[0]).toMatch(/map generation\s+\d+ms\s+ok/);
    expect(stdout[0]).toMatch(/client bundles\s+\d+ms\s+ok/);
    expect(stdout[0]).toMatch(/vite server\s+\d+ms\s+ok/);
    expect(stdout[0]).toMatch(/Ready in \d+ms/);
  });

  test("CLI smoke-start exits with a clear failure when the requested dev port is occupied", async () => {
    const blocker = await occupyRandomPort();
    const proc = Bun.spawn([
      "bun",
      "packages/cli/src/index.ts",
      "dev",
      "apps/www",
      "--port",
      String(blocker.port),
      "--once",
    ], {
      cwd: repoRoot,
      stdout: "pipe",
      stderr: "pipe",
    });

    let timedOut = false;
    try {
      const exitCode = await Promise.race([
        proc.exited,
        delay(8_000).then(async () => {
          timedOut = true;
          proc.kill();
          return await proc.exited;
        }),
      ]);
      const stdout = await new Response(proc.stdout).text();
      const stderr = await new Response(proc.stderr).text();

      expect(timedOut).toBe(false);
      expect(exitCode).not.toBe(0);
      expect(stdout).toBe("");
      expect(stderr).toContain(`Port ${blocker.port} is already in use`);
    } finally {
      await blocker.close();
    }
  }, 12_000);

  test("serves the virtual routes module during SSR", async () => {
    const appRoot = createVirtualRoutesApp();
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      const response = await fetchWithTimeout(`${dev.url}/`);
      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain("<h1>Virtual routes</h1>");
      expect(html).toContain("<p>/about,/</p>");
    } finally {
      await dev.close();
      rmSync(appRoot, { recursive: true, force: true });
    }
  });

  test("passes dynamic and catch-all route params to dev page renders", async () => {
    const appRoot = createDynamicRoutesApp();
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      const blog = await fetchWithTimeout(`${dev.url}/blog/hello-lumina`);
      expect(blog.status).toBe(200);
      const blogHtml = await blog.text();
      expect(blogHtml).toContain("<h1>Post");
      expect(blogHtml).toContain("hello-lumina</h1>");

      const docs = await fetchWithTimeout(`${dev.url}/docs/guide/getting-started`);
      expect(docs.status).toBe(200);
      const docsHtml = await docs.text();
      expect(docsHtml).toContain("<h1>Docs");
      expect(docsHtml).toContain("guide/getting-started</h1>");

      const missingParam = await fetchWithTimeout(`${dev.url}/blog`);
      expect(missingParam.status).toBe(404);
      expect(await missingParam.text()).toContain("Route not found: /blog");

      const search = await fetchWithTimeout(`${dev.url}/search?q=lumina&page=2`);
      expect(search.status).toBe(200);
      const searchHtml = await search.text();
      expect(searchHtml).toContain("<h1>Search");
      expect(searchHtml).toContain("lumina");
      expect(searchHtml).toContain("2</h1>");
    } finally {
      await dev.close();
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 15_000);

  test("uses not-found and error conventions in the dev server", async () => {
    const appRoot = createSpecialRoutesApp();
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      const rootMissing = await fetchWithTimeout(`${dev.url}/missing`);
      expect(rootMissing.status).toBe(404);
      const rootMissingHtml = await rootMissing.text();
      expect(rootMissingHtml).toContain("<h1>Root not found</h1>");
      expect(rootMissingHtml).toContain("<main>");

      const blogMissing = await fetchWithTimeout(`${dev.url}/blog/missing/extra`);
      expect(blogMissing.status).toBe(404);
      expect(await blogMissing.text()).toContain("<h1>Blog not found</h1>");

      const blogError = await fetchWithTimeout(`${dev.url}/blog/bad`);
      expect(blogError.status).toBe(500);
      const blogErrorHtml = await blogError.text();
      expect(blogErrorHtml).toContain("<h1>Blog error");
      expect(blogErrorHtml).toContain("broken bad");
    } finally {
      await dev.close();
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 15_000);

  test("regenerates route artifacts and HMR report when a page is added", async () => {
    const appRoot = createVirtualRoutesApp();
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      const routeDir = join(appRoot, "app", "contact");
      mkdirSync(routeDir, { recursive: true });
      writeFileSync(
        join(routeDir, "page.tsx"),
        [
          "export default function ContactPage() {",
          "  return <main><h1>Contact</h1></main>;",
          "}",
          "",
        ].join("\n"),
        "utf8",
      );

      await waitFor(() => {
        const routes = JSON.parse(readFileSync(join(appRoot, ".lumina", "routes.json"), "utf8"));
        return routes.routes.some((route: { path: string }) => route.path === "/contact");
      });

      const hmrReport = JSON.parse(readFileSync(join(appRoot, ".lumina", "hmr-report.json"), "utf8"));
      expect(hmrReport.schemaVersion).toBe("lumina.hmr-report.v0");
      expect(hmrReport.changedFile).toBe("app/contact/page.tsx");
      expect(hmrReport.routes.map((route: { path: string }) => route.path)).toContain("/contact");

      const response = await fetchWithTimeout(`${dev.url}/contact`);
      expect(response.status).toBe(200);
      expect(await response.text()).toContain("<h1>Contact</h1>");
    } finally {
      await dev.close();
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 15_000);

  test("reports affected routes when an imported component changes", async () => {
    const appRoot = createComponentHmrApp();
    const port = await getFreePort();
    const dev = await startLuminaDevServer({
      appRoot,
      host: "127.0.0.1",
      port,
      logLevel: "silent",
    });

    try {
      const initialResponse = await fetchWithTimeout(`${dev.url}/`);
      expect(initialResponse.status).toBe(200);
      expect(await initialResponse.text()).toContain("Hello from component");

      writeFileSync(
        join(appRoot, "components", "Greeting.tsx"),
        [
          "export function Greeting() {",
          "  return <strong>Hello after update</strong>;",
          "}",
          "",
        ].join("\n"),
        "utf8",
      );

      await waitFor(() => {
        const reportPath = join(appRoot, ".lumina", "hmr-report.json");
        if (!existsSync(reportPath)) return false;
        const report = JSON.parse(readFileSync(reportPath, "utf8"));
        return report.changedFile === "components/Greeting.tsx";
      });

      const hmrReport = JSON.parse(readFileSync(join(appRoot, ".lumina", "hmr-report.json"), "utf8"));
      expect(hmrReport.schemaVersion).toBe("lumina.hmr-report.v0");
      expect(hmrReport.changedFile).toBe("components/Greeting.tsx");
      expect(hmrReport.routes).toEqual([
        {
          id: "app.page",
          path: "/",
          sourceFile: "app/page.tsx",
          reason: "components/Greeting.tsx is imported by app/page.tsx, which defines /.",
        },
      ]);
      expect(hmrReport.artifacts).toEqual([".lumina/hmr-report.json", ".lumina/map.json"]);
    } finally {
      await dev.close();
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 15_000);
});

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

async function occupyRandomPort(): Promise<{ port: number; close: () => Promise<void> }> {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    try {
      server.listen(0, "127.0.0.1", () => {
        const address = server.address();
        if (typeof address !== "object" || !address) {
          server.close(() => reject(new Error("Unable to allocate a blocked localhost port.")));
          return;
        }
        resolve({
          port: address.port,
          close: async () => {
            await new Promise<void>((closeResolve, closeReject) => {
              server.close((error) => {
                if (error) closeReject(error);
                else closeResolve();
              });
            });
          },
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function createVirtualRoutesApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-vite-virtual-"));
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
      "import { routes } from \"virtual:lumina/routes\";",
      "",
      "export default function HomePage() {",
      "  return <main><h1>Virtual routes</h1><p>{routes.map((route) => route.path).join(\",\")}</p></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "about", "page.tsx"),
    [
      "export default function AboutPage() {",
      "  return <main><h1>About</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

function createComponentHmrApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-vite-component-hmr-"));
  mkdirSync(join(appRoot, "app"), { recursive: true });
  mkdirSync(join(appRoot, "components"), { recursive: true });

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
      "import { Greeting } from \"../components/Greeting\";",
      "",
      "export default function HomePage() {",
      "  return <main><h1>Home</h1><Greeting /></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "components", "Greeting.tsx"),
    [
      "export function Greeting() {",
      "  return <strong>Hello from component</strong>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

function createDynamicRoutesApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-vite-params-"));
  mkdirSync(join(appRoot, "app", "blog", "[slug]"), { recursive: true });
  mkdirSync(join(appRoot, "app", "docs", "[...parts]"), { recursive: true });
  mkdirSync(join(appRoot, "app", "search"), { recursive: true });

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
    join(appRoot, "app", "blog", "[slug]", "page.tsx"),
    [
      "export default function BlogPage({ params }: { params: { slug: string } }) {",
      "  return <main><h1>Post {params.slug}</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "docs", "[...parts]", "page.tsx"),
    [
      "export default function DocsPage({ params }: { params: { parts: string[] } }) {",
      "  return <main><h1>Docs {params.parts.join(\"/\")}</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "search", "page.tsx"),
    [
      "export default function SearchPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {",
      "  return <main><h1>Search {searchParams.q}/{searchParams.page}</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

function createSpecialRoutesApp(): string {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, "lumina-vite-special-"));
  mkdirSync(join(appRoot, "app", "blog", "[slug]"), { recursive: true });

  writeFileSync(
    join(appRoot, "app", "layout.tsx"),
    [
      "export default function RootLayout({ children }: { children: unknown }) {",
      "  return <html lang=\"en\"><body><main>{children}</main></body></html>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "not-found.tsx"),
    [
      "export default function RootNotFound() {",
      "  return <h1>Root not found</h1>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "error.tsx"),
    [
      "export default function RootError({ error }: { error: Error }) {",
      "  return <h1>Root error {error.message}</h1>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "blog", "not-found.tsx"),
    [
      "export default function BlogNotFound() {",
      "  return <h1>Blog not found</h1>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "blog", "[slug]", "page.tsx"),
    [
      "export default function BlogPage({ params }: { params: { slug: string } }) {",
      "  if (params.slug === \"bad\") throw new Error(`broken ${params.slug}`);",
      "  return <h1>Blog {params.slug}</h1>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "blog", "[slug]", "error.tsx"),
    [
      "export default function BlogError({ error }: { error: Error }) {",
      "  return <h1>Blog error {error.message}</h1>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}

async function waitFor(assertion: () => boolean): Promise<void> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 5_000) {
    if (assertion()) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Timed out waiting for assertion.");
}

async function fetchWithTimeout(url: string): Promise<Response> {
  return await fetch(url, { signal: AbortSignal.timeout(5_000) });
}
