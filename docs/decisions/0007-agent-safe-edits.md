# ADR 0007: Agent-Safe Edits

Date: 2026-07-06

Status: proposed

## Context

NeedleStart is agent-native, but unrestricted agent writes are not trustworthy enough for framework-scale projects. The project needs a path where agents can inspect, plan, edit, verify, and explain changes without bypassing human-maintainable safety rules.

## Decision

Use safe edit transactions for agent-driven writes.

Safe edits must validate the target, preview the change, apply structured AST edits where possible, format output, regenerate affected graph or manifests, run affected checks, log mutations, and support undo. High-risk changes require stronger tests and explicit human sign-off in production workflows.

## Consequences

This gives NeedleStart:

- A concrete safety story for agent workflows.
- Auditability for edits.
- Reversible changes.
- Better affected-check selection through Needle Map.

This requires:

- A shared transaction model.
- MCP and CLI write paths that use the same validation.
- Mutation logs.
- Risk tiers.
- Rejected-edit tests, not only successful-edit tests.

## Alternatives Considered

- Let agents edit files directly.
- Make MCP read-only forever.
- Use text replacement as the primary mutation strategy.
- Rely only on git diffs without framework-level validation.

## Related

- [Safe Edit Transactions](../safe-edit-transactions.md)
- [Agent Kernel](../agent-kernel.md)
- [Risk Mitigation](../risk-mitigation.md)
- [Security Contract](../security-contract.md)
