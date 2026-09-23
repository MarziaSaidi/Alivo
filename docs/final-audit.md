# Alivo Mission Control — Cross-Screen Product & Engineering Audit

**Status:** Audit only. No application code was changed.
**Date:** 20 Sep 2026
**Scope:** All ten implemented routes, the shared shell, state hooks and fixtures.
**Build at time of audit:** Next 16.3.5 · React 19.2.8 · Tailwind 4.3.3

Checks marked **Confirmed** were reproduced in a running browser against the
dev server. Checks marked **Unverified** could not be exercised with the tools
available and are recorded as open questions, not as passes.

---

## 0. Method

- Every route loaded at **1440 / 1280 / 1024** and again at **390** narrow.
- Contrast computed per leaf text node (WCAG relative luminance against the
  resolved background), not sampled.
- Every visible control clicked and checked for DOM change, navigation and
  `sessionStorage` change.
- `sessionStorage` inspected directly; persistence tested across in-app
  navigation **and** hard refresh.
- Import graph resolved programmatically to find orphans.
- `tsc --noEmit`, `eslint src`, `next build` run clean at the end.

---

## 1. Does the product still express the intended loop?

> AI works → an exception appears → a human understands and resolves it →
> repeated problems inform an improvement.

**Yes, end to end, and it is navigable without dead ends.** Confirmed path:

| Stage | Surface | Evidence |
|---|---|---|
| AI works | `/activity/sarah-mitchell` | Seven beats, expandable, `aria-expanded` toggles correctly |
| An exception appears | `/mission-control` → lead exception + `Also waiting 3` | `Open` links to the decision |
| A human understands | `/exceptions/sarah-mitchell` | FACT → POLICY → AI SUGGESTION → HUMAN DECISION, evidence panel, four decision options |
| …and resolves it | Decision draft persists; Marcus's failure resolves and persists | `alivo:decision:sarah-mitchell`, `alivo:trace:marcus-webb` |
| Repeated problems inform an improvement | `/coach` → review → `/coach/history` | Approve / edit / dismiss / turn off / re-approve all round-trip |

The loop's **weakest link is the last mile of each stage**: the commit control
on Exception Detail is inert (disclosed), and the loop back from Coach history
to a review does not exist. Neither breaks the narrative.

---

## P0 — prevents the core flow or causes a serious trust issue

### P0-1 · Activity Trace asserts a real external-system write, with no prototype qualifier

- **Route/component:** `/activity/marcus-webb` — `src/components/ActivityTrace.tsx`
- **Observed:** Clicking **“Assign Tomas — Alivo will update JobNimbus”** resolves
  the failure and renders: *“Alivo updated JobNimbus. Friday 8:30 AM. Tomas Reyes.
  **Successful.**”* and *“JobNimbus now matches what Marcus was told.”*
  A scan of the rendered page finds **no occurrence of “prototype”** anywhere on
  this route.
- **Expected:** The prototype must never imply that a real JobNimbus update
  occurred. Every other state-changing surface already carries a qualifier —
  Exception Detail has *“Prototype — nothing is sent.”*, and all three Coach
  screens carry *“…recorded in your browser session only. No live agent,
  customer or connected system has been changed.”*
- **Reproduction:** `sessionStorage.removeItem('alivo:trace:marcus-webb')` →
  reload `/activity/marcus-webb` → click the first remedy → read the resolved beat.
- **Correction:** Add the established quiet qualifier once, at the foot of the
  trace, in the same 13px `text.tertiary` register used elsewhere. Do not add a
  banner and do not change the beat copy.
- **Frozen spec change required:** **No.** This closes a gap against the standing
  prototype constraint; it contradicts nothing in the frozen documents.
- **Status:** Confirmed.

### P0-2 · The product's most load-bearing number disagrees with itself, and both numbers are hardcoded

- **Route/component:** `/mission-control` (`src/app/mission-control/page.tsx:35`),
  `src/components/TopBar.tsx:20`, `/exceptions`
- **Observed:**
  - Operating statement: *“Everything is running. **3 decisions** are waiting on you.”* — string literal
  - Top bar: *“**3 need you**”* — string literal
  - `ALSO WAITING 3` — derived from `queue.length`
  - Exceptions index: **`Open 4`** and *“4 of 10 shown.”* — derived from `openCount`
  
  Fixture arithmetic: open records = Sarah + queue(3) = **4**. The queue is
  `D. Torres (work)`, `R. Okafor (work)`, `JobNimbus (system)`. The only coherent
  reading of “3” is *Sarah + the two work items*, treating JobNimbus as a system
  exception rather than a decision — **but nothing in the code expresses that
  rule**, and `ALSO WAITING 3` uses a third rule again (`queue.length`, which
  *includes* JobNimbus and *excludes* Sarah).
- **Expected:** One rule, derived once, used by every surface that shows a count.
- **Reproduction:** Compare `/mission-control` with `/exceptions` side by side.
- **Correction:** Define `decisionsWaiting` (human decisions) and `openExceptions`
  (all open records) in `src/lib/data.ts`, derive all three displays from them,
  and state the distinction once in the UI.
- **Frozen spec change required:** **Yes, minor.** ux-spec §13 item 1 already
  records this as an unresolved contradiction and instructs “Decide the rule and
  derive both numbers from it.” Recording the decision closes that item.
- **Status:** Confirmed.

---

## P1 — meaningful UX, state, accessibility, or product inconsistency

### P1-1 · Inspection panel does not return focus on close

- **Route/component:** `/exceptions/sarah-mitchell` — `src/components/ConversationPanel.tsx`
- **Observed:** Focus moves **into** the panel on open (correct). On close —
  by **both** the Close button and Escape — `document.activeElement` is
  `<body>`. A keyboard user is dropped to the top of the document.
- **Expected:** component §13: *“Focus moves to the panel header on open and
  **returns to the triggering control on close**.”*
- **Reproduction:** Focus “View conversation” → activate → press Escape →
  inspect `document.activeElement`. Returns `BODY`, not the button.
- **Correction:** Hold the trigger in a ref and `.focus()` it in the close handler.
- **Frozen spec change required:** No — this implements the existing spec.
- **Status:** Confirmed.

### P1-2 · `/activity` index was never taken to high fidelity, and fails WCAG AA

- **Route/component:** `/activity` — `src/app/activity/page.tsx`
- **Observed:** The only route still on the raw Tailwind palette — **11 nodes**
  using `neutral-*`. The supporting sentence is `text-neutral-500` on canvas at
  **3.3:1** (AA requires 4.5:1 at 13px). `h1` is 17px/500 where every other index
  is 18/550. Type scale is 13/17 only — no 14px body. Rows use `border-neutral-100`
  and `hover:bg-neutral-50` instead of `border.quiet` / `surface.hover`.
- **Expected:** Same token layer, type scale and row grammar as the other indexes.
- **Reproduction:** Load `/activity`; compute contrast on the supporting sentence.
- **Correction:** A visual pass equivalent to the one the Exceptions index
  received. It is the last low-fidelity surface in the product.
- **Frozen spec change required:** No.
- **Status:** Confirmed. **This is the only WCAG AA contrast failure in the product.**

### P1-3 · Back links are 15.5px tall — below the minimum target size — and inconsistent across the product

- **Route/component:** `/exceptions/sarah-mitchell`, `/activity/sarah-mitchell`,
  `/activity/marcus-webb`
- **Observed:** `← Mission Control`, `← Sarah Mitchell · the decision` and
  `← Activity` all measure **15.5px** high. The Coach screens' back links are
  **28px** (`-mx-1 inline-flex h-7 items-center px-1`). Two implementations of
  the same primitive.
- **Expected:** layout §21 `control.height.text` 28; WCAG 2.5.8 minimum 24.
- **Reproduction:** Measure `getBoundingClientRect().height` on the back link of
  each route. Reproduces at 1440 and at 390.
- **Correction:** Apply the Coach back-link classes to all three.
- **Frozen spec change required:** No.
- **Status:** Confirmed.

### P1-4 · The counter amount field stays live under decisions it cannot affect

- **Route/component:** `/exceptions/sarah-mitchell` — `src/components/ExceptionDecision.tsx`
- **Observed:** With **Hold $24,800** selected, the counter amount input is
  neither disabled nor read-only. Typing `19,999` updates the field's own value
  and is persisted to the draft, but the commit label stays *“Keep quote at
  $24,800”* and the message is unchanged. Same under **Match** and **Ask what's
  included first**.
- **Expected:** component §14 separates *selected* from *committed* precisely so
  controls never misrepresent state. A live field that silently affects nothing
  is the same class of error.
- **Reproduction:** Select “Hold $24,800” → type in the amount field → observe
  commit label and message do not change; inspect
  `alivo:decision:sarah-mitchell` and see `amountInput: "19,999"` stored.
- **Correction:** Show the amount field only under **Counter**, or render it
  read-only with the disabled treatment from component §4 under the other three.
- **Frozen spec change required:** No — the frozen documents do not specify this
  case, so either resolution is a new decision rather than an override.
- **Status:** Confirmed.

### P1-5 · Six visible controls do nothing, and one of them is a primary action

Complete inventory, each clicked and checked for DOM / navigation / storage change:

| Control | Route | Effect |
|---|---|---|
| `Reassign` | `/mission-control` | none |
| Commit (`Send counter at $…` / `Match competitor at $…` / `Keep quote at $…` / `Ask Sarah what's included`) | `/exceptions/sarah-mitchell` | none |
| `Handle Sarah myself` | `/exceptions/sarah-mitchell` | none |
| `Assign to someone else` | `/exceptions/sarah-mitchell` | none |
| `Open Ray's schedule in JobNimbus` | `/activity/marcus-webb` | none |
| `Move Marcus back to Thursday` | `/activity/marcus-webb` | none |
| `I'll handle the schedule myself` | `/activity/marcus-webb` | none |

- **Observed:** Exception Detail **does** disclose this — *“Prototype — nothing
  is sent.”* sits under the decision. Mission Control and the Activity Trace do
  **not** disclose it at all (see P0-1).
- **Expected:** ux-spec §13 item 8: *“the surfaces label themselves as a
  prototype, but these are the primary actions of the product and high fidelity
  should decide what they do.”*
- **Correction:** Decide per control — either a committed-state statement
  (component §14: *“the action area is replaced by a statement”*) or a visible
  non-interactive treatment. Do not invent behaviour.
- **Frozen spec change required:** **Yes** — ux-spec §13 item 8 explicitly defers
  this decision to high fidelity; making it closes the item.
- **Status:** Confirmed.

### P1-6 · Mission Control has no empty state and no degraded state

- **Route/component:** `/mission-control`
- **Observed:** A source scan finds **no** branch on `queue.length === 0`, no
  empty-state copy and no degraded-state copy. One state renders, always.
- **Expected:** ux-spec §4 specifies both; §13 item 2 records them as designed
  but not built.
- **Correction:** Build both. They are the states a supervision product is
  judged on — “nothing needs you” is the goal state of the entire product and it
  currently cannot be shown.
- **Frozen spec change required:** No — the spec already defines them.
- **Status:** Confirmed.

### P1-7 · Coach history is one mutable record, not a sequence of events

- **Route/component:** `/coach/history` — `src/lib/useCoachState.ts`
- **Observed:** `CoachState` is `Record<slug, ImprovementRecord>` with a single
  mutable `status`. An approve → turn off → re-approve cycle leaves **one** row
  whose `approvedBy` / `approvedAt` were overwritten in place. There is no
  `turnedOffAt`, so neither screen can say *when* guidance was switched off.
  Verified: after re-approval, history shows a single entry reading
  “Approved by Mike · Sep 19, 2026 · your edited wording · Active for Follow-up”
  with no trace of the intervening turn-off.
- **Expected:** ux-spec §8: history *“shows title, approver, date… including
  reversals”*, which implies an event list.
- **Mitigation already in place:** the screen makes no completeness claim, and
  the audit brief explicitly forbade inventing timestamps. Nothing on the screen
  is false — it is incomplete, not wrong.
- **Correction:** Change `CoachState` to an append-only event array and render
  the list. This is a data-model change, deliberately out of scope for the
  visual passes.
- **Frozen spec change required:** No — it implements ux-spec §8 more fully.
- **Status:** Confirmed (documented limitation, as instructed).

### P1-8 · The Coach measure contradicts the UX spec on four screens

- **Route/component:** all four Coach routes
- **Observed:** `CoachOverview`, `ImprovementReview`, `PatternNotice` and
  `CoachHistory` are all `max-w-[720px]`.
  - layout §8 — *“Coach overview — 720, centred”*, *“Improvement review — 720,
    centred”*, boundary *“336 + 48 + 336”* (which sums to exactly 720 and
    **cannot** be built at 680)
  - layout §21 — `layout.coach.max 720`
  - layout §22 — Agent Coach | 720
  - **ux-spec §2 line 139 — “Coach overview 720; Coach detail 680.”**
- **Expected:** One number. layout-system.md declares itself *subordinate to*
  ux-spec.md, so on a strict reading 680 wins — but then layout §8's boundary
  geometry is unbuildable as written.
- **Correction:** Amend **one** document. Recommended: change ux-spec §2 to
  “Coach 720 throughout”, because the boundary arithmetic is load-bearing and
  because a 680 detail beside a 720 overview puts a 40px jog between two screens
  in the same section.
- **Frozen spec change required:** **Yes, unavoidable** — the two frozen
  documents disagree and no implementation can satisfy both.
- **Status:** Confirmed. Raised during implementation and deferred three times;
  still unresolved.

---

## P2 — polish, maintainability, non-blocking

| # | Route / component | Observed | Correction | Frozen change? |
|---|---|---|---|---|
| P2-1 | `src/components/Placeholder.tsx` | Imported by nothing (import graph resolved programmatically). All routes are built. | Delete. ux-spec §13 item 10 already records it. | No |
| P2-2 | `ImprovementReview`, `PatternNotice`, `CoachHistory` | Identical local `Heading` (15/550) defined **three times**. | Extract `ui/SectionHeading` — component §67 already lists it as *required*. | No |
| P2-3 | `src/lib/data.ts`, `src/lib/coach.ts`, `src/lib/activity.ts` | Declared and never rendered: `leadException.policy`, `PastExample.stillAsks`, `Improvement.risk`, `Weight "ambient"`, `FailureKind "unreachable"`. | Remove, or add the one render branch that justifies each. ux-spec §13 items 4 and 6. | No |
| P2-4 | `src/app/layout.tsx:20` | `description: "…— low fidelity prototype."` — stale after the high-fidelity pass; it is the page's public description. | Update. | No |
| P2-5 | `src/lib/data.ts` | The same pricing policy has two wordings: `policy[1]` “Competitor matches always come to you, whatever the amount.” vs `rules[1]` “Competitor matches require your approval.” `policy` is orphaned. | Collapse to one source. ux-spec §13 item 4. | No |
| P2-6 | `/mission-control:183` | *“Full report”* renders as a `<p>`, not a link. It names an affordance that does not exist. | Make it a link or remove the label. | No |
| P2-7 | `/activity/sarah-mitchell`, `/activity/marcus-webb` | Heading order is `H2:Activity` **before** `H1:<name>` in the DOM. | Reorder or demote the eyebrow to a non-heading element (as the Coach overview does). | No |
| P2-8 | `ActivityTrace` beat toggles | `aria-expanded` is set correctly; `aria-controls` is absent. | Add `aria-controls` pointing at the revealed region. | No |
| P2-9 | `src/components/LeftNav.tsx:41` | `pathname.startsWith()` means `/exceptions/sarah-mitchell` highlights **Exceptions** while the in-page back link says “← Mission Control”. Nav and page disagree about where the user is. | Decide the rule. ux-spec §13 item 7. | No |
| P2-10 | `src/components/AppShell.tsx` | Code is `max-w-[1176px]`; ux-spec §2 documents the inner container as `max-w-[1216px]`. ux-spec §13 item 9 asserts “the code is correct” — but it names 1216, not 1176, so the note is now stale too. | Reconcile the number in ux-spec §2 and §13.9. | **Yes, minor** |
| P2-11 | `/exceptions/sarah-mitchell` | Renders sub-label `Doesn't know`. ux-spec §13 item 5 calls the canonical phrase `What Alivo doesn't know`; typography §6 explicitly *overrides* this to a sentence-case 13px sub-label. The implementation follows typography §6. | Close ux-spec §13 item 5 as resolved-by-typography. | **Yes, bookkeeping** |
| P2-12 | `/exceptions/sarah-mitchell` | Countering at $22,000 shows “11.3% below your quote” with no signal that it exceeds the operator's own stated 5% rule. | Product decision: either flag it or state that a human may exceed their own agent's limit. | No |

---

## 2. What passed

These were tested and found correct — recorded so a future pass does not re-litigate them.

**Accessibility (nine of ten routes)**
- **Zero contrast failures** on every route except `/activity` (P1-2), at 1440, 1280, 1024 and 390.
- **Zero horizontal overflow** on all ten routes at all four widths.
- **Zero truncated-but-unreachable content**; the Exceptions description truncates by design and carries full text on `title`.
- No unlabelled form control anywhere. Sarah's four radios take their names from wrapping 32px labels (`Counter`, `Match $21,500`, `Hold $24,800`, `Ask what's included first`); Coach's guidance field is `aria-label="Proposed guidance"`; both searches are labelled; the dismiss group has an `sr-only` legend.
- Focus ring is `2px solid #2563FF` at 2px offset, outside the control, on links, inputs, the filled Approve button and the outlined Turn-off button.
- Reduced motion: the `prefers-reduced-motion` block is present in the compiled stylesheet and correctly scoped. Only **2** elements in the product carry a transition, and both are colour-only.
- Type floor is 12px, register labels only; every size used is on the typography §17 scale.

**Interaction**
- Exceptions filters (Open 4 / Resolved 4 / Self-resolved 2 / All 10) with `aria-pressed`; search across subject, description, state and keywords; empty state “Nothing matches that.”; filter + search compose.
- Sarah's counter recalculates live: `$23,200 → $1,600 discount · 6.5%`; `$22,000 → $2,800 · 11.3%`; `$24,800 → $0 · 0.0%`. All four decisions regenerate the message and relabel the commit control.
- Draft persists across in-app navigation **and** hard refresh (option, amount, message, edited flag).
- Evidence panel opens, moves focus in, closes on Escape and on Close. (Return is broken — P1-1.)
- Trace beats expand and collapse, `aria-expanded` flips, markers `+`/`−`, and reset on navigation.
- Marcus's resolution persists across navigation (`alivo:trace:marcus-webb = "resolved"`), closing ux-spec §13 item 3.
- Coach: approve (original and edited), dismiss (with and without reason), turn off, re-approve — all round-trip, and the review and history agree in every state.

**Engineering**
- `tsc --noEmit` clean. `eslint src` clean. `next build` clean — **no warnings**, all 13 routes generated.
- Console: no errors or warnings. Only React DevTools info and HMR logs, both dev-only.
- Dependencies: `next`, `react`, `react-dom` only. No unnecessary runtime dependency.
- Exactly one orphaned file (P2-1); no duplicated component beyond the `Heading` helper (P2-2).
- Token discipline: zero raw-palette nodes on nine of ten routes.

---

## 3. Unverified concerns

Recorded honestly; **not** counted as passes.

1. **Enter / Space activation on native buttons — UNVERIFIED.**
   The browser automation's synthetic key events did not activate any focused
   `<button>` on any screen. A control test on the approved Exceptions filter
   buttons failed identically, which indicates a harness limitation rather than
   a product defect — **but a failing control test cannot establish a pass.**
   Every control is a native `<button>`, which the browser activates on Enter
   and Space without author code, and every handler is proven by pointer
   activation. **Needs one manual keyboard pass before release.**

2. **Reduced motion at runtime — PARTIALLY VERIFIED.** The CSS rule was read
   from the compiled stylesheet and is correct; `prefers-reduced-motion` was not
   emulated in a live session.

3. **Multi-record Coach history — UNTESTED IN REAL FLOW.** `PatternNotice`
   correctly has no approve or dismiss control, so `competitor-pricing` can
   never leave `proposed` through the UI. History can only ever hold one record
   in practice; the two-record layout has only been exercised with seeded state.

4. **Screen-reader behaviour — NOT TESTED.** Names, roles and order were checked
   programmatically. No AT was driven.

5. **Cross-browser — NOT TESTED.** Chromium only. The container queries on the
   Exceptions index and `font-variant-numeric` are the likeliest divergences.

---

## 4. Release checklist — portfolio-ready prototype

Ordered by what a viewer notices first.

- [ ] **P0-1** Add the prototype qualifier to the Activity Trace. One line. Highest trust-per-effort fix in the product.
- [ ] **P0-2** Derive the counts from one rule; make Mission Control and Exceptions agree or explain themselves.
- [ ] **P1-2** Bring `/activity` to high fidelity — it is the only remaining low-fidelity surface **and** the only AA contrast failure.
- [ ] **P1-1** Return focus to the trigger when the evidence panel closes.
- [ ] **P1-3** Unify the back link at 28px across all routes.
- [ ] **P1-6** Build Mission Control's empty state. “Nothing needs you” is the product's goal state and cannot currently be shown.
- [ ] **P1-5** Decide what the inert primary controls do — even if the decision is an explicit committed-state statement.
- [ ] **P1-4** Make the counter amount field inert under the three decisions it does not affect.
- [ ] **P1-8** Amend one document so the Coach measure stops contradicting itself.
- [ ] Run one **manual keyboard pass** (Tab / Enter / Space / Escape) across all ten routes — this is the one thing automation could not verify.
- [ ] **P2-4** Update the page description; it still says “low fidelity prototype”.
- [ ] **P2-1** Delete `Placeholder.tsx`.
- [ ] Re-run `tsc --noEmit`, `eslint src`, `next build` and confirm still clean.

**Deliberately not on this list:** P1-7 (history event log) and the remaining P2
items. The history limitation is documented, nothing it displays is false, and
rebuilding the state model is a larger piece of work than a portfolio prototype
needs.

---

## Release QA

**Date:** 21 Sep 2026 · **Build tested:** production (`next build` + `next start`), not the dev server.
**Method:** cleared `sessionStorage` and `localStorage`, then walked the 19-step founder story once, start to finish, without seeding state. Presentation reviewed at 1440; responsive smoke-tested at 1024 and 390; all user-visible copy scanned for forward-tense action verbs.

### Release gate

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** |
| `eslint src` | **PASS** |
| `next build` | **PASS** — 13 routes, **no warnings** |
| Production server, all 10 routes | **200** |
| Production server log | clean |
| Console errors (production) | **none** |
| Horizontal overflow — 10 routes × 1440 / 1024 / 390 | **none** |
| Contrast failures — 10 routes × 3 widths | **none** |
| Dev/debug copy in product surfaces | **none** |
| Raw-palette remnants | **none** |

### Primary story — all 19 steps pass

Walked once on a clean session. Every step landed where expected, the nav marked the right section, the back link named its destination, and no step stranded the user.

Highlights confirmed in the production build: the evidence panel opens, moves focus in, closes on Escape and returns focus to its trigger; the decision draft (`counter`, `$23,500`, message) survives a trip to Activity and back; Marcus resolves with Tomas and the simulated-resolution disclosure appears and persists through a hard refresh; Coach round-trips edit → approve → history → turn off → return → re-approve with the review and history agreeing at every point; Mission Control's Coach line correctly quiets to "1 improvement still worth reviewing" plus "Deductible guidance approved for Follow-up"; counts stay 3 / 3 / 4 throughout.

Copy registers stay distinct end to end: observation (`What Alivo noticed`), AI suggestion (`Alivo suggests`, `What Follow-up could say`), human decision (`Your decision`, `Choose what happens next`), committed state (the action area is replaced by a statement).

### Prototype trust audit

Scanned every rendered `<main>` on all ten production routes for *sends / sent / updates / updated / changes / changed / assigns / assigned / contacts / contacted / messages / books / schedules / JobNimbus / customer*. 45 sentences matched.

| Classification | Count | Examples |
|---|---|---|
| Historical scenario fact | 38 | "Alivo booked an inspection. Added to JobNimbus.", "JobNimbus rejected the appointment change.", "47 conversations handled · 12 appointments booked · 6 quotes sent" |
| Simulated prototype result **with disclosure** | 7 | "Alivo updated JobNimbus … Successful." + *"Prototype simulation — … No JobNimbus record, customer or connected system was changed."*; "Approved for Follow-up" + *"…recorded in your browser session only."*; "Active for Follow-up" + the history qualifier |
| **Potentially misleading live-action claim** | **0** | — |

Every operator-triggered control that could imply a live effect carries a disclosure **before** activation: `Prototype — nothing is reassigned.` (Mission Control), `Prototype — nothing is sent.` (Exception Detail), `Prototype — nothing is sent and no connected system is changed. Only assigning Tomas records a result here.` (Marcus), `Nothing changes until you approve. Prototype — no agent is modified.` (Coach review).

**There is no unexplained live-action claim.**

---

### BLOCKER

**None.**

---

### SHOULD FIX BEFORE PORTFOLIO — all four RESOLVED 21 Sep 2026

Fixed in the micro-fix pass and re-verified against the production build.
Details of each correction follow the original finding.

**S1 · RESOLVED · Exceptions and the Activity trace disagree about Marcus on a clean session**
`/exceptions` (All) → row reads **"Marcus Webb · Appointment mismatch with JobNimbus · Resolved · Today 11:22 AM"**, and that row links to `/activity/marcus-webb`, which on the same untouched session shows **"One thing didn't work… Your scheduling record still shows Thursday at 10:00 AM"** with the failure unresolved and four remedies waiting. `11:22 AM` is the exact timestamp the trace stamps *after* you resolve it.
Reproduce: clear storage → `/exceptions` → All → click Marcus Webb.
A reviewer who takes this path reads it as a bug, and state credibility is the product's core claim. The scripted walkthrough reaches Marcus via Activity and never hits it, which is why this is not a blocker.
Fix: derive the Exceptions row's state from `alivo:trace:marcus-webb`, or set the fixture's state to open/needs-attention until resolved. Either is a small change. Does not require a frozen-spec change.

> **RESOLVED.** `traceStateKey()` is now exported from `lib/activity.ts` and used by
> both `ActivityTrace` and `ExceptionsIndex`, so one key is the single source of
> truth. Marcus's register row has two presentations selected from that state:
> unresolved → `Needs attention · Today 11:03 AM` (the time JobNimbus rejected the
> change), resolved → `Resolved · Today 11:22 AM`. Verified in both directions on a
> clean session and across a hard refresh.
>
> **Consequence for the Open count — needs your acknowledgement.** The canonical rule
> is unchanged ("all open exception records, including the system exception"), but an
> unresolved Marcus *is* an open record, so the population is now correct rather than
> fixed: **`Open 5` on a fresh session, `Open 4` after he is resolved.** `3 need you`
> and `Also waiting 3` are untouched — he is a system exception, not a decision, and
> not part of the queue. Keeping `Open` pinned at 4 would have required either leaving
> him mislabelled as resolved or showing five open rows under a chip reading four.

**S2 · RESOLVED · Every route ships `description: "…low fidelity prototype."`**
`src/app/layout.tsx`. This is the text that appears when the portfolio link is shared or previewed, and it mislabels finished work. One-line fix. (Recorded as P2-4; promoted here because of where it surfaces.)

> **RESOLVED.** Now `Human supervision for AI-powered home service operations.`,
> confirmed in the production HTML on every route. Title unchanged. No in-product
> prototype disclosure was touched.

**S3 · RESOLVED · Back links are 16px tall on three screens**
`/exceptions/sarah-mitchell` (`← Mission Control`), `/activity/sarah-mitchell`, `/activity/marcus-webb`. Below the 24px minimum target size, and visibly inconsistent with the Coach screens' 28px back links. Reproduces at all three widths. This is an accessibility failure, not polish. (P1-3, still open.)

> **RESOLVED.** All three now use the established Coach treatment
> (`-mx-1 inline-flex h-7 items-center px-1`) and measure **28px**. Wording,
> hierarchy and destinations unchanged; two code sites serve all three instances.
> Focus rings verified under real keyboard focus: `2px solid #2563FF` at 2px offset.
> No other link was enlarged.

**S4 · RESOLVED · "Full report" looks like a link and is not one**
Mission Control rail. Rendered as a `<p>`, sitting where a link would sit at the end of the stats block. A reviewer will click it and nothing will happen. Either make it a link or drop the label. (P2-6.)

> **RESOLVED.** ux-spec §5F describes "a link to a full report" but specifies **no
> destination**, and §13.8 records it as having no behaviour — so no behaviour existed
> to implement and none was invented. It now reads as supporting text:
> *"Full report is not part of this prototype."* at metadata scale. Confirmed a `<p>`,
> not focusable, `cursor: auto`.

---

### ACCEPTED PROTOTYPE LIMITATION

- **Seven decision controls are intentionally inert** — `Reassign`; the commit control (all four labels); `Handle Sarah myself`; `Assign to someone else`; and Marcus's three alternate remedies. All are class A: commits whose real-world side effect intentionally cannot occur. All are disclosed before activation. Correct for a concept prototype; simulating them would fabricate business outcomes.
- **Coach history is one mutable record per improvement, not an event log.** An approve → turn off → re-approve cycle leaves one row with no turn-off timestamp. Nothing it displays is false; it is incomplete. Rebuilding it is a data-model change.
- **Only 2 of 10 exception rows navigate**, and Marcus is not linked from Mission Control (reachable via Activity). Deliberate prototype depth.
- **Mission Control renders one state** — no empty or degraded state. Specified but not built.
- **The counter amount field stays editable under all four decisions** and only affects `Counter`.
- **`useCoachState` writes `alivo:coach = "{}"` on first load.** Default-equivalent; no behavioural effect.
- **Enter/Space activation on native buttons: UNVERIFIED.** Retried in this session against the production build with the page holding focus (`document.hasFocus() === true`) and the control focused — Return did not activate it. Escape *does* work in the same environment, which isolates the gap to the browser's default action on synthetic key events rather than to the product. Per the QA brief this stays **UNVERIFIED**; no pass is inferred. One manual keyboard pass on real hardware would close it.

---

### Release recommendation

**READY FOR PORTFOLIO**

*Updated 21 Sep 2026 — all four SHOULD FIX items are resolved and re-verified against
the production build. `tsc --noEmit`, `eslint src` and `next build` pass with no
warnings; no console errors; no overflow or contrast failures on any changed route at
1440 / 1024 / 390. The recommendation stands, now with nothing outstanding above
ACCEPTED PROTOTYPE LIMITATION.*

No blockers. The core loop — AI works → an exception appears → a human understands and resolves it → repeated problems inform an improvement — is complete, coherent and honest end to end on a clean session in the production build, with zero unexplained live-action claims, zero contrast failures and zero overflow at every width tested.

~~S1–S4 are worth an hour before the work goes out~~ — **done.** Only accepted prototype limitations remain.
