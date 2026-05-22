---
schema: gui.md/v1
name: Pattern Name
version: 0.1.0
status: draft
audience:
  - ai-agents
  - designers
  - frontend-engineers
target_surfaces:
  - web
source_refs:
  - DESIGN.md
adapters:
  - HTML.md
accessibility:
  baseline: WCAG 2.2 AA
---

# Pattern Name GUI.md

## Purpose and Scope

Define the interface problem, target user, primary task, and excluded behaviors.

## Product Surface Model

List the surfaces involved in the pattern.

## Information Architecture

Describe hierarchy, grouping, navigation, and content priority.

## Layout System

Define density, responsive behavior, and layout rules.

## Component Contracts

### Component Name

- **Purpose:** Define why this component exists.
- **Anatomy:** List visible parts.
- **Variants:** List meaningful variants.
- **States:** List default, hover, focus, active, disabled, loading, selected, empty, error, success, dirty, and permission-limited states as relevant.
- **Behavior:** Describe how the component responds to user actions.
- **Do:** List required decisions.
- **Don't:** List forbidden decisions.

## Interaction Rules

Describe pointer, keyboard, focus, touch, confirmation, undo, loading, and recovery behavior.

## State Model

Document required interface states and transitions.

## Accessibility Contract

Define labels, keyboard access, focus order, contrast, reduced motion, and error messaging.

## Content and Microcopy

Define labels, empty state copy, error copy, confirmation text, and localization constraints.

## Motion and Feedback

Describe motion intent and feedback rules without naming implementation APIs.

## Anti-patterns

List mistakes this pattern must avoid.

## Adapter Mapping Rules

State which details adapters may map and which details must remain in GUI.md.

## Validation Checklist

- [ ] Purpose and primary task are clear.
- [ ] Surface structure is documented.
- [ ] Components include behavior and states.
- [ ] Loading, empty, error, disabled, and success states are considered.
- [ ] Keyboard and focus behavior are defined.
- [ ] Accessibility requirements are actionable.
- [ ] Adapter-specific implementation details are excluded.
