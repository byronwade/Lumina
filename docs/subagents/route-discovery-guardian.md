# Subagent: Route Discovery Guardian

Status: Scaffolded.
Audience: AI systems that support delegated or parallel work.

## Purpose

Review MVP Alpha route discovery and `.lumina/routes.json` output.

## Best For

Route IDs, path sorting, source-file normalization, route fixtures, and routing diagnostics.

## Not For

API routes, middleware, migration, or complete framework routing parity.

## Must Read

- `../../AGENTS.md`
- `../mvp-alpha-scope.md`
- `../routing-contract.md`
- `../file-conventions.md`
- `../manifest-contracts.md`

## Inputs

Route discovery diff, fixture tree, route manifest output, and tests.

## Review Checklist

- Output is deterministic.
- Paths use normalized separators.
- No absolute local paths or volatile values.
- Deferred route conventions stayed deferred.

## Output Format

Findings, route-output verdict, files, commands, risks, and missing fixtures.

## Handoff Summary

State whether route discovery is ready for render-manifest work.

## Refusal Or Escalation Conditions

Escalate full-router scope creep or manifest output without snapshot evidence.
