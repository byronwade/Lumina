# Skill: Strategic App Builder

## Purpose

Use this skill when planning or implementing NeedleStart framework work that moves the product from project constitution toward a runnable prototype.

## When To Use

- Breaking roadmap goals into implementation tasks.
- Adding scaffolding, packages, commands, fixtures, or prototype code.
- Evaluating whether a feature belongs in Phase 1 or later.
- Turning architecture docs into concrete task files.

## Required Context

Read before editing:

1. `AGENTS.md`
2. `README.md`
3. `docs/roadmap.md`
4. `docs/task-backlog.md`
5. Relevant architecture docs for the touched area.

## Workflow

1. Classify the work as documentation-only, scaffolding, implementation, or verification.
2. Apply the scope gate from `docs/risk-mitigation.md`:
   - Does it improve Needle Map or Agent Kernel?
   - Can it be implemented with minimal production runtime code?
   - Does it have a clear fixture or agent demo?
3. Define the smallest useful milestone.
4. Create or update a task from `docs/templates/task-template.md` when implementation work is planned.
5. Keep public API examples marked as draft until implemented and tested.
6. Add tests for implemented behavior; if scaffolding is absent, state checks are unavailable.

## Outputs

- A scoped plan or task file.
- Updated roadmap/backlog entries when priorities change.
- Updated README/AGENTS when commands, structure, phase, or setup changes.
- Verification notes with exact commands run.

## Handoff Checklist

- The change is aligned with Phase 0 or clearly marked as planned for a later phase.
- New implementation work has acceptance criteria.
- Any package boundary changes are reflected in `docs/package-map.md`.
- The next agent can continue without guessing status.
