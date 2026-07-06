# Examples

Status: Planned.

Audience: app developers, framework contributors, AI agents.

Examples should become the fastest way to understand Lumina behavior once implementation exists. Current example files are scaffolded source fixtures for the compiler and CLI. The `apps/www` fixture is runnable through the minimal local `lumina dev` path; the standalone example directories are not verified runnable apps yet.

The detailed requirements for examples, templates, verification evidence, and create-command integration are defined in [Examples And Templates Contract](examples-contract.md).

## Scaffolded Examples

The official inventory is canonical in [Examples Catalog](examples-catalog.md). Current scaffolded paths are:

- `apps/www/`
- `examples/basic/`
- `examples/blog-seo/`
- `examples/multi-app-workspace/`
- `examples/large-100-routes/`
- `examples/large-1000-routes/`

These fixtures have README status labels and route-discovery tests. `apps/www` is covered by minimal dev-server tests; the standalone example directories are not runnable or verified examples until build/start commands and broader runtime behavior exist.

## Planned Examples

Planned future paths are:

- `examples/api-route/`
- `examples/hot-api/`
- `examples/static-export/`
- `examples/adapter-node/`
- `examples/dashboard-client/`
- `examples/ecommerce/`
- `examples/agent-demo/`
- `examples/docs-site/`
- `playgrounds/large-app-fixture/`

These directories do not exist yet. Do not describe them as scaffolded, runnable, or verified until files, commands, tests, generated artifacts, and status labels exist.

## MVP Alpha Demo

The first MVP source fixture is `apps/www/`. It demonstrates the same marketing-app route surface listed in [MVP Alpha Scope](mvp-alpha-scope.md), and it does not include API routes, MCP, safe edits, auth, databases, or benchmark claims.

The MVP Alpha Demo should prove route discovery, basic render modes, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, and the first `lumina dev` route-serving path.

## Example Requirements

- Clear purpose.
- Commands to run.
- Expected output.
- Generated files.
- Tests.
- Agent notes when relevant.

## Example Status Labels

Use these labels:

- Planned: example is a target.
- Scaffolded: files exist, behavior incomplete.
- Runnable: commands start, but full evidence is incomplete.
- Verified: commands, tests, generated artifacts, and docs claims pass.
- Deprecated: retained for migration or compatibility notes.

## Minimum Example README

Every example should eventually include:

- What it demonstrates.
- Status label.
- Compatible Lumina version or workspace commit.
- Commands to run.
- Expected pages or endpoints.
- Generated `.lumina/*` artifacts.
- Tests to run.
- Known limitations.
- Agent workflow notes when relevant.

Do not link an example from public onboarding as verified until the example meets [Examples And Templates Contract](examples-contract.md).

## Agent Demo Requirements

The `agent-demo` example should eventually prove:

- Route context inspection.
- Lumina Map affected query.
- Safe metadata edit dry run.
- Safe metadata edit apply.
- Affected checks.
- Mutation log.
- Undo.
