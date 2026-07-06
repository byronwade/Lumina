# NeedleStart

Status: Planned.

Audience: future website visitors, app developers, AI agents.

NeedleStart is an app-graph-native, SEO-first React framework for humans and AI agents.

The promise is simple:

> Your app ships with a map.

NeedleStart is designed so routes, components, APIs, schemas, tests, metadata, cache tags, ownership, and agent-safe edit boundaries can be understood through framework-generated structure instead of repository-wide guessing.

## Current Status

NeedleStart is in Phase 1: monorepo scaffold. The Bun workspace, package placeholders, shared core types, CI, and enforcement scripts exist; framework runtime behavior is still planned.

No runtime implementation, CLI behavior, route compiler, Needle Map generator, MCP server, or safe edit system exists yet. The current repository defines the product direction, architecture, safety rules, docs system, package boundaries, and first implementation path.

See:

- [Project Status](../status.md)
- [Phase 1 Build Plan](../phase-1-build-plan.md)
- [Roadmap](roadmap.md)

## Planned Optimization Targets

- Public pages that are SEO-safe by default.
- Static-first rendering when possible.
- Bun-first adapter paths with runtime boundaries.
- Vite/Rolldown frontend leverage.
- A semantic app graph that humans and agents can inspect.
- Safe, auditable agent workflows.
- Benchmark-honest performance work.

## What Makes It Different

Most web frameworks make the app run. NeedleStart should also make the app explain itself.

Needle Map is planned as a first-class graph of how files, routes, components, APIs, schemas, metadata, cache tags, tests, and owners relate. Agent Kernel and MCP support are planned so AI agents can inspect structure, plan changes, run affected checks, and apply safe edits through guardrails.

## Start Reading

- [Docs Landing](docs.md)
- [Your App Ships With A Map](concepts/app-graph.md)
- [SEO-First Rendering](concepts/seo-first.md)
- [Agent-Safe Workflows](concepts/agent-native.md)
- [Whole-System Speed](concepts/speed.md)

## Source

- [Project Status](../status.md)
- [Phase 1 Build Plan](../phase-1-build-plan.md)
- [Roadmap](roadmap.md)

