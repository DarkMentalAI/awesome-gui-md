# GUI.md Authoring Guide

Use this guide to write a `GUI.md` file that an AI agent can follow without guessing.

## Frontmatter

Start every `GUI.md` with YAML frontmatter:

```yaml
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
```

## Required Sections

### Purpose and Scope

Describe the interface problem, target user, primary task, and what is outside the pattern.

### Product Surface Model

List the major surfaces: page, panel, dialog, popover, table, form, toolbar, sidebar, or empty state.

### Information Architecture

Describe how information is grouped, prioritized, and navigated.

### Layout System

Define density, responsive behavior, navigation placement, and content hierarchy.

### Component Contracts

For each component, define:

- purpose
- anatomy
- variants
- states
- behavior
- do/don't rules

### Interaction Rules

Cover pointer, keyboard, focus, touch, confirmation, undo, loading, and recovery behavior.

### State Model

Document default, loading, empty, error, success, disabled, selected, dirty, permission-limited, and destructive states when relevant.

### Accessibility Contract

Define keyboard access, focus order, labels, contrast, reduced motion, error messaging, and screen-reader expectations.

### Content and Microcopy

Define button labels, empty state text, error tone, confirmation copy, date/time format, and localization pressure points.

### Motion and Feedback

Describe why motion exists, what feedback it gives, and which motion patterns are forbidden.

### Anti-patterns

List mistakes the agent must avoid.

### Adapter Mapping Rules

Explain what adapter documents may map and what they must not redefine.

### Validation Checklist

Provide a checklist that can be run after implementation.

## Writing Rules

- Use precise component names.
- Prefer required states over vague polish notes.
- Include failure and edge states.
- Say when not to use the pattern.
- Keep implementation details in adapter files.
- Avoid brand-specific language unless the pattern depends on it.
