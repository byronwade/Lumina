# Threat Model

Status: Planned.

Audience: maintainers, security reviewers, runtime adapter authors, Agent Kernel contributors, MCP contributors, AI agents.

This page defines the planned threat-model structure for NeedleStart. It complements [Security Contract](security-contract.md), [Risk Mitigation](risk-mitigation.md), [Safe Edit Transactions](safe-edit-transactions.md), [Agent Kernel](agent-kernel.md), and [MCP Server](mcp-server.md). It is not a security audit and does not claim implemented security behavior.

## Purpose

NeedleStart has security-sensitive surfaces even before user applications add auth, billing, or private data. The framework plans to generate manifests, route graphs, agent context, MCP resources, safe edit plans, docs indexes, and runtime adapter output. These surfaces need a shared threat model before implementation starts.

The goal is to make future PRs answer the same questions:

- What is trusted?
- What is untrusted?
- What can write files?
- What can expose secrets?
- What can ship to production?
- What can be cached?
- What can be read by agents?
- What must require human sign-off?

## Assets

Protect these assets:

| Asset | Why it matters |
| --- | --- |
| User source files | Safe edits, migration tools, and MCP write tools can modify them. |
| Environment variables | Secrets must not leak into client bundles, diagnostics, manifests, docs outputs, or agent context. |
| Generated manifests | `.needle/*` files become shared contracts for runtime, CLI, MCP, agents, and checks. |
| Production bundles | Runtime output must not include agent-only metadata or private graph details. |
| Route cache behavior | Incorrect cache rules can expose private data or stale user state. |
| Runtime request routing | Incorrect routing can serve the wrong handler, method, cache headers, or error body. |
| Mutation logs | Safe edit logs must preserve auditability without storing secrets. |
| Docs and machine-readable indexes | Public docs outputs must not leak local paths, private notes, credentials, or unverified claims. |
| Package release artifacts | Published packages must not be tampered with or misrepresent provenance. |

## Trust Boundaries

Planned trust boundaries:

| Boundary | Trusted side | Untrusted or lower-trust side |
| --- | --- | --- |
| Source app to compiler | Repository files selected by project config | User-authored code, file paths, route names, metadata values |
| Compiler to generated artifacts | Compiler schemas and deterministic emitters | Previous generated files, stale output, user-edited generated files |
| Generated artifacts to runtime | Versioned manifest readers | Malformed manifests, incompatible schema versions |
| Runtime to browser or API client | Sanitized response pipeline | Request paths, headers, bodies, params, query strings |
| Agent Kernel to user files | Safe edit transaction engine | Agent requests, model output, user prompts |
| MCP server to tools | Tool schemas and risk policy | External MCP clients, malformed tool inputs |
| Docs source to public site | Reviewed Markdown and metadata | Unsupported claims, stale frontmatter, accidental private notes |
| Release workflow to registry | Maintainer-controlled release process | Dependency confusion, compromised tokens, unsigned artifacts |

## Primary Threats

### Secret Exposure

Threats:

- Environment variables appear in client bundles.
- Secret values appear in diagnostics, CLI JSON, manifests, MCP resources, logs, docs indexes, or benchmark output.
- Local absolute paths expose private machine details.

Controls to design:

- Redaction rules in diagnostics and logs.
- Secret-exclusion tests for config, manifest, docs, and agent outputs.
- Public/private environment-variable boundary in [Configuration Contract](config-contract.md).
- Production sanitization in [Runtime Contract](runtime-contract.md).

### Unsafe Agent Writes

Threats:

- Agent requests modify broad file ranges.
- Generated files are edited manually.
- Safe edits skip preview, validation, formatting, checks, or undo.
- High-risk surfaces are modified without human sign-off.

Controls to design:

- AST-based safe edit transactions.
- Risk tiers.
- File allowlists and generated-file rejection.
- Mutation logs without secrets.
- Human sign-off for high-risk edits.

### MCP Tool Escalation

Threats:

- Write tools perform more than their schema describes.
- Read tools expose secrets or production-only details.
- Tool inputs bypass route, path, or risk validation.

Controls to design:

- Read-only MCP first.
- Explicit tool schemas.
- Capability and risk tags.
- Audit logs for write tools.
- Human sign-off for high-risk writes.

### Cache And Routing Mistakes

Threats:

- Private responses are cached publicly.
- API routes inherit public-page cache behavior.
- Runtime adapter routes requests to the wrong handler.
- Static output includes pages requiring request-time auth.

Controls to design:

- Explicit cache plans.
- Unsafe-cache diagnostics.
- Adapter parity tests.
- HTTP tests for status, method, header, body, and error behavior.

### Generated Artifact Drift

Threats:

- Runtime reads stale manifests.
- Agents use outdated context capsules.
- Manually edited generated files hide the true source.
- Schema version mismatch is ignored.

Controls to design:

- Schema versions.
- Source input metadata.
- Deterministic output.
- Regeneration checks.
- Diagnostics for stale or incompatible generated files.

### Public Claim Drift

Threats:

- Public docs claim planned commands work.
- Performance claims lack raw data.
- Security claims imply audit or compliance.
- Docs renderer metadata becomes stale.

Controls to design:

- Status labels.
- Documentation verification checks.
- Public frontmatter validation.
- PR template evidence fields.

## Feature Threat Note Template

Every high-risk implementation PR should include:

```md
## Threat Note

Trusted inputs:

Untrusted inputs:

Assets affected:

Files or generated artifacts affected:

Runtime or browser exposure:

Cache or logging behavior:

Agent or MCP permissions:

Validation and rejection paths:

Tests or checks:

Rollback or undo path:

Out of scope:
```

## Review Gates

Before high-risk behavior is marked implemented:

- Threat note exists.
- Security contract impact is reviewed.
- Production error behavior is documented.
- Secret handling is tested or explicitly out of scope.
- Generated artifacts are covered by snapshot or schema checks.
- Safe edit and MCP writes have risk tiers.
- Docs avoid secure, hardened, compliant, audited, or production-ready claims unless evidence supports the exact claim.

## Out Of Scope For Phase 0

- Full STRIDE, LINDDUN, or formal security audit output.
- Runtime hardening implementation.
- Auth, session, billing, or payment behavior.
- Package provenance claims.
- Production vulnerability intake beyond the current security policy.
