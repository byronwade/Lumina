# Project Structure

Status: Planned.

Audience: app developers, framework contributors, AI agents.

Lumina apps are planned to use a small application root, file-based routes under `app/`, generated framework artifacts under `.lumina/`, and production output under `dist/`.

The repository is in Phase 1 scaffold. This page describes target MVP Alpha application structure, the scaffolded `apps/www` and example source fixtures, and scaffolded repository structure, not verified generated app output.

## Scaffolded MVP App Structure

Current source fixture:

```txt
apps/www/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    docs/page.tsx
    benchmarks/page.tsx
    examples/page.tsx
    roadmap/page.tsx
  components/
    Hero.tsx
    FeatureGrid.tsx
    SpeedPanel.tsx
    MapPreview.tsx
    ExampleCard.tsx
  lumina.config.ts
  package.json
  README.md
```

This fixture is scaffolded, compiler-verifiable, and runnable through the minimal local `lumina dev` path. It is not yet a production build/start app.

## Target Generated App Structure

Planned generated app:

```txt
my-app/
  app/
    layout.tsx
    page.tsx
    about/
      page.tsx
    (marketing)/
      pricing/
        page.tsx
    blog/
      [slug]/
        page.tsx
  components/
    Hero.tsx
    PricingCard.tsx
  lumina.config.ts
  package.json
  public/
```

| Path | Purpose | Status |
| --- | --- | --- |
| `app/layout.tsx` | Root layout for the demo app. | Planned |
| `app/page.tsx` | Home page route at `/`. | Planned |
| `app/about/page.tsx` | Basic static page route at `/about`. | Planned |
| `app/(marketing)/pricing/page.tsx` | Route group example that maps to `/pricing`. | Planned |
| `app/blog/[slug]/page.tsx` | Dynamic route example that maps to `/blog/:slug`. | Planned |
| `components/*.tsx` | Imported UI components for map edges. | Planned |
| `lumina.config.ts` | Framework config. | Planned |
| `public/` | Static assets copied to output. | Planned |
| `.lumina/` | Generated route, render, and map artifacts. | Implemented for routes, default render modes, and first file-level map |
| `dist/` | Built production output once build behavior exists. | Planned |

## MVP Alpha Generated Files

Planned MVP Alpha generated files:

```txt
.lumina/
  routes.json
  render-manifest.json
  map.json
```

The generated artifact names are `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json`. They are canonical compiler and map contracts for the first prototype.

Generated files must be deterministic and must not be edited manually.

## Future Generated Files

Future work after MVP Alpha may add:

```txt
.lumina/
  graph.json
  seo.report.json
  perf.report.json
  workspace.json
  workspace-graph.json
  affected.json
  build-trace.json
  cache-report.json
  hmr-report.json
  split-report.json
  context/
    *.ctx.json
    agent-index.json
  mutations.json
  generated/
dist/
  routes.manifest.json
  render.manifest.json
  seo.report.json
  adapter.manifest.json
  *
```

These future artifacts must not be described as implemented until the packages, commands, tests, and generated output exist.

The future generated artifact names are `.lumina/graph.json`, `.lumina/seo.report.json`, `.lumina/perf.report.json`, `.lumina/workspace.json`, `.lumina/workspace-graph.json`, `.lumina/affected.json`, `.lumina/build-trace.json`, `.lumina/cache-report.json`, `.lumina/hmr-report.json`, `.lumina/split-report.json`, `.lumina/context/*.ctx.json`, `.lumina/context/agent-index.json`, `.lumina/mutations.json`, `.lumina/generated/*`, `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, and `dist/*`.

## Repository Structure

Lumina itself is scaffolded as a Bun workspace with package workspaces under `packages/`, adapter package workspaces under `packages/adapters/`, repository scripts under `scripts/`, tests under `tests/`, and documentation under `docs/`.

Scaffolded example directories now exist under `examples/basic/`, `examples/blog-seo/`, `examples/multi-app-workspace/`, `examples/large-100-routes/`, and `examples/large-1000-routes/`. Public docs may describe those directories as scaffolded only; they must not describe them as runnable or verified until the commands, runtime behavior, generated artifacts, and example evidence exist.

Planned test fixture structure is defined in [Testing](testing.md) and the internal [Testing Contract](../../testing-contract.md).

Root-level AI collaboration playbooks should not exist. The canonical skill and subagent briefs live under:

```txt
docs/
  skills/
  subagents/
```

## Source

- [MVP Alpha Scope](../../mvp-alpha-scope.md)
- [File Conventions](../../file-conventions.md)
- [Routing Contract](../../routing-contract.md)
- [Package Map](../../package-map.md)
- [Testing Contract](../../testing-contract.md)
- [Product Build Readiness](../../product-build-readiness.md)
