# Adapter Contract

Status: Planned.

Audience: adapter maintainers, runtime contributors, deployers, AI agents.

This page defines the planned adapter and deployment-output contract for NeedleStart. Adapter behavior is not implemented yet. The contract exists so Bun, Node, static export, runtime manifests, deployment docs, compatibility claims, cache behavior, health checks, and tests all use the same expectations.

## Goals

- Keep Bun the fast default without locking user application code to Bun-only APIs.
- Make Node and static output credible early.
- Treat adapter output as a generated contract, not platform-specific magic.
- Document every supported and unsupported adapter capability in build output.
- Prevent deployment claims before fixture or integration evidence exists.
- Keep deployment docs honest about runtime, commands, environment variables, generated files, cache behavior, and health checks.

## Research Notes

This contract follows current patterns from framework and platform docs:

- Bun serves HTTP with `Bun.serve`, supports route handlers, static file responses, host/port configuration, lifecycle methods, metrics, and runtime-specific server options.
- Node's `node:http` module is stable and supports streaming without buffering entire requests or responses.
- SvelteKit treats adapters as small plugins that take a built app and generate deployment output for a target platform.
- Astro chooses adapters by deployment environment and documents that different adapters can require different configuration.
- Vercel Build Output API uses generated file-system output and config to describe routes, headers, functions, and routing behavior.
- Vercel project configuration separates build commands, output directories, redirects, headers, functions, runtime versions, and regions.
- SvelteKit adapter-auto detects known deployment environments, but NeedleStart should start with explicit adapters before auto-detection.

Source links:

- [Bun HTTP server](https://bun.com/docs/runtime/http/server)
- [Node.js HTTP](https://nodejs.org/api/http.html)
- [SvelteKit adapters](https://svelte.dev/docs/kit/adapters)
- [SvelteKit adapter-auto](https://svelte.dev/docs/kit/adapter-auto)
- [Astro on-demand rendering adapters](https://docs.astro.build/en/guides/on-demand-rendering/)
- [Vercel Build Output API configuration](https://vercel.com/docs/build-output-api/configuration)
- [Vercel project configuration](https://vercel.com/docs/project-configuration)

## Initial Adapter Set

| Adapter | Package | Status | Purpose |
| --- | --- | --- | --- |
| Bun | `@needle/adapter-bun` | Planned | Default production server using Bun runtime APIs. |
| Node | `@needle/adapter-node` | Planned | Compatibility server using Node HTTP APIs. |
| Static | `@needle/adapter-static` | Planned | Static export for fully static apps. |

Edge, worker, Vercel, Cloudflare, Netlify, Docker, and other deployment-specific adapters are out of scope until the first three paths have evidence.

## Adapter Inputs

Adapters consume generated build artifacts. They do not rediscover source files.

Required planned inputs:

```txt
.needle/
  routes.json
  render-manifest.json
  graph.json
  seo.report.json
  generated/
dist/
  public/
  server/
  adapter.manifest.json
```

Adapter output files are deployment-oriented copies or adapter-owned metadata. Canonical compiler and agent artifacts remain under `.needle/`.

Adapter inputs must include:

- normalized config,
- route manifest,
- render manifest,
- server entry,
- handler registry,
- static asset manifest,
- cache plan data,
- SEO output paths,
- diagnostics.

## Adapter Output

Planned output:

```txt
dist/
  public/
  server/
  adapter.manifest.json
  routes.manifest.json
  render.manifest.json
  seo.report.json
```

`@needle/adapter-static` may omit `server/` only when all routes are exportable and static output is complete.

## Adapter Manifest

Planned `dist/adapter.manifest.json`:

```json
{
  "schemaVersion": "needle.adapter.v0",
  "adapter": "bun",
  "package": "@needle/adapter-bun",
  "runtime": {
    "name": "bun",
    "versionRange": ">=1.2.3"
  },
  "entry": "dist/server/index.js",
  "publicDir": "dist/public",
  "capabilities": {
    "staticAssets": true,
    "prerenderedHtml": true,
    "ssr": true,
    "streaming": false,
    "api": true,
    "hotApi": true,
    "nativeRouteDispatch": {
      "enabled": false,
      "source": "generated-route-table",
      "modes": []
    },
    "compression": {
      "staticPrecompressed": true,
      "dynamicText": true,
      "encodings": ["br", "gzip"]
    },
    "resourceHints": {
      "htmlLinks": true,
      "earlyHints103": false
    },
    "bfcacheAwareHeaders": true,
    "webSocket": false,
    "healthEndpoint": true,
    "incrementalRevalidation": false,
    "staticExport": false
  },
  "unsupported": [
    {
      "feature": "webSocket",
      "reason": "Not part of the first prototype"
    }
  ],
  "environment": {
    "port": "PORT",
    "host": "HOST",
    "nodeEnv": "NODE_ENV"
  },
  "diagnostics": []
}
```

Rules:

- `schemaVersion` is required.
- `adapter`, `package`, and `runtime.name` are required.
- Capability fields are explicit booleans or small typed capability objects.
- `compression` must list supported encodings and distinguish precompressed static assets from dynamic text responses.
- `resourceHints.earlyHints103` must be true only when the adapter can send HTTP 103 Early Hints correctly for route-known critical assets.
- `bfcacheAwareHeaders` means the adapter avoids framework-owned headers or lifecycle defaults known to block browser back/forward cache eligibility.
- `nativeRouteDispatch` records whether an adapter lowers generated route-table entries into native runtime routing such as `Bun.serve({ routes })`.
- Unsupported features include a reason and optional remediation.
- Paths are relative and normalized.
- Diagnostics follow [Diagnostics Contract](diagnostics-contract.md).

## Bun Adapter

Planned responsibilities:

- Use `Bun.serve`.
- Read `PORT` and `HOST` or normalized config equivalents.
- Serve immutable static assets and route-specific HTML/cache headers.
- Invoke generated SSR, API, and hot API handlers.
- Preserve Web `Request` and `Response` semantics at the adapter boundary where practical.
- Expose health endpoint behavior only when configured.
- Avoid requiring user application code to import `Bun`.
- Keep the generated route table as the canonical route source.
- Lower compatible static, API, and parameter routes into native `Bun.serve({ routes })` only when parity fixtures and timing evidence show the native path is faster.

Planned Bun-specific behavior:

- Bun-only APIs stay inside `@needle/adapter-bun`.
- Bun server options must be documented when surfaced.
- HTTP/3, WebSockets, Unix sockets, and advanced Bun server metrics are out of scope until explicitly added to capabilities.
- If native route dispatch is disabled or unsupported for a route mode, the adapter must fall back to the generated matcher without changing observable route behavior.

## Node Adapter

Planned responsibilities:

- Use `node:http` or a small compatible server layer.
- Convert Node requests to the internal request contract.
- Convert Web-style responses back to Node responses.
- Preserve streaming where the runtime contract supports it.
- Run the same route matcher and handler registry as the Bun adapter.
- Avoid Bun-only APIs in generated code shared with Node.

Node compatibility cannot be called supported until fixture tests prove:

- static assets,
- SSR,
- API routes,
- hot API fallback or explicit unsupported behavior,
- cache headers,
- production error sanitization,
- health endpoint behavior.

## Static Adapter

Planned responsibilities:

- Export static and prerendered routes.
- Copy static assets.
- Emit `sitemap.xml`, `sitemap-index.xml`, and `robots.txt` when configured.
- Fail clearly when non-exportable routes exist.
- Produce an adapter manifest that explains unsupported runtime features.

Static export must fail or warn when it sees:

- SSR routes,
- API routes,
- hot API routes,
- request-time metadata,
- runtime-only cache behavior,
- auth-sensitive pages,
- dynamic routes without an enumerated path source.

## Environment Variables

Environment behavior is shared with [Configuration Contract](config-contract.md).

Planned runtime variables:

| Variable | Purpose | Default |
| --- | --- | --- |
| `PORT` | Server port for Bun/Node adapters. | Adapter-defined, documented in manifest. |
| `HOST` | Server host for Bun/Node adapters. | Adapter-defined, usually `0.0.0.0`. |
| `NODE_ENV` | Runtime mode. | Set by deployment environment. |
| `NEEDLE_HEALTH_PATH` | Optional health endpoint override. | `/_needle/health` when enabled. |

Rules:

- Secrets must not appear in adapter manifests.
- Adapter manifests may name variable keys but not values.
- Generated output must not depend on undeclared runtime variables.

## Health Endpoint

Planned default path:

```txt
/_needle/health
```

Rules:

- Disabled by default for static export.
- Configurable for Bun and Node adapters.
- Returns minimal JSON.
- Does not expose app graph, env values, package versions, secrets, or source paths.
- Can include adapter name and health status if configured.

## Cache And Headers

Adapters apply cache headers generated by [Cache Contract](cache-contract.md).

Rules:

- Adapters must not invent cache behavior.
- Manual platform headers must not conflict with cache plans.
- Static asset headers, HTML headers, API headers, and error headers require tests.
- Adapter manifests should identify whether a platform can express generated headers directly.

## Performance Delivery Capabilities

Adapters own HTTP delivery behavior that cannot be represented by React or Vite alone. The compiler may generate route-critical asset metadata, but the adapter decides whether the selected runtime can deliver those hints and encodings correctly.

Rules:

- Static text assets may be served from precompressed Brotli or gzip files when the request `Accept-Encoding` allows it.
- Dynamic HTML, JSON, CSS, JavaScript, XML, SVG, and text responses may be compressed only when the adapter supports safe response compression and sets `Content-Encoding` accurately.
- Already-compressed media such as AVIF, WebP, PNG, JPEG, MP4, archives, and most binary files must not be recompressed by default.
- 103 Early Hints may be emitted only for route-known critical assets already present in the generated performance or asset metadata.
- Final `Link` headers and 103 Early Hints must be snapshot-tested together so the adapter does not hint assets that the final response never uses.
- Resource hints generated into HTML must use the same route asset evidence as Early Hints.
- Adapter-level bfcache behavior must avoid framework-owned `unload` patterns and unexpected cache-control headers on navigable pages.
- Delivery capability claims must be downgraded or marked unsupported when the target platform cannot express the required headers.

## Deployment Docs

Every adapter deployment page must include:

- status,
- runtime required,
- install/build/start commands,
- generated output,
- environment variables,
- health endpoint behavior,
- cache behavior,
- unsupported features,
- compatibility evidence,
- testing evidence,
- security notes.

## Diagnostics

Planned diagnostics:

| Code | Level | Meaning |
| --- | --- | --- |
| `ADAPTER_UNSUPPORTED_ROUTE` | `error` | Adapter cannot serve a route mode in the current build. |
| `ADAPTER_STATIC_DYNAMIC_ROUTE` | `error` | Static export found a dynamic route without enumerated paths. |
| `ADAPTER_RUNTIME_MISMATCH` | `error` | Selected adapter and runtime are incompatible. |
| `ADAPTER_ENV_MISSING` | `error` | Required runtime environment variable is missing. |
| `ADAPTER_HEADER_CONFLICT` | `error` | Platform/header config conflicts with generated cache or security headers. |
| `ADAPTER_CAPABILITY_UNTESTED` | `warning` | Capability is documented but lacks required evidence. |
| `ADAPTER_COMPRESSION_UNSUPPORTED` | `warning` | Config or generated output expects compression the selected adapter cannot provide. |
| `ADAPTER_EARLY_HINTS_UNSUPPORTED` | `warning` | Route-critical 103 Early Hints are configured but unsupported by the selected adapter. |
| `ADAPTER_RESOURCE_HINT_MISMATCH` | `warning` | Adapter hints do not match generated route asset metadata. |
| `ADAPTER_NATIVE_ROUTE_DISPATCH_UNPROVEN` | `warning` | Adapter-native route dispatch is enabled without parity or timing evidence. |
| `ADAPTER_MANIFEST_INVALID` | `error` | Adapter manifest is missing required fields or has invalid values. |

## Fixture Requirements

Future implementation must include fixtures for:

- Bun static asset serving,
- Bun SSR route,
- Bun API route,
- Bun hot API route,
- Bun native route dispatch parity and fallback behavior,
- Node static asset serving,
- Node SSR route,
- Node API route,
- static export success,
- static export failure on SSR,
- static export failure on API route,
- dynamic route export with enumerated paths,
- cache headers across adapters,
- compression negotiation and `Content-Encoding` headers,
- 103 Early Hints support or unsupported diagnostics,
- final `Link` headers matching route asset metadata,
- bfcache-safe navigable page headers,
- health endpoint enabled and disabled,
- production error sanitization,
- adapter manifest snapshots,
- unsupported capability diagnostics.

## Compatibility Evidence

Do not mark an adapter supported until:

- integration tests pass,
- HTTP tests prove core behavior,
- manifest snapshots are stable,
- compatibility table is updated,
- deployment docs name unsupported features,
- CI or local evidence is reported.

## Out Of Scope For First Adapter Work

- Auto-detected deployment adapters.
- Edge runtime support.
- WebSocket support.
- Platform-specific Vercel, Cloudflare, Netlify, or Docker adapters.
- Serverless function splitting.
- Region or placement controls.
- Build Output API generation for hosted platforms.

## Related Docs

- [Adapter Architecture](adapters.md)
- [Deployment](deployment.md)
- [Runtime Contract](runtime-contract.md)
- [Configuration Contract](config-contract.md)
- [Cache Contract](cache-contract.md)
- [Diagnostics Contract](diagnostics-contract.md)
- [Testing Contract](testing-contract.md)
- [Compatibility](compatibility.md)
- [Public Adapter Reference](public/reference/adapters.md)
