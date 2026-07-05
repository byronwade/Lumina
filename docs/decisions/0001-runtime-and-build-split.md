# ADR 0001: Runtime and Build Split

Date: 2026-07-05

Status: proposed

## Context

NeedleStart needs to become credible quickly without spending the first phase building a custom bundler. The framework also needs a fast runtime path and a place to put framework-specific intelligence.

## Decision

Use Bun as the default runtime and package/test tool, Vite/Rolldown as the frontend build foundation, and a custom Needle compiler for route graph, render modes, SEO, agent context, semantic map, API codegen, and deployment manifests.

## Consequences

This gives the project a practical path to a working prototype:

- Bun provides production request handling and fast local tooling.
- Vite/Rolldown provides React, CSS, assets, HMR, and ecosystem leverage.
- Needle compiler owns the differentiating framework intelligence.

The project postpones:

- Custom bundler work.
- Deep RSC integration.
- Edge runtime from day one.

## Alternatives Considered

- Build a custom bundler immediately.
- Use only Vite middleware and avoid a custom compiler.
- Start with Node runtime instead of Bun.
