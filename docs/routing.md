# Routing

Status: Planned.

Audience: app developers, framework contributors, AI agents.

NeedleStart plans to use file-based routing under `app/`.

For the exact planned route-discovery rules, route IDs, diagnostics, sorting, and fixture expectations, see [Routing Contract](routing-contract.md).

## Planned Route Mapping

| File | Route |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` |
| `app/docs/[...parts]/page.tsx` | `/docs/*` |
| `app/(marketing)/pricing/page.tsx` | `/pricing` |
| `app/api/health.ts` | `/api/health` |
| `app/api/users/[id].ts` | `/api/users/:id` |

## Requirements

- Route discovery must be deterministic.
- Dynamic params must be parsed.
- Route groups must not affect URL paths.
- API and page routes must be distinguished.
- Manifests must use normalized POSIX-style paths.
- Duplicate normalized route paths must produce diagnostics instead of arbitrary winner selection.
- Route IDs must be deterministic, source-path-derived, stable across operating systems, and independent of absolute local paths.
- Optional catch-all segments such as `[[...slug]]` are reserved for later support and should produce an unsupported-convention diagnostic until implemented.

See `docs/file-conventions.md`, `docs/routing-contract.md`, and `docs/compiler-ir.md`.

## Out Of Scope

- React rendering details.
- Full middleware/proxy behavior.
- React Server Components defaults.
