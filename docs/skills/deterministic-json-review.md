# Skill: Deterministic JSON Review

Status: Scaffolded.
Audience: AI agents, maintainers, reviewers.

## Purpose

Review agent-facing JSON for stable output before fixtures or snapshots become source of truth.

## When To Use

Use for `.lumina/*.json`, CLI `--json`, diagnostics, manifest, map, report, and context output.

## When Not To Use

Do not use for prose-only docs unless they define JSON contracts.

## Required Context

Read `../../AGENTS.md`, `../manifest-contracts.md`, `../cli-json-contract.md`, `../diagnostics-contract.md`, and `../testing-contract.md`.

## Workflow

1. Identify every field and collection.
2. Check sort order, path normalization, schema version, and source inputs.
3. Reject timestamps, random IDs, absolute local paths, secrets, and machine-specific values.
4. Require snapshots for stable outputs.
5. Document update policy.

## Files To Inspect

- Owning package source.
- `docs/manifest-contracts.md`
- `docs/cli-json-contract.md`
- `docs/testing-contract.md`

## Outputs

- JSON review notes.
- Required fixture or snapshot changes.
- Contract updates.

## Checks To Run

Run affected snapshots when they exist, plus `bun run check`.

## Handoff Checklist

- Output is reproducible across operating systems.
- Volatile values are absent.
- Snapshot update is explicit.

## Drift Risks

Unstable ordering, local path leakage, and agent tools depending on undocumented fields.

## Docs To Update

Update `../manifest-contracts.md`, `../cli-json-contract.md`, `../diagnostics-contract.md`, and `../testing-contract.md` as needed.
