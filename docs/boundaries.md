# Boundaries

This document defines the boundary between `DESIGN.md`, `GUI.md`, and `HTML.md`.

## Core Relationship

```text
DESIGN.md  ->  GUI.md  ->  HTML.md
visual         interface     Web adapter
identity       semantics      mapping
```

## DESIGN.md

`DESIGN.md` is the visual identity source. It defines atmosphere, color, typography, spacing, shape, imagery, visual components, and visual guardrails.

`DESIGN.md` should not define application flow, state machines, accessibility behavior, DOM structure, or framework APIs.

## GUI.md

`GUI.md` is the interface contract. It defines information architecture, product surfaces, component contracts, state model, interaction rules, accessibility requirements, content rules, motion intent, anti-patterns, and validation.

`GUI.md` should stay platform-aware but implementation-neutral. It may say a destructive action requires confirmation and recovery. It should not say the confirmation uses a specific React component or a specific DOM class.

## HTML.md

`HTML.md` is the Web adapter contract. It maps GUI semantics to semantic HTML, ARIA, focus behavior, keyboard behavior, responsive rules, CSS token mapping, and DOM/state hooks.

`HTML.md` must not invent new product semantics. If a behavior changes what the interface means, move it back into `GUI.md`.

## Boundary Tests

Ask these questions when placing content:

| Question | File |
|---|---|
| Is this about visual identity? | `DESIGN.md` |
| Is this about interface meaning, behavior, state, or workflow? | `GUI.md` |
| Is this about Web markup, ARIA, focus, or CSS mapping? | `HTML.md` |
| Is this about a framework API? | Adapter-specific documentation outside `GUI.md` |

## Red Lines

- Do not put DOM snippets in `GUI.md`.
- Do not put product workflow decisions in `HTML.md`.
- Do not put visual token extraction rules in `GUI.md`.
- Do not use `HTML.md` as a second, more detailed `GUI.md`.
- Do not allow examples to become screenshot galleries.
