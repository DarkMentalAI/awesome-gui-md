# Awesome GUI.md

A curated collection of GUI.md files for interface structure, interaction states, and agent-readable UI behavior.

GUI.md documents how graphical user interfaces are organized, how components behave, how states are represented, and how implementations should be evaluated. It sits between visual design guidance and implementation-specific output.

> Collect lessons, not screenshots. Document behavior, not just appearance.

## Why GUI.md

AI agents can generate UI code quickly, but they often miss the interface contract: navigation hierarchy, state coverage, accessibility, destructive-action handling, loading feedback, keyboard behavior, and responsive behavior. `GUI.md` gives agents a durable, readable source of truth for those decisions.

## DESIGN.md vs GUI.md vs HTML.md

| File | Core question | Owns | Does not own |
|---|---|---|---|
| `DESIGN.md` | What should it look and feel like? | Visual identity, color, type, spacing, atmosphere, visual do/don't rules | Workflow, state model, DOM details |
| `GUI.md` | How should the interface work? | Information architecture, surfaces, components, states, interactions, accessibility, validation | Framework APIs, DOM markup, CSS classes |
| `HTML.md` | How does this map to the Web? | Semantic HTML, ARIA, focus, CSS token mapping, DOM/state hooks | Business semantics, product workflow decisions |

## Collection

### Application Shells

- [Command Palette](gui-md/command-palette/) - Keyboard-first command discovery with search, grouped results, empty states, and shortcut hints.

### Data Interfaces

- [Data Dashboard](gui-md/data-dashboard/) - Dense operational dashboard with filters, metrics, table states, and bulk actions.

### Forms and Settings

- [Settings Panel](gui-md/settings-panel/) - Configuration surface with validation, dirty state, permission-limited fields, and destructive actions.

## How To Use

1. Copy a relevant `GUI.md` into your project.
2. Pair it with your existing `DESIGN.md` when visual identity matters.
3. Use `HTML.md` only when building a Web implementation.
4. Ask your AI agent to follow `GUI.md` before generating UI code.

Example prompt:

```text
Use GUI.md as the interface contract and DESIGN.md as the visual style source. Build the UI so every state, interaction, and accessibility requirement in GUI.md is represented.
```

## Entry Format

Each entry contains:

- `GUI.md` - Interface contract.
- `HTML.md` - Web adapter contract.
- `README.md` - Human summary and reuse notes.
- `meta.json` - Index metadata, category, tags, and coverage summary.

## Project Docs

- [Boundaries](docs/boundaries.md) - `DESIGN.md`, `GUI.md`, and `HTML.md` responsibilities.
- [Authoring Guide](docs/authoring-guide.md) - How to write a useful `GUI.md`.
- [Evaluation](docs/evaluation.md) - Checklist-based review rubric.
- [Collection Taxonomy](docs/collection-taxonomy.md) - Categories and tag strategy.
- [Roadmap](docs/roadmap.md) - Planned path from v0.1 to later tooling.

## Quality Bar

A useful entry explains:

- what interface problem it solves
- how the screen is structured
- which states are required
- how interactions change state
- what feedback the user receives
- what accessibility requirements apply
- where the pattern works well
- where the pattern fails

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Contributions must document structure, state, interaction, and reuse guidance. Pure screenshots and unsourced visual inspiration are not accepted.

## License

MIT License - see [LICENSE](LICENSE). Individual product names and interface references remain the property of their owners.
