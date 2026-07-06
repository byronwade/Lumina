# Alpha Agent Operating System

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

This page defines the operating layer agents must use while building MVP Alpha behavior. It is documentation and workflow scaffolding only. It does not itself implement rendering, CLI behavior beyond the current `routes --json` path, Lumina Map generation, Agent Kernel behavior, MCP tools, safe edits, render/map artifacts, or runtime adapters.

## Purpose

The Alpha operating system keeps future implementation work narrow, reviewable, and honest. It gives Claude Code, Codex, Cursor, and future agents the same source-of-truth rules before they change code.

## Required Inputs

Agents must read:

- `README.md`
- `AGENTS.md`
- `docs/status.md`
- `docs/mvp-alpha-scope.md`
- `docs/phase-1-build-plan.md`
- `docs/package-map.md`
- `docs/task-backlog.md`
- `docs/agent-enforcement.md`
- `docs/docs-maintenance-checklist.md`
- `docs/docs-verification.md`
- `docs/testing-contract.md`
- `docs/risk-mitigation.md`

Feature-specific work must also read the owning contract, such as `docs/routing-contract.md`, `docs/cli-json-contract.md`, `docs/manifest-contracts.md`, `docs/lumina-map.md`, `docs/performance-contract.md`, or `docs/security-contract.md`.

## Operating Rules

- Do not implement post-MVP Alpha behavior unless `docs/mvp-alpha-scope.md` changes in the same change.
- Do not claim behavior is implemented until code, tests, and current local evidence exist.
- Keep shared framework types in `@lumina/core`.
- Keep runtime packages independent from agent-only packages.
- Keep production runtime bundles free of agent metadata.
- Keep generated output deterministic, compact, and snapshot-testable.
- Keep user application code free of Bun-only API requirements; Bun-specific behavior belongs in adapters.
- Run `bun run check` before finishing non-trivial work, or state why a narrower gate was used.

## Source Playbooks

Vendor-neutral playbooks live in `docs/skills/` and `docs/subagents/`. Tool-specific files under `.claude/`, `.agents/`, and `.cursor/` must stay thin wrappers that point back to those docs.

## Evidence Model

Implementation evidence must include:

- changed files,
- commands run,
- tests or snapshots added,
- generated artifacts created or intentionally absent,
- docs updated,
- risks and follow-ups.

## Out Of Scope

- Product runtime behavior.
- Generated `.lumina/*` artifacts.
- MCP write behavior.
- Benchmark claims.
- Security claims without threat notes, implementation, and tests.
