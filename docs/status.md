# Project Status

This document is the single source of truth for what NeedleStart has planned, drafted, scaffolded, implemented, and verified.

NeedleStart is currently in Phase 0: project constitution. The repository contains planning and architecture documents, but no runtime implementation yet.

## Status Labels

Use these labels consistently across README, AGENTS, roadmap, package docs, and task plans.

| Label | Meaning |
| --- | --- |
| `planned` | The behavior is intended but no implementation exists. |
| `drafted` | The contract, public API, or architecture is described in docs. |
| `scaffolded` | Package/file structure exists, but behavior is placeholder or incomplete. |
| `implemented` | Code exists for the behavior. |
| `verified` | The documented command or behavior has been run successfully in this repository or a fixture app. |
| `deferred` | Intentionally out of scope for the current prototype. |
| `removed` | The idea was removed or superseded. |

A feature must not be marked `implemented` only because docs or task plans exist.

A command must not be marked `verified` until it has been run after the relevant package scaffolding exists.

## Current Repository State

| Area | Status | Evidence | Next step |
| --- | --- | --- | --- |
| Product thesis | drafted | `README.md`, `VISION.md` | Keep concise and user-facing. |
| Architecture split | drafted | `ARCHITECTURE.md`, ADR 0001 | Revisit when package scaffolds land. |
| Agent-native core | drafted | ADR 0002, `docs/agent-kernel.md` | Generate context capsules after graph and SEO outputs exist. |
| Risk mitigation | drafted | `docs/risk-mitigation.md`, ADR 0003 | Keep required for map, agent, MCP, adapter, and safe-edit work. |
| CLI and adapter boundaries | drafted | ADR 0004, `docs/cli.md`, `docs/package-map.md` | Revisit only through a future ADR. |
| Roadmap | drafted | `docs/roadmap.md` | Update as phases start or move. |
| Task backlog | drafted | `docs/task-backlog.md` | Convert each PR slice into task files or issues. |
| Release policy | drafted | `docs/release.md` | Activate when publish tooling exists. |
| Compatibility policy | drafted | `docs/compatibility.md` | Fill version matrix only after implementation and CI. |
| Examples strategy | drafted | `docs/examples.md` | Add examples once create-app and fixtures exist. |
| Comparison positioning | drafted | `docs/comparisons.md` | Update when benchmarks or launch positioning exist. |
| Accessibility strategy | drafted | `docs/accessibility.md` | Add diagnostics after rendering and SEO checks exist. |
| Frontier skills and subagents prompt | drafted | `docs/prompts/frontier-skills-subagents-prompt.md` | Use to generate model-agnostic agent operating blueprints. |
| GitHub templates | scaffolded | `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/*` | Refine after first implementation PRs. |
| CODEOWNERS | scaffolded | `CODEOWNERS` | Update when packages and examples exist. |
| Docs check workflow | scaffolded | `.github/workflows/docs-check.yml` | Observe first PR run and tune if needed. |
| Monorepo skeleton | planned | Phase 1 roadmap | Create Bun workspace and package scaffolds. |
| Core data model | planned | Phase 1A roadmap | Lock `NeedleApp`, `RouteNode`, `GraphEdge`, and `NeedleDiagnostic`. |
| CLI | planned | `docs/cli.md` | Implement `@needle/cli` after scaffolding. |
| Config | planned | `docs/config.md` | Implement config loader in `@needle/core` or `@needle/compiler`. |
| Routing | planned | `docs/routing.md` | Implement deterministic app discovery. |
| Vite integration | planned | Phase 3 roadmap | Implement `@needle/vite-plugin`. |
| React SSR and hydration | planned | Phase 4 roadmap | Implement `@needle/react` helpers and entries. |
| Render modes | planned | Phase 5 roadmap | Extract `render` exports and emit render manifest. |
| SEO engine | planned | `docs/seo-engine.md` | Implement `defineMeta()` and `needle seo`. |
| Performance budgets | planned | `docs/performance.md` | Emit route budget diagnostics. |
| Adapter abstraction | planned | `docs/adapters.md`, `docs/deployment.md` | Create Bun, Node, and static adapter packages. |
| API routes | planned | `docs/api-routes.md` | Implement route handlers and response normalization. |
| Hot API path | planned | `docs/hot-api-path.md` | Implement schema-backed handler generation. |
| Cache system | planned | `docs/cache.md` | Define cache manifests and diagnostics before runtime caching. |
| Needle Map | planned | `docs/needle-map.md` | Build file-level graph first. |
| MCP server | planned | `docs/mcp-server.md` | Start with read-only tools. |
| Safe edits | planned | `docs/safe-edit-transactions.md` | Implement metadata edit as first low-risk write. |
| Migration tooling | planned | `docs/migration.md` | Prototype constrained Next.js App Router migration. |
| Security policy | drafted | `SECURITY.md`, `docs/security.md` | Update when MCP and safe writes exist. |
| Testing strategy | drafted | `docs/testing.md` | Implement fixtures and stable JSON tests with scaffolding. |

## Command Verification Matrix

Until the monorepo exists, all commands below are target UX only.

| Command | Intended owner | Current status | Verification requirement |
| --- | --- | --- | --- |
| `bun create needle my-app` | `create-needle` | planned | Creates a fixture app and starts dev server. |
| `needle dev` | `@needle/cli`, `@needle/vite-plugin` | planned | Starts Vite and renders a React page. |
| `needle build` | `@needle/cli`, `@needle/compiler` | planned | Emits manifests and build output. |
| `needle start` | adapter package | planned | Serves built routes through selected adapter. |
| `needle routes` | `@needle/cli`, `@needle/compiler` | planned | Emits stable route list and JSON. |
| `needle inspect` | `@needle/cli`, `@needle/compiler` | planned | Inspects one route or file. |
| `needle seo` | `@needle/cli`, `@needle/seo` | planned | Reports SEO diagnostics and stable JSON. |
| `needle map` | `@needle/cli`, `@needle/map` | planned | Emits map summary and stable JSON. |
| `needle agent context` | `@needle/cli`, `@needle/agent` | planned | Emits compact route context JSON. |
| `needle mcp` | `@needle/cli`, `@needle/mcp` | planned | Starts read-only MCP server. |
| `needle edit route` | `@needle/cli`, `@needle/agent` | planned | Produces `SafeEditTransaction`. |
| `needle migrate from-next` | `@needle/cli`, migration package or compiler | planned | Emits migration report and contract stubs. |
| `needle check` | `@needle/cli` | planned | Runs affected checks and emits diagnostics. |
| `needle bench` | `@needle/cli`, benchmark fixtures | planned | Runs reproducible benchmark fixtures. |

## Documentation Coverage Matrix

| Topic | Primary doc | Supporting docs |
| --- | --- | --- |
| Product thesis | `README.md` | `VISION.md` |
| Architecture | `ARCHITECTURE.md` | `docs/decisions/*`, `docs/risk-mitigation.md` |
| Package boundaries | `docs/package-map.md` | `ARCHITECTURE.md`, `AGENTS.md`, ADR 0004 |
| CLI | `docs/cli.md` | `docs/prototype-acceptance.md`, `AGENTS.md`, ADR 0004 |
| Config | `docs/config.md` | `docs/runtime-contract.md`, `docs/adapters.md` |
| Routing | `docs/routing.md` | `docs/compiler-ir.md` |
| Manifests | `docs/manifest-contracts.md` | `docs/compiler-ir.md`, `docs/runtime-contract.md` |
| Runtime | `docs/runtime-contract.md` | `docs/deployment.md`, `docs/adapters.md` |
| SEO | `docs/seo-engine.md` | `docs/routing.md`, `docs/manifest-contracts.md` |
| Accessibility | `docs/accessibility.md` | `docs/seo-engine.md`, `docs/testing.md` |
| Performance | `docs/performance.md` | `docs/testing.md` |
| Cache | `docs/cache.md` | `docs/runtime-contract.md`, `docs/needle-map.md` |
| API routes | `docs/api-routes.md` | `docs/schema.md`, `docs/hot-api-path.md` |
| Schema DSL | `docs/schema.md` | `docs/hot-api-path.md` |
| Needle Map | `docs/needle-map.md` | `docs/risk-mitigation.md`, `docs/manifest-contracts.md` |
| Agent Kernel | `docs/agent-kernel.md` | `docs/mcp-server.md`, `docs/safe-edit-transactions.md` |
| MCP | `docs/mcp-server.md` | `docs/security.md`, `docs/safe-edit-transactions.md` |
| Safe edits | `docs/safe-edit-transactions.md` | `docs/security.md`, `docs/testing.md` |
| Migration | `docs/migration.md` | `docs/needle-map.md`, `docs/schema.md` |
| Deployment | `docs/deployment.md` | `docs/adapters.md`, `docs/runtime-contract.md` |
| Security | `docs/security.md`, `SECURITY.md` | `AGENTS.md`, `docs/mcp-server.md` |
| Testing | `docs/testing.md` | `CONTRIBUTING.md`, `docs/task-backlog.md` |
| Release | `docs/release.md` | `docs/status.md`, `docs/compatibility.md` |
| Examples | `docs/examples.md` | `docs/testing.md`, `docs/prototype-acceptance.md` |
| Comparisons | `docs/comparisons.md` | `README.md`, `VISION.md` |
| Prompt library | `docs/prompts/frontier-skills-subagents-prompt.md` | `AGENTS.md`, `docs/agent-kernel.md` |

## Update Rules

Update this file whenever one of these changes:

- A planned feature becomes scaffolded, implemented, verified, deferred, removed, or renamed.
- A command becomes runnable.
- A package is added, removed, or renamed.
- A generated artifact is added, removed, or versioned.
- A roadmap phase starts, completes, or changes scope.
- A governance artifact such as a template, workflow, CODEOWNERS entry, release policy, or prompt changes status.

Every implementation PR should include a one-line status update when it changes the truth table.

## Verification Notes

When marking a command `verified`, include the date, environment, and fixture used in the relevant PR or release notes.

Example:

```txt
verified: 2026-07-05, macOS arm64, Bun 1.x, examples/basic
```

Do not encode machine-specific absolute paths in verified artifacts.

## Prototype Credibility Gate

The first public prototype becomes credible when the status matrix can honestly mark these as `verified`:

1. Create app.
2. Render React page.
3. Serve static route.
4. Serve SSR route.
5. Run API route.
6. Run hot API route.
7. Emit route manifest.
8. Emit render manifest.
9. Emit SEO report.
10. Emit Needle Map.
11. Emit route context capsule.
12. Start read-only MCP server.
13. Dry-run safe metadata edit.
14. Apply safe metadata edit.
15. Run affected checks.
16. Undo safe metadata edit.
17. Serve through Bun adapter.
18. Demonstrate Node/static adapter path as documented compatibility.
