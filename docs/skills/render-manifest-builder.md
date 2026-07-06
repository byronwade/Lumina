# Skill: Render Manifest Builder

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

## Purpose

Build the MVP Alpha render manifest for explicit static and basic SSR route modes.

## When To Use

Use when adding `.lumina/render-manifest.json`, `staticPage()`, or minimal SSR mode data.

## When Not To Use

Do not use for React Server Components, streaming defaults, cache system, or full SEO behavior.

## Required Context

Read `../../AGENTS.md`, `../mvp-alpha-scope.md`, `../runtime-contract.md`, `../manifest-contracts.md`, `../performance-contract.md`, and `../testing-contract.md`.

## Workflow

1. Keep modes explicit and small.
2. Consume route discovery output instead of rediscovering routes in runtime packages.
3. Keep render data deterministic.
4. Add snapshot coverage for manifest shape.
5. Document deferred render modes as planned.

## Files To Inspect

- `packages/compiler/src/index.ts`
- `packages/react/src/index.ts`
- `packages/core/src/index.ts`
- `docs/runtime-contract.md`

## Outputs

- Render manifest implementation or fixture plan.
- Snapshot evidence.
- Docs updates.

## Checks To Run

Run fixture snapshots when they exist, plus `bun run check`.

## Handoff Checklist

- Static and SSR modes are explicit.
- No unsupported cache, streaming, or RSC claims.
- Manifest fields match docs.

## Drift Risks

Implicit render modes, invisible caching, client-only defaults, and speed claims without evidence.

## Docs To Update

Update `../runtime-contract.md`, `../manifest-contracts.md`, `../performance-contract.md`, and `../task-backlog.md`.
