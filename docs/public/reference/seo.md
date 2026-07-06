# SEO

Status: Planned.

Audience: app developers, SEO reviewers, AI agents.

NeedleStart is planned to make technical SEO inspectable through route metadata, sitemap output, robots output, structured data, and machine-readable SEO reports. This behavior is not implemented yet.

## Planned API

```ts
import { defineMeta, staticPage } from "needlestart"

export const render = staticPage()

export const meta = defineMeta({
  title: "Pricing | Acme",
  description: "Simple pricing for teams.",
  canonical: "/pricing",
  sitemap: {
    include: true,
  },
})
```

Dynamic metadata is planned through `generateMeta()` when a route needs params or data to resolve metadata.

## Planned Checks

Public indexable routes should eventually check:

- Title.
- Description.
- Canonical URL.
- Meaningful initial HTML.
- Sitemap inclusion or documented exclusion reason.
- Robots policy.
- Open Graph and Twitter metadata when configured.
- Structured data when configured.
- Diagnostic severity values of `info`, `warning`, and `error`.
- Client-only routes should require meaningful static fallback HTML before passing public indexable checks.

## Planned Outputs

```txt
.needle/seo.report.json
dist/sitemap.xml
dist/sitemap-index.xml
dist/robots.txt
```

## Notes

- Sitemap output should list canonical URLs.
- Robots output should not be treated as a privacy or security mechanism.
- JSON-LD structured data must be escaped safely.
- Client-only routes should not pass indexable public-page checks unless they provide meaningful static fallback HTML.
- `.needle/seo.report.json` should include route IDs, canonical status, sitemap reasons, robots policy, structured data status, and diagnostics.

## Source

- [SEO Contract](../../seo-contract.md)
- [SEO Engine](../../seo-engine.md)
- [SEO-First Rendering](../concepts/seo-first.md)
