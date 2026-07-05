# Architecture

NeedleStart is built around a simple split:

- Bun handles runtime execution.
- Vite/Rolldown handles frontend build mechanics.
- The Needle compiler handles framework intelligence.
- The Needle server handles production request routing.
- The Agent Kernel and Needle Map expose structure to humans and agents.

## Strategic Technology Decision

Recommended stack:

- Bun: runtime, package manager, test runner, and production server path.
- Vite and Rolldown: frontend build, React transforms, HMR, assets, and plugin ecosystem.
- Custom Needle compiler: route graph, render modes, SEO generation, Needle Map, codegen, and manifests.
- Needle server: thin adapter integration layer around generated server artifacts.

This split lets NeedleStart move quickly without reinventing a bundler while putting framework intelligence where it belongs: at build time.

## System Layers

### Layer 1: Developer Framework

Responsible for file-based routes, layouts, React rendering, metadata, API routes, CLI commands, and developer-facing config.

### Layer 2: Compiler

Responsible for app discovery, route graph, render modes, server/client boundaries, SEO manifests, API code generation, hot API handlers, Needle Map generation, agent context generation, and deployment manifests.

### Layer 3: Runtime

Responsible for static file serving, prerendered HTML serving, SSR requests, streaming SSR requests, API handlers, hot API handlers, cache headers, redirects, 404 and 500 responses, health endpoint, and request logging.

### Layer 4: Agent Kernel

Responsible for AGENTS.md generation, llms.txt and llms-full.txt generation, route context capsules, safe edit plans, safe edit transactions, mutation logs, agent-facing diagnostics, and MCP server integration.

### Layer 5: Needle Map

Responsible for file graph, semantic graph, route impact, affected checks, ownership, cache tag visibility, SEO impact, risk scoring, and human or agent queries.

## Technology Decisions

### Runtime

Bun is the default runtime because it provides a high-performance HTTP server, package manager, test runner, and native TypeScript-friendly workflow. The Bun server package owns production request handling.

### Frontend Build

Vite/Rolldown is the initial frontend build foundation. It provides HMR, React transforms, CSS handling, asset handling, and plugin compatibility. NeedleStart should not begin with a custom bundler.

### Compiler

The custom Needle compiler owns framework-specific intelligence that Vite does not understand:

- Route modes.
- SEO metadata.
- Agent context.
- Semantic app graph.
- Cache plans.
- API validators and serializers.
- Deployment manifests.

### Server

The production server should be generated and small. It should load the build manifest, route requests, serve static assets, call SSR handlers, call API handlers, and expose predictable error behavior.

## Request Flow

```txt
Bun.serve
  -> generated route matcher
  -> static asset handler
  -> prerendered HTML handler
  -> SSR renderer
  -> API handler
  -> hot API handler
  -> error handler
```

## Build Flow

```txt
source app
  -> config load
  -> route discovery
  -> layout discovery
  -> render mode extraction
  -> metadata extraction
  -> schema extraction
  -> route manifest
  -> render manifest
  -> SEO manifest
  -> Needle Map
  -> agent context capsules
  -> Vite build
  -> server bundle
  -> adapter output
```

## Core Internal Model

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

## Monorepo Structure

Target structure:

```txt
needlestart/
  packages/
    create-needle/
    cli/
    core/
    compiler/
    vite-plugin/
    react/
    server-bun/
    router/
    seo/
    map/
    agent/
    mcp/
    cache/
    schema/
    devtools/
    adapters/
  examples/
  tests/
  docs/
```

See `docs/roadmap.md` for the build order.

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

## Route Modes

Planned route modes:

- `staticPage()`: compile to static HTML.
- `prerender()`: build static HTML with revalidation metadata.
- `ssr()`: render on request.
- `stream()`: render with React streaming.
- `clientOnly()`: intentionally skip server-rendered content.
- `apiHot()`: generate specialized API handler path.

## Runtime Rule

If a behavior can be computed at build time, it should not be recomputed on every request.

## Production Rule

Production server bundles must not include agent context capsules, MCP server implementation unless explicitly running in dev mode, mutation logs, devtools UI, llms-full.txt, or test fixtures.

## Caching Rule

No invisible caching.

Every cacheable route, function, component, or API response must expose its cache plan in a manifest. Cache tags must be queryable by Needle Map and agent diagnostics.
