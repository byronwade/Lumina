# Skill: Docs Status Sync

Status: Scaffolded.
Audience: AI agents, maintainers, documentation contributors.

## Purpose

Keep README, AGENTS, docs hub, status, roadmap, backlog, and contracts synchronized.

## When To Use

Use for any change that affects setup, commands, package boundaries, generated files, implementation status, safety, or public claims.

## When Not To Use

Do not use to mark behavior implemented without current evidence.

## Required Context

Read `../../AGENTS.md`, `../documentation-standard.md`, `../docs-freshness-policy.md`, `../docs-maintenance-checklist.md`, `../docs-verification.md`, and `../agent-enforcement.md`.

## Workflow

1. Identify docs that own the changed surface.
2. Keep status labels canonical.
3. Link new durable docs from the correct index.
4. Keep public-facing claims evidence-aware.
5. Run docs checks.

## Files To Inspect

- `README.md`
- `AGENTS.md`
- `docs/README.md`
- `docs/status.md`
- `docs/task-backlog.md`

## Outputs

- Synchronized docs.
- Verification evidence.
- Remaining freshness risks.

## Checks To Run

Run `bun run docs:check` and normally `bun run check`.

## Handoff Checklist

- README and AGENTS are honest.
- New docs have `Status:` and `Audience:`.
- New durable docs are linked.

## Drift Risks

Docs claiming planned features work, missing sync-list entries, broken links, and stale public positioning.

## Docs To Update

Update every owning doc listed in `../docs-freshness-policy.md`.
