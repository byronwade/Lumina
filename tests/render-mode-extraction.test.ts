import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import * as compiler from "../packages/compiler/src/index";
import { ssr, staticPage } from "../packages/react/src/index";

describe("explicit render mode extraction", () => {
  test("staticPage and ssr helpers return stable render mode definitions", () => {
    expect(staticPage()).toEqual({
      kind: "lumina.render-mode",
      mode: "static",
    });
    expect(ssr()).toEqual({
      kind: "lumina.render-mode",
      mode: "ssr",
    });
  });

  test("compiler records explicit static and SSR modes with diagnostics for unsupported declarations", () => {
    const appRoot = createRenderModeApp();

    try {
      const routesManifest = compiler.createRoutesManifest({ appRoot });
      const renderManifest = compiler.createRenderManifest({ appRoot });
      const map = compiler.createLuminaMap({ appRoot });

      expect(routesManifest.routes.find((route) => route.path === "/")?.renderMode).toBe("ssr");
      expect(routesManifest.routes.find((route) => route.path === "/about")?.renderMode).toBe("static");
      expect(renderManifest.routes.find((route) => route.path === "/")?.mode).toBe("ssr");
      expect(renderManifest.routes.find((route) => route.path === "/about")?.mode).toBe("static");

      expect(routesManifest.diagnostics.map((diagnostic) => diagnostic.code)).toEqual([
        "RENDER_MODE_INVALID_EXPORT",
        "RENDER_MODE_UNSUPPORTED",
      ]);
      expect(routesManifest.diagnostics.map((diagnostic) => diagnostic.source?.file)).toEqual([
        "app/bad/page.tsx",
        "app/planned/page.tsx",
      ]);
      expect(renderManifest.diagnostics).toEqual(routesManifest.diagnostics);

      expect(map.edges).toContainEqual({
        id: "edge:route:app.page:render",
        from: "route:/",
        to: "artifact:.lumina/render-manifest.json",
        kind: "route.renderMode",
        source: "convention",
        confidence: "medium",
        why: "The render manifest records ssr mode for /.",
      });
    } finally {
      rmSync(appRoot, { recursive: true, force: true });
    }
  });
});

function createRenderModeApp(): string {
  const appRoot = mkdtempSync(join(tmpdir(), "lumina-render-modes-"));
  for (const directory of ["app", "app/about", "app/bad", "app/planned"]) {
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
      "import { ssr } from \"@lumina/react\";",
      "export const render = ssr();",
      "export default function HomePage() {",
      "  return <main><h1>SSR Home</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "about", "page.tsx"),
    [
      "import { staticPage } from \"@lumina/react\";",
      "export const render = staticPage();",
      "export default function AboutPage() {",
      "  return <main><h1>Static About</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "bad", "page.tsx"),
    [
      "export const render = \"dynamic\";",
      "export default function BadPage() {",
      "  return <main><h1>Bad Render</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );
  writeFileSync(
    join(appRoot, "app", "planned", "page.tsx"),
    [
      "import { stream } from \"@lumina/react\";",
      "export const render = stream();",
      "export default function PlannedPage() {",
      "  return <main><h1>Planned Render</h1></main>;",
      "}",
      "",
    ].join("\n"),
    "utf8",
  );

  return appRoot;
}
