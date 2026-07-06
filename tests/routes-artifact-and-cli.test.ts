import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { cp } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, test } from "bun:test";
import * as cli from "../packages/cli/src/index";
import * as compiler from "../packages/compiler/src/index";

const routeFixture = join(import.meta.dir, "fixtures", "route-discovery", "basic-app");

async function createWritableFixture(): Promise<string> {
  const appRoot = mkdtempSync(join(tmpdir(), "lumina-routes-"));
  await cp(routeFixture, appRoot, { recursive: true });
  return appRoot;
}

describe("routes artifact generation and CLI output", () => {
  test("writes compact .lumina/routes.json with deterministic manifest data", async () => {
    const appRoot = await createWritableFixture();
    try {
      expect(typeof compiler.writeRoutesManifest).toBe("function");

      const result = compiler.writeRoutesManifest({ appRoot });
      const artifactPath = join(appRoot, ".lumina", "routes.json");
      const raw = readFileSync(artifactPath, "utf8");

      expect(result).toEqual({
        path: ".lumina/routes.json",
        manifest: compiler.createRoutesManifest({ appRoot }),
      });
      expect(raw).not.toContain("\n");
      expect(JSON.parse(raw)).toEqual(result.manifest);
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });

  test("prints JSON-only route data for routes command", async () => {
    const appRoot = await createWritableFixture();
    const stdout: string[] = [];
    const stderr: string[] = [];

    try {
      expect(typeof cli.runCli).toBe("function");

      const exitCode = await cli.runCli(["routes", appRoot, "--json"], {
        stdout: (text) => stdout.push(text),
        stderr: (text) => stderr.push(text),
      });

      expect(exitCode).toBe(0);
      expect(stderr).toEqual([]);
      expect(stdout).toHaveLength(1);

      const payload = JSON.parse(stdout[0]!);
      expect(payload).toEqual({
        schemaVersion: "lumina.cli.v0",
        command: "lumina routes",
        status: "ok",
        data: {
          artifact: ".lumina/routes.json",
          routes: compiler.createRoutesManifest({ appRoot }).routes,
        },
        diagnostics: [],
        meta: {
          cwd: ".",
        },
      });

      expect(readFileSync(join(appRoot, ".lumina", "routes.json"), "utf8")).not.toContain("\n");
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });
});
