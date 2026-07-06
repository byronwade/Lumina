# Glossary

## Adapter Manifest

A generated description of a runtime adapter's supported capabilities, entrypoints, output paths, and unsupported features.

## ADR

Architecture decision record. A short document that records an important decision, context, consequences, rejected alternatives, and related docs.

## Agent Kernel

The framework subsystem that generates agent context, safe edit plans, mutation logs, and MCP integrations.

## Agent Context Index

A planned generated index that helps agents find the smallest relevant context files instead of loading the whole project.

## App Graph

The broader application graph that connects routes, layouts, components, APIs, schemas, tests, owners, generated files, cache plans, SEO metadata, and risk.

## Benchmark Fixture

A controlled app, route set, adapter output, or workflow used to measure a specific performance claim with repeatable inputs and raw result evidence.

## Build Manifest

A generated build output record that maps source inputs to chunks, assets, render outputs, and runtime adapter inputs.

## Cache Plan

The explicit cache behavior for a route, API, component, or data surface, including headers, tags, revalidation, and diagnostics.

## Context Capsule

A compact JSON document describing one route, API, or app surface for agents. It includes source files, mode, SEO status, related components, safe edits, danger zones, and checks.

## Diagnostic

A structured warning or error with a stable code, severity, source location when available, remediation text, and docs link.

## Docs Site Renderer

The future tool or NeedleStart app that turns `docs/public/` Markdown, metadata, navigation, and machine-readable outputs into the public documentation site.

## Example Catalog

The planned inventory of official NeedleStart examples, their paths, statuses, purposes, and public guide relationships.

## Field Data

Performance data collected from real users. It is different from local lab benchmarks and must not be presented as equivalent.

## Generated Artifact

A file produced from source inputs by the framework, compiler, docs tooling, or build process. Generated artifacts should be reproducible and should not require manual edits.

## Graph Edge

A relationship between two graph nodes. NeedleStart graph edges must include `kind`, `source`, `confidence`, and `why`.

## Hot API

An API route compiled into a specialized handler with generated validation, serialization, and optional micro-caching.

## MCP

Model Context Protocol. A planned development-time integration surface for exposing read-only and eventually safe write tools to agents.

## Needle Map

The file-level and semantic graph of a NeedleStart application.

## Native Route Dispatch

Adapter behavior that routes requests through runtime-native dispatch paths when available, while preserving generated manifest behavior and parity tests.

## Public Frontmatter

Planned metadata for public docs pages, including title, description, status, audience, category, source path, canonical route, related docs, and tags.

## Review Checklist

The shared review gate for documentation, implementation, security, performance, and public-docs changes.

## Render Mode

The execution strategy for a route, such as static, prerendered, SSR, streaming, client-only, API, or hot API.

## Render Manifest

A generated contract that records each route's render mode, runtime inputs, output expectations, and adapter-facing behavior.

## Route Graph

The route-focused slice of the app graph, including route IDs, paths, layouts, params, render modes, metadata, APIs, tests, and generated outputs.

## RUM

Real-user monitoring. Optional field-data collection for production apps; it must be explicit and must not be enabled by default.

## Safe Edit

A constrained edit operation that validates the target, applies an AST patch, formats files, regenerates graph data, runs affected checks, and writes a mutation log.

## Semantic Graph

A graph that goes beyond imports and represents application meaning, such as route-to-layout, component-to-schema, metadata-to-SEO, and cache-tag-to-route relationships.

## Source Map Exposure

The policy for whether production source maps are emitted, uploaded privately, or publicly accessible. Public exposure affects performance, privacy, and security claims.

## Static-First

The principle that public routes should emit static HTML whenever it is safe, and only use SSR or client-only rendering when needed.

## Static Export

An adapter output mode that emits static files for routes that do not require request-time server execution.

## Threat Note

A short review artifact for high-risk changes that names trusted inputs, untrusted inputs, affected assets, validation, tests, rollback, and out-of-scope risk.

## Vite/Rolldown

The planned frontend build foundation for React transforms, HMR, CSS, assets, chunking, and production bundling before any custom bundler work is considered.
