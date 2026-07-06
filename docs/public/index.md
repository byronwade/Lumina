# Lumina

Status: Planned.

Audience: future website visitors, app developers, AI agents.

Lumina is an app-graph-native, agent-native, SEO-first React framework for humans and AI agents.

In short: Lumina is an app-graph-native, SEO-first React framework for humans and AI agents.

The promise is simple:

> Your app ships with a map.

Lumina is designed to illuminate the full structure of large React applications. Routes, components, APIs, schemas, tests, metadata, cache tags, ownership, and agent-safe edit boundaries should be understood through framework-generated structure instead of repository-wide guessing.

## Product Themes

- Illumination And Clarity: make hidden application structure visible.
- Lumina Map: treat the semantic app graph as a first-class product surface.
- Agent-Native Workflows: give humans and AI agents stable contracts, context capsules, and safe edit paths.
- Explicit SEO-First Behavior: keep render modes, cache plans, public HTML, metadata, and diagnostics inspectable.
- Built For Scale: plan around ownership, affected checks, package boundaries, and evidence-backed performance work.

## Current Status

Lumina is in Phase 1: monorepo scaffold with the first compiler route-discovery slice implemented. The Bun workspace, package placeholders, shared core types, initial route-discovery API, CI, and enforcement scripts exist; framework runtime behavior is still planned.

No runtime implementation, CLI behavior, generated route artifact writer, Lumina Map generator, MCP server, or safe edit system exists yet. The current repository defines the product direction, architecture, safety rules, docs system, package boundaries, and first implementation path.

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

Most web frameworks make the app run. Lumina should also make the app explain itself.

Lumina Map is planned as a first-class graph of how files, routes, components, APIs, schemas, metadata, cache tags, tests, and owners relate. Agent Kernel and MCP support are planned so AI agents can inspect structure, plan changes, run affected checks, and apply safe edits through guardrails.

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

