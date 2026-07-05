# Compiler IR

The Needle compiler should use one internal representation that feeds CLI output, runtime manifests, SEO reports, Needle Map, devtools, and agent context.

## Goals

- Keep framework intelligence in build-time code.
- Generate stable manifests.
- Give every route a clear render mode.
- Provide structured diagnostics.
- Preserve enough information for Needle Map and agents.
- Avoid runtime recomputation where build-time generation is possible.
- Keep CLI, compiler, map, agent, MCP, runtime adapters, and devtools aligned on one immutable core data model.

## Needle App

```ts
export type NeedleApp = {
  root: string
  config: NeedleConfig
  routes: RouteNode[]
  layouts: LayoutNode[]
  components: ComponentNode[]
  apis: ApiNode[]
  serverFns: ServerFunctionNode[]
  schemas: SchemaNode[]
  content: ContentNode[]
  graph: NeedleGraph
}
```

## Route Node

```ts
export type RouteNode = {
  id: string
  path: string
  file: string
  kind: "page" | "api"
  params: Param[]
  layouts: string[]
  renderMode: RenderMode
  meta?: MetaDefinition
  owner?: Owner
  cache?: CachePlan
}
```

## Route Manifest

Example:

```json
{
  "routes": [
    {
      "id": "app.page",
      "path": "/",
      "file": "app/page.tsx",
      "kind": "page",
      "params": [],
      "renderMode": "auto"
    },
    {
      "id": "app.blog.$slug.page",
      "path": "/blog/:slug",
      "file": "app/blog/[slug]/page.tsx",
      "kind": "page",
      "params": [{ "name": "slug", "type": "string" }],
      "renderMode": "auto"
    }
  ]
}
```

## Render Manifest

The render manifest records how every route should execute.

```ts
export type RenderManifest = {
  routes: Array<{
    id: string
    path: string
    mode: "static" | "prerender" | "ssr" | "stream" | "client-only" | "api" | "api-hot"
    cache?: CachePlan
    generatedFiles: string[]
  }>
}
```

## Diagnostic

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

## Determinism Requirements

- Use normalized POSIX-style paths in manifests.
- Sort arrays by stable keys.
- Avoid absolute paths in public artifacts unless explicitly required.
- Include schema versions in generated JSON.
- Keep JSON compact for agent-facing commands.
- Keep human output readable but do not make it the only source of truth.

## Compiler Stages

The compiler pipeline is:

```txt
discovery -> IR -> graph augmentation -> codegen -> manifests
```

Detailed stages:

1. Load config.
2. Discover `app/`.
3. Build route nodes.
4. Discover layouts.
5. Extract render mode exports.
6. Extract metadata exports.
7. Extract schemas.
8. Build initial structural graph.
9. Augment graph from contracts and conventions.
10. Generate manifests.
11. Generate runtime modules.
12. Generate SEO inputs.
13. Generate Needle Map outputs.
14. Generate agent context capsules.
15. Emit diagnostics.

## Incremental Compilation

Planned incremental behavior:

- Cache compiler artifacts by source content hash, config hash, compiler version, and graph schema version.
- Persist build and graph cache under `.needle/cache/`.
- Use graph edges to invalidate changed routes and dependents.
- Avoid rebuilding unrelated routes.
- Parallelize independent route compilation where possible.
- Keep generated JSON stable so agent-facing output can be diffed.

## Feature Scheduling Gate

Before a feature is scheduled, it must answer:

1. Does it improve Needle Map or the Agent Kernel?
2. Can it be implemented with minimal production runtime code?
3. Does it have a clear definition of done with tests and an agent demo?

Features that do not satisfy these questions are lower priority for the first prototype.

## Out of Scope for Initial IR

- Full TypeScript semantic analysis of every prop.
- Full React Server Components graph.
- Cross-package incremental analysis.
- Persistent graph cache.
- Fine-grained field-level dataflow.
