# Configuration Reference

Status: Planned.

Audience: app developers, adapter maintainers.

Lumina configuration is planned to live in `lumina.config.ts`.

## Planned Minimal Config

```ts
import { defineConfig } from "lumina"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

This API is planned and not implemented.

`runtime` is the planned local execution and server-code compatibility target. `adapter` is the planned production output selector: `bun` maps to `@lumina/adapter-bun`, `node` maps to `@lumina/adapter-node`, and `static` maps to `@lumina/adapter-static`. Build output should record the resolved adapter runtime in `dist/adapter.manifest.json` as `runtime.name`.

## Environment Rules

Environment behavior is planned, not implemented. Server-only environment variables must not be exposed to browser bundles by default. Client-exposed values require an explicit public prefix or allow-list. `.env*` loading must be deterministic, diagnostics must not print secret values, and generated artifacts must not serialize secrets.

The planned public prefix is `LUMINA_PUBLIC_`, but the final prefix must be confirmed before client environment support ships.

## Generated Output Impact

Config fields that affect routes, rendering, SEO, performance, agent context, or adapter behavior must be reflected in generated artifacts such as `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/graph.json`, `.lumina/seo.report.json`, `.lumina/perf.report.json`, `.lumina/context/*.ctx.json`, `.lumina/context/agent-index.json`, `.lumina/mutations.json`, `.lumina/generated/*`, `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, and `dist/*`.

Runtime adapters should consume normalized generated output instead of rediscovering raw source config in production.

## Planned Normalized Config

When config is serialized for tools or generated artifacts, the planned normalized shape should include:

- `schemaVersion`
- `root`
- `runtime`
- `adapter`
- `outDir`
- `luminaDir`
- `mode`

Normalized config output should use relative paths when possible, avoid absolute local paths in public or agent-facing artifacts, and never serialize secrets.

## Source

- [Configuration Reference](../../config.md)
- [Configuration Contract](../../config-contract.md)

