# Compiler IR

Status: Planned.
Audience: framework contributors, package owners, AI agents.

The Lumina compiler should use one internal representation that feeds CLI output, runtime manifests, SEO reports, Lumina Map, devtools, and agent context.

Compiler diagnostics should follow [Diagnostics Contract](diagnostics-contract.md).

## Goals

- Keep framework intelligence in build-time code.
- Generate stable manifests.
- Give every route a clear render mode.
- Provide structured diagnostics.
- Preserve enough information for Lumina Map and agents.
- Avoid runtime recomputation where build-time generation is possible.
- Keep CLI, compiler, map, agent, MCP, runtime adapters, and devtools aligned on one immutable core data model.
- Preserve whole-system speed by moving safe work to build time and emitting compact runtime artifacts.
- Support future multi-app workspace graph, shared-file identity, and affected build planning without adding production runtime source discovery.

## Lumina App

Phase 1A implements the shared `LuminaApp` shape in `@lumina/core`:

```ts
export type LuminaApp = {
  schemaVersion: "lumina.app.v0" | string
  name: string
  root: string
  routeRoot: string
  generatedBy: GeneratedBy
  routes: RouteNode[]
  diagnostics: LuminaDiagnostic[]
}
```

This contract-backed shared shape exists so package boundaries, docs, and tests share one owner for the app-level model before route discovery, layout discovery, schema extraction, and graph generation exist.

Planned expanded compiler IR shape:

```ts
export type LuminaApp = {
  root: string
  config: LuminaConfig
  routes: RouteNode[]
  layouts: LayoutNode[]
  components: ComponentNode[]
  apis: ApiNode[]
  serverFns: ServerFunctionNode[]
  schemas: SchemaNode[]
  content: ContentNode[]
  graph: LuminaGraph
}
```

Large-repo workspace graph, shared-file identity, and affected build planning are defined in [Large-Repo Build Architecture](large-repo-build-architecture.md). Those concepts should extend the compiler model without replacing the app-level route and render contracts.

## Route Node

Phase 1A implements the shared `RouteNode` and `RenderMode` contracts in `@lumina/core`:

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
  kind: "page" | "layout" | "api" | "notFound" | "error"
  path: string
  sourceFile: string
  renderMode: RenderMode
  segments: RouteSegment[]
  params: RouteParam[]
  layouts: string[]
  routeGroups: string[]
  cache?: CachePlan
  diagnostics: LuminaDiagnostic[]
  metadata?: Record<string, unknown>
}
```

The planned compiler IR below adds ownership, discovered components, APIs, schemas, graph data, and other compiler-only details. Any implementation PR that changes the shared core model must update this page, `@lumina/core`, type tests, and generated manifest examples together.

```ts
export type RouteNode = {
  id: string
  path: string
  sourceFile: string
  kind: "page" | "layout" | "api" | "notFound" | "error"
  params: RouteParam[]
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

The `.lumina/render-manifest.json` render manifest records how every route should execute. The current compiler supports default static/API modes plus explicit `staticPage()` and `ssr()` declarations. Deployment adapters may copy that canonical compiler artifact into `dist/render.manifest.json`, but the `.lumina/` file remains the source contract for compiler, CLI, MCP, Agent Kernel, devtools, and tests.

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
13. Generate Lumina Map outputs.
14. Generate agent context capsules.
15. Emit diagnostics.

## Incremental Compilation

Planned incremental behavior:

- Cache compiler artifacts by source content hash, config hash, compiler version, and graph schema version.
- For large workspaces, also cache by package dependency hash, app boundary, generated artifact schema version, and workspace graph schema version.
- Persist build and graph cache under `.lumina/cache/`.
- Use graph edges to invalidate changed routes and dependents.
- Use workspace graph edges to invalidate affected apps, shared packages, generated artifacts, and tests.
- Avoid rebuilding unrelated routes.
- Parallelize independent route compilation where possible.
- Keep generated JSON stable so agent-facing output can be diffed.

Speed rules for compiler work are defined in `docs/speed-strategy.md` and `docs/implementation-speed-rules.md`. Large-repo compiler rules are defined in `docs/large-repo-build-architecture.md`.

## Feature Scheduling Gate

Before a feature is scheduled, it must answer:

1. Does it improve Lumina Map or the Agent Kernel?
2. Can it be implemented with minimal production runtime code?
3. Does it have clear planned acceptance criteria with tests and an agent demo?

Features that do not satisfy these questions are lower priority for the first prototype.

## Out of Scope for Initial IR

- Full TypeScript semantic analysis of every prop.
- Full React Server Components graph.
- Cross-package incremental analysis beyond the planned large-repo architecture contract.
- Persistent graph cache implementation.
- Fine-grained field-level dataflow.
