# Project Status

Status: Scaffolded.

Audience: maintainers, contributors, AI agents.

NeedleStart is in Phase 1: monorepo scaffold.

## What Exists

- Product vision and positioning.
- Architecture and package-boundary plans.
- Roadmap and task backlog.
- Risk mitigation strategy.
- Documentation system scaffolding.
- AI skill and subagent playbooks.
- Prototype acceptance criteria.
- Bun workspace package scaffold.
- Root `package.json`, `bun.lockb`, `tsconfig.base.json`, and `tsconfig.json`.
- Package placeholders under `packages/` and `packages/adapters/`.
- Shared `@needle/core` scaffold types for routes, graph edges, diagnostics, cache plans, and adapter manifests.
- CI workflow and root verification scripts for docs, structure, performance documentation, type checking, and placeholder tests.

## What Does Not Exist Yet

- Published packages.
- CLI implementation.
- Route discovery.
- React rendering.
- Compiler output.
- Runtime adapters.
- Needle Map generation.
- Agent Kernel implementation.
- MCP server.
- Safe edit transactions.
- Generated `.needle/*` or `dist/*` artifacts.

## Current Next Step

The next implementation step is Phase 1A: expand and stabilize the shared core data model, then begin route discovery. See `docs/phase-1-build-plan.md` and `docs/task-backlog.md`.

## Status Language

Use these labels:

- Draft: exploratory design.
- Planned: accepted target behavior, not implemented.
- Scaffolded: package or file exists, behavior is not complete.
- Implemented: code exists.
- Verified: code exists and checks have passed.

