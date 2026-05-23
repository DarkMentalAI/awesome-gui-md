---
schema: html.md/v1
name: Undo Toast Web Adapter
version: 0.1.0
status: draft
depends_on:
  gui: ./GUI.md
target: web
---

# Undo Toast HTML.md

## Adapter Scope

This file maps the undo toast GUI contract to Web semantics.

## Semantic HTML Mapping

| GUI concept | HTML mapping | Notes |
|---|---|---|
| Toast region | landmark or notification container | Keep it outside unrelated form controls |
| Status message | text node inside notification | Include affected item or count |
| Undo action | `<button type="button">` | Disable while undoing or after expiry |
| Dismiss action | `<button type="button">` | Do not submit or confirm destructive actions |
| Expiry cue | text or progress indicator | Text remains the source of truth |

## ARIA and Labels

- Non-urgent status updates use polite announcements.
- Errors that require immediate attention may use assertive announcements.
- Undo and dismiss buttons have accessible names.
- The toast message identifies the affected object or count.
- Expiry text is exposed to assistive technology when undo availability changes.

## Focus and Keyboard

- Toast controls are reachable in normal tab order or by a documented notification shortcut.
- Showing a toast does not move focus away from the user's current task.
- Activating undo keeps focus stable unless a recovery error needs attention.
- Dismiss returns focus to the prior task context when focus was inside the toast.
- Escape may dismiss the toast only when focus is inside the toast region.

## CSS Token Mapping

- `surface.feedback` maps to toast background.
- `text.primary` maps to status text.
- `state.success` maps to completed action feedback.
- `state.error` maps to undo or action failure.
- `state.warning` maps to expiry or limited availability.
- `focus.ring` maps to undo and dismiss controls.

## Responsive Rules

- Keep the toast clear of primary navigation and submit controls.
- Wrap message and actions before truncating the affected object name.
- Narrow screens may stack actions below the message.
- Toasts must not block access to the control that triggered the action.

## DOM and State Hooks

- `data-gui="undo-toast"`
- `data-state="queued|visible|success|error|undo-available|undoing|undone|expired|dismissed"`
- `data-undo-available="true|false"`
- `data-expiry`
- `data-action-id`

## Validation Checklist

- [ ] Undo and dismiss are real buttons.
- [ ] Status updates are announced with appropriate urgency.
- [ ] Showing a toast does not steal focus.
- [ ] Undo busy and expired states block repeat submission.
- [ ] Expiry is communicated with text, not color alone.
- [ ] HTML.md does not redefine undo semantics.
