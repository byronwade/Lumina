import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  createGraphEdge,
  needleCoreStatus,
  type AdapterManifest,
  type CachePlan,
  type GraphEdge,
  type NeedleApp,
  type NeedleDiagnostic,
  type RenderMode,
  type RouteNode,
} from "../packages/core/src/index";

const root = resolve(import.meta.dir, "..");

describe("Phase 1 scaffold", () => {
  test("root package exposes enforcement scripts", () => {
    const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts["docs:check"]).toBe("bun scripts/check-docs.ts");
    expect(packageJson.scripts["structure:check"]).toBe("bun scripts/check-structure.ts");
    expect(packageJson.scripts["performance:check"]).toBe("bun scripts/check-performance-docs.ts");
  });

  test("core graph edges keep required evidence fields", () => {
    const edge = createGraphEdge({
      id: "edge:route-home-to-page",
      from: "route:/",
      to: "file:app/page.tsx",
      kind: "route.source",
      source: "file",
      confidence: "high",
      why: "The route manifest maps / to app/page.tsx.",
    });

    expect(edge.kind).toBe("route.source");
    expect(edge.source).toBe("file");
    expect(edge.confidence).toBe("high");
    expect(edge.why.length).toBeGreaterThan(0);
  });

  test("shared core types are available for future packages", () => {
    const renderMode: RenderMode = "static";
    const app: NeedleApp = {
      name: "fixture",
      root: "/repo",
      routes: [],
      diagnostics: [],
    };
    const route: RouteNode = {
      id: "route:/",
      path: "/",
      sourceFile: "app/page.tsx",
      renderMode,
    };
    const diagnostic: NeedleDiagnostic = {
      code: "NEEDLE_PLACEHOLDER",
      severity: "info",
      message: "Placeholder diagnostic shape.",
    };
    const cache: CachePlan = { mode: "no-store" };
    const publicCache: CachePlan = {
      mode: "public",
      ttlSeconds: 60,
      staleWhileRevalidateSeconds: 300,
      tags: ["home"],
    };
    const adapter: AdapterManifest = {
      schemaVersion: "needle.adapter.v0",
      adapter: "bun",
      package: "@needle/adapter-bun",
      runtime: { name: "bun" },
      capabilities: {},
      unsupported: [],
    };
    const edge: GraphEdge = createGraphEdge({
      id: "edge:example",
      from: route.id,
      to: "file:app/page.tsx",
      kind: "route.source",
      source: "file",
      confidence: "high",
      why: "Example edge for scaffold type coverage.",
    });

    expect(app.name).toBe("fixture");
    expect(route.renderMode).toBe("static");
    expect(diagnostic.severity).toBe("info");
    expect(cache.mode).toBe("no-store");
    expect(publicCache.ttlSeconds).toBe(60);
    expect(publicCache.staleWhileRevalidateSeconds).toBe(300);
    expect(adapter.runtime.name).toBe("bun");
    expect(edge.why).toContain("scaffold");
    expect(needleCoreStatus.implementsRuntimeBehavior).toBe(false);
  });

  test("agent playbooks stay under docs", () => {
    expect(existsSync(join(root, "skills"))).toBe(false);
    expect(existsSync(join(root, "subagents"))).toBe(false);
    expect(existsSync(join(root, "docs/skills"))).toBe(true);
    expect(existsSync(join(root, "docs/subagents"))).toBe(true);
  });
});
