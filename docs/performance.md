# Performance

Status: Planned.
Audience: maintainers, performance reviewers, framework contributors.

NeedleStart should make route performance visible and enforceable. See `docs/speed-strategy.md` for the whole-system speed model across compiler, runtime, client payload, app graph, agents, and benchmarks.

The planned route budget, Core Web Vitals target, performance report, diagnostic, delivery-field, benchmark, and claim-evidence rules are defined in [Performance Contract](performance-contract.md).

## Goals

- Report per-route JS size.
- Report per-route CSS size.
- Warn on public-page hydration bloat.
- Track route mode.
- Track route delivery evidence for images, fonts, scripts, resource hints, compression, 103 Early Hints, and bfcache eligibility.
- Track source-map exposure, optional RUM, and field data status without making them default framework telemetry.
- Expose JSON diagnostics for agents.
- Support reproducible benchmarks.

Core Web Vitals targets use LCP, INP, and CLS. These are targets, not verified claims, until browser evidence exists.

## Budget Config Draft

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  performance: {
    budgets: {
      publicPageJs: "80kb",
      routeCss: "30kb",
      lcpImageMaxBytes: "180kb",
      maxHydrationComponents: 12,
    },
    failBuildOnBudget: true,
  },
})
```

## CLI Output Draft

```txt
Route                  Mode       JS      CSS     SEO    Budget
/                      static     18kb    6kb     pass   pass
/blog/[slug]           prerender  24kb    8kb     pass   pass
/dashboard             ssr        210kb   26kb    n/a    warn
/api/users/[id]        hot-api    0kb     0kb     n/a    pass
```

## Planned Report And Diagnostics

NeedleStart plans to emit `.needle/perf.report.json` with route IDs, render modes, budgets, delivery metadata, chunk count, source-map exposure, diagnostics, and benchmark evidence references when claims are made.

Performance diagnostics should use `PERF_` code prefixes and follow [Diagnostics Contract](diagnostics-contract.md).

Delivery metadata should include route-specific `resourceHints`, image, font, script, compression, 103 Early Hints, and bfcache evidence when those surfaces exist.

Public speed claims require benchmark evidence, raw results, methodology, and comparable fixture details. RUM and field data remain optional app-owned evidence, not default framework collection.

## Benchmark Fixtures

Planned fixtures:

```txt
benchmarks/
  basic-static/
  basic-ssr/
  api-json/
  hot-api/
  blog-seo/
  dashboard-client/
  large-route-graph/
```

## Benchmark Commands

Planned commands:

```bash
needle bench basic-static
needle bench hot-api
needle bench large-route-graph
```

Benchmark claims must follow `docs/benchmark-methodology.md`. Public performance claims need raw data, environment metadata, and comparable fixture details.

Public-facing performance expectations live in [Public Performance Reference](public/reference/performance.md).

## Definition of Done

- Route JS and CSS sizes are reported.
- Budgets can warn or fail.
- Public page budgets are stricter by default.
- JSON diagnostics include safe suggestions.
- Benchmarks are reproducible.
- Speed claims are backed by the evidence required in `docs/speed-strategy.md` and `docs/benchmark-methodology.md`.
