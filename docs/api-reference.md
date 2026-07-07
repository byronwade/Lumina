# API Reference

Status: Planned.

Audience: app developers, framework contributors, AI agents.

This page is the index for exact Lumina API contracts. It should become the place developers and agents use when they need precise command syntax, config fields, helper signatures, file conventions, generated JSON, and manifest shapes.

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
| `lumina dev` | Implemented for minimal `<appPath>` Vite SSR route serving | Start local development server. |
| `lumina build` | Implemented for static page routes | Build static HTML, route/render/map artifacts, initial build/performance reports, and Bun adapter manifests; SSR/API/SEO output remains planned. |
| `lumina start` | Implemented for static built output | Start a built static app with `@lumina/adapter-bun`; SSR/API serving remains planned. |
| `lumina routes` | Implemented for `<appPath> --json` | Inspect discovered routes and emit `.lumina/routes.json`. |
| `lumina inspect` | Implemented for `<appPath> --json` and `<appPath> why <route>` | Inspect generated app evidence and explain why a route exists. |
| `lumina inspect` | Planned | Inspect a route, file, or generated artifact. |
| `lumina check` | Planned | Run framework-aware checks. |
| `lumina test` | Planned | Run framework-aware test selection, including future affected-test mode. |
| `lumina seo` | Planned | Run SEO audits. |
| `lumina map` | Planned | Query Lumina Map. |
| `lumina workspace` | Planned | Inspect workspace graph, apps, shared-file consumers, and affected work. |
| `lumina agent` | Planned | Generate and inspect agent context. |
| `lumina mcp` | Planned | Start the MCP server. |
| `lumina edit` | Planned | Preview, apply, inspect, and undo safe-edit transactions. |
| `lumina migrate` | Planned | Prototype migration workflows such as `from-next`. |
| `lumina bench` | Planned | Run benchmark fixtures and emit evidence metadata. |

Each command should eventually document human output, `--json` output, exit codes, and affected generated files.

The shared JSON envelope, diagnostics, and exit-code policy are documented in [CLI JSON Contract](cli-json-contract.md).

The shared diagnostic code, severity, source-location, remediation, docs-link, and JSON diagnostic behavior is documented in [Diagnostics Contract](diagnostics-contract.md).

## Config Reference

Planned config file:

```ts
// lumina.config.ts
import { defineConfig } from "lumina"

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
| `defineConfig()` | Planned | `lumina` | Define project config. |
| `defineMeta()` | Planned | `lumina` | Define route metadata for SEO, social cards, sitemap output, robots policy, and structured data. |
| `staticPage()` | Implemented in `@lumina/react` for MVP render declarations | `lumina` target, local `@lumina/react` package | Mark a route as static. |
| `prerender()` | Planned | `lumina` | Mark a route as prerendered with revalidation metadata. |
| `ssr()` | Implemented in `@lumina/react` for MVP render declarations | `lumina` target, local `@lumina/react` package | Mark a route as server-rendered in manifests; production SSR serving remains planned. |
| `stream()` | Planned | `lumina` | Mark a route as streaming SSR. |
| `clientOnly()` | Planned | `lumina` | Intentionally skip server-rendered content. |
| `apiHot()` | Planned | `lumina` | Compile a specialized API handler path. |
| `schema` | Planned | `lumina` | Define validation and serialization contracts. |

Planned render helper outputs must map to the shared `@lumina/core` `RenderMode` literals: `"static"`, `"prerender"`, `"ssr"`, `"stream"`, `"client-only"`, `"api"`, and `"hot-api"`. Ordinary API route files under `app/api/` compile to `renderMode: "api"` without a separate `api()` helper. `apiHot()` is an explicit opt-in to `renderMode: "hot-api"`.

## Manifest Reference

Planned generated files:

| File | Status | Purpose |
| --- | --- | --- |
| `.lumina/routes.json` | Implemented | Stable route manifest. |
| `.lumina/render-manifest.json` | Implemented for default static/API route modes plus explicit `staticPage()` / `ssr()` declarations | Route render modes and generated file metadata. |
| `.lumina/map.json` | Implemented for first file-level route graph | Public Lumina Map output. |
| `.lumina/graph.json` | Planned | Graph data for compiler, map, and agents. |
| `.lumina/seo.report.json` | Planned | SEO audit output. |
| `.lumina/perf.report.json` | Implemented initial build status report | Performance budget output remains planned; current output records static HTML status without benchmark claims. |
| `.lumina/workspace.json` | Planned | Workspace apps, packages, settings, and generated artifact index. |
| `.lumina/workspace-graph.json` | Planned | Cross-app graph for shared files, packages, routes, tests, owners, and artifacts. |
| `.lumina/affected.json` | Planned | Affected apps, routes, packages, tests, generated artifacts, and reasons. |
| `.lumina/build-trace.json` | Implemented initial static build trace | Build phases, timings, cache behavior, and diagnostics. |
| `.lumina/cache-report.json` | Planned | Cache keys, hits, misses, invalidations, and reused artifact summary. |
| `.lumina/hmr-report.json` | Implemented for route-file changes | Dev server update scope, invalidated modules, route updates, and timings. |
| `.lumina/split-report.json` | Planned | Planned app or route split analysis and generated artifact movement. |
| `.lumina/context/*.ctx.json` | Planned | Route or surface context capsules. |
| `.lumina/context/agent-index.json` | Planned | Agent context index. |
| `.lumina/mutations.json` | Planned | Safe edit mutation log. |
| `.lumina/generated/*` | Planned | Generated runtime modules. |
| `dist/routes.manifest.json` | Implemented for static build | Deployment-oriented route manifest copy for adapters. |
| `dist/render.manifest.json` | Implemented for static build | Deployment-oriented render manifest copy for adapters. |
| `dist/seo.report.json` | Planned | Deployment-oriented SEO report copy for adapters. |
| `dist/adapter.manifest.json` | Implemented for static Bun output | Adapter capabilities and deployment output metadata. |
| `dist/*` | Implemented for static HTML output | Production build output for static page routes. |

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
- [Lumina Map](lumina-map.md)
- [Agent Kernel](agent-kernel.md)
- [MCP Server](mcp-server.md)
- [Safe Edit Transactions](safe-edit-transactions.md)
- [Adapter Architecture](adapters.md)

