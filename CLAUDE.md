# Claude Code Guide

Status: Scaffolded.
Audience: AI agents, maintainers.

Claude Code agents must read `AGENTS.md` first. This file is a thin wrapper for Claude-specific discovery only; the source of truth remains `AGENTS.md`, `docs/alpha-agent-operating-system.md`, `docs/skills/`, and `docs/subagents/`.

## Required Workflow

1. Read `AGENTS.md`.
2. Read `docs/alpha-agent-operating-system.md`.
3. Route Alpha work through `docs/alpha-work-routing.md`.
4. Use `.claude/skills/*/SKILL.md` only as pointers to `docs/skills/*.md`.
5. Use `.claude/agents/*.md` only as pointers to `docs/subagents/*.md`.
6. Run `bun run check` before claiming non-trivial work is ready.

## Do Not

- Do not implement post-MVP Alpha behavior unless `docs/mvp-alpha-scope.md` changes in the same change.
- Do not close GitHub issues unless acceptance criteria are solved by evidence.
- Do not treat scaffolded wrappers as implemented framework behavior.
