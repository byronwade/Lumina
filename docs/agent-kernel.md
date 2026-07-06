# Agent Kernel

Status: Planned.
Audience: AI agents, framework contributors, maintainers.

The Agent Kernel is the part of NeedleStart that makes applications understandable and safely editable by AI agents.

## Goals

- Let agents inspect the app without reading the whole repository.
- Generate compact route-specific context.
- Provide deterministic task skeletons.
- Support safe edit transactions.
- Record mutation logs.
- Keep production builds free of agent metadata.

## Generated Outputs

The repository root `AGENTS.md` is a hand-maintained operating guide for NeedleStart contributors. The Agent Kernel must not overwrite it.

Planned public docs and app-agent outputs:

| Output | Scope | Purpose |
| --- | --- | --- |
| `AGENTS.md` | Generated app-local artifact | Agent operating guide for a user application created or managed by NeedleStart. |
| `llms.txt` | Public docs or app-local artifact | Compact AI-readable summary. |
| `llms-full.txt` | Public docs or app-local artifact | Expanded AI-readable context. |
| `docs-index.json` | Public docs artifact | Machine-readable docs index for the future docs site. |
| `.needle/graph.json` | Generated app artifact | Semantic app graph. |
| `.needle/routes.json` | Generated app artifact | Route manifest. |
| `.needle/map.json` | Generated app artifact | Queryable Needle Map output. |
| `.needle/context/*.ctx.json` | Generated app artifact | Route or surface context capsules. |
| `.needle/context/agent-index.json` | Generated app artifact | Index of generated agent context. |

See `docs/machine-readable-docs.md` for the planned machine-readable documentation contract.

CLI-facing agent commands should follow `docs/cli-json-contract.md` for `--json` envelopes, diagnostics, and exit codes.

## Commands

Planned commands:

```bash
needle agent init
needle agent context
needle agent task
needle agent plan
needle agent apply
needle agent log
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
6. Regenerate affected graph slices.
7. Run affected checks.
8. Apply file writes only after dry-run passes or override is explicit.
9. Append to `.needle/mutations.json`.
10. Trigger incremental rebuild.
11. Re-run affected checks.
12. Return structured result for CLI and MCP.
13. Support rollback through `needle edit undo`.

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

`needle agent plan "task"` should return a structured task skeleton based on graph data and templates. It should not call an external LLM.

The plan should include:

- Goal.
- Relevant files.
- Likely affected routes.
- Required checks.
- Risk level.
- Out of scope.
