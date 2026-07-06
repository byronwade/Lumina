# Agent-Native Development

Status: Planned.

Audience: AI agents, app developers, maintainers.

NeedleStart is designed for a future where AI agents are normal contributors to large applications. The framework should expose structure, context, and safe actions through stable contracts instead of forcing agents to infer everything from raw files.

## Planned Agent Surfaces

- App-local `AGENTS.md` generation.
- Route context capsules.
- Needle Map queries.
- MCP read tools.
- Safe edit transactions.
- Mutation logs.
- Stable compact JSON output.

## Safety Principles

- Production bundles must not ship agent metadata.
- Agent-facing JSON should be compact and schema-versioned.
- Safe edits must be AST-based, previewable, logged, check-backed, and reversible.
- High-risk production edits require explicit human sign-off.
- Needle Map must not be the only source of truth for safety-critical decisions.

## Reference

- [Agent Kernel](../../agent-kernel.md)
- [MCP Reference](../reference/mcp.md)
- [Safe Edits](safe-edits.md)
- [Machine-Readable Documentation](../../machine-readable-docs.md)

