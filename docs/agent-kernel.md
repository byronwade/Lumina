# Agent Kernel

Status: Planned.
Audience: AI agents, framework contributors, maintainers.

This page describes the planned Agent Kernel behavior. Agent Kernel behavior is not implemented yet.

The Agent Kernel is the part of Lumina that makes applications understandable and safely editable by AI agents.

## Goals

- Let agents inspect the app without reading the whole repository.
- Generate compact route-specific context.
- Provide deterministic task skeletons.
- Support safe edit transactions.
- Record mutation logs.
- Keep production builds free of agent metadata.

## Generated Outputs

The repository root `AGENTS.md` is a hand-maintained operating guide for Lumina contributors. The Agent Kernel must not overwrite it.

Planned public docs and app-agent outputs:

| Output | Scope | Purpose |
| --- | --- | --- |
| `AGENTS.md` | Generated app-local artifact | Agent operating guide for a user application created or managed by Lumina. |
| `llms.txt` | Public docs or app-local artifact | Compact AI-readable summary. |
| `llms-full.txt` | Public docs or app-local artifact | Expanded AI-readable context. |
| `docs-index.json` | Public docs artifact | Machine-readable docs index for the future docs site. |
| `docs-navigation.json` | Public docs artifact | Machine-readable docs navigation for the future docs site. |
| `.lumina/routes.json` | Planned generated app artifact | Route manifest. |
| `.lumina/render-manifest.json` | Implemented generated app artifact | Default route render modes and generated file metadata. |
| `.lumina/map.json` | Implemented generated app artifact | First file-level Lumina Map output. |
| `.lumina/graph.json` | Planned generated app artifact | Semantic app graph. |
| `.lumina/seo.report.json` | Planned generated app artifact | SEO audit output for agents and tooling. |
| `.lumina/perf.report.json` | Implemented initial build status artifact | Performance budget output for agents and tooling remains planned; current output records static HTML status without benchmark claims. |
| `.lumina/workspace.json` | Planned generated app artifact | Workspace apps, packages, settings, and generated artifact index. |
| `.lumina/workspace-graph.json` | Planned generated app artifact | Cross-app graph for shared files, packages, routes, tests, owners, and artifacts. |
| `.lumina/affected.json` | Planned generated app artifact | Affected apps, routes, packages, tests, generated artifacts, and reasons. |
| `.lumina/build-trace.json` | Implemented initial static build artifact | Build phases, timings, cache behavior, and diagnostics. |
| `.lumina/cache-report.json` | Planned generated app artifact | Cache keys, hits, misses, invalidations, and reused artifact summary. |
| `.lumina/hmr-report.json` | Implemented dev artifact for route-file and direct local imported component affected-route reports | Dev server update scope, affected route updates, and planned invalidation/timing expansion. |
| `.lumina/split-report.json` | Planned generated app artifact | Planned app or route split analysis and generated artifact movement. |
| `.lumina/context/*.ctx.json` | Planned generated app artifact | Route or surface context capsules. |
| `.lumina/context/agent-index.json` | Planned generated app artifact | Index of generated agent context. |
| `.lumina/mutations.json` | Planned generated app artifact | Safe edit mutation log. |
| `.lumina/client/*.js` | Implemented build artifact | Route-specific hydration bundles before adapter copying. |
| `.lumina/generated/*` | Implemented generated app artifact | Runtime modules. `.lumina/generated/server-entry.ts` is implemented for the Bun adapter path; broader generated runtime modules remain planned. |
| `.lumina/generated/client/*.tsx` | Implemented build artifact | Generated source entries for route-specific hydration bundles. |
| `dist/routes.manifest.json` | Planned deployment artifact | Adapter-shaped route manifest copy. |
| `dist/render.manifest.json` | Planned deployment artifact | Adapter-shaped render manifest copy. |
| `dist/seo.report.json` | Planned deployment artifact | Adapter-shaped SEO report copy. |
| `dist/adapter.manifest.json` | Planned deployment artifact | Adapter capabilities and deployment output metadata. |
| `dist/public/_lumina/client/*.js` | Implemented deployment artifact | Production static assets for route-specific hydration. |
| `dist/*` | Implemented static HTML deployment artifact | Production build output for static page routes. |

The `.lumina/*` files are the canonical compiler, CLI, MCP, Agent Kernel, devtools, and test contracts. The named `dist/*` files are deployment-oriented adapter outputs. Agent-facing docs must preserve that distinction so agent metadata stays out of production runtime bundles.

See `docs/machine-readable-docs.md` for the planned machine-readable documentation contract.

CLI-facing agent commands should follow `docs/cli-json-contract.md` for `--json` envelopes, diagnostics, and exit codes.

Machine-readable public docs outputs must stay schema-versioned and deterministic. When `docs-index.json`, `docs-navigation.json`, `llms.txt`, or `llms-full.txt` exist, structured records should include `schemaVersion`, may include `generatedAt` only when it can remain deterministic for the build contract, must avoid secrets and local machine paths, and must remain outside agent metadata shipped in production runtime bundles.

## Commands

Planned commands:

```bash
lumina agent init
lumina agent context
lumina agent task
lumina agent plan
lumina agent apply
lumina agent log
```

## Context Capsule

Example:

```json
{
  "route": "/pricing",
  "source": "app/pricing/page.tsx",
  "mode": "static",
  "seo": {
    "status": "pass",
    "title": "Pricing | Acme",
    "canonical": "/pricing"
  },
  "components": ["Hero", "PricingTable", "FAQ"],
  "data": ["billing.plans.public"],
  "safeEdits": ["meta.*", "copy.*", "blocks.*.props"],
  "dangerZones": ["billing", "checkout"],
  "checks": ["seo", "typecheck", "render"]
}
```

## Safe Edit Transaction

Planned transaction flow:

1. Validate target exists.
2. Validate field is editable.
3. Check risk tier.
4. Produce a dry-run diff preview.
5. Apply patch in memory using AST.
6. Format changed files.
7. Regenerate affected graph slices.
8. Run affected checks.
9. Apply file writes only after dry-run passes or override is explicit.
10. Append to `.lumina/mutations.json`.
11. Trigger incremental rebuild.
12. Re-run affected checks.
13. Return structured result for CLI and MCP.
14. Support rollback through `lumina edit undo`.

String replacement is not allowed for safe edits.

## Risk Tiers

Low risk:

- Metadata.
- Copy.
- Simple structured block props.

Medium risk:

- Adding components.
- Updating component contracts.
- Updating route contracts.

High risk:

- Auth.
- Billing.
- Cache invalidation.
- Server functions.
- Schemas.
- Deployment adapters.
- File-system write tools.

High-risk edits require explicit override through `--force`, human confirmation, or an equivalent safe-edit policy.

In production workflows, high-risk edits require explicit human sign-off.

The full transaction contract is documented in `docs/safe-edit-transactions.md`.

## Mutation Log

Example:

```json
{
  "id": "mut_01K00000000000000000000000",
  "task": "Update pricing title",
  "filesChanged": ["app/pricing/page.tsx"],
  "checks": {
    "typecheck": "pass",
    "seo": "pass",
    "map": "pass"
  },
  "risk": "low"
}
```

## Agent Safety Rules

- Safe edit APIs must validate target existence.
- Safe edit APIs must reject unknown fields.
- Safe edit APIs must produce a dry-run diff before applying.
- Safe edit APIs must use AST edits.
- High-risk areas require explicit override.
- High-risk production edits require explicit human sign-off.
- Mutation logs must be append-only.
- Safe edit rollback must be available for applied transactions.
- Generated files must not be manually edited.
- Agent context must not be included in production bundles.

## High-Risk Areas

- Auth.
- Billing.
- Cache invalidation.
- Deployment adapters.
- File-system write tools.
- MCP write tools.
- Secrets and environment variables.

## Deterministic Agent Plans

`lumina agent plan "task"` should return a structured task skeleton based on graph data and templates. It should not call an external LLM.

The plan should include:

- Goal.
- Relevant files.
- Likely affected routes.
- Required checks.
- Risk level.
- Out of scope.
