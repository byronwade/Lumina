# Performance

NeedleStart should make route performance visible and enforceable.

## Goals

- Report per-route JS size.
- Report per-route CSS size.
- Warn on public-page hydration bloat.
- Track route mode.
- Expose JSON diagnostics for agents.
- Support reproducible benchmarks.

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
/api/users/[id]        api-hot    0kb     0kb     n/a    pass
```

## Benchmark Fixtures

Planned fixtures:

```txt
benchmarks/
  hello-static/
  hello-ssr/
  json-api-normal/
  json-api-hot/
  blog-1000-pages/
  ecommerce-10000-products/
  large-app-2000-routes/
```

## Benchmark Commands

Planned commands:

```bash
needle bench hello-static
needle bench api-hot
needle bench large-build
```

## Definition of Done

- Route JS and CSS sizes are reported.
- Budgets can warn or fail.
- Public page budgets are stricter by default.
- JSON diagnostics include safe suggestions.
- Benchmarks are reproducible.
