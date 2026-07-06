# Guides

Status: Planned.

Audience: app developers, documentation contributors, AI agents.

Guides are task-focused walkthroughs. They should become the practical layer between the high-level README and exact API reference.

The current repository has a Phase 1 scaffold, so this page defines the guide set NeedleStart should grow into as framework behavior is implemented.

## Guide Format

Each guide should include:

- Status.
- Prerequisites.
- Steps.
- Expected output.
- Commands to run.
- Files changed.
- Generated files.
- Agent notes when the workflow affects Needle Map, Agent Kernel, MCP, or safe edits.
- Troubleshooting notes.
- Out-of-scope notes.

## App Development Guides

Planned guides:

- Create a new NeedleStart app.
- Understand the project structure.
- Add a static page.
- Add an SSR page.
- Add a dynamic route.
- Add layouts.
- Add a 404 page.
- Add an API route.
- Add a hot API route.
- Configure caching.

## SEO Guides

Planned guides:

- Add route metadata.
- Generate sitemap and robots output.
- Add structured data.
- Run `needle seo`.
- Fix missing title, description, and canonical URL diagnostics.
- Preview crawler-visible HTML.

## Needle Map Guides

Planned guides:

- Generate the file graph.
- Inspect a route.
- Find affected routes from a file change.
- Explain a graph edge.
- Add a `.contract.ts` file.
- Interpret confidence and source on graph edges.

## Agent Kernel And MCP Guides

Planned guides:

- Generate route context capsules.
- Run `needle agent context`.
- Start the read-only MCP server.
- Use MCP to inspect routes.
- Dry-run a safe metadata edit.
- Apply a safe metadata edit.
- Undo a mutation.

## Deployment Guides

Planned guides:

- Build and start with the Bun adapter.
- Export static routes.
- Use the Node adapter.
- Read `dist/adapter.manifest.json`.
- Compare adapter capabilities.

## Migration Guides

Planned guides:

- Migrate simple Next.js App Router pages.
- Convert static metadata.
- Preserve compatible layouts.
- Generate contract stubs for ambiguous semantics.
- Read the migration report.

## Guide Readiness Rule

Do not publish a guide as implemented until the command, package, generated output, and checks in that guide exist. Planned guides can still define target workflows and acceptance criteria.

