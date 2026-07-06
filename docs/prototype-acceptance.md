# Prototype Acceptance Demo

The first public prototype should prove the wedge end to end.

Scope note: this is broader than the first working slice in `docs/risk-mitigation.md`. The working slice proves create app, SEO-safe pages, Bun serving, basic map, agent inspection, and safe metadata edit before the public prototype expands into API routes, hot API, read-only MCP tools, adapter-aware output, and Node/static documentation.

## Demo Script

```bash
bun create needle demo
cd demo
bun dev
```

Browser should show:

- Home page rendered with React.
- SEO metadata present.
- Devtools link visible in terminal.

Then:

```bash
needle routes
needle seo
needle map route /
needle agent context --route / --json
needle mcp
```

Then ask an AI agent:

```txt
Add a static /enterprise page with SEO metadata, hero, feature grid,
FAQ structured data, and a CTA to /contact. Use Needle tools.
Run affected checks.
```

The agent should:

1. Inspect route graph.
2. Create page.
3. Add metadata.
4. Add blocks or components.
5. Generate tests.
6. Run SEO check.
7. Run affected tests.
8. Show mutation log.

The safe edit flow should:

1. Dry-run the metadata change.
2. Return a `SafeEditTransaction`.
3. Apply only after checks pass.
4. Write `.needle/mutations.json`.
5. Allow `needle edit undo <mutationId>`.

Then:

```bash
bun build
bun start
```

Production Bun server should serve:

- `/`
- `/enterprise`
- `/sitemap.xml`
- `/robots.txt`
- `/api/health`

## Acceptance Criteria

The prototype is credible when it can:

- Create a React app.
- Render SEO-safe pages.
- Serve static and SSR routes through Bun.
- Run API routes.
- Run a hot API route.
- Generate a route manifest.
- Generate a Needle Map.
- Generate route context for agents.
- Expose read-only MCP tools.
- Apply a safe metadata edit.
- Run affected checks.
- Generate an adapter-aware server entry.
- Demonstrate Bun default with Node/static adapter path documented.

## Explicit Non-Goals

The prototype does not need:

- Full RSC support.
- Edge runtime support.
- All deployment adapters.
- Visual editor.
- Production-grade devtools.
- Full auth story.
- Full image optimizer.
