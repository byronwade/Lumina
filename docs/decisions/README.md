# Architecture Decision Records

Status: Planned.

Audience: maintainers, contributors, AI agents.

This directory stores NeedleStart architecture decision records. ADRs are durable records of important choices, tradeoffs, and rejected alternatives. They are not implementation evidence.

Use an ADR when a decision affects:

- Build or runtime architecture.
- Package boundaries.
- Generated artifacts.
- Public APIs or documented defaults.
- Safety, security, or agent workflow.
- Performance posture.
- Documentation structure.

## Records

- [0001: Runtime and Build Split](0001-runtime-and-build-split.md)
- [0002: Agent-Native Core](0002-agent-native-core.md)
- [0003: Risk Mitigation From Day One](0003-risk-mitigation-from-day-one.md)
- [0004: Vite/Rolldown Before Custom Bundler](0004-vite-rolldown-before-custom-bundler.md)
- [0005: Bun Default With Node And Static Adapters](0005-bun-default-node-static-adapters.md)
- [0006: Static-First Rendering](0006-static-first-rendering.md)
- [0007: Agent-Safe Edits](0007-agent-safe-edits.md)
- [0008: Docs-Level AI Playbooks](0008-docs-level-ai-playbooks.md)

## Status Values

- `proposed`: accepted for planning, not proven by implementation.
- `accepted`: proven enough to guide implementation.
- `superseded`: replaced by a later ADR.
- `deprecated`: no longer recommended.

Phase 0 ADRs should normally stay `proposed` until implementation and verification exist.

## Maintenance Rules

- Keep ADRs short and specific.
- Link to deeper source docs instead of duplicating entire contracts.
- Update or supersede an ADR when the decision changes.
- Do not mark a decision implemented until code and tests prove it.
