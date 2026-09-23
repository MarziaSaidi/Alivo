# Alivo Mission Control — Visual Direction

**Status:** Art direction. Philosophy only.
**Governs:** the high-fidelity pass.
**Subordinate to:** `docs/ux-spec.md`. Where this document and the UX spec
disagree, the UX spec wins.

No tokens, no hex values, no font choices, no components. Those come next,
and they come from this.

---

## 0. Brand audit — what actually exists

**Nothing. The repository contains no Alivo brand information.**

| Asset | Found |
|---|---|
| Brand colours | **None.** `globals.css` holds `#ffffff` and `#171717` — scaffold neutrals, explicitly commented "LOW FIDELITY ONLY. Neutral grayscale. No brand colors." |
| Typefaces | **None.** System stacks only. No webfont, no `@font-face`, no `next/font`. |
| Logo / mark | **None.** `public/` contains only the five default Next.js scaffold SVGs (`file`, `globe`, `next`, `vercel`, `window`). |
| Wordmark | Text only — the string "Alivo" set in the nav, plus the page title. No logotype. |
| Design tokens | **None.** One custom breakpoint (`--breakpoint-split: 1200px`) and two font stacks. |

**This is placeholder branding.** Every colour and typeface in the prototype
is a neutral default I chose to keep the low-fidelity pass honest, not an
Alivo asset.

**Consequence for this phase:** no official brand colour is invented here, and
none should be assumed downstream. If real Alivo brand assets exist, they must
be supplied before the colour and type systems are built. This document
defines *how* brand elements would be used — their role, their restraint,
where an accent is permitted — so that real assets can be dropped into a
system already shaped to receive them. If no brand assets arrive, the system
still works: it is built on structure, and colour is the last variable it
spends.

---

## 1. Design thesis

Alivo Mission Control should read as a **live operational record** — the kind
of document a serious business keeps, rather than a dashboard it watches.
Structure comes from typography, alignment and rhythm rather than from
containers, so information feels recorded and permanent instead of floating.
The register is constant and unhurried; what varies is **intensity**, and
intensity is spent only where a person is genuinely required. When the
operation is healthy the interface recedes almost to nothing, which is the
product's core promise made visible. When judgment is needed, the record
breaks its own rhythm and becomes unmistakable — not by shouting, but by
doing something it never otherwise does.

---

## 2. Visual principles

### 1 · Intensity equals obligation

**Meaning.** How loud something looks is a direct function of how much human
judgment it requires. Not how recent it is, how expensive it is, how hard it
was to compute, or how proud we are of it.

**How it affects UI decisions.** Before raising any element's prominence, ask
what the operator must *do*. If the answer is "nothing," it does not rise. A
$284,000 weekly total is large money and low obligation — it stays quiet. A
$9,400 job with a customer waiting two hours is smaller money and high
obligation — it rises.

**Prevents.** Urgency inflation. The dashboard reflex of making big numbers
big. Notification-badge disease, where everything competes and therefore
nothing signals.

### 2 · Records, not cards

**Meaning.** Information sits directly on a continuous page. A bounded surface
is an event with meaning, not a default wrapper.

**How it affects UI decisions.** Grouping is achieved with space and shared
alignment first, a hairline second, and a bounded surface only when one of
four conditions is met (§4). The page has few alignment axes; every card
introduces another.

**Prevents.** Card soup. Cards inside cards. The generic SaaS look, which is
almost entirely a consequence of defaulting to containers.

### 3 · The human is the marked case

**Meaning.** Alivo performs the overwhelming majority of actions, so marking
AI marks nearly everything and therefore marks nothing. The rare and
consequential actor is the person.

**How it affects UI decisions.** Alivo's actions are the unmarked body
register. A human's presence — a decision, an approval, a takeover, a name
attached to a resolution — is what receives attribution and, where one exists,
the single accent.

**Prevents.** Neon AI. Sparkles. Per-actor avatars. The "look how much AI is
happening" aesthetic, which reads as insecurity rather than capability.

### 4 · Contrast is a budget with a floor

**Meaning.** The page spends most of its range inside a narrow band; a small
number of elements break out. Calm is literally a low *average* contrast. But
the floor is set by the operator's real conditions, not by taste.

**How it affects UI decisions.** Recessive text still has to be legible on a
phone, outdoors, in a truck, in sunlight, by someone in their fifties. That
sets a hard minimum below which "quiet" may not go. The elegance comes from
compressing the range, never from making the bottom of it unreadable.

**Prevents.** Both failure modes at once: the loud interface that spends its
whole budget on the first screen, and the fashionably faint interface that is
unusable in the field where this product is actually used.

### 5 · Numbers are instruments

**Meaning.** Money, counts, percentages and durations exist to be read,
compared and trusted — not to decorate.

**How it affects UI decisions.** Tabular figures everywhere numerals appear in
sequence or comparison. Money is never abbreviated in a decision context and
never carries colour. Percentages that must be compared sit in the same column
in the same units. The currency symbol is optically subordinate to the digits.

**Prevents.** Money styled as a "metric." The finance convention of green and
red, which would import a meaning this product does not have. `$24.8k` on an
approval screen.

### 6 · Two kinds of time

**Meaning.** Clock time is a *fact* — static, precise, past tense. Elapsed
time is *pressure* — live, changing, the only genuinely moving thing in the
product.

**How it affects UI decisions.** Timestamps recede into a real column and are
treated as data. Elapsed time and deadlines sit with the decision they
pressure. The elapsed value updates without animating, flashing, or drawing
the eye; it is simply correct whenever looked at. Deadlines are stated
absolutely first.

**Prevents.** A ticking counter destroying the calm it sits inside. Relative
-only deadlines that nobody can plan around.

### 7 · Resolution recedes, it does not vanish

**Meaning.** Once something is handled it drops in contrast and rejoins the
record. It is never deleted, and the fact that a person handled it is never
erased.

**How it affects UI decisions.** Resolved and self-resolved states are
designed as *low* tiers of the same system, not as absence. Marcus's failure
collapses into a quiet historical line with the resolver's name. Coach history
keeps approvals after they are turned off.

**Prevents.** Success states that erase evidence. The audit trail quietly
disappearing at exactly the moment someone needs to prove what happened.

---

## 3. Information density

**Density varies by function. It is never uniform.** This is the single most
consequential density decision in the product.

| Surface | Density | Why |
|---|---|---|
| Mission Control queue, Exceptions index, Activity trace | **High** | Scanned. The shape of the work must be visible without scrolling. |
| Exception Detail, Coach improvement review | **Low** | Read and decided. One thing at a time, with room to think. |

A product that picks one density and applies it everywhere produces either an
unreadable decision screen or a queue you have to scroll to count.

**Density is bought by removing chrome, never by shrinking type.** Padding,
borders, containers, icons and badges go first. Type size goes last, or not at
all. A cramped small-type table is not dense; it is illegible and merely
looks dense.

### Line length

Prose that is read in sequence — explanations, guidance, failure narratives —
holds a comfortable measure. Records are not measure-constrained; they are
column-constrained, and the scanned column is the one that must never be the
one that truncates. Where truncation is unavoidable it falls on the least
important column, with the full value available on demand.

### Vertical rhythm

A strict interval throughout. Dense interfaces feel chaotic when spacing is
irregular and calm when it is consistent — the failure is never "too much
information," it is information at inconsistent intervals.

Three clearly distinguishable spacing tiers:

```
between sections   ≫   between items   >   within an item
```

If those three are not visibly different, nothing reads as grouped, and
borders get added to compensate. Space above a heading is materially larger
than space below it, so the heading binds to its content instead of floating
between two blocks.

### When to compress, when to breathe

**Compress** where the operator is scanning, counting, or comparing: queues,
indexes, traces, column data, historical records.

**Breathe** at the moment of judgment: the pricing conflict, the boundary in
Coach, the commit action, the failure explanation. Space here is not
decoration — isolation is the primary mechanism by which something becomes
dominant without becoming loud.

**The test:** could the operator count the queue without scrolling, and could
they make the decision without hunting? Both must be yes.

---

## 4. Surface philosophy

**One page plane. The default is content directly on the page.**

### When a bounded surface is justified

Exactly four conditions. Nothing else earns one.

1. The contents are **interactive as a single unit**
2. The contents are **on another plane** — an inspection layer, an overlay, a menu
3. The contents are **editable** — an input needs an edge because you are about to type into it
4. The contents must be **severed from the flow** because the normal rhythm has been interrupted

**The fourth is this product's signature.** A bounded surface means *the normal
flow has stopped*. That only works if surfaces are otherwise absent — every
decorative container spends a little of that meaning until there is none left.

### How each kind of content behaves

**Ordinary information** — directly on the page. Grouped by space and shared
alignment. No border, no fill, no elevation.

**Selected or focused content** — separated by alignment shift, a marker, or a
change in weight. **Not by elevation.** Focus states are designed before hover
states, because this product rewards keyboard use and because focus is an
accessibility obligation, not a decoration.

**Failure surfaces** — break the measure. They are permitted to occupy a width
or alignment nothing else on the page uses. Structural rupture is more
arresting than a colour change and, unlike colour, it does not degrade when
three of them appear at once.

**Decision surfaces** — earn space and a raised floor rather than a box. The
boundary block in Coach ("what would change / what would not change") is
bounded by rules above and below and set larger than the body — dominant
through position, space and size, with no card. Mission Control's lead
exception is the one place a true bounded surface appears in normal operation,
and it appears precisely because it is the interruption.

**Inspection panels** — arrive from the edge they belong to, never dim the
surface behind them, never stack, and carry *lighter* chrome than the content
they serve. A panel that looks more important than the decision it supports is
backwards. Dimming would assert that the decision is disabled, which is false.

### Elevation

Two surfaces. Three only under protest. Elevation is reserved for things
genuinely above the plane. At most one very shallow shadow anywhere in the
product, and a hairline is preferred to a shadow wherever it will do the job.

---

## 5. Typographic character

### Personality

Precise and quietly editorial. It should read as a **well-set record**, not as
a UI kit — carrying enough character that a screenshot is recognisable, and
enough discipline that nobody notices while working. Warmth comes from the
prose voice, not from rounded letterforms. Authority comes from exact
alignment, not from heavy weights.

Two behaviours are needed, and they may or may not come from the same family:
a **prose voice** with some character for explanation and argument, and a
**data voice** with absolute discipline for figures, times and columns. The
contrast between them is itself a hierarchy signal — the product has two kinds
of content, and they should not sound identical.

### The roles typography must perform

| Role | Behaviour |
|---|---|
| **Operational labels** | Small, tracked, quiet, used once per block. Connective tissue, never content. Must not accumulate. |
| **Customer identity** | The most human element on any screen. Should read as a person's name, not a field value. |
| **Money** | Tabular, unabbreviated in decision contexts, the highest-contrast text in its row, never coloured. |
| **Timestamps** | Tabular, recessive, in a real column. Data, not prose. |
| **Body explanation** | Comfortable measure and generous leading. The only place prose behaves like prose. |
| **AI actions** | The unmarked default register. Alivo is the body text of the record. |
| **AI suggestions** | Visibly *provisional* — a draft, not a fact. Must never be set identically to something that happened. |
| **Human decisions** | Marked. Carries attribution — a name and a time, like a countersignature. |
| **System status** | A full sentence, never a chip. "Everything is running" is a statement, not a badge. |

### Where contrast comes from, in order of preference

1. **Weight** — two or three weights, used consistently
2. **Optical value** — three or four foreground levels within a compressed range
3. **Case and tracking** — at small sizes only, for labels
4. **Alignment and position** — the cheapest and most underused source
5. **Size** — three to four sizes across the entire product; large type inside an application is marketing behaviour leaking into a tool
6. **Colour** — last, rarely, and carrying exactly one meaning

**Tabular figures are non-negotiable** wherever numbers appear in a column or
a comparison. `$24,800` must align digit-to-digit with `$21,500`, and a
timestamp column must not jitter as the minutes tick.

---

## 6. Attention hierarchy

From lowest to highest. What rises is **not primarily colour**.

| # | Tier | Example |
|---|---|---|
| 0 | **Structural chrome** | Navigation, column headers, section labels |
| 1 | **Resolved and self-resolved history** | Handled; kept; no longer anyone's problem |
| 2 | **Autonomous successful activity** | "47 conversations handled." The system working. |
| 3 | **Context and coverage** | The evidence that makes silence trustworthy; what Alivo knows and doesn't |
| 4 | **Pending human decision** | A customer waiting, money at stake, a clock running |
| 5 | **System failure with customer impact** | Something is broken and a person is affected |

### What changes as attention rises

```
tier 0–2   →  recede within the contrast band; no marker at all
tier 3     →  full legibility, normal weight, still in the flow
tier 4     →  isolation, space, raised contrast, a bounded surface,
              the live clock, the one dominant element on the screen
tier 5     →  structural rupture: breaks the measure, states customer
              impact before cause, carries a remedy
```

Colour, if it enters at all, enters at tier 4 and carries one meaning only.
Everything below tier 4 is achieved with space, weight, value and position.

### Two notes on the ladder

**Tier 5 above tier 4 is deliberate.** A broken capability can suppress the
detection of tier-4 work entirely — a blind system is more dangerous than a
single waiting customer, however valuable that customer is.

**Tiers 4 and 5 must not look alike.** One is the product working exactly as
designed (a correct escalation); the other is something failing. If both read
as the same alarm, neither means anything by the second week, and the operator
learns that correct AI behaviour looks like breakage.

---

## 7. Human versus AI

Four actors. The distinction must be **subtle and structural**, never a badge
system.

| Actor | Treatment |
|---|---|
| **Alivo** | The unmarked default. Body register. Does most things, so marking it marks everything. |
| **The customer** | Marked by being the sentence subject. Their own words receive a distinct treatment — quoted, offset, clearly *theirs* and not ours. |
| **An external system** | Named explicitly — *JobNimbus*, never "the CRM." The name is the marker. A slight typographic differentiation may reinforce that this is not Alivo speaking. |
| **The human operator** | The marked case. Attribution — name and time. The single accent, if one exists, lives here and nowhere else. |

### Grammar does most of the work

Every line is a sentence whose **subject is the actor**: *Sarah called* ·
*Alivo replied* · *Ray completed the inspection* · *JobNimbus did not accept
the change* · *Fixed by Mike at 11:22 AM*. This survives any visual treatment,
works at any size, and needs no legend.

### What the accent buys

If a single accent exists in the system, reserving it exclusively for *a human
is required* or *a human acted* teaches the operator, over weeks, that the
accent means **me**. That is a quiet and unusually powerful piece of visual
training, and it costs nothing. The moment the accent is also used for links,
brand moments or emphasis, it is gone.

### Explicitly rejected

Avatars per actor. An icon per action type. A colour for "AI." Any treatment
that makes Alivo's ordinary work look remarkable.

---

## 8. Exception language

An exception enters a quiet interface **by breaking the rhythm, not by raising
its voice.**

| State | How it presents |
|---|---|
| **Needs attention** | System-side, nobody waiting. Raised contrast, stays in the flow, no rupture. |
| **Needs your decision** | Customer, money, clock. Breaks out: bounded, isolated, the single dominant element, carries live elapsed time and a deadline. |
| **Failed** | Breaks the measure — the only element permitted a width or alignment nothing else uses. States customer impact before cause, and carries a remedy that says what will happen. |
| **Resolved** | Returns to the flow at reduced contrast. Remains in the record, with the resolver named. |
| **Self-resolved** | Never rises above the historical tier. Counted, never announced. Appears in "What ran without you" and in the record — never as an event demanding acknowledgement. |

### Rules that govern all five

**Only deviations get a marker. Normal is unmarked.** This eliminates most
badges before they are designed, and it is the exception principle applied to
the visual system rather than only to the information architecture.

**The rupture must survive repetition.** Three simultaneous failures should
still read as three failures, not as a wall of alarm. Structural deviation
degrades gracefully; saturated colour does not.

**A correct escalation is not a failure.** When Alivo stops because a
competitor match requires human approval, that is the product working. Its
treatment must feel like *the record pausing for you*, not like an error.

---

## 9. Material character

**An editorial document, printed on a technical instrument.**

Precisely:

**The page is the primary material** — opaque, matte, quiet, with the
permanence of a printed record. No translucency, no blur, no layered glass.
Things sit *on* it rather than float *above* it. This is what makes activity
feel recorded rather than streamed.

**The instrument shows in the data** — tabular columns, hairline rules, exact
alignment, a real time column, one live elapsed value. This is where precision
and trust come from, and it is the quality that separates this from a
marketing page with tables on it.

**Software chrome is kept to the working minimum** — enough for affordance on
controls and inputs, and no more. Controls are the only elements that announce
themselves as software.

### What it is explicitly not

**Not glass.** No glassmorphism, no translucent panels, no backdrop blur.
Translucency implies impermanence, which is the opposite of a record.

**Not a console.** The control-room aesthetic is the closest wrong answer —
it fits the supervision job but not the user. A roofing owner is not a
dispatcher, and an interface that signals *professional operator tool* reads
as *not for me* within seconds.

**Not skeuomorphic paper.** No texture, no page edges, no drop shadows
pretending to be sheets. The paper quality is about opacity, permanence and
typographic care, not imagery.

**Shadows:** at most one, very shallow, on the inspection layer only — and a
hairline is preferred wherever it will do the job.

---

## 10. Motion philosophy

**Motion explains. It never decorates.**

| Motion must explain | Behaviour |
|---|---|
| **State change** | A decision was made; the record updated. Visible, brief, honest. |
| **Cause and effect** | The failure collapsed *into* the history line — so the operator sees it was kept, not deleted. |
| **Expansion** | Content pushes what is below it down. Spatially honest; nothing overlaps or teleports. |
| **Resolution** | The queue advances, the next item takes the position. The operator understands they moved forward, not that the screen reset. |
| **New information** | Arrives *without moving what is being read*. Collects behind a line; merges on request. |

### Rough behaviour

Short and functional — roughly 100–200ms for most transitions. Standard
easing, no bounce, no overshoot, no staggered cascades for their own sake.
Panels arrive from the edge they belong to and are instant on close; getting
out should feel like nothing happened.

**Elapsed time updates without animating.** It is the only continuously
changing value in the product, and an animation there would destroy calm more
thoroughly than any colour choice.

**Everything must work with motion disabled.** Reduced-motion is a correctness
requirement, not a courtesy: no state change may be communicated *only* by
movement.

---

## 11. Distinctive details

Five candidate signatures. Each is structural, each earns its place
operationally, and each is recognisable in a screenshot while invisible in
use — the test for distinctive rather than experimental.

### 1 · The time column

A real left-hand column of tabular timestamps running down Activity, echoed
elsewhere as the elapsed-and-deadline pairing. This single choice is what
flips a timeline from story graphic to operational record, and almost no
product in this category does it.

### 2 · The ledger rule

A hairline inside a number block that separates *facts* from *reckoning* —
quote and competitor above, difference and required and allowed below. A small
convention borrowed from accounting that tells the reader, without a word,
that this is a calculation they are meant to check.

### 3 · The marked human

The inversion in §7 made visible: Alivo's work is unmarked body text, and the
one accent in the system appears only where a person is required or a person
acted. A record where the human's presence is the thing that stands out.

### 4 · Statement-first surfaces

Every screen opens with a full sentence set in the largest type on the page —
*"Everything is running. 3 decisions are waiting on you."* — rather than a
title above a metric row. The product speaks in sentences and lets data
support them. This is the fastest-reading and least dashboard-like opening
available, and it is instantly recognisable.

### 5 · The reserved slot

Space held for the inspection layer even when it is closed, so the decision
never moves when evidence is opened. The visible emptiness is a promise: open
anything you like, nothing will jump. Restraint as a feature.

---

## 12. Reference translation

### Linear

**Borrow** — restraint in the *number* of visual variables; hierarchy carried
by weight and value rather than by decoration; focus and keyboard states
designed as first-class; motion that reports where something went.

**Do not copy** — its dark-surface identity, its issue-tracker chrome, its
command-palette-first personality, its density calibrated for engineers.

**Translation** — pick two or three signals and use them everywhere.
Ordinary SaaS expresses one hierarchy with colour *and* weight *and* size
*and* a container *and* a border *and* a badge. We pick fewer and hold them.

### Attio

**Borrow** — genuinely dense business records that stay readable; column
discipline; very quiet table chrome; hover that reveals rather than decorates.

**Do not copy** — the spreadsheet-as-primary-metaphor; the flattening where
everything becomes a record in a grid.

**Translation** — the Exceptions index and the Activity trace read as records
and can carry real density. Mission Control is deliberately *not* a table: it
is a statement followed by one decision.

### Decagon

**Borrow** — making autonomous AI operations legible and supervisable;
treating agent behaviour as something a human inspects rather than trusts
blindly.

**Do not copy** — observability and trace-viewer conventions built for
technical operators; anything resembling a log line.

**Translation** — beats rather than events; business language throughout; what
Alivo *checked* and *concluded*, never how it reasoned; no confidence scores
anywhere.

### Sierra

**Borrow** — autonomous AI presented calmly and approachably; trust built
through plain speech rather than through technical display.

**Do not copy** — chat-forward or conversational presentation inside the
product; marketing warmth leaking into the application.

**Translation** — sentences over labels; the statement-first surface; a system
status that reads *"Everything is running"* rather than a green dot.

### Lemma

**Borrow** — the failure → evidence → explanation → improvement loop treated
as a first-class visual structure rather than an error state.

**Do not copy** — developer-facing failure detail, stack context, retry
mechanics.

**Translation** — Marcus's failure block (why · what this means · what still
works · remedy) and Coach's full arc (pattern · evidence · proposal · boundary
· approval · reversal). Failure is a designed surface here, not an exception
to the design.

---

## 13. Anti-patterns to reject

**Containers**
- A card for every piece of information; cards inside cards
- Bounded surfaces used for grouping rather than for interruption
- A card around the whole page

**Dashboard reflexes**
- A KPI row across the top; large metric tiles
- Decorative charts, sparklines, trend arrows, progress rings
- Making the biggest number the biggest element

**AI signalling**
- Purple or violet gradients; glowing edges; sparkle and star iconography
- Robot imagery, mascots, agent avatars
- Any treatment that makes Alivo's ordinary work look remarkable
- "AI" as a colour

**Status**
- Every state as a coloured pill
- Badge accumulation on rows
- Green/red applied to money
- Identical treatment for *needs a decision* and *something failed*

**Materials**
- Glassmorphism, backdrop blur, translucent panels
- Multiple shadow depths; elevation used for grouping
- Excessive corner rounding; a different radius per component

**Typography**
- Marketing-scale type inside the application
- More than three or four sizes product-wide
- Hierarchy carried by size instead of weight and value
- Proportional figures in any column of numbers
- Fashionably faint text that fails in sunlight

**Motion**
- Celebratory animation on approval; confetti; success bursts
- Animated elapsed-time counters
- Staggered entrance animations; parallax; anything on scroll
- State communicated by movement alone

**Interaction**
- Dimming the surface behind an inspection panel
- Stacked panels
- Hover-dependent information that has no other route
- A destructive or consequential action reachable without reading

**Structural**
- Eight alignment axes per screen because every card brought its own
- Uniform density applied to both scanning and decision surfaces
- Deleting history to make a success state look clean

---

## 14. One-sentence art direction

> **Alivo Mission Control should read as a precise operational record that
> spends its contrast only where a human is genuinely required — calm and
> nearly silent when the operation is healthy, unmistakable the moment it is
> not.**

Every future screen can be judged against it: *Is this quiet enough when
nothing is wrong, and unmistakable when something is?*
