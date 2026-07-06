# Project Status

Status: Scaffolded.

Audience: maintainers, contributors, AI agents.

Lumina is in Phase 1: monorepo scaffold with route discovery, generated route manifest output, the first routes CLI path, and the early benchmark/status skeleton implemented.

## What Exists

- Product vision and positioning.
- Architecture and package-boundary plans.
- Roadmap and task backlog.
- Risk mitigation strategy.
- Documentation system scaffolding.
- AI skill and subagent playbooks.
- Alpha agent operating docs, work routing, drift-prevention rules, and tool-specific wrapper scaffolds for Claude, Codex, and Cursor.
- Prototype acceptance criteria.
- Bun workspace package scaffold.
- Root `package.json`, `bun.lockb`, `tsconfig.base.json`, and `tsconfig.json`.
- Package placeholders under `packages/` and `packages/adapters/`, except for the initial `@lumina/compiler` route-discovery API.
- Package manifests use `0.0.0` private scaffold placeholder versions; these are not published release versions.
- Contract-backed shared `@lumina/core` model types for routes, graph edges, diagnostics, cache plans, and adapter manifests.
- `@lumina/compiler` route discovery for page and API route files under `app/`, including deterministic route IDs, route groups, dynamic params, catch-all params, layout collection, duplicate-path diagnostics, and compact `.lumina/routes.json` generation.
- `@lumina/cli` support for `routes <appPath> --json`, exposed locally through `bun run lumina -- routes <appPath> --json`.
- Early benchmark/status skeletons under `benchmarks/` and stable fixture placeholders under `fixtures/apps/`, all reporting `not implemented` and no synthetic timing results.
- CI workflow and root verification scripts for docs, structure, performance documentation, type checking, scaffold tests, shared core model tests, route-discovery fixture tests, and benchmark skeleton path/status tests.

## What Does Not Exist Yet

- Published packages.
- Released package versions.
- CLI implementation beyond `routes <appPath> --json`.
- Generated `.lumina/render-manifest.json` and `.lumina/map.json` files.
- Measured benchmark results.
- React rendering.
- Compiler output beyond `.lumina/routes.json`.
- Runtime adapter behavior.
- Lumina Map generation.
- Agent Kernel implementation.
- MCP server.
- Safe edit transactions.
- Generated `.lumina/*` or `dist/*` artifacts.
- Implemented agent automation beyond documentation and wrapper scaffolds.

## Current Next Step

The next implementation path is adding basic render-mode output and the first map artifact. Phase 1A shared core model hardening is implemented in `@lumina/core` and covered by type-focused tests. Route discovery, `.lumina/routes.json`, and `lumina routes --json` are implemented and covered by fixture and CLI tests. The early benchmark/status skeleton paths exist with `not implemented` status and no benchmark evidence. MVP Alpha is not complete. The next prototype target is MVP Alpha, defined in `docs/mvp-alpha-scope.md`, and should stay focused on route discovery, basic render modes, generated route/render/map artifacts, CLI inspection, and a demo app. Agent workflow for that build target is scaffolded in `docs/alpha-agent-operating-system.md`, `docs/alpha-work-routing.md`, and `docs/alpha-drift-prevention.md`. See `docs/phase-1-build-plan.md`, `docs/large-repo-build-architecture.md`, and `docs/task-backlog.md`.

## MVP Alpha Target Status

MVP Alpha is planned, not implemented. Route discovery, `.lumina/routes.json`, and `lumina routes --json` exist, but the MVP build target still requires render/map artifacts, broader CLI inspection, rendering, and a demo app.

Included MVP Alpha evidence should eventually cover `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, and the MVP Alpha demo app described in `docs/mvp-alpha-scope.md`.

## Status Language

Use these labels:

- Draft: exploratory design.
- Proposed: architecture decision proposed for planning, not proven by implementation.
- Planned: accepted target behavior, not implemented.
- Scaffolded: package or file exists, behavior is not complete.
- Implemented: behavior exists in code, current local evidence exists, and docs describe current behavior.
- Verified: behavior exists and the full required checks, fixtures, or evidence for that feature pass.
- Deprecated: behavior exists but should not be used for new work.

## Public Status Mapping

Internal Markdown docs use title-case labels with periods. Future public docs frontmatter uses lowercase values without periods.

| Internal status label | Public frontmatter value |
| --- | --- |
| `Draft.` | `draft` |
| `Proposed.` | `proposed` |
| `Planned.` | `planned` |
| `Scaffolded.` | `scaffolded` |
| `Implemented.` | `implemented` |
| `Verified.` | `verified` |
| `Deprecated.` | `deprecated` |
