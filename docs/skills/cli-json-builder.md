# Skill: CLI JSON Builder

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

## Purpose

Build stable, compact, deterministic CLI JSON for Alpha commands.

## When To Use

Use when implementing or reviewing `lumina routes --json`, `lumina inspect --json`, or `lumina inspect why`.

## When Not To Use

Do not use for human-only CLI formatting unless JSON contract behavior is also affected.

## Required Context

Read `../../AGENTS.md`, `../cli-json-contract.md`, `../diagnostics-contract.md`, `../manifest-contracts.md`, and `../testing-contract.md`.

## Workflow

1. Define the JSON envelope before writing command behavior.
2. Keep stdout JSON clean and diagnostics structured.
3. Sort fields and collections deterministically.
4. Snapshot command output and exit codes.
5. Update public CLI docs only after behavior exists.

## Files To Inspect

- `packages/cli/src/index.ts`
- `packages/core/src/index.ts`
- `docs/cli-json-contract.md`
- `docs/cli.md`

## Outputs

- CLI JSON behavior.
- Snapshot tests.
- Docs updates.

## Checks To Run

Run CLI snapshot tests when they exist, plus `bun run check`.

## Handoff Checklist

- JSON is compact and deterministic.
- Exit code behavior is documented.
- Stderr and stdout responsibilities are clear.

## Drift Risks

Pretty unstable output, local paths in JSON, undocumented fields, and current-tense docs before implementation.

## Docs To Update

Update `../cli-json-contract.md`, `../cli.md`, `../api-reference.md`, and `../task-backlog.md`.
