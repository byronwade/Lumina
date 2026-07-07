# Getting Started

Status: Planned.
Audience: new users, app developers, AI agents.

This is the target MVP Alpha onboarding path. The repository currently has the Phase 1 scaffold plus route discovery, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/hmr-report.json`, `.lumina/build-trace.json`, `.lumina/perf.report.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina dev` Vite SSR route serving, `virtual:lumina/routes`, static `lumina build`, static `lumina start`, scaffolded `apps/www`, and scaffolded example fixtures; app creation, client hydration, component-level HMR, and production SSR/API serving are not implemented yet.

## What You Will Build In MVP Alpha

MVP Alpha should create a small React app that Lumina can discover, render, map, and explain. The first experience should make the Lumina Map visible before the framework grows into API routes, MCP tools, safe edits, migration, or benchmark claims.

The prototype should demonstrate:

- File-based routes under `app/`.
- A root layout and a few basic pages.
- Explicit static and minimal SSR render modes.
- Deterministic `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json`.
- CLI inspection through `lumina routes --json`, `lumina inspect --json`, and `lumina inspect why`.

## Current Repository Commands

These commands are available in this checkout:

```bash
bun install
bun test
bun run typecheck
bun run docs:check
bun run structure:check
bun run performance:check
bun run lumina -- dev apps/www --once
bun run lumina -- build apps/www
bun run lumina -- build apps/www --json
bun run lumina -- start apps/www --once
bun run check
```

They verify scaffold health, documentation links and guardrails, package structure, TypeScript validity, performance-claim hygiene, scaffold tests, shared core model tests, route-discovery fixture behavior, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/hmr-report.json`, `.lumina/build-trace.json`, `.lumina/perf.report.json`, deployment manifest copies, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina dev` SSR route serving, `virtual:lumina/routes`, static `lumina build`, static `lumina start`, scaffolded app/example route evidence, and benchmark skeleton path/status coverage. The repository currently contains a Bun workspace, package placeholders, shared core types, route/render/map artifact generation, route-centered CLI inspection, static build/start output, scaffolded `apps/www` and example fixtures, early benchmark/status skeletons, and enforcement scripts; it does not yet contain measured benchmark results, client hydration, component-level HMR, or production SSR/API serving.

## Target MVP App Creation

Target MVP behavior:

```bash
bun create lumina my-app
cd my-app
lumina dev
bun run lumina -- routes <appPath> --json
lumina inspect / --json
lumina inspect why /
lumina map --json
```

Target MVP behavior: these commands are the intended prototype experience. They must not be described as working until implementation and fixture evidence exist.

Generated apps should also expose package scripts that call the framework commands:

```bash
bun run dev
bun run build
bun run start
```

Those package scripts should call `lumina dev`, `lumina build`, and `lumina start` respectively once framework commands exist.

Future planned commands outside the MVP Alpha first-run path include:

```bash
lumina build
lumina start
lumina check
lumina test
lumina seo
lumina agent
lumina workspace
lumina mcp
lumina edit
lumina migrate
lumina bench
```

## Current Scaffolded Marketing App

The current `apps/www` source fixture uses this structure:

```txt
apps/www/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    docs/page.tsx
    benchmarks/page.tsx
    examples/page.tsx
    roadmap/page.tsx
  components/
    Hero.tsx
    FeatureGrid.tsx
    SpeedPanel.tsx
    MapPreview.tsx
    ExampleCard.tsx
  lumina.config.ts
  package.json
  README.md
```

Route mapping:

```txt
app/page.tsx -> /
app/about/page.tsx -> /about
app/docs/page.tsx -> /docs
app/benchmarks/page.tsx -> /benchmarks
app/examples/page.tsx -> /examples
app/roadmap/page.tsx -> /roadmap
```

## Target Generated App Structure

The eventual generated app should use this structure:

```txt
my-app/
  app/
    layout.tsx
    page.tsx
    about/
      page.tsx
    (marketing)/
      pricing/
        page.tsx
    blog/
      [slug]/
        page.tsx
  components/
    Hero.tsx
    PricingCard.tsx
  lumina.config.ts
  package.json
  public/
```

Route mapping:

```txt
app/page.tsx -> /
app/about/page.tsx -> /about
app/(marketing)/pricing/page.tsx -> /pricing
app/blog/[slug]/page.tsx -> /blog/:slug
```

## Start The Dev Server

Current local repository command:

```bash
bun run lumina -- dev apps/www
bun run lumina -- dev apps/www --once
```

The implemented dev server starts the scaffolded `apps/www` app, writes `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, and `.lumina/hmr-report.json` on route-file changes, renders page routes through React SSR, exposes `virtual:lumina/routes`, emits a `lumina:routes-updated` dev-server event, and serves Vite internals. It does not yet keep client hydration, component-level HMR, or dynamic route params in sync.

## Build And Start Static Output

Current local repository commands:

```bash
bun run lumina -- build apps/www
bun run lumina -- build apps/www --json
bun run lumina -- start apps/www
bun run lumina -- start apps/www --once
```

The implemented build command emits static HTML for build-time static page routes, deployment manifest copies under `dist/`, `.lumina/build-trace.json`, and `.lumina/perf.report.json`. The implemented start command serves built static HTML through `@lumina/adapter-bun` and returns stable 404 HTML for unknown static routes. It does not yet serve SSR routes, API routes, client hydration bundles, or full production cache behavior.

Run `lumina build` before `lumina start`; the start command expects `dist/routes.manifest.json` and `dist/public` to exist.

## Inspect Routes

Target MVP behavior:

```bash
lumina routes --json
```

The command should print deterministic route data for the demo app. The current `apps/www` route list includes `/`, `/about`, `/docs`, `/benchmarks`, `/examples`, and `/roadmap`, including source files and render modes from the current default static route behavior. Separate compiler fixtures cover explicit `staticPage()` and `ssr()` declarations.

## Inspect Why A Route Works

Target MVP behavior:

```bash
lumina inspect / --json
lumina inspect why /
```

The JSON form should be compact and stable for tools. The `why` form should explain which file produced the route, which layout wraps it, which render mode applies, which generated artifacts include it, and which map edges support the answer.

## Inspect The Lumina Map

Target MVP behavior:

```bash
lumina map --json
```

MVP Alpha should generate a file-level Lumina Map from discovered routes, route source files, imported components, render mode declarations, and generated manifests. The map should be useful for humans and agents before deeper semantic contracts exist.

## Generated Files

MVP Alpha should generate only the first route, render, and map contracts:

```txt
.lumina/routes.json
.lumina/render-manifest.json
.lumina/map.json
```

Generated files must be deterministic and must not be edited manually.

## Troubleshooting During MVP Alpha

- If `bun create lumina` is unavailable, use the repository scaffold and example fixture work until `create-lumina` is implemented.
- If `lumina dev` fails, run `bun run lumina -- dev apps/www --once` to separate startup and artifact generation from long-running server behavior.
- If `.lumina/routes.json` is missing, route discovery has not produced artifacts yet.
- If `.lumina/map.json` is missing, run the compiler artifact path before using map-based inspection.
- If docs describe behavior that does not exist, mark it as `Target MVP behavior`, `Planned for MVP Alpha`, or `Future`.

## What Is Deferred

Future work after MVP Alpha includes:

- API routes.
- Hot API schemas.
- Full graph output in `.lumina/graph.json`.
- Full SEO engine and `.lumina/seo.report.json`.
- Performance reports and `.lumina/perf.report.json`.
- Large-repo workspace reports: `.lumina/workspace.json`, `.lumina/workspace-graph.json`, `.lumina/affected.json`, `.lumina/build-trace.json`, `.lumina/cache-report.json`, `.lumina/hmr-report.json`, and `.lumina/split-report.json`.
- Agent context capsules under `.lumina/context/*.ctx.json` and `.lumina/context/agent-index.json`.
- Safe edit mutation logs under `.lumina/mutations.json`.
- Generated compiler outputs under `.lumina/generated/*`.
- Adapter-oriented deployment copies under `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, and `dist/*`.
- MCP server.
- Node and static adapter runtime behavior.
- Migration tooling.
- Benchmark claims.
- Devtools dashboard.

## Source Of Truth

- [MVP Alpha Scope](mvp-alpha-scope.md): included, deferred, demo-app, and verification scope.
- [Lumina Map](lumina-map.md): MVP map output and future graph direction.
- [File Conventions](file-conventions.md): starter file conventions and deferred route conventions.
- [Examples](examples.md): scaffolded MVP app fixtures and future examples.
- [Task Backlog](task-backlog.md): implementation order.
