# Roadmap

NeedleStart should be built in phases. Each phase must define what it proves, what it implements, and what remains out of scope.

The first public prototype focuses on proving the agent-native and semantic graph wedge.

## Major Milestones

### Foundation

- Monorepo, CLI skeleton, config, and AGENTS.md.
- Shared core data model.
- Route discovery and manifest generation.
- Basic Vite integration with React SSR and hydration.
- Nested layouts and params.

### Core Wedge

- Render modes: `staticPage`, `prerender`, `ssr`, and `apiHot`.
- SEO engine: metadata, sitemap, robots, and audits.
- Adapter-aware Bun production server.
- API routes and hot API compiler with schemas.
- Needle Map v1: file and import graph with affected queries.
- Agent context capsules and basic MCP read tools.
- Safe metadata edits with dry-run and affected checks.

### Advanced

- Needle Map v2 with semantic edges from contracts.
- Full Agent Kernel and write-capable MCP tools.
- Structured page DSL and content collections.
- Streaming SSR and experimental partial prerendering.
- Deployment adapters for static, Bun, Node, Docker, and later cloud targets.
- Devtools dashboard.
- Large-app support: ownership, boundaries, incremental builds.
- RSC experimental path, version-pinned and opt-in.

## Current Status

The repository is in Phase 0. The next implementation stage is Phase 1: monorepo skeleton, followed by route discovery.

## How We Build

- Every major task uses a structured task template.
- Compiler and map are built as first-class systems from the beginning.
- Runtime stays minimal.
- All generated artifacts are explainable.
- NeedleStart should dogfood Needle Map and agent tools on the framework itself as soon as they exist.

## Phase 0: Project Constitution

Goal: define what the framework is and what it refuses to become.

Deliverables:

- `README.md`
- `VISION.md`
- `CONTRIBUTING.md`
- `ARCHITECTURE.md`
- `AGENTS.md`
- `docs/roadmap.md`
- `docs/compiler-ir.md`
- `docs/runtime-contract.md`
- `docs/agent-kernel.md`
- `docs/needle-map.md`

Definition of done:

- Project thesis is documented.
- Architecture principles are documented.
- Package responsibilities are documented.
- Agent rules are documented.
- Implementation task template exists.

Status: in progress.

Risk mitigation focus:

- Lock the shared data model before implementation diverges.
- Keep the first prototype centered on compiler IR, route discovery, basic graph, SEO-safe rendering, and a low-risk safe edit.
- Treat `docs/risk-mitigation.md` as required reading for map, agent, MCP, adapter, and safe-edit work.

## Phase 1: Monorepo Skeleton

Goal: create the Bun workspace and package scaffolds.

Packages:

- `create-needle`
- `@needle/cli`
- `@needle/core`
- `@needle/compiler`
- `@needle/vite-plugin`
- `@needle/react`
- `@needle/server-bun`
- `@needle/router`
- `@needle/seo`
- `@needle/map`
- `@needle/agent`
- `@needle/mcp`
- `@needle/cache`
- `@needle/schema`
- `@needle/devtools`

Definition of done:

- `bun install` works.
- `bun test` works.
- `bun run typecheck` works.
- All packages have `package.json`.
- All packages expose `src/index.ts`.
- Placeholder tests exist.

Out of scope:

- Real route discovery.
- Runtime server.
- Vite integration.

## Phase 1A: Core Data Model

Goal: lock the shared immutable model in `@needle/core`.

Required types:

- `NeedleApp`
- `RouteNode`
- `GraphEdge`
- `NeedleDiagnostic`

Definition of done:

- CLI, compiler, map, agent, MCP, adapters, and devtools can import shared types from `@needle/core`.
- `GraphEdge` includes `kind`, `source`, `confidence`, and `why`.
- Docs and placeholder tests verify the type contracts.
- No package defines a competing local route or graph shape.

## Phase 2: CLI and App Discovery

Goal: discover routes from an `app/` directory and expose route inspection commands.

Commands:

- `needle routes`
- `needle inspect`

Route conventions:

```txt
app/page.tsx                       -> /
app/about/page.tsx                 -> /about
app/blog/[slug]/page.tsx           -> /blog/:slug
app/docs/[...parts]/page.tsx       -> /docs/*
app/(marketing)/pricing/page.tsx   -> /pricing
app/api/health.ts                  -> /api/health
```

Definition of done:

- Routes are discovered deterministically.
- Dynamic params are parsed.
- Route groups do not affect URL paths.
- API and page routes are distinguished.
- Manifest is stable across operating systems.
- Tests cover nested routes, dynamic routes, catch-all routes, and route groups.

## Phase 3: Vite Integration

Goal: make a React app run in dev mode with Vite.

Deliverables:

- `@needle/vite-plugin`
- Virtual modules.
- Dev server middleware.
- Route manifest HMR.
- Client entry.
- Server entry.

Virtual modules:

```txt
virtual:needle/routes
virtual:needle/client-entry
virtual:needle/server-entry
virtual:needle/manifest
virtual:needle/head
```

Definition of done:

- `needle dev` starts Vite.
- Changing `app/page.tsx` updates browser output.
- `virtual:needle/routes` works.
- React page renders on the server.
- Client hydration works for a simple counter.

## Phase 4: React Pages, Layouts, and Hydration

Goal: support familiar page and layout ergonomics.

Features:

- Root layout.
- Nested layouts.
- Route params.
- Search params.
- Error page.
- Not found page.
- Client components with `"use client"`.
- Basic hydration.

Definition of done:

- Nested layouts render in correct order.
- Params are available to page components.
- Search params are available.
- 404 uses `app/not-found.tsx`.
- Errors use `app/error.tsx`.
- Hydration works for simple client components.

## Phase 5: Render Modes

Goal: every route compiles into the fastest safe rendering strategy.

Public API:

```ts
export const render = staticPage()
export const render = prerender({ revalidate: "10m", tags: ["blog"] })
export const render = ssr({ cache: "no-store" })
export const render = stream()
export const render = clientOnly()
export const render = apiHot({ validate: true, serialize: "generated" })
```

Definition of done:

- Render mode is detected.
- Static routes emit `dist/public/*.html`.
- SSR routes run through Bun server.
- Invalid render declarations produce helpful errors.
- Manifest includes cache and revalidation metadata.

## Phase 6: SEO Engine

Goal: make public pages SEO-correct by default.

Features:

- `defineMeta()`
- Static metadata.
- Dynamic metadata.
- Title and description.
- Canonical URLs.
- Open Graph.
- Twitter/X cards.
- JSON-LD helpers.
- `robots.txt`.
- `sitemap.xml`.
- Sitemap indexes for large sites.
- RSS, Atom, and JSON feeds.
- `hreflang`.
- 404 and 410 status helpers.
- SEO audit CLI.
- Crawler preview.

Definition of done:

- Head tags render into SSR and SSG HTML.
- `sitemap.xml` is generated from public route manifest.
- `robots.txt` is generated from config.
- `needle seo` catches missing title, description, and canonical URL.
- `needle seo --json` is stable for agents.
- Tests cover static and dynamic metadata.

## Phase 7: Core Web Vitals and Performance Budgets

Goal: make performance visible and enforceable.

Phase boundary:

- Phases 0 through 7 should remain focused on compiler IR, route discovery, basic rendering, SEO, performance visibility, and the first graph foundation.
- Features that require major runtime complexity should be deferred unless they directly strengthen the map or agent demo.

Definition of done:

- Route JS and CSS sizes are reported.
- Budgets can warn or fail.
- Public page budgets are stricter by default.
- JSON diagnostics include safe suggestions.

## Phase 7A: Adapter Abstraction

Goal: create early adapter boundaries so Bun is the speed default but not an adoption blocker.

Packages:

- `@needle/adapter-bun`
- `@needle/adapter-node`
- `@needle/adapter-static`

Definition of done:

- `needle.config.ts` supports `runtime` and `adapter`.
- Generated server entry imports the selected adapter.
- Adapter manifest documents capabilities.
- User application code does not require Bun-only APIs.
- Static adapter can export static routes.
- Node adapter can serve a minimal SSR route.

## Phase 8: Bun Production Server

Goal: ship a production server that serves static, SSR, and API routes.

Definition of done:

- `needle build` emits a runnable server bundle.
- `needle start` serves static pages.
- `needle start` serves SSR pages.
- 404 and 500 work.
- Cache headers are correct for static assets.
- Integration tests make HTTP requests and assert responses.
- Bun server is implemented as `@needle/adapter-bun`.

## Phase 9: API Routes

Goal: support full-stack API routes.

Definition of done:

- GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD work.
- Dynamic API params work.
- Plain objects become JSON responses.
- Response objects pass through untouched.
- Errors are formatted in dev and hidden in production.

## Phase 10: Hot API Compiler

Goal: make selected API routes faster than generic framework handlers.

Definition of done:

- Params, query, and body schemas validate.
- Response schema serializes.
- Invalid input returns 400 with structured errors.
- Hot API route avoids generic JSON path where possible.
- OpenAPI file emits for API routes.
- Benchmarks are reproducible.

## Phase 11: Cache System

Goal: build predictable and inspectable caching.

Definition of done:

- Route cache metadata appears in manifest.
- Cache tags are queryable by route and component.
- `revalidateTag` invalidates matching entries.
- Cache status appears in dev logs.
- Agent JSON output explains cache behavior.

## Phase 12: Server Functions

Goal: provide type-safe same-origin server calls.

Definition of done:

- Server functions callable from loaders.
- Server functions callable from client components through generated stubs.
- Input validation works.
- Output validation works in dev.
- Map shows which routes call each server function.

## Phase 13: Needle Map v1

Goal: build a file-level graph.

Risk mitigation focus:

- This is Layer 0 of semantic graph extraction.
- Use structured parsing plus deterministic import walking.
- Do not infer semantics beyond file-level relationships yet.
- Implement basic affected queries early because the graph is the product wedge.

Definition of done:

- Graph includes routes, components, APIs, schemas, tests, styles, and metadata.
- Affected query works from changed file to impacted routes and tests.
- Explain query includes why edges exist.
- Output is compact and deterministic.
- Tests cover graph generation on fixture apps.

## Phase 14: Needle Map v2

Goal: move from imports into application meaning.

Risk mitigation focus:

- This is Layer 1 and Layer 2 of semantic graph extraction.
- Prefer explicit `.contract.ts` files as the primary source of semantic truth.
- Add convention-based inference only when the source and confidence are clear.
- Treat missing contracts as low-confidence graph data rather than guessing.
- Every semantic edge must include `kind`, `source`, `confidence`, and `why`.

Definition of done:

- Map distinguishes hard and soft edges.
- Component contracts create prop edges.
- Route metadata creates SEO edges.
- Cache tags appear as nodes.
- Affected checks are smarter than import traversal.
- Agent can ask what else must change if a component changes.

## Phase 15: Agent Kernel v1

Goal: make the framework usable by AI agents without forcing them to read the whole repo.

Definition of done:

- `AGENTS.md` generated with project commands and rules.
- Context capsules generated per route.
- Agent context command returns compact JSON.
- Agent plan returns deterministic task skeletons.
- No production build includes agent metadata.

## Phase 16: MCP Server

Goal: expose framework data and actions through structured tools.

Definition of done:

- `needle mcp` starts server.
- MCP client can list routes.
- MCP client can inspect a route.
- MCP client can get related files.
- MCP client can run affected checks.
- Write tools require safe-edit validation.
- Tools return compact structured JSON.

## Phase 17: Safe Edit API

Goal: let agents change apps through guardrails.

Risk mitigation focus:

- Safe edits must be transactional.
- Edits must be AST-based, never string replacement.
- The first safe edit should be low risk: route metadata only.
- Each edit must support dry-run preview, affected checks, mutation logs, and undo.
- High-risk changes require explicit override.

Definition of done:

- Safe edit can update metadata.
- Safe edit can add route block placeholder.
- Safe edit can update component contract.
- `SafeEditTransaction` shape is implemented.
- Dry-run applies patches in memory.
- `.needle/mutations.json` is append-only.
- Unsafe fields are rejected.
- Mutation log is written.
- Affected checks run after edits.
- `needle edit undo` can roll back the last safe edit.

## Phase 18: Migration Prototype

Goal: reduce adoption friction through a constrained Next.js migration path.

Command:

- `needle migrate from-next`

Definition of done:

- App Router pages can be copied into NeedleStart route shape when compatible.
- Layouts can be preserved when compatible.
- Static metadata can be converted.
- Dynamic route segments can be mapped.
- Ambiguous semantics generate `.contract.ts` stubs.
- Migration report lists skipped files and manual review items.

## Phase 19: Node Adapter Baseline

Goal: reduce Bun adoption friction before the broader deployment adapter phase.

Rationale:

- Bun remains the default runtime because speed matters.
- User application code should not depend on Bun-only APIs.
- Teams that require Node should have a credible path early.

Definition of done:

- A basic Node adapter can serve built static routes.
- A basic Node adapter can serve SSR routes.
- Adapter capabilities are documented in `adapter.manifest.json`.
- README documents Bun default plus Node compatibility.
- Benchmarks distinguish Bun performance from Node compatibility.

## Later Phases

Later roadmap:

1. Structured page DSL.
2. Content collections.
3. Images, fonts, and scripts.
4. Auth and sessions.
5. Forms and mutations.
6. Streaming SSR.
7. Partial prerendering.
8. Full deployment adapter matrix.
9. Devtools dashboard.
10. Large-app support.
11. RSC experimental.
12. Docs and examples.
13. Benchmarks and launch polish.
