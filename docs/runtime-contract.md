# Runtime Contract

The Needle runtime and adapters must stay small, explicit, and easy to inspect.

The compiler owns discovery and framework intelligence. Runtime adapters consume generated artifacts.

## Responsibilities

Production runtime adapters are responsible for:

- Serving static assets.
- Serving prerendered HTML.
- Routing SSR requests.
- Routing API requests.
- Routing hot API requests.
- Applying cache headers.
- Handling redirects.
- Handling 404 and 500 responses.
- Exposing a health endpoint when enabled.
- Logging requests with sensitive data redacted.

Production runtime adapters are not responsible for:

- Discovering routes from source files.
- Building the app graph.
- Running agent planning.
- Serving devtools in production.
- Reading full source files for normal requests.
- Loading agent context capsules in production bundles.

## Request Pipeline

```txt
request
  -> normalize URL
  -> static asset lookup
  -> generated route matcher
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

Production output must not include agent-only context files, MCP implementation, mutation logs, devtools UI, `llms-full.txt`, or test fixtures.

## Adapter-Aware Entry

The compiler generates an adapter-aware server entry.

```ts
// .needle/generated/server-entry.ts
import { createServer } from "@needle/adapter-bun"
```

The selected adapter is controlled by `needle.config.ts`.

```ts
export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

Adapters consume generated manifests and handlers. They do not rediscover source files.

## Server Inputs

The server should load:

- Root build manifest.
- Route manifest.
- Render manifest.
- Server entry.
- API handler registry.
- Static asset manifest.
- Cache manifest.
- Adapter manifest.

The runtime may read SEO output only when needed for serving public generated files such as sitemap or robots output. It should not need to run SEO analysis at request time.

## Adapter Manifest

Example:

```json
{
  "schemaVersion": "1.0.0",
  "adapter": "bun",
  "runtime": "bun",
  "capabilities": {
    "static": true,
    "ssr": true,
    "api": true,
    "hotApi": true,
    "streaming": false,
    "healthEndpoint": true
  },
  "unsupported": [],
  "diagnostics": []
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
- Log error details according to adapter logging policy.
- Preserve explicit status codes.
- Redact secrets from logs and responses.

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
- Internal micro-cache does not automatically imply public HTTP cache.

Health endpoint:

- Use no-store.

No adapter should invent cache behavior that is not visible in `cache.manifest.json`.

## Health Endpoint

The server should expose a lightweight health endpoint when enabled.

Planned path:

```txt
/_needle/health
```

Production exposure must be configurable.

Rules:

- Health endpoint must not collide with user routes.
- Health endpoint must not expose secrets, route maps, env values, or build internals.
- Health endpoint behavior must be represented in adapter capabilities when relevant.

## Security Rules

- Request logs must redact authorization headers and cookies.
- Runtime adapters must reject path traversal outside build output.
- Production errors must not expose internal stack traces.
- Agent metadata must not ship in production runtime bundles.
- Runtime adapters must not expose MCP tools unless explicitly running a development server feature.

## Testing Requirements

Runtime adapter tests should cover:

- Static page serving.
- Prerendered HTML serving.
- SSR route serving.
- API route serving.
- Hot API route serving.
- 404 and 500 behavior.
- Cache headers.
- Health endpoint config.
- Production stack trace hiding.
- Request log redaction.
- Production bundle exclusion of agent-only metadata.
