import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { cp } from "node:fs/promises";
import { createServer } from "node:net";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, test } from "bun:test";
import * as cli from "../packages/cli/src/index";
import * as compiler from "../packages/compiler/src/index";

const repoRoot = join(import.meta.dir, "..");

async function createWritableCopy(relativePath: string, prefix: string): Promise<string> {
  const appRoot = mkdtempSync(join(tmpdir(), prefix));
  await cp(join(repoRoot, relativePath), appRoot, { recursive: true });
  return appRoot;
}

async function createRepoWritableCopy(relativePath: string, prefix: string): Promise<string> {
  const scratchRoot = join(repoRoot, ".tmp");
  mkdirSync(scratchRoot, { recursive: true });
  const appRoot = mkdtempSync(join(scratchRoot, prefix));
  await cp(join(repoRoot, relativePath), appRoot, { recursive: true });
  return appRoot;
}

describe("MVP app and example fixtures", () => {
  test("apps/www public pages keep current evidence labels honest", () => {
    const aboutPage = readFileSync(join(repoRoot, "apps/www/app/about/page.tsx"), "utf8");
    const benchmarksPage = readFileSync(join(repoRoot, "apps/www/app/benchmarks/page.tsx"), "utf8");
    const examplesPage = readFileSync(join(repoRoot, "apps/www/app/examples/page.tsx"), "utf8");

    expect(aboutPage).toContain('{ label: "Check gate", value: "Passing"');
    expect(aboutPage).toContain("docs, types, tests, browser smoke");
    expect(aboutPage).not.toContain('value: "44"');
    expect(examplesPage).toContain('<ExampleCard name="Blog SEO" status="Runnable" path="examples/blog-seo" />');
    expect(benchmarksPage).toContain("bun run lumina -- bench route-discovery --json");
    expect(benchmarksPage).toContain("does not execute benchmark code");
  });

  test("apps/www is a real marketing app fixture for route, render, map, and inspect output", async () => {
    const appRoot = await createWritableCopy("apps/www", "lumina-www-");
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const manifest = compiler.createRoutesManifest({ appRoot });
      expect(manifest.routes.map((route) => route.path)).toEqual([
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
      ]);

      compiler.writeRoutesManifest({ appRoot });
      compiler.writeRenderManifest({ appRoot });
      compiler.writeLuminaMap({ appRoot });

      for (const artifact of [
        ".lumina/routes.json",
        ".lumina/render-manifest.json",
        ".lumina/map.json",
      ]) {
        const raw = readFileSync(join(appRoot, artifact), "utf8");
        expect(raw).not.toContain("\n");
        expect(raw).not.toContain(repoRoot);
      }

      const exitCode = await cli.runCli(["inspect", appRoot, "why", "/"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });
      expect(exitCode).toBe(0);
      expect(stderr).toEqual([]);
      expect(stdout[0]).toContain("Source: app/page.tsx");
      expect(readFileSync(join(appRoot, "README.md"), "utf8")).toContain("Status: Verified.");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });

  test("examples/basic and examples/blog-seo expose their current fixture status honestly", () => {
    const basic = compiler.createRoutesManifest({ appRoot: join(repoRoot, "examples/basic") });
    const blogSeo = compiler.createRoutesManifest({ appRoot: join(repoRoot, "examples/blog-seo") });

    expect(basic.routes.map((route) => route.path)).toEqual(["/"]);
    expect(blogSeo.routes.map((route) => route.path)).toEqual(["/blog/:slug", "/"]);

    for (const relativePath of [
      "examples/basic/README.md",
      "examples/basic/lumina.config.ts",
      "examples/blog-seo/README.md",
      "examples/blog-seo/lumina.config.ts",
      "examples/blog-seo/content/posts/hello-lumina.md",
    ]) {
      expect(existsSync(join(repoRoot, relativePath))).toBe(true);
    }

    expect(readFileSync(join(repoRoot, "examples/basic/README.md"), "utf8")).toContain("Status: Verified.");
    expect(readFileSync(join(repoRoot, "examples/blog-seo/README.md"), "utf8")).toContain("Example status: Runnable.");
  });

  test("examples/basic is a verified starter for dev, build, start, and generated artifacts", async () => {
    const appRoot = await createRepoWritableCopy("examples/basic", "lumina-basic-");
    const packageJson = JSON.parse(readFileSync(join(repoRoot, "examples/basic/package.json"), "utf8"));

    try {
      expect(packageJson.scripts.dev).toBe("bun ../../packages/cli/src/index.ts dev .");
      expect(packageJson.scripts.build).toBe("bun ../../packages/cli/src/index.ts build .");
      expect(packageJson.scripts.start).toBe("bun ../../packages/cli/src/index.ts start .");

      const devExitCode = await cli.runCli(["dev", appRoot, "--port", String(await getFreePort()), "--once"], {
        stdout: () => {},
        stderr: () => {},
      });
      expect(devExitCode).toBe(0);

      const buildExitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: () => {},
        stderr: () => {},
      });
      expect(buildExitCode).toBe(0);

      for (const artifact of [
        ".lumina/routes.json",
        ".lumina/render-manifest.json",
        ".lumina/map.json",
        ".lumina/build-trace.json",
        ".lumina/perf.report.json",
        "dist/routes.manifest.json",
        "dist/render.manifest.json",
        "dist/adapter.manifest.json",
      ]) {
        const raw = readFileSync(join(appRoot, artifact), "utf8");
        expect(raw).not.toContain("\n");
        expect(raw).not.toContain(repoRoot);
      }

      const routesManifest = JSON.parse(readFileSync(join(appRoot, ".lumina/routes.json"), "utf8"));
      expect(routesManifest.routes.map((route: { path: string }) => route.path)).toEqual(["/"]);

      const renderManifest = JSON.parse(readFileSync(join(appRoot, ".lumina/render-manifest.json"), "utf8"));
      expect(renderManifest.routes).toEqual([
        expect.objectContaining({ path: "/", mode: "static" }),
      ]);

      const map = JSON.parse(readFileSync(join(appRoot, ".lumina/map.json"), "utf8"));
      expect(map.edges).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            from: "route:/",
            to: "file:app/page.tsx",
            kind: "route.source",
            why: expect.stringContaining("defines the / route"),
          }),
        ]),
      );

      rmSync(join(appRoot, "app"), { recursive: true, force: true });

      const { startBuiltLuminaApp } = await import("../packages/adapters/bun/src/index");
      const server = await startBuiltLuminaApp({
        appRoot,
        host: "127.0.0.1",
        port: await getFreePort(),
      });

      try {
        const home = await fetchWithTimeout(`${server.url}/`);
        expect(home.status).toBe(200);
        expect(home.headers.get("cache-control")).toBe("no-store");
        expect(await home.text()).toContain("<h1>Basic Lumina App</h1>");
      } finally {
        await server.close();
      }

      expect(readFileSync(join(repoRoot, "examples/basic/README.md"), "utf8")).toContain("Status: Verified.");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("examples/blog-seo is a runnable content example with honest static-output limits", async () => {
    const appRoot = await createRepoWritableCopy("examples/blog-seo", "lumina-blog-seo-");
    const packageJson = JSON.parse(readFileSync(join(repoRoot, "examples/blog-seo/package.json"), "utf8"));

    try {
      expect(packageJson.scripts.dev).toBe("bun ../../packages/cli/src/index.ts dev .");
      expect(packageJson.scripts.build).toBe("bun ../../packages/cli/src/index.ts build .");
      expect(packageJson.scripts.start).toBe("bun ../../packages/cli/src/index.ts start .");

      const { startLuminaDevServer } = await import("../packages/vite-plugin/src/index");
      const dev = await startLuminaDevServer({
        appRoot,
        port: await getFreePort(),
        logLevel: "silent",
      });

      try {
        const index = await fetchWithTimeout(`${dev.url}/`);
        expect(index.status).toBe(200);
        expect(await index.text()).toContain("<h1>Blog SEO Example</h1>");

        const post = await fetchWithTimeout(`${dev.url}/blog/hello-lumina`);
        expect(post.status).toBe(200);
        expect(await post.text()).toContain("<h1>Hello Lumina</h1>");
      } finally {
        await dev.close();
      }

      const buildExitCode = await cli.runCli(["build", appRoot, "--json"], {
        stdout: () => {},
        stderr: () => {},
      });
      expect(buildExitCode).toBe(0);

      for (const artifact of [
        ".lumina/routes.json",
        ".lumina/render-manifest.json",
        ".lumina/map.json",
        ".lumina/build-trace.json",
        ".lumina/perf.report.json",
        "dist/routes.manifest.json",
        "dist/render.manifest.json",
        "dist/adapter.manifest.json",
      ]) {
        const raw = readFileSync(join(appRoot, artifact), "utf8");
        expect(raw).not.toContain("\n");
        expect(raw).not.toContain(repoRoot);
      }

      const routesManifest = JSON.parse(readFileSync(join(appRoot, ".lumina/routes.json"), "utf8"));
      expect(routesManifest.routes.map((route: { path: string }) => route.path)).toEqual(["/blog/:slug", "/"]);

      const map = JSON.parse(readFileSync(join(appRoot, ".lumina/map.json"), "utf8"));
      expect(map.edges).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            from: "route:/blog/:slug",
            to: "file:app/blog/[slug]/page.tsx",
            kind: "route.source",
          }),
          expect.objectContaining({
            from: "file:app/page.tsx",
            to: "file:components/PostCard.tsx",
            kind: "file.imports",
          }),
        ]),
      );

      const whyStdout: string[] = [];
      const whyExitCode = await cli.runCli(["inspect", appRoot, "why", "/blog/:slug"], {
        stdout: (text) => whyStdout.push(text),
        stderr: () => {},
      });
      expect(whyExitCode).toBe(0);
      expect(whyStdout[0]).toContain("Source: app/blog/[slug]/page.tsx");

      rmSync(join(appRoot, "app"), { recursive: true, force: true });

      const { startBuiltLuminaApp } = await import("../packages/adapters/bun/src/index");
      const server = await startBuiltLuminaApp({
        appRoot,
        host: "127.0.0.1",
        port: await getFreePort(),
      });

      try {
        const index = await fetchWithTimeout(`${server.url}/`);
        expect(index.status).toBe(200);
        expect(await index.text()).toContain("<h1>Blog SEO Example</h1>");

        const dynamicPost = await fetchWithTimeout(`${server.url}/blog/hello-lumina`);
        expect(dynamicPost.status).toBe(404);
      } finally {
        await server.close();
      }

      expect(readFileSync(join(repoRoot, "examples/blog-seo/README.md"), "utf8")).toContain("Example status: Runnable.");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  }, 20_000);

  test("multi-app and generated large-route examples have deterministic artifact evidence", async () => {
    const marketing = compiler.createRoutesManifest({
      appRoot: join(repoRoot, "examples/multi-app-workspace/apps/marketing"),
    });
    const docs = compiler.createRoutesManifest({
      appRoot: join(repoRoot, "examples/multi-app-workspace/apps/docs"),
    });

    expect(marketing.routes.map((route) => route.path)).toEqual(["/"]);
    expect(docs.routes.map((route) => route.path)).toEqual(["/"]);

    for (const fixture of [
      { path: "examples/large-100-routes", expectedRoutes: 100, status: "Example status: Runnable." },
      { path: "examples/large-1000-routes", expectedRoutes: 1000, status: "Example status: Runnable." },
    ]) {
      const appRoot = mkdtempSync(join(tmpdir(), "lumina-large-routes-"));
      const cliStdout: string[] = [];
      const cliStderr: string[] = [];

      try {
        const routeWidth = fixture.expectedRoutes.toString().length;
        const generator = join(repoRoot, fixture.path, "scripts", "generate-routes.ts");
        const proc = Bun.spawnSync(["bun", generator, appRoot], {
          stdout: "pipe",
          stderr: "pipe",
        });

        expect(proc.exitCode).toBe(0);
        expect(proc.stderr.toString()).toBe("");

        const manifest = compiler.createRoutesManifest({ appRoot });
        expect(manifest.routes).toHaveLength(fixture.expectedRoutes);
        expect(manifest.routes[0]?.path).toBe(`/route-${"1".padStart(routeWidth, "0")}`);
        expect(manifest.routes.at(-1)?.path).toBe(`/route-${fixture.expectedRoutes.toString().padStart(routeWidth, "0")}`);

        compiler.writeRoutesManifest({ appRoot });
        compiler.writeRenderManifest({ appRoot });
        compiler.writeLuminaMap({ appRoot });

        for (const artifact of [
          ".lumina/routes.json",
          ".lumina/render-manifest.json",
          ".lumina/map.json",
        ]) {
          const raw = readFileSync(join(appRoot, artifact), "utf8");
          expect(raw).not.toContain("\n");
          expect(raw).not.toContain(repoRoot);
          expect(raw).not.toContain(appRoot);
        }

        const routesRaw = readFileSync(join(appRoot, ".lumina/routes.json"), "utf8");
        const renderRaw = readFileSync(join(appRoot, ".lumina/render-manifest.json"), "utf8");
        const mapRaw = readFileSync(join(appRoot, ".lumina/map.json"), "utf8");
        const routesManifest = JSON.parse(routesRaw);
        const renderManifest = JSON.parse(renderRaw);
        const map = JSON.parse(mapRaw);

        expect(routesManifest.routes.map((route: { path: string }) => route.path)).toEqual(
          manifest.routes.map((route) => route.path),
        );
        expect(renderManifest.routes).toHaveLength(fixture.expectedRoutes);
        expect(map.edges.filter((edge: { kind: string }) => edge.kind === "route.source")).toHaveLength(
          fixture.expectedRoutes,
        );
        expect(routesRaw.length).toBeGreaterThan(fixture.expectedRoutes * 100);
        expect(renderRaw.length).toBeGreaterThan(fixture.expectedRoutes * 50);
        expect(mapRaw.length).toBeGreaterThan(fixture.expectedRoutes * 100);

        const routesExitCode = await cli.runCli(["routes", appRoot, "--json"], {
          stdout: (text) => cliStdout.push(text),
          stderr: (text) => cliStderr.push(text),
        });
        expect(routesExitCode).toBe(0);
        expect(cliStderr).toEqual([]);
        expect(cliStdout.join("")).not.toContain("\n");
        const cliRoutes = JSON.parse(cliStdout.join(""));
        expect(cliRoutes.data.routes).toHaveLength(fixture.expectedRoutes);
        expect(cliRoutes.data.routes[0]?.path).toBe(manifest.routes[0]?.path);
        expect(cliRoutes.data.routes.at(-1)?.path).toBe(manifest.routes.at(-1)?.path);

        const readme = readFileSync(join(repoRoot, fixture.path, "README.md"), "utf8");
        expect(readme).toContain(fixture.status);
        expect(readme).toContain(".lumina/routes.json");
        expect(readme).toContain(".lumina/render-manifest.json");
        expect(readme).toContain(".lumina/map.json");
        expect(readme).toContain("manifest-size");
      } finally {
        rmSync(appRoot, { recursive: true, force: true });
      }
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

async function fetchWithTimeout(url: string): Promise<Response> {
  return await fetch(url, { signal: AbortSignal.timeout(5_000) });
}
