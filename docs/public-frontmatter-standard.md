# Public Frontmatter Standard

Status: Planned.

Audience: docs site builders, maintainers, AI agents.

This page defines the planned frontmatter contract for future public documentation pages. It expands the content model in [Public Docs Site Architecture](public-docs-site-architecture.md). Do not add frontmatter to every public page until a docs renderer or parser exists.

## Goals

- Give the future docs site stable metadata.
- Keep public pages searchable and navigable.
- Make status, audience, and canonical routes machine-readable.
- Support `docs-index.json`, `llms.txt`, and `llms-full.txt`.
- Prevent public pages from claiming planned behavior as implemented.

## Planned Shape

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
tags:
  - project-structure
  - generated-files
---
```

## Required Fields

| Field | Purpose |
| --- | --- |
| `title` | Human-readable page title for navigation, search, metadata, and indexes. |
| `description` | Short summary for previews, search, and agent indexes. |
| `status` | Page status: `draft`, `planned`, `scaffolded`, `implemented`, `verified`, or `deprecated`. |
| `audience` | Intended readers, such as `app developers`, `maintainers`, `AI agents`, or `future website visitors`. |
| `category` | Navigation lane: `start`, `concept`, `guide`, `reference`, `deployment`, `community`, or `comparison`. |
| `source` | Repository source path. |
| `canonical` | Planned public URL. |

## Optional Fields

| Field | Purpose |
| --- | --- |
| `order` | Stable ordering within a navigation group. |
| `version` | Docs or product version once packages are released. |
| `lastReviewed` | Manual review date for non-generated pages. |
| `related` | Source docs or public pages that clarify the topic. |
| `tags` | Search, filtering, and `docs-index.json` tags. |
| `hidden` | Exclude from navigation while preserving the page. |
| `owner` | Owning package, team, or maintainer role once ownership exists. |

## Status Rules

- `draft`: content is incomplete or exploratory.
- `planned`: accepted target behavior, not implemented.
- `scaffolded`: files or packages exist, but behavior is not complete.
- `implemented`: behavior exists and has current local evidence.
- `verified`: behavior exists, tests or checks pass, and docs match the current implementation.
- `deprecated`: behavior remains documented for migration or compatibility but should not be used for new work.

Do not use `implemented` or `verified` on public pages until the repository has code and checks that prove the exact behavior.

## Route Rules

- `canonical` must start with `/`.
- One source page should map to one canonical public route.
- Redirects must be documented after the docs renderer is chosen.
- Route changes require updates to [Website Content Map](website-content-map.md).

## Validation Rules

Before public launch, a docs check should verify:

- All public pages have required fields.
- `status` values are valid.
- `source` points to the current source file.
- `canonical` values are unique.
- `related` links resolve.
- `category` values match the navigation model.
- Pages marked `implemented` or `verified` have evidence links.

## Out Of Scope

- Choosing the final docs renderer.
- Adding frontmatter to every page in Phase 0.
- Claiming the public docs site is implemented.
- Replacing source-of-truth internal docs with public summaries.
