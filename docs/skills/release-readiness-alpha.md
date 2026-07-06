# Skill: Release Readiness Alpha

Status: Scaffolded.
Audience: AI agents, maintainers, release reviewers.

## Purpose

Review whether an MVP Alpha slice is ready to merge, push, and possibly close related issues.

## When To Use

Use before merging Alpha implementation slices, closing issues, or announcing readiness.

## When Not To Use

Do not use to close issues whose acceptance criteria are still planned.

## Required Context

Read `../../AGENTS.md`, `../review-checklist.md`, `../docs-verification.md`, `../release.md`, `../versioning-and-upgrades.md`, and the relevant issue or backlog entry.

## Workflow

1. Compare changed files to the task scope.
2. Verify acceptance criteria with current evidence.
3. Run required checks.
4. Confirm docs and status labels are synchronized.
5. Decide whether any issue can close.

## Files To Inspect

- `README.md`
- `AGENTS.md`
- `docs/status.md`
- `docs/task-backlog.md`
- Owning contracts and tests.

## Outputs

- Release-readiness report.
- Checks run.
- Issue closure recommendations.

## Checks To Run

Run `bun run check` before claiming readiness.

## Handoff Checklist

- Checks passed or blockers are explicit.
- Issues are closed only with evidence.
- No release or compatibility guarantee is implied by `0.0.0` scaffold versions.

## Drift Risks

Closing implementation backlog too early, missing docs sync, and overstating scaffold verification.

## Docs To Update

Update `../status.md`, `../task-backlog.md`, `../release.md`, and owning feature docs when readiness changes.
