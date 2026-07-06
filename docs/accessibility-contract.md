# Accessibility Contract

Status: Planned.

Audience: framework contributors, app developers, docs maintainers, QA reviewers, AI agents.

This page defines the planned accessibility contract for NeedleStart applications, examples, generated pages, and public documentation. Accessibility behavior is not implemented yet. The contract exists so routing, rendering, forms, diagnostics, browser tests, SEO checks, and examples all use the same expectations.

## Research Notes

NeedleStart should align its public-page and example requirements with current accessibility guidance:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) defines the current W3C accessibility success criteria for web content.
- [WAI WCAG overview](https://www.w3.org/WAI/standards-guidelines/wcag/) explains that W3C encourages using the latest WCAG version and that WCAG 2.2 is backwards compatible with 2.1 and 2.0 in practice.
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) documents accessible patterns, semantics, and examples for common widgets.
- [WAI keyboard interface guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) emphasizes efficient keyboard interaction and focus management.
- [MDN accessible HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML) emphasizes semantic HTML, meaningful link text, labels, table headings, source order, and keyboard accessibility.
- [MDN keyboard accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard) frames keyboard operation as a minimum accessibility requirement.
- [Next.js accessibility docs](https://nextjs.org/docs/architecture/accessibility) show that framework tooling should catch common accessibility issues early.

## Target Standard

NeedleStart should target WCAG 2.2 AA for generated examples, public docs pages, and framework-owned UI once implementation exists.

This is a quality target, not a legal certification claim. Do not claim WCAG conformance until the relevant pages have been tested and reviewed.

## Scope

The accessibility contract applies to:

- Generated starter examples.
- Public docs pages.
- Framework-owned error pages.
- Route transition behavior.
- Forms, validation behavior, and form errors in official examples.
- Metadata and public HTML checks.
- Browser fixtures and smoke tests.
- Diagnostics and agent context that report accessibility risks.

It does not make NeedleStart responsible for all user-authored application content. The framework should provide safe defaults, diagnostics, examples, and testing hooks that make accessible work easier.

## Semantic HTML Rules

Official examples and generated pages should prefer semantic HTML before ARIA:

- Use landmark elements such as `main`, `nav`, `header`, and `footer` when appropriate.
- Use headings in a logical order.
- Use native links for navigation and native buttons for actions.
- Use labels for form controls.
- Use table headers and scopes for data tables.
- Use descriptive link text.
- Use image alt text when images convey meaning.
- Avoid empty interactive elements.

ARIA can be used when native HTML cannot express the interaction, but ARIA must not hide broken semantics.

## Keyboard And Focus Rules

Interactive examples must be operable by keyboard:

- All interactive controls are reachable by keyboard.
- Focus order follows visual and document order.
- Focus is visible.
- Route transitions and modal-like UI have explicit focus behavior.
- Skip links or equivalent navigation aids exist for docs and long pages.
- Escape, arrow-key, and tab behavior follows WAI-ARIA Authoring Practices when custom widgets exist.
- Positive `tabindex` values are avoided.

When NeedleStart introduces client-side navigation, the router contract must define focus restoration and route-announcement behavior before it is marked verified.

## Forms And Validation

Official forms and API examples should eventually prove:

- Inputs have associated labels.
- Required fields are communicated in text and programmatically when possible.
- Validation errors identify the field and the correction.
- Error summaries are reachable and link to fields.
- Server-side validation errors are rendered in accessible HTML.
- Color is not the only error signal.

The [API Route Contract](api-route-contract.md), [Schema Contract](schema-contract.md), and future form examples must stay aligned on validation error shape and public HTML behavior.

## Motion, Media, And Visual Design

NeedleStart examples and docs should:

- Respect reduced-motion preferences for non-essential animation.
- Avoid flashing or rapidly changing content.
- Provide captions, transcripts, or alternatives when framework docs include media.
- Keep sufficient text contrast in examples and docs.
- Avoid color-only states in generated UI.
- Keep zoom and responsive layouts usable without content overlap.

## SEO And Accessibility

SEO and accessibility checks overlap but are not identical.

Shared expectations:

- Public routes render meaningful HTML before client JavaScript is required.
- Page titles identify the route.
- Headings describe page structure.
- Links have useful text.
- Images that convey meaning have alt text.

The [SEO Contract](seo-contract.md) should continue to cover search-facing metadata, sitemap, robots, and structured data. This contract covers human and assistive-technology access.

## Diagnostics

Planned accessibility diagnostics should use the shared diagnostic shape from [Diagnostics Contract](diagnostics-contract.md).

Initial diagnostic families:

| Code prefix | Meaning |
| --- | --- |
| `A11Y_HEADING_` | Heading order, missing page heading, duplicate structural issue. |
| `A11Y_LINK_` | Empty, ambiguous, or inaccessible link text. |
| `A11Y_IMAGE_` | Missing or suspicious alt text. |
| `A11Y_FORM_` | Missing labels, error association, or validation messaging. |
| `A11Y_FOCUS_` | Focus order, visible focus, route transition focus, or modal focus issue. |
| `A11Y_ARIA_` | Invalid ARIA role, property, state, or unsupported semantic pattern. |
| `A11Y_MOTION_` | Reduced-motion or flashing-risk issue. |
| `A11Y_CONTRAST_` | Contrast issue when tooling can verify it. |

Diagnostics must avoid legal conformance language unless a dedicated accessibility audit supports the claim.

## Testing Requirements

Accessibility testing evidence should scale by surface:

| Surface | Required future evidence |
| --- | --- |
| Static public page | HTML smoke check, heading check, link text check, image alt check. |
| Interactive example | Keyboard path, visible focus check, form error check when relevant. |
| Router behavior | Focus restoration or route focus assertion. |
| Docs site | Link text, headings, skip link, keyboard navigation, metadata. |
| Generated starter | Browser smoke test and lint check. |

Automated checks are not enough for a broad accessibility claim. Manual review is required before public WCAG conformance wording.

## Public Docs Requirements

The future docs site should eventually include:

- Skip link.
- Logical landmarks.
- Search and navigation that work by keyboard.
- Visible focus states.
- Heading hierarchy.
- Useful page titles and descriptions.
- Accessible code blocks and copy buttons if implemented.
- No hidden content that prevents screen reader navigation.

Public docs Markdown must keep status and audience text readable without depending on color alone.

## Out Of Scope For The Current Scaffold

- Verified accessibility tooling.
- WCAG conformance claims.
- Browser automation results.
- Assistive-technology test matrix.
- Generated accessibility reports.
- Legal compliance statements.

## Build Readiness

Before public examples or docs pages are marked verified, NeedleStart should have:

- Accessibility expectations documented in this contract.
- Browser test hooks for keyboard and visible behavior.
- Diagnostics shape for accessibility issues.
- Public docs reference for accessibility.
- Review evidence for any public accessibility claim.

This page provides the contract. Implementation must replace planned language with current evidence as tooling and examples become real.
