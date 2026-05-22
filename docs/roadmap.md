# Roadmap

This roadmap describes the early public shape of Awesome GUI.md. It favors a small, reviewable collection before automation or broad coverage.

## v0.1

Establish the repository as a usable reference for AI-agent-readable interface contracts.

- Publish the core repository structure: `README.md`, contribution guidance, authoring guide, boundaries, evaluation rubric, roadmap, and taxonomy.
- Maintain a small seed collection across the first categories: Application Shells, Data Interfaces, and Forms and Settings.
- Keep every entry aligned with the `GUI.md` / `HTML.md` boundary: interface semantics in `GUI.md`, Web adapter details in `HTML.md`.
- Require each entry to include purpose, surface model, component contracts, state coverage, interaction rules, accessibility expectations, reuse guidance, and validation notes.
- Review entries manually with the scoring rubric in `docs/evaluation.md`.

## v0.2

Broaden the collection while keeping quality requirements explicit.

- Add representative entries for Feedback and States, Creation Tools, Communication Interfaces, and System and Admin UI.
- Introduce consistent frontmatter tags for category, surface type, complexity, platform, density, interaction model, and accessibility scope.
- Add collection index tables that show category, status, target surfaces, and good-fit / bad-fit reuse notes.
- Strengthen contribution review by requiring examples to document edge states, destructive actions, keyboard behavior, and recovery paths.
- Identify duplicated guidance across entries and move only stable, cross-entry rules into shared docs.

## v0.3

Make the collection easier to validate, compare, and extend.

- Add entries for Mobile and Responsive and Accessibility and Inclusive UI.
- Define lightweight schema checks for required `GUI.md` sections, frontmatter fields, and adapter declarations.
- Create review templates for new entries, taxonomy changes, and adapter additions.
- Add example prompts that show how to use `GUI.md`, `DESIGN.md`, and `HTML.md` together without blurring their responsibilities.
- Begin tracking entry maturity: draft, reviewed, stable, deprecated.

## V1 readiness

V1 means the project is ready for a public 1.0 release posture. It is not only the `gui.md/v1` schema string.

- Canonical file responsibilities are documented for `GUI.md`, `DESIGN.md`, adapters, entries, and shared docs.
- Seed entries meet the `docs/evaluation.md` pass criteria, with boundary issues resolved and accessibility follow-ups documented.
- Coverage includes entries beyond the first three categories, or a minimum category count is published before the 1.0 release decision.
- Validator and CI checks pass for the release branch.
- The evaluation rubric produces consistent pass, revise, or reject decisions during review.
- Contribution and review workflow is documented, including entry review, taxonomy changes, and adapter changes.
- Before the 1.0 tag, links, generated artifacts, examples, and metadata are audited.

## later

Expand only after the document format and review process have proven useful.

- Add adapters beyond Web when there is enough demand, such as native mobile, desktop, terminal UI, or design-tool handoff.
- Build automated linting for boundary violations, missing states, weak accessibility coverage, and incomplete frontmatter.
- Publish a generated browsable catalog from the Markdown sources.
- Support versioned schemas when `gui.md/v1` needs a compatible successor.
- Curate real-world case studies that explain why an entry exists, where it works, and where it should not be reused.

## Prioritization

Near-term work should prioritize entries that teach reusable interface behavior, not visual novelty. A new entry is more valuable when it covers state transitions, failure modes, permissions, accessibility, and adapter boundaries clearly enough for an AI agent to implement without guessing.

Low-priority work includes screenshot galleries, brand-specific visual systems, framework-specific component wrappers, and examples that only restate common UI names without behavior.
