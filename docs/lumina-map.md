# Lumina Map

Status: Planned.
Audience: app developers, framework contributors, AI agents.

This page describes the planned Lumina Map behavior. Lumina Map generation is not implemented yet.

Lumina Map is the semantic dependency graph for a Lumina application.

It must be a core framework feature, not a side widget.

Large-repo workspace graph behavior is documented in [Large-Repo Build Architecture](large-repo-build-architecture.md). The workspace graph extends Lumina Map across apps and packages; it does not authorize runtime source discovery.

## MVP Alpha Map

For MVP Alpha, the Lumina Map is a deterministic file-level graph generated from discovered routes, route source files, imported components, render mode declarations, and basic ownership or source metadata when present. It should be useful before deeper semantic contracts exist.

MVP Alpha should prove the map can explain a small app through generated JSON and CLI inspection. It should not claim full semantic understanding, affected-test accuracy, MCP write support, safe edit behavior, or benchmark-backed performance until those features exist.

## MVP Alpha Nodes

MVP Alpha map output should use these initial node kinds:

- `route`
- `layout`
- `page`
- `component`
- `config`
- `manifest`

## MVP Alpha Edges

MVP Alpha map output should use these initial edge kinds:

- `route.source`
- `route.layout`
- `file.imports`
- `route.renderMode`
- `route.generates`

Every MVP edge must include `kind`, `source`, `confidence`, and `why`.

## MVP Alpha CLI Inspection

Target MVP behavior:

```bash
lumina map --json
lumina inspect / --json
lumina inspect why /
lumina inspect why components/Hero.tsx
```

`lumina map --json` should emit the first map contract. `lumina inspect / --json` should return route-centered evidence. `lumina inspect why /` should explain why the route exists, which file owns it, which layout wraps it, which render mode applies, and which generated artifacts include it.

## MVP Alpha Example Output

Target MVP behavior for the demo app:

```json
{
  "schemaVersion": "lumina.map.v0",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "appRoot": ".",
  "nodes": [
    { "id": "route:/", "kind": "route", "label": "/" },
    { "id": "file:app/page.tsx", "kind": "page", "label": "app/page.tsx" },
    { "id": "file:components/Hero.tsx", "kind": "component", "label": "components/Hero.tsx" }
  ],
  "edges": [
    {
      "id": "edge:route-home-source",
      "from": "route:/",
      "to": "file:app/page.tsx",
      "kind": "route.source",
      "source": "file",
      "confidence": "high",
      "why": "app/page.tsx defines the root page route."
    },
    {
      "id": "edge:home-imports-hero",
      "from": "file:app/page.tsx",
      "to": "file:components/Hero.tsx",
      "kind": "file.imports",
      "source": "static-analysis",
      "confidence": "high",
      "why": "app/page.tsx imports components/Hero.tsx."
    }
  ]
}
```

## Why Agents Need The Map

Agents should use the MVP map to narrow context, identify affected routes, explain why a file matters, and choose checks. The MVP map does not authorize writes. safe edits remain future work, and MCP writes remain future work.

## Future Nodes And Edges

The long-term Lumina Map should grow into the full semantic graph below after MVP Alpha proves deterministic route, file, render, manifest, and inspection output.

## Product Promise

Lumina Map should answer:

- What uses this?
- What does this use?
- What breaks if I change this?
- Which tests should run?
- Which pages are affected?
- Which SEO surfaces are affected?
- Which cache tags are affected?
- Which team owns this?
- Is this safe for an agent to edit?

## Node Types

Planned graph nodes:

- `route`
- `layout`
- `page`
- `component`
- `api`
- `serverFn`
- `schema`
- `style`
- `test`
- `story`
- `content`
- `image`
- `translation`
- `metadata`
- `sitemap`
- `cacheTag`
- `package`
- `workspace`
- `app`
- `generatedArtifact`
- `deploymentTarget`
- `owner`
- `envVar`

## Edge Types

Planned edge types:

- `imports`
- `renders`
- `usesLayout`
- `usesProps`
- `providesData`
- `consumesData`
- `callsApi`
- `callsServerFn`
- `validatesWithSchema`
- `serializesWithSchema`
- `styledBy`
- `coveredByTest`
- `documentedBy`
- `usesTranslation`
- `definesMetadata`
- `affectsSeo`
- `usesCacheTag`
- `usesEnv`
- `ownedBy`
- `workspaceContains`
- `appUsesPackage`
- `fileConsumedByApp`
- `artifactGeneratedFrom`
- `artifactConsumedByAdapter`
- `dangerZone`

## Edge Shape

```ts
export type GraphEdge = {
  id: string
  from: string
  to: string
  kind: EdgeKind
  source: "file" | "contract" | "convention" | "static-analysis" | "manual"
  confidence: "high" | "medium" | "low"
  why: string
  fields?: string[]
  risk?: "low" | "medium" | "high"
}
```

The Phase 1A `@lumina/core` `GraphEdge` type requires `kind`, `source`, `confidence`, and `why`, with optional `fields` and `risk` context. Graph generation and semantic edge production remain planned.

## CLI

Planned commands:

```bash
lumina map
lumina map --json
lumina map file components/ProductCard.tsx
lumina map affected components/ProductCard.tsx
lumina map route /pricing
lumina map explain components/ProductCard.tsx
```

## Query API

`@lumina/map` should expose a programmatic query API used by CLI, MCP, devtools, and the Agent Kernel.

Planned API:

```ts
getAffected(node)
explainEdge(edgeId)
query("route:/pricing affectedBy component:ProductCard")
```

The same query engine should power:

- `lumina map file`
- `lumina map route`
- `lumina map affected`
- `lumina map explain`
- MCP `get_impact_map`
- MCP `get_related_files`
- Devtools map explorer
- Agent context capsules
- `lumina workspace graph --json`
- `lumina workspace apps --json`
- `lumina workspace explain <file> --json`

## Agent Read Surface

Planned agent-readable surfaces:

- Route context capsules with source files, render mode, metadata, cache plan, related tests, owners, and allowed edit surfaces.
- Lumina Map queries for affected routes, related files, impact chains, and edge explanations.
- Machine-readable reports for SEO, performance budgets, cache behavior, diagnostics, and generated artifacts.
- MCP read tools that expose compact JSON rather than full-repository context dumps.

## Agent Edit Surface

The Lumina Map should inform agent edits, but it must not be the write path by itself.

Planned agent write behavior must go through safe edit transactions:

- Validate the requested change.
- Produce a dry-run preview.
- Apply through AST-aware edits where TypeScript source is involved.
- Format the affected files.
- Regenerate the relevant map or route context slice.
- Run affected checks.
- Log the mutation.
- Support undo.

High-risk edits require explicit human sign-off. Low-confidence map edges should narrow review scope, not authorize unsafe changes.

## Out Of Scope Until Implementation

- Treating import analysis as full semantic understanding.
- Letting agents edit files directly because a map edge exists.
- Claiming affected-test accuracy before fixture evidence exists.
- Shipping map or agent metadata in production runtime bundles.

## Example Query Output

```json
{
  "file": "components/ProductCard.tsx",
  "risk": "medium",
  "dependedOnBy": [
    {
      "node": "app/products/[id]/page.tsx",
      "kind": "renders",
      "route": "/products/[id]"
    }
  ],
  "dependsOn": [
    {
      "node": "schemas/product.ts",
      "kind": "usesProps",
      "fields": ["name", "price", "image.url"]
    }
  ],
  "recommendedChecks": [
    "typecheck:affected",
    "test:affected",
    "seo:affected",
    "visual:affected"
  ]
}
```

## v1 Scope

Lumina Map v1 is a file-level graph.

This is Layer 0 of graph extraction. It should be deterministic, fast, and honest about what it knows.

Inputs:

- Route manifest.
- TypeScript imports.
- CSS imports.
- Test naming conventions.
- Story files.
- Content files.
- Metadata files.
- Schema files.

Planned v1 acceptance criteria:

- Graph should include routes, components, APIs, schemas, tests, styles, and metadata.
- Affected query should connect changed files to impacted routes and tests.
- Explain query should include why edges exist.
- Output should be compact and deterministic.
- Tests should cover graph generation on fixture apps.

Large-repo graph acceptance criteria remain planned separately:

- Workspace graph should include apps, packages, shared files, generated artifacts, tests, owners, and deployment targets.
- Affected queries should explain app, route, package, test, and generated artifact impact.
- Shared-file consumers should be queryable without reading the whole repository at request time.

## Layered Semantic Extraction

Lumina Map must not jump directly from imports to confident semantic claims.

Layer 0:

- File and import graph.
- Deterministic dependency walking.
- No speculative semantic inference.

Layer 1:

- Explicit `.contract.ts` files.
- Highest-confidence source for semantic graph edges.
- Preferred source for component props, SEO role, test coverage, safe edit paths, and ownership.

Example:

```ts
export default componentContract({
  name: "ProductCard",
  props: {
    product: ref("ProductPublic"),
    variant: enum_("compact", "full").default("compact"),
  },
  seo: {
    role: "product-summary",
    mayContainLcpImage: true,
  },
  cache: {
    tags: ({ product }) => [`product:${product.id}`],
  },
  tests: {
    unit: "components/ProductCard.test.tsx",
    visual: "components/ProductCard.stories.tsx",
  },
  ownership: "billing-team",
})
```

Layer 2:

- Convention-based inference.
- Sources include loader exports, metadata exports, schema exports, render mode declarations, cache tags, route files, and test naming conventions.

Layer 3:

- Optional lightweight static analysis.
- Used for prop drilling and data consumption only when requested or when it can run without blocking the normal build.

## Confidence Rules

- Missing contracts produce low-confidence edges.
- Inferred edges must explain the convention that created them.
- Safety-critical decisions must not rely on graph data alone.
- Runtime checks, explicit contracts, and affected checks must be used alongside the graph.
- Lumina should dogfood Lumina Map once the map exists.

## Performance and Persistence

- Keep the graph in memory during dev and build.
- Persist graph cache to `.lumina/cache/graph.json`.
- Persist public graph output to `.lumina/map.json`.
- Normalize paths across operating systems.
- Keep IDs stable across runs.
- Target sub-200ms incremental graph updates on large apps.

## Failure Modes

- Over-inference that causes agents to trust bad edges.
- Graph bloat from too many low-confidence inferred edges.
- Non-deterministic output across operating systems.
- Safety-critical behavior depending on graph output alone.

## v2 Scope

Lumina Map v2 is semantic.

Inputs:

- Component contracts.
- Route metadata.
- Schemas.
- Server functions.
- Cache tags.
- Render modes.

Planned v2 acceptance criteria:

- Map should distinguish hard and soft edges.
- Component contracts should create `usesProps` edges.
- Route metadata should create `affectsSeo` edges.
- Cache tags should appear as nodes.
- Affected checks should include SEO, visual, schema, and cache impact.
