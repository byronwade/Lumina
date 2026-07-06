# Review Checklist

Status: Planned.

Audience: maintainers, reviewers, contributors, AI agents.

This checklist defines the review bar for NeedleStart changes. It complements [Engineering Standards](engineering-standards.md), [Documentation Verification](docs-verification.md), [Documentation Maintenance Checklist](docs-maintenance-checklist.md), [Threat Model](threat-model.md), and the pull request template.

## Universal Review

- The change has a clear purpose.
- The change is scoped to the stated task.
- Planned, scaffolded, implemented, and verified behavior are separated.
- README, AGENTS, docs hub, and relevant contracts are still accurate.
- New durable docs are linked from the correct index.
- Generated files are not edited manually.
- Public-facing language avoids unsupported implementation, speed, security, compatibility, or benchmark claims.
- Follow-up work is explicit when something remains planned.

## Documentation Review

- Page status is present when the page is a durable doc.
- Audience is named when useful.
- Related source-of-truth docs are linked.
- Public docs link to deeper internal contracts.
- Docs do not duplicate large blocks of another page without a reason.
- Terminology matches [Glossary](glossary.md).
- Public docs metadata follows [Public Frontmatter Standard](public-frontmatter-standard.md) once frontmatter is introduced.
- Local Markdown links resolve.

## Implementation Review

Use this after package scaffolding exists:

- Tests cover the smallest complete behavior.
- Package boundaries match [Package Map](package-map.md).
- Shared types live in `@needle/core`.
- Runtime adapters consume generated manifests instead of rediscovering source.
- CLI JSON is stable, compact, and schema-versioned where needed.
- Diagnostics have stable codes and remediation text.
- Production runtime does not ship agent metadata.

## Security Review

- High-risk surfaces are named.
- Threat note exists when required by [Threat Model](threat-model.md).
- Secrets are not exposed in client bundles, generated artifacts, logs, diagnostics, docs outputs, or MCP resources.
- Production errors are sanitized.
- Cache behavior does not expose private data.
- Agent and MCP writes use risk tiers, preview, validation, logging, checks, and human sign-off where required.
- Security claims are supported by exact evidence.

## Performance Review

- Speed-sensitive choices follow [Speed Decisions](speed-decisions.md).
- Performance claims follow [Performance Evidence Checklist](checklists/performance-evidence.md).
- Benchmark claims include raw data, fixture name, commit SHA, environment, run count, and variance.
- Browser delivery claims include route JS, CSS, chunk count, hydration count, likely LCP asset, fonts, images, compression, resource hints, source-map status, and bfcache notes when relevant.
- Lab and field data are not mixed.

## Public Docs Site Review

- Route mapping follows [Website Content Map](website-content-map.md).
- Frontmatter follows [Public Frontmatter Standard](public-frontmatter-standard.md) once parser support exists.
- Public docs remain readable as Markdown.
- Search, navigation, status labels, and source links stay planned until implemented.
- Machine-readable docs do not leak secrets or unsupported claims.

## Before Merge

- Available checks ran.
- Unavailable checks are named with a reason.
- Documentation verification evidence is reported.
- Screenshots or browser evidence are included when UI behavior changes.
- Raw benchmark data is linked when performance claims change.
- The PR template is complete enough for a reviewer to audit the change.

## Out Of Scope For Phase 0

- Treating this checklist as CI enforcement.
- Claiming implementation review gates passed before package scaffolding exists.
- Replacing human review with automated text search.
