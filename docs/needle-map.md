# Needle Map

Needle Map is the app graph for a NeedleStart application.

It is the product spine: the framework-level map that lets humans, agents, CLI commands, MCP tools, devtools, tests, benchmarks, and docs understand how the application is connected.

Needle Map must be a core framework feature, not a side widget.

## Product Promise

Needle Map should answer:

- What uses this?
- What does this use?
- What breaks if I change this?
- Why does this route render this way?
- Which tests should run?
- Which pages are affected?
- Which SEO surfaces are affected?
- Which cache tags are affected?
- Which generated files are affected?
- Which team owns this?
- Is this safe for an agent to edit?

## App-Graph-Native Rule

NeedleStart should not treat graph output as a later devtools feature. The app graph is the shared contract between:

- compiler
- CLI
- runtime adapters
- SEO engine
- cache system
- schema system
- Agent Kernel
- MCP server
- devtools
- public docs
- benchmarks
- tests

If a feature cannot improve the app graph, explain framework behavior, or make agent workflows safer, it is lower priority for the first prototype.

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
- `generatedFile`
- `benchmarkFixture`
- `docPage`

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
- `generatesFile`
- `benchmarkedBy`
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

Every edge must explain itself. `why` is not optional decoration; it is how humans and agents avoid trusting graph ghosts.

## CLI

Planned commands:

```bash
needle map
needle map --json
needle map file components/ProductCard.tsx
needle map affected components/ProductCard.tsx
needle map route /pricing
needle map explain components/ProductCard.tsx
needle inspect why route /pricing
```

`needle inspect why` should use graph data when it explains route, render, cache, SEO, adapter, or affected-check decisions.

## Query API

`@needle/map` should expose a programmatic query API used by CLI, MCP, devtools, and the Agent Kernel.

Planned API:

```ts
getAffected(node)
explainEdge(edgeId)
query("route:/pricing affectedBy component:ProductCard")
```

The same query engine should power:

- `needle map affected`
- `needle map explain`
- `needle inspect why`
- MCP `get_impact_map`
- MCP `get_related_files`
- Devtools map explorer
- Agent context capsules
- Safe edit planning
- Benchmark fixture impact checks

## Example Query Output

```json
{
  "file": "components/ProductCard.tsx",
  "risk": "medium",
  "dependedOnBy": [
    {
      "node": "app/products/[id]/page.tsx",
      "kind": "renders",
      "route": "/products/[id]",
      "why": "Product detail route imports and renders ProductCard."
    }
  ],
  "dependsOn": [
    {
      "node": "schemas/product.ts",
      "kind": "usesProps",
      "fields": ["name", "price", "image.url"],
      "why": "Component contract references ProductPublic fields."
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
- Render manifest.
- TypeScript imports.
- CSS imports.
- Test naming conventions.
- Story files.
- Content files.
- Metadata files.
- Schema files.
- Cache manifest.
- Generated files manifest data.

Definition of done:

- Graph includes routes, components, APIs, schemas, tests, styles, metadata, cache tags, and generated files.
- Affected query works from changed file to impacted routes and tests.
- Explain query includes why edges exist.
- Output is compact and deterministic.
- Tests cover graph generation on fixture apps.

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
- Benchmark graph generation, graph update time, and affected query latency.

## Failure Modes

- Over-inference that causes agents to trust bad edges.
- Graph bloat from too many low-confidence inferred edges.
- Non-deterministic output across operating systems.
- Safety-critical behavior depending on graph output alone.
- Pretty visualization work outrunning reliable query behavior.

## v2 Scope

Needle Map v2 is semantic.

Inputs:

- Component contracts.
- Route metadata.
- Schemas.
- Server functions.
- Cache tags.
- Render modes.
- Ownership metadata.
- Safe edit policies.

Definition of done:

- Map distinguishes hard and soft edges.
- Component contracts create `usesProps` edges.
- Route metadata creates `affectsSeo` edges.
- Cache tags appear as nodes.
- Generated files appear as nodes where useful.
- Affected checks include SEO, visual, schema, cache, generated output, and ownership impact.
