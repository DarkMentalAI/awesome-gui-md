---
schema: html.md/v1
name: Pattern Name Web Adapter
version: 0.1.0
status: draft
depends_on:
  gui: ./GUI.md
  design: ./DESIGN.md
target: web
---

# Pattern Name HTML.md

## Adapter Scope

This file maps `GUI.md` semantics to Web output. It must not introduce new product semantics.

## Semantic HTML Mapping

Map each GUI component to semantic HTML elements.

| GUI concept | HTML mapping | Notes |
|---|---|---|
| Primary action | `<button type="button">` or `<button type="submit">` | Choose submit only inside a form submission flow |

## ARIA and Labels

Define accessible names, descriptions, live regions, and roles only where semantic HTML is insufficient.

## Focus and Keyboard

Define tab order, focus restoration, roving focus, escape behavior, and shortcut handling.

## CSS Token Mapping

Map GUI and design semantics to CSS custom properties.

## Responsive Rules

Define Web breakpoints and reflow behavior.

## DOM and State Hooks

Define stable hooks for preview, tests, and state inspection.

## Validation Checklist

- [ ] Semantic HTML is used before ARIA.
- [ ] All controls have accessible names.
- [ ] Keyboard behavior matches GUI.md.
- [ ] Focus is visible and restored after overlays close.
- [ ] Error and loading states are announced when relevant.
- [ ] HTML.md does not redefine product semantics.
