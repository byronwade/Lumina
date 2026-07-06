# SEO Contract

Status: Planned.

Audience: framework contributors, app developers, SEO reviewers, runtime adapter authors, AI agents.

This page defines the planned SEO contract for NeedleStart. SEO behavior is not implemented yet. The contract exists so route metadata, public HTML, sitemap output, robots output, structured data, generated manifests, CLI audits, and agent context all describe the same behavior.

## Goals

- Public routes render meaningful HTML before client JavaScript is required.
- Metadata is typed, mergeable, deterministic, and inspectable.
- Sitemap and robots output are generated from route facts, not hand-maintained side files.
- Structured data is typed and escaped safely.
- SEO diagnostics are stable enough for CLI, CI, MCP, and agent workflows.
- Search behavior is not guessed. The framework reports technical readiness, not ranking promises.
- SEO checks that inspect public HTML must stay aligned with [Accessibility Contract](accessibility-contract.md) for headings, links, image alt text, and meaningful content.

## Research Notes

This contract follows current patterns from mature framework and search docs:

- Next.js documents static and generated metadata as typed route exports and ties dynamic metadata to rendering and caching behavior.
- Next.js documents JSON-LD as structured data that helps search engines and AI systems understand page meaning.
- Nuxt documents a typed SEO meta API to avoid tag-name mistakes and unsafe output.
- SvelteKit frames SEO around SSR, performance, normalized URLs, manual metadata, and sitemaps.
- Astro documents sitemap generation as a first-class integration for crawl discovery.
- Google Search Central says robots.txt manages crawler access and is not a reliable way to hide pages from search results.
- Google Search Central says sitemaps should list preferred canonical URLs and may be advertised from robots.txt.
- Google Search Central treats its structured data docs as definitive for Google Search behavior, even when schema.org provides the vocabulary.
- WAI and MDN accessibility guidance reinforce that meaningful HTML, headings, link text, and image alternatives serve people first and also overlap with technical SEO checks.

Source links:

- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld)
- [Nuxt useSeoMeta](https://nuxt.com/docs/4.x/api/composables/use-seo-meta)
- [SvelteKit SEO](https://svelte.dev/docs/kit/seo)
- [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Google robots.txt guide](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google sitemap guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

## Planned Public API

Route metadata should be declared with a static object or a generated function.

```ts
import { defineMeta, staticPage } from "needlestart"

export const render = staticPage()

export const meta = defineMeta({
  title: "Pricing | Acme",
  description: "Simple pricing for teams.",
  canonical: "/pricing",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Pricing | Acme",
    description: "Simple pricing for teams.",
    image: "/og/pricing.png",
  },
  twitter: {
    card: "summary_large_image",
  },
  sitemap: {
    include: true,
    priority: 0.8,
    changeFrequency: "weekly",
  },
  structuredData: [
    {
      "@type": "Product",
      name: "Acme Pro",
      description: "Team plan for Acme.",
    },
  ],
})
```

Dynamic metadata is planned but must stay deterministic for static or prerendered routes.

```ts
import { defineMeta } from "needlestart"

export async function generateMeta({ params }) {
  const article = await getArticle(params.slug)

  return defineMeta({
    title: article.title,
    description: article.summary,
    canonical: `/blog/${params.slug}`,
    sitemap: {
      include: article.public,
      lastModified: article.updatedAt,
    },
  })
}
```

Exact helper names and option names must be finalized with tests before public API docs mark them implemented.

## Metadata Shape

Planned `defineMeta()` input:

```ts
type RouteMeta = {
  title?: string
  description?: string
  canonical?: string
  robots?: RobotsMeta
  openGraph?: OpenGraphMeta
  twitter?: TwitterMeta
  alternates?: AlternateMeta[]
  sitemap?: SitemapMeta
  structuredData?: StructuredData[]
  other?: Record<string, string | string[]>
}
```

Required fields for public indexable HTML routes:

| Field | Required when | Notes |
| --- | --- | --- |
| `title` | Route is public and indexable | Must resolve to non-empty text. |
| `description` | Route is public and indexable | Must be meaningful text, not copied boilerplate for every route. |
| `canonical` | Route is public and indexable | Must be absolute at output time or resolvable from configured site URL. |
| `robots` | Route is non-indexable or has special crawler policy | Omitted policy defaults to index/follow for public routes. |
| `sitemap.include` | Route is public | Defaults are computed from route visibility and canonical status. |

## Merge Rules

Metadata should merge from root layout to nested layout to page.

Planned merge order:

1. Project SEO defaults from `needle.config.ts`.
2. Root layout metadata.
3. Nested layout metadata in route order.
4. Page metadata.
5. Generated metadata from `generateMeta()`.

Merge behavior:

- Scalars such as `title`, `description`, `canonical`, and robots directives use the nearest route value.
- `openGraph`, `twitter`, and `sitemap` merge shallowly unless a field is explicitly set to `null`.
- `structuredData` appends by default and may be replaced with `structuredData: { replace: true, items: [...] }` if that option survives API design.
- `other` metadata is allowed only for string or string-array values and must serialize deterministically.
- Conflicting canonical URLs across the same route produce diagnostics.

## HTML Output

Planned HTML output:

- `<title>` for resolved title.
- `<meta name="description">` for description.
- `<link rel="canonical">` for canonical URL.
- `<meta name="robots">` for page-level robots directives when non-default or explicitly configured.
- Open Graph and Twitter tags when configured.
- `<link rel="alternate" hreflang="...">` for configured alternates.
- `<script type="application/ld+json">` for JSON-LD structured data.

Output rules:

- Metadata emitted for static and prerendered pages must be available in the initial HTML.
- SSR metadata may be dynamic, but route mode and cache plan must explain why.
- Client-only routes cannot pass public indexable checks unless they provide static public fallback HTML.
- JSON-LD must be serialized with safe escaping for `<`, `>`, `&`, and Unicode line separators.
- Duplicate tags must be deduplicated by stable key, not by source order alone.

## Sitemap Rules

Planned sitemap output:

```txt
dist/sitemap.xml
dist/sitemap-index.xml
```

Route inclusion defaults:

| Route state | Default sitemap behavior |
| --- | --- |
| Public static route with canonical URL | Include |
| Public prerendered route with canonical URL | Include |
| Public SSR route with stable canonical URL | Include only when route declares `sitemap.include: true` or a route source enumerates URLs |
| API route | Exclude |
| Client-only route | Exclude unless static fallback and canonical URL are configured |
| `robots.index: false` | Exclude |
| Redirect route | Exclude target unless target route is canonical and indexable |
| 404, 410, auth, dashboard, or internal route | Exclude |

Rules:

- Sitemaps list canonical URLs, not every reachable URL.
- Sitemap URLs must be absolute at output time.
- Large sitemap splitting must be deterministic.
- Sitemap entries must include source route ID, source file, and reason in `.needle/seo.report.json`.
- `lastModified`, `changeFrequency`, and `priority` are allowed only when configured or known from source facts.

## Robots Rules

Planned robots output:

```txt
dist/robots.txt
```

Rules:

- `robots.txt` is generated from project-level crawl policy and sitemap locations.
- `robots.txt` must include sitemap URLs when sitemap output is enabled.
- `robots.txt` must not be documented as a privacy or security mechanism.
- Page-level noindex must use metadata or headers, not only `robots.txt`.
- Unsupported crawler directives should produce warnings rather than silent output.

## Structured Data Rules

Structured data is planned as a typed helper layer over JSON-LD.

Rules:

- JSON-LD must be valid JSON after serialization.
- Route-level structured data must not include secrets, auth-only data, or request-only personalization.
- Helpers should start with a small set: `organizationSchema`, `websiteSchema`, `breadcrumbSchema`, `articleSchema`, and `productSchema`.
- Unsupported schema helpers are out of scope until the small set has fixtures.
- Structured data diagnostics should name the route, helper, missing field, and source file.

## Generated Report

Planned `.needle/seo.report.json` shape:

```json
{
  "schemaVersion": "0.1.0",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "routes": [
    {
      "routeId": "app/pricing/page",
      "path": "/pricing",
      "sourceFile": "app/pricing/page.tsx",
      "indexable": true,
      "title": "Pricing | Acme",
      "description": "Simple pricing for teams.",
      "canonical": "https://example.com/pricing",
      "sitemap": {
        "included": true,
        "reason": "public-static-canonical"
      },
      "robots": {
        "index": true,
        "follow": true
      },
      "structuredData": [
        {
          "type": "Product",
          "valid": true
        }
      ],
      "diagnostics": []
    }
  ]
}
```

Rules:

- Paths use normalized POSIX separators.
- Routes are sorted by route ID.
- Every sitemap inclusion or exclusion includes a reason.
- Report output is stable enough for snapshots.
- Route context capsules must include SEO status for the route slice they describe.

## Diagnostics

Planned diagnostic codes:

| Code | Severity | Meaning |
| --- | --- | --- |
| `SEO_TITLE_MISSING` | `error` | Public indexable route has no title. |
| `SEO_DESCRIPTION_MISSING` | `error` | Public indexable route has no description. |
| `SEO_CANONICAL_MISSING` | `error` | Public indexable route has no canonical URL. |
| `SEO_CANONICAL_CONFLICT` | `error` | Multiple metadata layers define incompatible canonical URLs. |
| `SEO_CANONICAL_INVALID` | `error` | Canonical URL cannot be normalized from site URL and route path. |
| `SEO_ROBOTS_CONFLICT` | `warning` | Robots policy conflicts with sitemap inclusion or route visibility. |
| `SEO_SITEMAP_DYNAMIC_UNBOUNDED` | `warning` | Dynamic route requests sitemap inclusion without an enumerated URL source. |
| `SEO_STRUCTURED_DATA_INVALID` | `error` | JSON-LD helper output is invalid or missing required fields. |
| `SEO_STRUCTURED_DATA_UNSAFE` | `error` | Structured data includes unsafe request, secret, or auth-only data. |
| `SEO_HTML_EMPTY` | `error` | Public route does not render meaningful initial HTML. |
| `SEO_CLIENT_ONLY_INDEXABLE` | `warning` | Client-only route is marked indexable without a static fallback. |

Diagnostics must use the shared CLI JSON diagnostic shape from [CLI JSON Contract](cli-json-contract.md).

## CLI Behavior

Planned commands:

```bash
needle seo
needle seo --json
needle seo --route /pricing
needle seo --sitemap
needle seo --strict
```

`needle seo --json` must use the shared envelope from [CLI JSON Contract](cli-json-contract.md).

Planned command data shape:

```json
{
  "routesChecked": 24,
  "routesPassed": 22,
  "routesFailed": 2,
  "sitemapEntries": 18,
  "reportPath": ".needle/seo.report.json"
}
```

## Security And Privacy

- SEO output must not include secrets or auth-only data.
- Authenticated, dashboard, billing, account, and admin routes default to non-indexable and sitemap-excluded unless explicitly marked public.
- Robots output is not a data protection control.
- Structured data must not serialize user-specific request data.
- Error pages must avoid stack traces and private data in public HTML.

## Fixture Requirements

Future implementation must include fixtures for:

- Static route with valid metadata.
- Public route missing title.
- Public route missing description.
- Public route missing canonical.
- Layout and page metadata merge.
- Conflicting canonical URLs.
- Dynamic metadata on prerendered route.
- Dynamic sitemap route with enumerated URLs.
- Dynamic sitemap route without enumerated URLs.
- Noindex page excluded from sitemap.
- Auth route excluded from sitemap.
- Robots output with sitemap URL.
- JSON-LD valid output.
- JSON-LD invalid output.
- Client-only route with no public fallback.
- Meaningful initial HTML check.

## Out Of Scope For First Implementation

- Ranking prediction.
- Keyword scoring.
- Search Console integration.
- Automatic content quality grading.
- Bot-specific dynamic rendering as a primary SEO strategy.
- Full schema.org helper coverage.

## Related Docs

- [SEO Engine](seo-engine.md)
- [Public SEO Reference](public/reference/seo.md)
- [Public SEO Concept](public/concepts/seo-first.md)
- [Routing Contract](routing-contract.md)
- [Runtime Contract](runtime-contract.md)
- [Cache Contract](cache-contract.md)
- [Manifest Contracts](manifest-contracts.md)
- [CLI JSON Contract](cli-json-contract.md)
- [Product Build Readiness](product-build-readiness.md)
