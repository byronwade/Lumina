# NeedleStart Subagents

This directory defines vendor-neutral subagent role briefs for AI systems that support delegated or parallel work. They are documentation-only in Phase 0 and are intended to help agents from different AI companies coordinate consistently.

## Role Index

| Subagent | Best for | Must read |
| --- | --- | --- |
| [`architect`](architect.md) | Architecture consistency and package boundaries. | `ARCHITECTURE.md`, `docs/package-map.md` |
| [`compiler-map`](compiler-map.md) | Compiler IR, route discovery, Needle Map, graph output. | `docs/compiler-ir.md`, `docs/needle-map.md`, `docs/risk-mitigation.md` |
| [`runtime-seo`](runtime-seo.md) | Runtime, rendering, SEO, adapters, performance. | `docs/runtime-contract.md`, `docs/seo-engine.md`, `docs/adapters.md` |
| [`agent-safety`](agent-safety.md) | Agent Kernel, MCP, safe edits, AI collaboration safety. | `docs/agent-kernel.md`, `docs/mcp-server.md`, `docs/safe-edit-transactions.md` |
| [`docs-keeper`](docs-keeper.md) | Documentation sync and status honesty. | `README.md`, `AGENTS.md`, `docs/README.md` |
| [`verification`](verification.md) | Checks, test planning, deterministic outputs. | `AGENTS.md`, relevant task docs |

## Delegation Rules

- Keep subagent tasks concrete, bounded, and non-overlapping.
- Give each subagent the exact files or area it owns.
- Tell subagents they are not alone in the codebase and must not revert unrelated work.
- Use these briefs as role contracts, not as a substitute for reading `AGENTS.md`.
- Subagents must report changed files, commands run, risks, and unresolved questions.
