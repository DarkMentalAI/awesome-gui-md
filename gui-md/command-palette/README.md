# Command Palette

Keyboard-first command discovery and execution pattern.

## Why It Matters

A command palette gives power users a fast path to actions without requiring them to memorize navigation structure. It must handle search, grouping, loading, empty results, keyboard selection, and escape behavior cleanly.

## Files

- [GUI.md](GUI.md) - Interface contract.
- [HTML.md](HTML.md) - Web adapter contract.
- [meta.json](meta.json) - Index metadata and coverage summary.

## Good Fit

- productivity apps
- developer tools
- creation tools
- admin surfaces with many actions

## Bad Fit

- consumer flows where visible guided navigation is more important than speed
- forms where command execution can cause accidental destructive changes
