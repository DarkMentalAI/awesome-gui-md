---
schema: html.md/v1
name: Data Dashboard Web Adapter
version: 0.1.0
status: draft
depends_on:
  gui: ./GUI.md
target: web
---

# Data Dashboard HTML.md

## Adapter Scope

This file maps the data dashboard GUI contract to Web semantics.

## Semantic HTML Mapping

| GUI concept | HTML mapping | Notes |
|---|---|---|
| Header | `<header>` | Contains title and primary action |
| Metrics | `<section aria-labelledby>` | Each metric may be an article or list item |
| Filters | `<form role="search">` or labelled form | Use labelled controls |
| Data table | `<table>` | Use `<th scope="col">` and row headers when useful |
| Bulk action bar | `<div role="region">` with label | Announce selected count |
| Error state | labelled region with retry `<button>` | Use live region for replacement |

## ARIA and Labels

- Filter controls have visible labels or equivalent accessible names.
- Sortable headers expose sort state.
- Selection count updates in a polite live region.
- Error replacement uses a labelled region.

## Focus and Keyboard

- Tab order follows header, filters, table controls, rows, pagination.
- Row actions are reachable without pointer hover.
- Bulk action bar is reachable after selection.
- After pagination or continuation loads, place focus on the table region or first newly loaded row.
- Retry returns focus to the table region when data loads.

## CSS Token Mapping

- `surface.base` maps to page background.
- `surface.panel` maps to metric and table containers.
- `text.primary` maps to titles and cell values.
- `text.muted` maps to labels and secondary metadata.
- `state.warning` maps to warning metrics.
- `state.error` maps to error messages.

## Responsive Rules

- Preserve highest-priority columns on narrow screens.
- Determine priority from declared column importance first, then task-critical identity, status, and action fields.
- Do not infer priority from visual width alone.
- Convert low-priority columns to expandable row details.
- Keep filters above records.
- Keep bulk actions close to selected records.

## DOM and State Hooks

- `data-gui="data-dashboard"`
- `data-state="initial-loading|ready|filtered|empty|no-results|error|selected|permission-limited|mixed-permissions|processing"`
- `data-filter-active="true|false"`
- `data-selected-count`
- `data-result-count`
- `data-sort-key`
- `data-sort-direction`

## Validation Checklist

- [ ] Table headers are semantic.
- [ ] Sort state is exposed.
- [ ] Filter controls are labelled.
- [ ] Selection count is announced.
- [ ] Error state includes retry.
- [ ] Row actions are keyboard reachable.
