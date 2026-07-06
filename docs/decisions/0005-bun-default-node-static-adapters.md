# ADR 0005: Bun Default With Node And Static Adapters

Date: 2026-07-06

Status: proposed

## Context

NeedleStart wants a fast default runtime path, but Bun adoption concerns should not make the framework feel locked to one runtime. The first adapter model must support speed while preserving a credible compatibility story.

## Decision

Use Bun as the default runtime adapter path, and design Node and static adapters early.

User application code must not require Bun-only APIs. Bun-specific behavior belongs in `@needle/adapter-bun`. Node compatibility belongs in `@needle/adapter-node`. Static export belongs in `@needle/adapter-static`.

The adapter manifest records runtime capabilities, unsupported features, native route dispatch, compression, Early Hints, resource hints, bfcache-aware headers, environment variables, and diagnostics.

## Consequences

This gives NeedleStart:

- A fast default.
- Clear runtime boundaries.
- Earlier adoption confidence for teams that cannot deploy Bun immediately.
- Separate benchmark tracks for Bun, Node, and static output.

This requires:

- Adapter parity fixtures.
- Separate compatibility evidence.
- Runtime docs that do not imply Node/static behavior is verified before tests exist.
- Strict enforcement that app code stays runtime-portable.

## Alternatives Considered

- Bun-only framework APIs.
- Node-first runtime.
- Static-only prototype.
- Deferring adapters until after the core runtime.

## Related

- [Adapter Contract](../adapter-contract.md)
- [Adapter Architecture](../adapters.md)
- [Runtime Contract](../runtime-contract.md)
- [Speed Decisions](../speed-decisions.md)
