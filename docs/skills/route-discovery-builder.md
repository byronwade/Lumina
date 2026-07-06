# Skill: Route Discovery Builder

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

## Purpose

Build the MVP Alpha route discovery slice without expanding into non-Alpha routing behavior.

## When To Use

Use when implementing `app/` route discovery or `.lumina/routes.json` generation.

## When Not To Use

Do not use for API routes, middleware, migration, or full routing parity.

## Required Context

Read `../../AGENTS.md`, `../mvp-alpha-scope.md`, `../routing-contract.md`, `../file-conventions.md`, `../manifest-contracts.md`, and `../testing-contract.md`.

## Workflow

1. Limit discovery to the demo route set named by MVP Alpha scope.
2. Normalize paths and sort output deterministically.
3. Emit only documented route fields.
4. Add fixture and snapshot evidence.
5. Keep CLI and render work separate unless the task explicitly owns the slice boundary.

## Files To Inspect

- `packages/compiler/src/index.ts`
- `packages/core/src/index.ts`
- `docs/routing-contract.md`
- `docs/manifest-contracts.md`

## Outputs

- Route discovery code.
- `.lumina/routes.json` fixture expectations.
- Docs updates for implemented behavior.

## Checks To Run

Run route fixture tests when they exist, plus `bun run check`.

## Handoff Checklist

- Output has stable ordering.
- No absolute paths, timestamps, random IDs, or machine-specific values.
- Deferred routing behavior remains deferred.

## Drift Risks

API routes, optional catch-all edge cases, layout expansion, or full router behavior creeping into the first route slice.

## Docs To Update

Update `../routing-contract.md`, `../manifest-contracts.md`, `../file-conventions.md`, `../status.md`, and `../task-backlog.md` when behavior becomes real.
