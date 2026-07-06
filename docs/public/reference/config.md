# Configuration Reference

Status: Planned.

Audience: app developers, adapter maintainers.

NeedleStart configuration is planned to live in `needle.config.ts`.

## Planned Minimal Config

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

This API is planned and not implemented.

`runtime` is the planned local execution and server-code compatibility target. `adapter` is the planned production output selector: `bun` maps to `@needle/adapter-bun`, `node` maps to `@needle/adapter-node`, and `static` maps to `@needle/adapter-static`. Build output should record the resolved adapter runtime in `dist/adapter.manifest.json` as `runtime.name`.

## Environment Rules

Environment behavior is planned, not implemented. Server-only environment variables must not be exposed to browser bundles by default. Client-exposed values require an explicit public prefix or allow-list. `.env*` loading must be deterministic, diagnostics must not print secret values, and generated artifacts must not serialize secrets.

The planned public prefix is `NEEDLE_PUBLIC_`, but the final prefix must be confirmed before client environment support ships.

## Generated Output Impact

Config fields that affect routes, rendering, SEO, performance, agent context, or adapter behavior must be reflected in generated artifacts such as `.needle/routes.json`, `.needle/render-manifest.json`, `.needle/map.json`, `.needle/graph.json`, `.needle/seo.report.json`, `.needle/perf.report.json`, `.needle/context/*.ctx.json`, `.needle/context/agent-index.json`, `.needle/mutations.json`, `.needle/generated/*`, `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, and `dist/*`.

Runtime adapters should consume normalized generated output instead of rediscovering raw source config in production.

## Planned Normalized Config

When config is serialized for tools or generated artifacts, the planned normalized shape should include:

- `schemaVersion`
- `root`
- `runtime`
- `adapter`
- `outDir`
- `needleDir`
- `mode`

Normalized config output should use relative paths when possible, avoid absolute local paths in public or agent-facing artifacts, and never serialize secrets.

## Source

- [Configuration Reference](../../config.md)
- [Configuration Contract](../../config-contract.md)

