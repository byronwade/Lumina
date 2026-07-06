# Accessibility

Status: Planned.

Audience: docs maintainers, app developers, accessibility reviewers, AI agents.

NeedleStart docs and future examples should support accessible applications and accessible documentation.

The detailed accessibility requirements for framework-owned pages, examples, diagnostics, route focus behavior, form errors, and testing evidence are defined in [Accessibility Contract](accessibility-contract.md).

## Documentation Requirements

- Use descriptive headings.
- Use meaningful link text.
- Include alt text for images and diagrams.
- Avoid color-only distinctions.
- Keep tables readable.
- Preserve semantic HTML, keyboard navigation, and visible focus behavior in public docs UI.

## Framework Requirements

As implementation begins, examples should avoid inaccessible defaults and include accessibility notes for routing, metadata, forms, errors, and generated pages.

Framework-owned examples should eventually target WCAG 2.2 AA as a quality goal, use semantic HTML before ARIA, remain keyboard-operable, and include visible focus behavior. Route focus behavior and form errors must be documented before they are marked verified.

Accessibility diagnostics should use `A11Y_` code prefixes and the shared diagnostic shape. Testing evidence must exist before any broad accessibility or WCAG conformance claim.

## Public Reference

Public-facing accessibility expectations live in [Public Accessibility Reference](public/reference/accessibility.md).

