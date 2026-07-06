# Routing

Status: Planned.

Audience: app developers, AI agents.

NeedleStart plans to use file-based routing under `app/`. This page is the public-facing summary. The exact planned compiler contract lives in the internal [Routing Contract](../../routing-contract.md).

## Planned Route Files

| File | Route | Type |
| --- | --- | --- |
| `app/page.tsx` | `/` | Page |
| `app/about/page.tsx` | `/about` | Page |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` | Dynamic page |
| `app/docs/[...parts]/page.tsx` | `/docs/*` | Catch-all page |
| `app/(marketing)/pricing/page.tsx` | `/pricing` | Page inside a route group |
| `app/api/health.ts` | `/api/health` | API route |
| `app/api/users/[id].ts` | `/api/users/:id` | Dynamic API route |

## Planned Rules

- Route groups in parentheses organize files without changing the URL.
- Dynamic segments use bracket syntax such as `[slug]`.
- Catch-all segments use spread bracket syntax such as `[...parts]`.
- Optional catch-all segments such as `[[...slug]]` are reserved for later support and should produce an unsupported-convention diagnostic until implemented.
- API route files live under `app/api/`.
- Generated route manifests must use normalized paths and stable ordering.
- Conflicting route files should produce diagnostics instead of arbitrary behavior.
- Route IDs must be deterministic, path-derived, stable across operating systems, and independent of absolute local paths.

## Planned Generated Output

Route discovery should emit `.needle/routes.json` with route IDs, route paths, source files, params, layouts, route groups, and diagnostics.

This output does not exist yet because route discovery is still planned.

## Source

- [Routing](../../routing.md)
- [Routing Contract](../../routing-contract.md)
- [File Conventions](../../file-conventions.md)
- [Manifest Contracts](../../manifest-contracts.md)
