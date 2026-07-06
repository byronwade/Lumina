# Subagent: Core Model Guardian

Status: Scaffolded.
Audience: AI systems that support delegated or parallel work.

## Purpose

Guard shared `@lumina/core` model shapes.

## Best For

Reviewing shared types, GraphEdge evidence fields, model drift, and package imports.

## Not For

Runtime feature behavior or package-local duplicate types.

## Must Read

- `../../AGENTS.md`
- `../package-map.md`
- `../manifest-contracts.md`
- `../cli-json-contract.md`
- `../lumina-map.md`

## Inputs

Type diff, dependent packages, and affected contracts.

## Review Checklist

- Shared types live in `@lumina/core`.
- Other packages do not redefine core model types.
- Graph edges include `kind`, `source`, `confidence`, and `why`.
- JSON fields are deterministic.

## Output Format

Findings, exact files, required tests, docs updates, and risk level.

## Handoff Summary

State whether the shared model is stable enough for the next Alpha slice.

## Refusal Or Escalation Conditions

Escalate local type forks, unstable model fields, or runtime dependency leaks.
