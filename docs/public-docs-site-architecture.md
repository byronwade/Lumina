# Public Docs Site Architecture

Status: Planned.

Audience: docs site builders, maintainers, framework contributors, AI agents.

This page defines the planned content model for turning `docs/public/` into an advanced public documentation site. It does not choose a final renderer yet. It defines the contracts that a VitePress, Docusaurus, Nextra, Mintlify, or custom NeedleStart docs app would need to consume. Use [Docs Site Build Plan](docs-site-build-plan.md) for implementation phases and renderer decision gates.

## Why This Exists

NeedleStart already has public-facing Markdown under `docs/public/`, but a polished docs site needs more than pages. It needs consistent metadata, navigation, route rules, source links, status labels, version context, machine-readable outputs, and validation. Mature docs systems use frontmatter, sidebar configuration, file-based routing, generated indexes, and page-level metadata to keep documentation navigable for humans and agents.

Research backing:

- VitePress supports page frontmatter, file-based routing, and configurable sidebars.
- Docusaurus can generate sidebars from the filesystem and customize pages through frontmatter.
- Nextra uses file conventions and metadata files to control docs navigation.
- Mintlify uses page frontmatter plus a central docs configuration for navigation, metadata, and AI-oriented docs behavior.

## Source Directory

The source tree for public docs is:

```txt
docs/public/
  README.md
  index.md
  docs.md
  roadmap.md
  concepts/
  guides/
  reference/
  deployment/
  community/
  comparisons/
```

`docs/public/README.md` is the repository index for public content. It is not necessarily the website homepage.

## Route Model

Planned route mapping:

| Source | Public route |
| --- | --- |
| `docs/public/index.md` | `/` |
| `docs/public/docs.md` | `/docs` |
| `docs/public/roadmap.md` | `/roadmap` |
| `docs/public/concepts/app-graph.md` | `/docs/concepts/app-graph` |
| `docs/public/guides/create-app.md` | `/docs/guides/create-app` |
| `docs/public/reference/cli.md` | `/docs/reference/cli` |
| `docs/public/deployment/overview.md` | `/docs/deployment` |
| `docs/public/community/overview.md` | `/community` |
| `docs/public/comparisons/overview.md` | `/compare` |

The exact route map can change when the docs site renderer is chosen, but every public route should have one source Markdown file and one canonical URL.

## Frontmatter Contract

The detailed field contract lives in [Public Frontmatter Standard](public-frontmatter-standard.md). Do not add frontmatter to all public pages until a docs parser exists. Once the parser exists, public pages should use this shape:

```yaml
---
title: Project Structure
description: Planned NeedleStart app structure, generated files, and documentation layout.
status: planned
audience:
  - app developers
  - AI agents
category: reference
order: 30
source: docs/public/reference/project-structure.md
canonical: /docs/reference/project-structure
related:
  - docs/file-conventions.md
  - docs/product-build-readiness.md
---
```

Required fields:

| Field | Purpose |
| --- | --- |
| `title` | Page title used in navigation, search, Open Graph, and `docs-index.json`. |
| `description` | Short page summary for previews, search, and agent indexes. |
| `status` | One of `draft`, `planned`, `scaffolded`, `implemented`, `verified`, or `deprecated`. |
| `audience` | Reader groups such as `app developers`, `maintainers`, `AI agents`, or `future website visitors`. |
| `category` | Navigation lane such as `start`, `guide`, `reference`, `concept`, `deployment`, `community`, or `comparison`. |
| `source` | Repository source path. |
| `canonical` | Planned public URL. |

Optional fields:

| Field | Purpose |
| --- | --- |
| `order` | Stable ordering within a navigation group. |
| `version` | Docs or product version once packages are released. |
| `lastReviewed` | Manual review date for non-generated pages. |
| `related` | Source docs or public pages that clarify the topic. |
| `tags` | Search, filtering, and `docs-index.json` tags. |
| `hidden` | Exclude from navigation while preserving the page. |

Use [Public Frontmatter Standard](public-frontmatter-standard.md) for required fields, optional fields, status rules, route rules, and validation rules.

## Navigation Model

The future docs site should derive or validate navigation against [Website Content Map](website-content-map.md). A renderer may use a config file, generated JSON, or filesystem routing, but it must preserve these lanes:

- Product.
- Concepts.
- Guides.
- Reference.
- Deployment and operations.
- Community.
- Comparisons.

Navigation rules:

- Prefer explicit ordering for high-value pages.
- Keep "Create An App", project structure, CLI, config, file conventions, render modes, and manifest contracts easy to find from the docs landing page.
- Keep public pages concise and link to source-of-truth internal docs for deeper contracts.
- Keep planned behavior visibly marked until implementation exists.
- Do not use autogenerated navigation alone if it hides the learning path.

## Page Types

| Type | Purpose | Examples |
| --- | --- | --- |
| Landing | Orient and route the reader. | Home, docs landing, community overview. |
| Concept | Explain why something exists. | App graph, SEO-first, safe edits. |
| Guide | Walk through a task. | Create app, static page, API route. |
| Reference | Document exact contracts. | CLI, config, project structure, manifest contracts. |
| Operations | Explain deployment, compatibility, benchmarks, release, and security. | Deployment overview, benchmark honesty. |
| Comparison | Explain fit and tradeoffs. | Comparisons overview. |

This follows the same separation used elsewhere in NeedleStart docs: start, guides, reference, concepts, operations, community, and agent-readable contracts.

## Search And Table Of Contents

The docs site should eventually generate:

- Page title and description index.
- Heading index.
- Tags and audience filters.
- Status filters.
- Version or channel filters once releases exist.
- Search-friendly summaries that distinguish planned from verified behavior.

Long reference pages should expose a table of contents. Short guide and concept pages may rely on headings.

## Source Links

Every public page should be able to link back to:

- Its repository source file.
- Its source-of-truth internal docs.
- Its related manifest, API, config, or command reference when applicable.

This supports docs review, agent navigation, and public transparency.

## Machine-Readable Outputs

The docs site should eventually generate or serve:

- `docs-index.json`.
- `llms.txt`.
- `llms-full.txt`.
- Markdown views of public pages if the renderer outputs HTML.

These outputs should follow [Machine-Readable Documentation](machine-readable-docs.md) and [Versioning And Upgrades](versioning-and-upgrades.md).

## Validation Rules

Before public launch, validate that:

- Every public page has frontmatter or equivalent metadata that follows [Public Frontmatter Standard](public-frontmatter-standard.md).
- Every public page has one canonical route.
- Every public page has status and audience.
- Every guide links to a source reference.
- Every reference page links to deeper internal docs.
- Navigation matches [Website Content Map](website-content-map.md).
- `docs-index.json` matches the public page set.
- `llms.txt` links to current public docs and upgrade guides.
- No public page claims unimplemented behavior works.
- Docs navigation, search, code blocks, copy buttons, and status labels remain usable by keyboard and do not rely on color alone.
- Accessibility review follows [Accessibility Contract](accessibility-contract.md) before public launch.

## Renderer Decision Criteria

Choose a docs renderer by evaluating:

- Markdown or MDX support.
- Frontmatter support.
- Sidebar and route control.
- Search support.
- Accessible navigation, keyboard behavior, focus states, and skip-link support.
- Versioned docs support.
- Static output quality.
- Ability to expose Markdown or machine-readable docs to agents.
- Ability to integrate with the eventual NeedleStart website without duplicating content.

Do not choose a renderer solely because it is popular. Choose the path that keeps public docs, source docs, and machine-readable docs synchronized.

## Out Of Scope

- Choosing the final docs renderer in Phase 0.
- Adding frontmatter to every public page before the parser exists.
- Claiming the docs site is implemented before route rendering and deployment exist.
- Duplicating internal architecture docs as long public pages.
