# Project Status

Status: Scaffolded.

Audience: maintainers, contributors, AI agents.

Lumina is in Phase 1: monorepo scaffold with route discovery, generated route/render/map artifacts, route and inspect CLI paths, a minimal Vite dev-server path, and the early benchmark/status skeleton implemented.

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
- `@lumina/compiler` route discovery for page and API route files under `app/`, including deterministic route IDs, route groups, dynamic params, catch-all params, layout collection, duplicate-path diagnostics, compact `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json` generation.
- `@lumina/cli` support for `routes <appPath> --json`, `inspect <appPath> --json`, `inspect <appPath> why <route>`, and `dev <appPath>`, exposed locally through `bun run lumina -- ...`.
- `@lumina/vite-plugin` minimal dev-server integration that writes route/render/map artifacts and serves page routes with React SSR through Vite middleware.
- Scaffolded `apps/www` marketing app source and scaffolded examples under `examples/basic/`, `examples/blog-seo/`, `examples/multi-app-workspace/`, `examples/large-100-routes/`, and `examples/large-1000-routes/`, with route-discovery and inspect fixture evidence.
- Early benchmark/status skeletons under `benchmarks/` and stable fixture placeholders under `fixtures/apps/`, all reporting `not implemented` and no synthetic timing results.
- CI workflow and root verification scripts for docs, structure, performance documentation, type checking, scaffold tests, shared core model tests, route-discovery fixture tests, and benchmark skeleton path/status tests.

## What Does Not Exist Yet

- Published packages.
- Released package versions.
- CLI implementation beyond `routes <appPath> --json`, `inspect <appPath> --json`, `inspect <appPath> why <route>`, and minimal `dev <appPath>`.
- Measured benchmark results.
- Production build/start behavior.
- Runtime adapter behavior.
- Route HMR, virtual route modules, client hydration, and dynamic route params in the dev server.
- Compiler output beyond `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json`.
- Lumina Map queries and semantic graph expansion beyond the first file-level map.
- Agent Kernel implementation.
- MCP server.
- Safe edit transactions.
- Checked-in generated `.lumina/*` or `dist/*` artifacts.
- Implemented agent automation beyond documentation and wrapper scaffolds.

## Current Next Step

The next implementation path is completing Vite dev HMR, virtual route modules, and client hydration, then static build output. Phase 1A shared core model hardening is implemented in `@lumina/core` and covered by type-focused tests. Route discovery, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina dev`, and scaffolded app/example fixture route evidence are implemented and covered by fixture, artifact, CLI, and HTTP dev-server tests. The early benchmark/status skeleton paths exist with `not implemented` status and no benchmark evidence. MVP Alpha is not complete. The next prototype target is MVP Alpha, defined in `docs/mvp-alpha-scope.md`, and should stay focused on route discovery, basic render modes, generated route/render/map artifacts, CLI inspection, a demo app, and the first dev-server path. Agent workflow for that build target is scaffolded in `docs/alpha-agent-operating-system.md`, `docs/alpha-work-routing.md`, and `docs/alpha-drift-prevention.md`. See `docs/phase-1-build-plan.md`, `docs/large-repo-build-architecture.md`, and `docs/task-backlog.md`.

## MVP Alpha Target Status

MVP Alpha is planned, not complete. Route discovery, route/render/map artifacts, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina dev`, and scaffolded `apps/www` / example source fixtures exist, but the MVP build target still requires route HMR, virtual route modules, client hydration, build/start commands, and production runtime serving.

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
