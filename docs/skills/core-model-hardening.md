# Skill: Core Model Hardening

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

## Purpose

Stabilize shared Alpha data shapes in `@lumina/core` before compiler, CLI, map, runtime, or agent packages depend on them.

## When To Use

Use when changing `LuminaApp`, `RouteNode`, `GraphEdge`, `LuminaDiagnostic`, `RenderMode`, `CachePlan`, or `AdapterManifest`.

## When Not To Use

Do not use for feature behavior outside shared model definitions.

## Required Context

Read `../../AGENTS.md`, `../package-map.md`, `../routing-contract.md`, `../manifest-contracts.md`, `../cli-json-contract.md`, `../lumina-map.md`, and `../testing-contract.md`.

## Workflow

1. Confirm the type belongs in `@lumina/core`.
2. Add the smallest model change required by MVP Alpha.
3. Avoid local duplicate model types in other packages.
4. Add or update type tests and fixture expectations.
5. Update docs that name the model shape.

## Files To Inspect

- `packages/core/src/index.ts`
- `tests/scaffold.test.ts`
- `docs/package-map.md`
- `docs/task-backlog.md`

## Outputs

- Shared type changes.
- Tests or planned fixture updates.
- Docs sync notes.

## Checks To Run

Run `bun run structure:check`, `bun run typecheck`, `bun test`, and normally `bun run check`.

## Handoff Checklist

- Shared types are not duplicated elsewhere.
- Graph edges include `kind`, `source`, `confidence`, and `why`.
- Agent-facing fields are deterministic.

## Drift Risks

Local type drift, unstable JSON fields, runtime packages importing agent-only packages.

## Docs To Update

Update `../package-map.md`, `../manifest-contracts.md`, `../cli-json-contract.md`, `../lumina-map.md`, and `../task-backlog.md` when model shapes change.
