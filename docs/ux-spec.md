# Alivo Mission Control — Canonical UX Specification

**Status:** Frozen. Low-fidelity product complete.
**Purpose:** Source of truth for the high-fidelity build.
**Written from:** the implementation as it exists in `src/`, not from intent.

This document describes what is built. Where something was designed but not
implemented, it says so explicitly. Where the implementation contradicts
itself, it says so. High fidelity must not silently resolve those gaps —
see §13.

---

## 1. Product model

Alivo Mission Control is a human supervision layer for autonomous AI
operations. It is not a dashboard, not an inbox, and not an observability
tool.

### Core loop

```
AI works
  → system detects an exception
    → human understands what happened
      → human makes a decision
        → activity remains traceable
          → repeated exceptions become improvement opportunities
            → human explicitly approves behavioral changes
```

### The four principles

**Normal activity stays quiet.** Successful autonomous work is not surfaced
as events. It is summarised ("What ran without you") and otherwise invisible.

**Exceptions receive attention.** Only situations needing a person are given
structural weight. In Mission Control exactly one exception is expanded; in
Activity, only interruptions break the timeline spine.

**AI behavior remains understandable.** Every surface reports what Alivo
checked, what it concluded, what it did, and what it does not know. It never
reports how it reasoned, and never fabricates reasoning.

**Authority remains with the human.** Alivo may identify patterns and propose
improvements. It never expands its own authority. Every behavioral change is
approved by a named person and is reversible.

### Registers

Four voices are kept structurally distinct across every screen. They are
separated by **position, label and grammar** — never by a box or a colour.

| Register | Voice | Example |
|---|---|---|
| **FACT** | past tense, timestamped, attributed | *Quote sent Tuesday 4:12 PM — $24,800* |
| **POLICY** | second person, present, possessive | *Follow-up can discount up to 5%* |
| **AI SUGGESTION** | conditional, attributed, provisional | *Alivo suggests countering at $23,200* |
| **HUMAN DECISION** | imperative, states the outcome | *Send counter at $23,200* |

---

## 2. Information architecture

| Route | Purpose |
|---|---|
| `/` | Redirects to `/mission-control`. |
| `/mission-control` | Default landing. What needs a person right now. Finite, empties. |
| `/exceptions` | Complete operational record. Retrieval and history. |
| `/exceptions/sarah-mitchell` | Exception Detail — the decision surface. Dynamic `[slug]`; unknown slugs 404. |
| `/activity` | Scoped index. There is no unscoped activity feed. |
| `/activity/sarah-mitchell` | Sarah's trace — successful work ending in a human decision. |
| `/activity/marcus-webb` | Marcus's trace — an external-system failure and its recovery. |
| `/coach` | Agent Coach overview. Patterns worth reviewing. |
| `/coach/insurance-deductibles` | Full improvement review (lower-risk guidance). |
| `/coach/competitor-pricing` | Pattern surfaced only. No change proposed (consequential authority). |
| `/coach/history` | Change history. Approvals, edits, dismissals, reversals. |

### Navigation rules

- Mission Control lands first. The highest-frequency job costs zero navigation.
- Activity is always entered with a scope already applied.
- Exception Detail is reachable from Mission Control (`Open`) and from the
  Exceptions index. It is a deep-link target, not a child of one parent.
- `/coach/[slug]` is dynamic; `/coach/history` is a static segment and takes
  precedence.

---

## 3. Global shell

**Frozen.** `AppShell.tsx`, `LeftNav.tsx`, `MobileNav.tsx`, `TopBar.tsx`.

### Left navigation — 200px, fixed, full-height, sticky

```
Alivo

Mission Control
Exceptions
Activity
Agent Coach
─────────────         ← hairline separation
Customers             ← inert, wider product context
Agents                ← inert, wider product context

Low fidelity prototype
```

Hidden below `md` (768px). Active state is computed with
`pathname.startsWith(item.href)`.

### Top operational bar — 48px, sticky, spans the content area

Exactly three elements. No notification bell, no activity ticker, no agent
status.

1. **Operating state + attention count** — `● Running / 3 need you`
2. **Search** — "Search customer, address, phone" (hidden below `sm`)
3. **Account**

Deliberately subordinate to the operating statement beneath it. This is
utility chrome.

### Content container

```
main            px-6, pb-24
inner           mx-auto max-w-[1216px]
```

1216 = primary column (840 max) + gap (56) + rail (320). The cap equals the
composition's natural size, so the container is never partly filled. Beyond
it the surplus is centred, reading as margin rather than a layout that failed
to stretch.

Per-screen measures: Mission Control fills the container; Exception Detail
caps at 1160 (surface 800 + gap + panel slot 320); Activity 760; Exceptions
980; Coach overview 720; Coach detail 680.

### Breakpoints

| Token | Width | Effect |
|---|---|---|
| `sm` | 640 | Rows go single-line; search appears |
| `md` | 768 | Left nav appears, mobile nav hides |
| `lg` | 1024 | Exception Detail workspace goes two-column |
| `split` (custom) | 1200 | Mission Control rail moves beside; inspection panels move in-flow |

Desktop-first. Verified at 1440, 1280 and 1024 with no horizontal overflow on
any screen. Mobile is functional, not designed.

### Typography and numerals

Grayscale only. System sans. `.tnum` (tabular figures) is applied to every
money value, time, count and elapsed duration so digits align in columns.

---

## 4. Mission Control

**Answers:** *"Is the operation working, and what needs me?"*

**It is not a dashboard.** No KPI cards, no charts, no metric row, no agent
roster.

### Vertical order

**A · Operating statement** — heaviest element on the screen, two lines:

> Everything is running. 3 decisions are waiting on you.
> 4 agents · 18 live conversations · last action 40 seconds ago

The second line is the **coverage line** and is load-bearing: without it,
"nothing needs you" is ambiguous between *healthy* and *blind*. A last-action
timestamp and live conversation count are what make the quiet believable.

**B · Lead exception** — expanded. Exactly one. **The only bordered element
on the screen.** The container is reserved for interruption; that reservation
is what gives this block its weight without size or colour.

Contains: customer + value + job; the ask in one line; the decision math
(quote / competitor / difference / required % / allowed %) with *required*
sitting directly above *allowed* in the same column; `Your rule` (POLICY);
`Alivo suggests` (SUGGESTION); the clock; then `Open` (primary) and
`Reassign` (secondary).

Height is held at ~293px — a deliberate 25% reduction achieved by placing the
math beside the policy rather than above it.

**C · Also waiting** — header `ALSO WAITING 3`, then one compressed line per
item: subject, value, need, elapsed. Hairline separators, no borders, no
badges. Below `sm` the need wraps to its own line rather than truncating —
it is the column being scanned.

**D · End of queue** — `That's everything.` Explicit, because whitespace after
a list is ambiguous between finished, loading and broken.

**E · Agent Coach** — quiet labelled section below the queue. See §8.

**F · Rail (320px, offset 72px down)** — `What ran without you` (last 24
hours, four sentence-with-number lines) and `This week` (four lines, link to
a full report).

The rail's offset is a hierarchy mechanic, not spacing: starting it level
with the lead exception would put two things in competition for the first
glance.

### The rail exists to counterweight failure

A surface that only ever shows problems makes a well-functioning system look
broken. "What ran without you" is why the operator's daily impression of
Alivo is not a list of failures.

### Empty state and degraded state

**Designed, not implemented.** Both are specified in the approved
architecture and are absent from the code. High fidelity must build them.

*Empty state (designed):* the screen inverts. The statement reads "Everything
is running. Nothing needs you." plus the coverage line; the expanded slot is
taken by "What ran without you", promoted from the rail and expanded with a
short timeline; Coach moves up; the rail dissolves. The rule: the primary
column always holds the most important true thing, and when nothing needs a
human, that is what the system did.

*Degraded state (designed):* the statement changes to name the fault and its
blast radius in customer terms ("Not receiving calls since 11:42 AM… 14
inbound calls have gone unanswered"), a capability block preempts the
expanded slot, what still works is stated explicitly, and the customer queue
continues unchanged below.

### Precedence for the expanded slot

```
capability failure  >  most urgent work exception  >  what ran without you (empty)
```

Exactly one occupies it. Never two.

---

## 5. Exceptions

**Mission Control** = prioritised human attention. Finite, closable, answers
*now*.

**Exceptions** = the complete operational record. Answers *what exists and
what happened to it*. It must not compete with Mission Control.

### Filters — frozen

| Filter | Meaning | Rows |
|---|---|---|
| **Open** (default) | Still needs a person | 4 |
| **Resolved** | A person intervened; finished | 4 |
| **Self-resolved** | Alivo hit an exception and cleared it within existing authority | 2 |
| **All** | Everything | 10 |

The count is shown on **Open** only. Counts are derived from the data, not
hardcoded.

### Search

One field, "Search customer or exception". Matches subject, description,
state label and hidden keywords — so "jobnimbus" returns both the sync
failure and Marcus Webb. Empty result reads "Nothing matches that."

### Row structure — a compact list, never cards

```
Customer | Value | What happened | State | Waiting
  132px     72px      flex          150px    116px
```

One very quiet header row. No vertical rules, no zebra striping, no badges,
no severity scoring, no bulk actions, no pagination. Rows are a uniform 41px.
Above `sm` the row does not wrap and the description truncates with the full
text on `title`; below `sm` the description wraps to its own line.

Value is omitted rather than zero-filled where a record has none (JobNimbus,
Marcus, Calendar).

### State labels — frozen

`Needs your decision` · `Open` · `Needs attention` · `Resolved` ·
`Self-resolved`

### Destinations

Only two rows are clickable, by design: Sarah → `/exceptions/sarah-mitchell`,
Marcus → `/activity/marcus-webb`. The remaining eight are inert prototype
records.

---

## 6. Exception Detail

**Answers:** *"What decision does Sarah need me to make, and why?"*

A decision surface. Not a customer profile, not a CRM record, not a document.

### Semantic hierarchy — frozen order

| # | Section | Register |
|---|---|---|
| 1 | Context header — name, value, job, location, waiting, deadline | FACT |
| 2 | The decision — the ask + the pricing math | FACT |
| 3 | What Alivo knows | FACT |
| 4 | Doesn't know | FACT |
| 5 | Your pricing rule | **POLICY** |
| 6 | Alivo suggests — amount + message | **AI SUGGESTION** |
| 7 | Historical context | FACT |
| 8 | Your decision | **HUMAN DECISION** |

### Layout

A two-column decision workspace below the header: the pricing conflict and
the rule that produced it on the left (kept adjacent — they must never be
separated by a whole section), contextual evidence on the right at lower
contrast. Suggestion, historical context and decision follow full-width.

**Fold requirement (frozen).** At 1440×900 the operator must see, without
scrolling: Sarah's request, **13.3% required**, **5% allowed**, the **$23,200
suggestion**, and the **decision controls**. Verified — commit button bottom
at 874px of 900. This was achieved by recomposition, never by shrinking type.

### The pricing conflict

```
Your quote          $24,800
Competitor          $21,500
────────────────────────────
Difference           $3,300
Required             13.3%     ← weighted
Allowed               5.0%
```

Required sits directly above allowed, same column, same units, so the gap
reads without arithmetic.

### Interactions — frozen

**Editable counter amount.** Typing recalculates the discount, the
percentage, and the commit label together.

**Editable message.** Regenerates per decision, interpolating the live
amount; stops auto-updating once the operator types into it. Changing the
decision replaces the draft, because a different decision is a different
message.

**Explicit commit action.** The label always states the outcome and is
generated, never generic:

| Option | Commit label |
|---|---|
| Counter | `Send counter at $23,200` |
| Match | `Match competitor at $21,500` |
| Hold | `Keep quote at $24,800` |
| Ask what's included first | `Ask Sarah what's included` |

Never *Approve*, *Confirm*, *Submit*.

**Conversation inspection.** A read-only panel, in flow beside the decision
above `split`, overlaying from the right below it. It **does not dim** the
decision surface — dimming would assert the decision is disabled, which is
false. It never stacks: one layer at a time. Closing changes nothing.

**Activity link.** "See all activity" → `/activity/sarah-mitchell`.

**Reassignment and takeover.** `Handle Sarah myself` and `Assign to someone
else`, at lower weight, separated from the commit. Currently inert (prototype).

### Hidden — never displayed

Confidence scores, thresholds, trigger mechanics, model names, prompts,
tokens, latency, internal IDs, HTTP status, JSON, retry logs, chain of
thought, or any account of how Alivo selected $23,200.

**The distinction that matters:** *what Alivo doesn't know* is shown — it is
a fact about the world that changes the decision. *How Alivo thinks* is not.

### Deliberate omission

No standing-policy change is offered here. Policy made under a customer-facing
clock is bad policy. That belongs in Agent Coach, later, with nobody waiting.

---

## 7. Activity Trace

**Answers:** *"What exactly did Alivo do for this customer, in what order,
and did everything work?"*

Activity is **not**: developer logs, chain of thought, a generic activity
feed, or analytics.

### The beat model — frozen

A **beat** is one meaningful thing that changed in the business, not a system
event. "Alivo booked an inspection" is one beat; availability check, rep
selection, appointment creation, confirmation and the JobNimbus update sit
inside it, revealed only on expansion. This fold is what prevents a feed.

```ts
Beat = { id, time, actor, sentence, consequence?, weight,
         details?, recording?, stopped?, failure? }

TraceRow = { kind: "day" } | { kind: "gap" } | { kind: "beat" } & Beat
```

### Weight — derived, never displayed

| Weight | Structure |
|---|---|
| `ambient` | Inside a beat, not on the spine |
| `quiet` | One line on the spine |
| `consequential` | On the spine, plus its consequence |
| `needs-human` | **Breaks out** into a bordered block |
| `failed` | **Breaks out** into a bordered block |

The rule: did this change a calendar, a CRM record, money, or a promise to a
customer? Then it is consequential. Did it fail or block? Then it interrupts.

### Structure

- Head sentence answers "did everything work" before any reading.
- A real time column (68px, tabular) — the single choice that makes a
  timeline read as a record rather than a story graphic.
- A hairline spine, broken at day headers.
- Gaps shown as gaps (`quiet for 4 days`), never as invented events.
- Every beat is a sentence whose **subject is the actor** — Sarah, Alivo,
  Ray, JobNimbus. Human actions are distinguishable because a person's name
  is the subject.
- The trace ends in **current state**, not the last historical event.

### Expansion

Inline, pushing the timeline down. Never a modal, never a navigation. One
beat open at a time; opening another closes the previous. The expansion
component unmounts on collapse, so the transcript is hidden by default on
every open, not just the first.

Call recordings: "Play recording / 3m 12s" (prototype, no audio) plus "Read
what was said". **Reading changes nothing** — no timers reset, no ownership
changes, no drafts lost, no exception resolves because someone inspected it.

### State A — Sarah Mitchell

> Everything Alivo did for Sarah worked.
> One decision is waiting on you.

Thursday call → inspection booked → Friday inspection → Tuesday quote →
Wednesday follow-up → **quiet for 4 days** → today's competitor question →
holding reply → **ALIVO STOPPED** (bordered, breaks the spine).

Ends: *Nothing further will be sent to Sarah until you decide.*

### State B — Marcus Webb

> One thing didn't work.
> Marcus has been told Friday at 8:30 AM.
> Your scheduling record still shows Thursday at 10:00 AM.

Four successful beats, then the failure block, which states in order: **Why**
(business reason — Ray is marked unavailable Friday), **What this means**
(customer impact before cause), **What still works** (isolation), and retry
behaviour in plain language ("Alivo tried again and stopped, because nothing
had changed").

Remedies are concrete and say what will happen. Primary: **Assign Tomas —
Alivo will update JobNimbus**. Never *Resolve*, *Retry*, *Fix*.

**After resolution the failure does not disappear.** It collapses to a quiet
historical line ("JobNimbus did not accept the change / Fixed by Mike at
11:22 AM"), a success beat is appended, and the head and closing lines update.
The trace is an operational record.

### Failure kinds — frozen distinction

| Kind | Behaviour |
|---|---|
| `rejected` | The system understood and refused. **Stops, interrupts, asks a human.** |
| `unreachable` | Cannot be reached at all. **Retries quietly**, no interruption block, no exception unless it persists. |

### External systems

Always named: **JobNimbus**, never "the CRM" or "the system". Never *sync
succeeded*, *API request succeeded*, *POST succeeded*, *HTTP 200*.

---

## 8. Agent Coach

**Answers:** *"What keeps requiring my help, and what can I safely teach
Alivo so it needs me less often?"*

### Safety principle — frozen

**Alivo may identify patterns and propose improvements. Alivo does not
silently expand its own authority.**

Never "Alivo learned this." Always "Alivo noticed a repeated pattern and
prepared an improvement for your review."

### Risk model — frozen

| Tier | Contents | Coach behaviour |
|---|---|---|
| **Lower-risk guidance** | FAQs, service area, process, approved company policy | May propose a change; approvable directly after review |
| **Consequential authority** | Discount limits, pricing, contract and appointment commitments, refunds, financial promises | **Surfaces the pattern only.** Never proposes a change. |

The competitor-pricing pattern must never produce "Increase Follow-up
discount authority to 13%." It states the pattern and stops. Changing pricing
authority would need its own review with explicit scope and stronger
confirmation — deliberately not built.

### Overview

Deliberately quiet. Not an inbox, not a feed, not analytics. Exactly two
improvements. No scores, no percentages as decoration, no charts, no
gamification.

> AGENT COACH
> 2 improvements worth reviewing
> Alivo found repeated situations where your agents needed the same kind of help.

Each item states the observation, not the recommendation, and links to review.
Settled items leave the overview and appear as "N already decided · Change
history".

### Improvement detail — insurance deductibles

Order: header (14 asked / 11 required help) → **What Alivo noticed** →
**Why this matters** → **Past examples** (3 of 14, marked prototype data) →
**What Follow-up could say** (editable) → **the boundary** → **Scope** →
**Test against past situations** → decision.

**The boundary is the most important thing on the page.** `What would change`
and `What would not change` sit side by side, bounded by rules above and
below, at 14px against 13px body — carried by position, space and size, not
by a box. The operator must understand the behavioral boundary before
reaching approve.

**Test against past situations** is a behavior preview, not a confidence
score and not a prediction: Sarah B. would answer, David R. would still ask
for help because the customer asked to waive, Carlos M. would answer.

### Approval

Primary: **`Approve for Follow-up`**. Never *Train AI*, *Teach model*,
*Deploy prompt*, *Save configuration*.

Confirmation is plain — "Approved for Follow-up", what starts now, and
"Questions outside this guidance will still come to you" — plus **View change
history**. The guidance becomes read-only. No animation, no celebration, no
gamification.

### Editing

Editable before approval. Editing swaps the note to *"You edited this.
Approving will use your version, not Alivo's original wording."* The primary
label never changes. The confirmation adds *"Approved using your edited
wording."* No separate settings workflow.

### Dismissal

`Not useful` reveals four reasons **inline, not in a modal**: Already handled
another way · Not enough evidence · I don't want Alivo answering this · Other.
**Feedback is optional** — dismissal works with no reason selected. Dismissed
items leave the overview and are preserved in history.

### History and turn-off

Shows title, `Approved by Mike · Sep 19, 2026 · your edited wording`, and
`Current status: Active for Follow-up`, with **Turn off this guidance**.

Turning off flips status to *Turned off*, **keeps the approval record**, and
states that Follow-up is back to asking for human help. **Nothing is deleted.**

### Mission Control connection

Approval produces **no new alert**. The Coach line simply gets quieter:

```
2 repeated patterns found that could reduce future exceptions
  → 1 improvement still worth reviewing
  → Nothing waiting to review
```

Plus one low-contrast past-tense note: *Deductible guidance approved for
Follow-up*. The attention count and the exception queue are untouched.

---

## 9. Cross-screen state

### Persisted — must survive navigation

| State | Key | Contents |
|---|---|---|
| Exception Detail draft | `alivo:decision:sarah-mitchell` | `option`, `amountInput`, `message`, `messageEdited` |
| Coach decisions | `alivo:coach` | per slug: `status`, `guidance`, `edited`, `approvedBy`, `approvedAt`, `dismissReason` |

Both use `sessionStorage` with the same pattern, and the same hard-won fix:
**hydration is gated on state, not a ref.** A ref lets the persist effect run
in the same commit as hydration and write the defaults back over the restored
values. This is a correctness requirement, not a style choice.

Covered by this: the edited counter amount, the edited customer message, the
selected decision option, Coach guidance edits, Coach approval, Coach
dismissal, and Coach turn-off.

### NOT persisted — component-local only

| State | Location | Resets on |
|---|---|---|
| **Marcus resolution** | `useState` in `ActivityTrace` | Any navigation away |
| Conversation panel open/closed | `ExceptionDecision` | Navigation |
| Expanded beat | `ActivityTrace` | Navigation |
| Recording playing / transcript open | `BeatExpansion` | Collapse (intentional) |
| Exceptions filter and search | `ExceptionsIndex` | Navigation |

**Marcus's resolution is an inconsistency, not a decision.** See §13.

### Session-only prototype state

All of the above is session-scoped and disappears when the tab closes. No
backend. No action ever sends anything: the Exception Detail commit, Reassign,
Handle Sarah myself, Assign to someone else and Mission Control's Reassign are
all inert, and the surfaces say so ("Prototype — nothing is sent").

---

## 10. Canonical language

### Required — keep these exact

| Phrase | Where |
|---|---|
| `Needs you` / `3 need you` | Top bar attention count |
| `Needs your decision` | Exceptions state, Sarah |
| `Needs attention` | Exceptions state, system exceptions |
| `Open` | Exceptions state, work exceptions |
| `Resolved` | A person intervened and finished it |
| `Self-resolved` | Alivo cleared it within existing authority |
| `That's everything.` | End of the Mission Control queue |
| `What ran without you` | Mission Control rail |
| `Alivo stopped` | Activity interruption, needs-human |
| `What Alivo knows` | Exception Detail, Activity expansion |
| `What Alivo doesn't know` | Exception Detail (see §13 — currently renders as `Doesn't know`) |
| `What Alivo established` | Activity expansion — conclusions, not reasoning |
| `What would change` / `What would not change` | Coach boundary |
| `Approve for Follow-up` | Coach primary action |
| `Agent Coach` | Section name everywhere |
| `Alivo noticed a repeated pattern and prepared an improvement for your review` | Coach framing |
| `Nothing further will be sent to Sarah until you decide.` | Sarah trace, current state |

Commit labels are **generated and state the outcome**: `Send counter at
$23,200`, `Match competitor at $21,500`, `Keep quote at $24,800`, `Ask Sarah
what's included`.

### Prohibited — must never appear in the interface

confidence score · AI optimization · performance score · agent intelligence ·
training score · teach model · train AI · deploy prompt · save configuration ·
chain of thought · tokens · latency · model name · model reasoning · prompt ·
embeddings · intent classifier · queue depth · webhook · JSON · HTTP status ·
API errors shown to business users · "Alivo learned this" · Resolve / Retry /
Fix as a button label · Approve / Confirm / Submit as a commit label

Verified absent by scan across Coach and Activity routes.

---

## 11. Design constraints for high fidelity

**Do not imitate Alivo's current product UI.** Its dashboard layouts, cards,
navigation styling, buttons, tables, borders, shadows, spacing and component
styling must not determine this concept.

**Brand identity may be retained** where appropriate — brand colours, logo,
and brand typography if it serves the work.

**The interface will be redesigned as a modern 2026 vertical AI SaaS
product.**

### Prohibited

- Generic SaaS dashboard appearance
- Cards everywhere; cards within cards
- Huge metric cards or a KPI row
- Decorative AI gradients, glows, sparkles, robot imagery
- Glassmorphism; futuristic or cyberpunk styling
- Chatbot visual language
- Every status as a coloured pill
- Decorative charts
- Marketing-scale typography inside the application
- Excessive rounded rectangles; overuse of icons

### The interface should feel

operational · precise · calm · high trust · fast to scan · modern · crafted

### Reference qualities — not layouts to copy

| Reference | What to take |
|---|---|
| **Linear** | Hierarchy, precision, interaction polish |
| **Attio** | Dense business information, records, operational structure |
| **Decagon** | AI agent supervision and observability |
| **Sierra** | Approachable autonomous AI |
| **Lemma** | Failure → evidence → explanation → improvement loop |

### Craft rules carried forward from the low-fidelity pass

These are structural findings, not styling preferences, and they should
survive the visual pass:

- **The container means interruption.** A box appears when normal flow has
  stopped. If boxes go everywhere, that meaning is spent.
- **Only deviations get a marker. Normal is unmarked.** This eliminates most
  badges before they are designed.
- **Leave AI unmarked; mark the human.** Alivo performs most actions, so
  marking it marks everything. The human's presence is the rare, important
  event.
- **Dominance through isolation and contrast, not size and colour.** One
  dominant element per screen.
- **Money is tabular, never abbreviated in a decision context, never
  coloured.**
- **Two kinds of time.** Clock time is a fact, static and precise. Elapsed
  time is pressure — it is the only live element, and it must update without
  animating or drawing the eye.
- **Structure from alignment, not boxes.** Few alignment axes per screen.
- **Inspection panels never dim the surface behind them, never stack, and
  never change state.**

---

## 12. Locked vs flexible

### LOCKED — requires explicit approval to change

**Product model**
- The core loop and the four principles
- The four registers (FACT / POLICY / AI SUGGESTION / HUMAN DECISION) and
  their structural separation
- Human authority: Alivo proposes, humans decide; no silent authority
  expansion

**Information architecture**
- All routes in §2 and their purposes
- Mission Control as the default landing surface
- Activity always entered scoped; no unscoped feed
- Exceptions as record vs Mission Control as prioritisation

**Mission Control**
- Exactly one expanded exception; the precedence order for that slot
- Compressed one-line rows for everything else
- The operating statement + coverage line pairing
- "What ran without you" as counterweight
- Explicit end-of-queue
- Coach entry placement below the queue
- No KPI cards, no charts, no agent roster

**Exception Detail**
- The eight-section semantic order
- Required-above-allowed in the pricing math
- The 1440×900 fold requirement
- Editable amount driving the commit label
- Commit labels that state the outcome
- Panel behaviour: no dimming, no stacking, no state change on read
- Hidden-information list

**Activity**
- Beats, not events
- Weight derived from business consequence
- Actor as sentence subject
- Interruptions break the spine
- Gaps shown as gaps
- Trace ends in current state
- `rejected` vs `unreachable` behaviour
- Failures remain in history after resolution
- External systems named explicitly

**Agent Coach**
- The safety principle and the two-tier risk model
- Consequential authority is surfaced, never proposed
- Boundary (change / not change) as the most important element
- Behavior preview is not a score or prediction
- Optional dismissal feedback
- History is never deleted; turn-off preserves the record
- Approval makes Mission Control quieter, never louder

**Cross-cutting**
- State that must survive navigation (§9)
- Canonical and prohibited language (§10)
- Reading never changes state, anywhere

### FLEXIBLE — visual design may change freely

- Typography: family, scale, weight, tracking, leading
- Colour: palette, brand application, semantic colour
- Spacing scale and rhythm
- Grid tuning, column widths, measure
- Borders, dividers, surface treatment, elevation
- Navigation visual treatment
- Icons, where they earn their place
- Control design: buttons, inputs, radios, fields
- Hover, focus, active and disabled states
- Transitions, micro-interactions, motion
- Responsive presentation and breakpoint tuning
- Information emphasis within the frozen order
- Progressive disclosure, **provided the content remains accessible**
- Empty and degraded states (must be built — see §13)

### The rule

**High fidelity may improve presentation. It may not silently change product
behavior, information architecture, copy meaning, state transitions,
permissions, AI authority or user decisions.**

---

## 13. Known contradictions in the implementation

Recorded honestly. High fidelity should resolve these deliberately, not
inherit them.

**1. Mission Control's count is hardcoded and disagrees with the data.**
The operating statement reads "3 decisions are waiting on you" as static
text, and the top bar reads "3 need you", while four open exceptions exist
(Sarah + three). `ALSO WAITING 3` is correctly derived from `queue.length`.
The coherent reading is that *3 decisions* counts customer decisions and
JobNimbus is a system exception rather than a decision — but nothing in the
code expresses that. **Decide the rule and derive both numbers from it.**

**2. Empty state and degraded state are designed but not built.**
Mission Control renders one state only. Both are specified in §4 and must be
implemented.

**3. Marcus's resolution does not persist.**
`ActivityTrace` holds it in local `useState`, so navigating away and back
resets the failure to unresolved — inconsistent with the Exception Detail
draft and Coach decisions, which do persist. Either persist it under the same
pattern or state that trace resolution is intentionally ephemeral.

**4. The same policy has three wordings.**
- Mission Control (hardcoded JSX): *"Competitor matches require human approval."*
- `leadException.policy[1]`: *"Competitor matches always come to you, whatever the amount."*
- `leadException.rules[1]`: *"Competitor matches require your approval."*

`policy` is now orphaned; Mission Control reads neither field. **Collapse to
one source.**

**5. Canonical label divergence.**
Exception Detail renders **`Doesn't know`**; the canonical phrase is **`What
Alivo doesn't know`**. The Activity expansion correctly uses `What Alivo
established`.

**6. Two model tiers are declared but never used.**
`Weight = "ambient"` and `FailureKind = "unreachable"` exist in the types and
appear in no fixture or render branch. They are intentional parts of the
model; nothing currently demonstrates them.

**7. Navigation active state is prefix-based.**
`pathname.startsWith()` means `/exceptions/sarah-mitchell` highlights
*Exceptions* and `/coach/history` highlights *Agent Coach*. Defensible now
that an Exceptions index exists, but Exception Detail is reachable from
Mission Control and its in-page back link says "← Mission Control", so the
nav and the page disagree about where the user is.

**8. Inert controls.**
Commit, Reassign (both screens), Handle Sarah myself, Assign to someone else,
and "Full report →" have no behaviour. The surfaces label themselves as a
prototype, but these are the primary actions of the product and high fidelity
should decide what they do.

**9. Stale comment.**
`AppShell.tsx` documents "capped at 1280px and left-biased"; the code is
`mx-auto max-w-[1216px]` — centred. The code is correct.

**10. Orphaned file.**
`src/components/Placeholder.tsx` is no longer imported anywhere; all four
routes are built.
