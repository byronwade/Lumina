# MVP Alpha Scope

Status: Planned.
Audience: maintainers, framework contributors, AI agents, early prototype users.

This page defines the first Lumina MVP Alpha target. It is a target scope, not a claim that framework behavior exists today.

## Current Evidence

The repository currently has the Phase 1 scaffold: Bun workspace, package placeholders, shared `@lumina/core` scaffold types, initial `@lumina/compiler` route discovery and route manifest shaping, CI, and verification scripts. It does not yet have CLI behavior, generated `.lumina/*` artifacts, rendering, or Lumina Map generation.

## MVP Alpha Goal

MVP Alpha should prove that a small React app can be created, discovered, rendered, mapped, inspected, and explained through Lumina's compiler and CLI.

## Included In MVP Alpha

- Create a demo app from the workspace or `bun create lumina` target flow.
- Discover file-based routes from `app/`.
- Support a root layout and basic pages.
- Support explicit render modes for `staticPage()` and a minimal SSR mode.
- Generate `.lumina/routes.json`.
- Generate `.lumina/render-manifest.json`.
- Generate `.lumina/map.json` as the first Lumina Map output.
- Expose `lumina routes --json`.
- Expose `lumina inspect --json`.
- Expose `lumina inspect why`.
- Include a demo app that shows the Lumina Map and inspection workflow.
- Keep JSON output deterministic and compact.
- Add the early benchmark and fixture skeleton with `not implemented` status only, so later speed work has stable paths before public claims exist.
- Document the large-repo workspace graph lane before route discovery expands, without implementing multi-app runtime behavior in MVP Alpha.

## Deferred Until After MVP Alpha

- API routes.
- Hot API schemas.
- Full SEO engine.
- Full cache system.
- MCP server.
- Safe edit writes.
- Agent context capsules beyond a basic map-informed explanation.
- Node adapter runtime.
- Static export adapter.
- Migration tooling.
- Benchmark publishing, public comparisons, and performance claims.
- Implemented multi-app workspace builds, split-app mutation, and distributed cache behavior.
- Devtools dashboard.

## MVP Demo App

The first demo app should contain:

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/(marketing)/pricing/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/Hero.tsx`
- `components/PricingCard.tsx`
- `lumina.config.ts`

The demo should prove route discovery, render mode extraction, generated manifests, Lumina Map nodes and edges, and `lumina inspect why`.

## Verification Required Before Calling MVP Alpha Ready

- Fresh `bun run check` passes.
- MVP fixture tests prove route discovery, manifest output, map output, and inspect output.
- Generated JSON snapshots are deterministic.
- README, AGENTS, status, roadmap, getting started, examples, file conventions, and Lumina Map docs agree on MVP scope.
- Public docs do not claim future features exist.

## Out Of Scope

- Replacing long-term contracts with MVP-only contracts.
- Weakening documentation standards.
- Claiming implementation exists before code and tests prove it.
