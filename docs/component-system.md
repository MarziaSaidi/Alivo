# Alivo Mission Control — Component System & Interaction States

**Status:** Proposed. Components and states only.
**Subordinate to (all frozen):** `ux-spec.md` · `visual-direction.md` ·
`brand-foundation.md` · `typography-system.md` · `color-system.md` ·
`layout-system.md`

No code, no CSS, no screen redesign, no copy changes. Every token referenced
below is quoted exactly from an approved document; this document creates no
new values.

**Locked rule carried in:** blue always means **interactive / actionable**.
The "three blue elements per screen" figure is a heuristic and is never
allowed to reduce interaction clarity.

---

## 1. Component philosophy

Three tiers, and the boundaries between them are strict.

**A reusable primitive** has no product meaning. A button does not know what
Mission Control is. It takes a label and a variant and renders correctly. If it
needs to know about exceptions, agents or customers, it is not a primitive.

**A reusable product pattern** carries product meaning and appears on two or
more screens. The interruption block knows that a bounded surface means *the
normal flow has stopped*. That knowledge is the reason it exists, and it is why
it cannot be a generic `Card`.

**A screen-specific composition** appears once. It may use primitives and
patterns freely, but it is not extracted, not parameterised, and not made
"flexible" in advance.

### Two rules that keep this small

**Two usages are not a pattern; three are.** A thing used twice is copied. A
thing used three times is extracted. This resists the reflex to abstract on
first repetition, which is how component libraries acquire options nobody uses.

**A component is never created to hold content.** The Coach boundary, the
decision math and the failure explanation are all unique content in unique
arrangements. They are compositions, not components, and wrapping them in a
generic container would be exactly the card soup the direction rejects.

**The test:** *could this render correctly on a screen that does not exist yet?*
Yes → primitive. Only with product knowledge → pattern. No → composition.

---

## 2. Component inventory

Audited from the implementation, not imagined. Usage counts are actual.

| Component / pattern | Current usage | Proposed reusable form | Tier | Screen-specific? |
|---|---|---|---|---|
| **Register label** | **13 uses, 3 duplicate local definitions** (`ExceptionDecision`, `ActivityTrace`, `ImprovementReview`) | `Label` — one definition | **Primitive** | No — extract now |
| **Primary button** | 4 uses, **2 padding variants** (`py-[6px]`, `py-[7px]`) | `Button variant="primary"` | **Primitive** | No |
| **Secondary button** | 2 uses, 2 padding variants | `Button variant="secondary"` | **Primitive** | No |
| **Quiet / text button** | ~5 uses (Reassign, Handle Sarah myself, Assign, Not useful, Cancel) | `Button variant="quiet"` | **Primitive** | No |
| **Inline link** | Many (Coach entry, See all activity, history links) | `Link` | **Primitive** | No |
| **Back link** | 4 uses (Exception Detail, Activity, Coach ×2) | `Link variant="back"` | **Primitive** | No |
| **Text input** | 2 (search ×2) | `Input` | **Primitive** | No |
| **Numeric input** | 1 (counter amount) | `Input type="numeric"` | **Primitive** | No |
| **Textarea** | 2 (message, guidance) | `Textarea` | **Primitive** | No |
| **Radio option** | 2 groups (decision options, dismiss reasons) | `RadioOption` | **Primitive** | No |
| **Section heading** | 0 today — **required** by typography §6 for the Coach boundary | `SectionHeading` | **Primitive** | No — new |
| **Operational row** | **4 uses** (MC queue, Exceptions index, Activity index, Coach history) | `Row` | **Pattern** | No |
| **Interruption block** | **3 uses** (MC lead exception, Activity stopped, Activity failure) | `Interruption` | **Pattern** | No |
| **Decision math row** | **2 uses** (MC, Exception Detail) — already extracted as `MathRow` | `MathRow` (keep) | **Pattern** | No |
| **Status statement** | **3 uses** (MC operating statement, Activity head, Coach head) | `StatusStatement` | **Pattern** | No |
| **Attribution line** | 3 uses (trace human action, Coach approval, history) | `Attribution` | **Pattern** | No |
| **Inspection layer** | 1 built (Conversation), 1 designed (Activity evidence) | `InspectionLayer` shell | **Pattern** | No — shell only |
| **Beat expansion** | 1 (`ActivityTrace`) | — | Composition | **Yes** — promote only if Coach examples become expandable |
| **Coach entry** | 1 (Mission Control) | — | Composition | **Yes** |
| **Filter + search header** | 1 (Exceptions index) | — | Composition | **Yes** |
| **Decision surface** | 1 | — | Composition | **Yes** |
| **Trace spine** | 1 | — | Composition | **Yes** |
| **Boundary block** (would change / would not change) | 1 | — | Composition | **Yes** — content, not a component |
| **Behaviour preview** | 1 | — | Composition | **Yes** |
| **Scope list** | 1 | — | Composition | **Yes** |

### Not created, deliberately

`Card` · `Panel` · `Badge` · `Pill` · `Alert` · `Callout` · `Tooltip` ·
`Avatar` · `Icon` set · `Tabs` · `Accordion` · `Modal` · `Toast` · `Chip` ·
`Stat` · `MetricTile`. None has a demonstrated need, and several are explicitly
rejected by the frozen documents.

---

## 3. Buttons and actions

**Blue means interactive, not important.** A screen may carry several blue
elements when several things are genuinely actionable. What a screen may not
carry is **more than one filled primary action** — recognition comes from the
fill being rare, not from blue being rare.

### Primary

| Property | Value |
|---|---|
| Typography | Action — Inter 14 / 500 / 1.2, tabular when it contains money |
| Background | `action.primary` |
| Text | `text.inverse` |
| Border | none |
| Height | `control.height.default` (36) |
| Padding | `space.related` (16) horizontal |
| Radius | `radius.control` (6) |
| Alignment | Left, at the content edge |

| State | Treatment |
|---|---|
| Hover | `action.primary.hover` |
| Focus-visible | `border.focus` ring, `border.focus.width` (2), `border.focus.offset` (2), **outside the control** |
| Pressed | `action.primary.pressed` |
| Disabled | `surface.subtle` background, `text.disabled`, plus `aria-disabled` and removed affordance — **never colour alone** |
| Loading | Label replaced by a pending label (e.g. *Sending…*), control disabled. **No spinner on a control this small.** |

### Secondary

Same geometry. `surface.canvas` background, `text.primary` label, 1px
`border.input`. Hover raises to `surface.hover`. Used where an action is real
but not the decision — *Dismiss this improvement*.

### Quiet / text

Height `control.height.text` (28), padding `space.inline` (8), no border, no
background, `text.secondary`. Hover `text.primary`. Target extended to
`control.target.min` (40) with invisible margin. Used for *Reassign*, *Handle
Sarah myself*, *Assign to someone else*, *Cancel*.

### Destructive — **not created**

No genuinely destructive action exists. *Turn off this guidance* is reversible
and preserved in history; *Dismiss* is recoverable. Both are **secondary**
buttons. Introducing a destructive variant would require a red that the colour
system reserves exclusively for *something is broken*, and would misrepresent a
reversible act as a dangerous one.

### Inline link

`text.interactive`, underline on hover with 4px offset, focus ring as above.
**Never distinguished by colour alone.**

### Back navigation

Metadata size (13 / 400), `text.tertiary`, `←` plus destination. Hover
`text.primary`. It is a link, not a button — it returns rather than acts.

---

## 4. Inputs

Shared: `surface.input` (which is *lighter* than `surface.canvas` — the "write
into it" affordance from the layout system), 1px `border.input`,
`radius.control` (6), Input typography (14 / 400), `space.control` (12)
horizontal padding.

| Input | Height | Width | Notes |
|---|---|---|---|
| Search | `control.height.compact` (32) | 248 | Fits the 48px bar with 8 above and below |
| Single-line | `control.height.default` (36) | contextual | |
| Numeric (counter amount) | 36 | 76 field + inline `$` | Tabular; `$` at `text.tertiary` |
| Textarea (message) | auto | 58ch ≈ 440 | |
| Textarea (Coach guidance) | auto, **max 8 rows** | 62ch ≈ 470 | Then scrolls internally |

| State | Treatment |
|---|---|
| Default | `border.input` |
| Hover | `border.input` darkens one step; no fill change |
| Focus | `border.focus`, 2px ring at 2px offset |
| Error | 1px `state.failure.border` + a `text.failure` message beneath. **Never colour alone.** |
| Disabled | `surface.subtle`, `text.disabled`, `aria-disabled` |
| Read-only | `surface.subtle`, `text.secondary`, no border change, **no focus ring** — it is not editable, and offering focus would lie |

**No floating labels.** Labels sit above the field at Metadata size.

### Long guidance must stay reviewable

The 8-row cap is a layout constraint that protects the Coach boundary from
being pushed off-screen. It must never prevent review. Three requirements:

1. The field scrolls internally and is fully keyboard-navigable.
2. **Once edited, a full-text review is available before approval** — the whole
   guidance is readable without scrolling inside a small box.
3. The approval confirmation states that the operator's edited version was
   used, which the current UX already does.

Height constraint is a layout decision. Reviewability is a product guarantee,
and the layout must not erode it.

---

## 5. Selection controls

The four decision options — *Counter*, *Match $21,500*, *Hold $24,800*,
*Ask what's included first*.

| Property | Value |
|---|---|
| Control | Native radio, 16px, `radius.selection` (4) for checkboxes; radios circular |
| Label | Body (14 / 400); selected label **14 / 500**, `text.primary` |
| Row target | 32, with `space.inline` (8) between control and label |
| Control colour | `action.primary` when selected |

| State | Treatment |
|---|---|
| Unselected | Empty control, `border.input`; label `text.secondary` |
| Hover | Control border darkens; label `text.primary`. **No fill on the row.** |
| Selected | Filled `action.primary` control; label `text.primary` at weight 500 |
| Focus-visible | Ring on the control, `border.focus`, offset 2 |
| Disabled | `text.disabled`, `aria-disabled` |
| **Changed but uncommitted** | The option is selected **and** a Metadata line states the pending consequence. The commit label already restates the outcome (*Send counter at $22,900*). |

### Selection must never imply the action was sent

Four safeguards, none of which is colour:

1. **No card, no fill, no border** around a selected option. It is a radio and a label.
2. **The commit control remains visibly un-pressed and enabled.** Selection changes the commit *label*, never its state.
3. **A standing line** — *Nothing changes until you approve* / *Prototype — nothing is sent* — stays visible.
4. **Committed looks completely different**: the action area is replaced by a statement (§14). A selected option and a committed decision share no visual property.

**Decorative selection cards are rejected.** Bounded surfaces mean interruption
(layout §11); a selected radio is neither interrupted nor interruptive.

---

## 6. Operational rows

One grammar, four uses.

| Property | Value |
|---|---|
| Height | `control.row.height` (42), min 40 |
| Padding | 10 vertical, 0 horizontal — flush to the content edge |
| Divider | 1px `border.quiet`, **inset** to the content edge |
| Column gap | `space.related` (16) |
| Identity column | Body, `text.primary` — the scan target, always first, always left |
| Numeric columns | Numeric — ambient, **right-aligned, tabular** |
| Description | Body, `text.secondary`, the **only** column permitted to truncate |
| Trailing time | Timestamp (13 / 400), `text.tertiary`, right-aligned |

| State | Treatment |
|---|---|
| Hover | `surface.hover`, 80ms. Cursor only when the row navigates. |
| Selected | `surface.selected` + 2px left marker + `text.primary` |
| Focus-visible | `border.focus` ring inset to the row bounds |
| Non-navigable | No hover, no cursor change — an inert row must not pretend to be a link |

### Shared versus distinct

| Shared across all four | Must stay distinct |
|---|---|
| Height, padding, divider, column gap | Column set and widths |
| Identity-first, numerics right | Whether the row navigates (only 2 of 10 do in Exceptions) |
| Truncation on the description only | Mission Control queue has no header row; Exceptions has one |
| Hover, focus, selected behaviour | Coach history rows are taller — they carry a status line and a control |

**Coach history is a row that grew.** It keeps the grammar — identity left,
metadata beneath, divider between — but it is a composition, not an instance of
`Row`, because it contains a control.

---

## 7. Navigation

The shell recedes. Nothing in it competes with content.

| Element | Specification |
|---|---|
| Width | `layout.nav.width` (216), 1px `border.default` right edge |
| Brand area | 48 tall, 24 left gutter — aligns with `layout.topbar.height`; Brand wordmark (14 / 600), `text.primary` |
| Nav item | `control.nav.height` (32), 12 horizontal padding inside a 192 track |
| Inactive | Body, `text.secondary` |
| Hover | `text.primary`. **No background fill.** |
| Active | `text.primary` + weight 500 + a **2px left marker, 16 tall**, vertically centred |
| Focus-visible | `border.focus` ring inset to the track |
| Contextual items (Customers, Agents) | `text.tertiary`, inert, `cursor: default`, not focusable |
| Section separator | 1px `border.default`, inset 24, with 20 above and below |
| Icon allowance | 16 + `space.inline` (8) reserved; adding icons later costs no reflow |

**Never blue except a focus ring.** The active item is distinguished by
contrast, weight and the marker — three non-chromatic signals. Colouring the
active item blue would make navigation compete with the commit control.

### Top operational status

48 tall, 1px `border.default` beneath, **no shadow** even when content scrolls
under it.

| Element | Specification |
|---|---|
| `● Running` | Metadata, `text.tertiary`, including the mark |
| `3 need you` | Metadata, `text.secondary` |
| Search | 32 tall, 248 wide, `surface.input` |
| Account | Metadata, `text.tertiary`, hover `text.primary` |

When the system is degraded the *sentence* changes and `state.failure` appears
on it. Only deviations get a marker.

---

## 8. Status presentation

**No state gets a pill.** Every state is legible without colour.

| State | Presentation | Colour | Non-colour signal |
|---|---|---|---|
| Running | Sentence in the top bar | None — `text.tertiary` | The words |
| Needs your decision | Row state column, or the interruption block | None | Position (top), weight, isolation, live clock |
| Needs attention | Row state column | None — `text.primary` | The words, position |
| Waiting | Elapsed time, right-aligned | None — `text.tertiary` | Tabular duration |
| **Failed** | Statement line inside an interruption | **`state.failure`** | Broken measure, sub-sections, remedies |
| Resolved | Row state column | None — `text.secondary` | The word, reduced contrast |
| Self-resolved | Row state column | None — `text.tertiary` | The word, lowest tier |
| Approved | Replaces the action area | None — `text.primary` | A statement, not a badge |
| Turned off | History status line | None — `text.tertiary` | The words, recession |

### When each treatment is appropriate

**Plain text** — every state above except failure. A state that needs no action
is a word in a sentence or a cell.

**A subtle indicator** — only the `●` before *Running*, and only because the
global operating state has no other anchor. It is `text.tertiary`, never green.

**A stronger interruption** — reserved for two cases: a human must decide, or
something is broken. Both use the interruption pattern (§9).

---

## 9. The interruption pattern

The product's most important pattern. Two species that **must not look alike**.

### Shared grammar

| Property | Value |
|---|---|
| Boundary | 1px `border.strong`, `radius.interruption` (8) |
| Fill | **None** — `surface.canvas` (see the flagged conflict below) |
| Internal padding | `space.group` (24) horizontal, `space.related` (16) vertical |
| Separation | `space.section` (32) above and below |
| Marker | Register label (12 / 600 / +0.06em / uppercase) |
| Evidence | Body / Metadata beneath the marker |
| Action | Left-aligned at the internal content edge |
| Shadow | **None.** It is in the plane, not above it. |

### Species A — a human must decide

*Sarah's pricing approval; `ALIVO STOPPED` in the trace.*

- Marker: `ALIVO STOPPED` — register label, **no colour**
- Content: `text.primary`
- **Carries a live elapsed clock and a promised deadline** — Timestamp, `text.tertiary`
- **No internal sub-sections**
- Action: the decision itself (`action.primary`), or `Open`
- Never uses `state.failure` in any form

### Species B — something failed

*Marcus's JobNimbus failure; an agent unable to complete an action.*

- Marker: the failure statement in **`state.failure`** — one line only
- Border gains `border.failure` as reinforcement
- **Carries internal sub-sections**: *Why · What this means · What still works* — each a register label with Body beneath
- Retry behaviour stated in plain language
- **Remedies inline**, primary remedy `action.primary`
- **No clock** — a failure is not waiting on a person's judgment; it is waiting on a fix
- Explanation and remedies stay neutral. Only the statement is red.

### How they differ without relying on colour

| | Species A | Species B |
|---|---|---|
| Live clock | **Yes** | No |
| Internal sub-sections | No | **Yes (three)** |
| Inline remedies | No | **Yes** |
| Failure colour | Never | One line |
| Consequence framing | *What you must decide* | *What this means for the customer* |

**Remove all colour and the two are still distinguishable** — one has a clock
and no sections, the other has three sections and a remedy list. That is the
test, and it is the reason this is not a generic alert card.

### Relationship to surrounding content

In the Activity Trace, ordinary beats occupy 560px starting at x = 104;
interruptions occupy the full 760 starting at x = 0. The spine stops at the
block's top edge and resumes below. The **104px leftward jump** is the primary
signal during fast scrolling.

---

## 10. Decision math

```
Your quote                    $24,800     ← Body label · Numeric 15/400
Competitor                    $21,500
──────────── ledger rule ─────────────     ← 1px border.default, 276 wide
Difference                     $3,300
Required                        13.3%     ← 15/500 · text.primary
Allowed                          5.0%     ← 15/400 · text.secondary
```

| Property | Value |
|---|---|
| Block width | 276 |
| Labels | Metadata (12 / 400), `text.tertiary`, left |
| Values | **One shared right-aligned column, 72 wide, tabular** |
| Contested value | Weight 500, `text.primary` |
| Comparison value | Weight 400, `text.secondary` |
| Ledger rule | 1px `border.default`, width of the block only, `space.tight` (4) above and below |
| Row spacing | 2 vertical |
| `$` and `%` | Same size, one contrast step lighter than their digits |

**Required sits directly above Allowed, in the same column, in the same unit.**
The conflict is carried by adjacency, one contrast step and one weight step.

**No red or green.** 13.3% is not bad and 5% is not good — one is what the
customer asked for, the other is what the company permits. Colour would
editorialise a decision that belongs to the operator.

**Not KPI tiles.** No borders, no fills, no icons, no large type. The values are
15px — one step above body, four steps below the operating statement.

**Responsive:** the block is fixed at 276 and never reflows. Below 640 it stays
276 and the surrounding column wraps around it. Breaking a number column
destroys comparison, which is its only purpose.

---

## 11. Activity Trace beats

| Element | Specification |
|---|---|
| Timestamp | 68 column, right-aligned, Timestamp role, `text.tertiary`, **tabular** |
| Column → spine | `space.related` (16) |
| Spine | 1px `border.quiet` at x = 84, broken at day labels |
| Spine → content | 20 |
| Actor | The **grammatical subject** of the sentence — the scan target |
| Sentence | Trace event — quiet (14 / 400 `text.secondary`) or consequential (14 / 500 `text.primary`) |
| Consequence | Body, `text.tertiary`, indented, no bullets |
| Beat separation | `space.related` (16) |
| Expansion affordance | `+` / `−` at the row's right edge, `text.tertiary`, `text.interactive` on hover |
| Expanded content | Indented `space.related` (16) behind a 1px `border.quiet` |

| Beat type | Distinguishing treatment |
|---|---|
| Normal / Alivo | Subject weight 400. The unmarked default. |
| Customer | Subject weight 500; quoted words `text.tertiary` behind a hairline |
| External system | Subject weight 500 — a named third party |
| Human action | Subject weight 500 + an **attribution line** (Metadata, `text.tertiary`) |
| Quiet period | `text.tertiary`, dashed `border.quiet` — the only dashed line in the product |
| Stopped | Interruption species A |
| Failed | Interruption species B |
| Resolved failure | **Collapses to a quiet row.** `state.failure` is **removed** — it is history, not an active problem. The resolver is named. |

**Collapse behaviour:** one beat expanded at a time; opening another closes the
previous. The expansion unmounts on collapse, so a transcript is hidden by
default on every open, not only the first.

**Never exposed:** chain of thought, prompts, tokens, model names, latency,
HTTP status, JSON, retry logs, internal IDs. Expansion shows **what Alivo
established** — conclusions and checks — never how it reasoned.

---

## 12. Agent Coach patterns

| Element | Specification | Territory |
|---|---|---|
| Observed pattern | Section heading (15 / 550) + Body observation lines | Normal |
| Evidence example | Customer 14 / 500; question Body; **answer `text.tertiary` indented 16 behind a hairline** | **Reduced** |
| Editable guidance | Textarea, 62ch, max 8 rows | Normal |
| **What would change** | **Section heading 15 / 550 sentence case**; content **15 / 400 `text.primary`** | **Largest** |
| **What would not change** | Same | **Largest** |
| Approval control | `Button variant="primary"`, label *Approve for Follow-up* | |
| Dismissal control | `Button variant="quiet"`, label *Not useful* → inline reasons, never a modal | |
| Approved state | Action area **replaced** by a statement + *View change history* link; guidance becomes read-only | |
| Change history entry | Row grammar + status line + `Button variant="secondary"` | |

### How the boundary stays the centre of gravity

Three geometric moves, no colour:

1. **The only full-width block** (720). Examples are indented; guidance is 470.
2. **The only block with rules above and below.**
3. **The only content above 14px** — 15px, where the rest of the page is 14.

**No green/red comparison layout.** Both columns share one surface, one rule
pair, one colour (`text.primary`) and one size. They are two halves of one
statement, not two opposed options. Colouring them as opposites would
misrepresent the decision.

---

## 13. Inspection layer

| Property | Value |
|---|---|
| Width | `layout.rail.width` (320) |
| Gap from content | `space.major` (56) |
| Position ≥ `layout.breakpoint.rail` (1360) | **In flow.** 1px `border.default` left edge. **No shadow.** |
| Position < 1360 | **Overlay** from the right. `elevation.overlay`. Decision surface narrows to 440. |
| Backdrop | **None, at either width** |
| Header | Register label + a quiet *Close*; sub-line at Metadata |
| Elevation | Only in overlay mode, where it is genuinely above the plane |
| Scroll | Scrolls independently; the decision surface keeps its own scroll position |

### Behaviour

**No backdrop, no dimming, ever.** Dimming would assert the decision is
disabled, which is false — it remains live and holds an edited amount.

**Focus** moves to the panel header on open and returns to the triggering
control on close. Escape closes. Focus is **not trapped** in flow mode — the
decision behind it is still operable, and trapping would contradict that.

**The draft is preserved.** Opening, reading, playing a recording and closing
change no state: no timers reset, no ownership changes, no drafts lost, no
exception resolves because someone inspected it.

**Never a full-screen navigation on desktop.** The 320 slot is reserved whether
or not the panel is open, so the decision never moves — the layout system's
"reserved slot" signature.

**Never stacks.** One layer at a time. Opening a second replaces the first.

---

## 14. Interaction state matrix

| Component | Default | Hover | Focus-visible | Pressed | Selected | Disabled | Pending | Committed | Error |
|---|---|---|---|---|---|---|---|---|---|
| Button — primary | `action.primary` | `.hover` | ring, offset | `.pressed` | — | `surface.subtle` + `text.disabled` | label → pending, disabled | **replaced by a statement** | — |
| Button — secondary | `border.input` | `surface.hover` | ring | — | — | `text.disabled` | — | — | — |
| Button — quiet | `text.secondary` | `text.primary` | ring | — | — | `text.disabled` | — | — | — |
| Link | `text.interactive` | underline | ring | — | — | — | — | — | — |
| Input | `border.input` | border +1 step | `border.focus` | — | — | `surface.subtle` | — | — | `state.failure.border` + message |
| Textarea | as Input | as Input | as Input | — | — | read-only: `surface.subtle` | — | — | as Input |
| Radio option | empty | border +1 | ring on control | — | filled + label 500 | `text.disabled` | — | — | — |
| Row — navigable | canvas | `surface.hover` | ring inset | — | `surface.selected` + marker | — | — | — | — |
| Row — inert | canvas | **none** | — | — | — | — | — | — | — |
| Nav item | `text.secondary` | `text.primary` | ring inset | — | `text.primary` + marker | — | — | — | — |
| Interruption A | bounded | — | — | — | — | — | — | resolves → leaves queue | — |
| Interruption B | bounded + `border.failure` | — | — | — | — | — | remedy pending | **collapses to a quiet row** | — |
| Expansion affordance | `text.tertiary` | `text.interactive` | ring | — | `−` when open | — | — | — | — |

### Five states that must never be interchangeable

| State | Meaning | Visual |
|---|---|---|
| **Selected** | A choice is made. **Nothing sent.** | Filled radio, label weight 500. No surface, no border. |
| **Edited** | The draft differs from the suggestion | A Metadata line states it. **No colour, no border, no badge.** |
| **Pending** | An action is in flight | Control label changes, control disabled. Nothing else moves. |
| **Committed** | The decision was sent | **The action area is replaced by a statement.** Editable fields become read-only. |
| **Resolved** | It is finished and is now history | Recedes to `text.secondary` / `text.tertiary`, keeps its record, leaves the queue. |

**No two share a visual property that could be mistaken for the other.**
Selected has a filled control and no statement. Committed has a statement and
no control. This is the difference between *I chose* and *I sent*, and in a
product that moves money it must never be ambiguous.

---

## 15. Motion

Per the approved philosophy: motion explains, never decorates.

| Event | Duration | Easing | What moves |
|---|---|---|---|
| Row hover | 80ms | ease-out | Background only |
| Selection | **0ms** | — | Instant. A choice must not feel like it is settling. |
| Evidence expansion | 140ms | ease-out | Height + content opacity; content below is pushed |
| Inspection — overlay | 160ms | ease-out | Transform from the right edge |
| Inspection — in flow | **0ms** | — | A layout change, not an entrance |
| Inspection close | **0ms** | — | Instant. Getting out should feel like nothing happened. |
| Exception resolution | 180ms | ease-out | Item collapses; the next advances into position |
| Queue advancement | 180ms | ease-out | As above — one continuous move, not two |
| New exception arrival | **0ms** | — | A line appears; **nothing reflows under the reader** |
| Coach approval | 140ms | ease-out | Action area cross-fades to the confirmation. **No celebration.** |

**Never animated:** money, operational counts, timestamps, elapsed time,
percentages, queue counts. The elapsed clock updates without transition — it is
the only continuously changing value in the product, and animating it would
destroy the calm it sits inside.

**Reduced motion:** every duration above becomes 0. **No state is ever
communicated by motion alone**, so nothing is lost.

---

## 16. Accessibility

| Area | Requirement |
|---|---|
| **Keyboard** | Every interactive element reachable in DOM order. Escape closes the inspection layer. Arrow keys move within a radio group. No keyboard trap in flow mode. |
| **Focus visibility** | `border.focus` at `border.focus.width` (2) and `border.focus.offset` (2), **always outside the control** — it fails at 1:1 inside a blue fill (colour system §16) |
| **Hit areas** | `control.target.min` (40) minimum. Text buttons at 28 visual carry invisible margin. Rows at 42 clear AA. |
| **Contrast** | Every text tier ≥ 4.5:1. `text.disabled` is exempt and **never the sole signal**. |
| **Screen-reader labels** | Uppercase is CSS `text-transform` only, so labels are announced as words. Inert nav items are not focusable. Icon-only controls carry accessible names. |
| **Status announcements** | Resolution, approval and failure are announced politely via a live region. New queue arrivals are **not** announced — they are collected, matching the no-reflow rule. |
| **Form errors** | Message text beneath the field, tied by `aria-describedby`, plus a border change. Never colour alone. |
| **Reduced motion** | All durations to 0. |
| **Zoom** | `rem` throughout; functional at 200%. |
| **Non-colour recognition** | Every state in §8 is legible with colour removed. Failure is identifiable by its sub-sections and remedies; a decision by its clock and isolation. |

**Density is never traded against accessibility.** Rows are 42 rather than 32
precisely so the target and the line height are both correct.

---

## 17. Component anti-patterns

- **Card soup** — bounded surfaces mean interruption; four justifications only
- **Rainbow status pills** — no state has a pill; two hues exist in total
- **Glowing AI indicators** — Alivo's own `--blue-glow` is explicitly not carried over
- **Decorative gradients** — none anywhere
- **Oversized controls** — nothing 44–48px tall; it would cost ~30% queue density
- **Tiny metadata** — 12px floor, all tiers ≥ 4.5:1
- **Generic alert cards** — the interruption has two species with different structure
- **Unnecessary icons** — no icon set exists; nav reserves space but ships none
- **Hover-only essential information** — truncated text has `title`, but nothing is *only* discoverable on hover
- **Animated operational numbers** — money, counts and clocks never transition
- **Ambiguous selection versus commitment** — five states, no shared visual property
- **Multiple competing primary actions** — one filled action per screen
- **Avatars and per-actor colour** — actor distinction is weight on the subject
- **A `Card` primitive** — its existence would license everything above

---

## 18. Canonical component table

| Component | Semantic purpose | Typography role | Colour tokens | Geometry tokens | Interaction states | Used on |
|---|---|---|---|---|---|---|
| `Button/primary` | The one action that commits | Action | `action.primary`, `.hover`, `.pressed`, `text.inverse`, `border.focus` | `control.height.default`, `space.related`, `radius.control` | default · hover · focus · pressed · disabled · pending · committed | MC, Exception Detail, Coach, Activity failure |
| `Button/secondary` | A real but non-committing action | Action | `surface.canvas`, `text.primary`, `border.input`, `surface.hover` | same | default · hover · focus · disabled | Coach dismiss, history turn-off |
| `Button/quiet` | Ownership and cancel actions | Action | `text.secondary`, `text.primary` | `control.height.text`, `space.inline`, `control.target.min` | default · hover · focus · disabled | MC, Exception Detail, Coach |
| `Link` | Navigate or reveal | Body / Metadata | `text.interactive`, `border.focus` | — | default · hover · focus | All screens |
| `Link/back` | Return to origin | Metadata | `text.tertiary`, `text.primary` | — | default · hover · focus | Exception Detail, Activity, Coach |
| `Input` | Editable single value | Input | `surface.input`, `border.input`, `border.focus`, `state.failure.border` | `control.height.default` / `.compact`, `space.control`, `radius.control` | default · hover · focus · error · disabled · read-only | Search, counter amount |
| `Textarea` | Editable message or guidance | Input | as `Input` | `radius.control`, max 8 rows | as `Input` | Exception Detail, Coach |
| `RadioOption` | Choose, without sending | Body (selected 500) | `action.primary`, `border.input`, `text.primary`, `text.secondary` | `radius.selection`, `space.inline` | unselected · hover · selected · focus · disabled | Exception Detail, Coach dismiss |
| `Label` | Name a register | Register label | `text.tertiary` | `space.inline` | — | **All five screens** |
| `SectionHeading` | A heading that is content | Section heading | `text.primary` | `space.related` | — | Coach boundary |
| `Row` | One record in a register | Body + Metadata + Numeric | `text.primary/secondary/tertiary`, `surface.hover`, `surface.selected`, `border.quiet` | `control.row.height`, `space.related` | default · hover · focus · selected · inert | MC queue, Exceptions, Activity index, Coach history |
| `Interruption` | The flow has stopped | Register label + Body | `border.strong`, `surface.canvas`; species B adds `state.failure`, `border.failure` | `radius.interruption`, `space.group`, `space.related`, `space.section` | default · resolved | MC, Activity ×2 |
| `MathRow` | One line of a reckoning | Metadata + Numeric — decision | `text.tertiary`, `text.primary`, `text.secondary`, `border.default` | 276 block, 72 value column | — | MC, Exception Detail |
| `StatusStatement` | Did everything work | Operating statement + Metadata | `text.primary`, `text.tertiary` | `space.tight`, `space.section` | — | MC, Activity, Coach |
| `Attribution` | A human was here | Metadata | `text.tertiary` | `space.micro` | — | Activity, Coach, history |
| `InspectionLayer` | Evidence without leaving | Register label + Body | `border.default`, `elevation.overlay` (overlay only) | `layout.rail.width`, `space.major`, `radius.interruption` | open · closed | Exception Detail |

---

## 19. Implementation boundaries

**Recommendation only. No refactor performed.**

### Restyle in place — no structural change

`AppShell` · `TopBar` · `LeftNav` · `MobileNav` · `CoachEntry` ·
`ConversationPanel` (content) · `Placeholder` *(orphaned — see ux-spec §13)*

### Extract — genuine duplication exists today

| Extract | Evidence |
|---|---|
| `Label` | **13 usages, 3 duplicate local definitions** — the clearest case in the codebase |
| `Button` | 4 primary + 2 secondary + ~5 quiet, with **inconsistent padding** (`py-[6px]` vs `py-[7px]`) |
| `Row` | 4 usages across 3 files with near-identical class strings |
| `Interruption` | 3 usages; `StoppedBlock` and `FailureBlock` already share structure in `ActivityTrace` |
| `Input` / `Textarea` | 5 usages, currently using `border-neutral-300` — the **same value as the interruption border**, which the colour system separates into `border.input` and `border.strong` |
| `StatusStatement` | 3 usages |

### Keep screen-specific

`ExceptionDecision` · `ActivityTrace` spine and `BeatExpansion` ·
`ImprovementReview` boundary, scope and preview · `CoachOverview` ·
`CoachHistory` · `ExceptionsIndex` filter header · Mission Control page
composition

### One correction the restyle should make

The prototype uses `border-neutral-300` for **both** input boundaries and
interruption boundaries. The colour system distinguishes these
(`border.input #D3D7DF` vs `border.strong #C9CDD6`) precisely because a box
around an input means *editable* and a box around a block means *interrupted*.
Collapsing them weakens the pattern that carries the most product meaning.

---

## 20. Conflict found between frozen documents

**One genuine conflict. Flagged, not resolved.**

### The failure block's fill

| Document | Statement |
|---|---|
| `color-system.md` §8 and §20 | `state.failure.surface` `#FDF3F1` — "An optional, very faint wash behind a failure block"; allowed use: "Optional behind a failure block" |
| `layout-system.md` §11 | "**Bounded surfaces carry no fill.** The exception block and the failure block are `border.strong` on `surface.canvas`. A fill would make them cards, and the container's meaning depends on them not being cards." |

The colour system permits a wash behind the failure block; the layout system
forbids any fill on that exact element.

**Both readings are defensible.** A faint wash strengthens tier-5 differentiation
and is verified accessible (`state.failure` on `state.failure.surface` = 6.42:1;
`text.primary` on it = 16.62:1). Forbidding it preserves the no-cards rule
absolutely and keeps species A and species B structurally identical apart from
their content.

**This document assumes no fill** (§9), because the layout rule is the more
recently approved of the two and because the two interruption species are
already distinguishable without it. **This is an assumption, not a resolution —
it needs an explicit decision.** If the wash is retained, `state.failure.surface`
becomes the single exception to the no-fill rule and the layout system should
say so.

No other conflicts were found across the six documents.
