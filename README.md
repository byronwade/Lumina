# NeedleStart

**The first agent-native, SEO-first React framework built for speed and large applications.**

NeedleStart gives you the familiar React meta-framework experience: file-based routes, layouts, SSR/SSG, metadata, APIs, and deployment adapters. It adds a first-class semantic app graph, Needle Map, and deep integration for AI agents.

Build like Next.js.

Type like TanStack.

Ship fast with Bun and Vite.

Let agents understand and safely modify your app through a native semantic map instead of reading the whole repo.

NeedleStart is an agent-native, SEO-first React framework for building fast, large-scale web applications with a semantic map of every route, component, API, schema, test, cache, and content relationship.

The goal is not to clone Next.js. The goal is to win a newer category:

> The first agent-native, SEO-first React framework built for speed and large applications.

## Product Thesis

Modern React applications fail when they become too large to reason about. Routes drift away from tests, components drift away from schemas, SEO regressions hide inside client-heavy rendering, and AI agents waste context guessing how files relate to each other.

NeedleStart exists to make the framework itself the map of the application.

## Quick Start

Planned command once the package exists:

```bash
bun create needle my-app
cd my-app
bun dev
```

This repository is not yet at package-publish stage. Until the monorepo is scaffolded, these commands are target UX rather than verified local commands.

## Key Features

- Agent-native core: Needle Map, context capsules, MCP server, and safe edit API.
- SEO by default: public routes ship with complete metadata, sitemaps, structured data, and audits.
- Hot API paths: generated validators, serializers, and micro-caching for high-performance API routes.
- Explicit render modes: `staticPage()`, `prerender()`, `ssr()`, `stream()`, and `apiHot()`.
- Bun and Vite foundation: fast runtime with frontend ecosystem leverage.
- Large-app safety: ownership, affected checks, dependency graph, and package boundaries.

## Positioning

NeedleStart should be explained in this order:

1. Built for the age of AI agents building and maintaining apps.
2. SEO-perfect and Bun-fast by default.
3. Familiar React meta-framework ergonomics.

## Wedge

NeedleStart combines:

- Next-level simplicity.
- TanStack-level type safety.
- Bun-speed runtime paths.
- Vite and Rolldown ecosystem leverage.
- SEO-first rendering.
- Agent-native development.
- A semantic app map.
- A hot API path for performance-critical endpoints.

## Core Promise

Build like a familiar React meta-framework.

Type like a route-safe full-stack toolkit.

Ship static HTML whenever possible.

Run server paths through a small Bun runtime when needed.

Let agents inspect and modify the app through structured framework data instead of reading the whole repository.

## Differentiators

| Differentiator | Why it matters |
| --- | --- |
| Agent-native framework core | Agents inspect routes, related files, safe edit zones, and affected checks through structured data. |
| Needle Map | A semantic dependency graph connects routes, components, APIs, schemas, tests, SEO, cache tags, ownership, and risk. |
| SEO engine built in | Public routes ship with metadata, canonical URLs, sitemap support, robots output, structured data, and audits. |
| Route-mode compiler | Every route compiles to static, prerendered, SSR, streaming SSR, edge-compatible, client-only, or hot API mode. |
| Hot API path | Selected API routes bypass generic framework handling through generated Bun handlers, validators, serializers, and caches. |
| Large-app safety | Ownership, affected tests, route budgets, dependency boundaries, and agent permissions are first-class. |
| Vite ecosystem first | NeedleStart uses Vite/Rolldown for the frontend build and keeps framework intelligence in the Needle compiler. |

## Strategic Technology Stack

NeedleStart starts with:

- Bun for runtime, package management, test execution, and production server paths.
- Vite/Rolldown for React frontend builds, HMR, CSS, assets, and ecosystem compatibility.
- A custom Needle compiler for route graph, render modes, SEO graph, agent context, app map, API codegen, and deploy manifests.
- A custom Bun server runtime for static files, SSR, streaming, cache handling, API routes, and hot API handlers.
- Early Node adapter support so Bun is the speed default, not an adoption blocker.
- Additional deployment adapters later.

The framework should avoid building a custom bundler until the product wedge is proven.

## Monorepo Target Structure

```txt
needlestart/
  package.json
  bun.lock
  tsconfig.base.json
  AGENTS.md
  README.md
  VISION.md
  ARCHITECTURE.md
  CONTRIBUTING.md
  packages/
    create-needle/
    cli/
    core/
    compiler/
    vite-plugin/
    react/
    server-bun/
    router/
    seo/
    map/
    agent/
    mcp/
    cache/
    schema/
    devtools/
    adapters/
      bun/
      node/
      static/
  examples/
    basic/
    blog-seo/
    ecommerce/
    dashboard/
    agent-demo/
  playgrounds/
    large-app-fixture/
  tests/
    integration/
    fixtures/
    performance/
  docs/
```

## Product Layers

NeedleStart is built as five layers:

1. Developer framework: file routes, layouts, React rendering, metadata, API routes, and CLI.
2. Compiler: route graph, render modes, server/client splitting, SEO generation, codegen, and manifests.
3. Runtime: Bun server, request handling, SSR, streaming, static serving, cache, and hot APIs.
4. Agent Kernel: AGENTS.md generation, context capsules, MCP server, safe edits, plans, and diagnostics.
5. Needle Map: semantic dependency graph, impact analysis, affected checks, visual map, ownership, and risk.

The runtime must stay small. Build-time compiler output should carry the complexity.

## Prototype Goal

The first credible prototype proves:

1. A developer can create an app with one command.
2. The app has file-based routes.
3. Routes render React.
4. Public pages are SEO-safe by default.
5. Static and SSR routes both work.
6. API routes work.
7. Hot API routes use generated validators and serializers.
8. The framework generates a route manifest.
9. The framework generates a semantic Needle Map.
10. The framework exposes an MCP server for agents.
11. An AI agent can inspect routes, edit a page, run affected checks, and update related files.
12. Build output can run on Bun.

## First Prototype Sequence

1. Monorepo skeleton.
2. Route discovery.
3. Vite dev integration.
4. React SSR and hydration.
5. Layouts and params.
6. Static build.
7. Bun server.
8. Metadata and SEO audit.
9. API routes.
10. Hot API schema path.
11. Needle Map file graph.
12. Agent context.
13. MCP read-only server.
14. Safe metadata edit.
15. Node adapter baseline.
16. Migration prototype.

## Public API Draft

```ts
import { defineMeta, staticPage } from "needlestart"

export const render = staticPage()

export const meta = defineMeta({
  title: "NeedleStart Demo",
  description: "A fast, SEO-first, agent-native React app.",
  canonical: "/",
})

export default function HomePage() {
  return (
    <main>
      <h1>Build fast React apps agents can understand</h1>
    </main>
  )
}
```

```ts
import { apiHot, schema } from "needlestart"

export const render = apiHot({
  validate: true,
  serialize: "generated",
  cache: { ttl: "100ms" },
})

export const params = schema.object({
  id: schema.uint64(),
})

export const response = schema.object({
  id: schema.uint64(),
  name: schema.string(),
  plan: schema.enum(["free", "pro", "enterprise"]),
})

export async function GET({ params }) {
  return {
    id: params.id,
    name: "Ada",
    plan: "pro",
  }
}
```

## Documentation

Start here:

- [Vision](VISION.md)
- [Architecture](ARCHITECTURE.md)
- [Contributing](CONTRIBUTING.md)
- [Agent Rules](AGENTS.md)
- [Documentation Hub](docs/README.md)
- [Roadmap](docs/roadmap.md)
- [Risk Mitigation](docs/risk-mitigation.md)
- [Adapter Architecture](docs/adapters.md)
- [Safe Edit Transactions](docs/safe-edit-transactions.md)
- [Migration Tooling](docs/migration.md)
- [Prototype Acceptance Demo](docs/prototype-acceptance.md)
- [Task Template](docs/templates/task-template.md)
- [AI Skill Playbooks](skills/README.md)
- [AI Subagent Roles](subagents/README.md)

## Current Status

This repository is in Phase 0: project constitution and planning.

No runtime implementation exists yet. The current work is to lock the product direction, architecture boundaries, package responsibilities, documentation rules, agent workflow, and vendor-neutral AI collaboration playbooks before implementation begins.

The next implementation stage is Phase 1: monorepo skeleton, then route discovery.

## Philosophy

NeedleStart treats the semantic app graph and agent collaboration as first-class concerns from day one, not late add-ons. The compiler does the heavy lifting so the runtime stays small and predictable.

The project was initially shaped with AI-assisted architecture and roadmap planning. Implementation and release decisions remain human-accountable, with agents expected to work through documented contracts, tests, and safety checks.

## License

MIT.
