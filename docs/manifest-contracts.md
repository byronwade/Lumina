# Manifest Contracts

NeedleStart is built around generated manifests. This document defines the planned contract for manifest shape, versioning, determinism, paths, diagnostics, and compatibility.

Manifests are the spine of the framework. CLI, runtime adapters, SEO, Needle Map, Agent Kernel, MCP, devtools, tests, and deployment tools should read the same generated contracts instead of rediscovering application structure.

## Goals

- Make generated output deterministic and testable.
- Give agents compact structured data instead of repository-wide scanning.
- Keep production runtime small by moving decisions to build time.
- Make every cache, route, SEO, adapter, and map decision inspectable.
- Avoid leaking secrets or agent-only metadata into production runtime bundles.
- Make breaking changes explicit through schema versions.

## Global Manifest Rules

Every JSON manifest should include:

```ts
export type ManifestBase = {
  schemaVersion: string
  generator: {
    name: "needlestart"
    version: string
    package?: string
  }
  app: {
    root: string
    configHash: string
  }
  diagnostics: NeedleDiagnostic[]
}
```

Rules:

- `schemaVersion` uses a simple string, such as `1.0.0`.
- `generator.version` should come from the framework package version once packages exist.
- `configHash` is a stable hash of the normalized, redacted config.
- Avoid wall-clock timestamps in stable manifests by default.
- Use normalized POSIX-style paths.
- Sort arrays by stable keys.
- Do not include absolute paths unless a command explicitly requests local-only debug output.
- Do not include secret values.
- Keep production manifests free of agent context capsules unless explicitly designed for development use.

## Manifest Locations

Planned build output:

```txt
dist/
  public/
  server/
  needle.manifest.json
  routes.manifest.json
  render.manifest.json
  seo.report.json
  cache.manifest.json
  map.manifest.json
  perf.report.json
  adapter.manifest.json
```

Planned development/build workspace output:

```txt
.needle/
  routes.json
  render-manifest.json
  map.json
  graph.json
  seo.report.json
  perf.report.json
  cache.manifest.json
  adapter.manifest.json
  context/
    public.ctx.json
    api.ctx.json
    agent-index.json
  generated/
    server-entry.ts
    routes.ts
    handlers.ts
  mutations.json
  cache/
    graph.json
```

Rules:

- `dist/*` is runtime/deployment output.
- `.needle/*` is compiler, dev, agent, map, and generated workspace output.
- Agent context must not be included in production runtime bundles.
- Generated files must identify source inputs when practical.

## Root Manifest

`needle.manifest.json` is the build index.

```ts
export type NeedleManifest = ManifestBase & {
  build: {
    mode: "development" | "production"
    adapter: string
    runtime: "bun" | "node"
  }
  files: {
    routes: string
    render: string
    seo?: string
    cache?: string
    map?: string
    perf?: string
    adapter: string
  }
}
```

Example:

```json
{
  "schemaVersion": "1.0.0",
  "generator": { "name": "needlestart", "version": "0.0.0" },
  "app": { "root": "app", "configHash": "cfg_000000" },
  "build": { "mode": "production", "adapter": "bun", "runtime": "bun" },
  "files": {
    "routes": "routes.manifest.json",
    "render": "render.manifest.json",
    "seo": "seo.report.json",
    "cache": "cache.manifest.json",
    "map": "map.manifest.json",
    "perf": "perf.report.json",
    "adapter": "adapter.manifest.json"
  },
  "diagnostics": []
}
```

## Route Manifest

`routes.manifest.json` describes discovered routes.

```ts
export type RoutesManifest = ManifestBase & {
  routes: Array<{
    id: string
    path: string
    file: string
    kind: "page" | "api"
    params: Param[]
    layouts: string[]
    routeGroup?: string[]
    special?: {
      notFound?: string
      error?: string
    }
  }>
}
```

Example:

```json
{
  "schemaVersion": "1.0.0",
  "generator": { "name": "needlestart", "version": "0.0.0" },
  "app": { "root": "app", "configHash": "cfg_000000" },
  "routes": [
    {
      "id": "app.page",
      "path": "/",
      "file": "app/page.tsx",
      "kind": "page",
      "params": [],
      "layouts": ["app/layout.tsx"]
    }
  ],
  "diagnostics": []
}
```

## Render Manifest

`render.manifest.json` describes execution mode and generated files.

```ts
export type RenderManifest = ManifestBase & {
  routes: Array<{
    id: string
    path: string
    mode: "static" | "prerender" | "ssr" | "stream" | "client-only" | "api" | "api-hot"
    cache?: CachePlan
    revalidate?: RevalidatePlan
    generatedFiles: string[]
    adapterRequirements: string[]
  }>
}
```

Rules:

- `mode` is normalized from route declarations and route kind.
- Static routes should list emitted HTML files.
- SSR and API routes should list server handler modules.
- Adapter requirements should be explicit, such as `http`, `streaming`, or `static-output`.

## SEO Report

`seo.report.json` is both a report and a machine-readable contract for agents.

```ts
export type SeoReport = ManifestBase & {
  routes: Array<{
    id: string
    path: string
    indexable: boolean
    status: "pass" | "warn" | "fail" | "skipped"
    checks: {
      title: CheckResult
      description: CheckResult
      canonical: CheckResult
      indexableHtml: CheckResult
      openGraph?: CheckResult
      structuredData?: CheckResult
      sitemap?: CheckResult
      robots?: CheckResult
      statusCode?: CheckResult
    }
    safeFixes?: SafeFix[]
  }>
}
```

Rules:

- Public indexable routes must include title, description, and canonical checks.
- A skipped SEO route must explain why, such as `api` or `non-indexable`.
- SEO safe fixes must only target fields allowed by safe edit rules.

## Cache Manifest

`cache.manifest.json` describes cache plans and tags.

```ts
export type CacheManifest = ManifestBase & {
  routes: Array<{
    id: string
    path: string
    mode: string
    plan: CachePlan
    tags: string[]
  }>
  tags: Array<{
    tag: string
    usedBy: string[]
  }>
}
```

Rules:

- Every cacheable route or API response must appear.
- SSR and API routes default to `no-store` unless explicitly configured.
- Cache tags must be queryable by Needle Map.
- Micro-cache settings must be explicit and bounded.

## Map Manifest

`map.manifest.json` is the public compact graph output. `.needle/graph.json` may contain a richer internal graph.

```ts
export type MapManifest = ManifestBase & {
  nodes: GraphNode[]
  edges: GraphEdge[]
  queries?: {
    affected?: Record<string, string[]>
  }
}
```

Every edge must include:

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

Rules:

- `confidence` must be between `0` and `1`.
- Low-confidence edges must not be hidden.
- Safety-critical decisions must not rely on graph data alone.
- Explain queries should be able to point back to `why` and `source`.

## Performance Report

`perf.report.json` describes route budgets and bundle visibility.

```ts
export type PerformanceReport = ManifestBase & {
  routes: Array<{
    id: string
    path: string
    mode: string
    jsBytes: number
    cssBytes: number
    hydrationComponents?: number
    checks: Record<string, CheckResult>
  }>
}
```

Rules:

- Budget reports should be deterministic.
- Public-page budgets should be stricter by default.
- Reports should include safe suggestions when possible.
- Benchmarks must not be mixed with build budget reports unless clearly marked.

## Adapter Manifest

`adapter.manifest.json` describes selected adapter capabilities and unsupported features.

```ts
export type AdapterManifest = ManifestBase & {
  adapter: string
  runtime: "bun" | "node"
  capabilities: {
    static: boolean
    ssr: boolean
    api: boolean
    hotApi: boolean
    streaming: boolean
    healthEndpoint: boolean
  }
  unsupported: Array<{
    feature: string
    reason: string
    affectedRoutes?: string[]
  }>
}
```

Rules:

- Static adapter must fail clearly when non-static routes cannot be exported.
- Node adapter must document unsupported Bun-specific capabilities.
- Adapter manifests must be emitted even when build fails after adapter selection, when practical.

## Agent Context Index

`.needle/context/agent-index.json` points agents to compact context capsules.

```ts
export type AgentIndex = ManifestBase & {
  contexts: Array<{
    id: string
    kind: "route" | "api" | "app"
    route?: string
    file: string
    contextFile: string
    risk: "low" | "medium" | "high"
  }>
}
```

Rules:

- Context files are development/build artifacts.
- They must not ship in production runtime bundles.
- Context should be compact enough for agents.
- Context must not include secrets.

## Mutation Log

`.needle/mutations.json` is append-only.

```ts
export type MutationLog = {
  schemaVersion: string
  mutations: SafeEditTransaction[]
}
```

Rules:

- Applied safe edits append a mutation entry.
- Dry runs do not append unless explicitly configured for audit.
- Rollbacks add a new mutation entry that references the original mutation.
- Mutation IDs must be stable unique identifiers.

## Diagnostic Contract

```ts
export type NeedleDiagnostic = {
  code: string
  severity: "info" | "warn" | "error"
  message: string
  file?: string
  route?: string
  node?: string
  safeFix?: SafeFix
}
```

Rules:

- Codes are stable.
- Messages are human-readable.
- Machine logic should depend on codes and fields, not message text.
- `safeFix` must be safe-edit compatible.

## Versioning Policy

Use semantic-ish schema versions for manifests:

| Change | Version impact |
| --- | --- |
| Add optional field | Minor version. |
| Add enum value | Minor version, unless older consumers would fail. |
| Remove field | Major version. |
| Rename field | Major version. |
| Change field meaning | Major version. |
| Change sort order | Major version if snapshots or consumers depend on it. |

Implementation should provide schema constants in `@needle/core` once packages exist.

## Stable Sorting Rules

Suggested ordering:

- Routes: `path`, then `kind`, then `file`, then `id`.
- Layouts: root to leaf.
- Nodes: `kind`, then `id`.
- Edges: `from`, then `to`, then `kind`, then `id`.
- Diagnostics: `severity`, then `code`, then `file`, then `route`, then `message`.
- Generated files: normalized path ascending.

Never rely on filesystem traversal order.

## Redaction Rules

Manifests must not include:

- Secret environment values.
- Authorization headers.
- Cookie values.
- Raw tokens.
- Private keys.
- Local absolute paths in public artifacts.

Manifests may include:

- Names of required environment variables.
- Boolean presence of required values.
- Redacted hashes.
- Public variables intentionally configured as public.

## Testing Requirements

Every manifest should have:

- Type tests for shape.
- Golden fixture tests for deterministic output.
- Cross-platform path normalization tests.
- Redaction tests for secrets.
- Schema version tests.
- Snapshot tests only for stable, intentionally sorted output.

## Out of Scope Initially

- Full JSON Schema publication for every manifest.
- Binary manifest formats.
- Remote manifest registry.
- Production delivery of agent context capsules.
- Runtime route rediscovery.
