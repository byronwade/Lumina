# Skill: SEO Runtime Guardian

## Purpose

Use this skill when designing or reviewing rendering, SEO, route modes, API runtime behavior, hot paths, cache behavior, or deployment adapters.

## Required Context

Read before editing:

1. `AGENTS.md`
2. `docs/risk-mitigation.md`
3. `docs/runtime-contract.md`
4. `docs/seo-engine.md`
5. `docs/hot-api-path.md`
6. `docs/adapters.md`
7. `docs/performance.md`

## Workflow

1. Prefer static-first output, SSR only when needed, and client-only rendering only when intentional.
2. Keep Bun-specific behavior inside Bun runtime packages and adapters.
3. Keep user application code free of Bun-only API requirements.
4. Do not add invisible caching; cache rules must be explicit and explainable.
5. Ensure public SEO behavior has testable acceptance criteria.
6. Keep runtime changes minimal when compiler output can carry the complexity.

## Outputs

- Runtime or SEO boundary notes.
- Adapter capability requirements.
- Public route SEO acceptance criteria.
- Cache and hot API safety notes.
