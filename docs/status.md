# Project Status

Status: Scaffolded.

Audience: maintainers, contributors, AI agents.

Lumina is in Phase 1: monorepo scaffold.

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
- Package placeholders under `packages/` and `packages/adapters/`.
- Package manifests use `0.0.0` private scaffold placeholder versions; these are not published release versions.
- Shared `@lumina/core` scaffold types for routes, graph edges, diagnostics, cache plans, and adapter manifests.
- CI workflow and root verification scripts for docs, structure, performance documentation, type checking, and placeholder tests.

## What Does Not Exist Yet

- Published packages.
- Released package versions.
- CLI implementation.
- Route discovery.
- React rendering.
- Compiler output.
- Runtime adapter behavior.
- Lumina Map generation.
- Agent Kernel implementation.
- MCP server.
- Safe edit transactions.
- Generated `.lumina/*` or `dist/*` artifacts.
- Implemented agent automation beyond documentation and wrapper scaffolds.

## Current Next Step

The next implementation step is Phase 1A: expand and stabilize the shared core data model, then begin route discovery. The next prototype target is MVP Alpha, defined in `docs/mvp-alpha-scope.md`, and should stay focused on route discovery, basic render modes, generated route/render/map artifacts, CLI inspection, and a demo app. Agent workflow for that build target is scaffolded in `docs/alpha-agent-operating-system.md`, `docs/alpha-work-routing.md`, and `docs/alpha-drift-prevention.md`. See `docs/phase-1-build-plan.md` and `docs/task-backlog.md`.

## MVP Alpha Target Status

MVP Alpha is planned, not implemented. It is the next build target after the current scaffold: route discovery, basic render modes, generated route/render/map artifacts, CLI inspection, and a demo app.

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
