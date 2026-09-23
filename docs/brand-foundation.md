# Alivo — Brand Foundation

**Status:** Research. Source material only.
**Purpose:** establish the real Alivo brand so the high-fidelity pass can
carry genuine brand DNA without inheriting the current product UI.
**Governs nothing on its own.** Subordinate to `docs/ux-spec.md`; feeds
`docs/visual-direction.md`, which is approved and unchanged.

This document records what was **observed**. It does not invent brand rules.

---

## 0. Sources inspected

| # | Source | What it gave |
|---|---|---|
| 1 | `https://www.alivo.ai/` (homepage) | Live CSS custom properties, computed type, logo, agent presentation, button geometry |
| 2 | `https://www.alivo.ai/features/overview` | Confirmed tokens across pages; two additional colour variables |
| 3 | `https://www.alivo.ai/meet-alivo` | Voice and agent naming |
| 4 | `https://www.alivo.ai/case-studies/roofing-and-more` | Asset inventory; absence of photography |
| 5 | `cdn.prod.website-files.com/…/679be427832c9ce38a6f7c55_Logo_Blue.png` | The logo asset itself, pixel-sampled |
| 6 | `cdn.prod.website-files.com/…/679cdfafdab821e2cc1f1f22_Lilly.png` | Agent illustration style |

**Method.** Colours and typefaces were read from the site's own declared CSS
custom properties and computed styles, not estimated from screenshots. The
logo blue was sampled from the asset's pixels via canvas. Where a value is
marked **verified**, it was read directly from Alivo's code or assets.

**Platform note (verified).** The marketing site is built on **Webflow**
(`cdn.prod.website-files.com`, `webflow-icons` font). This matters only
because it explains some inconsistency in the CSS — it is a marketing site,
not a design system.

### Confidence key

| Level | Meaning |
|---|---|
| **VERIFIED** | Read directly from official Alivo code, assets or copy |
| **INFERRED** | Strong visual inference, not confirmed as an official rule |
| **UNKNOWN** | Cannot be reliably determined from public material |

---

## 1. Logo and mark

### What exists — VERIFIED

**One asset was found across the entire site:** `Logo_Blue.png`, 1710 × 610px,
transparent background, ratio **2.80 : 1**. It is used at 78 × 28 in the
navigation.

**Form:** a horizontal lockup — symbol on the left, wordmark on the right.

**Symbol:** a filled **speech bubble** with a small tail at the lower right,
containing **three vertical rounded bars of varying height** — a voice or
audio waveform. Conversation plus voice, which is exactly the product.
Geometrically simple, no gradient, no outline, single flat colour.

**Wordmark:** "alivo", **all lowercase**, geometric sans, heavy weight, tight
spacing. Single-storey `a`, circular `o`, circular tittle on the `i`, pointed
`v`. Rounded terminals. Optically balanced and quite friendly.

**Colour:** a single flat blue, sampled at **`#2C67F6`** (268,007 of the
opaque pixels — effectively the only colour in the file).

### Assessment

| Question | Finding |
|---|---|
| Works at product-navigation scale? | **Yes — VERIFIED.** Already used at 28px tall on Alivo's own nav. |
| Symbol works standalone? | **INFERRED yes.** It is geometrically simple and legible small, but no standalone symbol asset was published, so this is untested. |
| Light-background version? | **UNKNOWN — none found.** The entire site is dark; only the blue-on-transparent asset exists. |
| Monochrome / single-colour version? | **UNKNOWN — none found.** |
| Clear-space rule | **UNKNOWN.** No brand guidelines are public. In the nav the lockup is given roughly its own cap-height in surrounding space — INFERRED only. |
| Wordmark typeface | **UNKNOWN.** Definitively **not Montserrat** (Montserrat's `a` is double-storey; the wordmark's is single-storey). It is a geometric sans in the Poppins / Gilroy family of shapes, possibly customised. Not identified. |

**This is a gap that matters.** Our product surface is currently light. No
verified light-mode or single-colour logo exists, so either Alivo must supply
one or the high-fidelity pass must test the blue mark on a light surface and
flag it for approval. **Do not redraw the logo.**

---

## 2. Colour

All values below are **VERIFIED** — declared in Alivo's own stylesheets or
sampled from Alivo's own assets.

### The current marketing system

| Value | Variable | Where it appears | Likely role |
|---|---|---|---|
| `#06091A` | `--navy` | Page background, site-wide | Primary surface |
| `#0D1330` | `--navy2` | Raised sections | Secondary surface |
| `#111827` | `--navy3` | Deeper panels | Tertiary surface |
| `#2563FF` | `--blue` | CTAs, links, headline emphasis, agent role labels, eyebrow pills, nav active | **The brand colour** |
| `#3B7CFF` | `--blue2` | Hover / lighter blue | Interactive variant |
| `rgba(37,99,255,.18)` | `--blue-glow` | Drop shadow under the primary CTA | Marketing glow |
| `#F8FAFC` | `--white` | Body text on dark | Primary foreground |
| `#94A3B8` | `--muted` | Secondary copy | Muted foreground |
| `rgba(255,255,255,.08)` | `--border` | Hairlines | Border |
| `rgba(255,255,255,.04)` | `--card` | Card fill | Surface fill |
| `rgba(255,255,255,.07)` | `--card-hover` | Card hover | Surface hover |
| `#10B981` | `--green` | Status | Success |
| `#F59E0B` | `--amber` | Status | Warning |
| `#EF4444` | `--red` | Status | Error |
| `#8B5CF6` | `--purple` | Accent (features page) | Secondary accent |
| `#06B6D4` | `--teal` | Accent (features page) | Secondary accent |

**Observation — INFERRED:** `--green`, `--amber`, `--red`, `--purple` and
`--teal` are the exact Tailwind default palette values (emerald-500,
amber-500, red-500, violet-500, cyan-500). These read as framework defaults
rather than authored brand decisions, and should not be treated as brand
colour.

### A second, older colour system is also present — VERIFIED

Declared on the same pages, with different naming conventions:

| Value | Variable | Note |
|---|---|---|
| `#1179FC` | `--theme-color-01` | **A second, different blue** |
| `#B8D7FE` | `--theme-color-02` | Pale blue |
| `white` / `#F0F4F8` / `#526061` / `#081717` | `--neutral-01…04` | A light-mode neutral ramp |

**Per-agent colour system — VERIFIED and important:**

| Agent | Dark | Light | X-light |
|---|---|---|---|
| agent-01 | `#6615DD` (purple) | `#D1B9F5` | `#F9F5FF` |
| agent-02 | `#02BD6E` (green) | `#B3EBD3` | `#E5FCF2` |
| agent-03 | `#EF8B55` (orange) | `#FFCAB3` | `#FCDDD0` |
| agent-04 | `#E7AD26` (gold) | `#F0D088` | — |
| agent-05 | `#32A9BF` (teal) | — | — |

**This is the single most consequential colour finding.** In Alivo's existing
system, **hue already carries the meaning "which agent."** That constrains
what any new hue can mean — see §10.

### Colour conflicts found — VERIFIED

1. **Two brand blues.** The logo asset is `#2C67F6`; the site CSS `--blue` is
   `#2563FF`; the older system's `--theme-color-01` is `#1179FC`. Three close
   but non-identical blues. **UNKNOWN which is canonical.** This must be
   resolved with Alivo before any colour system is built.
2. **Two neutral systems.** A dark navy ramp and a separate light `--neutral`
   ramp coexist, suggesting a light-surfaced product alongside a dark
   marketing site. The product UI itself was not inspected.

---

## 3. Typography

### Verified

| Role | Typeface | Evidence |
|---|---|---|
| **Headlines** | **Montserrat**, weight **800** | Computed `font-family` on `h1`/`h2`; Google Fonts request for Montserrat 500–800 |
| **Body / UI** | **Inter**, weights **300–700** | `--font-family: Inter, sans-serif`; computed body style |
| **Logo wordmark** | Not identified — **not Montserrat** | Single-storey `a` vs Montserrat's double-storey |

Both are Google Fonts, loaded via `fonts.googleapis.com`.

### Headline behaviour — VERIFIED

- Montserrat **800** — heavy, near-black
- Large: **80px** on the homepage, **67px** on interior pages
- **Tight negative tracking: −3.2px at 80px ≈ −0.04em** — a deliberate,
  consistent treatment
- Line height ~1.08 (86.4px at 80px)
- Sentence case, full stops used as punctuation in headlines
  ("Stop Missing Calls. Start Booking Jobs.")
- One word per headline set in blue for emphasis

### Body behaviour — VERIFIED

- Inter **400** at ~19px for lead paragraphs
- Colour `#94A3B8` (`--muted`) on dark
- Normal tracking
- Buttons: Inter **600**, 14–16px, normal tracking
- Eyebrow labels: Inter **600**, ~12.8px, **uppercase with +0.04em tracking**

### Character — INFERRED

The pairing reads as **confident and commercial**: a geometric, tightly
tracked heavy headline face doing the persuading, and a neutral, highly
legible UI face doing the explaining. Montserrat at 800 with tight tracking is
a marketing voice — it is emphatic rather than precise. Inter is the
workhorse and carries no particular personality, which is appropriate.

**Assessment for our product.** Inter is a genuinely good operational face and
is already Alivo's. Montserrat 800 at marketing scale is the opposite of what
our approved direction calls for — our §5 explicitly rejects marketing-scale
type inside the application. Montserrat can survive as a *brand* voice in
small, rare moments; it should not become our headline system.

---

## 4. Geometry, icon and illustration character

### Radius — VERIFIED, and inconsistent

A census of the homepage found **eight different radius values in active use**:
`10px` (29 uses), `50%` (27), `99px` (15), `16px` (13), `12px` (11), `4px`
(11), `6px` (10), `20px` (9).

Buttons alone use 10px and 12px. Pills use 99px. **There is no radius
discipline.** This is a marketing-site characteristic and must not be carried
over as a system.

### Shadow — VERIFIED

One notable treatment: the primary CTA carries
`0 4px 20px rgba(37,99,255,.18)` — a **blue glow**. Elsewhere, shadows are
largely absent; separation is done with `rgba(255,255,255,.08)` hairlines.

### Icon character — INFERRED

Small inline SVGs at 18px, simple line/solid forms, no distinctive icon
system observed. Webflow's own icon font is loaded for UI chrome. **No
proprietary icon language exists.** UNKNOWN whether the product uses one.

### Illustration — VERIFIED

Agent portraits (`Lilly.png`, `Evan.png`, ~990 × 990) are **flat vector
character illustrations**: circular crop, pastel background disc matching the
agent's colour, simplified features, flat fills, no outlines, no gradients.
Friendly and corporate, in the widely-used open illustration-library style.

### Photography — VERIFIED ABSENT

**No photography was found anywhere on the pages inspected.** A roofing
product with no roofs, no crews, no trucks, no job sites. The brand rests
entirely on typography, dark surfaces, blue, and illustrated agents.

### Motion — UNKNOWN

Scroll-triggered fades were observed on section entry, but no deliberate
motion language could be established from static inspection. Not enough
evidence to characterise.

---

## 5. Voice

### Verified characteristics

**Conversational, direct, and unmistakably promotional.** Short declarative
sentences. Heavy second person — "your state", "your business", "your CRM",
"your workflow".

**Confident, occasionally boastful.** "Stop Missing Calls. Start Booking
Jobs." · "Four Specialists. One Unstoppable Team." · "Not generic AI. Not a
CRM."

**Defines itself by negation.** Repeatedly positions against alternatives
rather than describing itself neutrally.

**Outcome-led, not capability-led.** Talks about booked jobs, missed calls and
staffing relief rather than about models or technology. No technical AI
vocabulary observed anywhere in public copy.

**Roofing-native but jargon-light.** Uses accessible trade language — storm
calls, inspections, estimates, full replacement — and names the real tools
its buyers use (**JobNimbus**, **AccuLynx**).

**Agents are described as people.** Named, gendered, first-person: "Hi, I'm
Lilly! I answer every call 24/7…" Roles are stated as job titles — Phone
Agent, Web Lead Agent, Estimate Agent, Reviews Agent — and compared to human
staff ("just like a real receptionist").

### Assessment

The marketing voice is warm, salesy and first-person. **Our product voice is
already frozen and is deliberately different** — factual, past tense,
attributed, never promotional. These should not be reconciled. A marketing
site persuades; an operational record reports. The *brand* connection is
plain-spokenness and the refusal of technical jargon — both of which our
product voice already shares.

---

## 6. Competitive position — what makes it recognisable

**Versus typical roofing software** (AccuLynx, JobNimbus, Roofr): those are
light, dense, utilitarian, blue-grey, and look like field-service tools built
in the 2010s. Alivo's dark navy and heavy tight type reads as a *technology*
company rather than a trade tool. That contrast is its main visual
differentiator.

**Versus typical CRM software:** Alivo does not present as a CRM and says so
explicitly. No pipeline imagery, no grids, no record-centric visuals in its
marketing.

**Versus typical AI SaaS:** here it is more conventional. Dark navy, a strong
blue, a glowing CTA and a gradient-lit hero are the standard 2024–2026 AI
startup costume. **What is genuinely distinctive is the named illustrated
agent team** — treating AI as staff you meet rather than as a capability you
configure. That, plus the speech-bubble-and-waveform mark, is the recognisable
core.

---

## 7. Classification — keep, adapt, reject

### KEEP AS BRAND DNA

| Element | Why |
|---|---|
| **The logo lockup and mark** | The only true proprietary asset. Speech bubble + waveform is apt and works at nav scale. |
| **Alivo blue** | The single most recognisable brand signal, used consistently across every surface. |
| **Inter** | Already Alivo's UI face, and genuinely well suited to dense operational reading. |
| **Lowercase, geometric, friendly wordmark character** | The approachability that separates Alivo from legacy trade software. |
| **Plain-spoken, jargon-free register** | No technical AI vocabulary in any public copy — compatible with our frozen product voice. |

### ADAPT

| Element | How it must change |
|---|---|
| **Montserrat** | Keep as a rare brand voice at small scale if at all. Its marketing-scale 800-weight, −0.04em treatment must not enter the product. |
| **Named agents (Lilly, Evan, Alex, Jenna)** | A real and distinctive brand asset — but our UX spec's canonical copy uses functional names ("Follow-up"). **This is a live conflict requiring a decision — see §9.** |
| **Per-agent colour** | The idea that an agent has an identity is worth keeping; five saturated hues is not. If retained, it must be far more restrained. |
| **Dark navy surface** | Defensible as a brand signature, but our product is read outdoors on phones. Surface polarity is a product decision, not a brand inheritance. |
| **Agent illustrations** | Strongly branded, but our visual direction rejects avatars in the operational record. Appropriate for onboarding or an agent roster; not inside the record. |

### DO NOT CARRY OVER

| Pattern | Why |
|---|---|
| **The blue glow shadow** (`0 4px 20px rgba(37,99,255,.18)`) | Decorative AI-product costume. Directly rejected by the approved direction. |
| **Eight competing radius values** | No discipline. Our system needs one radius decision, not eight. |
| **Translucent white card fills** (`rgba(255,255,255,.04)` on hover `.07`) | Card-based composition and near-glass surfaces. Both rejected. |
| **Pill eyebrows** (99px radius, tinted fill, tinted border, tracked uppercase) | Badge language our direction explicitly rejects. |
| **Tailwind-default status colours** | Framework defaults, not brand decisions. Our semantic colours must be authored. |
| **Gradient-lit hero treatment** | Marketing device with no operational function. |
| **Headline-scale type inside a UI** | 67–80px display type is a landing-page behaviour. |
| **First-person agent voice** ("Hi, I'm Lilly!") | Correct for marketing; wrong for a record that must report facts. |
| **Interstitial modal, floating chat widget, sticky demo prompts** | Marketing furniture with no place in an operational tool. |

---

## 8. Brand DNA to carry into Mission Control

**Five elements. The minimum for someone who knows Alivo to recognise this as
Alivo, despite a completely redesigned interface.**

### 1 · The logo lockup
Used once, at navigation scale, unmodified. It is the only proprietary asset
Alivo has and it carries the entire recognition burden. *(Requires a
light-surface or single-colour variant — see §9.)*

### 2 · Alivo blue
The most recognisable signal in the brand. Carried into the product as the
**interactive and brand colour** — the meaning it already has for Alivo users
— not repurposed. See §10.

### 3 · Inter as the working typeface
Already theirs, already correct for the job. Continuity that costs nothing
and serves the product genuinely.

### 4 · Geometric, lowercase, approachable character
The quality that distinguishes Alivo from legacy trade software. In our
product it should appear in *shape language and restraint* — even radii,
circular forms, unfussy letterforms — rather than in decoration.

### 5 · Plain speech, no technical vocabulary
Alivo's public language never mentions models, prompts or AI mechanics. Our
frozen product voice already enforces this. It is the deepest point of
agreement between brand and product, and the easiest to lose.

---

## 9. Current UI character we must not inherit

**Caveat, stated plainly: Alivo's authenticated product UI was not inspected.**
Everything below is drawn from the public marketing site. Items are therefore
about *brand-surface* character, not confirmed product patterns.

Reject:

- Translucent white-on-navy cards as the default composition unit
- Blue glow and any coloured shadow
- Multiple, unrelated radius values
- Tinted pill badges for labels and status
- Gradient-lit hero panels
- Display-scale headlines inside an application
- Tailwind-default semantic colours
- Saturated five-hue agent colour coding
- Illustrated character avatars inside operational records
- Floating marketing furniture — chat bubbles, interstitials, sticky prompts
- First-person agent voice in any record of what happened

### Two open conflicts requiring a decision

**1 · Agent naming.** Alivo's real agents are **Lilly, Evan, Alex and Jenna** —
human names with illustrated portraits. Our frozen UX spec uses functional
names (**Follow-up**, Intake, Scheduler) and that copy is LOCKED. Using real
Alivo agent names would be strong brand continuity; it would also change
frozen copy and shift the product's register toward personification, which
our direction resists. **This needs an explicit decision. I have not changed
anything.**

**2 · No light-surface logo exists.** Our product is light-surfaced; Alivo has
published only a blue-on-transparent mark used on navy. Either Alivo supplies
a variant, or the high-fidelity pass tests the existing mark on a light
surface and flags the result.

---

## 10. The human-attention accent question

### The evidence

**Alivo blue is heavily over-subscribed.** Verified uses on the marketing
site alone: the logo, primary CTAs, text links, the emphasised word in every
headline, eyebrow pill text and borders, active navigation, the chat widget —
**and agent role labels** (`rgb(37,99,255)` on "Phone Agent", "Web Lead
Agent", etc.).

**Hue already means "which agent."** Alivo maintains a five-hue per-agent
colour system (`--agent-01…05`). In their existing language, a colour on a
piece of AI output identifies the AI.

### Assessment of the three options

**Option A — Alivo blue doubles as the human-attention accent. Rejected.**

Two independent failures. First, exclusivity: our approved direction states
that the accent's power comes from meaning exactly one thing, and blue already
means brand, interactive, link, emphasis and active. Second, and worse,
**semantic inversion** — blue is currently the colour Alivo puts on *agent*
labels. Making the AI colour mean "a human is required" would be backwards for
anyone who knows the brand.

**Option B — blue stays brand/navigation; human attention gets its own hue.
Partially adopted.**

Coherent, but introduces a second strong hue into a product whose entire
thesis is contrast restraint, and risks colliding with the agent-colour system
if agent identity is ever shown.

**Option C — human attention does not depend on hue. Recommended as the
primary mechanism.**

### Recommendation

**Primarily C, with a disciplined minimum of B.**

**Human attention is carried structurally, not chromatically** — by isolation,
space, weight, a raised contrast floor, attribution lines, and the bounded
surface that our system already reserves for interruption. This is exactly
what the approved direction's attention ladder describes, it survives
colour-blindness and sunlight, and it does not degrade when three items need
attention at once.

**Alivo blue keeps the meaning it already has: brand and interactive
affordance** — the logo, focus rings, links, and the primary commit control.
Existing Alivo users need to learn nothing.

**One elegant consequence.** The most important interactive element on a
decision surface *is* the human's commit action. So blue lands on the human
decision naturally, by being the colour of *the thing you act with*, without
ever being defined as "the thing that needs you." The obligation is carried by
structure; the affordance is carried by blue. No collision, and the brand
colour ends up exactly where it should be.

**One authored hue is reserved for tier 5 — failure.** Not a Tailwind default,
and used nowhere else. This is the minimum viable B: a single semantic colour
for *something is broken*, distinct from *something needs your judgment*,
which our direction already requires to look different.

**Resulting semantic model — three meanings, no overlap:**

```
Alivo blue        →  brand, interactive affordance, focus
structure         →  obligation: a human is required
one authored hue  →  failure
```

**Blocking dependency.** Three different blues are in play — logo `#2C67F6`,
site `--blue: #2563FF`, legacy `--theme-color-01: #1179FC`. Which is canonical
is **UNKNOWN** and must be confirmed with Alivo before the colour system is
built.

---

## 11. What remains unknown

- Which blue is canonical
- Whether official brand guidelines exist
- Any light-surface, single-colour or standalone-symbol logo variant
- Logo clear-space and minimum-size rules
- The wordmark's typeface
- Whether the per-agent colour system is current or legacy
- Alivo's authenticated product UI — **not inspected, deliberately**
- Any motion language
- Any proprietary icon system
- Whether photography exists in the brand at all

**None of these should be invented.** Where the high-fidelity pass needs one,
it should be raised as a question rather than resolved by assumption.
