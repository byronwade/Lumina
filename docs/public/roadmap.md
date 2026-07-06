# Roadmap

Status: Planned.

Audience: future website visitors, contributors, maintainers.

NeedleStart is currently in Phase 1: monorepo scaffold.

## Current Phase

Phase 0 defined the product direction, architecture, package responsibilities, documentation system, safety rules, and implementation sequence.

The Bun workspace, package placeholders, shared core types, CI, and enforcement scripts exist. Runtime implementation is still planned.

The next implementation stage is Phase 1A: expand and stabilize the shared core data model, then begin route discovery.

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

The first public prototype should prove:

- App creation.
- File-based routes.
- React rendering.
- SEO-safe public pages.
- Static and SSR routes.
- API routes.
- Hot API route path.
- Route manifest.
- Needle Map.
- Agent context.
- Read-only MCP tools.
- Safe metadata edit.
- Bun adapter output with Node/static compatibility path documented.

The first working slice is smaller: create app, SEO-safe pages, `@needle/adapter-bun` serving, basic map, agent inspection, and safe metadata edit. The public prototype expands that slice into the full demo list above.

## Source Of Truth

The detailed roadmap lives in [docs/roadmap.md](../roadmap.md).

