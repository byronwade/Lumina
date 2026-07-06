# Needle Map

Status: Planned.
Audience: app developers, framework contributors, AI agents.

This page describes the planned Needle Map behavior. Needle Map generation is not implemented yet.

Needle Map is the semantic dependency graph for a NeedleStart application.

It must be a core framework feature, not a side widget.

## Product Promise

Needle Map should answer:

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
- `dangerZone`

## Edge Shape

```ts
export type GraphEdge = {
  id: string
  from: string
  to: string
  kind: EdgeKind
  source: "compiler" | "import" | "typescript" | "contract" | "convention" | "manual"
  confidence: number
  why: string
  fields?: string[]
  risk?: "low" | "medium" | "high"
}
```

## CLI

Planned commands:

```bash
needle map
needle map --json
needle map file components/ProductCard.tsx
needle map affected components/ProductCard.tsx
needle map route /pricing
needle map explain components/ProductCard.tsx
```

## Query API

`@needle/map` should expose a programmatic query API used by CLI, MCP, devtools, and the Agent Kernel.

Planned API:

```ts
getAffected(node)
explainEdge(edgeId)
query("route:/pricing affectedBy component:ProductCard")
```

The same query engine should power:

- `needle map file`
- `needle map route`
- `needle map affected`
- `needle map explain`
- MCP `get_impact_map`
- MCP `get_related_files`
- Devtools map explorer
- Agent context capsules

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

Needle Map v1 is a file-level graph.

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

## Layered Semantic Extraction

Needle Map must not jump directly from imports to confident semantic claims.

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
- NeedleStart should dogfood Needle Map once the map exists.

## Performance and Persistence

- Keep the graph in memory during dev and build.
- Persist graph cache to `.needle/cache/graph.json`.
- Persist public graph output to `.needle/map.json`.
- Normalize paths across operating systems.
- Keep IDs stable across runs.
- Target sub-200ms incremental graph updates on large apps.

## Failure Modes

- Over-inference that causes agents to trust bad edges.
- Graph bloat from too many low-confidence inferred edges.
- Non-deterministic output across operating systems.
- Safety-critical behavior depending on graph output alone.

## v2 Scope

Needle Map v2 is semantic.

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
