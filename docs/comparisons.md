# Comparison Positioning

NeedleStart should be honest about what it is, what it is not, and when another framework is the better choice.

This document is a positioning guide for contributors, docs, examples, and future launch material. It is not a benchmark claim and should not pretend that planned features are implemented.

## Core Position

NeedleStart is not trying to win by cloning existing React frameworks. It is trying to win a newer category:

```txt
App-graph-native, SEO-safe, agent-safe React applications.
```

Public shorthand:

```txt
NeedleStart is the React framework where your app ships with a map.
```

The positioning order is:

1. App-graph-native: the framework where the application explains itself.
2. SEO-safe, cache-explicit, and fast by default.
3. Agent-safe workflows through stable JSON, MCP, context capsules, and safe edits.
4. Familiar React meta-framework ergonomics.

## Comparison Rules

- Be specific.
- Explain tradeoffs.
- Do not claim performance without benchmarks.
- Do not claim parity before implementation exists.
- Include "choose the other tool when" sections.
- Keep planned behavior clearly marked as planned.
- Compare NeedleStart's app-graph-native wedge, not just routing features.

## NeedleStart vs Next.js

NeedleStart should feel familiar to developers who know file-based React frameworks, but its wedge is different.

NeedleStart aims to lead on:

- Native semantic app graph.
- Explainable render and cache behavior.
- `needle inspect why` for route, file, render, cache, SEO, adapter, and graph decisions.
- Agent context capsules.
- MCP-friendly route and graph inspection.
- Safe edit transactions.
- SEO-safe public route defaults.
- Explicit render modes.
- No invisible caching.
- Bun default path with adapter-aware output.
- Hot API routes with generated validators and serializers.

Next.js is likely the better choice when:

- You need a mature production ecosystem today.
- You depend on established hosting integrations.
- You need mature RSC behavior now.
- You need broad community examples immediately.
- Your team wants the default industry choice more than a new app-graph-native workflow.

NeedleStart should not claim Next.js parity early. The first credible demo should prove the app graph, explainability, and agent-safe workflow, not every framework feature.

## NeedleStart vs TanStack Start

NeedleStart shares interest in typed, explicit full-stack behavior, but it should not try to become TanStack Start with a different logo.

NeedleStart aims to lead on:

- Framework-generated semantic app map.
- Render, cache, and SEO explanations as generated contracts.
- Agent-oriented context and safe edit APIs.
- SEO-first route auditing.
- Hot API compiler path.
- Build-time manifests as a cross-tool contract.
- App graph visibility for APIs, schemas, cache tags, tests, routes, and ownership.

TanStack Start may be the better choice when:

- You want TanStack Router and ecosystem alignment.
- You prioritize type-safe routing and data APIs over app graph and agent-safe workflows.
- You want a smaller conceptual framework surface.
- You are comfortable adopting a younger type-safe full-stack framework without NeedleStart's map/edit contracts.

## NeedleStart vs Remix / React Router Framework Mode

NeedleStart can learn from explicit web fundamentals, but its differentiator is the compiler and graph layer.

NeedleStart aims to lead on:

- Route graph and impact analysis.
- Framework-generated explanations for route and render behavior.
- Agent planning and context output.
- SEO reports and generated manifests.
- Adapter-aware build output.
- Safe edit transactions.
- Affected checks from app graph data.

Remix or React Router framework mode may be the better choice when:

- You want mature web-standard data APIs today.
- You value established routing conventions over a new compiler graph.
- You do not need app-graph-native repository workflows.
- You do not need agent-safe edit contracts.

## NeedleStart vs Astro

Astro is strong for content-heavy, island-style websites. NeedleStart should be compared carefully and honestly.

NeedleStart aims to lead on:

- React-first app framework ergonomics.
- App graph for large React apps.
- Agent-safe edit workflows.
- Full-stack API and hot API paths.
- Large React app impact analysis.
- SEO-safe public HTML with app-level relationships, cache tags, tests, and ownership in the graph.

Astro may be the better choice when:

- You are primarily building a content site.
- You want mature partial hydration or island architecture today.
- You need broad content integrations immediately.
- You do not need a React app graph or agent-safe edit system.

NeedleStart should learn from Astro's public HTML discipline and docs quality without becoming a CMS.

## NeedleStart vs Vite App Plus Custom Server

NeedleStart uses Vite/Rolldown for frontend build leverage, but it adds framework intelligence around it.

NeedleStart aims to provide:

- File-based routing.
- Render modes.
- Render and cache explanations.
- SEO manifests.
- API route conventions.
- Hot API compiler.
- Needle Map.
- Agent context and MCP.
- Safe edits.
- Adapter output.
- Public docs and benchmark contracts.

A plain Vite app plus custom server may be better when:

- Your app is small.
- You do not need SSR/SSG conventions.
- You prefer full custom control.
- You do not need app-graph-native framework contracts.

## NeedleStart vs A Generic Agent Rules File

A rules file can tell agents what to do. NeedleStart aims to give agents structured framework data.

NeedleStart aims to provide:

- Route context capsules.
- Related files.
- Impact maps.
- Stable diagnostics.
- Render, cache, and SEO explanations.
- Safe edit allow-lists.
- Mutation logs.
- MCP tools.

A generic rules file may be enough when:

- The repo is small.
- Edits are simple.
- There is no need for generated graph data.
- Agent mistakes are low risk.

## What NeedleStart Should Not Compete On Early

Do not prioritize these before the wedge is proven:

- Full custom bundler.
- Full RSC parity.
- Edge runtime from day one.
- Visual editor.
- CMS product.
- ORM.
- Auth platform.
- Plugin marketplace.
- Enterprise cloud dashboard.

## Messaging Patterns

Use:

```txt
NeedleStart is the React framework where your app ships with a map.
```

Use:

```txt
NeedleStart gives agents and humans a map of the app, not just a folder tree.
```

Use:

```txt
Bun is the speed default. Node and static adapters are planned early so Bun is not an adoption trap.
```

Use:

```txt
The compiler emits stable manifests so CLI, runtime, MCP, devtools, SEO, cache, benchmarks, docs, and agents agree on the same app model.
```

Avoid overclaiming that NeedleStart replaces mature frameworks, is faster than everything, or makes every agent edit safe.

## Launch Comparison Checklist

Before publishing comparison material, verify:

- Implementation status is current in `docs/status.md`.
- Performance claims have benchmark links.
- Feature claims are implemented or clearly marked planned.
- Security-sensitive claims mention safe edit gates.
- Adapter claims match `docs/deployment.md`.
- App graph and inspect/explain claims match implemented manifests and CLI output.
- Examples exist for the workflows being promoted.

## Documentation Rule

Update this file when:

- Positioning changes.
- A major feature is deferred or removed.
- Benchmark data becomes available.
- A new comparison target becomes important.
- A launch page or README uses comparison language.
