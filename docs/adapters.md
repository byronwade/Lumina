# Adapter Architecture

Status: Planned.
Audience: app developers, framework contributors, deployment owners.

NeedleStart defaults to Bun, but the framework must not create an all-in Bun adoption risk.

Adapter support begins early so Bun is the fast default and Node/static output are credible deployment paths.

The planned adapter input/output contract, manifest shape, capability rules, environment variables, health endpoint behavior, diagnostics, fixture requirements, and compatibility evidence are defined in [Adapter Contract](adapter-contract.md).

## Goals

- Keep user application code runtime-portable.
- Isolate Bun-specific APIs inside adapter packages.
- Generate adapter-aware server entries.
- Document adapter capabilities in build output.
- Keep compression, 103 Early Hints, final `Link` headers, and bfcache-aware delivery adapter-owned and evidence-backed.
- Keep generated route tables canonical, while allowing adapter-native route dispatch only after parity and timing evidence.
- Benchmark Bun, Node, static, and comparable framework paths publicly.

## Initial Adapters

```txt
@needle/adapter-bun
@needle/adapter-node
@needle/adapter-static
```

### `@needle/adapter-bun`

Default adapter.

Responsibilities:

- Use `Bun.serve`.
- Use generated route matcher.
- Optionally lower compatible generated routes into native `Bun.serve({ routes })` when evidence proves it is faster.
- Serve static assets.
- Serve prerendered HTML.
- Invoke SSR handlers.
- Invoke API and hot API handlers.

### `@needle/adapter-node`

Compatibility adapter.

Responsibilities:

- Use Node `http` or a small compatible server.
- Provide compatibility shims where needed.
- Run the same generated route matcher and handler contracts.
- Avoid requiring Bun-only APIs in user code.

### `@needle/adapter-static`

Static export adapter.

Responsibilities:

- Export static routes.
- Emit sitemap and robots outputs.
- Fail clearly when non-static routes cannot be exported.
- Document unsupported runtime features in `dist/adapter.manifest.json`.

## Config

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

`runtime` describes the default local execution target. `adapter` controls production build output.

Config loading and validation rules are documented in `docs/config-contract.md`. Adapter packages should consume normalized generated output and should not require user application code to import Bun-only APIs.

## Generated Server Entry

```ts
// .needle/generated/server-entry.ts
import { createServer } from "@needle/adapter-bun"

export default createServer({
  manifest,
  routes,
  handlers,
})
```

The compiler chooses the adapter import during build. Runtime packages consume generated artifacts; they do not rediscover app source structure.

## Adapter Manifest

```json
{
  "adapter": "bun",
  "runtime": "bun",
  "capabilities": {
    "static": true,
    "ssr": true,
    "api": true,
    "hotApi": true,
    "streaming": false,
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
    "bfcacheAwareHeaders": true
  }
}
```

Detailed manifest fields and capability semantics are defined in [Adapter Contract](adapter-contract.md).

## Benchmark Requirements

Benchmark identical apps across:

- Bun adapter.
- Node adapter.
- Static adapter where applicable.
- Next.js Node path for comparable API and rendering paths.

Measure:

- Cold start.
- Requests per second.
- Memory.
- Bundle size.
- Static serving latency.
- SSR latency.
- Hot API latency.

## Documentation Promise

Use this public message:

> Default experience is Bun for maximum speed, with Node and static adapter paths designed early enough to avoid Bun lock-in.

Performance claims must be backed by reproducible benchmarks.

## Failure Modes

- User app imports Bun-only APIs directly.
- Adapter-specific code leaks into `@needle/core`.
- Node adapter lags far enough to become theoretical.
- Benchmarks only cover unrealistic toy routes.
- Adapter manifests do not clearly document unsupported features.
