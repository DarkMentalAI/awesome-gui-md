---
schema: html.md/v1
name: Command Palette Web Adapter
version: 0.1.0
status: draft
depends_on:
  gui: ./GUI.md
target: web
---

# Command Palette HTML.md

## Adapter Scope

This file maps the command palette GUI contract to Web semantics.

## Semantic HTML Mapping

| GUI concept | HTML mapping | Notes |
|---|---|---|
| Palette trigger | `<button type="button">` | Include visible text or `aria-label` |
| Palette surface | `<dialog>` or `role="dialog"` container | Modal behavior must restore focus |
| Search input | `<input type="search">` | Provide an accessible label |
| Result list | `role="listbox"` with `aria-activedescendant`, or semantic list containing buttons | Use listbox when focus stays on search; use button/list when focus moves among commands |
| Result item | `role="option"` or `<button>` inside list item | Match the chosen list pattern; disabled items must expose disabled state |
| Status message | `aria-live="polite"` region | Announce loading, empty, and error states |

## ARIA and Labels

- The dialog is labelled by a visible title or `aria-label="Command palette"`.
- The search input uses `aria-label="Search commands"`.
- Use `aria-activedescendant` with `role="listbox"` when the search input retains DOM focus.
- Use semantic list items with command buttons when focus roves to each result.
- Loading and error messages use a polite live region.

## Focus and Keyboard

- Save the opener before showing the palette.
- Focus the search input after opening.
- Restore focus to the opener after close.
- Escape clears a non-empty query and keeps the palette open.
- Escape closes the palette and restores focus when the query is empty.
- Arrow keys navigate results by updating active descendant or by moving focus among command buttons, depending on the chosen pattern.
- Destructive confirmation names the action, provides cancel, keeps focus recoverable, and executes only after confirmation.

## CSS Token Mapping

- `surface.overlay` maps to palette background.
- `surface.elevated` maps to result rows.
- `text.primary` maps to command labels.
- `text.muted` maps to descriptions and shortcuts.
- `state.focus` maps to focus ring and highlighted result.
- `state.danger` maps to destructive command affordance.

## Responsive Rules

- Desktop: centered modal with constrained width.
- Narrow screens: inset sheet with full-width search and scrollable results.
- Search remains visible when results scroll.

## DOM and State Hooks

- `data-gui="command-palette"`
- `data-state="closed|opening|ready|filtering|loading|empty|error|confirming"`
- `data-active-result`
- `data-command-id`
- `data-destructive="true"` for destructive commands

## Validation Checklist

- [ ] Trigger is a real button.
- [ ] Search input has an accessible label.
- [ ] Highlighted result is exposed programmatically.
- [ ] Escape clears a non-empty query and keeps the palette open.
- [ ] Escape restores focus when closing from an empty query.
- [ ] Loading, empty, and error states are announced.
- [ ] Destructive confirmation names the action and offers cancel before execution.
