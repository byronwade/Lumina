# Security Policy

NeedleStart is currently in Phase 0: project constitution and planning. No runtime implementation exists yet.

Even during planning, the project treats security-sensitive surfaces as first-class design constraints, especially MCP tools, safe edits, generated manifests, runtime adapters, environment variables, and production output.

## Reporting a Vulnerability

Please report suspected vulnerabilities privately to the maintainer before publishing details publicly.

Include as much of this as possible:

- Affected document, package, command, generated artifact, or planned feature.
- Steps to reproduce or reason about the issue.
- Expected behavior.
- Actual behavior.
- Whether secrets, agent write tools, runtime routing, cache behavior, or deployment output are involved.
- Suggested fix or mitigation, when available.

## Scope

Security-sensitive areas include:

- MCP resources and tools.
- Safe edit transactions.
- File-system write tools.
- Environment variable handling.
- Generated manifests and reports.
- Agent context capsules.
- Production bundle contents.
- Runtime request routing.
- Adapter behavior.
- Cache invalidation.
- Auth, sessions, billing, schemas, and server functions once implemented.

## Current Implementation Status

NeedleStart has no runtime implementation yet. Security reports about planned behavior are still useful when they identify unsafe defaults, missing guardrails, or documentation gaps.

## Security Principles

- Do not expose secrets in manifests, logs, MCP responses, or agent context.
- Do not ship agent metadata in production runtime bundles.
- Do not allow MCP write tools to bypass safe edit transactions.
- Do not use string replacement for safe edits.
- Do not rely on Needle Map alone for safety-critical decisions.
- Do not allow file tools to read or write outside the project root.
- Do not make high-risk edits without explicit human override.

More detail is documented in `docs/security.md`.
