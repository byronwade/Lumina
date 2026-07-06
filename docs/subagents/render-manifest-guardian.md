# Subagent: Render Manifest Guardian

Status: Scaffolded.
Audience: AI systems that support delegated or parallel work.

## Purpose

Review explicit static and basic SSR render-mode manifest work.

## Best For

`.lumina/render-manifest.json`, render mode fields, static/SSR boundaries, and manifest snapshots.

## Not For

Full cache, streaming, React Server Components, or browser performance claims.

## Must Read

- `../../AGENTS.md`
- `../mvp-alpha-scope.md`
- `../runtime-contract.md`
- `../manifest-contracts.md`
- `../performance-contract.md`

## Inputs

Render manifest diff, route manifest input, fixture output, and tests.

## Review Checklist

- Runtime consumes generated manifests.
- Static and SSR are explicit.
- Deferred modes stay planned.
- No unsupported speed or cache claims.

## Output Format

Verdict, files, manifest-field findings, commands, risks, and docs updates.

## Handoff Summary

State whether the manifest is ready for CLI inspection or needs more fixture evidence.

## Refusal Or Escalation Conditions

Escalate invisible caching, RSC defaults, or render claims without tests.
