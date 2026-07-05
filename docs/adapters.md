# Adapter Architecture

NeedleStart defaults to Bun, but the framework must not create an all-in Bun adoption risk.

Adapter support begins early so Bun is the fast default and Node/static output are credible deployment paths.

## Goals

- Keep user application code runtime-portable.
- Isolate Bun-specific APIs inside adapter packages.
- Generate adapter-aware server entries.
- Document adapter capabilities in build output.
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
- Document unsupported runtime features in `adapter.manifest.json`.

## Config

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

`runtime` describes the default local execution target. `adapter` controls production build output.

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
    "streaming": false
  }
}
```

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

> Default experience is Bun for maximum speed. Everything also works on Node through the adapter layer.

Performance claims must be backed by reproducible benchmarks.

## Failure Modes

- User app imports Bun-only APIs directly.
- Adapter-specific code leaks into `@needle/core`.
- Node adapter lags far enough to become theoretical.
- Benchmarks only cover unrealistic toy routes.
- Adapter manifests do not clearly document unsupported features.
