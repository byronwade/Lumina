# Getting Started

Status: Planned.
Audience: new users, app developers, AI agents.

This is the target MVP Alpha onboarding path. The repository currently has the Phase 1 scaffold; app creation, CLI behavior, route discovery, rendering, and generated artifacts are not implemented yet.

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
bun run check
```

They verify scaffold health, documentation links and guardrails, package structure, TypeScript validity, performance-claim hygiene, scaffold tests, and shared core model tests. The repository currently contains a Bun workspace, package placeholders, shared core types, and enforcement scripts; it does not yet contain CLI behavior, route discovery, rendering, Lumina Map generation, or generated `.lumina/*` artifacts.

## Target MVP App Creation

Target MVP behavior:

```bash
bun create lumina my-app
cd my-app
lumina dev
lumina routes --json
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

## Demo App Structure

The MVP Alpha demo app should use this structure:

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

Target MVP behavior:

```bash
lumina dev
```

The dev server should start the demo app, render the root route, and keep generated route, render, and map artifacts in sync with source changes. Until implementation exists, use repository maintenance checks instead of treating this command as verified.

## Inspect Routes

Target MVP behavior:

```bash
lumina routes --json
```

The command should print deterministic route data for the demo app. The route list should include `/`, `/about`, `/pricing`, and `/blog/:slug`, including source files and render modes once render extraction exists.

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
- If `lumina dev` is unavailable, the CLI package has not reached the MVP dev-server slice yet.
- If `.lumina/routes.json` is missing, route discovery has not produced artifacts yet.
- If `.lumina/map.json` is missing, the Lumina Map generator has not reached the MVP file-level graph slice yet.
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
- [Examples](examples.md): planned MVP demo app and future examples.
- [Task Backlog](task-backlog.md): implementation order.
