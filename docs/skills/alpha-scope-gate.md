# Skill: Alpha Scope Gate

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

## Purpose

Keep MVP Alpha work inside `../mvp-alpha-scope.md` and prevent implementation drift.

## When To Use

Use before planning, implementing, reviewing, closing issues, or changing docs for Alpha work.

## When Not To Use

Do not use as a substitute for the owning feature contract.

## Required Context

Read `../../AGENTS.md`, `../alpha-agent-operating-system.md`, `../alpha-work-routing.md`, `../mvp-alpha-scope.md`, `../status.md`, and `../task-backlog.md`.

## Workflow

1. Identify the requested behavior.
2. Classify it as included, deferred, or out of scope for MVP Alpha.
3. If deferred, stop implementation unless the scope doc changes in the same work.
4. If included, route to the right Alpha skill and subagent brief.
5. Record docs that must stay synchronized.

## Files To Inspect

- `README.md`
- `AGENTS.md`
- `docs/mvp-alpha-scope.md`
- `docs/alpha-work-routing.md`
- `docs/task-backlog.md`

## Outputs

- Scope verdict.
- Owning docs.
- Recommended next skill or role.
- Issue-closure decision based on evidence.

## Checks To Run

Run `bun run check` before finishing non-trivial scope or docs changes.

## Handoff Checklist

- Scope verdict is explicit.
- Deferred work is not implemented.
- README and AGENTS stay honest.

## Drift Risks

MCP, safe edits, API routes, migration, benchmarks, or full agent context entering MVP Alpha by accident.

## Docs To Update

Update `README.md`, `AGENTS.md`, `../mvp-alpha-scope.md`, `../status.md`, and `../task-backlog.md` when scope changes.
