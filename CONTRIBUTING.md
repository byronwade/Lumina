# Contributing to NeedleStart

NeedleStart is currently in planning and constitution mode. The first contributor responsibility is to keep the product direction, architecture, and implementation tasks coherent.

We welcome contributions from both humans and AI agents.

## Areas Where Help Is Especially Needed

- Compiler internals and graph algorithms.
- Vite plugin and virtual modules.
- Bun server runtime details.
- MCP tool implementations.
- Documentation and examples.
- Testing and benchmarks.

## Development Principles

- Keep runtime code small.
- Put framework intelligence in the compiler.
- Make public behavior visible through manifests.
- Make agent-facing output stable and compact.
- Prefer explicit cache rules over implicit behavior.
- Prefer deterministic generated output.
- Keep planned features separate from implemented features.

## Planned Setup

These commands are planned once the monorepo is scaffolded:

```bash
bun install
bun test
bun run typecheck
```

Do not claim these commands pass until package scaffolding exists.

## Contribution Flow

1. Read `README.md`.
2. Read `AGENTS.md`.
3. Read the relevant document in `docs/`.
4. Create or update a task using `docs/templates/task-template.md`.
5. Implement the smallest complete slice.
6. Add or update tests.
7. Update README and AGENTS when setup, commands, or project behavior changes.
8. Run checks.
9. Document remaining scope clearly.

For larger changes, open a discussion or design note first.

## AI Agents

AI agents should follow `AGENTS.md` and use the structured task prompt template when creating work. Agents must keep README, AGENTS, and relevant docs accurate when setup, commands, architecture, safety rules, or generated artifacts change.

AI-assisted contributions require the same review standard as human-authored code. Human maintainers remain accountable for merging and releasing changes.

## Code of Conduct

Be respectful. Focus on technical substance. The project values clarity, determinism, and dogfooding Needle Map and agent tools.

## Documentation Requirements

Every stable feature should eventually include:

- Overview.
- Public API example.
- Compiler behavior.
- Runtime behavior.
- CLI behavior.
- Agent notes.
- Tests required.
- Common pitfalls.
- Out of scope.

## Testing Requirements

Use the test type that matches the behavior:

- Unit tests for pure compiler and parser logic.
- Fixture tests for app discovery.
- Integration tests for CLI flows.
- HTTP tests for server behavior.
- Stable JSON tests for agent, SEO, map, and diagnostic output.
- Benchmarks only when performance claims are introduced.

## Pull Request Checklist

- `README.md` is still accurate.
- `AGENTS.md` is still accurate.
- The feature is either implemented or clearly marked as planned.
- New commands are documented.
- New generated files are documented.
- Tests are added or a clear reason is given.
- Agent-facing JSON output is stable.
- High-risk areas are called out.

## Out of Scope for Early Prototype

- Full custom bundler.
- Default React Server Components model.
- Edge runtime from day one.
- Visual editor.
- Database ORM.
- CMS product.
- Plugin marketplace.
- Enterprise cloud dashboard.
