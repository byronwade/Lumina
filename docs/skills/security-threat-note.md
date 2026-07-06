# Skill: Security Threat Note

Status: Scaffolded.
Audience: AI agents, maintainers, security reviewers.

## Purpose

Require threat notes for high-risk Alpha work before security-sensitive implementation proceeds.

## When To Use

Use for environment handling, runtime request routing, generated artifacts with secrets risk, agent or MCP write behavior, safe edits, auth, billing, cache invalidation, or deployment adapters.

## When Not To Use

Do not use to claim a feature is secure before implementation and tests exist.

## Required Context

Read `../../AGENTS.md`, `../security-contract.md`, `../threat-model.md`, `../risk-mitigation.md`, and `../templates/alpha-threat-note-template.md`.

## Workflow

1. Identify trusted and untrusted inputs.
2. Identify secrets, private data, and production-runtime exposure.
3. Document abuse cases and controls.
4. Require tests or explicit deferral.
5. Escalate high-risk writes for human sign-off.

## Files To Inspect

- `docs/security-contract.md`
- `docs/threat-model.md`
- Owning feature contract.

## Outputs

- Threat note.
- Test requirements.
- Escalation decision.

## Checks To Run

Run security tests when they exist, plus `bun run check`.

## Handoff Checklist

- Secret handling is explicit.
- Production error behavior is explicit.
- Human sign-off requirements are named.

## Drift Risks

Security claims without evidence, secret leakage through generated output, and unaudited write tools.

## Docs To Update

Update `../security-contract.md`, `../threat-model.md`, `../testing-contract.md`, and affected feature docs.
