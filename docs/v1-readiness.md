# V1 Readiness

## Purpose

This file records evidence for a future public `1.0` release decision. It does
not redefine the roadmap, evaluation rubric, or contribution workflow.

Criteria live in `docs/roadmap.md`; review rules live in `docs/evaluation.md`
and `CONTRIBUTING.md`.

## Decision Snapshot

| Field | Current value |
| --- | --- |
| Current decision | V1 content and release hygiene gates are recorded; ready for a public `1.0` tag after release-branch validation |
| Target release | Public `1.0` after seed Entry Review and final audit |
| Last checked | 2026-05-24 |
| Local validator | `node scripts/validate.mjs` passes with 4 entries checked |
| CI configuration | `Validate` workflow runs `node scripts/validate.mjs` on PRs and `main` pushes |
| Blockers | Confirm `validate` passes on the release branch immediately before tagging |

## Evidence Ledger

| Area | Current evidence | Readiness state | Next small PR |
| --- | --- | --- | --- |
| File responsibilities | `README.md`, `docs/boundaries.md`, and `docs/schema.md` define `DESIGN.md`, `GUI.md`, `HTML.md`, and `meta.json` roles | evidenced | None unless wording drift appears |
| Entry inventory | `docs/index.md` lists Command Palette, Data Dashboard, Settings Panel, and Undo Toast | evidenced | None |
| Category coverage | Current entries cover Application Shells, Data Interfaces, Forms and Settings, and Feedback and States | evidenced | Recheck if the V1 category minimum changes |
| Entry maturity | `command-palette`, `data-dashboard`, `settings-panel`, and `undo-toast` are `reviewed` | evidenced | None |
| Review rules | `docs/evaluation.md` defines `pass`, `revise`, `reject`; `CONTRIBUTING.md` defines Entry, Taxonomy, and Adapter Review | evidenced | Add review records as entries are reviewed |
| Validator and index metadata | `scripts/validate.mjs` checks structure, metadata, index consistency, and orphan index rows; CI is configured to run the validator | evidenced | Confirm release-branch CI before tagging |
| Release hygiene | Final audit found no tracked secrets, private content, generated artifacts, or uploaded local drafts; ignored `docs/superpowers/` drafts remain local only | evidenced | None |
| Main branch protection | GitHub ruleset `Protect main` is active for the default branch, requires PRs, blocks force pushes/deletion, and requires `validate` status checks | evidenced | None |

## Open Items

- Confirm `validate` passes on the release branch immediately before tagging.

## Naming Notes

- Use `V1` for the readiness milestone and release posture.
- Use `1.0` only for the eventual public release or tag.
- Use lowercase `v1` only inside schema strings such as `gui.md/v1` and
  `html.md/v1`, and in file paths or URLs.
- `status` is file-level frontmatter in `GUI.md` and `HTML.md`.
- `entry_status` is entry-level metadata in `meta.json` and the collection index.
- `pass`, `revise`, and `reject` are review outcomes, not `entry_status` values.
