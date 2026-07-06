# NeedleStart Skills

This directory defines vendor-neutral skill playbooks for AI agents working on NeedleStart.

The skills are documentation-only in Phase 0. They do not claim executable automation exists yet. Each skill describes when to use it, required context, workflow, outputs, checks, and handoff notes so agents from different AI companies can collaborate through the same project contracts.

## Skill Index

| Skill | Use when | Primary outputs |
| --- | --- | --- |
| [`strategic-app-builder`](strategic-app-builder.md) | Planning or implementing roadmap-aligned framework work. | Scoped plan, task file, architecture notes, tests/checks. |
| [`docs-maintainer`](docs-maintainer.md) | Updating README, AGENTS, architecture, roadmap, package, or risk docs. | Honest documentation updates and sync notes. |
| [`project-maintainer`](project-maintainer.md) | Keeping repository health, task backlog, governance, and cross-doc consistency intact. | Backlog updates, risk notes, release/phase hygiene. |
| [`needle-map-designer`](needle-map-designer.md) | Designing graph nodes, edges, contracts, affected checks, or map APIs. | Graph contract notes with confidence and safety rules. |
| [`agent-kernel-designer`](agent-kernel-designer.md) | Designing agent context, safe edits, MCP tools, or AI collaboration flows. | Agent workflow contracts and safety gates. |
| [`seo-runtime-guardian`](seo-runtime-guardian.md) | Designing SEO, rendering, route modes, hot APIs, runtime, or adapters. | Runtime/SEO boundary notes and acceptance criteria. |

## Universal Rules

All skills must follow the root [`AGENTS.md`](../AGENTS.md). In particular:

- Keep planned behavior separate from implemented behavior.
- Update README.md and AGENTS.md when setup, commands, structure, safety rules, or phase status changes.
- Read `docs/risk-mitigation.md` before changing Needle Map, Agent Kernel, MCP, runtime adapters, or safe edit behavior.
- Prefer deterministic outputs and testable acceptance criteria.
- Do not invent passing commands while the repository has no package scaffolding.

