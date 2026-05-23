---
schema: gui.md/v1
name: Undo Toast
version: 0.1.0
status: draft
audience:
  - ai-agents
  - designers
  - frontend-engineers
target_surfaces:
  - web
source_refs: []
adapters:
  - HTML.md
accessibility:
  baseline: WCAG 2.2 AA
---

# Undo Toast GUI.md

## Purpose and Scope

The undo toast confirms a recent action and offers a short recovery path when the action is reversible. It prioritizes clear outcome messaging, safe undo timing, keyboard access, and non-disruptive feedback.

This seed entry is a self-created abstract pattern and does not depend on external product captures.

Out of scope: full notification centers, legal confirmations, irreversible deletion, payment approval, security-sensitive changes, and backend retry policy.

## Product Surface Model

- Event source
- Toast region
- Status message
- Undo action
- Dismiss action
- Expiry indicator
- Recovery result message

## Information Architecture

Undo feedback appears near the current work area when possible. Global placement is reserved for actions that affect the whole surface. The status message states what changed before presenting undo. Undo and dismiss actions remain secondary to the user's current task.

## Layout System

The toast uses compact content and stable action placement. It must not cover primary controls, form submit areas, or focused content. Multiple messages may queue, but only the current recoverable action owns the visible undo control.

## Component Contracts

### Toast Region

- **Purpose:** Hosts transient feedback without changing the underlying page structure.
- **Anatomy:** message, optional detail, undo action, dismiss action, expiry cue.
- **States:** queued, visible, expired, dismissed.
- **Behavior:** Shows one recoverable message at a time and removes it only after expiry, dismissal, or completed recovery.
- **Do:** Keep placement predictable.
- **Don't:** Cover the control that triggered the action.

### Status Message

- **Purpose:** Explains the completed or failed action.
- **Anatomy:** outcome text, affected object, optional count.
- **States:** success, error, undone.
- **Behavior:** Updates when undo starts, succeeds, fails, or expires.
- **Do:** Name the affected item or count.
- **Don't:** Use vague text such as "Done" without context.

### Undo Action

- **Purpose:** Reverses the recent action while recovery is available.
- **Anatomy:** action label, busy state, expiry state.
- **States:** undo-available, undoing, expired, error.
- **Behavior:** Runs once, blocks repeat submission, and reports whether the original action was restored.
- **Do:** Disable or remove undo after expiry.
- **Don't:** Offer undo for irreversible or legally sensitive actions.

### Dismiss Action

- **Purpose:** Removes feedback when no action is needed.
- **Anatomy:** dismiss control or implicit timeout.
- **States:** visible, dismissed.
- **Behavior:** Dismissal hides the message but must not cancel an undo already in progress.
- **Do:** Keep dismiss separate from undo.
- **Don't:** Treat dismissal as confirmation of a destructive action.

## Interaction Rules

- A toast appears only after the triggering action has been accepted or completed.
- Undo is available only while the action remains reversible.
- Undo submission enters undoing state and blocks repeated undo attempts.
- Successful undo changes the message to undone before dismissal.
- Failed undo keeps recovery context visible and explains the next available action.
- Expiry removes undo availability without changing the original action result.
- Dismissal hides visible feedback but does not hide unrecovered errors.
- Keyboard users can reach undo and dismiss actions without losing their original task context.

## State Model

- **Queued:** Feedback is waiting behind another visible toast.
- **Visible:** Feedback is shown to the user.
- **Success:** The original action completed.
- **Error:** The original action or undo action failed.
- **Undo-available:** The original action can still be reversed.
- **Undoing:** Undo is in progress and repeat submission is blocked.
- **Undone:** Undo succeeded and the original action was reversed.
- **Expired:** Undo is no longer available.
- **Dismissed:** Feedback was intentionally hidden before or after recovery availability ends.

## Accessibility Contract

- Status changes are announced without stealing focus.
- Undo and dismiss actions are keyboard reachable.
- Focus remains on the user's current task unless recovery needs direct attention.
- Undo availability and expiry are conveyed with text, not color alone.
- Time-limited undo behavior must provide enough time for keyboard and assistive technology users.

## Content and Microcopy

- Success state: "{item} moved"
- Undo action: "Undo"
- Undoing state: "Undoing..."
- Undone state: "{item} restored"
- Expired state: "Undo no longer available"
- Error state: "Could not undo. Try again"

## Motion and Feedback

Use subtle entrance and exit feedback. Motion must not be required to understand availability, expiry, or result. Respect reduced motion and keep busy feedback visible while undo is in progress.

## Anti-patterns

- Do not use undo toast as a substitute for required confirmation.
- Do not offer undo after the recovery window has expired.
- Do not hide undo errors automatically.
- Do not stack multiple undo actions with unclear ownership.
- Do not make timeout the only signal that undo is expiring.

## Adapter Mapping Rules

Adapters may define announcement mechanics, platform controls, timeout hooks, and layout placement. They must not change state names, undo availability rules, or recovery semantics.

## Validation Checklist

- [ ] The triggering action is reversible before undo is offered.
- [ ] The message names what changed.
- [ ] Undo availability, undoing, undone, expired, and error states are present.
- [ ] Undo and dismiss are keyboard reachable.
- [ ] Status changes are announced without stealing focus.
- [ ] Expiry does not hide unrecovered errors.
- [ ] Adapter-specific implementation details are excluded.
