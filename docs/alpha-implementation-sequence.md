# Alpha Implementation Sequence

Status: Planned.
Audience: AI agents, maintainers, framework contributors.

This page describes the intended MVP Alpha implementation order. It is a planning guide, not evidence that the behavior exists.

## Sequence

1. Harden shared core model shapes in `@lumina/core`.
2. Add route discovery for the MVP Alpha demo route set.
3. Generate deterministic `.lumina/routes.json`.
4. Add explicit static and basic SSR render-mode data.
5. Generate deterministic `.lumina/render-manifest.json`.
6. Generate first file-level `.lumina/map.json`.
7. Add `lumina routes --json`.
8. Add `lumina inspect --json` and `lumina inspect why`.
9. Add demo app fixtures that prove the route/render/map/CLI path.
10. Run release-readiness review for the Alpha slice.

## Slice Rule

Each slice should end with:

- a focused fixture,
- deterministic JSON snapshot evidence when output is agent-facing,
- docs updates,
- `bun run check`,
- an issue or backlog note updated only when acceptance criteria are actually met.

## Deferred Until After MVP Alpha

- API routes.
- Hot API.
- Full SEO and cache system.
- MCP.
- Safe edit writes.
- Full agent context capsules.
- Node and static runtime behavior.
- Migration tooling.
- Benchmark publishing.
- Devtools.
