# Configuration Contract

Status: Planned.

Audience: framework contributors, app developers, adapter maintainers, AI agents.

This page defines how Lumina should load, validate, type, and use `lumina.config.ts`. No implementation exists yet. The goal is to prevent configuration behavior from becoming implicit during the first product build.

## Why This Exists

Configuration controls routes, adapters, generated output, environment handling, SEO defaults, cache behavior, agent features, and performance budgets. If config behavior is vague, the compiler, runtime adapters, CLI, MCP server, docs site, and agents will all make different assumptions.

Research backing:

- Vite separates config evaluation from `.env` loading because env files depend on resolved config such as root and env directory.
- Next.js and Astro distinguish server-only environment variables from client-exposed environment variables.
- Astro and Vite document typed config helpers such as `defineConfig()`.
- Docusaurus documents a central site config and frontmatter behavior, reinforcing that config and page metadata need clear contracts.

## Planned Config File

Lumina apps should use:

```txt
lumina.config.ts
```

Planned minimal config:

```ts
import { defineConfig } from "lumina"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

`defineConfig()` should provide type checking and narrow accepted values. It should not execute runtime request logic.

## Runtime And Adapter Ownership

`runtime` and `adapter` are related but not interchangeable:

- `runtime` describes the default local execution target and compatibility target for generated server code.
- `adapter` selects the production output package that turns generated artifacts into deployable output.
- `adapter: "bun"` maps to `@lumina/adapter-bun`.
- `adapter: "node"` maps to `@lumina/adapter-node`.
- `adapter: "static"` maps to `@lumina/adapter-static`.

If both fields are present, config validation must ensure they resolve to a compatible pair before generated output is emitted. Adapter packages must report their resolved runtime through `dist/adapter.manifest.json` as `runtime.name`, not through ad hoc config re-evaluation at startup.

## Loading Order

Planned loading order:

1. Resolve project root.
2. Resolve CLI flags such as `--cwd`, `--config`, and future `--mode`.
3. Load `lumina.config.ts`.
4. Validate config shape.
5. Resolve defaults.
6. Load environment files only after config identifies env behavior.
7. Create an immutable normalized config object.
8. Pass normalized config to compiler, CLI commands, adapters, and manifest generation.

Do not let runtime adapters independently reinterpret source config. Adapters should consume normalized generated output.

## Normalized Config

The compiler should eventually produce or use a normalized config shape similar to:

```json
{
  "schemaVersion": "lumina.config.v0",
  "root": ".",
  "runtime": "bun",
  "adapter": "bun",
  "outDir": "dist",
  "luminaDir": ".lumina",
  "mode": "development"
}
```

Rules:

- Use normalized relative paths where possible.
- Avoid absolute local paths in public or agent-facing artifacts.
- Include schema version when config is serialized.
- Include enough config data in generated manifests to explain build output.
- Do not serialize secrets.

## Planned Config Fields

| Field | Status | Purpose |
| --- | --- | --- |
| `runtime` | Planned | Default local execution target, initially `bun`. |
| `adapter` | Planned | Production output adapter, initially `bun`, later `node` or `static`. |
| `root` | Planned | Project root override. |
| `outDir` | Planned | Production output directory. |
| `luminaDir` | Planned | Generated framework artifact directory. |
| `routes` | Planned | Route discovery options and ignored paths. |
| `seo` | Planned | Metadata defaults, sitemap, robots, and audit behavior. |
| `cache` | Planned | Default route and API cache policy. |
| `agent` | Planned | Agent context and safe edit settings. |
| `mcp` | Planned | MCP server behavior. |
| `devtools` | Planned | Local-only devtools settings. |
| `performance` | Planned | Budgets and report behavior. |
| `env` | Planned | Environment variable policy and public prefix behavior. |

Do not treat this table as final API. It is the planned reference home until implementation settles exact fields.

## Performance Delivery Config

The planned `performance` config may eventually include delivery controls that affect generated reports, route HTML, and adapter output.

Draft shape:

```ts
export default defineConfig({
  performance: {
    budgets: {
      publicPageJs: "80kb",
      routeCss: "30kb",
      publicHtml: "80kb",
    },
    delivery: {
      compression: {
        staticPrecompressed: true,
        dynamicText: "adapter",
        encodings: ["br", "gzip"],
      },
      resourceHints: {
        emitHtmlLinks: true,
        allowEarlyHints103: "adapter",
        allowSpeculationRules: false,
      },
      images: {
        formats: ["avif", "webp"],
        requireDimensions: true,
      },
      fonts: {
        preferSelfHostedWoff2: true,
        preloadRouteCriticalOnly: true,
      },
      bfcache: {
        failOnFrameworkBlockers: true,
      },
      debugArtifacts: {
        publicSourceMaps: false,
        hiddenSourceMaps: false,
      },
      rum: {
        enabled: false,
      },
    },
  },
})
```

Rules:

- Delivery config is planned, not implemented.
- `"adapter"` means the compiler records route eligibility and the adapter manifest decides whether the output can be served correctly.
- Config must not enable blanket resource hints, blanket 103 Early Hints, blanket speculation rules, or request-time image transforms by default.
- Public source maps, hidden source maps, debug payloads, and RUM instrumentation must be disabled by default.
- Fields that change generated delivery metadata must appear in `.lumina/perf.report.json` or `dist/adapter.manifest.json`.

## Environment Variable Policy

Environment variables are high risk because they can leak secrets or change build output.

Planned rules:

- Server-only environment variables are never exposed to browser bundles by default.
- Client-exposed environment variables require an explicit public prefix or explicit config allow-list.
- Public environment variables may be inlined at build time.
- Runtime environment variables must be read only from server or adapter runtime code.
- `.env*` loading behavior must be deterministic and documented.
- Config evaluation must state which environment variables are available before `.env*` files load.
- Generated manifests must not include secret values.
- Diagnostics should explain missing or invalid required variables without printing secret values.

Potential public prefix:

```txt
LUMINA_PUBLIC_
```

The exact prefix is planned, not implemented. It should be finalized before client environment support ships.

## Environment File Order

Planned deterministic order:

```txt
.env
.env.local
.env.<mode>
.env.<mode>.local
```

Mode-specific files should override earlier files. Local files should not be required in CI. The final order should be confirmed when implementation chooses the env loader.

## Validation

Config validation should produce structured diagnostics:

```json
{
  "code": "LUMINA_CONFIG_INVALID_ADAPTER",
  "severity": "error",
  "message": "Unknown adapter \"edge\".",
  "file": "lumina.config.ts",
  "docs": "https://lumina.dev/docs/reference/config"
}
```

Validation should catch:

- Unknown top-level fields.
- Invalid adapter names.
- Invalid runtime names.
- Paths that escape allowed project boundaries.
- Conflicting output directories.
- Public environment variables that look like secrets.
- Agent or MCP write settings enabled in unsafe contexts.
- Performance budgets with invalid units.

## Generated Output Impact

Config can affect:

- `.lumina/routes.json`.
- `.lumina/render-manifest.json`.
- `.lumina/map.json`.
- `.lumina/graph.json`.
- `.lumina/seo.report.json`.
- `.lumina/perf.report.json`.
- `.lumina/context/*.ctx.json`.
- `.lumina/context/agent-index.json`.
- `.lumina/mutations.json`.
- `.lumina/generated/*`.
- `dist/routes.manifest.json`.
- `dist/render.manifest.json`.
- `dist/seo.report.json`.
- `dist/adapter.manifest.json`.
- `dist/*`.

Any config field that changes generated output must be documented in [Manifest Contracts](manifest-contracts.md) or the relevant reference page.

## Security Rules

- Do not log secrets.
- Do not serialize secrets into `.lumina/*`, `dist/*`, `docs-index.json`, `llms.txt`, or `llms-full.txt`.
- Do not expose server-only env vars to client code.
- Do not allow adapter config to bypass safe edit rules.
- Do not enable MCP write tools through config without safe edit validation.

See [Security](security.md) for high-risk feature documentation rules.

## Tests

Once implemented:

- Unit-test config normalization.
- Unit-test invalid config diagnostics.
- Fixture-test `.env*` loading order.
- Fixture-test public versus server-only env behavior.
- Snapshot generated config-related manifest fields.
- Test that secrets are not emitted into public or agent-facing artifacts.

## Out Of Scope

- Final config defaults before config loading behavior exists.
- Host-specific deployment config.
- A secrets manager.
- Claiming public environment behavior works before client build tests exist.
- Allowing runtime adapters to rediscover raw source config in production.
