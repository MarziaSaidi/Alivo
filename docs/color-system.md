# Alivo Mission Control — Product Colour System

**Status:** Proposed. Colour only.
**Subordinate to:** `docs/ux-spec.md`, `docs/visual-direction.md`,
`docs/brand-foundation.md`, `docs/typography-system.md` — all frozen.

No spacing, radius, shadows, motion, CSS or code. Every contrast figure below
was computed, not estimated.

---

## 1. Colour thesis

Colour in Mission Control communicates **affordance or failure, and nothing
else**. The product's hierarchy is carried by typography, structure and space;
colour arrives last and carries the smallest possible number of meanings. Alivo
blue means one thing — *you can act on this* — and appears on perhaps three
elements per screen. A single authored red means one thing — *this is broken* —
and on a healthy day appears nowhere at all. Everything else is a compressed
neutral ramp, where a value's position in that ramp reflects how much attention
it deserves. There is no colour for success, no colour for waiting, and no
colour for "AI did this", because in an operational record those states are
normal, and normal is unmarked. The measure of this system is that a screen
where the operation is healthy should be almost entirely neutral.

---

## 2. Resolving the three blues

### The evidence

| Blue | Source | On canvas `#FCFCFD` | White text on it | Verdict |
|---|---|---|---|---|
| **`#2563FF`** | Current site `--blue` | **4.75 : 1 PASS** | **4.88 : 1 PASS** | Viable both ways |
| `#1179FC` | Legacy `--theme-color-01` | **3.97 : 1 FAIL** | **4.07 : 1 FAIL** | Fails AA in both roles |
| `#2C67F6` | Sampled from `Logo_Blue.png` | 4.68 : 1 PASS | 4.80 : 1 PASS | Viable, marginally weaker |

### Assessment

**`#2563FF` — the current public brand blue.**
*Brand relationship:* the value Alivo actually ships across every marketing
surface — CTAs, links, headline emphasis, nav, agent labels. Maximum
recognition.
*Readability:* highest contrast of the three in both directions.
*Interaction suitability:* works as a fill with white text and as text on the
canvas. The only one of the three that does both.
*Character:* a saturated, confident, slightly violet-leaning blue. Modern
without being novel.
*Overuse risk:* **high — and this is the real danger.** On alivo.ai it means
brand, link, emphasis, active nav *and* agent identity. Our system must
deliberately narrow it.

**`#1179FC` — the legacy theme blue.**
*Brand relationship:* from an older token set; not used in current marketing.
*Readability:* **fails WCAG AA at 4.07 : 1** as text on a light canvas, and
**fails at 4.07 : 1** for white text on a fill. It cannot legally serve either
primary role in an accessible product.
*Character:* lighter, cyan-leaning, softer.
*Verdict:* unusable.

**`#2C67F6` — the logo asset blue.**
*Brand relationship:* the actual pixels inside the logo PNG.
*Readability:* passes, but ~2% behind `#2563FF` in both roles.
*Character:* visually indistinguishable from `#2563FF` at interface scale.
*Overuse risk:* it does not need a UI role — it already has the most important
one.

### Decision

| Role | Blue |
|---|---|
| **Canonical product interaction blue** | **`#2563FF`** |
| **Logo-only blue** | `#2C67F6` — lives inside the logo asset. Never reproduced in UI. |
| **Deprecated / unsupported** | `#1179FC` — fails AA. Must not appear anywhere. |

**Why not the logo blue.** The logo is a fixed raster asset with its own
internal colour; nothing in the interface needs to match it, and at interface
scale the two are indistinguishable. Choosing the marketing blue gives better
contrast and matches what Alivo's customers already see everywhere else. **The
logo blue does not have to become the UI blue, and here it should not.**

### One necessary derivation

`#2563FF` as *text* on canvas is 4.75 : 1 — passing, but thin under zoom and
sunlight. Filled controls therefore use the brand blue; **blue text uses one
darker step of the same hue.**

| Token | Value | Use | Contrast |
|---|---|---|---|
| `action.primary` | `#2563FF` | Filled control backgrounds | white on it **4.88** |
| `action.primary.hover` | `#1E52E0` | Hover on filled controls | white on it **6.29** |
| `action.primary.pressed` | `#173FB0` | Pressed | white on it **8.84** |
| `text.interactive` | `#1D4FD8` | Link and interactive text | on canvas **6.48** |

This is a tint ramp of one hue, not a second brand blue.

---

## 3. Surface system

**Records, not cards.** Most information sits directly on the canvas. There are
five surfaces, and three of them exist only for interaction states.

| Token | Value | Purpose |
|---|---|---|
| `surface.canvas` | `#FCFCFD` | The page. Almost all content sits here with no surface of its own. |
| `surface.input` | `#FFFFFF` | Editable fields only |
| `surface.subtle` | `#F4F5F7` | Rare grouping where space cannot do the job |
| `surface.hover` | `#F1F2F5` | Row hover |
| `surface.selected` | `#EEF2FE` | Selected row or active filter |

### Two deliberate decisions

**The canvas is not pure white.** `#FCFCFD` is a fractional step down — enough
to give the page a matte, paper-like quality and to let editable fields be
*whiter than the page*.

**Editable fields are lighter than the canvas, not darker.** On a paper
metaphor an input is the blank space you write into. This gives editability a
physical affordance and lets input borders stay very quiet. It also directly
serves the typography spec's rule that editable controls are one of the only
four things permitted a boundary.

**The interrupting surface has no fill.** The bounded exception block and the
failure block are defined by `border.strong` alone. Giving them a tint would
make them cards, and the container's meaning — *the normal flow has stopped* —
depends on them not being cards.

**There is no raised surface and no elevation colour.** Inspection panels are
separated by a hairline, not by a shadow or a tint.

---

## 4. Text colour system

A cool slate ramp. The hue continues Alivo's own `--muted` (`#94A3B8`, blue-
tinted) while correcting its contrast — see the note below.

| Token | Value | On canvas | Use |
|---|---|---|---|
| `text.primary` | `#14161A` | **17.67 : 1** | Customer names, decisions, consequential beats, money under decision, policy |
| `text.secondary` | `#4A525E` | **7.70 : 1** | Body, quiet beats, supporting prose |
| `text.tertiary` | `#5C6673` | **5.68 : 1** | Metadata, timestamps, labels, historical content |
| `text.disabled` | `#9AA2AE` | 2.51 : 1 | Disabled controls only — see §16 |
| `text.inverse` | `#FFFFFF` | on blue **4.88 : 1** | Text on filled controls |
| `text.interactive` | `#1D4FD8` | **6.48 : 1** | Links and interactive text |
| `text.failure` | `#A3301F` | **6.83 : 1** | Failure statements only |

**Every text level except `disabled` clears WCAG AA for normal text.** The
quiet tier is a *dimmer accessible value*, never a sub-AA grey. This is the
typography spec's "quiet must not become faint" made numeric.

**Adapting a brand value rather than accepting poor contrast.** Alivo's
`--muted #94A3B8` is 2.8 : 1 on a light canvas and fails badly. Rather than
ship it, the role was adapted: our tertiary keeps the cool slate *character* of
Alivo's muted grey at a value that actually passes. The brand feeling survives;
the failing number does not.

**No success or warning text colour exists.** See §9 and §10.

---

## 5. Borders and dividers

This interface leans on structure, so borders must be disciplined or they
become the card soup we rejected.

| Token | Value | Use |
|---|---|---|
| `border.quiet` | `#EDEEF1` | Row dividers in lists and traces. Reads as texture, not structure. |
| `border.default` | `#E3E5EA` | Section dividers, column-header rules, the ledger rule |
| `border.strong` | `#C9CDD6` | **Interrupted-record boundary only** — the bounded exception and failure blocks |
| `border.input` | `#D3D7DF` | Editable field edges |
| `border.focus` | `#2563FF` | Focus ring |
| `border.failure` | `#E8C4BC` | Failure block edge — decorative reinforcement only, never the sole signal (1.57 : 1) |

### Rules

- **Three weights, no more.** Quiet for rhythm, default for separation, strong for interruption.
- **`border.strong` is reserved.** If it appears anywhere other than an interruption, the interruption stops meaning anything.
- **Never box a section.** Sections are separated by a single top rule and space. No section has four sides.
- **Row dividers are inset** where rows belong to one list, full-bleed where they separate different things.

---

## 6. Interaction blue — where it may and may not appear

### Permitted

| Element | Treatment |
|---|---|
| Primary action / commit control | `action.primary` fill, `text.inverse` label |
| Text link | `text.interactive` |
| Active navigation item | `text.primary` + weight. **Blue optional as a marker only**, never as the label colour |
| Focus ring | `border.focus`, offset outside the control |
| Selected radio / checkbox | `action.primary` |
| Focused input border | `border.focus` |
| Selected row or active filter | `surface.selected` + `text.primary` |
| Expansion affordance (trace `+`) | `text.tertiary` at rest, `text.interactive` on hover |
| Search focus | `border.focus` |

### Forbidden

| Never blue | Why |
|---|---|
| Normal AI activity | Alivo's routine work is unmarked. Blue would mark everything. |
| Customer names | A person is not a link. |
| Money, percentages, any figure | Figures are never coloured — typography spec §5. |
| Normal status (*Running*, *Resolved*) | Normal is unmarked. |
| Historical metrics (*What ran without you*, *This week*) | Low obligation, therefore neutral. |
| Headings of any kind | Decoration. |
| AI suggestions, merely for being AI | The single most tempting mistake in this product. A suggestion is provisional *typography*, not a colour. |
| Agent identity | Alivo's marketing colours agent labels blue. We do not. |

**The rule:** blue answers *"can I act on this?"* — never *"what is this?"* and
never *"who did this?"*

**Budget:** no screen should carry more than **three blue elements** in a
resting state. On Mission Control that is realistically one — the `Open`
control — plus a focus ring when keyboard is in use.

---

## 7. Human attention

### Does it need a dedicated hue? **No.**

The brief permits this conclusion and the evidence supports it.

Human obligation is already expressed by four stronger mechanisms, established
in the approved direction and typography: **isolation** (the decision is the
only bounded element on the screen), **weight** (400 → 500 on the subject),
**size** (14 → 15–17px at tier 4), and **a live elapsed clock** that nothing
else has.

Adding a hue would introduce a fifth signal that duplicates four existing ones,
spend contrast budget the system deliberately conserves, risk collision with
Alivo's own per-agent colour system, and fail exactly where it matters most —
outdoors, on a phone, for a colour-blind operator.

### What colour *does* contribute

**Position in the neutral ramp, not hue.**

| State | Colour contribution |
|---|---|
| **Needs your decision** | Content at `text.primary` — the top of the ramp. Nothing else on the screen sits there. |
| **Needs attention** | `text.primary` for the statement, `text.tertiary` for its metadata |
| **Waiting on you** | Elapsed time at `text.tertiary`. **No hue, no pulse, no colour change as it grows.** |
| **Human acted** | `text.primary` on the subject, attribution line at `text.tertiary` |
| **Human-owned item** | No colour. Ownership is stated in words. |

**The elegant consequence, restated from the brand foundation:** the commit
control is blue because it is *interactive*, not because it *needs you*. Blue
therefore lands beside the human decision without ever meaning it. Obligation
is carried by structure; affordance is carried by blue. The two meanings never
touch.

---

## 8. Failure

### The colour

**`#A3301F` — an oxide red.** Deliberately authored: deeper, browner and more
controlled than Tailwind's `#EF4444`, which reads as a web alert. This reads as
a mark made in a ledger.

| Pairing | Contrast |
|---|---|
| Failure text on canvas | **6.83 : 1 PASS** |
| Failure text on failure surface | **6.42 : 1 PASS** |
| White on failure fill | **7.00 : 1 PASS** |
| Primary text on failure surface | **16.62 : 1 PASS** |

### The family

| Token | Value | Use |
|---|---|---|
| `state.failure` | `#A3301F` | The failure statement line, and only that |
| `state.failure.surface` | `#FDF3F1` | An optional, very faint wash behind a failure block |
| `state.failure.border` | `#E8C4BC` | The failure block edge, reinforcing `border.strong` |

### Rules

**Failure colour marks the statement, not the block.** In Marcus's failure the
sentence *"JobNimbus did not accept the change"* is `state.failure`. The
explanation (*Why · What this means · What still works*) stays neutral —
`text.primary` and `text.secondary`. **The remedy is neutral.** The primary
remedy control is `action.primary` blue, because it is an action.

**Structure does the interrupting; colour confirms it.** The block already
breaks the measure and carries `border.strong`. Remove all colour and the
failure is still unmistakable. That is the test.

**No failure icon.** Our direction rejects an icon per state. If one is ever
introduced it must be a single mark used nowhere else, and never the only
signal.

**Covers:** JobNimbus sync failure, scheduling failure, an agent unable to
complete an action, critical external-system interruption. All four are the
same state — *something is broken* — and take the same treatment.

**Does not cover:** an agent stopping correctly for human approval. That is the
product working, is tier 4 not tier 5, and receives **no failure colour at
all.** Confusing the two would teach the operator that correct AI behaviour
looks like breakage.

---

## 9. Warning / caution — **omitted**

**Mission Control has no meaningful state between normal and failure.**

The candidates were examined:

| Candidate | Actual state |
|---|---|
| *Needs attention* (JobNimbus, 3 records) | A failure, narrower in scope. Same family. |
| *Waiting on you* | Not a warning. An obligation, carried by structure. |
| *Couldn't reach JobNimbus, still trying* | Deliberately **quiet** — the UX spec requires transient failures to retry without an interruption block. |
| Elapsed time growing | Must not change appearance as it grows. |

**No amber. No caution hue.** A warning colour would be added only because
design systems usually contain one, which the brief explicitly cautions
against. If a genuine intermediate state is discovered later it can be added
deliberately — but it does not exist today.

---

## 10. Success / healthy — **omitted**

**Success is the absence of failure, expressed neutrally.**

| State | Treatment |
|---|---|
| Running | `text.tertiary`. A sentence, not a chip. No green dot. |
| Everything worked | `text.primary` statement. No colour. |
| Resolved | `text.secondary`, receding. No colour. |
| Self-resolved | `text.tertiary`, lowest tier. No colour. |
| Sync succeeded | Neutral confirmation inside the beat. No colour. |
| Guidance approved | `text.primary` statement. No colour, no celebration. |

**Why no green.** These are the most common states in the product. Colouring
them would mean the healthy screen — the one we want almost silent — becomes
the most colourful. That inverts the entire thesis. It also makes the operator
scan for green, when the thing worth scanning for is its absence.

**Green earns no place.** Not in the operating statement, not on the status
dot, not on resolved rows, not on approval. If a future state genuinely needs
*positive confirmation the user must find*, it will be argued for then.

**The status dot.** `● Running` keeps a neutral mark at `text.tertiary`. When
the system is degraded the sentence itself changes and `state.failure` appears
on it. **Only deviations get a marker.**

---

## 11. Agent Coach

| Element | Colour |
|---|---|
| Observed pattern | `text.primary` title, `text.secondary` observation lines |
| Historical evidence (3 examples) | Customer `text.primary`; question `text.secondary`; **answer `text.tertiary`** |
| Suggested guidance (editable) | `surface.input` on `border.input`; text `text.secondary` |
| **What would change** | Heading `text.primary`; content **`text.primary`** |
| **What would not change** | Heading `text.primary`; content **`text.primary`** |
| Approval control | `action.primary` |
| Approved state | `text.primary` statement. **No green.** |
| Dismissal control | `text.secondary`, no fill |
| Dismissed state | `text.secondary`, kept in history |
| Active guidance | `text.primary` |
| Turned-off guidance | `text.tertiary` — recedes, never deleted |

**The boundary stays structural.** Both columns use the *same* colour —
`text.primary` at 15px — and are separated by rules above and below plus their
headings. They are the only body text on the page above 14px, which is what
makes them dominant.

**Explicitly rejected: green/red comparison columns.** "What would change" is
not good news and "what would not change" is not bad news. They are two halves
of one boundary, and colouring them as opposites would misrepresent the
decision. The three evidence blocks recede beneath them by contrast alone —
`text.tertiary` answers under `text.primary` boundary content.

---

## 12. Activity Trace

| Element | Colour |
|---|---|
| Day label | `text.tertiary` |
| Timestamp column | `text.tertiary` |
| Normal Alivo event | `text.secondary` |
| Consequential Alivo event | `text.primary` |
| Consequence lines | `text.tertiary` |
| Customer event | `text.primary` subject; quoted words `text.tertiary` behind `border.quiet` |
| External-system event | `text.primary` subject (a proper noun) |
| Human action | `text.primary` subject; attribution `text.tertiary` |
| Quiet historical event | `text.tertiary` |
| Quiet period (*quiet for 4 days*) | `text.tertiary`, dashed `border.quiet` |
| **Human-required interruption** (*Alivo stopped*) | `border.strong`, no fill, content `text.primary`. **No hue.** |
| **Failure** | `border.strong` + `border.failure`; statement `state.failure`; explanation neutral |
| **Resolved failure** | Collapses to `text.tertiary`. **Failure colour is removed on resolution** — it is history, not an active problem. |

**No rainbow actor coding.** All four actors use the same neutral ramp. The
distinction is weight on the sentence subject and the presence of an
attribution line — typography, not colour. Alivo's own five-hue agent palette
is deliberately not carried over.

---

## 13. Exception Detail

| Element | Colour |
|---|---|
| Customer identity | `text.primary` |
| Potential job value | `text.primary` |
| "potential job" qualifier | `text.tertiary` |
| Register labels | `text.tertiary` |
| The ask sentence | `text.secondary` |
| **Decision math — labels** | `text.tertiary` |
| **Decision math — quote, competitor, difference** | `text.secondary` |
| **Decision math — required 13.3%** | **`text.primary`, weight 500** |
| **Decision math — allowed 5.0%** | **`text.secondary`, weight 400** |
| Ledger rule | `border.default` |
| Known facts | `text.secondary` |
| Unknown facts | `text.tertiary` |
| Pricing policy | `text.secondary` — **policy is never dimmed to tertiary** |
| Alivo suggestion — amount | `text.primary` in `surface.input` |
| Alivo suggestion — message | `text.secondary` in `surface.input` |
| Historical context | `text.tertiary` |
| Decision options | `text.secondary`; selected `text.primary` |
| **Primary commit action** | `action.primary` + `text.inverse` |
| Secondary actions | `text.secondary` |

### 13.3% versus 5% without red and green

The conflict is legible through **four non-chromatic signals stacked**: the two
values sit in **the same column** in **the same unit**, on **adjacent rows**,
separated only by **one contrast step and one weight step** — `text.primary` /
500 against `text.secondary` / 400.

Red and green would be actively wrong here. 13.3% is not "bad" and 5% is not
"good" — one is what the customer asked for and the other is what the company
permits. That is a *comparison*, not a judgement, and colour would editorialise
a decision that belongs to the operator.

---

## 14. Mission Control

| Element | Colour |
|---|---|
| Navigation — inactive | `text.secondary` |
| Navigation — active | `text.primary` + weight |
| Navigation — context items (Customers, Agents) | `text.tertiary` |
| Brand wordmark | `text.primary` |
| Search field | `surface.input`, `border.input`; focus `border.focus` |
| `● Running` | mark and label `text.tertiary` |
| `3 need you` | `text.secondary` |
| **Operating statement** | `text.primary` |
| Coverage line | `text.tertiary` |
| **Expanded exception** | `border.strong`, **no fill**; customer and money `text.primary`; math per §13; `Open` = `action.primary` |
| `Reassign` | `text.secondary` |
| Also waiting — subject | `text.primary` |
| Also waiting — value, need | `text.secondary` |
| Also waiting — elapsed | `text.tertiary` |
| `That's everything.` | `text.tertiary` |
| Agent Coach entry | `text.secondary`, link `text.interactive` |
| What ran without you | figures `text.primary`, labels `text.secondary` |
| This week | `text.secondary` |

**The healthy Mission Control screen contains exactly one blue element** — the
`Open` control — and no other hue anywhere. A page full of AI activity is
almost entirely neutral, which is the thesis made visible.

---

## 15. Status model

| State | Semantic colour | Treatment |
|---|---|---|
| Normal | **None** | Neutral, unmarked |
| Running | **None** | `text.tertiary` sentence |
| Waiting | **None** | `text.tertiary` elapsed time; obligation carried by structure |
| Needs decision | **None** | `text.primary` + isolation + `border.strong` |
| Needs attention | **None** | `text.primary` statement, in flow |
| **Failed** | **`state.failure`** | Statement only; explanation neutral |
| Resolved | **None** | `text.secondary`, receding |
| Self-resolved | **None** | `text.tertiary`, lowest tier |
| Approved | **None** | `text.primary` statement |
| Turned off | **None** | `text.tertiary`, record retained |
| Disabled | **None** | `text.disabled` + a non-colour signal |
| Interactive / actionable | **`action.primary`** | Fills, focus, links |

**Two semantic colours in the entire product.** Eleven of twelve states receive
no hue at all.

---

## 16. Accessibility — verified

All figures computed against `surface.canvas #FCFCFD`.

| Pairing | Ratio | AA |
|---|---|---|
| `text.primary` / canvas | **17.67 : 1** | PASS |
| `text.secondary` / canvas | **7.70 : 1** | PASS |
| `text.tertiary` / canvas | **5.68 : 1** | PASS |
| `text.primary` / `surface.input` | **18.11 : 1** | PASS |
| `text.secondary` / `surface.subtle` | **7.24 : 1** | PASS |
| `text.tertiary` / `surface.selected` | **5.21 : 1** | PASS |
| `text.interactive` / canvas | **6.48 : 1** | PASS |
| `text.inverse` / `action.primary` | **4.88 : 1** | PASS |
| `state.failure` / canvas | **6.83 : 1** | PASS |
| `state.failure` / `state.failure.surface` | **6.42 : 1** | PASS |
| `border.focus` / canvas (non-text, ≥3) | **4.75 : 1** | PASS |
| `text.disabled` / canvas | 2.51 : 1 | **Exempt** |

### Three findings requiring rules

**1 · The focus ring fails on a blue button.** `border.focus` against
`action.primary` is 1.00 : 1 — identical colours. **Rule: the focus ring always
sits outside the control with a canvas-coloured offset**, so it contrasts
against the page (4.75 : 1) rather than against the control. No control may
carry an inset focus ring.

**2 · `text.disabled` does not meet AA.** WCAG exempts disabled controls, but
**disabled state may never be signalled by colour alone** — it must also carry
reduced opacity on any icon, a removed affordance, and a programmatic disabled
attribute.

**3 · `border.failure` is decorative only** at 1.57 : 1. It reinforces; it
never signals. Failure remains legible with every border removed.

### Carried from the typography system

12px floor · 14px body · tabular figures · rem sizing surviving 200% zoom ·
underline plus focus ring on links, never colour alone. **Colour is never the
only signal for any state in this product.**

---

## 17. Dark mode

**Not designed here.** The question is only whether the architecture can
support one later. **It can**, for three reasons:

Every token is named by **meaning, not by lightness** — `surface.canvas`, not
`gray-50`. Inverting the system means re-pointing values, not renaming tokens
or touching components.

**Only two hues carry semantics.** A dark theme requires new values for blue
and failure and a re-pointed neutral ramp — roughly fifteen values, not a
second system.

**Nothing depends on a light-specific effect.** No shadows, no elevation
colour, no tinted cards, no gradients.

**Two known obstacles, recorded not solved.** `action.primary #2563FF` on a
dark navy canvas will need verification and probably a lighter step; and
`state.failure #A3301F` is too dark for a dark surface and will need a lighter
counterpart. **The token set is not doubled in this phase.**

---

## 18. Colour anti-patterns

Rejected without exception:

- **Purple AI gradients** · **blue-glow AI elements** (Alivo's own `--blue-glow` is explicitly not carried over) · **rainbow agent colours** (Alivo's five-hue `--agent-0x` palette is not carried over)
- **Green because something succeeded** — success is the absence of failure
- **Red because something needs attention** — red means broken, never busy
- **Amber because something waits** — no warning hue exists
- **Blue customer names** · **blue financial values** · **blue AI suggestions**
- **Tinted dashboard cards** · **coloured KPI tiles** · **status-pill rainbow**
- **Low-contrast grey text** — every text tier clears AA
- **Decorative gradients** of any kind
- **Colour as the only signal** for any state
- **Tailwind default semantic values** — `#EF4444`, `#10B981`, `#F59E0B` are framework defaults, not authored decisions
- **A colour per agent** · **a colour per actor** · **a colour per event type**

---

## 19. Token architecture

Semantic names only. No palette positions.

```
surface.canvas              the page
surface.input               editable fields
surface.subtle              rare grouping
surface.hover               row hover
surface.selected            selected row / active filter

text.primary                obligation, identity, decisions
text.secondary              body and supporting prose
text.tertiary               metadata, timestamps, history
text.disabled               disabled controls only
text.inverse                on filled controls
text.interactive            links
text.failure                failure statements

border.quiet                row rhythm
border.default              section separation, ledger rule
border.strong               interrupted record — reserved
border.input                editable field edge
border.focus                focus ring
border.failure              failure reinforcement

action.primary              filled control background
action.primary.hover
action.primary.pressed
action.onPrimary            → resolves to text.inverse

state.failure               the one authored semantic hue
state.failure.surface
state.failure.border
```

**Deliberately absent:** `state.success`, `state.warning`, `state.info`,
`state.attention`, any `agent.*`, any `actor.*`, any elevation token.

---

## 20. Canonical table

| Token | Value | Purpose | Allowed | Forbidden |
|---|---|---|---|---|
| `surface.canvas` | `#FCFCFD` | The page | Every screen background | Never tinted per section |
| `surface.input` | `#FFFFFF` | Editable fields | Inputs, textareas | Never for grouping or cards |
| `surface.subtle` | `#F4F5F7` | Rare grouping | Where space cannot group | Never as a card fill; never nested |
| `surface.hover` | `#F1F2F5` | Row hover | List and trace rows | Never a resting state |
| `surface.selected` | `#EEF2FE` | Selection | Selected row, active filter | Never to mark importance |
| `text.primary` | `#14161A` | Top of ramp | Customer identity, decisions, consequential beats, policy, decision money | Never for routine AI activity |
| `text.secondary` | `#4A525E` | Body | Prose, quiet beats, resolved items | Never for metadata |
| `text.tertiary` | `#5C6673` | Quiet | Metadata, timestamps, labels, history, self-resolved | Never for content a decision depends on |
| `text.disabled` | `#9AA2AE` | Disabled | Disabled controls | Never as the sole signal; never for de-emphasis |
| `text.inverse` | `#FFFFFF` | On fills | Text on `action.primary` / failure fill | Never on a light surface |
| `text.interactive` | `#1D4FD8` | Links | Text links, hovered affordances | Never on names, figures or headings |
| `text.failure` | `#A3301F` | Failure text | The failure statement | Never on explanation, remedy or history |
| `border.quiet` | `#EDEEF1` | Rhythm | Row dividers | Never as a container edge |
| `border.default` | `#E3E5EA` | Separation | Section rules, ledger rule, column headers | Never four-sided |
| `border.strong` | `#C9CDD6` | **Interruption** | Bounded exception, failure block | **Never anywhere else** |
| `border.input` | `#D3D7DF` | Field edge | Inputs | Never on static content |
| `border.focus` | `#2563FF` | Focus | Focus ring, **outside the control with offset** | Never inset on a blue fill |
| `action.primary` | `#2563FF` | Affordance | Commit control, primary remedy, selected radio | Never on names, figures, status, headings, AI output |
| `action.primary.hover` | `#1E52E0` | Hover | Filled control hover | — |
| `action.primary.pressed` | `#173FB0` | Pressed | Filled control pressed | — |
| `state.failure` | `#A3301F` | Broken | Failure statement, failure fill | Never for *needs a decision*; never for a correct escalation |
| `state.failure.surface` | `#FDF3F1` | Failure wash | Optional behind a failure block | Never on a row or a whole screen |
| `state.failure.border` | `#E8C4BC` | Reinforcement | Failure block edge | Never the sole signal |
| *logo blue* | `#2C67F6` | **Inside the logo asset only** | The logo PNG | Never reproduced in UI |
| *legacy blue* | `#1179FC` | **Deprecated** | Nothing | **Fails WCAG AA. Never use.** |

```
Hues in the system     2   (Alivo blue, oxide red)
Neutral text steps     4   (+ inverse, + disabled)
Surfaces               5   (3 are interaction states)
Border weights         3   (+ input, focus, failure)
States with no colour  11 of 12
```
