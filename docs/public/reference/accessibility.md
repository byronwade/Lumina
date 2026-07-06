# Accessibility

Status: Planned.

Audience: app developers, docs site builders, framework contributors, AI agents.

NeedleStart accessibility tooling is planned but not implemented yet. This page summarizes the public accessibility expectations for future examples, generated pages, and docs.

## Target

NeedleStart should target WCAG 2.2 AA for official examples, generated starter pages, and public docs pages once implementation exists.

This is not a conformance claim. Do not treat any NeedleStart page as WCAG-verified until tests and review evidence exist.

## Planned Defaults

Official examples should eventually use:

- Semantic HTML before ARIA.
- Logical headings.
- Descriptive links.
- Native links and buttons.
- Labels for form controls.
- Visible focus states.
- Keyboard-operable interactive UI.
- Accessible form errors.
- Meaningful alt text for informative images.
- Reduced-motion support for non-essential animation.

## Planned Checks

Future checks should cover:

- Heading order.
- Link text.
- Image alt text.
- Form labels and error messages.
- Keyboard navigation.
- Route focus behavior for route transitions.
- Invalid ARIA.
- Public HTML smoke checks.

Planned diagnostics should use `A11Y_` code prefixes and the shared diagnostic shape.

## Evidence Rules

- Accessibility claims require testing evidence.
- WCAG 2.2 AA is a quality target, not a conformance claim.
- Do not publish broad accessibility or WCAG conformance wording without browser checks and review evidence.

## Current Reality

The repository is in Phase 1 scaffold. Accessibility diagnostics, browser tests, route focus behavior, and generated reports do not exist yet.

## Source

- [Accessibility Contract](../../accessibility-contract.md)
- [Testing](testing.md)
- [SEO](seo.md)
- [Diagnostics](diagnostics.md)
