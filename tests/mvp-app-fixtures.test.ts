import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { cp } from "node:fs/promises";
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

describe("MVP app and example fixtures", () => {
  test("apps/www is a real marketing app fixture for route, render, map, and inspect output", async () => {
    const appRoot = await createWritableCopy("apps/www", "lumina-www-");
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      const manifest = compiler.createRoutesManifest({ appRoot });
      expect(manifest.routes.map((route) => route.path)).toEqual([
        "/about",
        "/benchmarks",
        "/docs",
        "/examples",
        "/roadmap",
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
      expect(readFileSync(join(appRoot, "README.md"), "utf8")).toContain("Status: Scaffolded.");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });

  test("examples/basic and examples/blog-seo are scaffolded as compiler-verifiable examples", () => {
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

    expect(readFileSync(join(repoRoot, "examples/basic/README.md"), "utf8")).toContain("Status: Scaffolded.");
    expect(readFileSync(join(repoRoot, "examples/blog-seo/README.md"), "utf8")).toContain("Status: Scaffolded.");
  });

  test("multi-app and generated large-route examples have deterministic scaffold evidence", async () => {
    const marketing = compiler.createRoutesManifest({
      appRoot: join(repoRoot, "examples/multi-app-workspace/apps/marketing"),
    });
    const docs = compiler.createRoutesManifest({
      appRoot: join(repoRoot, "examples/multi-app-workspace/apps/docs"),
    });

    expect(marketing.routes.map((route) => route.path)).toEqual(["/"]);
    expect(docs.routes.map((route) => route.path)).toEqual(["/"]);

    for (const fixture of [
      { path: "examples/large-100-routes", expectedRoutes: 100 },
      { path: "examples/large-1000-routes", expectedRoutes: 1000 },
    ]) {
      const appRoot = mkdtempSync(join(tmpdir(), "lumina-large-routes-"));

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
        expect(readFileSync(join(repoRoot, fixture.path, "README.md"), "utf8")).toContain("Status: Scaffolded.");
      } finally {
        rmSync(appRoot, { recursive: true, force: true });
      }
    }
  }, 15_000);
});
