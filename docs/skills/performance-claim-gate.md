# Skill: Performance Claim Gate

Status: Scaffolded.
Audience: AI agents, maintainers, reviewers.

## Purpose

Prevent unsupported speed, benchmark, and performance claims.

## When To Use

Use before changing performance docs, public speed language, render defaults, build pipeline, route budgets, or benchmark text.

## When Not To Use

Do not use as proof of performance without raw benchmark evidence.

## Required Context

Read `../../AGENTS.md`, `../performance-contract.md`, `../benchmark-methodology.md`, `../benchmark-fixtures.md`, `../speed-decisions.md`, and `../checklists/performance-evidence.md`.

## Workflow

1. Classify the claim as target, planned, measured, or verified.
2. Require raw data, environment, fixture, commit, run count, and variance for benchmark claims.
3. Keep lab and field data separate.
4. Use target language when evidence is missing.
5. Run performance claim checks.

## Files To Inspect

- `docs/performance-contract.md`
- `docs/speed-strategy.md`
- `docs/speed-decisions.md`
- `docs/benchmark-methodology.md`

## Outputs

- Claim verdict.
- Required evidence list.
- Docs updates or claim removal.

## Checks To Run

Run `bun run performance:check` and normally `bun run check`.

## Handoff Checklist

- No unsupported current-tense speed claims.
- Benchmark evidence, if any, is raw and reproducible.
- Public docs stay honest.

## Drift Risks

Publishing speed promises before fixtures, browser metrics, or benchmark evidence exist.

## Docs To Update

Update performance, benchmark, speed, testing, and public reference docs when evidence or claims change.
