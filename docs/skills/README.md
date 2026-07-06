# Lumina Skills

Status: Scaffolded.
Audience: AI agents, maintainers, documentation contributors.

This directory defines vendor-neutral skill playbooks for AI agents working on Lumina.

The skills are documentation-only in Phase 1 scaffold. They do not claim executable automation exists yet. Each skill describes when to use it, required context, workflow, outputs, checks, and handoff notes so agents from different AI companies can collaborate through the same project contracts.

## Skill Index

| Skill | Use when | Primary outputs |
| --- | --- | --- |
| [`strategic-app-builder`](strategic-app-builder.md) | Planning or implementing roadmap-aligned framework work. | Scoped plan, task file, architecture notes, tests/checks. |
| [`docs-maintainer`](docs-maintainer.md) | Updating README, AGENTS, architecture, roadmap, package, or risk docs. | Honest documentation updates and sync notes. |
| [`project-maintainer`](project-maintainer.md) | Keeping repository health, task backlog, governance, and cross-doc consistency intact. | Backlog updates, risk notes, release/phase hygiene. |
| [`lumina-map-designer`](lumina-map-designer.md) | Designing graph nodes, edges, contracts, affected checks, or map APIs. | Graph contract notes with confidence and safety rules. |
| [`agent-kernel-designer`](agent-kernel-designer.md) | Designing agent context, safe edits, MCP tools, or AI collaboration flows. | Agent workflow contracts and safety gates. |
| [`seo-runtime-guardian`](seo-runtime-guardian.md) | Designing SEO, rendering, route modes, hot APIs, runtime, or adapters. | Runtime/SEO boundary notes and acceptance criteria. |
| [`alpha-scope-gate`](alpha-scope-gate.md) | Planning, reviewing, or implementing MVP Alpha work. | Scope verdict, owning docs, issue-closure decision. |
| [`core-model-hardening`](core-model-hardening.md) | Changing shared `@lumina/core` model types. | Type changes, tests, docs sync notes. |
| [`route-discovery-builder`](route-discovery-builder.md) | Building MVP Alpha route discovery and route manifests. | Route manifest behavior, fixtures, docs updates. |
| [`render-manifest-builder`](render-manifest-builder.md) | Building static/basic SSR render manifest output. | Render manifest behavior, snapshots, docs updates. |
| [`lumina-map-v1-builder`](lumina-map-v1-builder.md) | Building first file-level Lumina Map output. | Graph contract changes and deterministic map fixtures. |
| [`cli-json-builder`](cli-json-builder.md) | Building stable CLI JSON output. | JSON envelope, exit codes, snapshots. |
| [`demo-app-builder`](demo-app-builder.md) | Building the MVP Alpha demo app and fixtures. | Demo fixture, acceptance notes, docs updates. |
| [`deterministic-json-review`](deterministic-json-review.md) | Reviewing `.lumina/*` or CLI JSON contracts. | JSON review notes and snapshot requirements. |
| [`fixture-snapshot-testing`](fixture-snapshot-testing.md) | Adding fixture and snapshot evidence. | Fixture files, snapshots, evidence notes. |
| [`docs-status-sync`](docs-status-sync.md) | Keeping docs current after structural or status changes. | Synchronized docs and verification evidence. |
| [`security-threat-note`](security-threat-note.md) | Reviewing high-risk Alpha changes. | Threat note, test requirements, escalation decision. |
| [`performance-claim-gate`](performance-claim-gate.md) | Reviewing speed, benchmark, or performance claims. | Claim verdict and evidence requirements. |
| [`release-readiness-alpha`](release-readiness-alpha.md) | Preparing Alpha slices for merge or issue closure. | Readiness report and closure recommendations. |

## Universal Rules

All skills must follow the root [`../../AGENTS.md`](../../AGENTS.md). In particular:

- Keep planned behavior separate from implemented behavior.
- Update README.md and AGENTS.md when setup, commands, structure, safety rules, or phase status changes.
- Read `../risk-mitigation.md` before changing Lumina Map, Agent Kernel, MCP, runtime adapters, or safe edit behavior.
- Prefer deterministic outputs and testable acceptance criteria.
- Do not invent passing feature commands; scaffold checks are real, but framework behavior still needs implementation evidence.
