import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import * as compiler from "../packages/compiler/src/index";

const fixtureRoot = join(import.meta.dir, "fixtures", "route-discovery");

describe("compiler route discovery", () => {
  test("creates a deterministic routes manifest for the MVP app route grammar", () => {
    expect(typeof compiler.createRoutesManifest).toBe("function");

    const manifest = compiler.createRoutesManifest({
      appRoot: join(fixtureRoot, "basic-app"),
    });

    expect(manifest).toEqual({
      schemaVersion: "lumina.routes.v0",
      generatedBy: {
        package: "@lumina/compiler",
        version: "0.0.0",
      },
      source: {
        routeRoot: "app",
      },
      routes: [
        {
          id: "app.about.page",
          kind: "page",
          path: "/about",
          sourceFile: "app/about/page.tsx",
          renderMode: "static",
          segments: [{ kind: "static", value: "about" }],
          params: [],
          layouts: ["app/layout.tsx"],
          routeGroups: [],
          diagnostics: [],
        },
        {
          id: "app.$group_marketing.pricing.page",
          kind: "page",
          path: "/pricing",
          sourceFile: "app/(marketing)/pricing/page.tsx",
          renderMode: "static",
          segments: [
            { kind: "group", value: "marketing" },
            { kind: "static", value: "pricing" },
          ],
          params: [],
          layouts: ["app/layout.tsx"],
          routeGroups: ["marketing"],
          diagnostics: [],
        },
        {
          id: "app.docs.$parts.splat.page",
          kind: "page",
          path: "/docs/*",
          sourceFile: "app/docs/[...parts]/page.tsx",
          renderMode: "static",
          segments: [
            { kind: "static", value: "docs" },
            { kind: "catchAll", name: "parts" },
          ],
          params: [{ name: "parts", type: "string[]", required: true }],
          layouts: ["app/layout.tsx"],
          routeGroups: [],
          diagnostics: [],
        },
        {
          id: "app.blog.$slug.page",
          kind: "page",
          path: "/blog/:slug",
          sourceFile: "app/blog/[slug]/page.tsx",
          renderMode: "static",
          segments: [
            { kind: "static", value: "blog" },
            { kind: "dynamic", name: "slug" },
          ],
          params: [{ name: "slug", type: "string", required: true }],
          layouts: ["app/layout.tsx"],
          routeGroups: [],
          diagnostics: [],
        },
        {
          id: "app.page",
          kind: "page",
          path: "/",
          sourceFile: "app/page.tsx",
          renderMode: "static",
          segments: [],
          params: [],
          layouts: ["app/layout.tsx"],
          routeGroups: [],
          diagnostics: [],
        },
        {
          id: "app.api.health.api",
          kind: "api",
          path: "/api/health",
          sourceFile: "app/api/health.ts",
          renderMode: "api",
          segments: [
            { kind: "static", value: "api" },
            { kind: "static", value: "health" },
          ],
          params: [],
          layouts: [],
          routeGroups: [],
          diagnostics: [],
        },
        {
          id: "app.api.users.$id.api",
          kind: "api",
          path: "/api/users/:id",
          sourceFile: "app/api/users/[id].ts",
          renderMode: "api",
          segments: [
            { kind: "static", value: "api" },
            { kind: "static", value: "users" },
            { kind: "dynamic", name: "id" },
          ],
          params: [{ name: "id", type: "string", required: true }],
          layouts: [],
          routeGroups: [],
          diagnostics: [],
        },
      ],
      diagnostics: [],
    });
  });

  test("reports route group duplicate paths without dropping evidence", () => {
    expect(typeof compiler.createRoutesManifest).toBe("function");

    const manifest = compiler.createRoutesManifest({
      appRoot: join(fixtureRoot, "duplicate-groups"),
    });

    expect(manifest.routes.map((route) => route.sourceFile)).toEqual([
      "app/(marketing)/pricing/page.tsx",
      "app/(shop)/pricing/page.tsx",
    ]);
    expect(manifest.diagnostics).toEqual([
      {
        code: "ROUTE_DUPLICATE_PATH",
        severity: "error",
        category: "routing",
        message: "Multiple route files resolve to /pricing.",
        source: {
          file: "app/(marketing)/pricing/page.tsx",
          owner: "compiler",
        },
        routePath: "/pricing",
        docs: "docs/routing-contract.md#diagnostics",
        why: "Route groups do not contribute URL segments, so these files produce the same public path.",
        remediation: "Move one route to a different public segment or remove the duplicate page.",
        related: [
          {
            file: "app/(shop)/pricing/page.tsx",
            message: "This file also resolves to /pricing.",
          },
        ],
        tags: ["routing", "conflict"],
      },
    ]);
  });
});
