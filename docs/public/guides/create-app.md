# Create An App

Status: Planned.

Audience: new users, app developers.

This guide describes the target app creation flow for MVP Alpha. It is not implemented yet.

## Target MVP Command Flow

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

Generated apps should also expose `bun run dev`, `bun run build`, and `bun run start` package scripts that call `lumina dev`, `lumina build`, and `lumina start` respectively once framework commands exist.

## Target Result

MVP Alpha should produce a small app that proves:

- A local development server can render the demo app.
- Routes under `app/` are discovered deterministically.
- Static and minimal SSR render modes are explicit.
- `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json` are generated.
- `lumina inspect why` explains how the app is connected.

## Demo App Structure

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

## Current Reality

The repository has a Bun workspace, package placeholders, shared core types, initial compiler route discovery, CI, and enforcement scripts. The `create-lumina` package is scaffolded, but app creation behavior is not implemented yet. Use [MVP Alpha Scope](../../mvp-alpha-scope.md), [Phase 1 Build Plan](../../phase-1-build-plan.md), and [Task Backlog](../../task-backlog.md) for the implementation sequence.

The future default starter must follow [Examples And Templates Contract](../../examples-contract.md) before this guide can be marked verified.

## Deferred

API routes, hot API schemas, full SEO reports, performance reports, MCP, safe edits, agent context capsules, migration tooling, and benchmark claims are future work after MVP Alpha unless the scope changes.

## Source

- [Getting Started](../../getting-started.md)
- [Examples](../reference/examples.md)
- [CLI Reference](../reference/cli.md)
- [File Conventions](../reference/file-conventions.md)
