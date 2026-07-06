# Project Structure

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart apps are planned to use a small application root, file-based routes under `app/`, generated framework artifacts under `.needle/`, and production output under `dist/`.

The repository is in Phase 1 scaffold. This page describes target application structure and scaffolded repository structure, not verified generated app output.

## Application Structure

Planned generated app:

```txt
my-app/
  app/
    layout.tsx
    page.tsx
    api/
      health.ts
  needle.config.ts
  package.json
  public/
```

| Path | Purpose | Status |
| --- | --- | --- |
| `app/` | Route modules, layouts, pages, route handlers, and route-level conventions. | Planned |
| `app/page.tsx` | Home page route. | Planned |
| `app/layout.tsx` | Root layout for nested pages. | Planned |
| `app/api/*` | API route handlers. | Planned |
| `needle.config.ts` | Framework config. | Planned |
| `public/` | Static assets copied to output. | Planned |
| `.needle/` | Generated route, render, SEO, graph, and agent artifacts. | Planned |
| `dist/` | Built production output. | Planned |

## Generated Files

Planned generated files:

```txt
.needle/
  routes.json
  render-manifest.json
  map.json
  graph.json
  seo.report.json
  perf.report.json
  context/
    agent-index.json
  generated/
dist/
  adapter.manifest.json
  *
```

The canonical generated artifact names are `.needle/routes.json`, `.needle/render-manifest.json`, `.needle/map.json`, `.needle/graph.json`, `.needle/seo.report.json`, `.needle/perf.report.json`, `.needle/context/*.ctx.json`, `.needle/context/agent-index.json`, `.needle/generated/*`, `dist/adapter.manifest.json`, and `dist/*`.

Generated files must be deterministic and must not be edited manually.

## Repository Structure

NeedleStart itself is scaffolded as a Bun workspace with package workspaces under `packages/`, adapter package workspaces under `packages/adapters/`, repository scripts under `scripts/`, tests under `tests/`, and documentation under `docs/`.

The planned example and large-fixture directories, including `examples/` and `playgrounds/`, do not exist yet. Public docs may name them as planned paths, but they must not describe those directories as scaffolded, runnable, or verified until the files, commands, tests, and example status labels exist.

Planned test fixture structure is defined in [Testing](testing.md) and the internal [Testing Contract](../../testing-contract.md).

Root-level AI collaboration playbooks should not exist. The canonical skill and subagent briefs live under:

```txt
docs/
  skills/
  subagents/
```

## Source

- [File Conventions](../../file-conventions.md)
- [Routing Contract](../../routing-contract.md)
- [Package Map](../../package-map.md)
- [Testing Contract](../../testing-contract.md)
- [Product Build Readiness](../../product-build-readiness.md)
