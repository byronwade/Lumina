# CLI JSON Contract

Status: Planned.

Audience: framework contributors, CLI implementers, AI agents.

This page defines the planned JSON output and exit-code contract for the `needle` CLI. No CLI implementation exists yet. The shared diagnostic vocabulary lives in [Diagnostics Contract](diagnostics-contract.md). These contracts exist so Phase 1 and later command work can implement stable automation surfaces from the beginning.

## Why This Exists

Lumina's CLI is part human tool and part agent contract. Human output can become more helpful over time, but machine-readable output must stay stable enough for scripts, CI, MCP clients, and AI agents.

Research backing:

- Command Line Interface Guidelines recommend correct exit codes, primary output on stdout, and machine-readable output on stdout.
- GitHub CLI supports `--json` fields and downstream formatting through `--jq` and templates.
- Google Cloud CLI warns users not to depend on raw human output and encourages explicit machine-readable formats.
- Heroku CLI documents `--json` flags for commands that support structured output.

## Output Rules

- Human output is the default.
- `--json` switches commands to structured JSON output when supported.
- JSON output goes to stdout.
- Progress, warnings, and errors for human output may use stderr.
- JSON mode must not mix prose with JSON on stdout.
- Human output text is not a stable contract.
- JSON fields, exit codes, schema versions, and diagnostic codes are stable contracts once released.

## Global JSON Envelope

Commands that support JSON should use this envelope:

```json
{
  "schemaVersion": "lumina.cli.v0",
  "command": "lumina routes",
  "status": "ok",
  "data": {},
  "diagnostics": [],
  "meta": {
    "durationMs": 12,
    "cwd": ".",
    "generatedAt": "2026-07-06T00:00:00.000Z"
  }
}
```

Rules:

- `schemaVersion` is required.
- `command` is required and should include the normalized command name, not user-specific flags.
- `status` is one of `ok`, `warning`, or `error`.
- `data` contains command-specific output.
- `diagnostics` is always an array.
- `meta.cwd` must not expose absolute local paths in public or agent-facing contexts.
- `generatedAt` may be omitted from deterministic snapshots if it would create churn.

## Diagnostic Shape

Diagnostics should follow [Diagnostics Contract](diagnostics-contract.md). CLI JSON embeds diagnostics in the command envelope:

```json
{
  "code": "ROUTE_DUPLICATE_PATH",
  "severity": "error",
  "message": "Two route files resolve to the same path.",
  "file": "app/(marketing)/pricing/page.tsx",
  "route": "/pricing",
  "docs": "https://lumina.dev/docs/reference/routing#route-conflicts"
}
```

Rules:

- `code`, `severity`, `message`, source location, docs links, related locations, and remediation follow [Diagnostics Contract](diagnostics-contract.md).
- CLI JSON may include only the compact diagnostic fields needed by automation.
- Human output may render richer code frames from the same source locations.

## Exit Codes

Planned exit codes:

| Code | Meaning | Use when |
| --- | --- | --- |
| `0` | Success | Command completed without errors. |
| `1` | General failure | Unexpected or uncategorized command failure. |
| `2` | Usage error | Invalid flags, arguments, or command shape. |
| `3` | Validation failure | Config, routes, metadata, schema, or manifest validation failed. |
| `4` | Check failure | Typecheck, SEO, test, map, or framework-aware check failed. |
| `5` | Unsafe edit rejected | Safe edit validation rejected the requested mutation. |
| `6` | Missing implementation | Command is planned or scaffolded but not implemented. |
| `7` | External dependency unavailable | Required runtime, adapter, or local service is unavailable. |

Exit code `6` is useful during scaffold phases: it lets placeholder commands honestly report that a command exists but behavior does not.

## Command-Specific Data Contracts

Initial planned command data shapes:

| Command | `data` shape |
| --- | --- |
| `lumina routes --json` | `{ "routes": RouteManifestEntry[] }` |
| `lumina inspect --json` | `{ "target": string, "summary": object, "related": string[] }` |
| `lumina check --json` | `{ "checks": CheckResult[], "summary": CheckSummary }` |
| `lumina seo --json` | `{ "report": SeoReport }` |
| `lumina map --json` | `{ "query": string, "nodes": GraphNode[], "edges": GraphEdge[] }` |
| `lumina agent context --json` | `{ "context": RouteContextCapsule }` |
| `lumina build --json` | `{ "outputs": BuildOutput[], "manifests": string[], "checks": CheckResult[] }` |
| `lumina build --affected --json` | `{ "affected": AffectedSelection, "outputs": BuildOutput[], "manifests": string[], "checks": CheckResult[] }` |
| `lumina check --affected --json` | `{ "affected": AffectedSelection, "checks": CheckResult[], "summary": CheckSummary }` |
| `lumina test --affected --json` | `{ "affected": AffectedSelection, "tests": TestSelection[], "summary": TestSummary }` |
| `lumina workspace graph --json` | `{ "workspace": WorkspaceSummary, "nodes": WorkspaceGraphNode[], "edges": GraphEdge[] }` |
| `lumina workspace apps --json` | `{ "apps": WorkspaceAppSummary[], "packages": WorkspacePackageSummary[], "generatedArtifacts": WorkspaceArtifactSummary[] }` |
| `lumina workspace explain <file> --json` | `{ "target": string, "consumers": WorkspaceConsumer[], "affected": AffectedSelection, "why": ExplanationStep[] }` |
| `lumina edit --json` | `{ "transaction": SafeEditTransaction, "diff": DiffSummary, "checks": CheckResult[] }` |
| `lumina migrate --json` | `{ "migration": MigrationReport, "contracts": string[], "manualReview": string[] }` |
| `lumina bench --json` | `{ "fixture": string, "runs": BenchmarkRun[], "environment": BenchmarkEnvironment, "summary": BenchmarkSummary }` |

The exact schemas belong in command-specific reference docs once implementation exists.

### Workspace And Affected Shapes

Workspace and affected command output should share these planned data contracts. Field names are draft contracts for implementation work; no command currently emits them.

```ts
type AffectedSelection = {
  apps: AffectedApp[]
  routes: AffectedRoute[]
  packages: AffectedPackage[]
  tests: TestSelection[]
  generatedArtifacts: WorkspaceArtifactSummary[]
  reasons: ExplanationStep[]
}

type AffectedApp = {
  id: string
  root: string
  reason: string
}

type AffectedRoute = {
  id: string
  path: string
  appId: string
  reason: string
}

type AffectedPackage = {
  name: string
  path: string
  reason: string
}

type TestSelection = {
  id: string
  path: string
  runner: string
  reason: string
}

type TestSummary = {
  selected: number
  skipped: number
  status: "ok" | "warning" | "error"
}

type WorkspaceSummary = {
  id: string
  root: string
  appCount: number
  packageCount: number
  routeCount: number
}

type WorkspaceGraphNode = {
  id: string
  kind: "workspace" | "app" | "package" | "route" | "file" | "test" | "generatedArtifact"
  label: string
}

type WorkspaceAppSummary = {
  id: string
  root: string
  routeCount: number
  packageDependencies: string[]
}

type WorkspacePackageSummary = {
  name: string
  path: string
  consumedByApps: string[]
}

type WorkspaceArtifactSummary = {
  path: string
  kind: string
  sourceInputs: string[]
  consumers: string[]
}

type WorkspaceConsumer = {
  id: string
  kind: "app" | "route" | "package" | "test" | "generatedArtifact"
  reason: string
}

type ExplanationStep = {
  kind: string
  source: string
  confidence: "high" | "medium" | "low"
  why: string
}
```

Rules:

- Affected selections must include `reason` or `why` fields for every app, route, package, test, and generated artifact.
- Workspace output must use normalized relative paths and must not expose absolute local paths.
- `WorkspaceGraphNode` arrays and `GraphEdge` arrays must be sorted by stable IDs.
- Workspace command output must read generated workspace artifacts when they exist instead of rediscovering source files at runtime.

## JSON Stability Rules

- Add optional fields instead of renaming fields.
- Do not change field meaning without a schema version change.
- Keep arrays sorted by stable keys.
- Use POSIX-style relative paths.
- Avoid absolute local machine paths.
- Keep output compact by default.
- Include enough diagnostics for agents to decide next steps.
- Treat JSON examples in docs as contract tests once implementation exists.

## Human Output Rules

Human output should:

- Be short by default.
- Name next steps when a command fails.
- Point to docs for diagnostics.
- Avoid printing large manifests unless requested.
- Avoid noisy progress output in CI unless a verbose flag is set.

Human output should not be used by scripts or agents when JSON is available.

## Relationship To MCP

MCP tools should reuse the same underlying data shapes where practical. CLI JSON and MCP responses can have different transport envelopes, but route, graph, SEO, check, context, and safe-edit objects should not fork into separate models.

## Relationship To Manifest Contracts

CLI commands should read generated manifests rather than rediscovering source files whenever possible. Manifest schemas are documented in [Manifest Contracts](manifest-contracts.md).

## Verification

Once implemented:

- Add stable JSON snapshot tests for every `--json` command.
- Add exit-code tests for success, usage error, validation failure, check failure, unsafe edit rejection, and missing implementation.
- Add tests that JSON mode writes only JSON to stdout.
- Add tests that human output does not become the automation contract.

## Out Of Scope

- Final command option names before `@lumina/cli` exists.
- Claiming any command works before implementation.
- Supporting arbitrary output formats before JSON is stable.
- Exposing secrets, tokens, or absolute local paths in JSON output.
