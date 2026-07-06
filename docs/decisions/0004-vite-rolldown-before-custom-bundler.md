# ADR 0004: Vite/Rolldown Before Custom Bundler

Date: 2026-07-06

Status: proposed

## Context

NeedleStart needs a fast frontend build path, React ecosystem compatibility, CSS and asset handling, HMR, and production build output. Building a custom bundler first would consume the project before the app graph, SEO, and agent-native wedge is proven.

Current speed research in [Speed Decisions](../speed-decisions.md) points to the stable Vite 8.x/Rolldown path as the default candidate when package scaffolding begins, subject to a fresh source check at implementation time.

## Decision

Use Vite/Rolldown as the frontend build foundation before considering a custom bundler.

The Needle compiler owns route intelligence, render modes, SEO extraction, cache plans, API codegen, agent context, app graph generation, and framework manifests. Vite/Rolldown owns frontend build mechanics such as React transforms, CSS, assets, chunks, HMR, minification, and build manifests.

Do not start custom bundler work until Vite/Rolldown limits are measured in NeedleStart fixtures and documented in benchmark evidence.

## Consequences

This gives NeedleStart:

- A credible build system earlier.
- Ecosystem plugin leverage.
- A smaller first implementation surface.
- A clearer boundary between framework intelligence and bundling.

This requires:

- Vite plugin integration tests.
- Build output snapshots.
- Large-app build and dev timing fixtures.
- Migration notes when Vite/Rolldown versions change.

## Alternatives Considered

- Build a custom bundler immediately.
- Use only Vite with no Needle compiler.
- Defer frontend build decisions until after runtime work.

## Related

- [Speed Decisions](../speed-decisions.md)
- [Speed Capability Audit](../speed-capability-audit.md)
- [Compiler IR](../compiler-ir.md)
- [Benchmark Methodology](../benchmark-methodology.md)
