# API Reference

Status: Planned.

Audience: app developers, framework contributors, AI agents.

This page is the index for exact NeedleStart API contracts. It should become the place developers and agents use when they need precise command syntax, config fields, helper signatures, file conventions, generated JSON, and manifest shapes.

## Reference Page Rules

API reference pages should be exact and stable:

- Include status.
- Include version or phase when relevant.
- List parameters, return values, defaults, and errors.
- Show generated JSON fields for agent-facing output.
- Link to tests or fixtures once implementation exists.
- Avoid product positioning prose.

## CLI Reference

Planned commands:

| Command | Status | Purpose |
| --- | --- | --- |
| `needle dev` | Planned | Start local development server. |
| `needle build` | Planned | Build static, SSR, API, graph, SEO, and adapter outputs. |
| `needle start` | Planned | Start a built app with the selected adapter. |
| `needle routes` | Planned | Inspect discovered routes. |
| `needle inspect` | Planned | Inspect a route, file, or generated artifact. |
| `needle check` | Planned | Run framework-aware checks. |
| `needle seo` | Planned | Run SEO audits. |
| `needle map` | Planned | Query Needle Map. |
| `needle agent` | Planned | Generate and inspect agent context. |
| `needle mcp` | Planned | Start the MCP server. |
| `needle edit` | Planned | Preview, apply, inspect, and undo safe-edit transactions. |
| `needle migrate` | Planned | Prototype migration workflows such as `from-next`. |
| `needle bench` | Planned | Run benchmark fixtures and emit evidence metadata. |

Each command should eventually document human output, `--json` output, exit codes, and affected generated files.

The shared JSON envelope, diagnostics, and exit-code policy are documented in [CLI JSON Contract](cli-json-contract.md).

The shared diagnostic code, severity, source-location, remediation, docs-link, and JSON diagnostic behavior is documented in [Diagnostics Contract](diagnostics-contract.md).

## Config Reference

Planned config file:

```ts
// needle.config.ts
import { defineConfig } from "needlestart"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

Planned config areas:

- Runtime target.
- Production adapter.
- Routes.
- SEO defaults.
- Cache policy.
- Generated output paths.
- Agent and MCP behavior.
- Devtools.
- Performance budgets.

Config loading, validation, environment behavior, and normalized output are documented in [Configuration Contract](config-contract.md).

## Public Helper APIs

Planned helpers:

| API | Status | Package | Purpose |
| --- | --- | --- | --- |
| `defineConfig()` | Planned | `needlestart` | Define project config. |
| `defineMeta()` | Planned | `needlestart` | Define route metadata for SEO, social cards, sitemap output, robots policy, and structured data. |
| `staticPage()` | Planned | `needlestart` | Mark a route as static. |
| `prerender()` | Planned | `needlestart` | Mark a route as prerendered with revalidation metadata. |
| `ssr()` | Planned | `needlestart` | Mark a route as server-rendered. |
| `stream()` | Planned | `needlestart` | Mark a route as streaming SSR. |
| `clientOnly()` | Planned | `needlestart` | Intentionally skip server-rendered content. |
| `apiHot()` | Planned | `needlestart` | Compile a specialized API handler path. |
| `schema` | Planned | `needlestart` | Define validation and serialization contracts. |

Planned render helper outputs must map to the shared `@needle/core` `RenderMode` literals: `"static"`, `"prerender"`, `"ssr"`, `"stream"`, `"client-only"`, `"api"`, and `"hot-api"`. Ordinary API route files under `app/api/` compile to `renderMode: "api"` without a separate `api()` helper. `apiHot()` is an explicit opt-in to `renderMode: "hot-api"`.

## Manifest Reference

Planned generated files:

| File | Status | Purpose |
| --- | --- | --- |
| `.needle/routes.json` | Planned | Stable route manifest. |
| `.needle/render-manifest.json` | Planned | Route render modes and cache metadata. |
| `.needle/map.json` | Planned | Public Needle Map output. |
| `.needle/graph.json` | Planned | Graph data for compiler, map, and agents. |
| `.needle/seo.report.json` | Planned | SEO audit output. |
| `.needle/perf.report.json` | Planned | Performance budget output. |
| `.needle/context/*.ctx.json` | Planned | Route or surface context capsules. |
| `.needle/context/agent-index.json` | Planned | Agent context index. |
| `.needle/mutations.json` | Planned | Safe edit mutation log. |
| `.needle/generated/*` | Planned | Generated runtime modules. |
| `dist/adapter.manifest.json` | Planned | Adapter capabilities and deployment output metadata. |
| `dist/*` | Planned | Production build output. |

Generated JSON must use schema versions, normalized paths, stable ordering, compact agent-friendly fields, documented source inputs when practical, and no absolute local paths in public artifacts.

## Related References

- [File Conventions](file-conventions.md)
- [Routing Contract](routing-contract.md)
- [API Route Contract](api-route-contract.md)
- [Schema Contract](schema-contract.md)
- [Cache Contract](cache-contract.md)
- [SEO Contract](seo-contract.md)
- [Compiler IR](compiler-ir.md)
- [CLI JSON Contract](cli-json-contract.md)
- [Diagnostics Contract](diagnostics-contract.md)
- [Configuration Contract](config-contract.md)
- [Runtime Contract](runtime-contract.md)
- [Needle Map](needle-map.md)
- [Agent Kernel](agent-kernel.md)
- [MCP Server](mcp-server.md)
- [Safe Edit Transactions](safe-edit-transactions.md)
- [Adapter Architecture](adapters.md)

