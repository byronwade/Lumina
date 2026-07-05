# Prototype Acceptance Demo

The first public prototype should prove the wedge end to end.

This script is target UX until `docs/status.md` marks the commands verified.

## Demo Script

```bash
bun create needle demo
cd demo
needle dev
```

Generated app scripts may also support:

```bash
bun run dev
```

Browser should show:

- Home page rendered with React.
- SEO metadata present.
- Devtools link visible in terminal once devtools exists.

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
2. Create page or prepare a safe edit plan, depending on available write tools.
3. Add metadata.
4. Add blocks or components.
5. Generate tests.
6. Run SEO check.
7. Run affected tests.
8. Show mutation log.

The safe edit flow should:

1. Dry-run the metadata change.
2. Return a `SafeEditTransaction`.
3. Apply only after checks pass or explicit policy allows it.
4. Write `.needle/mutations.json`.
5. Allow `needle edit undo <mutationId>`.

Then:

```bash
needle build
needle start
```

Generated app scripts may also support:

```bash
bun run build
bun run start
```

Production Bun adapter should serve:

- `/`
- `/enterprise`
- `/sitemap.xml`
- `/robots.txt`
- `/_needle/health` when enabled and exposed by config

## Acceptance Criteria

The prototype is credible when it can:

- Create a React app.
- Render SEO-safe pages.
- Serve static and SSR routes through the Bun adapter.
- Run API routes.
- Run a hot API route.
- Generate a route manifest.
- Generate a render manifest.
- Generate an SEO report.
- Generate a cache manifest.
- Generate a Needle Map.
- Generate route context for agents.
- Expose read-only MCP tools.
- Apply a safe metadata edit.
- Run affected checks.
- Generate an adapter-aware server entry.
- Emit `adapter.manifest.json`.
- Demonstrate Bun default with Node/static adapter path documented.
- Keep production output free of agent-only metadata.

## Explicit Non-Goals

The prototype does not need:

- Full RSC support.
- Edge runtime support.
- All deployment adapters.
- Visual editor.
- Production-grade devtools.
- Full auth story.
- Full image optimizer.
- Full custom bundler.
- Full Next.js migration parity.
