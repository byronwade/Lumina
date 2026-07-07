# Public Docs Readiness

Status: Planned.

Audience: future website visitors, docs maintainers, open source reviewers.

This page defines what must be true before repository docs become public website content.

The future public website Markdown source lives in `docs/public/`.

The planned content model, route mapping, frontmatter contract, and renderer decision criteria live in [Public Docs Site Architecture](public-docs-site-architecture.md).

Public docs metadata must stay aligned with [Website Content Map](website-content-map.md), [Public Frontmatter Standard](public-frontmatter-standard.md), [Docs Site Build Plan](docs-site-build-plan.md), and [Machine-Readable Documentation](machine-readable-docs.md). Until a renderer exists, `frontmatter`, `canonical` routes, route mapping, source-of-truth links, broader `docs-index.json`, `docs-navigation.json`, `llms.txt`, and `llms-full.txt` generation, `schemaVersion`, optional deterministic `generatedAt` behavior, deterministic output, and the rule that machine-readable docs do not ship agent metadata in production runtime bundles remain planned contracts. The current `apps/www` static build emits deterministic preview `docs-index.json`, `docs-navigation.json`, `llms.txt`, and `llms-full.txt` artifacts from the bundled public-docs inventory.

## Requirements

- Each public page has a clear audience.
- Each feature page has a status label.
- Planned APIs are marked as planned.
- Code examples are verified or marked as draft.
- Performance claims link to benchmark evidence.
- Security claims link to implementation and tests.
- Navigation matches `docs/website-content-map.md`.
- Public-facing pages in `docs/public/` link back to source-of-truth reference docs.
- Public project structure pages distinguish app structure, repository structure, generated files, and docs-only agent playbooks.
- Public pages have metadata or a documented frontmatter path before launch.
- Public docs can generate or validate `docs-index.json`, `docs-navigation.json`, `llms.txt`, and `llms-full.txt`.

## Public Page Readiness Checklist

- Page has status and audience.
- Page has title, description, source path, and canonical route metadata once the docs parser exists.
- Page has a one-paragraph summary.
- Page links to reference docs for exact APIs.
- Page links to related guides when appropriate.
- Page does not overstate implementation.
- Page avoids unsupported comparisons.
- Page has examples that are verified or marked planned.
- Page has no local-only file paths except repository links.
- Page content and navigation do not rely on color alone, keyboard traps, or hidden status text.

## Public Website Tone

- Lead with the app-graph-native promise: "Your app ships with a map."
- Explain why the graph helps humans and agents.
- Keep SEO and benchmark claims evidence-backed.
- Use competitor comparisons to explain fit, not to attack.

## Not Ready For Public Launch Until

- At least one verified app example exists.
- Quick-start commands are real.
- The docs site navigation is implemented.
- The docs site accessibility behavior has been reviewed against [Accessibility Contract](accessibility-contract.md).
- Security, governance, and release docs have maintainer contact details.

The Phase 1 scaffold exists and is covered by the repository checks. Public launch readiness now depends on verified user-facing behavior, docs-site implementation, accessibility review, and maintainer contact details.

## Public Content Source

Use `docs/public/README.md` as the public content index.

Public pages should stay concise and reader-facing. Deep implementation detail should remain in root docs and be linked from public pages.
