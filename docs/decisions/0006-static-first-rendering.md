# ADR 0006: Static-First Rendering

Date: 2026-07-06

Status: proposed

## Context

NeedleStart is SEO-first and speed-sensitive. Public routes should avoid request-time work when static output is safe. SSR, streaming, and client-only rendering remain important, but making them implicit defaults would hurt predictability, crawler behavior, cache clarity, and performance evidence.

## Decision

Use static-first rendering as the default posture.

Every route should explain its render mode through compiler output and manifests. Public pages should prefer static HTML where safe. SSR is used when request-time data or runtime behavior requires it. Streaming is an opt-in route capability. Client-only rendering must be intentional and visible in generated output.

## Consequences

This gives NeedleStart:

- Better default SEO behavior.
- Less request-path work.
- Clearer cache and render explanations.
- Stronger route-level diagnostics.

This requires:

- Route fixtures for static, prerendered, SSR, streaming, client-only, API, and hot API modes.
- SEO checks for public pages.
- Render manifest snapshots.
- Diagnostics when a public route accidentally becomes client-heavy or unindexable.

## Alternatives Considered

- SSR by default.
- Client-only rendering by default.
- React Server Components as the first default render path.
- Streaming SSR for every dynamic route.

## Related

- [Routing Contract](../routing-contract.md)
- [Runtime Contract](../runtime-contract.md)
- [SEO Contract](../seo-contract.md)
- [Performance Contract](../performance-contract.md)
