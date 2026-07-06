# Adapter Implementation Checklist

Status: Planned.

Audience: adapter authors, runtime contributors, maintainers, AI agents.

Use this checklist before implementing Bun, Node, static, or future deployment adapters. It complements [Adapter Contract](../adapter-contract.md).

## Read First

- [Adapter Contract](../adapter-contract.md)
- [Adapter Architecture](../adapters.md)
- [Runtime Contract](../runtime-contract.md)
- [Cache Contract](../cache-contract.md)
- [Security Contract](../security-contract.md)
- [Speed Decisions](../speed-decisions.md)

## Capability Gate

Every adapter must document:

- runtime name and version range,
- entry file,
- public directory,
- supported route modes,
- native route dispatch support,
- compression support,
- 103 Early Hints support,
- resource hint support,
- bfcache-aware header behavior,
- health endpoint behavior,
- unsupported features and reasons.

## Implementation Rules

- Runtime adapters consume generated manifests and handlers.
- Runtime adapters must not rediscover source route files.
- User app code must not import Bun-only APIs.
- Static asset and prerendered HTML lookup happens before SSR work.
- API and hot API handlers bypass React rendering.
- Cache headers come from the cache contract, not adapter guesses.
- Production errors must be sanitized.

## Required Fixtures

Before marking an adapter verified:

- static asset serving,
- static route,
- prerendered route,
- SSR route,
- API route,
- hot API route,
- cache header behavior,
- production error sanitization,
- adapter manifest snapshot,
- unsupported capability diagnostic,
- health endpoint enabled and disabled,
- compression negotiation if supported,
- Early Hints or unsupported diagnostic,
- native route dispatch parity if enabled.

## Docs To Update

- [Adapter Contract](../adapter-contract.md)
- [Adapter Architecture](../adapters.md)
- [Runtime Contract](../runtime-contract.md)
- [Compatibility](../compatibility.md)
- [Deployment](../deployment.md)
- [Public Adapter Reference](../public/reference/adapters.md)

## Stop Conditions

Pause and create a decision record if:

- adapter behavior requires a new generated artifact,
- platform-specific code leaks into `@needle/core`,
- a capability cannot be tested locally,
- cache, security, or routing behavior conflicts with a contract.
