# Lumina Subagents

Status: Scaffolded.
Audience: AI agents, maintainers, documentation contributors.

This directory defines vendor-neutral subagent role briefs for AI systems that support delegated or parallel work. They are documentation-only in Phase 1 scaffold and are intended to help agents from different AI companies coordinate consistently.

## Role Index

| Subagent | Best for | Must read |
| --- | --- | --- |
| [`architect`](architect.md) | Architecture consistency and package boundaries. | `../../ARCHITECTURE.md`, `../package-map.md` |
| [`compiler-map`](compiler-map.md) | Compiler IR, route discovery, Lumina Map, graph output. | `../compiler-ir.md`, `../lumina-map.md`, `../risk-mitigation.md` |
| [`runtime-seo`](runtime-seo.md) | Runtime, rendering, SEO, adapters, performance. | `../runtime-contract.md`, `../seo-engine.md`, `../adapters.md` |
| [`agent-safety`](agent-safety.md) | Agent Kernel, MCP, safe edits, AI collaboration safety. | `../agent-kernel.md`, `../mcp-server.md`, `../safe-edit-transactions.md` |
| [`docs-keeper`](docs-keeper.md) | Documentation sync and status honesty. | `../../README.md`, `../../AGENTS.md`, `../README.md` |
| [`verification`](verification.md) | Checks, test planning, deterministic outputs. | `../../AGENTS.md`, relevant task docs |
| [`alpha-orchestrator`](alpha-orchestrator.md) | MVP Alpha slice routing, scope checks, and issue closure decisions. | `../alpha-agent-operating-system.md`, `../alpha-work-routing.md`, `../mvp-alpha-scope.md` |
| [`core-model-guardian`](core-model-guardian.md) | Shared core model type ownership and graph evidence fields. | `../package-map.md`, `../manifest-contracts.md`, `../lumina-map.md` |
| [`route-discovery-guardian`](route-discovery-guardian.md) | MVP Alpha route discovery and route manifest review. | `../routing-contract.md`, `../file-conventions.md`, `../manifest-contracts.md` |
| [`render-manifest-guardian`](render-manifest-guardian.md) | Static/basic SSR render manifest review. | `../runtime-contract.md`, `../manifest-contracts.md`, `../performance-contract.md` |
| [`map-contract-guardian`](map-contract-guardian.md) | Lumina Map V1 graph edge and confidence review. | `../risk-mitigation.md`, `../lumina-map.md`, `../manifest-contracts.md` |
| [`cli-json-contract-keeper`](cli-json-contract-keeper.md) | CLI JSON, diagnostics, exit code, and snapshot review. | `../cli-json-contract.md`, `../diagnostics-contract.md`, `../testing-contract.md` |
| [`demo-fixture-reviewer`](demo-fixture-reviewer.md) | Demo app fixture and snapshot evidence review. | `../mvp-alpha-scope.md`, `../examples-contract.md`, `../testing-contract.md` |
| [`security-threat-reviewer`](security-threat-reviewer.md) | Threat notes, secret handling, and high-risk change review. | `../security-contract.md`, `../threat-model.md` |
| [`performance-claim-reviewer`](performance-claim-reviewer.md) | Speed, benchmark, and performance claim review. | `../performance-contract.md`, `../benchmark-methodology.md`, `../speed-decisions.md` |
| [`release-readiness-reviewer`](release-readiness-reviewer.md) | Merge readiness and issue-closure evidence review. | `../review-checklist.md`, `../docs-verification.md`, `../task-backlog.md` |

## Delegation Rules

- Keep subagent tasks concrete, bounded, and non-overlapping.
- Give each subagent the exact files or area it owns.
- Tell subagents they are not alone in the codebase and must not revert unrelated work.
- Use these briefs as role contracts, not as a substitute for reading `../../AGENTS.md`.
- Subagents must report changed files, commands run, risks, and unresolved questions.
