# Comparisons

Status: Planned.

Audience: future website visitors, app developers, maintainers.

Comparison docs should help users understand fit, not attack other projects.

## Principles

- Compare specific workflows.
- Cite sources.
- Separate current implementation from vision.
- Be explicit about what Lumina does not do.
- Avoid performance claims without benchmarks.
- Prefer official documentation and reproducible fixtures over blog summaries.
- Compare adoption tradeoffs honestly; Lumina should not pretend it is the default choice for every React app.

## Current Status

Comparison pages are planned. Lumina does not yet have route discovery, rendering, CLI behavior, runtime adapter behavior, benchmark fixtures, or public performance evidence. Any comparison written before those features exist must describe planned intent and current gaps.

## Planned Comparisons

- Lumina and Next.js.
- Lumina and TanStack Start.
- Lumina and Astro.
- Lumina and SvelteKit.
- Lumina and Nuxt.
- Lumina and Vite-based custom stacks.

## Comparison Map

Use this map as the source of truth for future public comparison pages.

### Where Lumina Is Not Competing Yet

Lumina should not claim parity with mature production frameworks until the implementation and fixtures exist.

Do not claim competition yet on:

- production App Router maturity,
- hosting integrations,
- plugin ecosystem,
- image optimization,
- auth examples,
- server actions,
- package publishing,
- migration depth,
- benchmark-backed runtime performance.

These areas stay planned until the relevant implementation, docs, examples, and tests exist.

### Where Lumina Intends To Beat Next.js

Next.js is the comparison bar for React framework adoption, routing, data fetching, Server Components, caching, and deployment ergonomics. Lumina should not compete by copying every feature first.

Lumina's intended wedge against Next.js is:

- app graph as a first-class generated artifact,
- explicit route, render, cache, SEO, ownership, generated-file, and agent-context contracts,
- `why` explanations for route and cache behavior,
- agent-safe edit transactions instead of free-form code mutation,
- large-workspace affected builds and shared-file impact output.

Required evidence before public claims:

- equivalent demo app,
- route and render manifest snapshots,
- map and affected-query snapshots,
- CLI JSON output snapshots,
- benchmark fixtures with raw data for any speed claim.

### Where Lumina Differs From TanStack Start

TanStack Start is router-first and type-safety-oriented. Lumina should respect that strength and avoid vague type-safety claims.

Lumina's planned difference is not "types instead of router." It is:

- compiler-owned app and workspace graph output,
- SEO and cache diagnostics as framework contracts,
- generated route context capsules for humans and agents,
- safe edit and MCP plans anchored to the same graph,
- large-repo workspace graph output as a product surface.

Required evidence before public claims:

- type-safe route examples that compile,
- CLI JSON output that exposes route and graph evidence,
- agent context examples that use bounded graph slices,
- side-by-side workflow docs for route inspection and affected checks.

### Where Lumina Overlaps With Astro

Astro owns a strong static-first, content-driven story with islands architecture and content collections. Lumina should not claim static-first performance leadership without measured evidence.

Lumina overlaps with Astro on:

- static-first public pages,
- content and docs-site use cases,
- SEO-first public HTML,
- minimizing client JavaScript when interactivity is not needed.

Lumina's planned difference is:

- React-framework ergonomics rather than `.astro` component syntax,
- route/render/cache/SEO graph output for each app,
- workspace graph and affected build surfaces,
- agent context and safe edit workflows as first-class contracts.

Required evidence before public claims:

- static HTML fixture,
- public docs-site fixture,
- route JS and CSS budgets,
- Core Web Vitals or browser evidence when making browser-performance claims.

### Why Large-Workspace Graph Intelligence Is The Wedge

The strategic wedge is not "another router." It is framework-owned application intelligence that stays useful as apps get too large to reason about manually.

Future comparison pages should show how Lumina answers:

- Which routes depend on this shared component?
- Which generated artifacts need regeneration?
- Which tests should run after this schema change?
- Why is this route static, SSR, client-only, or not cacheable?
- What context should an agent read before editing this page?
- What safety checks are required before applying this mutation?

This is where Lumina should compete hardest: transparent app structure, affected work, and agent-safe workflows.

## Source Requirements

Future comparison pages should cite:

- official framework docs for the compared feature,
- Lumina source docs for the planned or implemented behavior,
- exact commands and fixture names for reproduced behavior,
- raw benchmark result paths for performance claims.

Current primary source anchors:

- [Next.js App Router caching](https://nextjs.org/docs/app/getting-started/caching)
- [Next.js data fetching](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [TanStack Start overview](https://tanstack.com/start/latest/docs/framework/react/overview)
- [TanStack Start server functions](https://tanstack.com/start/v0/docs/framework/react/guide/server-functions)
- [Astro Islands architecture](https://docs.astro.build/en/concepts/islands/)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)

## Out Of Scope

- Claiming parity before features exist.
- Ranking frameworks by generic superiority.
- Benchmark comparisons without methodology and raw data.
- Dismissing competing frameworks for tradeoffs that Lumina has not proven it solves.
