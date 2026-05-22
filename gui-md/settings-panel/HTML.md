---
schema: html.md/v1
name: Settings Panel Web Adapter
version: 0.1.0
status: draft
depends_on:
  gui: ./GUI.md
target: web
---

# Settings Panel HTML.md

## Adapter Scope

This file maps the settings panel GUI contract to Web semantics.

## Semantic HTML Mapping

| GUI concept | HTML mapping | Notes |
|---|---|---|
| Settings navigation | `<nav aria-label="Settings">` | Current section is programmatically indicated |
| Field group | `<fieldset>` and `<legend>` when controls are related | Use headings for non-form grouping |
| Input | native form control | Prefer native controls before custom widgets |
| Save area | form action region | Save button type depends on form structure |
| Validation message | associated text with `aria-describedby` | Invalid fields expose invalid state |
| Destructive action | `<button type="button">` plus confirmation dialog | Never submit destructively without confirmation |

## ARIA and Labels

- Inputs have visible labels.
- Descriptions and errors are associated with controls.
- Invalid controls expose invalid state.
- Save status uses a polite live region.
- Confirmation dialogs are labelled by their title.

## Focus and Keyboard

- Tab order follows navigation, section heading, controls, save actions.
- Failed validation moves focus to the first invalid field.
- Confirmation dialogs trap focus while open and restore focus on close.
- Escape closes confirmation without applying destructive action.

## CSS Token Mapping

- `surface.base` maps to panel background.
- `surface.group` maps to grouped setting sections.
- `text.primary` maps to labels.
- `text.muted` maps to descriptions.
- `state.error` maps to validation errors.
- `state.danger` maps to destructive actions.
- `state.success` maps to saved status.

## Responsive Rules

- Desktop may use side navigation.
- Narrow screens stack navigation above content.
- Save actions remain reachable after edits.
- Destructive action zones remain visually separated.

## DOM and State Hooks

- `data-gui="settings-panel"`
- `data-state="clean|dirty|invalid|saving|saved|save-error|permission-limited|confirming-destructive-action"`
- `data-field-state`
- `data-section-dirty="true|false"`
- `data-permission-limited="true|false"`
- `data-destructive="true"`

## Validation Checklist

- [ ] Labels are visible.
- [ ] Error messages are associated with invalid fields.
- [ ] Save status is announced.
- [ ] Failed validation focuses the first invalid field.
- [ ] Permission-limited controls expose reasons.
- [ ] Destructive confirmation restores focus when cancelled.
