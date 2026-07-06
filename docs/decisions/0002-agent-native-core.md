# ADR 0002: Agent-Native Core

Date: 2026-07-05

Status: Proposed.
Audience: maintainers, framework contributors, AI agents.

## Context

Many React frameworks are optimized for human-authored code but do not expose enough structured application context for AI agents. Agents often need to scan large parts of a repository to answer simple questions such as what a route uses, what tests should run, or whether a metadata edit is safe.

## Decision

Make agent-native behavior a core framework feature from the beginning.

This includes:

- App-local `AGENTS.md` generation.
- Route context capsules.
- Needle Map.
- Stable JSON diagnostics.
- Safe edit operations.
- Mutation logs.
- MCP server tools.

## Consequences

The compiler and graph must preserve application relationships that many frameworks ignore.

This increases build-time complexity, but it gives NeedleStart a clear wedge:

- Agents can inspect without reading the entire repo.
- Humans can audit agent changes.
- Safe edits can be transactional.
- Affected checks can be precise.

## Alternatives Considered

- Add agent support after the core framework is complete.
- Rely only on README and AGENTS.md files.
- Let agents use generic search and file edits.
