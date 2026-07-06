# Phase 1 Scaffold Checklist

Status: Planned.

Audience: maintainers, implementation contributors, AI agents.

Use this checklist before and during the monorepo scaffold work described in [Phase 1 Build Plan](../phase-1-build-plan.md). It is not evidence that scaffolding exists.

## Read First

- [AGENTS](../../AGENTS.md)
- [README](../../README.md)
- [Phase 1 Build Plan](../phase-1-build-plan.md)
- [Package Map](../package-map.md)
- [Testing Contract](../testing-contract.md)
- [Versioning And Upgrades](../versioning-and-upgrades.md)

## Scope Gate

- The scaffold follows the planned package names in [Package Map](../package-map.md).
- Bun, Node, and static adapter package names stay aligned with [Adapter Contract](../adapter-contract.md).
- Commands are documented as planned until they run locally.
- Generated files are documented before they are emitted.
- No public page claims the scaffold works before checks pass.

## Files To Add

Planned scaffold files:

- `package.json`
- `bun.lock`
- `tsconfig.base.json`
- package directories under `packages/`
- fixture or example directories only when they have status labels

Do not add empty packages that imply implemented behavior without clear placeholder status.

## Verification Gate

Before marking scaffold behavior implemented:

- `bun install` runs.
- `bun test` runs or has a documented placeholder reason.
- `bun run typecheck` runs or has a documented placeholder reason.
- Package entrypoints do not claim real framework behavior unless tests cover it.
- README and AGENTS describe the current scaffold honestly.

## Docs To Update

- [README](../../README.md)
- [AGENTS](../../AGENTS.md)
- [Project Status](../status.md)
- [Phase 1 Build Plan](../phase-1-build-plan.md)
- [Package Map](../package-map.md)
- [Task Backlog](../task-backlog.md)
- [Getting Started](../getting-started.md)
- [Public Create App Guide](../public/guides/create-app.md)

## Stop Conditions

Pause and write a follow-up task if:

- A package boundary is unclear.
- A command cannot run but docs would imply it does.
- A generated artifact appears without a contract.
- A dependency choice conflicts with an ADR or speed decision.
