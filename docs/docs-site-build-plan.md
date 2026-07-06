# Docs Site Build Plan

Status: Planned.

Audience: docs site builders, maintainers, frontend contributors, AI agents.

This page turns the public docs architecture into an implementation plan for the future website documentation section. It complements [Public Docs Site Architecture](public-docs-site-architecture.md), [Public Frontmatter Standard](public-frontmatter-standard.md), [Website Content Map](website-content-map.md), [Machine-Readable Documentation](machine-readable-docs.md), and [Accessibility Contract](accessibility-contract.md).

No docs site renderer has been chosen yet. This page describes decision gates and implementation phases, not current behavior.

## Goals

- Turn `docs/public/` into a polished public documentation site.
- Keep source Markdown, public routes, navigation, search, and machine-readable outputs synchronized.
- Preserve status labels so planned behavior is never presented as implemented.
- Make the docs usable by humans and AI agents.
- Keep the docs site accessible, fast, searchable, and maintainable.

## Non-Goals

- Choosing a renderer in Phase 0.
- Duplicating every internal architecture document as public copy.
- Shipping MDX-only docs before plain Markdown is preserved.
- Hiding planned status behind marketing language.
- Making public docs the only source of truth for internal implementation contracts.

## Build Phases

### Phase A: Metadata Readiness

Planned tasks:

- Add frontmatter only when a parser exists.
- Validate required fields from [Public Frontmatter Standard](public-frontmatter-standard.md).
- Enforce unique canonical routes.
- Link every public page to source docs.
- Keep route mapping aligned with [Website Content Map](website-content-map.md).

Exit criteria:

- Metadata check can fail on missing required fields.
- Docs remain readable as plain Markdown.

### Phase B: Renderer Decision

Evaluate:

- Markdown and MDX support.
- Static output quality.
- Sidebar and route control.
- Search support.
- Accessibility controls.
- Versioned docs support.
- Machine-readable output support.
- Integration with the eventual NeedleStart site.

Renderer candidates may include VitePress, Docusaurus, Nextra, Mintlify, or a custom NeedleStart docs app. The final choice should be recorded in an ADR.

### Phase C: Navigation And Search

Planned tasks:

- Generate or validate sidebar data.
- Generate page title and description index.
- Generate heading index when the renderer supports it.
- Add status, audience, category, and tag filters.
- Preserve source links.
- Keep docs landing focused on learning path, guides, and reference.

Exit criteria:

- Navigation matches [Website Content Map](website-content-map.md).
- Search can distinguish planned, scaffolded, implemented, and verified pages.

### Phase D: Machine-Readable Outputs

Planned tasks:

- Generate `docs-index.json`.
- Generate `llms.txt`.
- Generate `llms-full.txt`.
- Include source path, canonical route, status, audience, category, and related docs.
- Exclude private notes, secrets, local paths, and unsupported claims.

Exit criteria:

- Generated outputs match [Machine-Readable Documentation](machine-readable-docs.md).
- Output is deterministic.

### Phase E: Quality Gates

Planned tasks:

- Local link checking.
- Heading anchor checking.
- Frontmatter validation.
- Status-language checks.
- Accessibility smoke checks.
- Route and sidebar validation.
- Public claim checks for performance and security.

Exit criteria:

- `docs:check` or equivalent fails when public docs drift.
- Manual checks in [Documentation Verification](docs-verification.md) have script equivalents.

## Content Model

Public docs should preserve these lanes:

- Product.
- Concepts.
- Guides.
- Reference.
- Deployment and operations.
- Community.
- Comparisons.

Each page should have a clear job. Guides teach tasks. Reference pages document exact contracts. Concepts explain why the framework exists. Operations pages explain deployment, benchmarking, security, release, and compatibility.

## Accessibility Requirements

Before public launch:

- Navigation works by keyboard.
- Focus states are visible.
- Status labels do not rely on color alone.
- Search is keyboard usable.
- Code blocks and copy buttons are accessible.
- Page landmarks are semantic.
- Skip link behavior is present if the layout needs it.

Follow [Accessibility Contract](accessibility-contract.md) before marking docs UI verified.

## Performance Requirements

Before public launch:

- Static output is preferred.
- Search index size is measured.
- Route JS and CSS bytes are measured.
- Images and fonts use documented delivery rules.
- Source-map exposure follows [Performance Contract](performance-contract.md).
- Public speed claims link to benchmark evidence.

## Out Of Scope For Phase 0

- Implementing the docs site.
- Adding frontmatter to every public page.
- Choosing the renderer without an ADR.
- Publishing generated `docs-index.json`, `llms.txt`, or `llms-full.txt`.
