# Examples Strategy

NeedleStart examples should be proof vehicles, not decorative sample apps. Every example should demonstrate a specific framework promise, provide useful fixtures for tests, and teach humans and agents how the system behaves.

No examples exist yet. This document defines the target examples and what each one must prove.

## Goals

- Give new users a clear path from first page to agent-native workflow.
- Provide fixture-like apps for compiler, runtime, SEO, map, MCP, safe edit, and adapter tests.
- Keep examples small enough to read.
- Avoid demo code that overclaims unimplemented behavior.
- Show Bun default plus Node/static compatibility where relevant.

## Example Rules

Each example should include:

- README.
- Purpose.
- Commands to run.
- Features demonstrated.
- Expected generated artifacts.
- Tests or checks it should support.
- Out-of-scope notes.

Examples must not include:

- Secrets.
- Real credentials.
- Unverified benchmark claims.
- Unnecessary dependencies.
- Hidden network calls.

## Planned Examples

| Example | Purpose | Primary proof |
| --- | --- | --- |
| `basic` | Smallest possible app. | Create app, one route, static render, metadata. |
| `blog-seo` | Content-heavy public site. | Static/prerender, sitemap, canonical URLs, structured data. |
| `ecommerce` | Product catalog shape. | Dynamic routes, schemas, cache tags, hot API. |
| `dashboard` | Authenticated-app shape without implementing auth. | SSR, non-indexable routes, client hydration, no SEO overclaim. |
| `agent-demo` | Agent-native workflow. | Needle Map, MCP read tools, safe metadata edit. |
| `large-app-fixture` | Scale and graph realism. | Deterministic route discovery, affected checks, graph performance. |

## `basic`

Purpose:

- Prove the smallest app can run.
- Anchor create-app behavior.
- Give tests a tiny fixture.

Should include:

```txt
app/
  layout.tsx
  page.tsx
needle.config.ts
```

Should prove:

- `needle dev` renders a page.
- `needle routes --json` includes `/`.
- `needle build` emits static HTML.
- `needle start` serves `/` through Bun adapter.
- Metadata appears in HTML.

Out of scope:

- API routes.
- Dynamic routes.
- Cache tags.
- MCP write tools.

## `blog-seo`

Purpose:

- Prove SEO-first public pages.
- Demonstrate static and prerendered content.

Should include:

- Home page.
- Blog index.
- Blog detail route.
- Metadata for each public route.
- Sitemap and robots output.
- Structured data example.

Should prove:

- `defineMeta()` output.
- Canonical URL generation.
- Sitemap inclusion.
- `needle seo --json` stable report.
- Prerender metadata.

Out of scope:

- Full CMS.
- Remote content fetching.
- Image optimizer.

## `ecommerce`

Purpose:

- Prove product catalog semantics without becoming a commerce platform.

Should include:

- Product list.
- Product detail route.
- Product schema.
- Product card component contract.
- API route for product summary.
- Hot API route for product lookup.
- Cache tags such as `product:list` and `product:<id>`.

Should prove:

- Dynamic routes.
- Schema validation.
- Hot API serialization.
- Cache manifest.
- Needle Map edges from route to component to schema to cache tag.

Out of scope:

- Checkout.
- Payments.
- User accounts.
- Inventory backend.

## `dashboard`

Purpose:

- Show SSR and client hydration for app-like routes.
- Demonstrate routes that are intentionally not public SEO targets.

Should include:

- Dashboard route.
- Client component counter or filter.
- Non-indexable metadata.
- SSR render mode.

Should prove:

- SSR route serving.
- Hydration.
- SEO audit skips or marks non-indexable routes correctly.
- Runtime adapter behavior.

Out of scope:

- Real auth.
- Session management.
- Billing.
- Database integration.

## `agent-demo`

Purpose:

- Prove the product wedge.
- Let humans watch an agent inspect, plan, edit safely, run checks, and report a mutation.

Should include:

- Several routes.
- Components with contracts.
- Metadata safe edit target.
- Known dangerous area fixture.
- Tests that affected checks can discover.

Should prove:

- `needle map route /pricing`.
- `needle agent context --route /pricing --json`.
- MCP `list_routes`.
- MCP `get_route_context`.
- MCP `get_related_files`.
- Safe metadata dry run.
- Safe metadata apply.
- Mutation log.
- Undo.
- Rejected dangerous edit.

Out of scope:

- Autonomous production writes.
- High-risk safe edits.
- External LLM dependency in tests.

## `large-app-fixture`

Purpose:

- Prove route discovery and graph behavior at realistic scale.

Should include:

- Many routes.
- Shared layouts.
- Shared components.
- API routes.
- Test files.
- Style files.
- Contracts where useful.

Should prove:

- Stable route manifest ordering.
- Needle Map generation.
- Affected query correctness.
- Deterministic output across repeated runs.
- Incremental graph target once incremental compilation exists.

Out of scope:

- Real production data.
- Large dependency graph for its own sake.
- Benchmarks without controlled environment notes.

## Example README Template

Each example should use this shape:

```md
# <Example Name>

## Purpose

What this example proves.

## Features Demonstrated

- Feature 1.
- Feature 2.

## Commands

```bash
needle dev
needle build
needle start
```

## Expected Output

- Route manifest:
- SEO report:
- Map output:

## Tests

Which fixture or integration tests should use this example.

## Out of Scope

What this example intentionally avoids.
```

## Testing Relationship

Examples can double as fixtures only when they stay deterministic.

Rules:

- Test fixtures may be smaller than public examples.
- Public examples should not become brittle benchmark inputs.
- Benchmark fixtures should live under `benchmarks/`.
- Security-sensitive examples must use fake values and assert redaction.

## Documentation Rule

When an example is added or changed, update:

- this file
- `docs/status.md` if status changes
- `README.md` if the example is user-facing
- `docs/testing.md` if the example becomes a fixture
- `docs/prototype-acceptance.md` if it affects the demo path
