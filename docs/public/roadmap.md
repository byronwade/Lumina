# Roadmap

Status: Planned.

Audience: future website visitors, contributors, maintainers.

Lumina is currently in Phase 1: monorepo scaffold with the first compiler route-discovery slice implemented.

## Current Phase

Phase 0 defined the product direction, architecture, package responsibilities, documentation system, safety rules, and implementation sequence.

The Bun workspace, package placeholders, shared core types, CI, enforcement scripts, and initial `@lumina/compiler` route discovery exist. Phase 1A shared core model hardening is implemented in `@lumina/core`. Runtime implementation is still planned.

The next implementation path is Phase 1B early benchmark and fixture skeleton, then connecting route discovery to generated artifacts and CLI inspection.

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
- `examples/mvp-alpha-demo/`.

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

