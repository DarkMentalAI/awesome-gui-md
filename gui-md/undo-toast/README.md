# Undo Toast

Transient feedback pattern for reversible actions, timeout windows, and recovery status.

## Why It Matters

Undo feedback prevents recoverable actions from feeling final. Users need to know what happened, how long recovery remains available, whether undo is in progress, and what outcome replaced the original action.

## Files

- [GUI.md](GUI.md) - Interface contract.
- [HTML.md](HTML.md) - Web adapter contract.
- [meta.json](meta.json) - Index metadata and coverage summary.

## Good Fit

- reversible user actions
- background saves or sync updates
- bulk actions with clear recovery
- destructive-but-recoverable changes

## Bad Fit

- legal confirmation flows
- irreversible deletion
- payment or security actions
- full notification centers
