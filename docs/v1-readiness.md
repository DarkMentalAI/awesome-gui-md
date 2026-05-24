# V1 Readiness

## Purpose

This file records evidence for a future public `1.0` release decision. It does
not redefine the roadmap, evaluation rubric, or contribution workflow.

Criteria live in `docs/roadmap.md`; review rules live in `docs/evaluation.md`
and `CONTRIBUTING.md`.

## Decision Snapshot

| Field | Current value |
| --- | --- |
| Current decision | 2 of 4 seed entries reviewed; not ready for a public `1.0` tag |
| Target release | Public `1.0` after seed Entry Review and final audit |
| Last checked | 2026-05-24 |
| Local validator | `node scripts/validate.mjs` passes with 4 entries checked |
| CI configuration | `Validate` workflow runs `node scripts/validate.mjs` on PRs and `main` pushes |
| Blockers | 2 seed entries are still `draft`; final release audit is not recorded |

## Evidence Ledger

| Area | Current evidence | Readiness state | Next small PR |
| --- | --- | --- | --- |
| File responsibilities | `README.md`, `docs/boundaries.md`, and `docs/schema.md` define `DESIGN.md`, `GUI.md`, `HTML.md`, and `meta.json` roles | evidenced | None unless wording drift appears |
| Entry inventory | `docs/index.md` lists Command Palette, Data Dashboard, Settings Panel, and Undo Toast | evidenced | None |
| Category coverage | Current entries cover Application Shells, Data Interfaces, Forms and Settings, and Feedback and States | evidenced | Recheck if the V1 category minimum changes |
| Entry maturity | `command-palette` and `undo-toast` are `reviewed`; `data-dashboard` and `settings-panel` are `draft` | blocker | Run Entry Review for the remaining seed entries |
| Review rules | `docs/evaluation.md` defines `pass`, `revise`, `reject`; `CONTRIBUTING.md` defines Entry, Taxonomy, and Adapter Review | evidenced | Add review records as entries are reviewed |
| Validator and index metadata | `scripts/validate.mjs` checks structure, metadata, and index consistency; CI is configured to run the validator | evidenced | Confirm release-branch CI before tagging |
| Release hygiene | PR template and contributing checks cover sources, licenses, validation, generated files, and sensitive material | pending audit | Run final release audit before tagging |
| Main branch protection | `CONTRIBUTING.md` and the PR template require PR review before merge | pending settings check | Confirm GitHub ruleset enforcement before tagging |

## Open Items

- Complete Entry Review for every seed entry before changing any `entry_status`
  to `reviewed`.
- Run a final link, generated artifact, example, source, metadata, and sensitive
  material audit.
- Confirm GitHub branch ruleset enforcement for PR review before `1.0`.
- Confirm `validate` passes on the release branch immediately before tagging.

## Naming Notes

- Use `V1` for the readiness milestone and release posture.
- Use `1.0` only for the eventual public release or tag.
- Use lowercase `v1` only inside schema strings such as `gui.md/v1` and
  `html.md/v1`, and in file paths or URLs.
- `status` is file-level frontmatter in `GUI.md` and `HTML.md`.
- `entry_status` is entry-level metadata in `meta.json` and the collection index.
- `pass`, `revise`, and `reject` are review outcomes, not `entry_status` values.
