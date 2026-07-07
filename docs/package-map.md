# Package Map

This document defines package responsibilities and boundaries.

Status: Scaffolded.

Audience: framework contributors, package owners, AI agents.

Scope: package names and entrypoints are scaffolded; package behavior remains planned unless a package README, tests, and implementation evidence say otherwise. The initial `@lumina/react` `staticPage()` / `ssr()` helpers are implemented for render declarations. The initial `@lumina/compiler` route-discovery, explicit static/SSR render-mode extraction, and direct local import map edge APIs are implemented and covered by fixture tests. The initial `@lumina/map` affected-route query API is implemented for direct local import edges. The initial `@lumina/vite-plugin` dev-server and static-build APIs are implemented for minimal SSR page serving, dev and production route-specific hydration bundle output, route-file update reports, direct local imported component affected-route reports, static HTML output, and deployment manifest copies. The initial `@lumina/adapter-bun` runtime API serves static built HTML and production client bundles from `dist/public`.

## Root Packages

| Package | Responsibility |
| --- | --- |
| `create-lumina` | One-command project creation. |
| `@lumina/cli` | Implemented `lumina routes <appPath> --json`, `lumina inspect <appPath> --json`, `lumina inspect <appPath> why <route>`, `lumina map affected <appPath> <file> --json`, `lumina bench --list --json`, minimal `lumina dev <appPath>`, static `lumina build <appPath>`, and static `lumina start <appPath>` paths plus planned command surface: `lumina check`, `lumina test`, `lumina seo`, broader `lumina map` query modes, `lumina workspace`, `lumina agent`, `lumina mcp`, `lumina edit`, `lumina migrate`, and benchmark execution commands. |
| `@lumina/core` | Shared types, config, route definitions, render modes, diagnostics, workspace graph, shared-file identity, generated artifact identity, and public helper types. |
| `@lumina/compiler` | Implemented app route discovery, explicit static/SSR render mode extraction, manifest generation, and direct local import graph edges; planned workspace discovery, broader route IR, generated modules, route asset metadata, API codegen, semantic graph inputs, incremental planning, affected selection, and large-repo reports. |
| `@lumina/vite-plugin` | Implemented minimal Vite dev-server integration for artifact generation, SSR page serving, route-specific dev hydration bundles, browser-verified interactive root-route hydration, `virtual:lumina/routes`, route-file update reports, direct local imported component affected-route reports through `@lumina/map`, static build-time HTML rendering, and route-specific production hydration bundles; planned broader component-level browser HMR verification, app-scoped invalidation, and server entry wiring. |
| `@lumina/react` | Implemented `staticPage()` and `ssr()` render declaration helpers; planned React SSR helpers, layouts, head manager, loaders, hydration, and client entry helpers. |
| `@lumina/router` | Generated route matcher, typed links, params, route helpers. |
| `@lumina/seo` | Metadata, sitemap, robots, OG images, structured data helpers, SEO audits. |
| `@lumina/map` | Implemented minimal affected-route queries for direct local import edges; planned semantic graph builder, workspace graph queries, broader file graph query engine, affected checks, shared-file consumers, and split-app explain output. |
| `@lumina/agent` | App-local `AGENTS.md` generation, context capsules, task skeletons, safe edit orchestration. |
| `@lumina/mcp` | MCP server tools and resources. |
| `@lumina/cache` | Cache tags, route cache, response cache, invalidation primitives. |
| `@lumina/schema` | Schema DSL, validators, serializers, OpenAPI generation. |
| `@lumina/devtools` | Local-only dashboard for routes, map, SEO, performance, cache, and agent context. |
| `@lumina/adapter-bun` | Implemented static built-output serving for HTML and production client bundles through `Bun.serve`; planned generated route matcher, SSR, API, cache, and broader adapter capabilities. |
| `@lumina/adapter-node` | Node compatibility adapter using Node HTTP or a lightweight server with shims. |
| `@lumina/adapter-static` | Static export adapter for fully static routes. |
| `packages/adapters/*` | Later deployment targets such as Docker, Cloudflare, Vercel, and other cloud adapters. |

Current scaffold paths:

```txt
packages/create-lumina
packages/cli
packages/core
packages/compiler
packages/vite-plugin
packages/react
packages/router
packages/seo
packages/map
packages/agent
packages/mcp
packages/cache
packages/schema
packages/devtools
packages/adapters/bun
packages/adapters/node
packages/adapters/static
```

Note: earlier planning docs referred to `@lumina/server-bun` as the Bun production runtime package. It is not an active Phase 1 package name. Phase 1 uses `@lumina/adapter-bun` so Bun, Node, and static output share the same adapter model. Reintroduce a separate `@lumina/server-bun` package only through an architecture decision record if the adapter package becomes too broad.

## Boundary Rules

- Shared public types belong in `@lumina/core`.
- Workspace, app, package, shared-file, generated-artifact, and workspace-report types belong in `@lumina/core`.
- Compiler-only parsing and generation belongs in `@lumina/compiler`.
- Workspace discovery, incremental planning, affected build selection, and large-repo report generation belong in `@lumina/compiler`.
- Runtime request handling belongs in runtime adapters, starting with `@lumina/adapter-bun`.
- Browser-facing React helpers belong in `@lumina/react`.
- Route asset discovery, resource-hint metadata, likely LCP asset metadata, and performance report generation belong in `@lumina/compiler` until a dedicated performance package is justified.
- Early benchmark skeletons and fixture apps belong outside runtime packages under `benchmarks/` and `fixtures/apps/`; they must not become production dependencies.
- Compression serving, 103 Early Hints emission, final `Link` headers, and adapter-specific bfcache-safe delivery behavior belong in runtime adapters.
- Agent context and safe edit code belongs in `@lumina/agent`.
- MCP protocol code belongs in `@lumina/mcp`.
- SEO metadata helpers and audits belong in `@lumina/seo`.
- Graph storage and graph queries belong in `@lumina/map`.
- Workspace graph affected queries, shared-file consumer queries, and split-app explain queries belong in `@lumina/map`.
- Schema validation and serialization belongs in `@lumina/schema`.

## Import Rules

Planned direction:

- `@lumina/cli` may depend on most internal packages.
- `@lumina/compiler` may depend on `@lumina/core`, `@lumina/schema`, `@lumina/seo`, and `@lumina/map` types.
- `@lumina/vite-plugin` may depend on `@lumina/compiler` for dev-time artifact generation, `@lumina/map` for dev-time affected-route reporting, and on Vite/React runtime packages for local development only.
- `@lumina/adapter-bun` should depend on generated output, `@lumina/core`, `@lumina/router`, and minimal runtime helpers.
- `@lumina/react` should not depend on compiler internals.
- `@lumina/mcp` should use stable APIs from `@lumina/map`, `@lumina/seo`, `@lumina/agent`, and `@lumina/core`.
- Runtime adapter packages must not depend on agent-only code.

## Adapter Rules

- Bun-specific APIs belong in `@lumina/adapter-bun`.
- Node compatibility code belongs in `@lumina/adapter-node`.
- Static export logic belongs in `@lumina/adapter-static`.
- User application code must not require Bun-only APIs.
- Adapter capability output belongs in `dist/adapter.manifest.json`.
- Adapter delivery capabilities must match [Adapter Contract](adapter-contract.md), including compression, resource hints, 103 Early Hints, and bfcache-aware headers.

## `@lumina/map` Query API

The map package should expose one query engine for CLI, MCP, devtools, and Agent Kernel. The current implemented slice exposes `getAffectedRoutes()` and `getAffectedFiles()` for direct local import edges in generated maps.

Planned API:

```ts
getAffected(node)
explainEdge(edgeId)
query("route:/pricing affectedBy component:ProductCard")
```

Do not duplicate graph query logic in MCP or CLI packages. Those packages should call `@lumina/map`.

## Package README Rule

Every package should eventually include a local `README.md` with:

- Responsibility.
- Public API.
- Internal dependencies.
- Generated files.
- Tests.
- Out of scope.

Package tests and fixture ownership should follow [Testing Contract](testing-contract.md).
