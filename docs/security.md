# Security and Threat Model

NeedleStart is agent-native by design. That makes security part of the product surface, not a footnote. This document defines the planned security model for config, environment variables, generated manifests, MCP, safe edits, deployment, and agent workflows.

This is a planning document. It does not claim that security features are implemented yet.

## Goals

- Keep secrets out of manifests, logs, MCP responses, and agent context.
- Keep production runtime bundles free of agent-only metadata.
- Route all write operations through safe edit transactions.
- Make high-risk changes explicit and reviewable.
- Keep local development tools local by default.
- Make generated outputs auditable.
- Prefer deny-by-default behavior for unsafe or ambiguous write operations.

## Non-Goals

NeedleStart is not initially responsible for:

- Providing an auth product.
- Providing a secrets manager.
- Replacing application authorization checks.
- Automatically migrating auth, billing, or session systems.
- Proving that arbitrary user code is safe.
- Running untrusted code in a sandbox.

## Security Boundaries

| Boundary | Rule |
| --- | --- |
| User application code | May contain secrets and business logic. Framework tools must avoid exposing sensitive values. |
| Compiler and build tools | Can inspect source and config, but generated public artifacts must be redacted. |
| Runtime adapters | Serve built output and request handlers. They must not load agent context in production. |
| Needle Map | Helps understand relationships, but must not be the only source of truth for safety-critical decisions. |
| Agent Kernel | Produces context and plans, but write operations must use safe edit transactions. |
| MCP server | Starts read-only first. Write tools must be explicitly gated. |
| Safe edit engine | Validates, previews, applies, logs, verifies, and supports undo for allowed edits. |

## Threat Model

### Threat: Secret Leakage Through Manifests

Risk:

- Config, env vars, route handlers, or build reports accidentally expose tokens or connection strings.

Mitigations:

- Redact environment values by default.
- Store only required variable names and boolean presence when needed.
- Never include raw headers, cookies, tokens, or private keys in manifest output.
- Add stable JSON tests that include fake secrets and assert redaction.
- Make `NS_CONFIG_SECRET_EXPOSED` a blocking diagnostic.

### Threat: MCP Exposes Sensitive Data

Risk:

- An MCP client asks for context that includes secrets, env values, private files, or dangerous internal details.

Mitigations:

- MCP starts read-only.
- MCP responses use allow-listed resources and fields.
- Read tools must not return raw env values, cookies, auth headers, or local absolute paths in normal output.
- HTTP transport binds to localhost by default.
- Write tools stay disabled until safe edit support exists.
- High-risk resources require explicit policy.

### Threat: Unsafe Automated Edit

Risk:

- An agent or CLI write changes the wrong field, touches high-risk code, or bypasses checks.

Mitigations:

- All writes use `SafeEditTransaction`.
- Safe edits validate the target exists.
- Safe edits validate the field is editable.
- Edits use AST patches, not string replacement.
- Dry-run diff is required.
- Affected checks must run.
- Mutation log is append-only.
- Undo must be available for applied transactions.
- High-risk edits require explicit human override.

### Threat: Graph Overconfidence

Risk:

- Needle Map infers a relationship incorrectly and an agent trusts it too much.

Mitigations:

- Every edge includes `source`, `confidence`, and `why`.
- Missing contracts produce low-confidence edges.
- Safety-critical decisions combine graph data with contracts, validation, and checks.
- Agent output should expose uncertainty, not hide it.

### Threat: Production Bundle Includes Agent Metadata

Risk:

- Context capsules, mutation logs, `llms-full.txt`, devtools, or MCP internals ship with production runtime output.

Mitigations:

- Production bundles must exclude agent context capsules and MCP server code unless explicitly running a dev mode.
- Build checks should fail when production output includes blocked agent-only files.
- Adapter manifests should identify included capabilities.

### Threat: Local Dev Server Exposes Sensitive Tools

Risk:

- Devtools or MCP bind to public interfaces and expose app structure or write tools.

Mitigations:

- Bind to localhost by default.
- Require explicit `--host 0.0.0.0` or config opt-in for network exposure.
- Print a warning when exposing devtools or MCP beyond localhost.
- Require read-only mode by default for MCP.

### Threat: Dependency or Template Supply Chain

Risk:

- Project creation or templates fetch remote code unexpectedly.

Mitigations:

- Initial templates should be local to the package.
- Avoid remote template downloads in the first prototype.
- Lock dependencies in generated projects.
- Do not run post-create network actions without clear user action.

## High-Risk Areas

High-risk areas require stronger tests, clearer docs, and explicit human review when changed by safe edit tools.

- Auth and sessions.
- Billing or payment integrations.
- Cache invalidation.
- Deployment adapters.
- File-system write tools.
- Safe edit APIs.
- MCP write tools.
- Environment variable handling.
- Runtime request routing.
- Schemas and serializers.
- Server functions.

## Secret Handling Rules

### Do Not Expose

- `.env` values.
- Authorization headers.
- Cookie values.
- API keys.
- Private keys.
- Database URLs.
- Payment provider secrets.
- Session secrets.
- Raw request bodies unless explicitly being handled by app code.

### Allowed Metadata

- Environment variable names.
- Whether a required variable is present.
- Redacted hashes for change detection.
- Public variables explicitly configured as public.

### Public Variable Policy

A future public env mechanism should require explicit prefix or config.

Example draft:

```ts
export default defineConfig({
  env: {
    publicPrefix: "PUBLIC_",
  },
})
```

Do not implement implicit public env exposure without documenting it here.

## MCP Security Policy

Initial MCP mode:

```bash
needle mcp --read-only
```

Default transport should be stdio or localhost-only HTTP.

Planned read-only tools may expose:

- Route list.
- Route context.
- Related files.
- Impact map.
- SEO report.
- Performance report.
- Cache report.
- Component contracts.
- Schema metadata.

Read-only tools must not expose:

- Secret env values.
- Raw private keys.
- Auth tokens.
- Full cookies.
- Arbitrary filesystem reads.
- Files outside the project root.

Write tools require:

- Safe edit transaction validation.
- Dry-run preview.
- Risk tier.
- Affected files and routes.
- Affected checks.
- Mutation ID.
- Rollback availability.

## Safe Edit Security Policy

Safe edit operations must follow this flow:

1. Validate target exists.
2. Validate field is editable.
3. Validate requested value against schema.
4. Assign risk tier.
5. Require override for high-risk edits.
6. Produce dry-run diff.
7. Apply AST patch in memory.
8. Regenerate affected graph slices.
9. Run affected checks.
10. Apply file writes only after dry-run passes or override is explicit.
11. Append mutation log.
12. Run post-apply verification.
13. Support rollback.

String replacement is not allowed.

## Risk Tiers

| Tier | Examples | Default behavior |
| --- | --- | --- |
| Low | metadata, copy, simple structured block props | Apply after passing dry run. |
| Medium | add component, update component contract, update route contract | Require confirmation or explicit non-interactive approval. |
| High | auth, billing, schemas, cache invalidation, server functions, deployment adapters, file-system tools | Block unless explicit human override is present. |

In production workflows, high-risk edits require explicit human sign-off.

## Production Runtime Rules

Production runtime bundles must not include:

- Agent context capsules.
- MCP server implementation, unless explicitly running a development server feature.
- Mutation logs.
- Devtools UI.
- `llms-full.txt`.
- Test fixtures.
- Source-only graph cache.

Production runtime may include:

- Route manifest.
- Render manifest.
- Adapter manifest.
- Cache manifest required for runtime behavior.
- SEO output required for public files such as sitemap and robots.
- Server handlers.

## Adapter Security

Adapter-specific code must stay in adapter packages.

Rules:

- User application code must not require Bun-only APIs.
- Node compatibility must not silently degrade security behavior.
- Static export must fail clearly for unsupported dynamic routes.
- Adapter manifests must disclose unsupported capabilities.
- Health endpoint exposure must be configurable.
- Request logging must redact sensitive headers and cookies.

## Dependency and Code Execution Rules

- Do not add network calls in tests unless explicitly required.
- Do not run remote code during project creation in the first prototype.
- Do not add global mutable state in server runtime.
- Do not let devtools or MCP write files outside the project root.
- Do not edit generated files manually.

## Security Diagnostics

Potential diagnostic codes:

| Code | Meaning |
| --- | --- |
| `NS_SECURITY_SECRET_EXPOSED` | Output includes a value that looks like a secret. |
| `NS_SECURITY_ENV_VALUE_BLOCKED` | Tool attempted to expose raw environment value. |
| `NS_SECURITY_MCP_WRITE_DISABLED` | MCP write tool called while writes are disabled. |
| `NS_SECURITY_MCP_UNSAFE_RESOURCE` | MCP requested a resource outside allowed scope. |
| `NS_SECURITY_EDIT_HIGH_RISK` | Safe edit requires explicit high-risk override. |
| `NS_SECURITY_PRODUCTION_AGENT_METADATA` | Production output includes forbidden agent metadata. |
| `NS_SECURITY_HEALTH_EXPOSED` | Health endpoint is exposed in production without explicit config. |
| `NS_SECURITY_PATH_ESCAPE` | Tool attempted to read or write outside project root. |

## Testing Requirements

Security-sensitive features require tests for:

- Secret redaction.
- Env handling.
- MCP read allow-list.
- MCP write rejection before safe edits exist.
- Safe edit rejection paths.
- High-risk override behavior.
- Path traversal rejection.
- Production bundle exclusion of agent metadata.
- Request log redaction.
- Static adapter rejection of unsupported dynamic routes.

## Incident Response

Use root `SECURITY.md` for reporting instructions.

When a vulnerability is found:

1. Confirm the affected surface.
2. Avoid publishing exploit details before a fix or mitigation exists.
3. Add regression tests.
4. Update this threat model if the issue reveals a missing category.
5. Update `AGENTS.md` if agent workflow rules change.

## Documentation Rule

Update this file when:

- MCP gains a new tool.
- Safe edit rules change.
- A new high-risk area is introduced.
- Config or manifest redaction changes.
- Runtime adapter exposure changes.
- Production output rules change.
