# Accessibility

Status: Planned.

Audience: docs maintainers, app developers, accessibility reviewers, AI agents.

NeedleStart docs and future examples should support accessible applications and accessible documentation.

The detailed accessibility requirements for framework-owned pages, examples, diagnostics, and tests are defined in [Accessibility Contract](accessibility-contract.md).

## Documentation Requirements

- Use descriptive headings.
- Use meaningful link text.
- Include alt text for images and diagrams.
- Avoid color-only distinctions.
- Keep tables readable.

## Framework Requirements

As implementation begins, examples should avoid inaccessible defaults and include accessibility notes for routing, metadata, forms, errors, and generated pages.

Framework-owned examples should eventually target WCAG 2.2 AA as a quality goal, use semantic HTML before ARIA, remain keyboard-operable, and include visible focus behavior. Do not claim WCAG conformance until tests and review evidence exist.

## Public Reference

Public-facing accessibility expectations live in [Public Accessibility Reference](public/reference/accessibility.md).

