---
schema: gui.md/v1
name: Command Palette
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

# Command Palette GUI.md

## Purpose and Scope

The command palette lets users search, discover, and execute commands from anywhere in the application. It prioritizes keyboard speed while preserving visible structure for users who browse commands.

This seed entry is a self-created abstract pattern and does not depend on external product captures.

Out of scope: global application routing, command permission backends, and command execution implementation.

## Product Surface Model

- Launcher trigger
- Modal command surface
- Search input
- Grouped result list
- Empty state
- Loading state
- Error state
- Keyboard shortcut hints

## Information Architecture

Results are grouped by command category. The search input remains pinned at the top. The active result is visually distinct and described to assistive technology. Destructive commands are separated from neutral commands.

## Layout System

The palette appears centered on desktop and as a near-full-width sheet on narrow screens. It must keep the search input visible while results scroll. Result rows must keep labels, descriptions, and shortcuts aligned.

## Component Contracts

### Palette Trigger

- **Purpose:** Opens the command palette.
- **Anatomy:** Label or icon, optional shortcut hint.
- **States:** default, hover, focus, active, disabled.
- **Behavior:** Activates by pointer, Enter, or Space.
- **Do:** Show the keyboard shortcut when space allows.
- **Don't:** Hide the only command access behind an unlabeled icon.

### Search Input

- **Purpose:** Filters commands.
- **Anatomy:** text field, optional leading search icon, optional clear control.
- **States:** empty, typing, focused, disabled.
- **Behavior:** Typing filters results immediately. When the query is non-empty, first Escape clears the query and keeps the palette open. When the query is empty, Escape closes the palette and restores focus.
- **Do:** Focus the input when the palette opens.
- **Don't:** Move focus to results until the user navigates with arrow keys.

### Result List

- **Purpose:** Presents commands matching the query.
- **Anatomy:** group label, command label, optional description, optional shortcut, optional status.
- **States:** default, highlighted, selected, disabled, loading, empty, error.
- **Behavior:** Arrow keys move the highlight. Enter executes the highlighted enabled command. Disabled commands remain visible with a reason.
- **Do:** Keep one highlighted item when results exist.
- **Don't:** Execute destructive commands without confirmation.

## Interaction Rules

- Open with the trigger or registered keyboard shortcut.
- Close with Escape when the query is empty, outside click, or successful command execution.
- Clear the query and keep the palette open on first Escape when the query is non-empty.
- Restore focus to the element that opened the palette.
- Arrow Down and Arrow Up move between enabled results.
- Home and End jump to first and last enabled results.
- Enter executes the highlighted result.
- Destructive results open a confirmation surface instead of executing immediately.
- Destructive confirmation must name the action, offer cancel, keep focus recoverable, and wait for explicit confirmation before execution.

## State Model

- **Closed:** Palette is not visible.
- **Opening:** Palette appears and focus moves to search.
- **Ready:** Search is empty and default commands are shown.
- **Filtering:** Query is non-empty and results update.
- **Loading:** Async command source is pending.
- **Empty:** No commands match the query.
- **Error:** Commands cannot be loaded.
- **Confirming:** Destructive command waits for confirmation.

## Accessibility Contract

- The palette is a modal surface with a clear accessible name.
- Focus stays within the palette or its confirmation surface while open.
- Closing the palette restores focus to the element that opened it.
- The search input has a clear accessible label.
- The result list exposes the highlighted result through equivalent focus semantics.
- Escape clears a non-empty query first; Escape closes and restores focus when the query is empty.
- Loading and error states are announced.
- Shortcut hints are supplementary and not the only way to understand commands.

## Content and Microcopy

- Empty search prompt: "Search commands..."
- Empty result message: "No commands found"
- Loading message: "Loading commands"
- Error message: "Commands could not be loaded"
- Destructive confirmation labels must name the action.

## Motion and Feedback

Opening motion should be brief and should not delay input focus. Highlight movement should be immediate. Respect reduced motion preferences.

## Anti-patterns

- Do not trap focus without Escape recovery.
- Do not execute destructive commands directly from search.
- Do not hide disabled command reasons.
- Do not rely on color alone for highlighted results.
- Do not clear the user's query after a failed command.

## Adapter Mapping Rules

Adapters may define platform-specific semantics, focus mechanics, and implementation hooks. They must not change command grouping, destructive confirmation, or state names.

## Validation Checklist

- [ ] Input receives focus on open.
- [ ] Escape clears a non-empty query and keeps the palette open.
- [ ] Escape closes and restores focus when the query is empty.
- [ ] Arrow keys move highlighted result.
- [ ] Enter executes only enabled commands.
- [ ] Empty, loading, and error states are present.
- [ ] Destructive commands require confirmation.
- [ ] Disabled commands include reasons.
