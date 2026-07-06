# Summary

Describe what changed and why.

## Type Of Change

- [ ] Documentation only
- [ ] Package scaffold
- [ ] Feature implementation
- [ ] Bug fix
- [ ] Architecture change
- [ ] Security-sensitive change
- [ ] Benchmark or performance change

## Status Honesty

- [ ] `docs/engineering-standards.md` was applied.
- [ ] `docs/review-checklist.md` was applied.
- [ ] Planned, scaffolded, implemented, and verified behavior are clearly separated.
- [ ] No unimplemented command or API is described as working.
- [ ] `docs/status.md` is still accurate.

## Documentation Checklist

- [ ] `README.md` is still accurate.
- [ ] `AGENTS.md` is still accurate.
- [ ] `docs/README.md` links any new durable docs.
- [ ] `docs/docs-freshness-policy.md` was applied.
- [ ] `docs/docs-maintenance-checklist.md` was applied.
- [ ] `docs/docs-verification.md` was applied.
- [ ] `docs/first-contribution.md` was applied when first-time contributor guidance changed.
- [ ] `docs/decisions/README.md` and `docs/templates/adr-template.md` were applied when durable architecture decisions changed.
- [ ] `docs/public-frontmatter-standard.md` was applied when public docs metadata, future frontmatter fields, route metadata, or docs-site validation changed.
- [ ] `docs/testing-contract.md` was applied when test commands, fixtures, snapshots, CI gates, browser tests, security tests, performance tests, or evidence reporting changed.
- [ ] `docs/cli-json-contract.md` was applied when CLI JSON, diagnostics, exit codes, or command automation behavior changed.
- [ ] `docs/diagnostics-contract.md` was applied when diagnostic codes, severity levels, source locations, remediations, docs links, child diagnostics, JSON ordering, or code frames changed.
- [ ] `docs/config-contract.md` was applied when config loading, validation, env behavior, or normalized config output changed.
- [ ] `docs/adapter-contract.md` was applied when adapter packages, adapter manifests, deployment output, static export behavior, health endpoints, adapter env vars, compatibility evidence, or adapter capability claims changed.
- [ ] `docs/examples-contract.md` was applied when examples, starter templates, fixtures, create-command example support, or public guide snippets changed.
- [ ] `docs/examples-catalog.md` was applied when official example inventory, status, or public guide mapping changed.
- [ ] `docs/routing-contract.md` was applied when route discovery, route IDs, route manifest fields, route sorting, route diagnostics, or route fixtures changed.
- [ ] `docs/api-route-contract.md` was applied when API handlers, method exports, validation, response behavior, diagnostics, cache defaults, security rules, manifests, or fixtures changed.
- [ ] `docs/schema-contract.md` was applied when schema helpers, validation result shape, query coercion, serializers, OpenAPI mapping, diagnostics, manifests, or fixtures changed.
- [ ] `docs/cache-contract.md` was applied when cache modes, headers, tags, revalidation, micro-cache behavior, diagnostics, security rules, manifests, or fixtures changed.
- [ ] `docs/seo-contract.md` was applied when metadata helpers, metadata merge behavior, sitemap output, robots output, structured data, SEO diagnostics, SEO reports, or public HTML checks changed.
- [ ] `docs/accessibility-contract.md` was applied when framework-owned HTML, examples, docs UI, form errors, route focus behavior, accessibility diagnostics, or accessibility evidence changed.
- [ ] `docs/security-contract.md` was applied when high-risk surfaces, secret handling, production errors, security headers, agent/MCP writes, vulnerability intake, package publishing, or security evidence changed.
- [ ] `docs/threat-model.md` was applied when high-risk implementation work, agent writes, MCP behavior, generated artifacts, cache behavior, runtime routing, release flow, or public docs outputs changed.
- [ ] `docs/performance-contract.md` was applied when route budgets, performance diagnostics, `.needle/perf.report.json`, benchmark evidence, Core Web Vitals language, or public speed claims changed.
- [ ] `docs/benchmark-fixtures.md` was applied when benchmark fixture names, fixture scope, raw result layout, or performance evidence paths changed.
- [ ] `docs/speed-decisions.md` and `docs/speed-capability-audit.md` were applied when rendering defaults, build pipeline, runtime request path, React Compiler, React streaming, resource hints, fetch priority, 103 Early Hints, speculation rules, bfcache, image/font delivery, compression, hot APIs, cache strategy, compiler scaling, or benchmark positioning changed.
- [ ] `docs/public-docs-site-architecture.md` was applied when public docs metadata, routes, navigation, or renderer assumptions changed.
- [ ] `docs/docs-site-build-plan.md` was applied when public docs implementation phases, renderer decision gates, search, navigation, accessibility, or machine-readable output plans changed.
- [ ] `docs/versioning-and-upgrades.md` was applied when public APIs, CLI output, config, manifests, compatibility, deprecations, or release behavior changed.
- [ ] Relevant reference docs were updated.
- [ ] Generated files or manifests are documented if they changed.

Docs checked but intentionally not changed:

```txt

```

## Safety And Evidence

- [ ] High-risk areas are called out.
- [ ] Threat note is included for high-risk implementation work.
- [ ] Security-sensitive changes include validation and review notes.
- [ ] Benchmark claims include raw data and methodology.
- [ ] Benchmark fixture name and raw result path are included when performance evidence changed.
- [ ] Speed-sensitive changes were checked against `docs/speed-strategy.md` and `docs/speed-decisions.md`.
- [ ] Test-sensitive changes were checked against `docs/testing-contract.md`.
- [ ] Agent-facing JSON changes are stable, compact, and schema-versioned where possible.

Threat note, if required:

```txt

```

## Checks

Commands run:

```bash

```

Documentation evidence:

```txt

```

Commands not run and why:

```txt

```
