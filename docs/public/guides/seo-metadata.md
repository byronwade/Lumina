# Add SEO Metadata

Status: Planned.

Audience: app developers, AI agents.

This guide describes the planned workflow for adding route metadata.

## Planned API

```ts
import { defineMeta } from "needlestart"

export const meta = defineMeta({
  title: "Pricing",
  description: "Simple pricing for teams.",
  canonical: "/pricing",
})
```

Use planned `generateMeta()` only when a route needs params or data to resolve metadata. Static metadata should stay static when possible.

## Planned Checks

`needle seo` should eventually verify:

- title
- description
- canonical URL
- robots policy
- meaningful initial HTML
- sitemap inclusion
- structured data when configured
- `.needle/seo.report.json` output
- diagnostic severity values of `info`, `warning`, and `error`
- client-only fallback HTML before a route is treated as indexable

## Source

- [SEO-First Rendering](../concepts/seo-first.md)
- [SEO Reference](../reference/seo.md)
- [SEO Engine](../../seo-engine.md)
- [SEO Contract](../../seo-contract.md)

