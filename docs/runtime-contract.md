# Runtime Contract

The Needle runtime must stay small, explicit, and easy to inspect.

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
dist/
  public/
  server/
  needle.manifest.json
  routes.manifest.json
  render.manifest.json
  map.manifest.json
  seo.report.json
  adapter.manifest.json
```

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

- Route manifest.
- Render manifest.
- Server entry.
- API handler registry.
- Static asset manifest.
- Cache manifest.
- Adapter manifest.

## Adapter Manifest

Example:

```json
{
  "adapter": "bun",
  "runtime": "bun",
  "capabilities": {
    "static": true,
    "ssr": true,
    "api": true,
    "hotApi": true,
    "streaming": false
  }
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

## Health Endpoint

The server should expose a lightweight health endpoint when enabled.

Planned path:

```txt
/_needle/health
```

Production exposure must be configurable.
