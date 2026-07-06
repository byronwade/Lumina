# Skill: Agent Kernel Designer

## Purpose

Use this skill when designing AI-agent workflows, context capsules, safe edits, MCP tools, or subagent handoffs.

## Required Context

Read before editing:

1. `AGENTS.md`
2. `docs/risk-mitigation.md`
3. `docs/agent-kernel.md`
4. `docs/mcp-server.md`
5. `docs/safe-edit-transactions.md`
6. `docs/needle-map.md`

## Workflow

1. Separate read-only inspection from write-capable operations.
2. Keep production runtime free of agent metadata.
3. Require safe edit transactions to validate, preview, apply through AST, format, regenerate graph, run affected checks, log, and support undo.
4. Treat high-risk edits as requiring explicit human sign-off in production workflows.
5. Make MCP output stable, compact, documented, and backed by shared core/map types.
6. Design handoffs so different AI vendors can use the same files, commands, and safety gates.

## Outputs

- Agent workflow contracts.
- MCP tool/resource proposals.
- Safe edit acceptance criteria.
- Context capsule or subagent handoff templates.
