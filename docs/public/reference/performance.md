# Performance

Status: Planned.

Audience: app developers, performance reviewers, framework contributors, AI agents.

NeedleStart performance tooling is planned but not implemented yet. This page summarizes the public performance expectations for future route budgets, reports, and benchmark evidence.

## Planned Surfaces

NeedleStart should eventually report:

- Route JavaScript size.
- Route CSS size.
- Route chunk count and browser waterfall risk.
- Public HTML size.
- Hydration component count.
- Production source-map and debug payload exposure.
- Resource hint status.
- Image, font, script, compression, 103 Early Hints, and bfcache checks when those surfaces exist.
- Optional RUM or field-data status when an app chooses to instrument it.
- Render mode.
- Performance budget status.
- Route-level diagnostics.
- Benchmark evidence when claims are made.
- `PERF_` diagnostics for budget, delivery, source-map, Core Web Vitals, compression, Early Hints, bfcache, and benchmark issues.

## Core Web Vitals Targets

Official examples should eventually target:

| Metric | Target |
| --- | --- |
| LCP | 2.5s or less |
| INP | 200ms or less |
| CLS | 0.1 or less |

These are targets, not verified claims.

## Planned Report

NeedleStart plans to generate:

```txt
.needle/perf.report.json
```

The report should include route IDs, paths, render modes, payload sizes, chunk count, source-map exposure, budget status, and diagnostics.

It should also include planned route delivery metadata for scripts, styles, images, fonts, resource hints through `resourceHints`, compression, 103 Early Hints eligibility, bfcache blockers, and optional RUM or field data evidence once those features exist.

## Public Claims

Do not claim NeedleStart is faster than another framework unless the claim links to:

- Fixture source.
- Runtime versions.
- Dependency versions.
- Hardware and OS metadata.
- Command run.
- Raw results.
- Methodology.
- Benchmark evidence that explains equivalent behavior.

RUM and field data remain optional app-owned evidence, not default framework telemetry.

## Current Reality

The repository is in Phase 1 scaffold. Performance reports, benchmark commands, and Core Web Vitals evidence do not exist yet.

## Source

- [Performance Contract](../../performance-contract.md)
- [Speed Decisions](../../speed-decisions.md)
- [Benchmark Methodology](../../benchmark-methodology.md)
- [Testing](testing.md)
- [Manifest Contracts](manifest-contracts.md)
