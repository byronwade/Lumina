# Package Map

This document defines package responsibilities and boundaries.

Status: Scaffolded.

Audience: framework contributors, package owners, AI agents.

Scope: package names and entrypoints are scaffolded; package behavior remains planned unless a package README, tests, and implementation evidence say otherwise.

## Root Packages

| Package | Responsibility |
| --- | --- |
| `create-needle` | One-command project creation. |
| `@needle/cli` | Planned `needle` command surface: `needle dev`, `needle build`, `needle start`, `needle routes`, `needle inspect`, `needle check`, `needle seo`, `needle map`, `needle agent`, `needle mcp`, `needle edit`, and `needle migrate`. |
| `@needle/core` | Shared types, config, route definitions, render modes, diagnostics, and public helper types. |
| `@needle/compiler` | App discovery, route IR, render mode extraction, manifests, generated modules, route asset metadata, API codegen, graph inputs. |
| `@needle/vite-plugin` | Vite integration, virtual modules, route HMR, client and server entry wiring. |
| `@needle/react` | React SSR helpers, layouts, head manager, loaders, hydration, client entry helpers. |
| `@needle/router` | Generated route matcher, typed links, params, route helpers. |
| `@needle/seo` | Metadata, sitemap, robots, OG images, structured data helpers, SEO audits. |
| `@needle/map` | Semantic graph builder, file graph, query engine, affected checks. |
| `@needle/agent` | App-local `AGENTS.md` generation, context capsules, task skeletons, safe edit orchestration. |
| `@needle/mcp` | MCP server tools and resources. |
| `@needle/cache` | Cache tags, route cache, response cache, invalidation primitives. |
| `@needle/schema` | Schema DSL, validators, serializers, OpenAPI generation. |
| `@needle/devtools` | Local-only dashboard for routes, map, SEO, performance, cache, and agent context. |
| `@needle/adapter-bun` | Default Bun adapter using `Bun.serve` and generated route matcher. |
| `@needle/adapter-node` | Node compatibility adapter using Node HTTP or a lightweight server with shims. |
| `@needle/adapter-static` | Static export adapter for fully static routes. |
| `@needle/adapters/*` | Later deployment targets such as Docker, Cloudflare, Vercel, and other cloud adapters. |

Current scaffold paths:

```txt
packages/create-needle
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

Note: earlier planning docs referred to `@needle/server-bun` as the Bun production runtime package. Phase 1 should prefer `@needle/adapter-bun` as the concrete package name so Bun, Node, and static output share the same adapter model. Reintroduce a separate `@needle/server-bun` package only through an architecture decision record if the adapter package becomes too broad.

## Boundary Rules

- Shared public types belong in `@needle/core`.
- Compiler-only parsing and generation belongs in `@needle/compiler`.
- Runtime request handling belongs in runtime adapters, starting with `@needle/adapter-bun`.
- Browser-facing React helpers belong in `@needle/react`.
- Route asset discovery, resource-hint metadata, likely LCP asset metadata, and performance report generation belong in `@needle/compiler` until a dedicated performance package is justified.
- Compression serving, 103 Early Hints emission, final `Link` headers, and adapter-specific bfcache-safe delivery behavior belong in runtime adapters.
- Agent context and safe edit code belongs in `@needle/agent`.
- MCP protocol code belongs in `@needle/mcp`.
- SEO metadata helpers and audits belong in `@needle/seo`.
- Graph storage and graph queries belong in `@needle/map`.
- Schema validation and serialization belongs in `@needle/schema`.

## Import Rules

Planned direction:

- `@needle/cli` may depend on most internal packages.
- `@needle/compiler` may depend on `@needle/core`, `@needle/schema`, `@needle/seo`, and `@needle/map` types.
- `@needle/adapter-bun` should depend on generated output, `@needle/core`, `@needle/router`, and minimal runtime helpers.
- `@needle/react` should not depend on compiler internals.
- `@needle/mcp` should use stable APIs from `@needle/map`, `@needle/seo`, `@needle/agent`, and `@needle/core`.
- Production runtime packages must not depend on agent-only code.

## Adapter Rules

- Bun-specific APIs belong in `@needle/adapter-bun`.
- Node compatibility code belongs in `@needle/adapter-node`.
- Static export logic belongs in `@needle/adapter-static`.
- User application code must not require Bun-only APIs.
- Adapter capability output belongs in `dist/adapter.manifest.json`.
- Adapter delivery capabilities must match [Adapter Contract](adapter-contract.md), including compression, resource hints, 103 Early Hints, and bfcache-aware headers.

## `@needle/map` Query API

The map package should expose one query engine for CLI, MCP, devtools, and Agent Kernel.

Planned API:

```ts
getAffected(node)
explainEdge(edgeId)
query("route:/pricing affectedBy component:ProductCard")
```

Do not duplicate graph query logic in MCP or CLI packages. Those packages should call `@needle/map`.

## Package README Rule

Every package should eventually include a local `README.md` with:

- Responsibility.
- Public API.
- Internal dependencies.
- Generated files.
- Tests.
- Out of scope.

Package tests and fixture ownership should follow [Testing Contract](testing-contract.md).
