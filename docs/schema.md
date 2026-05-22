# Schema Reference

This is the v1 contract baseline for humans and lightweight tools before 1.0.
It does not replace `docs/authoring-guide.md`.

## GUI.md v1
Required frontmatter fields:

- `schema`: GUI schema version, currently `gui.md/v1`.
- `name`: human-readable pattern name.
- `version`: file version for this contract document.
- `status`: file-level status for this `GUI.md`.
- `audience`: intended readers or consumers.
- `target_surfaces`: GUI-level target labels, currently `web`; do not use this for component surfaces such as page, panel, dialog, or table.
- `source_refs`: source captures, references, or an empty list.
- `adapters`: adapter documents derived from this contract.
- `accessibility.baseline`: accessibility baseline, currently WCAG 2.2 AA.

Required sections:

- `Purpose and Scope`
- `Product Surface Model`
- `Information Architecture`
- `Layout System`
- `Component Contracts`
- `Interaction Rules`
- `State Model`
- `Accessibility Contract`
- `Content and Microcopy`
- `Motion and Feedback`
- `Anti-patterns`
- `Adapter Mapping Rules`
- `Validation Checklist`

`GUI.md` is the canonical interface contract. It defines interface meaning,
behavior, state, workflow, and accessibility without Web or framework code.

## HTML.md v1
Required frontmatter fields:

- `schema`: HTML adapter schema version, currently `html.md/v1`.
- `name`: human-readable adapter name.
- `version`: file version for this adapter document.
- `status`: file-level status for this `HTML.md`.
- `depends_on.gui`: path to the source `GUI.md` contract.
- `target`: adapter target for this `HTML.md`, currently `web`.

Required sections:

- `Adapter Scope`
- `Semantic HTML Mapping`
- `ARIA and Labels`
- `Focus and Keyboard`
- `CSS Token Mapping`
- `Responsive Rules`
- `DOM and State Hooks`
- `Validation Checklist`

`HTML.md` is the Web adapter. It maps `GUI.md` semantics to semantic HTML,
ARIA, focus behavior, responsive rules, CSS tokens, and DOM/state hooks. It
must not introduce new product semantics.

## meta.json

Required fields:

- `title`: display title.
- `slug`: stable lowercase entry identifier.
- `category`: one primary taxonomy category.
- `tags`: controlled discovery tags.
- `platform`: entry-level supported platforms.
- `files`: files included in the entry.
- `status_coverage`: interface states covered by the entry.
- `accessibility_notes`: accessibility notes for the entry.
- `entry_status`: entry-level metadata status.
- `last_reviewed`: last review date in ISO format.

`status` is file-level frontmatter for `GUI.md` or `HTML.md`. `entry_status`
is entry-level metadata in `meta.json`.

## Validation Scope

v1 validation is intentionally lightweight. It checks:

- required fields and required sections are present;
- adapter frontmatter constraints and metadata required fields are checked;
- `meta.json.category` uses a primary taxonomy category;
- `meta.json.entry_status` is recognized.

v1 validation does not validate every controlled vocabulary or judge prose
quality, visual design, implementation code, screenshots, or generated UI
output.
