# Collection Taxonomy

This taxonomy keeps the collection discoverable without turning it into a visual inspiration gallery. Categories describe interface problems and reusable behavior, while tags describe the conditions under which an entry should be reused.

## Application Shells

Application Shells define the persistent frame around product work: navigation, command access, global search, account controls, breadcrumbs, workspace switching, and cross-page feedback.

Use this category for patterns where the primary question is how users orient themselves, move between surfaces, and invoke global actions.

Example tags: `navigation`, `command-palette`, `sidebar`, `topbar`, `workspace-switching`, `global-search`.

## Data Interfaces

Data Interfaces help users inspect, compare, filter, manipulate, and act on structured information.

Use this category for dashboards, tables, lists, reports, drilldowns, bulk actions, saved views, charts, and operational monitoring surfaces.

Example tags: `dashboard`, `table`, `filters`, `bulk-actions`, `metrics`, `saved-views`, `drilldown`.

## Forms and Settings

Forms and Settings capture user input, validate changes, manage preferences, and expose configuration.

Use this category for settings panels, onboarding forms, account configuration, profile editing, permission-limited controls, validation flows, and destructive configuration actions.

Example tags: `form`, `settings`, `validation`, `dirty-state`, `permissions`, `destructive-action`, `save-discard`.

## Feedback and States

Feedback and States document how interfaces communicate progress, success, failure, emptiness, disabled availability, and recovery.

Use this category for loading models, empty states, error handling, notifications, toasts, inline feedback, undo flows, and permission or quota feedback.

Example tags: `loading`, `empty-state`, `error-state`, `success`, `toast`, `undo`, `recovery`, `quota`.

## Creation Tools

Creation Tools support authoring, editing, composing, arranging, previewing, and publishing user-generated content.

Use this category for editors, builders, canvases, upload flows, media tools, formatting toolbars, preview modes, and publish workflows.

Example tags: `editor`, `builder`, `canvas`, `upload`, `preview`, `publishing`, `toolbar`, `versioning`.

## Communication Interfaces

Communication Interfaces manage messages, conversations, collaboration, presence, and asynchronous review.

Use this category for chat, comments, inboxes, notifications, mentions, collaborative review, threads, and message composition.

Example tags: `chat`, `comments`, `inbox`, `mentions`, `presence`, `threads`, `composer`, `collaboration`.

## System and Admin UI

System and Admin UI gives operators control over infrastructure, accounts, policies, permissions, logs, and high-risk actions.

Use this category for admin consoles, audit logs, role management, billing operations, API keys, environment settings, moderation queues, and system health views.

Example tags: `admin`, `audit-log`, `roles`, `billing`, `api-keys`, `moderation`, `system-health`, `high-risk`.

## Mobile and Responsive

Mobile and Responsive entries define how interface behavior adapts across small screens, touch input, constrained space, and changing device capabilities.

Use this category when the core pattern depends on responsive navigation, touch-first controls, mobile layout, offline or poor-network behavior, or cross-device continuity.

Example tags: `mobile`, `responsive`, `touch`, `compact-layout`, `offline`, `gesture`, `bottom-nav`, `adaptive`.

## Accessibility and Inclusive UI

Accessibility and Inclusive UI entries document patterns where inclusive behavior is the central interface contract, not a final checklist.

Use this category for keyboard-first flows, screen-reader behavior, reduced motion, contrast-sensitive states, cognitive load reduction, localization pressure points, and assistive error recovery.

Example tags: `accessibility`, `keyboard`, `screen-reader`, `focus`, `reduced-motion`, `contrast`, `localization`, `inclusive`.

## Tag Strategy

Tags should make entries easier to find, compare, and reuse. They must describe observable interface behavior or reuse constraints, not vague quality claims.

Use a small controlled vocabulary:

- `category` - exactly one primary taxonomy category.
- `secondary` - optional secondary categories when an entry clearly spans more than one interface problem.
- `surface` - page, panel, dialog, popover, table, form, editor, canvas, notification, or shell.
- `platform` - web, mobile-web, native-mobile, desktop, terminal, or cross-platform.
- `density` - compact, standard, dense, or immersive.
- `interaction` - pointer, keyboard, touch, voice, drag-drop, command, realtime, or async.
- `state-scope` - loading, empty, error, success, disabled, selected, dirty, permission-limited, destructive, or recovery.
- `accessibility` - wcag-aa, keyboard-first, screen-reader, reduced-motion, high-contrast, localization, or cognitive-support.

Entry metadata also includes `entry_status` for draft, reviewed, stable, or deprecated; it is not a discovery tag.

Tag rules:

- Prefer specific tags over broad tags. Use `bulk-actions` instead of only `data`.
- Use canonical tags that are lowercase, hyphenated, and singular where applicable.
- Do not tag visual style unless it changes interface behavior or reuse constraints.
- Avoid synonyms and near-duplicates. Use `form`, not `forms`; `destructive-action`, not `destructive-actions`; `dialog`, not `modal`.
- Add a new tag only when at least two entries are likely to use it.
- Use secondary categories sparingly; most entries should have one primary category and behavior tags.
- Retire tags that become ambiguous, duplicated, or too broad to help discovery.
