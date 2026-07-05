# Safe Edit Transactions

Safe edits are the highest-trust part of NeedleStart's agent story. One silent breaking edit damages the whole product.

Every write operation from CLI or MCP must use the same transaction engine.

## SafeEditTransaction

```ts
export type SafeEditTransaction = {
  id: string
  target: string
  requestedBy: "human" | "agent" | "mcp" | "cli"
  risk: "low" | "medium" | "high"
  status: "dry-run" | "applied" | "rejected" | "rolled-back"
  files: Array<{
    path: string
    beforeHash: string
    afterHash?: string
  }>
  affected: {
    files: string[]
    routes: string[]
    tests: string[]
    cacheTags: string[]
    seo: string[]
  }
  checks: Record<string, "pass" | "warn" | "fail" | "skipped">
  diff: string
  explanation: string
}
```

## Phase 1: Pre-Validation

Validate:

- Target node exists in the current graph.
- Field is in the allowed editable set for that node type.
- Requested change matches the expected schema.
- Risk tier is compatible with current policy.
- High-risk edits have explicit human override.

## Phase 2: Dry Run

Dry run must:

- Apply patch in memory using an AST tool such as `ts-morph`.
- Regenerate affected graph slices.
- Run affected checks:
  - typecheck
  - render
  - SEO
  - map integrity
  - budget
- Produce rich diff and impact report.
- Return structured JSON to CLI and MCP.

## Phase 3: Apply

Apply only if dry run passes or an explicit override is present.

Apply must:

- Write files.
- Append to `.needle/mutations.json`.
- Trigger incremental rebuild.
- Emit a mutation ID.

## Phase 4: Post-Apply Verification

Post-apply verification must:

- Re-run affected checks.
- Confirm graph consistency.
- Emit final structured result.
- Make transaction queryable by mutation ID.

## Risk Tiers

| Tier | Examples | Requirements | Default behavior |
| --- | --- | --- | --- |
| Low | metadata, copy text, simple props | Auto-apply after passing dry run | Safe |
| Medium | add block, update contract | Dry run plus confirmation prompt | Ask user or agent |
| High | auth, billing, schemas, cache | Human override plus extra checks | Block unless `--force` |

## Required Commands

```bash
needle edit route /pricing --set meta.title="Pricing | Acme" --dry-run
needle edit route /pricing --set meta.title="Pricing | Acme"
needle edit transaction <mutationId>
needle edit undo <mutationId>
```

## MCP Requirements

MCP write tools must expose:

- Dry-run result.
- Risk tier.
- Diff.
- Affected files.
- Affected routes.
- Checks.
- Mutation ID.
- Rollback availability.

MCP tools must not bypass CLI safe-edit validation.

## Testing Strategy

Create a chaos fixture app with known dangerous areas:

- Auth.
- Billing.
- Schemas.
- Cache invalidation.
- Server functions.
- Public SEO routes.

Run automated agent simulation loops in CI.

Measure:

- False positive rejection rate.
- False negative missed breakage rate.
- Valid edit first-pass success rate after dry run.
- Rollback success rate.

## Success Metrics

- Zero silent production breaks in realistic agent refactoring sessions.
- More than 95 percent of valid edits succeed on first try after dry run.
- High-risk edits are blocked unless explicitly overridden.
