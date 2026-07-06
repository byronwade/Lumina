# Skill: Fixture Snapshot Testing

Status: Scaffolded.
Audience: AI agents, maintainers, test authors.

## Purpose

Add the smallest fixture and snapshot evidence required for Alpha behavior.

## When To Use

Use when output depends on project files, route trees, manifests, CLI JSON, or generated reports.

## When Not To Use

Do not use to justify benchmark claims or browser behavior by snapshot alone.

## Required Context

Read `../../AGENTS.md`, `../testing-contract.md`, `../docs-verification.md`, and the owning feature contract.

## Workflow

1. Write the fixture before the implementation grows.
2. Normalize paths and remove volatile values.
3. Keep snapshots focused and reviewable.
4. Verify updates are intentional.
5. Report fixtures and commands in the handoff.

## Files To Inspect

- `tests/`
- `docs/testing-contract.md`
- Owning package and contract docs.

## Outputs

- Fixture files.
- Snapshot files or expected JSON.
- Evidence notes.

## Checks To Run

Run targeted tests plus `bun run check`.

## Handoff Checklist

- Fixture names the contract it proves.
- Snapshot changes are reviewed.
- Tests do not use external network by default.

## Drift Risks

Oversized snapshots, unreviewed snapshot updates, fixture paths tied to one machine.

## Docs To Update

Update `../testing-contract.md`, `../docs-verification.md`, and owning feature docs when test strategy changes.
