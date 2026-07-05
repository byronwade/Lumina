# Glossary

## Agent Kernel

The framework subsystem that generates agent context, safe edit plans, mutation logs, and MCP integrations.

## Context Capsule

A compact JSON document describing one route, API, or app surface for agents. It includes source files, mode, SEO status, related components, safe edits, danger zones, and checks.

## Hot API

An API route compiled into a specialized handler with generated validation, serialization, and optional micro-caching.

## Needle Map

The file-level and semantic graph of a NeedleStart application.

## Render Mode

The execution strategy for a route, such as static, prerendered, SSR, streaming, client-only, API, or hot API.

## Safe Edit

A constrained edit operation that validates the target, applies an AST patch, formats files, regenerates graph data, runs affected checks, and writes a mutation log.

## Semantic Graph

A graph that goes beyond imports and represents application meaning, such as route-to-layout, component-to-schema, metadata-to-SEO, and cache-tag-to-route relationships.

## Static-First

The principle that public routes should emit static HTML whenever it is safe, and only use SSR or client-only rendering when needed.
