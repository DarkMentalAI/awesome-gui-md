---
schema: gui.md/v1
name: Data Dashboard
version: 0.1.0
status: draft
audience:
  - ai-agents
  - designers
  - frontend-engineers
target_surfaces:
  - web
adapters:
  - HTML.md
accessibility:
  baseline: WCAG 2.2 AA
---

# Data Dashboard GUI.md

## Purpose and Scope

The data dashboard helps users monitor key metrics, filter records, inspect tabular data, and take batch actions. It prioritizes scanability, state clarity, and safe operations.

Out of scope: chart rendering libraries, backend query design, and export file formats.

## Product Surface Model

- Header with title and primary action
- Metric summary region
- Filter bar
- Data table
- Bulk action bar
- Empty state
- Loading state
- Error state
- Detail drawer or drill-down link

## Information Architecture

Summary metrics appear before detailed records. Filters sit directly above the data they affect. Bulk actions appear only after selection. Error and empty states occupy the table region while preserving surrounding context.

## Layout System

Desktop layout uses a full-width table with sticky header behavior when useful. Narrow screens collapse table columns into priority fields or stacked record cards. Filter controls wrap before they shrink below readable size.

## Component Contracts

### Metric Card

- **Purpose:** Summarizes one key measurement.
- **Anatomy:** label, value, optional delta, optional period.
- **States:** loading, ready, unavailable, warning.
- **Behavior:** Opens related filtered view only when explicitly interactive.
- **Do:** Clarify time period.
- **Don't:** Show deltas without direction or baseline.

### Filter Bar

- **Purpose:** Narrows the dataset.
- **Anatomy:** search, select filters, date range, clear filters action.
- **States:** default, active filters, loading, disabled.
- **Behavior:** Applying filters updates metric and table regions.
- **Do:** Show active filter count.
- **Don't:** Hide clear filters when filters are active.

### Data Table

- **Purpose:** Presents records for comparison and action.
- **Anatomy:** header row, data rows, sortable columns, selection controls, row actions, pagination or continuation control.
- **States:** loading, empty, error, filtered, selected, permission-limited.
- **Behavior:** Sorting and filtering preserve selection only when selected records remain visible and valid.
- **Do:** Keep row actions discoverable.
- **Don't:** Use color alone for status cells.

### Bulk Action Bar

- **Purpose:** Performs actions on selected records.
- **Anatomy:** selected count, actions, clear selection.
- **States:** hidden, visible, partial permission, processing, error.
- **Behavior:** Appears only when one or more records are selected.
- **Do:** Confirm destructive bulk actions.
- **Don't:** Leave stale selection after filters remove records.

## Interaction Rules

- Filters update both metrics and table.
- Clear filters returns dashboard to default query.
- Selection persists only across compatible filter changes.
- Destructive bulk actions require confirmation.
- Loading must preserve enough structure to prevent layout jumps.
- Recoverable errors include retry.

## State Model

- **Initial loading:** Metrics and table show loading states.
- **Ready:** Metrics and table reflect the same query.
- **Filtered:** Active filter count is visible.
- **Empty:** No records exist for the current scope.
- **No results:** Filters produce zero matches and clear filters is offered.
- **Error:** Data cannot load and retry is available.
- **Selected:** Bulk action bar is visible.
- **Processing:** Bulk action is in progress and repeated submission is blocked.

## Accessibility Contract

- Tables expose headers and row relationships.
- Sort state is announced.
- Filters have labels.
- Bulk selection count is announced.
- Error and loading changes are announced when they replace table content.
- Keyboard users can reach filters, table controls, row actions, and pagination.

## Content and Microcopy

- Empty state: "No records yet"
- No-results state: "No records match these filters"
- Error state: "Data could not be loaded"
- Clear filters action: "Clear filters"
- Bulk selected label: "{count} selected"

## Motion and Feedback

Use subtle feedback for filter changes and bulk action completion. Avoid animated metric changes that obscure exact values. Respect reduced motion.

## Anti-patterns

- Do not show metrics and table for different queries.
- Do not hide active filters.
- Do not perform destructive bulk actions without confirmation.
- Do not collapse table columns until priority fields are preserved.
- Do not make loading skeletons look like real data.

## Adapter Mapping Rules

Web adapters may define table markup, live regions, responsive collapse, and form controls. They must not change state names, destructive action rules, or filter/table relationship.

## Validation Checklist

- [ ] Metrics and table share the same query state.
- [ ] Active filters are visible.
- [ ] Clear filters is available when filters are active.
- [ ] Loading, empty, no-results, and error states are present.
- [ ] Bulk actions require explicit selection.
- [ ] Destructive bulk actions require confirmation.
- [ ] Sort and selection are keyboard accessible.
