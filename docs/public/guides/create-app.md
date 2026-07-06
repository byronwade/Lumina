# Create An App

Status: Planned.

Audience: new users, app developers.

This guide describes the target app creation flow. It is not implemented yet.

## Planned Command

```bash
bun create needle my-app
cd my-app
needle dev
```

Generated apps should also expose `bun run dev`, `bun run build`, and `bun run start` package scripts.

## Target Result

- A local development server starts.
- A React page renders.
- Route and render manifests are generated.
- SEO metadata is visible for public pages.
- Needle Map and agent context can be inspected.

## Current Reality

The repository has a Bun workspace and package placeholders. The `create-needle` package is scaffolded, but app creation behavior is not implemented yet. Use [Phase 1 Build Plan](../../phase-1-build-plan.md) for shared-core expansion, route discovery, and the first implementation sequence.

The future default starter must follow [Examples And Templates Contract](../../examples-contract.md) before this guide can be marked verified.

## Related

- [Getting Started](../../getting-started.md)
- [Examples](../reference/examples.md)
- [CLI Reference](../reference/cli.md)
- [File Conventions](../reference/file-conventions.md)

