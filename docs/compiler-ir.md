# Compiler IR

Status: Planned.
Audience: framework contributors, package owners, AI agents.

The Needle compiler should use one internal representation that feeds CLI output, runtime manifests, SEO reports, Needle Map, devtools, and agent context.

Compiler diagnostics should follow [Diagnostics Contract](diagnostics-contract.md).

## Goals

- Keep framework intelligence in build-time code.
- Generate stable manifests.
- Give every route a clear render mode.
- Provide structured diagnostics.
- Preserve enough information for Needle Map and agents.
- Avoid runtime recomputation where build-time generation is possible.
- Keep CLI, compiler, map, agent, MCP, runtime adapters, and devtools aligned on one immutable core data model.
- Preserve whole-system speed by moving safe work to build time and emitting compact runtime artifacts.

## Needle App

The Phase 1 scaffold currently exposes a minimal `NeedleApp` from `@needle/core`:

```ts
export type NeedleApp = {
  name: string
  root: string
  routes: RouteNode[]
  diagnostics: NeedleDiagnostic[]
}
```

This scaffold shape is intentionally smaller than the planned compiler IR. It exists so package boundaries, docs, and tests share one owner for the app-level model before route discovery, layout discovery, schema extraction, and graph generation exist.

Planned expanded compiler IR shape:

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

The Phase 1 scaffold currently exposes a minimal `RouteNode` and `RenderMode` from `@needle/core`:

```ts
export type RenderMode =
  | "static"
  | "prerender"
  | "ssr"
  | "stream"
  | "client-only"
  | "api"
  | "hot-api"

export type RouteNode = {
  id: string
  path: string
  sourceFile: string
  renderMode: RenderMode
  cache?: CachePlan
}
```

The planned compiler IR below adds route kind, params, layouts, metadata, ownership, and other compiler-only details. Any implementation PR that changes the shared scaffold types must update this page, `@needle/core`, scaffold tests, and generated manifest examples together.

```ts
export type RouteNode = {
  id: string
  path: string
  sourceFile: string
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

The route manifest must follow the planned grammar in [Routing Contract](routing-contract.md).

Example:

```json
{
  "routes": [
    {
      "id": "app.page",
      "path": "/",
      "sourceFile": "app/page.tsx",
      "kind": "page",
      "params": [],
      "renderMode": "static"
    },
    {
      "id": "app.blog.$slug.page",
      "path": "/blog/:slug",
      "sourceFile": "app/blog/[slug]/page.tsx",
      "kind": "page",
      "params": [{ "name": "slug", "type": "string" }],
      "renderMode": "static"
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
    mode: "static" | "prerender" | "ssr" | "stream" | "client-only" | "api" | "hot-api"
    cache?: CachePlan
    generatedFiles: string[]
  }>
}
```

## Diagnostic

The shared diagnostic shape, source location rules, remediation fields, related locations, and JSON ordering rules are defined in [Diagnostics Contract](diagnostics-contract.md). Compiler IR nodes may reference diagnostics by code, route ID, source file, or generated artifact, but must not define a competing diagnostic shape.

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

Speed rules for compiler work are defined in `docs/speed-strategy.md`.

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
