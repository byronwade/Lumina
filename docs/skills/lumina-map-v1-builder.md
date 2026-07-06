# Skill: Lumina Map V1 Builder

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

## Purpose

Build the first file-level `.lumina/map.json` slice with explainable graph edges.

## When To Use

Use when creating or reviewing Lumina Map nodes, edges, confidence, or impact output for MVP Alpha.

## When Not To Use

Do not use for safety-critical decisions, safe edits, MCP, full static analysis, or graph visualization.

## Required Context

Read `../../AGENTS.md`, `../risk-mitigation.md`, `../lumina-map.md`, `../manifest-contracts.md`, `../agent-kernel.md`, and `../testing-contract.md`.

## Workflow

1. Start with file graph and explicit route relationships.
2. Add only high-confidence edges backed by source inputs.
3. Include `kind`, `source`, `confidence`, and `why` on every edge.
4. Treat missing semantics as low-confidence or absent, not guessed.
5. Snapshot deterministic map output.

## Files To Inspect

- `packages/map/src/index.ts`
- `packages/core/src/index.ts`
- `docs/lumina-map.md`
- `docs/risk-mitigation.md`

## Outputs

- Map contract changes.
- Deterministic fixture output.
- Risk and docs notes.

## Checks To Run

Run map fixture snapshots when they exist, plus `bun run check`.

## Handoff Checklist

- Every edge explains why it exists.
- No safety-critical decision depends only on the map.
- Production runtime does not ship agent metadata.

## Drift Risks

Overconfident graph inference, hidden semantic guesses, unstable ordering, and agent metadata leakage.

## Docs To Update

Update `../lumina-map.md`, `../risk-mitigation.md`, `../manifest-contracts.md`, and `../task-backlog.md`.
