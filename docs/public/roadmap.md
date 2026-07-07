# Roadmap

Status: Planned.

Audience: future website visitors, contributors, maintainers.

Lumina is currently in Phase 1: monorepo scaffold with the first compiler route-discovery slice implemented.

## Current Phase

Phase 0 defined the product direction, architecture, package responsibilities, documentation system, safety rules, and implementation sequence.

The Bun workspace, package placeholders, shared core types, CI, enforcement scripts, `@lumina/compiler` route discovery, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/build-trace.json`, `.lumina/perf.report.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina dev` Vite SSR route serving, static/SSR `lumina build`, static/SSR `lumina start` through `@lumina/adapter-bun`, scaffolded `apps/www`, verified `examples/basic` starter evidence, runnable `examples/blog-seo` content evidence, runnable generated large-route fixture evidence, a scaffolded multi-app workspace fixture, and early benchmark/status skeletons exist. Phase 1A shared core model hardening is implemented in `@lumina/core`. Full SSR/API production runtime implementation is still planned beyond generated SSR page routes, and API production runtime implementation is still planned.

The next implementation path is completing component-level HMR and production hardening after the dev and production hydration proof. Direct local imported component affected-route reports already exist.

MVP Alpha is the upcoming prototype target: route discovery, basic render modes, generated `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, CLI inspection, and a demo app.

## Current Phase Work

Phase 1 creates and hardens the Bun workspace and package scaffold. It should keep proving:

- `bun install` works.
- `bun test` works.
- `bun run typecheck` works.
- `bun run docs:check` works.
- `bun run structure:check` works.
- `bun run performance:check` works.
- `bun run check` works.
- Planned packages exist with entrypoints.
- Docs accurately describe the scaffold.

See [Phase 1 Build Plan](../phase-1-build-plan.md).

## Prototype Goal

MVP Alpha should first prove:

- Generated route discovery output.
- Basic render modes.
- `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json`.
- `lumina routes --json`, `lumina inspect --json`, and `lumina inspect why`.
- scaffolded `apps/www`, verified `examples/basic`, runnable `examples/blog-seo`, and runnable generated large-route fixtures that currently prove route discovery, generated artifacts, CLI JSON, and inspect output.

Post-MVP work includes API routes, MCP, safe edits, migration, Node adapter runtime behavior, and benchmark claims unless the scope changes.

The first public prototype should prove:

- App creation.
- File-based routes.
- React rendering.
- SEO-safe public pages.
- Static and SSR routes.
- API routes.
- Hot API route path.
- Route manifest.
- Lumina Map.
- Agent context.
- Read-only MCP tools.
- Safe metadata edit.
- Bun adapter output with documented Node/static paths.

The first working slice is intended to prove create app, SEO-safe pages, `@lumina/adapter-bun` serving, a basic map, agent inspection, and safe metadata edit. The public prototype expands that slice into API routes, hot API, read-only MCP tools, adapter-aware server output, and documented Node/static paths.

## Source Of Truth

The detailed roadmap lives in [docs/roadmap.md](../roadmap.md).

