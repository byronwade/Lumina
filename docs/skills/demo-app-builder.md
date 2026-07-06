# Skill: Demo App Builder

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

## Purpose

Build the MVP Alpha demo app that proves route, render, map, and CLI inspection behavior.

## When To Use

Use when creating or reviewing demo fixtures, starter target behavior, or acceptance demos.

## When Not To Use

Do not use for broad examples catalog work or post-Alpha examples.

## Required Context

Read `../../AGENTS.md`, `../mvp-alpha-scope.md`, `../examples-contract.md`, `../examples-catalog.md`, `../prototype-acceptance.md`, and `../testing-contract.md`.

## Workflow

1. Use the smallest demo that proves the Alpha path.
2. Keep demo routes tied to the scope doc.
3. Add fixture expectations before broadening the demo.
4. Avoid unsupported public claims.
5. Document exact commands only after they work.

## Files To Inspect

- `docs/mvp-alpha-scope.md`
- `docs/examples-contract.md`
- `docs/examples-catalog.md`
- future `examples/` paths when they exist

## Outputs

- Demo fixture or starter changes.
- Acceptance notes.
- Docs updates.

## Checks To Run

Run fixture tests when they exist, plus `bun run check`.

## Handoff Checklist

- Demo proves Alpha behavior only.
- No fake generated artifacts are documented as current.
- Public docs stay planned until verified.

## Drift Risks

Large demo scope, duplicate examples, unsupported CLI commands, and hidden implementation gaps.

## Docs To Update

Update `../examples-contract.md`, `../examples-catalog.md`, `../prototype-acceptance.md`, and public guide docs when behavior exists.
