# Security Contract

Status: Planned.

Audience: framework contributors, maintainers, security reviewers, runtime adapter authors, AI agents.

This page defines the planned security contract for NeedleStart implementation work. Security behavior is not implemented yet. The contract exists so high-risk features, diagnostics, runtime adapters, configuration, generated artifacts, release work, and agent tooling use the same security expectations. Use [Threat Model](threat-model.md) for trust boundaries, assets, threat notes, and high-risk review gates.

## Research Notes

NeedleStart should use established security guidance without claiming compliance before implementation exists:

- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) provides a basis for testing web application technical security controls and secure development requirements.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/index.html) provides concise application-security guidance for specific topics.
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) emphasizes reducing human handling of secrets and preventing leakage.
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html) recommends generic client-facing errors and care with audit logs.
- [OWASP Error Handling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html) recommends returning generic responses while logging details server-side.
- [OWASP HTTP Security Response Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) documents security headers that reduce XSS, clickjacking, and information-disclosure risk.
- [GitHub private vulnerability reporting](https://docs.github.com/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability) supports private reporting to maintainers.
- [GitHub repository security advisories](https://docs.github.com/code-security/security-advisories/repository-security-advisories/about-repository-security-advisories) support private coordination and public disclosure after a fix.
- [SLSA](https://slsa.dev/) and [SLSA provenance for npm](https://slsa.dev/blog/2023/05/bringing-improved-supply-chain-security-to-the-nodejs-ecosystem) provide supply-chain provenance patterns for package publishing.

## Security Claims

Do not claim NeedleStart is secure, hardened, compliant, audited, or production-ready until implementation, tests, review evidence, and release notes support the exact claim.

Allowed Phase 0 language:

- "planned security contract"
- "security target"
- "requires review"
- "must be tested before release"

Disallowed without evidence:

- "secure by default"
- "OWASP-compliant"
- "safe for production secrets"
- "hardened runtime"
- "audited"

## High-Risk Surfaces

NeedleStart treats these areas as high risk:

| Surface | Initial concern | Required docs before implementation |
| --- | --- | --- |
| Auth and sessions | Session leakage, cache mistakes, CSRF, auth bypass. | Threat model, cache policy, error behavior, tests. |
| Billing or payments | Financial impact and webhooks. | Threat model, webhook raw-body policy, replay handling, tests. |
| Cache invalidation | Private data in public/shared caches. | Cache contract, unsafe-cache diagnostics, adapter header tests. |
| Deployment adapters | Header mismatch, production error leakage, environment drift. | Adapter contract, compatibility evidence, production error tests. |
| File-system writes | Path traversal, destructive edits, generated-file corruption. | Safe edit transaction rules, path allowlist, undo path. |
| Safe edit APIs | Agent-driven unsafe writes. | Preview, validation, affected checks, human sign-off. |
| MCP write tools | Tool escalation or unintended mutation. | Tool schema, risk tier, audit log, human sign-off. |
| Environment variables | Secret leakage into client bundles or generated artifacts. | Config contract, secret exclusion tests. |
| Runtime request routing | Incorrect handler, method, cache, or error behavior. | Runtime contract, API route contract, HTTP tests. |
| Generated artifacts | Secrets, absolute paths, internal topology leakage. | Manifest contracts, diagnostics sanitization, snapshot tests. |
| Package publishing | Compromised release or dependency confusion. | Release policy, provenance plan, changelog, advisory path. |

## Threat Model Requirements

Every high-risk implementation task must include a threat model note that answers:

- What trusted and untrusted inputs exist?
- What user data, secrets, files, generated artifacts, or routes can be affected?
- What validation runs before behavior executes?
- What can be cached or logged?
- What is returned to the browser or API client in production?
- What agent or MCP write permissions are involved?
- What tests prove rejection paths?
- What monitoring or audit trail exists, if any?
- How can the change be rolled back?
- What remains explicitly out of scope?

Short tasks can answer these in a PR description. Durable features should add or update feature docs.

## Secret Handling

NeedleStart must not expose secrets through:

- Client bundles.
- `.needle/*` manifests.
- `dist/*` static output.
- `docs-index.json`, `llms.txt`, or `llms-full.txt`.
- CLI `--json` output.
- Diagnostics.
- MCP resources.
- Logs intended for public bug reports.

Diagnostics may identify that a required secret is missing or invalid, but must not print the value. Redaction rules should be deterministic and tested.

## Production Error Behavior

Production responses must avoid leaking:

- Stack traces.
- Absolute local paths.
- Environment variable values.
- Request bodies.
- Cookies, tokens, or authorization headers.
- Internal graph or manifest details.
- Package manager or host internals unless intentionally exposed by a documented health endpoint.

Development output can be more detailed, but any detailed output must stay out of production defaults.

## Security Headers

NeedleStart should define framework-owned header behavior before adapters are marked verified.

Planned header areas:

- Content Security Policy strategy.
- Frame embedding policy.
- Referrer policy.
- MIME sniffing protection.
- Permissions policy.
- Cross-origin isolation policy when relevant.
- Cache headers from [Cache Contract](cache-contract.md).

Security headers must be coordinated with [Adapter Contract](adapter-contract.md), [Runtime Contract](runtime-contract.md), and [Cache Contract](cache-contract.md). Do not hard-code adapter-specific header behavior in user-facing docs before adapter fixtures prove it.

## Agent And MCP Rules

Agent and MCP write behavior must:

- Use explicit tool schemas.
- Preview changes before applying.
- Reject high-risk changes without human sign-off.
- Avoid writing generated files directly.
- Log mutation metadata without secrets.
- Run affected checks when checks exist.
- Provide an undo path for supported edits.

Needle Map may inform safety decisions, but it must not be the only authority for high-risk writes.

## Supply Chain And Release Rules

Before publishing packages, NeedleStart should define:

- Package provenance target.
- Release workflow ownership.
- Dependency update policy.
- Lockfile policy.
- Changelog and advisory flow.
- Supported versions.
- Emergency release path for vulnerabilities.

Until package publishing exists, these are planned rules. Do not claim provenance or release hardening exists.

## Vulnerability Intake

The root [Security Policy](../SECURITY.md) is the reporting source of truth.

Before public release, maintainers should configure a private vulnerability reporting path. If GitHub is the host, private vulnerability reporting and repository security advisories are the preferred workflow.

Security issues should not be discussed publicly before maintainers have a chance to triage and coordinate a fix.

## Security Test Evidence

Security-sensitive work should name evidence in review:

| Surface | Required future evidence |
| --- | --- |
| Config/env | Secret exclusion tests, invalid env diagnostics, public/private env boundary tests. |
| Diagnostics | Redaction snapshots, production sanitization tests, no absolute path tests. |
| API routes | Production error tests, method rejection, body limit, validation failures. |
| Cache | Unsafe auth cache rejection, private data cache tests, header assertions. |
| Adapters | Production error sanitization, generated security headers, manifest capability evidence. |
| Safe edits | Rejection tests, preview snapshots, undo tests, high-risk sign-off tests. |
| MCP | Read/write permission tests, secret exclusion, audit log shape. |
| Releases | Provenance, changelog, advisory, and supported-version evidence after publishing exists. |

## Out Of Scope For Phase 0

- Security audit claims.
- Compliance certifications.
- Real vulnerability intake contact.
- Implemented auth, sessions, billing, or CSRF behavior.
- Package provenance.
- Runtime hardening claims.
- Production security headers.

## Build Readiness

Before full product build work touches high-risk surfaces, NeedleStart should have:

- This security contract.
- The shared [Threat Model](threat-model.md).
- A public-facing security reference.
- Feature-specific threat model notes.
- Testing requirements for rejection and sanitization paths.
- Review gates in the PR template.
- Clear separation between planned security targets and verified behavior.

This page provides the contract. Implementation must replace planned language with tested evidence as features become real.
