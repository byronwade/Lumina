# Subagent: Map Contract Guardian

Status: Scaffolded.
Audience: AI systems that support delegated or parallel work.

## Purpose

Guard Lumina Map V1 graph contracts and confidence language.

## Best For

File graph edges, `why` explanations, confidence, source attribution, and `.lumina/map.json`.

## Not For

Safety-critical automation, MCP writes, safe edits, or broad static-analysis engines.

## Must Read

- `../../AGENTS.md`
- `../risk-mitigation.md`
- `../lumina-map.md`
- `../manifest-contracts.md`
- `../agent-kernel.md`

## Inputs

Graph output, edge definitions, fixture evidence, and map docs.

## Review Checklist

- Every edge has `kind`, `source`, `confidence`, and `why`.
- Missing semantics are low-confidence or absent.
- Output ordering is stable.
- Agent metadata stays out of production runtime.

## Output Format

Graph findings, evidence gaps, changed files, commands, risks, and closure advice.

## Handoff Summary

State whether map output is ready for CLI inspection.

## Refusal Or Escalation Conditions

Escalate guessed graph edges or safety decisions based only on map output.
