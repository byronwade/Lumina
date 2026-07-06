# Adapters

Status: Planned.

Audience: deployers, app developers, adapter maintainers, AI agents.

NeedleStart adapters are planned to turn generated build output into deployable Bun, Node, or static output. Adapter packages are scaffolded; adapter behavior is not implemented yet.

## Initial Adapters

| Adapter | Package | Purpose |
| --- | --- | --- |
| Bun | `@needle/adapter-bun` | Default production server path. |
| Node | `@needle/adapter-node` | Compatibility server path. |
| Static | `@needle/adapter-static` | Static export path. |

## Planned Generated Output

```txt
dist/
  public/
  server/
  adapter.manifest.json
  routes.manifest.json
  render.manifest.json
  seo.report.json
```

These files are deployment output. Canonical compiler and agent artifacts stay under `.needle/`.

## Planned Manifest

`dist/adapter.manifest.json` should describe:

- adapter package,
- runtime,
- entry file,
- public directory,
- capabilities, including compression, route-known resource hints, 103 Early Hints support, and bfcache-aware headers,
- whether adapter-native route dispatch is enabled from generated route-table evidence,
- unsupported features,
- environment variable names,
- diagnostics.

## Rules

- User app code should not require Bun-only APIs.
- Adapter capability claims require tests.
- Generated route tables remain canonical even when a runtime adapter uses native route dispatch for speed.
- Compression, final `Link` headers, and 103 Early Hints must be backed by generated route asset metadata.
- Static export should fail clearly for non-static routes.
- Deployment pages must name unsupported features.
- Secrets must not appear in generated adapter manifests.

## Source

- [Adapter Contract](../../adapter-contract.md)
- [Adapter Architecture](../../adapters.md)
- [Deployment](../../deployment.md)
- [Compatibility](../../compatibility.md)
