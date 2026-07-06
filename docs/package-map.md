# Package Map

This document defines package responsibilities and boundaries.

Status: Scaffolded.

Audience: framework contributors, package owners, AI agents.

Scope: package names and entrypoints are scaffolded; package behavior remains planned unless a package README, tests, and implementation evidence say otherwise. The initial `@lumina/compiler` route-discovery API is implemented and covered by route-discovery fixture tests.

## Root Packages

| Package | Responsibility |
| --- | --- |
| `create-lumina` | One-command project creation. |
| `@lumina/cli` | Planned `needle` command surface: `lumina dev`, `lumina build`, `lumina start`, `lumina routes`, `lumina inspect`, `lumina check`, `lumina test`, `lumina seo`, `lumina map`, `lumina workspace`, `lumina agent`, `lumina mcp`, `lumina edit`, `lumina migrate`, and `lumina bench`. |
| `@lumina/core` | Shared types, config, route definitions, render modes, diagnostics, workspace graph, shared-file identity, generated artifact identity, and public helper types. |
| `@lumina/compiler` | App discovery, workspace discovery, route IR, render mode extraction, manifests, generated modules, route asset metadata, API codegen, graph inputs, incremental planning, affected selection, and large-repo reports. |
| `@lumina/vite-plugin` | Vite integration, virtual modules, route HMR, app-scoped invalidation, client and server entry wiring. |
| `@lumina/react` | React SSR helpers, layouts, head manager, loaders, hydration, client entry helpers. |
| `@lumina/router` | Generated route matcher, typed links, params, route helpers. |
| `@lumina/seo` | Metadata, sitemap, robots, OG images, structured data helpers, SEO audits. |
| `@lumina/map` | Semantic graph builder, workspace graph queries, file graph, query engine, affected checks, shared-file consumers, and split-app explain output. |
| `@lumina/agent` | App-local `AGENTS.md` generation, context capsules, task skeletons, safe edit orchestration. |
| `@lumina/mcp` | MCP server tools and resources. |
| `@lumina/cache` | Cache tags, route cache, response cache, invalidation primitives. |
| `@lumina/schema` | Schema DSL, validators, serializers, OpenAPI generation. |
| `@lumina/devtools` | Local-only dashboard for routes, map, SEO, performance, cache, and agent context. |
| `@lumina/adapter-bun` | Default Bun adapter using `Bun.serve` and generated route matcher. |
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

The map package should expose one query engine for CLI, MCP, devtools, and Agent Kernel.

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
