# SEO Engine

NeedleStart is SEO-first. Public routes should render meaningful HTML by default and expose their indexability through machine-readable reports.

## Product Promise

No SEO archaeology. Every route tells you whether it can be crawled, indexed, shared, and trusted.

## Goals

- Public pages render meaningful HTML.
- Every indexable page has metadata.
- Every indexable page can be included in a sitemap.
- Canonical URLs are explicit.
- Bot-specific dynamic rendering is not the default strategy.
- Structured data is typed.
- SEO reports are machine-readable.

## Public API Draft

```ts
import { defineMeta } from "needlestart"

export const meta = defineMeta({
  title: "Pricing | Acme",
  description: "Simple pricing for teams.",
  canonical: "/pricing",
  openGraph: {
    title: "Pricing | Acme",
    image: "/og/pricing",
  },
  structuredData: [
    organizationSchema({
      name: "Acme",
      url: "https://acme.com",
    }),
  ],
})
```

## Features

- `defineMeta()`
- Static metadata.
- Dynamic metadata.
- Title and description.
- Canonical URLs.
- Open Graph.
- Twitter/X cards.
- JSON-LD helpers.
- `robots.txt`.
- `sitemap.xml`.
- Sitemap indexes for large sites.
- RSS, Atom, and JSON feeds.
- `hreflang`.
- 404 and 410 status helpers.
- SEO audit CLI.
- Crawler preview.

## SEO Audit Output

```json
{
  "route": "/pricing",
  "status": "pass",
  "checks": {
    "title": "pass",
    "description": "pass",
    "canonical": "pass",
    "indexableHtml": "pass",
    "openGraph": "pass",
    "structuredData": "pass",
    "sitemap": "included"
  }
}
```

## CLI

Planned commands:

```bash
needle seo
needle seo --json
needle seo --route /pricing
```

## Required Checks

Public indexable routes should check:

- Title exists.
- Description exists.
- Canonical URL exists.
- Initial HTML has meaningful content.
- Route appears in sitemap unless excluded.
- Open Graph image is valid when configured.
- Structured data validates when configured.
- 404 and 410 pages return correct status.

## Out of Scope for Early SEO

- Full search engine simulation.
- Keyword scoring.
- Third-party SEO SaaS integration.
- Bot-specific dynamic rendering.
