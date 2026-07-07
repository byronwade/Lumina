# MCP Server

Status: Planned.
Audience: AI agents, framework contributors, maintainers.

This page describes the planned MCP server behavior. MCP server behavior is not implemented yet.

The planned Lumina MCP server will expose framework data and selected safe actions to AI agents through structured tools.

## Goals

- Give agents route and graph context without repository-wide reading.
- Provide read-only tools before write tools.
- Make outputs compact and deterministic.
- Route write operations through safe edit validation.

## Initial Read-Only Tools

Planned tools:

- `list_routes`
- `get_route`
- `get_route_context`
- `get_related_files`
- `get_impact_map`
- `get_component_contract`
- `get_schema`
- `get_seo_report`
- `get_perf_report`
- `get_cache_report`

These read tools should be available as soon as the corresponding manifest exists. The first agent-facing wedge is route and graph inspection, not write access.

## Write Tools

Planned write tools after safe edit support exists:

- `create_page`
- `create_api_route`
- `edit_route_meta`
- `edit_component_contract`
- `add_component_to_route`
- `run_affected_checks`
- `apply_safe_patch`
- `read_agent_log`
- `get_mutation`
- `undo_mutation`

## MCP Resources

Planned resources:

```txt
lumina://routes
lumina://route/%2Fpricing
lumina://map/file/components%2FProductCard.tsx
lumina://seo/report
lumina://perf/report
lumina://context/public
```

## Safety Rules

- Write tools require safe edit validation.
- Unsafe fields are rejected.
- High-risk areas require explicit override.
- Every write tool must produce a mutation log entry.
- Read tools must not expose secrets.
- Tool responses must be stable JSON.
- MCP write tools must use the same safe edit transaction path as CLI writes.
- MCP write tools must apply changes through the same AST-based safe edit path as CLI writes.
- MCP write tools must support dry-run previews before applying changes.
- MCP write tools must use the safe edit formatter before writing files.
- MCP responses must expose risk tier, affected files, affected routes, checks, and `.lumina/mutations.json` mutation log ID.
- High-risk production write tools require explicit human sign-off before applying changes.

MCP write tools must return the same `SafeEditTransaction` shape as CLI write commands.

Where practical, MCP tool payloads should reuse the same core route, graph, SEO, check, context, and safe-edit object shapes as the CLI JSON contract in `docs/cli-json-contract.md`.

MCP resources that expose documentation context should follow [Machine-Readable Documentation](machine-readable-docs.md). If future MCP tools read `docs-index.json`, `docs-navigation.json`, `llms.txt`, or `llms-full.txt`, the tool output must preserve `schemaVersion`, `generatedAt`, deterministic ordering, source paths, and the rule that agent metadata is not shipped in production runtime bundles.

Required transaction fields:

- Mutation ID.
- Risk tier.
- Dry-run diff.
- Affected files.
- Affected routes.
- Affected checks.
- Final status.
- Rollback availability.

## Agent Demo Path

The first MCP demo should prove:

1. `list_routes`
2. `get_route_context`
3. `get_related_files`
4. `get_impact_map`
5. `edit_route_meta` in dry-run mode
6. `edit_route_meta` apply mode
7. `run_affected_checks`
8. `read_agent_log`
9. `undo_mutation`

## Planned Acceptance Criteria

- `lumina mcp` should start the server.
- An MCP client should list routes.
- An MCP client should inspect a route.
- An MCP client should get related files.
- An MCP client should get an SEO report.
- An MCP client should run affected checks.
- Write tools should be guarded by safe edit rules.
