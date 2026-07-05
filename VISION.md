# Vision

NeedleStart exists because the next generation of web frameworks must help both humans and AI agents understand the application they are changing.

The framework should make applications faster to ship, easier to audit, safer to modify, better for SEO, and better at exposing their own structure.

NeedleStart's market push is simple:

```txt
Your app ships with a map.
```

## One-Sentence Pitch

NeedleStart is the app-graph-native React framework for building SEO-safe, agent-safe, large-scale web apps with a semantic map of every route, component, API, schema, test, cache, content, ownership, and risk relationship.

## The Enemy

The enemy is not a specific framework.

The enemy is the large React application that becomes:

- Slow to render.
- Hard to reason about.
- Expensive for agents to modify.
- Fragile for SEO.
- Confusing about cache behavior.
- Painful to scale.
- Difficult to test incrementally.
- Dangerous to refactor.
- Full of framework magic no one can explain.

## Market Promise

NeedleStart should let teams:

- Build with familiar React framework ergonomics.
- Get route-level type safety.
- Ship static HTML when possible.
- Use Bun for low-overhead runtime paths.
- Keep Node and static deployment paths credible.
- Run hot APIs outside React when performance matters.
- See why every route renders, caches, indexes, bundles, and deploys the way it does.
- Give AI agents structured application context.
- See what every file affects before making changes.
- Change safe surfaces through previewable, check-backed, reversible transactions.

Short form:

- Build like Next.js.
- Type like TanStack Start.
- Ship like a static site when possible.
- Run like a low-level adapter-aware server when needed.
- Let humans and agents inspect, plan, and safely edit through a native semantic graph instead of searching the repo.

## What NeedleStart Should Own

NeedleStart should own the category of app-graph-native, SEO-safe, agent-safe React applications.

The core bet is that large applications need a framework-level map. A framework that provides a semantic app graph, explainable render/cache behavior, safe edit APIs, affected checks, and MCP tools will be easier for humans and AI agents to operate than a framework that only provides file routing and rendering.

## Product Pillars

### App-Graph Native

NeedleStart must make the app graph a first-class framework contract:

- Routes.
- Layouts.
- Components.
- APIs.
- Schemas.
- Tests.
- Metadata.
- Cache tags.
- Content.
- Ownership.
- Risk.
- Generated files.
- Explanations for render, cache, SEO, and graph decisions.

### Agent-Safe

NeedleStart must generate useful context and safe workflows for agents:

- Route context capsules.
- Related files.
- Impact maps.
- Safe edit zones.
- Mutation logs.
- Stable JSON diagnostics.
- MCP read tools before write tools.
- Safe edit transactions that are AST-based, previewable, logged, check-backed, and reversible.

### SEO-Safe

Public pages must render meaningful HTML by default. The framework should make title, description, canonical URL, sitemap inclusion, robots behavior, Open Graph tags, structured data, accessibility-relevant structure, and initial HTML inspectable.

### Explainable by Default

NeedleStart must answer:

- Why is this route static?
- Why is this route dynamic?
- Why is this cached?
- Why is this not cached?
- Why is this page indexable?
- Why did this route ship this JavaScript?
- Why are these tests affected?
- Why is this edit safe or unsafe?

`needle inspect why` should become one of the clearest expressions of the product.

### Runtime-Light

The runtime should stay small. The compiler should do the heavy work at build time:

- Route discovery.
- Render mode classification.
- Metadata extraction.
- Cache plan extraction.
- API validator generation.
- Serializer generation.
- Graph construction.
- Agent context generation.
- Deployment manifests.
- Explanation generation.

### Large-App Ready

Large applications are not an enterprise afterthought. The framework must support ownership, boundaries, affected checks, budgets, graph caching, dead route detection, package-level rules, and monorepo-scale fixtures.

## Product Promises

### App Map Promise

No more operating without a map. Every app should expose the relationships that matter: routes, components, APIs, schemas, tests, SEO surfaces, cache tags, owners, generated files, and risk.

### SEO Promise

No SEO archaeology. Every public route ships meaningful HTML with explicit metadata, canonicals, and sitemaps.

### Explainability Promise

No invisible framework magic. Render, cache, SEO, adapter, and graph decisions should be visible through stable JSON and human-readable commands.

### Agent Promise

Your framework should be the map, not the maze. Agents can inspect, plan changes, run affected checks, and apply safe edits through structured tools.

### Needle Map Promise

Needle Map should answer instantly: what uses this, what does this use, what breaks if this changes, and which tests, SEO surfaces, cache tags, generated files, and owners are affected.

## What NeedleStart Is Not

NeedleStart is not:

- A clone of Next.js.
- A custom bundler project at the start.
- A CMS.
- An ORM.
- A cloud platform.
- A visual editor.
- A framework that ships agent metadata to production.
- A framework that hides caching behavior.
- A framework that claims AI-safe edits without rejection tests.
- A framework that publishes benchmark claims without raw data.

## Positioning

NeedleStart is not trying to clone Next.js. It is building a new category: a framework designed from the ground up for large applications that need a semantic app graph, explainable behavior, SEO-safe output, and AI-agent-safe workflows.

The public message:

```txt
NeedleStart is the React framework where your app ships with a map.
```

## Success Criteria

NeedleStart becomes credible when it can say:

- Create a React app with one command.
- Render SEO-safe pages.
- Serve with the Bun adapter.
- Keep Node and static adapter paths documented and tested.
- Run hot APIs.
- Generate route and render manifests.
- Explain runtime, render, SEO, cache, adapter, and graph behavior in stable JSON.
- Generate a semantic app graph.
- Let an agent inspect and safely edit the app.
- Run affected checks after changes.
- Undo safe edits.
- Publish public docs and benchmarks that are status-aware, reproducible, and honest about limitations.
