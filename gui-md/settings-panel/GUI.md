---
schema: gui.md/v1
name: Settings Panel
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

# Settings Panel GUI.md

## Purpose and Scope

The settings panel lets users review and update persistent configuration. It prioritizes clarity, save confidence, validation, permission transparency, and safe destructive actions.

This seed entry is a self-created abstract pattern and does not depend on external product captures.

Out of scope: authentication, billing provider integration, and backend permission models.

## Product Surface Model

- Settings navigation
- Section header
- Field groups
- Individual controls
- Save/reset action area
- Validation messages
- Permission-limited fields
- Destructive action zone

## Information Architecture

Settings are grouped by user goal, not by database model. High-risk settings are separated from routine preferences. Destructive actions appear at the end of the relevant section or in a dedicated danger zone.

## Layout System

Desktop layouts may use side navigation with a content panel. Narrow screens use stacked sections. Save actions remain discoverable after changes. Long forms are divided into labelled groups.

## Component Contracts

### Settings Navigation

- **Purpose:** Moves between settings sections.
- **Anatomy:** section labels, optional status markers.
- **States:** default, current, disabled, dirty.
- **Behavior:** Changing sections preserves unsaved changes or prompts before discarding.
- **Do:** Mark sections with unsaved changes.
- **Don't:** Navigate away and lose changes silently.

### Field Group

- **Purpose:** Groups related controls.
- **Anatomy:** title, description, controls, validation messages.
- **States:** default, dirty, saving, saved, error, disabled, permission-limited.
- **Behavior:** Validation appears near the affected control.
- **Do:** Explain disabled controls.
- **Don't:** Put unrelated controls under one vague heading.

### Save Area

- **Purpose:** Confirms, saves, or resets changes.
- **Anatomy:** save action, reset/cancel action, save status.
- **States:** clean, dirty, saving, saved, error.
- **Behavior:** Save is enabled only when changes are valid and dirty.
- **Do:** Show clear save status.
- **Don't:** Show success forever after new edits begin.

### Destructive Action Zone

- **Purpose:** Contains actions that remove data, access, or configuration.
- **Anatomy:** warning text, destructive action, confirmation step.
- **States:** default, confirming, processing, failed, completed.
- **Behavior:** Requires confirmation and names the affected object.
- **Do:** Separate destructive actions visually and structurally.
- **Don't:** Mix destructive actions with routine save controls.

## Interaction Rules

- Editing a field marks its group and section dirty.
- Invalid fields block save and show local errors.
- Save action enters saving state and blocks repeated submission.
- Successful save clears dirty state.
- Failed save preserves user changes and explains recovery.
- Permission-limited fields remain visible with a reason.
- Leaving with unsaved changes requires confirmation or preserves draft state.

## State Model

- **Clean:** No unsaved changes.
- **Dirty:** One or more values changed.
- **Invalid:** Dirty values fail validation.
- **Saving:** Save request in progress.
- **Saved:** Save succeeded.
- **Save error:** Save failed and changes remain.
- **Permission-limited:** User can view but not edit.
- **Confirming destructive action:** Awaiting explicit confirmation.

## Accessibility Contract

- Each input has a label.
- Descriptions are associated with controls.
- Validation messages are associated with invalid fields.
- Save status changes are announced.
- Focus moves to the first invalid field after failed validation.
- Destructive confirmations are keyboard reachable and reversible before final confirmation.

## Content and Microcopy

- Dirty state: "Unsaved changes"
- Saving state: "Saving..."
- Saved state: "Changes saved"
- Save error: "Changes could not be saved"
- Permission reason: "You do not have permission to edit this setting"
- Destructive confirmation must include the affected object name.

## Motion and Feedback

Use immediate field-level feedback for validation. Save feedback may use subtle status transitions. Avoid motion that distracts from form reading. Respect reduced motion.

## Anti-patterns

- Do not lose unsaved changes silently.
- Do not disable controls without explaining why.
- Do not show validation only after submission when immediate validation is possible.
- Do not place destructive actions next to routine save actions.
- Do not clear user edits after save failure.

## Adapter Mapping Rules

Web adapters may define form markup, fieldset/legend usage, error associations, and live regions. They must not change dirty-state behavior, permission visibility, or destructive confirmation rules.

## Validation Checklist

- [ ] Every input has a label.
- [ ] Dirty state is visible.
- [ ] Save is blocked for invalid changes.
- [ ] Save failure preserves edits.
- [ ] Disabled controls explain why.
- [ ] Destructive actions require confirmation.
- [ ] Focus moves to invalid fields after failed validation.
