# Evaluation

Awesome GUI.md uses checklist evaluation in the first version. Tooling can be added after the format stabilizes.

## Scoring

Use this scale:

- `0` - missing or incorrect
- `1` - partial coverage
- `2` - complete and usable

## Rubric

| Dimension | Score 0 | Score 1 | Score 2 |
|---|---|---|---|
| Purpose | No clear problem | Problem is broad | Problem, audience, and primary task are clear |
| Structure | Surfaces are unclear | Some regions are named | Surfaces, hierarchy, and navigation are explicit |
| Components | Components are listed visually | Some behavior is described | Purpose, anatomy, variants, states, and behavior are covered |
| State Coverage | Default state only | Some edge states | Loading, empty, error, success, disabled, selected, dirty, and permission states are covered as relevant |
| Interaction | Click behavior only | Some keyboard or feedback behavior | Pointer, keyboard, focus, feedback, recovery, and destructive actions are specified |
| Accessibility | Accessibility absent | General accessibility notes | Labels, focus, keyboard, contrast, reduced motion, and error messaging are explicit |
| Adapter Boundary | Implementation leaks into GUI.md | Minor adapter leakage | GUI semantics and adapter details are cleanly separated |
| Reuse Guidance | No reuse notes | Basic reuse note | Includes good-fit, bad-fit, risks, and caveats |

## Pass Criteria

An entry is ready when:

- no dimension scores `0`
- at least five dimensions score `2`
- `Adapter Boundary` scores `2`
- `Accessibility` scores at least `1`

## Review Outcomes

Use the same decision language on every entry review.

- `pass` - The entry meets the pass criteria, validator checks pass, and no blocking boundary or accessibility issue remains.
- `revise` - The entry has no fatal mismatch but does not meet the pass criteria, or a required checklist item is incomplete.
- `reject` - The entry is outside the collection scope, depends on private or unsafe material, duplicates an existing entry without a new interaction lesson, or puts implementation details in `GUI.md` as the main contract.

Taxonomy and adapter changes use the same labels: `pass` when the change is consistent and scoped, `revise` when it needs clearer naming or affected-file updates, and `reject` when it makes categories, tags, or adapter boundaries less useful.

## Review Checklist

- [ ] The interface problem is explicit.
- [ ] The primary user task is clear.
- [ ] The surface structure is described.
- [ ] Components include states and behavior.
- [ ] Loading, empty, error, and disabled states are considered.
- [ ] Destructive actions include confirmation or recovery.
- [ ] Keyboard and focus behavior are covered.
- [ ] Accessibility requirements are actionable.
- [ ] HTML/Web details are kept in `HTML.md`.
- [ ] Reuse guidance includes caveats.
