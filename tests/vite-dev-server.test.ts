import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:net";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import * as cli from "../packages/cli/src/index";
import { startLuminaDevServer } from "../packages/vite-plugin/src/index";

const repoRoot = join(import.meta.dir, "..");
const wwwRoot = join(repoRoot, "apps", "www");

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
      expect(dev.routes.map((route) => route.path)).toEqual([
        "/about",
        "/benchmarks",
        "/docs",
        "/examples",
        "/roadmap",
        "/",
      ]);
      expect(dev.url).toStartWith("http://127.0.0.1:");

      const home = await fetch(`${dev.url}/`);
      expect(home.status).toBe(200);
      expect(home.headers.get("content-type")).toContain("text/html");
      const homeHtml = await home.text();
      expect(homeHtml).toContain("<h1>Your app ships with a map.</h1>");
      expect(homeHtml).toContain('data-lumina-route="/"');

      const docs = await fetch(`${dev.url}/docs`);
      expect(docs.status).toBe(200);
      expect(await docs.text()).toContain("<h1>Documentation</h1>");

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
  });

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
    expect(stdout[0]).toContain("Routes 6");
    expect(stdout[0]).toContain("Artifacts .lumina/routes.json, .lumina/render-manifest.json, .lumina/map.json");
  });
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
