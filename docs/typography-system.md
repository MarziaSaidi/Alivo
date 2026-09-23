# Alivo Mission Control — Typography System

**Status:** Proposed. Typography only.
**Governs:** all type decisions in the high-fidelity build.
**Subordinate to:** `docs/ux-spec.md` (frozen), `docs/visual-direction.md`
(approved), `docs/brand-foundation.md` (approved).

No colour system, no radius, no shadows, no spacing scale, no CSS, no code.
Contrast is described in relative steps only.

**Locked inputs carried in:** the agent is named **Follow-up**. No
light-surface Alivo logo exists or will be manufactured; the shell uses the
text word "Alivo".

---

## 1. Typographic thesis

Typography in Mission Control has to do the work that containers normally do.
With cards, shadows and status pills removed, type is the primary instrument
of hierarchy — it must make a queue countable in one glance, let a $24,800
decision be understood in under a minute, and keep a 40-beat activity record
readable during fast vertical scanning. It must hold four registers apart
(fact, policy, suggestion, decision) without a single badge, make money and
elapsed time exact enough to be trusted and act on, and give a human decision
unmistakable weight while leaving Alivo's constant successful work almost
invisible. Above all it must express the product's central rule — **intensity
equals obligation** — so that a large number with no consequence stays quiet
and a small number with a customer waiting does not.

---

## 2. Font family strategy

### Montserrat

**Strengths.** Genuine brand recognition. Geometric warmth that echoes the
lowercase logo. A full weight range, freely licensed.

**Weaknesses for product UI.**
- **Wide.** Geometric circular forms consume significant horizontal space —
  actively harmful in a queue, a table, or any column layout.
- **Weak at small sizes.** Circular, low-contrast letterforms reduce word-shape
  differentiation exactly where we need fast scanning.
- **Poor numerics for our purpose.** Its figures are wide and geometric; money
  columns set in Montserrat are harder to compare than in a grotesque.
- **Carries a marketing voice.** Alivo uses it at 800 weight, 67–80px, −0.04em.
  That is a persuasion typeface, and the association is strong.

**Appropriate roles.** Marketing surfaces. Possibly a rare brand moment inside
the product — a first-run screen, a login.

**Inappropriate roles.** Anything read repeatedly, anything in a column,
anything numeric, anything below 20px, and the operating statement.

### Inter

**Strengths.** Designed for user interfaces at small sizes. Tall x-height, open
apertures, disambiguated characters. **Best-in-class tabular figures**, which
matters more here than in most products. Optical sizing and a fine weight
range in the variable version. Already Alivo's own UI face, so it is brand
continuity rather than a new introduction.

**Weaknesses.** Ubiquitous. Used unthinkingly it reads as "default SaaS", which
works against the "slightly distinctive" goal in the approved direction.

**Appropriate roles.** Everything.

**Inappropriate roles.** None identified for this product.

### One finding that settles it

The Alivo **logo wordmark is not Montserrat** — verified in the brand
foundation (single-storey `a` against Montserrat's double-storey). So setting
the word "Alivo" in Montserrat in our navigation would be *less* brand-accurate
than setting it neutrally. The one place Montserrat looked obviously justified
turns out to be the one place it is actively wrong.

### Recommendation — **Option A, which in practice is Option B**

**Inter carries the entire product.** Montserrat is retained in the brand
system for marketing continuity and is **permitted only if a genuine brand
moment later appears** — a login, a first-run welcome. Reviewing the five
frozen surfaces, **no such moment currently exists.** Montserrat therefore does
not appear anywhere in Mission Control today.

Stated plainly rather than hedged: **Montserrat does not survive inside the
product UI.**

**No third family.** The temptation is a mono for timestamps and money. It is
not needed: Inter's tabular figures solve the alignment problem, and monospace
would import a developer-tool register the product explicitly rejects.

### How we avoid generic

Distinctiveness comes from the *system*, not from a novelty face: strict
tabular discipline, the time column, the ledger rule, statement-first
sentences, a deliberately narrow weight range, and Inter's OpenType features
used on purpose — `tnum` for all figures, `case` so punctuation aligns beside
uppercase labels, and a disambiguated `l` so `1`/`l`/`I` never collide in an
address or a phone number.

**Optical sizing, not a second family.** Where Inter Variable is available, the
operating statement may use a display optical size. Same family, correct
optics. This is a refinement, not font collecting.

---

## 3. Type roles

Seventeen roles. Deliberately fewer than the brief's candidate list — several
were merged rather than invented into existence:

- **Status** is not a role. Status is a sentence, set as body. "Everything is
  running" is prose, not a chip.
- **Table/list content** is not a role. It is body, in a column.
- **Primary decision** and **Button/action** are one role. The commit control
  *is* the primary decision.
- **Secondary body** is not a smaller size. It is body at a lower contrast
  step. Making secondary text smaller is how interfaces become unreadable.

| # | Role | Purpose |
|---|---|---|
| 1 | Brand wordmark | "Alivo" in the shell |
| 2 | Operating statement | The sentence that answers the product question |
| 3 | Page title | Screen identity |
| 4 | Section heading | A heading that is itself content |
| 5 | Register label | Structural marker naming a register |
| 6 | Customer identity | A person, made prominent |
| 7 | Body | The working text of the product |
| 8 | Body secondary | Supporting text, same size, lower contrast |
| 9 | Metadata | Attribution, counts, qualifiers |
| 10 | Timestamp | Clock and elapsed time |
| 11 | Numeric — decision | Money and percentages being decided on |
| 12 | Numeric — ambient | Money and counts with no obligation attached |
| 13 | Action | Buttons, including the commit control |
| 14 | Input | Editable fields |
| 15 | Trace event — quiet | A beat that happened and needs nothing |
| 16 | Trace event — consequential | A beat that changed something |
| 17 | Historical | Resolved, dismissed, turned off |

---

## 4. Type scale

Root 16px. `rem` is authoritative; px shown for clarity. Desktop product UI.

| Role | Family | Size | Weight | Line height | Tracking | Case |
|---|---|---|---|---|---|---|
| 1 · Brand wordmark | Inter | 0.875 (14) | 600 | 1.2 | −0.01em | As written |
| 2 · Operating statement | Inter *(display opsz)* | 1.5 (24) | 450 | 1.35 | −0.015em | Sentence |
| 3 · Page title | Inter | 1.125 (18) | 550 | 1.3 | −0.01em | Sentence |
| 4 · Section heading | Inter | 0.9375 (15) | 550 | 1.4 | 0 | Sentence |
| 5 · Register label | Inter | 0.75 (12) | 600 | 1.3 | +0.06em | **UPPERCASE** |
| 6 · Customer identity | Inter | 1.0625 (17) | 550 | 1.3 | −0.005em | As written |
| 7 · Body | Inter | 0.875 (14) | 400 | 1.55 | 0 | Sentence |
| 8 · Body secondary | Inter | 0.875 (14) | 400 | 1.55 | 0 | Sentence |
| 9 · Metadata | Inter | 0.8125 (13) | 400 | 1.45 | 0 | Sentence |
| 10 · Timestamp | Inter | 0.8125 (13) | 400 | 1.4 | 0 | As written |
| 11 · Numeric — decision | Inter | *inherits context* | 500 | *inherits* | 0 | — |
| 12 · Numeric — ambient | Inter | 0.875 (14) | 400 | 1.55 | 0 | — |
| 13 · Action | Inter | 0.875 (14) | 500 | 1.2 | 0 | Sentence |
| 14 · Input | Inter | 0.875 (14) | 400 | 1.5 | 0 | Sentence |
| 15 · Trace event — quiet | Inter | 0.875 (14) | 400 | 1.5 | 0 | Sentence |
| 16 · Trace event — consequential | Inter | 0.875 (14) | 500 | 1.5 | 0 | Sentence |
| 17 · Historical | Inter | 0.875 (14) | 400 | 1.5 | 0 | Sentence |

**Five sizes total: 12 · 13 · 14 · 15 · 17 · 18 · 24.** Seven values, but only
three carry the bulk of the product (13, 14, 12). **Three weights: 400 · 500 ·
600**, with 450/550 available only where Inter Variable is present.

### Deliberate changes from the prototype

| Change | Reason |
|---|---|
| Body **13 → 14px** | The prototype inherited a Linear-ish 13px. Our user is a roofing owner in their 40s–60s, frequently outdoors. Density must come from removing chrome, not from shrinking type — our own principle. |
| Labels **11 → 12px** | 11px is below the accessibility floor set in §14. |
| Operating statement **22 → 24px**, weight lowered to 450 | Gains presence through size and optical sizing while *losing* weight, so it reads as authoritative rather than emphatic. |
| Weight range **2 → 3** | 400/500/600 gives the ladder somewhere to go without approaching bold. |

**Nothing in the product exceeds 24px.** Marketing scale begins around 32px and
this product never goes there.

---

## 5. Numeric typography

**The governing rule: a number's prominence comes from weight and alignment,
never from size.** `$284,000 quoted` in the weekly rail and `$24,800` in a
pending decision are the same kind of value with utterly different obligation.
Size would make the larger number louder. Weight and context make the
*consequential* one louder. This is where "intensity equals obligation" is most
visible.

### Global rules

- **`font-variant-numeric: tabular-nums` on every figure**, without exception.
  Not only in columns — a value that changes in place (elapsed time) must not
  reflow.
- **Never abbreviated in a decision context.** `$24.8k` is forbidden on any
  surface where a decision is made. Permitted only in aggregates, and even
  there discouraged.
- **Never coloured.** No green for positive, no red for negative. That is a
  finance convention importing a meaning this product does not have.
- **Right-aligned in columns**, left-aligned in prose.
- Currency symbol and percent sign: **same size, one contrast step lighter**
  than their digits. Reducing their size causes baseline drift; reducing
  contrast achieves the same optical subordination cleanly.
- `case` feature on, so `%` and `$` align correctly beside uppercase labels.
- **No slashed zero.** It reads as a technical instrument and this is a
  business record.

### Specific treatments

| Value | Treatment |
|---|---|
| `$24,800` (the quote, in a decision) | Context size (17px header / 15px math row), **weight 500**, tabular, `$` one contrast step lighter |
| `$21,500` (the competitor) | Same size, **weight 400** — a fact, not the decision |
| `13.3%` (required) | 15px, **weight 500**, highest contrast — this is the conflict |
| `5.0%` (allowed) | 15px, **weight 400**, one contrast step down — sits directly beneath, same column, same units |
| `17 min` (elapsed) | 13px timestamp, tabular, mid contrast. **Never animates.** |
| `3:14 PM` (deadline) | 13px timestamp, tabular, mid contrast, always stated absolutely |
| `47 conversations` | 14px, weight 400; figure at full contrast, word one step lighter, figure right-aligned in a narrow column so the four rail rows align |
| `$284,000 quoted` | 14px, **weight 400**, ambient contrast. Large money, no obligation — it stays quiet. |

### The ledger rule

The hairline separating facts from reckoning in a math block is a typographic
device, not decoration: quote and competitor above, difference and required and
allowed below. Values above the rule are 400; the contested value below it is
500. The rule tells the reader a calculation is being presented for checking.

---

## 6. Operational labels — the uppercase question

### Current state

Thirteen uppercase labels across seven files: `THE DECISION`, `WHAT ALIVO
KNOWS`, `DOESN'T KNOW`, `YOUR PRICING RULE`, `ALIVO SUGGESTS`, `YOUR DECISION`,
`WHAT WOULD CHANGE`, `WHAT WOULD NOT CHANGE`, `AGENT COACH`, `ACTIVITY`, `ALSO
WAITING`, `WHAT RAN WITHOUT YOU`, `THIS WEEK`, plus column headers and day
markers.

### Assessment

**Uppercase earns its place — but it is currently overused, and in one place it
is actively wrong.**

In favour: at small size with generous tracking, all-caps reads instantly as
*structural marker, not content*. That distinction is exactly what this product
needs, since labels name registers rather than describing them. It is also
editorial rather than corporate, which suits the operations-register direction.

Against: it is wider (costly in dense layouts), it slows actual reading by
removing word-shape cues, and past a certain count it stops signalling anything.

**The error it is currently causing:** `WHAT WOULD CHANGE` and `WHAT WOULD NOT
CHANGE` are set as tiny tracked micro-labels. But the UX spec names this pair as
**the most important element on the Coach detail page**. Setting the centre of
gravity in the smallest type in the system understates it badly.

### The rule

> **Uppercase is for structural markers that are never read as content.**
> If something is the centre of gravity, it is not a label — it is a heading,
> and headings are sentence case.

**Uppercase permitted** — register labels (`THE DECISION`, `ALIVO SUGGESTS`,
`YOUR DECISION`), column headers, day markers in the trace, section markers in
the rail. Conditions: **maximum three words**, never two adjacent, never more
than one per visual group, always +0.06em tracking, minimum 12px, always via
CSS `text-transform` so the underlying text stays sentence case for assistive
technology and search.

**Sentence case required** — anything over three words, anything carrying
content weight, anything a user reads as a phrase, and any heading that is the
focus of its screen.

### Applying the rule

| Label | Now | Becomes |
|---|---|---|
| `THE DECISION` | uppercase | **Uppercase** (register marker, 2 words) |
| `ALIVO SUGGESTS` | uppercase | **Uppercase** |
| `YOUR DECISION` | uppercase | **Uppercase** |
| `WHAT ALIVO KNOWS` | uppercase | **Uppercase** (3 words, at the limit) |
| `DOESN'T KNOW` | uppercase | **Sentence case, 13px** — it is a sub-label under the above; two adjacent uppercase markers is exactly the overuse the rule prevents |
| `YOUR PRICING RULE` | uppercase | **Uppercase** |
| `WHAT WOULD CHANGE` | uppercase 11px | **Sentence case, 15px, weight 550** — section heading, the centre of gravity |
| `WHAT WOULD NOT CHANGE` | uppercase 11px | **Sentence case, 15px, weight 550** |
| `ALSO WAITING` / `WHAT RAN WITHOUT YOU` / `THIS WEEK` | uppercase | **Uppercase** (rail and queue markers) |
| Day markers, column headers | uppercase | **Uppercase** |

Net effect: uppercase instances drop, and the two most important headings in
Agent Coach gain the weight they should always have had.

---

## 7. Attention through type

The approved ladder, expressed typographically. **No colour.**

| Tier | Size | Weight | Contrast | Spatial |
|---|---|---|---|---|
| 0 · Structural chrome | 12–13 | 400–600 | Lowest | In the grid |
| 1 · Historical | 14 | 400 | Low | In the flow |
| 2 · Autonomous success | 14 | 400 | Low-mid | In the flow |
| 3 · Important context | 14 | 400 | **Full** | In the flow |
| 4 · Human decision | 15–17 | **500** | Full | **Isolated**, own measure |
| 5 · Failure | 15 heading / 14 body | **550 / 400** | Full | **Breaks the measure** |

**What actually changes as attention rises:**

1. **Contrast first** (tiers 0→3). Four steps, all within the accessible range.
   Nothing grows; things simply become fully legible.
2. **Weight second** (tier 4). 400 → 500. One step, and it is enough.
3. **Size last, and barely** (tier 4). 14 → 15–17. Two to three pixels.
4. **Spatial rupture at the top** (tiers 4–5). Isolation, then a broken measure.

**Tiers 4 and 5 must not look alike.** Tier 4 gains *weight and isolation* — a
decision presented calmly. Tier 5 gains a *sentence-case heading and a broken
alignment* — the record visibly interrupted. One is the product working; the
other is something failing.

**Tier 1 recedes by contrast alone.** Resolved history is never made smaller.
Shrinking history is how audit trails become unreadable.

---

## 8. Actor distinction

**One variable: weight on the sentence subject.** Same family, same size, same
colour for all four actors.

| Actor | Treatment |
|---|---|
| **Alivo** | Subject at **400**. Unmarked. The body register of the record. |
| **Customer** | Subject at **500**. Their quoted words: same size, one contrast step down, set behind a hairline indent. |
| **External system** | Subject at **500** — it is a proper noun, and "JobNimbus" should read as a named third party, not as us. |
| **Human operator** | Subject at **500**, plus an attribution line at metadata size: *Fixed by Mike at 11:22 AM*. |

**The attribution line is the real marker.** Alivo never gets one; a person
always does. Over a long trace, the eye learns that a second smaller line means
a human was involved — which is precisely the "mark the human" principle,
carried entirely by type.

No italics for any actor. No second family. No avatars. No per-actor colour.

---

## 9. Activity Trace

The trace is read by **fast vertical scanning**, so the left edge must be
predictable and the sentence column must have a stable rhythm.

| Element | Spec |
|---|---|
| **Day label** | Register label — 12/600/+0.06em/uppercase, lowest contrast. Breaks the spine. |
| **Timestamp** | 13/400, **tabular**, right-aligned in a fixed 68px column, low contrast. The alignment is what makes this a record. |
| **Event sentence — quiet** | 14/400/1.5, mid contrast |
| **Event sentence — consequential** | 14/**500**/1.5, full contrast |
| **Consequence lines** | 14/400/1.45, one contrast step below the sentence, no bullet — indentation carries the relationship |
| **Expanded evidence** | Heading: register label 12/600. Content: 14/400/1.5, one step down. Quoted speech: contrast step down behind a hairline. |
| **Failure interruption** | Heading sentence case 15/550. Sub-headings (*Why · What this means · What still works*) register labels 12/600. Body 14/400/1.55 at 62ch. |
| **Human action** | Sentence 14/500 + attribution line 13/400 low contrast |
| **Quiet period** (`quiet for 4 days`) | 13/400, lowest contrast, italic **not** used — set roman, centred on the spine |

**Scanning rule:** only the timestamp column and the first word of each sentence
need to be fixed points. Everything else may vary. That is why the actor is the
grammatical subject — the scan target is always the first word.

---

## 10. Exception Detail

The risk is a document that must be read linearly. Typography must make it
**enterable at several points**.

| Element | Spec |
|---|---|
| `Sarah Mitchell` | Customer identity — 17/550/−0.005em |
| `$24,800` | Numeric decision — 17/500, tabular, `$` one step lighter |
| `potential job` | Metadata — 13/400, low contrast |
| Context line (job · location · waiting · deadline) | 13/400 metadata, tabular for the time values |
| `THE DECISION` | Register label — 12/600/uppercase |
| The ask sentence | Body — 14/400/1.55 at 46ch |
| Math block labels | 12/400 metadata, low contrast |
| Math block values | 15/400, tabular; the contested value **15/500** |
| `WHAT ALIVO KNOWS` | Register label |
| Known facts | 14/400, full contrast |
| `Doesn't know` | **Sentence case 13/500**, low contrast |
| Unknown facts | 14/400, one step down |
| `YOUR PRICING RULE` | Register label |
| Policy lines | 14/400, full contrast — policy is never de-emphasised |
| `ALIVO SUGGESTS` | Register label |
| Suggested amount | 15/500 tabular inside its input boundary |
| Suggested message | Input — 14/400/1.5 at 58ch |
| Historical context | 13/400 metadata, low contrast, tabular figures |
| `YOUR DECISION` | Register label |
| Options | 14/400; selected option **14/500** |
| Commit control | Action — 14/500, tabular (it contains money) |

**Three entry points, by design:** the identity line, the math block, and the
decision. An operator who already knows the case can enter at the math block and
never read the prose. The register labels are what make that possible — they are
signposts, which is exactly why they must stay small and uppercase.

---

## 11. Agent Coach

The centre of gravity must be **the boundary**, not the past examples.

| Element | Spec |
|---|---|
| `AGENT COACH` | Register label — 12/600/uppercase |
| Overview headline (*2 improvements worth reviewing*) | Page title — 18/550 |
| Overview supporting sentence | Body — 14/400, one step down |
| Improvement title | Section heading — 15/550 |
| Observation lines | Body — 14/400 |
| `What Alivo noticed` | Register label |
| Noticed lines | Body — 14/400, full contrast |
| Past examples — customer | 14/500 |
| Past examples — question | 14/400 |
| Past examples — answer | 14/400, **one step down, behind a hairline indent** |
| Proposed guidance | Input — 14/400/1.55 at 62ch |
| **`What would change`** | **Section heading — 15/550, sentence case** |
| **`What would not change`** | **Section heading — 15/550, sentence case** |
| **Boundary content** | **15/400/1.5, full contrast** |
| Scope labels / values | 13/400 metadata / 14/400 body |
| Behaviour preview | Customer 14/500, outcome 14/400 |
| Approve control | Action — 14/500 |

**The mechanism.** Past examples sit at 14px with their answers a contrast step
down. The boundary sits at **15px with 550 headings and full-contrast content** —
the only place on the page where body text is larger than 14. Three evidence
blocks therefore recede beneath one boundary block, without a card, a fill or a
colour.

---

## 12. Line length

| Content | Max measure | Rationale |
|---|---|---|
| Operational prose (statements, consequences) | **52–58ch** | Read in fragments, not paragraphs |
| Explanatory prose (*What Alivo noticed*, failure *why/means*) | **62–68ch** | Genuine paragraphs; needs a comfortable measure |
| Editable AI guidance | **58–66ch** | Must be editable and proofread |
| Timeline event sentences | **60–70ch** | Scanned, not read; slightly longer is acceptable |
| Register labels | never wrap | If it wraps, it is too long to be a label |

**No text is ever full-width.** Where a column is wider than its measure, the
text stops and the remaining space stays empty. On Exception Detail the empty
space to the right of the decision column is the reserved inspection slot — it
is a promise, not an oversight.

---

## 13. Vertical rhythm

Relationships only. The spacing scale comes later.

Let **u** be the base rhythm unit.

| Relationship | Space | Why |
|---|---|---|
| Register label → its content | **0.5u** | Tight. The label belongs to the content. |
| Content → its supporting metadata | **0.25u** | Tighter still. Metadata is an appendix to the line above. |
| Row → row in a list | **0.75u** | Even, predictable; row height carries readability, not gaps |
| Item → item within a section | **1u** | |
| Section → section | **3u** | The largest routine interval |
| Above a heading vs below it | **≈3 : 1** | Binds the heading downward to its content |
| Boundary → commit action | **2.5u** | A deliberate pause before an irreversible act |
| Interruption block → surrounding flow | **2u above and below** | Isolation is how it dominates |

**The three intervals must be visibly distinguishable.** If `0.5u`, `1u` and
`3u` are not obviously different, nothing reads as grouped and borders get added
to compensate — which is how the product would drift back into card soup.

---

## 14. Accessibility

**Quiet must never become faint.** The "calm" philosophy is achieved by
*compressing the contrast range*, not by dropping below legibility.

| Check | Rule |
|---|---|
| **Minimum size** | **12px absolute floor**, and only for register labels and column headers. No text below 12px anywhere. Raises the prototype's 11px labels. |
| **Body minimum** | 14px |
| **Metadata contrast** | Must meet **4.5:1** against its surface. Our lowest tier is a *dimmer accessible value*, never a sub-AA grey. |
| **Large text exception** | Not used. Even 17–24px text meets 4.5:1, since this product is read outdoors. |
| **Uppercase tracking** | **+0.06em minimum.** Untracked uppercase is materially harder to read. |
| **Uppercase implementation** | Always CSS `text-transform`, never capitals typed into content — so assistive technology, search and copy-paste receive natural text. |
| **Line height** | 1.5 minimum for prose; 1.3 minimum for single-line UI |
| **Clickable text** | Never distinguished by colour alone. Underline on hover, and a visible focus ring designed before hover. |
| **Numeric readability** | Tabular figures everywhere; any number a user might transcribe (phone, address, money) is at least 13px with disambiguated characters |
| **Zoom** | All sizes in `rem`, so browser text-size preferences work. The system must survive **200% zoom** without loss of function. |
| **Responsive** | Sizes do not shrink below desktop values on smaller viewports. Narrow screens reflow; they do not compress type. |

**The field test:** every size and contrast pairing is judged on a phone, at
arm's length, in daylight. A roofing owner standing on a driveway is the real
reader.

---

## 15. Before and after

Text specification only. No mockups.

### 1 · `Everything is running. 3 decisions are waiting on you.`

```
BEFORE   22px / 400 / −0.01em / 1.35, one weight throughout
AFTER    Operating statement — 24px / 450 / −0.015em / 1.35, display opsz
         "3" set tabular; sentence otherwise unmodified
         Coverage line beneath: 13px / 400 / metadata contrast, tabular
         Space above: 3u.  Space to coverage line: 0.25u
WHY      Gains presence through size and optics while LOSING weight —
         authoritative rather than emphatic. Still 8px below marketing scale.
```

### 2 · `Sarah Mitchell  $24,800  potential job`

```
BEFORE   17px/500 · 17px/500 tabular · 13px/400 — name and money identical
AFTER    Sarah Mitchell    Customer identity — 17 / 550 / −0.005em
         $24,800           Numeric decision — 17 / 500, tabular
                           "$" one contrast step lighter than digits
         potential job     Metadata — 13 / 400, low contrast
         Baseline-aligned; 0.75u between name and value
WHY      The person leads. Money is equal in size but one step lighter in
         weight, so it is exact without competing with the human being.
```

### 3 · `13.3% requested vs 5% allowed`

```
BEFORE   Two MathRows, both 15px; required 500, allowed 400
AFTER    Your quote        $24,800   15 / 400 / tabular
         Competitor        $21,500   15 / 400 / tabular
         ─────────── ledger rule ───────────
         Difference         $3,300   15 / 400 / tabular
         Required            13.3%   15 / 500 / FULL contrast
         Allowed              5.0%   15 / 400 / one step down
         Labels 12 / 400 / low contrast. Values right-aligned, one column.
         "%" one contrast step lighter than its digits.
WHY      The conflict is two adjacent rows in one column in one unit, split
         only by weight and contrast. No colour, no icon, no arrow.
```

### 4 · `Alivo stopped`

```
BEFORE   Register label 11px uppercase inside a bordered block
AFTER    Time         13 / 400 / tabular / low contrast
         ALIVO STOPPED  Register label — 12 / 600 / +0.06em / uppercase
         Lines          14 / 400 / 1.5 / full contrast, 58ch
         Waiting 17 min 13 / 400 / tabular, mid contrast — never animates
         Block isolated 2u above and below; breaks the spine
WHY      Correct escalation, not an error. It gains weight through isolation
         and a broken spine, NOT through a heading or a colour — which is what
         keeps it distinct from a failure.
```

### 5 · `What would change / What would not change`

```
BEFORE   11px / uppercase / +tracking / neutral-400  ← the smallest type
         in the system on the most important element of the page
AFTER    What would change          Section heading — 15 / 550 / sentence case
         What would not change      Section heading — 15 / 550 / sentence case
         Content                    15 / 400 / 1.5 / full contrast
         Sub-line ("still asks for help when:")  13 / 400 / low contrast
         Two columns, rules above and below, 2.5u before the approve control
WHY      This is the behavioural boundary the operator must understand before
         approving. It was set in micro-type; it is now the only body text on
         the page above 14px. The three evidence blocks recede beneath it
         without a card, a fill or a colour.
```

---

## 16. Typographic anti-patterns

**Rejected without exception:**

- **Marketing-scale headings.** Nothing above 24px. Montserrat 800 at 67–80px belongs on alivo.ai and nowhere near this product.
- **Weight proliferation.** Three weights. Not six. Not a 100–900 ramp because the variable font offers one.
- **Bold as emphasis.** 500 is the emphasis weight. 700 appears nowhere in the product.
- **Tiny grey metadata.** Nothing below 12px, nothing below 4.5:1. Illegible metadata is not sophistication.
- **Uppercase everywhere.** Register markers only, three words maximum, never adjacent.
- **Monospace because AI.** The developer-tool register the product explicitly rejects. Inter's tabular figures solve every alignment need.
- **Huge financial numbers.** Money's prominence comes from weight and alignment. A dollar amount is never the largest text on a screen.
- **A different family for AI versus human.** The distinction is weight on the subject plus an attribution line. Nothing more.
- **Excessive letter spacing.** Positive tracking only on uppercase labels. Never on body, never on headings above 15px.
- **Italics as a register.** Not used anywhere. Reserved for genuine citation, which this product does not have.
- **Shrinking text to create density.** Density comes from removing chrome.
- **Shrinking history.** Resolved content recedes by contrast, never by size.
- **Coloured numbers.** No green, no red, no semantic colour on any figure.
- **Text-transform baked into content.** Always CSS, so assistive technology receives real words.

---

## 17. Final typography specification

Implementation truth. All sizes `rem` at 16px root.

| # | Role | Family | Size | Weight | Line height | Tracking | Case | Numerics |
|---|---|---|---|---|---|---|---|---|
| 1 | Brand wordmark | Inter | 0.875 / 14 | 600 | 1.2 | −0.01em | as written | — |
| 2 | Operating statement | Inter *(display opsz)* | 1.5 / 24 | 450 | 1.35 | −0.015em | sentence | tabular |
| 3 | Page title | Inter | 1.125 / 18 | 550 | 1.3 | −0.01em | sentence | tabular |
| 4 | Section heading | Inter | 0.9375 / 15 | 550 | 1.4 | 0 | sentence | tabular |
| 5 | Register label | Inter | 0.75 / 12 | 600 | 1.3 | +0.06em | UPPERCASE (CSS) | — |
| 6 | Customer identity | Inter | 1.0625 / 17 | 550 | 1.3 | −0.005em | as written | — |
| 7 | Body | Inter | 0.875 / 14 | 400 | 1.55 | 0 | sentence | tabular |
| 8 | Body secondary | Inter | 0.875 / 14 | 400 | 1.55 | 0 | sentence | tabular |
| 9 | Metadata | Inter | 0.8125 / 13 | 400 | 1.45 | 0 | sentence | tabular |
| 10 | Timestamp | Inter | 0.8125 / 13 | 400 | 1.4 | 0 | as written | **tabular** |
| 11 | Numeric — decision | Inter | inherits | 500 | inherits | 0 | — | **tabular** |
| 12 | Numeric — ambient | Inter | 0.875 / 14 | 400 | 1.55 | 0 | — | **tabular** |
| 13 | Action | Inter | 0.875 / 14 | 500 | 1.2 | 0 | sentence | tabular |
| 14 | Input | Inter | 0.875 / 14 | 400 | 1.5 | 0 | sentence | tabular |
| 15 | Trace event — quiet | Inter | 0.875 / 14 | 400 | 1.5 | 0 | sentence | tabular |
| 16 | Trace event — consequential | Inter | 0.875 / 14 | 500 | 1.5 | 0 | sentence | tabular |
| 17 | Historical | Inter | 0.875 / 14 | 400 | 1.5 | 0 | sentence | tabular |

**System summary**

```
Families     Inter only.  Montserrat: marketing, not product.
Sizes        12 · 13 · 14 · 15 · 17 · 18 · 24     (14 is the workhorse)
Weights      400 · 500 · 600      (450 / 550 where Variable is available)
Floor        12px, register labels only.  Body floor 14px.
Ceiling      24px.  Nothing larger exists in this product.
Figures      tabular everywhere, without exception
Features     tnum, case, disambiguated l.  No slashed zero.
Contrast     4 steps, all ≥ 4.5:1
Tracking     negative above 17px · zero on body · +0.06em on uppercase only
```
