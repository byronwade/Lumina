# Deployment Guide

NeedleStart deployment is planned. This document defines the target build output, adapter behavior, production runtime expectations, health endpoint policy, static export behavior, Node compatibility, Bun default path, public open source hosting intent, and deployment checks.

NeedleStart defaults to Bun for speed, but the framework must not make Bun a hard adoption blocker. User application code should stay runtime-portable, while adapter packages isolate runtime-specific behavior.

## Goals

- Make Bun the fastest default path.
- Provide credible Node and static adapter paths early.
- Keep production runtime output small and predictable.
- Keep adapter capabilities machine-readable.
- Avoid shipping agent-only metadata in production bundles.
- Make unsupported deployment targets fail clearly.
- Support public open source docs, demos, and benchmark report hosting.
- Back performance claims with reproducible benchmarks.

## Deployment Model

Build command:

```bash
needle build
```

Run command:

```bash
needle start
```

Generated app scripts should also support:

```bash
bun run build
bun run start
```

Where scripts call:

```json
{
  "scripts": {
    "build": "needle build",
    "start": "needle start"
  }
}
```

## Build Output

Planned production output:

```txt
dist/
  public/
    index.html
    sitemap.xml
    robots.txt
    assets/
  server/
    entry.js
    handlers/
  needle.manifest.json
  routes.manifest.json
  render.manifest.json
  seo.report.json
  cache.manifest.json
  adapter.manifest.json
  perf.report.json
```

Development/build workspace output may also include:

```txt
.needle/
  generated/
  context/
  graph.json
  map.json
  mutations.json
```

Production runtime bundles must not include agent context capsules, MCP server implementation, mutation logs, devtools UI, `llms-full.txt`, or test fixtures.

## Adapter Config

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

`runtime` describes the default local execution target.

`adapter` controls production build output.

## Initial Adapters

| Adapter | Package | Purpose |
| --- | --- | --- |
| `bun` | `@needle/adapter-bun` | Default production adapter using Bun runtime APIs internally. |
| `node` | `@needle/adapter-node` | Compatibility adapter for Node deployment. |
| `static` | `@needle/adapter-static` | Static export for fully static route sets. |

The older planning name `@needle/server-bun` should be treated as runtime implementation detail or superseded by `@needle/adapter-bun` unless the package map explicitly reintroduces a shared server core.

## Bun Adapter

Target behavior:

- Use `Bun.serve` internally.
- Load generated manifests and handlers.
- Serve static assets.
- Serve prerendered HTML.
- Invoke SSR handlers.
- Invoke API handlers.
- Invoke hot API handlers.
- Apply cache headers.
- Expose health endpoint when enabled.

The Bun adapter must not rediscover source routes at runtime.

## Node Adapter

Target behavior:

- Use Node HTTP or a small compatible server.
- Load the same generated route matcher and handler contracts.
- Serve built static routes.
- Serve a minimal SSR route.
- Serve API routes once supported by the adapter.
- Document unsupported features in `adapter.manifest.json`.

Rules:

- User application code must not require Bun-only APIs.
- Node compatibility must be real enough to reduce adoption friction, not a brochure ghost.
- Benchmarks must distinguish Bun performance from Node compatibility.

## Static Adapter

Target behavior:

- Export fully static routes.
- Emit sitemap and robots outputs.
- Copy static assets.
- Fail clearly when non-static routes cannot be exported.
- Document unsupported runtime features in `adapter.manifest.json`.

Static adapter should reject:

- SSR routes.
- API routes.
- Hot API routes.
- Routes requiring runtime revalidation, unless a later static-compatible policy exists.
- Health endpoint runtime behavior.

## Adapter Manifest

`adapter.manifest.json` should make deployment capabilities explicit.

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

Rules:

- Unsupported features must include reason and affected routes when possible.
- Adapter manifest is required for production builds.
- Agents and CI should use this manifest to explain deployment limitations.

## Health Endpoint

Planned default path:

```txt
/_needle/health
```

Config:

```ts
export default defineConfig({
  server: {
    health: {
      enabled: true,
      path: "/_needle/health",
      exposeInProduction: false,
    },
  },
})
```

Rules:

- Health endpoint exposure in production must be configurable.
- Health endpoint must not collide with user routes.
- Health endpoint should return lightweight status only.
- Health endpoint must not expose secrets, environment values, route maps, or build internals.

## Environment Variables

Deployment may require environment variables for app code, but NeedleStart generated artifacts must not expose secret values.

Rules:

- Manifest output may list required env var names and whether they are present.
- Manifest output must not include raw secret values.
- Request logging must redact authorization headers and cookies.
- Public environment variables require explicit policy.

## Cache Headers

Runtime adapters are responsible for applying cache headers from generated cache and render manifests.

Defaults:

| Surface | Header intent |
| --- | --- |
| Hashed assets | Immutable public cache. |
| HTML | Route-specific policy. |
| SSR | `no-store` unless route opts in. |
| API | `no-store` unless route opts in. |
| Hot API | Explicit micro-cache or `no-store`. |
| Health | `no-store`. |

No adapter should invent cache behavior that is not visible in manifests.

## Error Behavior

Development:

- Useful stack traces.
- Source file and route references when available.
- Diagnostic codes.

Production:

- Stable error response.
- Hidden internal stack traces.
- Error details logged according to adapter policy.
- Explicit status codes preserved.
- Secrets redacted.

## Static Assets

Rules:

- Hashed assets should be immutable.
- Asset manifest should map original and emitted names when needed.
- HTML should not receive immutable asset headers.
- Static asset serving should avoid filesystem traversal outside output directory.

## Deployment Checks

Before considering deployment successful, verify:

```bash
needle build
needle start
needle routes --json
needle seo --json
needle map --json
```

For the first credible prototype, also verify:

- `/` returns HTML.
- An SSR route returns HTML.
- `/sitemap.xml` returns XML.
- `/robots.txt` returns text.
- `/api/health` or configured health path behaves as expected.
- A normal API route works.
- A hot API route works.
- Cache headers match manifests.
- Production bundle excludes agent metadata.

## Open Source Project Infrastructure

NeedleStart intends to host public open source project infrastructure on Vercel where appropriate:

- public documentation website
- pull request preview deployments for docs and examples
- public demo apps
- benchmark report pages
- launch and comparison pages

This is an open source collaboration plan, not a deployment lock-in strategy. NeedleStart should remain adapter-aware and should support non-Vercel deployment targets.

Credits or hosted resources from an open source program must be used only for open source project work. See `docs/open-source-community.md`.

## Docker Direction

Docker is a later adapter/deployment target.

Initial Docker guidance can be simple once the Bun adapter exists:

```Dockerfile
# Draft only. Do not publish as verified until tested.
FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build
CMD ["bun", "run", "start"]
```

Do not publish Docker guidance as verified until it has been tested against a generated app.

## Cloud Deployment Direction

Later deployment adapters may include:

- Docker.
- Cloudflare.
- Vercel.
- Other serverless or edge providers.

Rules:

- Cloud adapters must document unsupported features.
- Vercel hosting for project docs and demos must not imply Vercel-only application deployment.
- Edge runtime is not a day-one requirement.
- RSC and partial prerendering should not drive early deployment architecture.

## Benchmarks

Performance claims must be backed by reproducible benchmarks.

Compare identical apps across:

- Bun adapter.
- Node adapter.
- Static adapter where applicable.
- Comparable Next.js Node path for API and rendering paths.

Measure:

- Cold start.
- Requests per second.
- Memory.
- Bundle size.
- Static serving latency.
- SSR latency.
- Hot API latency.

Benchmark results should include environment details and commit SHA.

## Deployment Diagnostics

| Code | Meaning |
| --- | --- |
| `NS_DEPLOY_ADAPTER_UNKNOWN` | Selected adapter is unknown. |
| `NS_DEPLOY_ADAPTER_UNSUPPORTED` | Adapter cannot support requested route output. |
| `NS_DEPLOY_STATIC_UNSUPPORTED_ROUTE` | Static adapter encountered a dynamic route. |
| `NS_DEPLOY_MISSING_MANIFEST` | Required manifest is missing from build output. |
| `NS_DEPLOY_AGENT_METADATA_INCLUDED` | Production bundle includes forbidden agent metadata. |
| `NS_DEPLOY_HEALTH_COLLISION` | Health endpoint collides with app route. |
| `NS_DEPLOY_HEALTH_EXPOSED` | Health endpoint exposed in production without explicit config. |
| `NS_DEPLOY_CACHE_HEADER_CONFLICT` | Runtime cache headers conflict with manifest. |
| `NS_DEPLOY_SECRET_EXPOSED` | Deployment output includes a secret-like value. |

## Testing Requirements

Deployment tests should cover:

- Bun adapter serves static route.
- Bun adapter serves SSR route.
- Bun adapter serves API route.
- Bun adapter serves hot API route.
- Node adapter serves built static route.
- Node adapter serves minimal SSR route.
- Static adapter exports static routes.
- Static adapter rejects unsupported runtime routes.
- Adapter manifest includes capabilities.
- Production output excludes agent metadata.
- Health endpoint config and collision behavior.
- Cache headers match manifest.
- Production error hides stack trace.
- Public docs/demo preview deployment configuration once website work begins.

## Out of Scope Initially

- Full deployment adapter matrix.
- Edge runtime.
- Production-grade devtools deployment.
- Hosted Needle Map.
- Built-in auth/session deployment templates.
- Automatic CDN purge integration.
