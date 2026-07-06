# Configuration Reference

Status: Planned.

Audience: app developers, framework contributors, adapter maintainers, AI agents.

NeedleStart configuration is planned to live in `needle.config.ts`.

The deeper loading, validation, environment, normalized-config, and generated-output rules are defined in [Configuration Contract](config-contract.md).

## Planned Minimal Config

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

`runtime` describes the default local execution target and compatibility target for generated server code. `adapter` selects the production output package: `bun` maps to `@needle/adapter-bun`, `node` maps to `@needle/adapter-node`, and `static` maps to `@needle/adapter-static`. Resolved adapter output should be reported in `dist/adapter.manifest.json` with `runtime.name`.

## Planned Config Areas

- Runtime target.
- Production adapter.
- Route behavior.
- SEO defaults.
- Cache defaults.
- Generated output paths.
- Agent and MCP behavior.
- Devtools.
- Performance budgets.

## Planned Normalized Config

Serialized normalized config should use `schemaVersion`, `root`, `runtime`, `adapter`, `outDir`, `needleDir`, and `mode`.

Normalized config should prefer relative paths when possible, avoid absolute local paths in public or agent-facing artifacts, and never include secrets.

## Rules

- Config should be typed.
- Defaults should be explicit in reference docs.
- Runtime adapter options must not leak Bun-only APIs into user app code.
- Config changes that affect generated artifacts must update manifest docs.
- Config loading must be deterministic.
- Server-only environment variables must not leak into client bundles.
- Client-exposed environment variables require an explicit public prefix or allow-list.
- `.env*` loading must be deterministic.
- Environment variables must not leak secrets into client bundles or generated artifacts.
- Config diagnostics should use stable codes once released.

## Out Of Scope

- Final config defaults before config loading behavior exists.
- Host-specific deployment config.
- Secret management beyond documented environment-variable safety rules.
