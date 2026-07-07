# Runtime Contract

Status: Planned.
Audience: framework contributors, adapter owners, AI agents.

This page describes the runtime contract. Static built-output serving through `@lumina/adapter-bun` is implemented for `dist/public` HTML; SSR, API, hot API, health endpoints, expanded cache headers, and broader runtime behavior remain planned.

The Lumina runtime must stay small, explicit, fast, and easy to inspect. Runtime speed depends on generated manifests and handlers; see `docs/speed-strategy.md`.

Adapter boundaries, deployment output, adapter manifests, health endpoints, and compatibility evidence are defined in `docs/adapter-contract.md`.

## Responsibilities

The production runtime is responsible for:

- Serving static assets.
- Serving prerendered HTML.
- Routing SSR requests.
- Routing API requests.
- Routing hot API requests.
- Applying cache headers.
- Handling redirects.
- Handling 404 and 500 responses.
- Exposing a health endpoint.
- Logging requests.

The production runtime is not responsible for:

- Discovering routes from source files.
- Building the app graph.
- Running agent planning.
- Serving devtools in production.
- Reading full source files for normal requests.
- Recomputing behavior that the compiler already emitted into manifests.

## Request Pipeline

```txt
request
  -> normalize URL
  -> static asset lookup
  -> route matcher
  -> prerendered HTML lookup
  -> hot API handler
  -> normal API handler
  -> SSR handler
  -> not found handler
  -> error handler
```

## Build Output

Planned output:

```txt
.lumina/
  routes.json
  render-manifest.json
  map.json
  graph.json
  seo.report.json
  perf.report.json
  workspace.json
  workspace-graph.json
  affected.json
  build-trace.json
  cache-report.json
  hmr-report.json
  split-report.json
  context/
    *.ctx.json
    agent-index.json
  mutations.json
  generated/
dist/
  public/
  server/
  routes.manifest.json
  render.manifest.json
  seo.report.json
  adapter.manifest.json
```

The generated artifact names are `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/graph.json`, `.lumina/seo.report.json`, `.lumina/perf.report.json`, `.lumina/workspace.json`, `.lumina/workspace-graph.json`, `.lumina/affected.json`, `.lumina/build-trace.json`, `.lumina/cache-report.json`, `.lumina/hmr-report.json`, `.lumina/split-report.json`, `.lumina/context/*.ctx.json`, `.lumina/context/agent-index.json`, `.lumina/mutations.json`, `.lumina/generated/*`, `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, and `dist/*`.

The `.lumina/*` files are the canonical compiler and agent artifacts. `.lumina/render-manifest.json` is the canonical render-mode contract for routes. The `dist/*.manifest.json` files, including `dist/render.manifest.json`, and `dist/*.report.json` deployment reports are adapter-specific output shaped for runtime loading.

Large-repo reports such as `.lumina/workspace-graph.json`, `.lumina/build-trace.json`, `.lumina/cache-report.json`, `.lumina/hmr-report.json`, and `.lumina/split-report.json` are compiler, CLI, map, and agent artifacts. Runtime adapters must not read them on the production request path.

## Adapter-Aware Entry

The compiler is planned to generate an adapter-aware server entry.

```ts
// .lumina/generated/server-entry.ts
import { createServer } from "@lumina/adapter-bun"
```

The selected adapter is controlled by `lumina.config.ts`.

```ts
export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

Adapters consume generated manifests and handlers. They do not rediscover source files.

Config loading, validation, and normalization are defined in `docs/config-contract.md`. Runtime adapters should consume normalized generated output instead of evaluating raw config in production.

Normal API handler semantics, return normalization, validation diagnostics, and generated handler registry requirements are defined in `docs/api-route-contract.md`.

Cache plans, cache headers, cache tags, revalidation, micro-cache behavior, and cache diagnostics are defined in `docs/cache-contract.md`.

Runtime diagnostics, source locations, production sanitization, and JSON diagnostic fields are defined in `docs/diagnostics-contract.md`.

Render mode literals must stay aligned with `@lumina/core` `RenderMode`: `"static"`, `"prerender"`, `"ssr"`, `"stream"`, `"client-only"`, `"api"`, and `"hot-api"`. The current compiler records default static/API modes and explicit `staticPage()` / `ssr()` declarations in `.lumina/render-manifest.json`; production SSR serving remains planned. Client-only routes must be intentional and visible in generated manifests so runtime behavior does not silently hide SEO, hydration, or payload costs.

## Server Inputs

The server should load:

- Route manifest.
- Render manifest.
- Server entry.
- API handler registry.
- Static asset manifest.
- Cache metadata from render, performance, map, or future cache report artifacts.
- Adapter manifest.

## Adapter Manifest

Example:

```json
{
  "schemaVersion": "lumina.adapter.v0",
  "adapter": "bun",
  "package": "@lumina/adapter-bun",
  "runtime": {
    "name": "bun"
  },
  "capabilities": {
    "static": true,
    "ssr": true,
    "api": true,
    "hotApi": true,
    "streaming": false
  },
  "unsupported": []
}
```

## Error Behavior

Development:

- Return useful stack traces.
- Link to route and source file.
- Include diagnostic codes when possible.

Production:

- Hide internal stack traces.
- Return stable 500 response.
- Log error details.
- Preserve status codes.

## Cache Headers

Static assets:

- Hashed assets should be immutable.
- HTML should use route-specific cache rules.

Prerendered routes:

- Cache headers derive from render mode and revalidation metadata.

SSR routes:

- Default to no-store unless route config opts into caching.

API routes:

- Default to no-store unless route config opts into caching.

Hot API routes:

- May use micro-cache when explicitly configured.

Cache header behavior must follow `docs/cache-contract.md`.

## Health Endpoint

The server should expose a lightweight health endpoint when enabled.

Planned path:

```txt
/_lumina/health
```

Production exposure must be configurable.
