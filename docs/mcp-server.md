# MCP Server

The NeedleStart MCP server exposes framework data and selected safe actions to AI agents through structured tools.

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
needle://routes
needle://route/%2Fpricing
needle://map/file/components%2FProductCard.tsx
needle://seo/report
needle://perf/report
needle://context/public
```

## Safety Rules

- Write tools require safe edit validation.
- Unsafe fields are rejected.
- High-risk areas require explicit override.
- Every write tool must produce a mutation log entry.
- Read tools must not expose secrets.
- Tool responses must be stable JSON.
- MCP write tools must use the same safe edit transaction path as CLI writes.
- MCP write tools must support dry-run previews before applying changes.
- MCP responses must expose risk tier, affected files, affected routes, checks, and mutation log ID.

MCP write tools must return the same `SafeEditTransaction` shape as CLI write commands.

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

## Definition of Done

- `needle mcp` starts server.
- MCP client can list routes.
- MCP client can inspect a route.
- MCP client can get related files.
- MCP client can get SEO report.
- MCP client can run affected checks.
- Write tools are guarded by safe edit rules.
