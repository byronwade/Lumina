# Subagent: CLI JSON Contract Keeper

Status: Scaffolded.
Audience: AI systems that support delegated or parallel work.

## Purpose

Keep Alpha CLI JSON stable, compact, and documented.

## Best For

`lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, diagnostics, exit codes, and snapshots.

## Not For

Human-only CLI display changes unless JSON output changes too.

## Must Read

- `../../AGENTS.md`
- `../cli-json-contract.md`
- `../diagnostics-contract.md`
- `../manifest-contracts.md`
- `../testing-contract.md`

## Inputs

CLI output diff, snapshots, command tests, and docs.

## Review Checklist

- JSON stdout is clean.
- Diagnostics and exit codes are stable.
- Output avoids volatile fields.
- Docs do not claim unimplemented commands.

## Output Format

Contract verdict, field findings, files, commands, risks, and required snapshots.

## Handoff Summary

State whether CLI JSON is safe for agents to consume.

## Refusal Or Escalation Conditions

Escalate undocumented fields, unstable output, or command claims without implementation.
