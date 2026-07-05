# Release Policy

NeedleStart release behavior is planned. This document defines the target policy for package versions, prereleases, manifest schema versions, generated app compatibility, changelogs, and verification.

No package is currently published. Until `docs/status.md` marks publish infrastructure verified, this document is a release contract, not an implemented process.

## Goals

- Avoid publishing planned behavior as implemented behavior.
- Keep package versions, docs, examples, and generated artifacts aligned.
- Make manifest schema changes explicit.
- Give early adopters a clear compatibility story.
- Keep prerelease quality high enough that agents and humans can trust generated output.

## Package Versioning

NeedleStart should eventually publish a coordinated package set.

Planned public packages:

- `needlestart`
- `create-needle`
- `@needle/cli`
- `@needle/core`
- `@needle/compiler`
- `@needle/vite-plugin`
- `@needle/react`
- `@needle/router`
- `@needle/seo`
- `@needle/map`
- `@needle/agent`
- `@needle/mcp`
- `@needle/cache`
- `@needle/schema`
- `@needle/devtools`
- `@needle/adapter-bun`
- `@needle/adapter-node`
- `@needle/adapter-static`

Recommended initial policy:

- Use one coordinated version across packages during early development.
- Keep internal package compatibility simple until the architecture settles.
- Publish prereleases before any stable `1.0.0` claim.
- Treat generated manifests and CLI JSON as public contracts once released.

## Prerelease Channels

| Channel | Example | Meaning |
| --- | --- | --- |
| `alpha` | `0.1.0-alpha.0` | Early implementation, APIs may change quickly. |
| `beta` | `0.1.0-beta.0` | Core workflows work, but compatibility is not final. |
| `rc` | `0.1.0-rc.0` | Candidate for a tagged release; only bug fixes expected. |
| stable | `0.1.0` | Documented behavior is implemented and verified for that release. |

## What Can Be Released

A release may include:

- Package code.
- CLI commands.
- Generated app templates.
- Examples.
- Documentation.
- Generated manifest schemas.
- Adapter behavior.
- MCP tool contracts.

A release must not claim:

- Commands pass unless they were run.
- Runtime behavior exists when only docs exist.
- Benchmarks are real without reproducible benchmark fixtures.
- Safe edits are trustworthy without rejection tests.
- Node/static compatibility exists unless verified.

## Verification Levels

Use the labels from `docs/status.md`.

| Label | Release meaning |
| --- | --- |
| `planned` | Do not advertise as available. |
| `drafted` | Contract exists, implementation does not. |
| `scaffolded` | Package or file exists, behavior may be placeholder. |
| `implemented` | Code exists, but command may not be verified for release. |
| `verified` | Behavior was run successfully against a documented fixture or environment. |
| `deferred` | Intentionally excluded. |
| `removed` | No longer part of release plan. |

Stable release notes should prefer verified items.

## Release Gates

Before any package release:

- `docs/status.md` reflects current truth.
- `README.md` does not overclaim.
- `AGENTS.md` describes current commands and rules.
- `CHANGELOG.md` or release notes exist.
- Commands advertised as working have been run.
- Package versions are consistent.
- Manifest schema versions are correct.
- Generated app templates have been tested.
- Security-sensitive changes have tests or documented review.

Before a public prototype release:

- `bun create needle my-app` works.
- `needle dev` works.
- `needle build` works.
- `needle start` works for the Bun adapter.
- `needle routes --json` emits stable output.
- `needle seo --json` emits stable output.
- `needle map --json` emits stable output.
- `needle agent context --route / --json` emits stable output.
- `needle mcp` starts in read-only mode.
- Safe metadata edit dry-run works.
- Safe metadata edit apply works.
- Undo works.
- Production output excludes agent-only metadata.

## Manifest Schema Versioning

Generated manifests are public contracts once released.

Rules:

- Every manifest includes `schemaVersion`.
- Optional additive fields may increase minor schema version.
- Removing, renaming, or changing the meaning of a field requires a major schema version change.
- CLI and MCP consumers should handle unknown optional fields.
- Release notes must call out schema version changes.

Manifest families:

- root build manifest
- route manifest
- render manifest
- SEO report
- cache manifest
- map manifest
- performance report
- adapter manifest
- mutation log
- agent context index

## Generated App Compatibility

Generated apps are part of the product contract.

Rules:

- A generated app should declare the NeedleStart version that created it when practical.
- Migration or upgrade notes should describe breaking template changes.
- Template package scripts must align with `docs/cli.md`.
- Generated `AGENTS.md` must align with current agent workflow rules.
- Generated config must align with `docs/config.md`.

## Deprecation Policy

Before removing or renaming a public API, command, manifest field, config field, or route convention:

1. Mark it deprecated in docs.
2. Emit a diagnostic when possible.
3. Provide migration guidance.
4. Keep compatibility through at least one prerelease cycle when practical.
5. Remove only in a release that calls out the breaking change.

Pre-`1.0.0`, breaking changes are allowed, but they still need clear notes because agents and templates may depend on the contracts.

## Changelog Policy

Use a changelog or release notes with sections:

- Added
- Changed
- Fixed
- Deprecated
- Removed
- Security
- Compatibility
- Manifest schema changes
- Migration notes

Every release should mention:

- Package version.
- Commit SHA.
- Notable verified commands.
- Known limitations.
- Docs status.

## Security Releases

Security fixes should include:

- A private report path through `SECURITY.md`.
- Regression tests where possible.
- Redaction or safe edit tests if relevant.
- Clear release notes after the fix is available.
- Updates to `docs/security.md` if the threat model changes.

## Benchmark Claims

Benchmark claims must not be released without:

- Fixture name.
- Command used.
- Environment summary.
- Commit SHA.
- Warmup policy.
- Measurement duration.
- Comparison target.

Benchmark marketing should distinguish Bun performance from Node compatibility.

## Release Checklist

- [ ] Versions updated.
- [ ] Lockfile updated if applicable.
- [ ] `docs/status.md` updated.
- [ ] README current.
- [ ] AGENTS current.
- [ ] Changelog or release notes written.
- [ ] Commands run and recorded.
- [ ] Generated app template tested.
- [ ] Manifest schema changes documented.
- [ ] Security-sensitive changes reviewed.
- [ ] Package publish dry-run completed if tooling exists.
- [ ] Tag created after verification.

## Out of Scope Initially

- Long-term support branches.
- Enterprise release channels.
- Hosted update service.
- Automatic project migrations for every breaking change.
