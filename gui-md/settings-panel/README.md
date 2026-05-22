# Settings Panel

Configuration surface pattern for forms, save state, permission limits, and destructive actions.

## Why It Matters

Settings interfaces carry high trust requirements. Users need to know what changed, whether changes are saved, why controls are disabled, and how destructive actions can be recovered or confirmed.

## Files

- [GUI.md](GUI.md) - Interface contract.
- [HTML.md](HTML.md) - Web adapter contract.
- [meta.json](meta.json) - Index metadata and coverage summary.

## Good Fit

- account settings
- workspace administration
- product configuration
- notification preferences

## Bad Fit

- short one-off forms
- checkout flows where progress matters more than persistent configuration
