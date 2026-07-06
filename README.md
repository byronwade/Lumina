# NeedleStart

**The first app-graph-native, SEO-first React framework for humans and AI agents.**

NeedleStart gives you familiar React meta-framework ergonomics: file-based routes, layouts, SSR/SSG, metadata, APIs, and deployment adapters. It adds the missing layer modern large apps need: a first-class semantic app graph that explains routes, render modes, cache behavior, SEO surfaces, tests, ownership, and safe edit boundaries.

Your app ships with a map.

Build like Next.js.

Type like TanStack.

Ship fast with Bun and Vite.

Let humans and AI agents understand, audit, change, and verify your app through structured framework data instead of spelunking the whole repo.

NeedleStart is an app-graph-native, SEO-first React framework for building fast, large-scale web applications with a semantic map of every route, component, API, schema, test, cache, content, ownership, and risk relationship.

The goal is not to clone Next.js. The goal is to win a newer category:

> The React framework where your app ships with a map.

NeedleStart is MIT-licensed and intended to be built fully in public as an open source community project.

## Product Thesis

Modern React applications fail when they become too large to reason about. Routes drift away from tests, components drift away from schemas, cache behavior hides behind framework magic, SEO regressions hide inside client-heavy rendering, and AI agents waste context guessing how files relate to each other.

NeedleStart exists to make the framework itself the map of the application.

## Quick Start

Planned command once the package exists:

```bash
bun create needle my-app
cd my-app
needle dev
```

Generated apps should also expose package scripts:

```bash
bun run dev
bun run build
bun run start
```

This repository is not yet at package-publish stage. Until the monorepo is scaffolded, these commands are target UX rather than verified local commands.

## Key Features

- App-graph-native core: Needle Map, context capsules, stable manifests, MCP read tools, and safe edit transactions.
- Explainable framework behavior: `needle inspect why` should show why routes are static, SSR, cached, indexable, or risky.
- SEO by default: public routes ship with meaningful HTML, metadata, sitemaps, structured data, audits, and accessibility-aware diagnostics.
- No invisible caching: every cacheable route, API, component, or function exposes a cache plan and cache tags.
- Hot API paths: generated validators, serializers, and micro-caching for performance-critical API routes.
- Explicit render modes: `staticPage()`, `prerender()`, `ssr()`, `stream()`, `clientOnly()`, and `apiHot()`.
- Bun and Vite foundation: fast local workflow and runtime paths with frontend ecosystem leverage.
- Adapter-aware deployment: Bun by default, with Node and static compatibility planned early.
- Agent-safe workflows: safe edits are AST-based, previewable, logged, check-backed, and reversible.
- Large-app safety: ownership, affected checks, dependency graph, route budgets, package boundaries, and risk visibility.

## Positioning

NeedleStart should be explained in this order:

1. App-graph-native: the framework where the application explains itself.
2. SEO-safe, cache-explicit, and fast by default.
3. Agent-safe workflows through stable JSON, MCP, context capsules, and safe edits.
4. Familiar React meta-framework ergonomics.

## Wedge

NeedleStart combines:

- A semantic app map as a first-class framework primitive.
- Explicit render and cache behavior with `why` explanations.
- Next-level routing familiarity.
- TanStack-level type-safety ambition.
- Bun-speed runtime paths.
- Vite and Rolldown ecosystem leverage.
- SEO-first public HTML.
- Agent-native development through stable contracts.
- Safe edit transactions instead of free-form agent writes.
- A hot API path for performance-critical endpoints.
- Benchmarks and public docs that do not overclaim.

## Core Promise

Build like a familiar React meta-framework.

Type like a route-safe full-stack toolkit.

Ship static HTML whenever possible.

Run server paths through a small adapter-aware runtime when needed.

Ask the framework why a route renders, caches, indexes, bundles, or breaks the way it does.

Let humans and agents inspect and modify the app through structured framework data instead of reading the whole repository.

## Differentiators

| Differentiator | Why it matters |
| --- | --- |
| App-graph-native framework core | The framework emits a structured map of routes, components, APIs, schemas, tests, SEO, cache tags, ownership, and risk. |
| Needle Map | Humans and agents can ask what uses this, what breaks if this changes, which tests should run, and which routes are affected. |
| Explainable render/cache behavior | `why` fields and inspect commands reduce hidden framework magic. |
| SEO engine built in | Public routes ship with metadata, canonical URLs, sitemap support, robots output, structured data, meaningful HTML, and audits. |
| Route-mode compiler | Every route compiles to static, prerendered, SSR, streaming SSR, client-only, API, or hot API mode. |
| Hot API path | Selected API routes bypass generic framework handling through generated handlers, validators, serializers, and caches. |
| Agent-safe edit system | Agents use scoped, previewable, check-backed, reversible transactions rather than broad file edits. |
| Large-app safety | Ownership, affected tests, route budgets, dependency boundaries, and agent permissions are first-class. |
| Vite ecosystem first | NeedleStart uses Vite/Rolldown for the frontend build and keeps framework intelligence in the Needle compiler. |

## Strategic Technology Stack

NeedleStart starts with:

- Bun for package management, test execution, local workflow, and the default production adapter path.
- Vite/Rolldown for React frontend builds, HMR, CSS, assets, and ecosystem compatibility.
- A custom Needle compiler for route graph, render modes, SEO graph, agent context, app map, API codegen, cache plans, and deploy manifests.
- Adapter packages for production output: Bun first, then Node and static paths early enough to reduce adoption friction.
- Stable JSON manifests as shared contracts for CLI, runtime adapters, MCP, devtools, benchmarks, docs, and agents.
- Additional deployment adapters later.

The framework should avoid building a custom bundler until the app-graph and agent-safe wedge is proven.

## Open Source and Community

NeedleStart is intended to be a fully open source project.

The project includes or plans:

- MIT license.
- Code of Conduct.
- Contributing guide.
- Security policy.
- Governance model.
- Public roadmap.
- Public project status matrix.
- Public docs and reproducible benchmark methodology.
- Contributor-friendly issue and pull request templates.

NeedleStart also intends to host its public docs, preview deployments, examples, and benchmark result pages on Vercel where appropriate, while keeping the framework adapter-aware and deployable beyond Vercel.

Open source and Vercel program readiness are tracked in [Open Source Community and Vercel Program Readiness](docs/open-source-community.md).

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
  SECURITY.md
  CODE_OF_CONDUCT.md
  GOVERNANCE.md
  packages/
    create-needle/
    cli/
    core/
    compiler/
    vite-plugin/
    react/
    router/
    seo/
    map/
    agent/
    mcp/
    cache/
    schema/
    devtools/
    adapter-bun/
    adapter-node/
    adapter-static/
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
2. Compiler: route graph, render modes, server/client splitting, SEO generation, cache plans, codegen, explanations, and manifests.
3. Runtime and adapters: Bun, Node, and static output paths consume generated artifacts and serve built apps.
4. Agent Kernel: AGENTS.md generation, context capsules, MCP server, safe edits, plans, and diagnostics.
5. Needle Map: semantic dependency graph, impact analysis, affected checks, visual map, ownership, cache, SEO, and risk.

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
8. The framework generates route and render manifests.
9. The framework explains route, render, cache, and SEO decisions in stable JSON.
10. The framework generates a semantic Needle Map.
11. The framework exposes read-only MCP tools for agents.
12. An AI agent can inspect routes, edit metadata safely, run affected checks, and report the mutation log.
13. Build output can run on the Bun adapter, with Node and static adapter paths documented.
14. Public docs, examples, and benchmark reports can be hosted as open source project infrastructure.

## First Prototype Sequence

1. Monorepo skeleton.
2. Core data model.
3. Adapter package baseline.
4. Route discovery.
5. Stable CLI JSON envelope.
6. `needle inspect` and `needle inspect why`.
7. Vite dev integration.
8. React SSR and hydration.
9. Layouts and params.
10. Static build.
11. Adapter-aware Bun server.
12. Metadata and SEO audit.
13. Cache manifest baseline.
14. API routes.
15. Hot API schema path.
16. Needle Map file graph.
17. Agent context.
18. MCP read-only server.
19. Safe metadata edit.
20. Node adapter baseline.
21. Migration prototype.

## Public API Draft

```ts
import { defineMeta, staticPage } from "needlestart"

export const render = staticPage()

export const meta = defineMeta({
  title: "NeedleStart Demo",
  description: "A fast, SEO-first, app-graph-native React app.",
  canonical: "/",
})

export default function HomePage() {
  return (
    <main>
      <h1>Build fast React apps that ship with a map</h1>
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

- [Project Status](docs/status.md)
- [Product Strategy](docs/product-strategy.md)
- [Documentation Hub](docs/README.md)
- [Roadmap](docs/roadmap.md)
- [CLI Contract](docs/cli.md)
- [Configuration Contract](docs/config.md)
- [Routing Contract](docs/routing.md)
- [Manifest Contracts](docs/manifest-contracts.md)
- [Open Source Community and Vercel Program Readiness](docs/open-source-community.md)
- [Public Docs Publishing Contract](docs/public-docs.md)
- [Website Content Map](docs/website-content-map.md)
- [Benchmark System](docs/benchmarks.md)
- [Benchmark Methodology](docs/benchmark-methodology.md)
- [Security and Threat Model](docs/security.md)
- [Testing Strategy](docs/testing.md)
- [Release Policy](docs/release.md)
- [Examples Strategy](docs/examples.md)
- [Comparison Positioning](docs/comparisons.md)
- [Accessibility Strategy](docs/accessibility.md)
- [Compatibility Policy](docs/compatibility.md)
- [Frontier Skills and Subagents Builder Prompt](docs/prompts/frontier-skills-subagents-prompt.md)
- [Risk Mitigation](docs/risk-mitigation.md)
- [Prototype Acceptance Demo](docs/prototype-acceptance.md)
- [Task Template](docs/templates/task-template.md)

## Current Status

This repository is in Phase 0: project constitution and planning.

No runtime implementation exists yet. The current work is to lock the product direction, architecture boundaries, package responsibilities, documentation rules, command contracts, generated artifact contracts, public docs publishing contracts, benchmark methodology, open source community governance, and agent workflow before implementation begins.

The next implementation stage is Phase 1: monorepo skeleton, core data model, adapter package baseline, then route discovery.

## Philosophy

NeedleStart treats the semantic app graph, open source community, and agent collaboration as first-class concerns from day one, not late add-ons. The compiler does the heavy lifting so runtime and adapters stay small and predictable.

The project was initially shaped with AI-assisted architecture and roadmap planning. Implementation and release decisions remain human-accountable, with agents expected to work through documented contracts, tests, and safety checks.

## License

MIT.
