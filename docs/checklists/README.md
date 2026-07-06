# Implementation Checklists

Status: Planned.

Audience: maintainers, implementation contributors, AI agents.

This directory stores repeatable checklists for implementation PRs. These checklists are planning gates, not evidence that packages or commands exist.

Use these checklists when a change touches the matching surface:

- [Phase 1 Scaffold Checklist](phase-1-scaffold.md): monorepo package scaffold, package boundaries, and initial commands.
- [Adapter Implementation Checklist](adapter-implementation.md): Bun, Node, static, or future runtime adapter work.
- [Performance Evidence Checklist](performance-evidence.md): speed claims, benchmark reports, browser delivery evidence, and public performance language.

## Rules

- Keep checklist items verifiable.
- Link each checklist to the source contracts it depends on.
- Keep planned and implemented behavior separate.
- Do not mark checklist evidence complete until commands, fixtures, or reports exist.
- Add a new checklist when implementation work repeats across PRs or carries high review risk.
