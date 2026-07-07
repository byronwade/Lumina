# MVP Alpha Scope

Status: Planned.
Audience: maintainers, framework contributors, AI agents, early prototype users.

This page defines the first Lumina MVP Alpha target. It is a target scope, not a claim that framework behavior exists today.

## Current Evidence

The repository currently has the Phase 1 scaffold: Bun workspace, package placeholders, shared `@lumina/core` scaffold types, `@lumina/react` `staticPage()` / `ssr()` helpers, `@lumina/compiler` route discovery and explicit static/SSR render-mode extraction, MVP Bun `lumina.config.ts` parsing and diagnostics, generated `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json` output with direct local import edges, `.lumina/client/*.js` dev hydration bundle output, `dist/public/_lumina/client/*.js` production hydration bundle output, `.lumina/generated/server-entry.ts`, generated `dist/server/ssr-routes.js` output for explicit SSR page routes, browser-verified interactive dev and production root-route hydration, `.lumina/hmr-report.json` output for route files and direct local imported component affected-route reports, `.lumina/build-trace.json`, and `.lumina/perf.report.json` output, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina map affected --json`, `lumina bench --list --json`, minimal `lumina dev` timed startup output and Vite SSR route serving with dynamic and catch-all page route params plus search params and not-found/error components, `virtual:lumina/routes`, static/SSR `lumina build` with timed human phase output, static/SSR `lumina start`, scaffolded `apps/www`, verified `examples/basic` starter evidence, runnable `examples/blog-seo` content evidence, runnable generated large-route fixture evidence for deterministic route discovery, generated artifacts, CLI JSON, and manifest-size readiness, scaffolded multi-app workspace source fixtures, CI, and verification scripts. It does not yet have broader component-level browser HMR verification, production API serving, benchmark execution commands, or broader Lumina Map query CLI behavior.

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
- Parse the MVP Bun `lumina.config.ts` fields and emit adapter-aware build output.
- Expose `lumina routes --json`.
- Expose `lumina inspect --json`.
- Expose `lumina inspect why`.
- Expose a minimal `lumina map affected --json` route-impact query for direct local imports.
- Expose `lumina bench --list --json` for honest benchmark skeleton status without running benchmarks.
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

## MVP Marketing App Fixture

The first `apps/www` fixture contains:

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/docs/page.tsx`
- `app/benchmarks/page.tsx`
- `app/examples/page.tsx`
- `app/roadmap/page.tsx`
- `components/Hero.tsx`
- `components/FeatureGrid.tsx`
- `components/SpeedPanel.tsx`
- `components/MapPreview.tsx`
- `components/ExampleCard.tsx`
- `lumina.config.ts`

The fixture proves route discovery, generated route/render/map artifacts, direct local import map edges, route-file update reporting, direct local imported component affected-route reporting, Lumina Map nodes and edges, MVP Bun config parsing and diagnostics, `lumina inspect why`, minimal `lumina map affected --json`, `lumina bench --list --json`, `virtual:lumina/routes`, minimal dev-server timed startup output and SSR page rendering for static, dynamic, and catch-all page routes with route `params`, `searchParams`, not-found components, and error components, route-specific dev hydration bundle output, route-specific production hydration bundle output, browser-verified interactive dev and production root-route hydration, static build output with measured human phase timings, `.lumina/generated/server-entry.ts`, generated SSR route bundle output, and static/SSR built-output serving through `@lumina/adapter-bun`. Static and SSR start tests prove built HTML and generated SSR routes can be served after source route files are removed, static and SSR HTML uses `Cache-Control: no-store`, route-specific client assets use immutable cache headers, malformed encoded asset paths return sanitized 400 responses, unknown routes return stable 404 HTML, generated SSR failures return sanitized 500 HTML, and the adapter request path avoids compiler, map, agent, MCP, devtools, docs, and source-discovery imports. Separate fixture tests prove explicit `staticPage()` and `ssr()` render-mode extraction plus diagnostics for unsupported declarations. `examples/basic` is verified as the starter example through dev, build, start, generated artifact, and built-output HTTP tests. `examples/large-100-routes` and `examples/large-1000-routes` are runnable generated fixtures for deterministic route discovery, compact route/render/map artifacts, CLI JSON, and manifest-size readiness. Broader example verification beyond the current starter/content/generated-route fixtures, production API serving, and measured speed evidence remain required before MVP Alpha is ready.

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
