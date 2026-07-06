# Examples Catalog

Status: Planned.

Audience: app developers, docs maintainers, framework contributors, AI agents.

This catalog names the official examples NeedleStart should grow into. It complements [Examples And Templates Contract](examples-contract.md), [Getting Started](getting-started.md), [Public Examples Reference](public/reference/examples.md), and [Benchmark Fixtures](benchmark-fixtures.md).

No example app exists yet. Every entry is planned until files, commands, tests, and generated artifacts prove otherwise.

## Status Values

Use the same status values as [Examples And Templates Contract](examples-contract.md):

- Planned.
- Scaffolded.
- Runnable.
- Verified.
- Deprecated.

## Catalog

| Example | Planned path | Status | Purpose |
| --- | --- | --- | --- |
| Basic Starter | `examples/basic/` | Planned | Smallest useful app for `bun create needle`. |
| Blog SEO | `examples/blog-seo/` | Planned | Static content, metadata, sitemap, robots, and structured data. |
| API Route | `examples/api-route/` | Planned | Standard API route methods, params, body handling, and errors. |
| Hot API | `examples/hot-api/` | Planned | Generated validation, serialization, and optional micro-cache. |
| Static Export | `examples/static-export/` | Planned | Fully static output and unsupported-route diagnostics. |
| Node Adapter | `examples/adapter-node/` | Planned | Node compatibility for SSR and static output. |
| Dashboard Client | `examples/dashboard-client/` | Planned | Intentional client interactivity and hydration boundaries. |
| Ecommerce | `examples/ecommerce/` | Planned | Product pages, cache tags, API routes, SEO, and performance budgets. |
| Agent Demo | `examples/agent-demo/` | Planned | Needle Map inspection, context capsules, safe edit, mutation log, and undo. |
| Large App Fixture | `playgrounds/large-app-fixture/` | Planned | Route discovery scale, graph generation, diagnostics, and benchmark evidence. |
| Docs Site | `examples/docs-site/` | Planned | Future public docs renderer, frontmatter, navigation, search, and machine-readable outputs. |

## Default Starter Requirements

The default starter must be the first example to become verified.

It should include:

- One static page.
- One SSR page.
- One API route after API support exists.
- One metadata example.
- One generated route manifest.
- One README with commands and expected output.
- One small deterministic test set.

The default starter should not include auth, database setup, billing, third-party API keys, or complex styling.

## Public Guide Mapping

| Public guide | Example dependency |
| --- | --- |
| Create An App | Basic Starter |
| Add A Static Page | Basic Starter |
| Add SEO Metadata | Blog SEO |
| Create An API Route | API Route |
| Create A Hot API Route | Hot API |
| Inspect Needle Map | Agent Demo or Large App Fixture |
| Use Agent Context | Agent Demo |

Public guides may describe planned workflows before examples exist, but they must not claim the examples run until verified.

## Example README Requirements

Each example README must include:

- Status.
- What it demonstrates.
- Prerequisites.
- Commands.
- Expected routes.
- Expected generated artifacts.
- Expected diagnostics, if any.
- Contracts covered.
- Known limitations.
- Verification evidence.

## Verification Gate

An example can move to verified only when:

- Commands run from a clean checkout.
- Tests pass.
- Generated artifacts match snapshots or documented expectations.
- Public docs link to the example status.
- README and AGENTS remain honest about package and command status.
- Platform limitations are documented in [Compatibility](compatibility.md).

## Out Of Scope For Phase 0

- Creating example apps.
- Claiming examples run.
- Remote template fetching.
- Benchmark numbers from planned examples.
