# Vision

Status: Planned.

Audience: maintainers, contributors, AI agents, future website visitors.

Scope: target product direction, not implementation evidence.

NeedleStart exists because the next generation of web frameworks must serve both humans and AI agents.

The framework should make applications faster to ship, easier to audit, safer to modify, and better at exposing their own structure.

## One-Sentence Pitch

NeedleStart is an agent-native React framework for building fast, SEO-safe, large-scale web apps with a semantic map of every route, component, API, schema, test, cache, and content relationship.

## The Enemy

The enemy is not a specific framework.

The enemy is the large React application that becomes:

- Slow to render.
- Hard to reason about.
- Expensive for agents to modify.
- Fragile for SEO.
- Painful to scale.
- Difficult to test incrementally.
- Dangerous to refactor.

## Market Promise

NeedleStart should let teams:

- Build with familiar React framework ergonomics.
- Get route-level type safety.
- Ship static HTML when possible.
- Use Bun for low-overhead runtime paths.
- Run hot APIs outside React when performance matters.
- Give AI agents structured application context.
- See what every file affects before making changes.

Short form:

- Build like Next.js.
- Type like TanStack Start.
- Ship like a static site when possible.
- Run like a low-level Bun server when needed.
- Let agents inspect, plan, and safely edit through a native semantic graph instead of searching the repo.

## What NeedleStart Should Own

NeedleStart should own the category of agent-native, SEO-first, graph-aware React applications.

The core bet is that agents will become normal contributors to large codebases. A framework that provides a semantic app graph, safe edit APIs, affected checks, and MCP tools will be easier for agents and humans to operate than a framework that only provides file routing and rendering.

## Product Pillars

### Agent-Native

NeedleStart is designed to generate useful context for agents:

- Route context capsules.
- Related files.
- Impact maps.
- Safe edit zones.
- Mutation logs.
- Stable JSON diagnostics.
- MCP tools.

### SEO-First

Public pages should render meaningful HTML by default. The framework should make title, description, canonical URL, sitemap inclusion, robots behavior, Open Graph tags, structured data, and initial HTML inspectable.

### Graph-Aware

Needle Map should answer:

- What uses this?
- What does this use?
- What breaks if this changes?
- Which tests should run?
- Which pages are affected?
- Which SEO surfaces are affected?
- Which cache tags are affected?
- Which team owns this?
- Is this safe for an agent to edit?

### Runtime-Light

The runtime should stay small. The compiler should do the heavy work at build time:

- Route discovery.
- Render mode classification.
- Metadata extraction.
- API validator generation.
- Serializer generation.
- Graph construction.
- Agent context generation.
- Deployment manifests.

### Large-App Ready

Large applications are not an enterprise afterthought. The framework must support ownership, boundaries, affected checks, budgets, graph caching, dead route detection, and package-level rules.

## Product Promises

### SEO Promise

No SEO archaeology. Every public route ships meaningful HTML with explicit metadata, canonicals, and sitemaps.

### Agent Promise

Your framework should be the map, not the maze. Agents can inspect, plan changes, run affected checks, and apply safe edits through structured tools.

### Needle Map Promise

Needle Map should make impact questions fast to answer once implementation and benchmarks prove the graph path: what uses this, what does this use, what breaks if this changes, and which tests, SEO surfaces, cache tags, and owners are affected.

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

## Positioning

NeedleStart is not trying to clone Next.js. It is building a new category: a framework designed from the ground up for the era where humans and AI agents collaborate on large applications.

## Success Criteria

NeedleStart becomes credible when it can say:

- Create a React app with one command.
- Render SEO-safe pages.
- Serve with Bun.
- Run hot APIs.
- Generate a route manifest.
- Generate a semantic app graph.
- Let an agent inspect and safely edit the app.
- Run affected checks after changes.
- Explain runtime, SEO, cache, and graph behavior in stable JSON.
