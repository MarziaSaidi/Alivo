# Alivo Mission Control — Layout, Spacing, Geometry & Surface System

**Status:** Proposed. Layout only.
**Subordinate to:** `ux-spec.md`, `visual-direction.md`, `brand-foundation.md`,
`typography-system.md`, `color-system.md` — all frozen.

No motion, no components, no CSS, no copy changes.

**Clarification carried in:** "at most three blue elements per screen" is a
**heuristic**. The locked rule is **blue always means interactive / actionable**.
Interaction clarity is never sacrificed to satisfy a count.

---

## 1. Spatial thesis

Space in Mission Control is **compressed by default and spent deliberately**.
The operator is running a business, not reading a page, so the resting state is
dense: rows are tight, columns are close, and sections sit near one another.
Space is then spent in exactly three situations — around the thing that
requires judgment, before an irreversible action, and between one section and
the next. Everything else compresses. Extra space is never the product of a
grid, a card's internal padding, or a desire for the page to breathe; it is
always a statement that something matters. The practical consequence is that a
screen where nothing needs a person should be short and quiet, and the single
most generous area on any screen should be whatever the operator must decide.

---

## 2. Base spacing system

**Base unit: 4px.** Eight steps. Each exists for a named job; none is
decorative.

| Token | Value | Why it exists |
|---|---|---|
| `space.micro` | **2px** | Baseline nudges only — a metadata line under its content |
| `space.tight` | **4px** | Label → its own content; inside a compound value |
| `space.inline` | **8px** | Between items on one line; icon → label |
| `space.control` | **12px** | Inside controls, vertical; between radio and its label |
| `space.related` | **16px** | Between related blocks inside one section; column gap in a row |
| `space.group` | **24px** | Between groups inside a section; page gutter |
| `space.section` | **32px** | Section → section |
| `space.major` | **56px** | Primary column → rail; major composition gap |

**Two values do double duty on purpose.** `space.group` (24) is both the
internal group gap and the page gutter, so content never sits closer to the
viewport edge than two related blocks sit to each other. `space.major` (56) is
the only gap above 32, and it appears exactly twice in the product — the
Mission Control rail and the Exception Detail inspection slot.

**What is deliberately absent:** 40px, 48px, 64px, 80px. The prototype
currently uses `gap-10` (40) in five places, `gap-12` (48) once and `gap-14`
(56) once — three different "major" gaps doing one job. They collapse to
`space.major`.

---

## 3. Page shell

### Decided geometry

| Element | Value | Derivation |
|---|---|---|
| **Navigation width** | **216px** | 24 gutter + 168 label area + 24 gutter. Accommodates a future 16px icon + 8px gap without a reflow. |
| **Top bar height** | **48px** | Holds a 32px control with 8px above and below. Unchanged. |
| **Page gutter** | **24px** | `space.group` |
| **Content max (default)** | **1176px** | 800 primary + 56 + 320 rail |
| **Content max (≥1600)** | **1256px** | 880 primary + 56 + 320 rail |
| **Content alignment** | Centred within the main region | |

### The 1440 identity

```
216 nav  +  24 gutter  +  1176 content  +  24 gutter  =  1440
```

The composition **exactly fills a 1440 viewport**. This is the reference
resolution, and at it there is no surplus and no compromise.

### Evaluating the current implementation

| Current | Verdict |
|---|---|
| **200px nav** | **Changed → 216.** 200 is a default, not a derivation, and leaves no room for icons later. |
| **48px top bar** | **Kept.** Correct already. |
| **1216px content** | **Changed → 1176 / 1256.** 1216 was derived from an 840px primary. With 14px body the primary settles at 800, and 1176 gives the exact 1440 fit. |

### Large-screen behaviour

| Viewport | Content | Surplus each side (beyond gutter) | Occupied |
|---|---|---|---|
| 1920 | 1256 | 200 | 77% |
| 1600 | 1256 | 40 | 92% |
| 1440 | 1176 | 0 | 100% |
| 1280 | 1016 | 0 | 100% |

**Neither failure mode occurs.** Content never overstretches, because the cap
holds. And it is never a tiny island — at 1920 the navigation plus content
occupies 77% of the viewport. The one step up at 1600 exists solely to stop
ultra-wide dead space growing without bound; the rail stays fixed because it is
secondary and should not grow.

---

## 4. Content grid

**There is no 12-column grid.** A marketing grid would impose columns this
product does not have and would invite card layouts. Instead there are **three
named regions** and a small set of alignment anchors.

```
│← 216 nav →│← 24 →│←──── primary 800 ────→│← 56 →│← rail 320 →│← 24 →│
            │      │                                            │
            │      └─ anchor A: content left edge                │
            │                                                    └─ anchor C
            └─ anchor B: primary right edge (800)
```

| Region | Width | Used by |
|---|---|---|
| **Primary** | 800 (880 ≥1600) | Mission Control queue, Exception Detail decision surface |
| **Rail** | 320, fixed | Mission Control "What ran without you"; Exception Detail inspection layer |
| **Reading** | 720–760 | Activity Trace, Agent Coach — centred, no rail |
| **Register** | 980 | Exceptions index — wider than reading, narrower than full |

### Maximum readable widths, from the typography system

At 14px Inter, 1ch ≈ 7.6px.

| Content | Measure | Pixels |
|---|---|---|
| Operational prose | 52–58ch | 395–440 |
| Explanatory prose | 62–68ch | 470–515 |
| Editable guidance | 58–66ch | 440–500 |
| Timeline events | 60–70ch | 455–530 |

**No text block is ever the full width of its column.** The primary column is
800px; its prose never exceeds ~515px. The remainder is structural space, not
an invitation to fill.

### Alignment anchors

Only **three vertical axes** per screen: the content left edge, the rail left
edge, and the numeric right edge inside any aligned column. Every card in a
layout introduces a fourth — which is one reason this product has almost none.

---

## 5. Mission Control geometry

### Composition

```
operating statement        full content width, prose capped 58ch
  ↓ space.tight (4)
coverage line
  ↓ space.section (32)
┌─────────────────────────────────┐              ┌──────────────┐
│ expanded exception              │              │  (rail)      │
│ 800 wide, bounded, no fill      │   56 gap     │  offset 72   │
└─────────────────────────────────┘              │  320 wide    │
  ↓ space.section (32)                           │              │
ALSO WAITING 3                                   │ What ran     │
  rows, 42px each                                │ without you  │
  ↓ space.related (16)                           │  ↓ 32        │
That's everything.                               │ This week    │
  ↓ space.section (32)                           └──────────────┘
AGENT COACH entry
```

### The current values, evaluated

| Current | Verdict |
|---|---|
| **56px gap** | **Kept.** Becomes `space.major`, the canonical composition gap. |
| **320px rail** | **Kept.** Holds "47 conversations handled" without wrapping at 14px. |
| **72px rail offset** | **Kept.** A hierarchy mechanic, not spacing — it stops the rail competing for the first glance. |
| **Rail breakpoint 1200** | **Changed → 1360.** See below. |

### The breakpoint correction

The exception block has a two-column interior (math 300 + gap 40 + policy
column). Below roughly **720px of primary**, that interior is cramped.

| Viewport | Primary if rail beside it | Interior |
|---|---|---|
| 1440 | 800 | comfortable |
| 1360 | 720 | **minimum viable** |
| 1280 | 640 | cramped |
| 1200 | 560 | breaks |

**The rail therefore stacks below 1360, not 1200.** The current 1200 lets the
exception interior compress before the rail gets out of the way. This is a
geometry fix, not a behaviour change — the rail still stacks, just sooner.

### The primary must dominate without becoming a card

It dominates through **isolation and exclusivity**, not size: it is the only
bounded element on the screen, it has `space.section` above and below, and
nothing else on the page has a border. Internal padding is `space.group` (24)
horizontal, `space.related` (16) vertical — deliberately tighter than a card
would be, so it reads as a bounded record rather than a panel.

### By viewport

| Viewport | Primary | Rail | Notes |
|---|---|---|---|
| **1920** | 880 | 320 beside | Content 1256, centred, 200 surplus each side |
| **1440** | 800 | 320 beside | Exact fit |
| **1280** | 1016 | **stacked below** | Primary takes full content width |
| **1024** | 760 | stacked below | Nav still present |

---

## 6. Exception Detail geometry

**The composition is identical to Mission Control** — 800 + 56 + 320 = 1176 —
so the two surfaces share one geometry and the decision column sits at the same
left edge on both. The prototype's 40px panel gap becomes `space.major` (56).

| Element | Geometry |
|---|---|
| **Decision surface** | 800 max |
| **Inspection slot** | 320, reserved even when closed |
| **Gap** | 56 |
| **Context header** | Full 800; metadata line capped 58ch |
| **Decision workspace** | Two columns: left flex (min 360), 48 gap, right 264 fixed |
| **Decision math** | 276 wide block: label flex, value column 72 right-aligned |
| **Editable message** | 58ch ≈ 440, never full width |
| **Boundary / action** | Full 800; action row left-aligned at the content edge |

### Section rhythm

```
header
  ↓ 24 + rule
decision workspace          ← math and policy adjacent, never separated
  ↓ 24
Alivo suggests
  ↓ 20
historical context
  ↓ 20 + rule
your decision
  ↓ 12
commit action
```

Sections are separated by **space and a single top rule**, never by four sides.
Only two elements on this page have a boundary: the editable amount and the
editable message. Both are editable, which is the justification.

### When evidence opens

**Nothing moves.** The 320 slot is reserved whether or not the panel is open —
that is its entire purpose. Below 1360 the panel overlays from the right
without dimming, and the decision surface narrows to **440** to clear it. The
existing UX behaviour — no dim, no stack, no state change, edited amount
preserved — is unchanged.

---

## 7. Activity Trace geometry

| Element | Geometry |
|---|---|
| **Trace width** | 760, centred |
| **Timestamp column** | 68, right-aligned, tabular |
| **Column → spine gap** | 16 |
| **Spine** | 1px hairline at x = 84 |
| **Spine → content** | 20 |
| **Event content** | ~560 (≈ 70ch at 14px) |
| **Event → event** | 16 below each beat |
| **Day separation** | 24 above the label, 8 below; **spine breaks** |
| **Expanded evidence** | Indented 16 from event text, behind its own hairline |
| **Interruption block** | **Full 760 — breaks the measure** |
| **Failure block** | **Full 760**, internal padding 20/24 |
| **Current-state ending** | 20 above a rule, 20 below; full width, no border |

**The measure break is the mechanism.** Ordinary beats occupy 560px starting at
x = 104. Interruptions occupy the full 760 starting at x = 0. That 104px
leftward jump is what makes an interruption unmistakable during fast scrolling
— geometry doing the work that colour is not allowed to do.

**Operational, not marketing:** no node circles, no alternating sides, no card
per event. The fixed tabular timestamp column is what makes it read as a
record.

---

## 8. Agent Coach geometry

### Coach overview — 720, centred

```
AGENT COACH label
  ↓ 8
headline (18px)
  ↓ 4
supporting sentence (58ch)
  ↓ 32 + rule
improvement                     ← 24 above, 24 below, rule between
improvement
  ↓ 24
change history link
```

Improvements are separated by rules and space. **No cards.** With only two
items the page is deliberately short — an overview with little to review should
look like it.

### Improvement review — 720, centred

The boundary becomes the centre of gravity through **three geometric moves**:

| Element | Geometry | Territory |
|---|---|---|
| Past examples (3) | Indented 16 behind a hairline, 16 between | ~180px total |
| Editable guidance | 62ch ≈ 470, max 8 rows then internal scroll | ~160px |
| **Boundary** | **Full 720, two columns 336 + 48 gap, rules above and below, 24 internal padding** | **~220px, the widest block on the page** |
| Scope | 13px metadata rows | ~90px |
| Approval | 32 above the control | |

**Why it wins.** It is the **only full-width block** on the page — examples are
indented, guidance is 470px. It is the only block with rules **above and
below**. And its content is 15px where everything else is 14px.

**Explicitly not built:** side-by-side green/red comparison cards. The two
columns share one surface, one rule pair, one colour, and one type size. They
are two halves of one statement, not two opposed options.

**Guidance field cap.** The textarea grows to a maximum of 8 rows and then
scrolls internally. Without this, a long edit pushes the boundary off-screen
and the centre of gravity is lost.

---

## 9. Exceptions index geometry

| Element | Geometry |
|---|---|
| **Width** | 980, centred |
| **Row height** | 42 (14px body × 1.55 + 10 top + 10 bottom); **40 minimum** |
| **Row divider** | 1px `border.quiet`, inset to the content edge |
| **Header row** | 12px label, 8 below, 1px `border.default` beneath |
| **Search** | 248 wide, 32 tall, right-aligned on the control row |
| **Filter spacing** | 20 between filters; control row 24 below the supporting line, 20 above the header |
| **Column gap** | 16 |

### Columns

| Column | Width | Alignment |
|---|---|---|
| Customer / system | 132 | Left |
| Value | 72 | **Right**, tabular |
| What happened | flex (~446) | Left, truncates |
| State | 150 | Left |
| Waiting / when | 116 | **Right**, tabular |

Fixed columns total 470 + 64 of gaps = 534, leaving 446 for the description.

**Truncation falls on the description only** — never on customer, value, state
or time. Full text on `title`.

**Minimum useful width: 880.** Below that the row wraps: identity, value and
time on line one; description on line two.

**A register, not a spreadsheet:** no vertical rules, no zebra striping, no
cell borders, no resizable columns, no sort arrows on every header.

---

## 10. Vertical rhythm

| Relationship | Space | Rationale |
|---|---|---|
| Page title → supporting line | **4** | Bound together |
| Supporting line → first section | **24** | |
| Label → its content | **8** | The label belongs to the content |
| Content → its metadata | **2** | Metadata is an appendix to the line above |
| Row → row | **0** (padding does it) | Row height carries the rhythm, not gaps |
| Item → item in a section | **16** | |
| Section → section | **32** | The largest routine interval |
| Day label → first trace event | **8** (24 above the label) | ≈3:1 above vs below |
| Decision explanation → control | **32** | A deliberate pause before an irreversible act |
| Bounded interruption → surrounding record | **32 above and below** | Isolation is how it dominates |

**The 3:1 rule.** Space above a heading is roughly three times the space below
it. This is what binds a heading downward to its content instead of letting it
float between two blocks.

**The three intervals must be visibly distinct.** 8 / 16 / 32 doubles at each
step. If they were 12 / 16 / 20, nothing would read as grouped and borders
would be added to compensate — which is the road back to card soup.

---

## 11. The bounded surface rule

### The test

> **Does this content need an edge because something is true about it that
> space cannot express?**
>
> If space can express it, space expresses it.

### The four justifications

A visible boundary is permitted only when content is:

1. **Interactive as a single unit** — you click the whole thing
2. **On another plane** — an overlay, a menu, a floating layer
3. **Editable** — you are about to type into it, and the edge tells you where
4. **Severed from the flow** — the normal record has been interrupted

### Applied

| Content | Boundary? | Which justification |
|---|---|---|
| Highest-priority exception | **Yes** | 4 — the queue's normal rhythm has stopped |
| Failure block | **Yes** | 4 |
| Human decision (the section) | **No** | Space, a rule and type carry it |
| Editable guidance | **Yes** | 3 |
| Input / textarea / amount field | **Yes** | 3 |
| Selected control (radio, checkbox) | **Yes** | 1 — it is the control |
| Expanded evidence | **No** | Indentation and a hairline |
| Inspection panel | **Edge only** | 2 — one hairline, no fill, no shadow in flow |
| Section of any kind | **No** | Never |
| Metric, count or summary | **No** | Never |
| Past examples in Coach | **No** | Indent behind a hairline |

### Two supporting rules

**Bounded surfaces carry no fill.** The exception block and the failure block
are `border.strong` on `surface.canvas`. A fill would make them cards, and the
container's meaning depends on them not being cards.

**Never nested.** No bounded surface contains another, with one exception: an
input inside the exception block, which is justification 3 inside justification
4 — two different meanings, legitimately stacked.

---

## 12. Radius policy

**Three values. That is the entire set.**

| Token | Value | Applies to |
|---|---|---|
| `radius.control` | **6px** | Buttons, inputs, search, textarea, selected rows |
| `radius.interruption` | **8px** | Bounded exception, failure block, inspection panel |
| `radius.selection` | **4px** | Checkboxes. Radios are circular by nature. |

**Character.** Six is precise without being harsh — enough softness to echo the
lowercase geometric wordmark, not enough to read as a consumer app. The
interruption is 8 because a larger surface needs a proportionally larger radius
to look optically equal.

**Rejected:** pill radii (99px), oversized card radii (16–20px), and the eight
competing values found on alivo.ai (10, 12, 16, 4, 6, 20, 99, 50%).

**Zero radius** on rules, dividers and the timeline spine. They are lines, not
shapes.

---

## 13. Border policy

**Every border in the product is 1px.** Thickness is never used as emphasis.

| Use | Width | Token | Geometry |
|---|---|---|---|
| Row divider | 1 | `border.quiet` | Inset to the content edge |
| Section rule | 1 | `border.default` | Full column width, above the section |
| Ledger rule | 1 | `border.default` | Width of the number block only (276) |
| Column header rule | 1 | `border.default` | Full table width |
| Input boundary | 1 | `border.input` | All four sides |
| Bounded interruption | 1 | `border.strong` | All four sides, `radius.interruption` |
| Failure reinforcement | 1 | `border.failure` | All four sides |
| Timeline spine | 1 | `border.quiet` | Vertical, broken at day labels |
| Quiet-period spine | 1 dashed | `border.quiet` | The only dashed line in the product |
| Selected item | 1 | — | Surface tint + a 2px left marker |

**The one exception: the focus ring is 2px with a 2px offset.** That is
functional, not decorative — and per the colour system it sits *outside* the
control so it contrasts against the canvas rather than against a blue fill.

---

## 14. Elevation

**One shadow token. Used for three things.**

| Surface | Shadow | Reason |
|---|---|---|
| Base content | **None** | It is the page |
| Navigation | **None** | Hairline right edge |
| Top bar | **None** | Hairline bottom edge, including when content scrolls beneath |
| Bounded exception | **None** | In the plane, defined by its border |
| Failure block | **None** | In the plane |
| Inspection panel, in flow | **None** | Hairline left edge |
| **Inspection panel, overlaying** | **Yes** | Genuinely above the plane |
| **Dropdown** | **Yes** | Above the plane |
| **Popover** | **Yes** | Above the plane |

**`elevation.overlay`** — a single soft, low-opacity shadow whose only job is to
say *this is above the page*. Its purpose is functional separation, never
"modern".

**No elevation is ever used for grouping, emphasis, or importance.** Those are
space, type and the boundary rule.

---

## 15. Control geometry

| Control | Height | Horizontal padding | Notes |
|---|---|---|---|
| Primary button | **36** | 16 | 14px/500, `radius.control` |
| Secondary button | **36** | 16 | 1px border |
| Text button | **28** | 8 | Target extended to 40 via margin |
| Input (default) | **36** | 12 | |
| Search (compact) | **32** | 12 | Fits the 48px bar with 8 above/below |
| Textarea | auto | 12 | 8 vertical padding; max 8 rows |
| Radio / checkbox | **16** control | — | Row target 32; 8 to its label |
| Navigation row | **32** | 12 | |
| Filter control | **28** text | 0 | 20 between filters |
| List / table row | **42** | 0 | 10 vertical padding |

### Accessibility versus density

**Target sizes are met without inflating visual height.** The AA requirement is
24×24; AAA is 44×44. Our 36px controls and 42px rows clear AA comfortably.
Text buttons at 28px visual height carry invisible margin to a 40px target.

**Nothing is 44–48px tall.** Uniform 48px controls would cost roughly 30%
vertical density on the queue, which directly opposes "the operator should be
able to count the queue without scrolling."

**Alignment:** all controls in a row share a baseline where they contain text,
and a vertical centre where they do not. Action rows are left-aligned at the
content edge — never centred, never right-aligned.

---

## 16. Navigation geometry

| Element | Value |
|---|---|
| Width | **216** |
| Right edge | 1px `border.default` |
| Brand area | 48 tall, 24 left gutter — aligns with the top bar |
| Brand → first item | 24 |
| Item height | **32** |
| Item padding | 12 horizontal, inside a 192 track (12 inset each side) |
| Item → item | 0 |
| Section separation | 20 above, 20 below a 1px rule inset 24 |
| **Active indicator** | 2px left marker, 16 tall, vertically centred, at the track's left edge — **plus** `text.primary` and weight |
| Icon allowance | 16 icon + 8 gap, reserved. Adding icons later costs no reflow. |
| Footer note | 24 from the bottom |

**The navigation recedes** by three means: inactive items sit at
`text.secondary` and context items at `text.tertiary`; nothing in it is ever
blue except a focus ring; and at 216px it occupies 15% of a 1440 viewport
against the content's 82%.

---

## 17. Density modes

**No. One density.**

The product already varies density by function — scanning surfaces are dense,
decision surfaces are spacious — which is a better answer than a global toggle
that compresses everything uniformly, including the decision the operator most
needs room to think about.

A density setting would also double the QA surface for every screen, and
signals that the default was never resolved. It was.

---

## 18. Responsive architecture

Desktop is primary. This is **graceful contraction**, not a second product.

| Viewport | Content | Nav | Rail | Exception Detail panel | Table |
|---|---|---|---|---|---|
| **≥1600** | 1256 | 216 | Beside | In flow | All columns |
| **1440** | 1176 | 216 | Beside | In flow | All columns |
| **1360** | 1096 | 216 | **Beside (last)** | **In flow (last)** | All columns |
| **1280** | 1016 | 216 | **Stacked** | **Overlays** | All columns |
| **1024** | 760 | 216 | Stacked | Overlays, surface → 440 | All columns |
| **<1024** | fluid − 48 | 216 → horizontal at 768 | Stacked | Overlays full width | Rows wrap to 2 lines |
| **<768** | fluid − 32 | **Horizontal strip** | Stacked | Full-width sheet | Rows wrap |

### The single breakpoint that matters

**1360.** Above it the rail and the inspection panel sit beside their content.
Below it both move out of the way. One number governs both compositions,
because both are 800 + 56 + 320.

### What happens to each element

- **Rail** stacks below the primary column, full width, retaining its internal rhythm. The 72px offset is dropped — it exists only to manage a side-by-side glance.
- **Navigation** holds at 216 down to 768, then becomes a horizontal scrolling strip. It never becomes a hamburger.
- **Table columns** are all retained down to 880. Below that the row wraps to two lines — identity/value/time, then description. **No column is ever dropped**; a record that hides data is not a record.
- **Exception Detail inspection** moves from in-flow to a non-dimming right overlay; the decision surface narrows to 440 to stay clear of it.
- **Activity timestamps** keep their 68px column at every width. The column is the thing that makes it a record; it is never collapsed into the sentence.

---

## 19. Alignment rules

| Content | Alignment | Notes |
|---|---|---|
| Money | **Right**, tabular | Always, in every column |
| Percentages | **Right**, tabular | Same column and unit as the value they compare against |
| Timestamps (clock) | **Right**, tabular | Fixed 68px column in the trace |
| Elapsed time | **Right**, tabular | Right edge of its row |
| Customer names | **Left** | First column, the scan target |
| Status / state | **Left** | It is a phrase, not a token |
| Actions | **Left**, at the content edge | Never centred, never right |
| Table values | Left, except numerics | |
| Decision math labels | **Left** | |
| Decision math values | **Right**, one shared column | This is what makes 13.3% and 5.0% comparable |

**Nothing is centre-aligned.** Not headings, not empty states, not action rows,
not page titles. Centre alignment destroys the left-edge scan anchor that every
list in this product depends on, and it is the single strongest signal of a
marketing layout.

**One numeric column per block.** Dollars and percentages that must be compared
share a column and are right-aligned within it — the geometric half of the
typography system's tabular-figures rule.

---

## 20. Whitespace anti-patterns

Rejected:

- **Hero-scale gaps.** Nothing above `space.major` (56) exists.
- **64–80px section separation.** Sections are 32.
- **Card grids.** No repeating bounded surfaces, ever.
- **Centred dashboard content.** Content is centred as a *composition*; its internal alignment is always left.
- **Giant page titles.** Type ceiling is 24px (typography system).
- **Full-width prose.** No text block exceeds ~515px.
- **Random padding.** Eight values exist; nothing else is permitted.
- **Different padding for equivalent structures.** All list rows are 10 vertical. All bounded surfaces are 24/16. No exceptions per screen.
- **Over-compressed tables.** Row height 42, body 14px. Density comes from removing chrome, not from 11px text.
- **Floating islands on ultra-wide.** The 1600 step and the 216px nav keep occupancy above 77% at 1920.
- **Space added to fill a viewport.** A short page stays short.

---

## 21. Geometry tokens

```
space.micro            2
space.tight            4
space.inline           8
space.control          12
space.related          16
space.group            24
space.section          32
space.major            56

layout.nav.width       216
layout.topbar.height   48
layout.gutter          24
layout.content.max     1176
layout.content.max.wide 1256
layout.primary.max     800   (880 wide)
layout.rail.width      320
layout.rail.offset     72
layout.reading.max     760
layout.register.max    980
layout.coach.max       720
layout.breakpoint.rail 1360

radius.control         6
radius.interruption    8
radius.selection       4

border.hairline        1
border.focus.width     2
border.focus.offset    2

control.height.default 36
control.height.compact 32
control.height.text    28
control.row.height     42
control.nav.height     32
control.target.min     40

elevation.overlay      (single token, overlays only)
```

**Semantic, not scalar.** `space.section` says what it is for; `space-8` would
not. The one place numbers survive is the raw scale, where the name *is* the
size relationship.

---

## 22. Screen geometry table

| | Max width | Column structure | Major gaps | Section spacing | Special rules |
|---|---|---|---|---|---|
| **Mission Control** | 1176 / 1256 | Primary 800 + 56 + rail 320 | 56 primary↔rail | 32 | Rail offset 72; rail stacks <1360; exactly one bounded surface |
| **Exceptions** | 980 | 5 columns: 132 / 72 / flex / 150 / 116, gap 16 | 16 column gap | 24 above the header | Row 42; truncation only on the description; no column ever dropped |
| **Exception Detail** | 1176 | Surface 800 + 56 + slot 320 | 56 surface↔slot; 48 workspace | 24–32 | Slot reserved when closed; math and policy adjacent; only editable elements bounded |
| **Activity Trace** | 760 | Time 68 + 16 + spine + 20 + content 560 | 16 between beats | 24 above a day label | Interruptions break to full 760; timestamp column never collapses |
| **Agent Coach** | 720 | Single column; boundary splits 336 + 48 + 336 | 48 boundary columns | 24–32 | Boundary is the only full-width block; guidance caps at 8 rows |

---

## 23. Final system test

### A · Mission Control at 1920 with 3 exceptions

Content 1256, centred, 200 surplus each side beyond the gutters. Nav plus
content occupy 77%. The exception block is 880 wide; its interior two columns
have room to spare. The queue is three rows — the page is roughly 700px tall
and simply ends.

**Coherent.** The short page is the point: little to do should look like little
to do. Nothing stretches to fill the viewport, and nothing is centred to
disguise the emptiness.

### B · Mission Control at 1280 with 8 exceptions

Below 1360, so the rail stacks. Primary takes the full 1016. Exception block
~293 tall, 8 rows × 42 = 336, plus statement, labels and the Coach entry ≈
1000px of content.

**Coherent, with an expected consequence:** the rail falls below the fold. That
is correct — "What ran without you" is tier 2, and the queue is tier 4. The
operator sees all eight items and the expanded decision first.

### C · Sarah Exception Detail with conversation open

At 1440 the panel occupies its reserved 320 slot. **The decision surface does
not move** — that is the entire reason the slot is reserved. Edited amount,
edited message and scroll position all persist.

At 1280 the panel overlays from the right without dimming, and the surface
narrows to 440. Prose at 440 is ~58ch, still within the readable range; the
decision math at 276 is unaffected.

**Coherent at both.** No behaviour changes; only the panel's relationship to
the flow.

### D · Marcus Activity Trace with the JobNimbus failure expanded

Ordinary beats occupy 560px starting at x = 104. The failure block breaks to
the full 760 starting at x = 0 — a 104px leftward jump plus a border. Its
internal sub-sections (*Why · What this means · What still works*) are stacked
at 62ch with 16 between; remedies are 16 apart with the primary action
left-aligned.

The block runs roughly 480px tall, which is long. **It stays coherent** because
it is the only full-width element and the spine visibly stops at its top edge
and resumes below.

### E · Coach Improvement Review with long edited guidance

The textarea grows to a maximum of 8 rows (~190px) and then scrolls internally.

**This is the one case where geometry needed a rule rather than a value.**
Without the cap, a long edit pushes the boundary — the declared centre of
gravity — below the fold, and the page silently stops making its own argument.
The cap is a layout constraint on a container; the guidance text itself is
untouched, fully editable and fully scrollable.

**Coherent.** Boundary, scope and approval all stay within roughly 900px of the
page top regardless of how much the operator types.

### What no test required

**No product behaviour was changed to solve a layout problem.** The two
adjustments made — the rail breakpoint moving from 1200 to 1360, and the
guidance field capping at 8 rows — are both geometric constraints on
containers. No route, no state, no copy and no interaction was altered.
