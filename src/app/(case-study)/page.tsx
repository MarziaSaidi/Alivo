import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Schibsted_Grotesk } from "next/font/google";

import Motion from "./Motion";
import { LoopDiagram, RegisterDiagram, StateDiagram } from "./Diagrams";
import s from "./caseStudy.module.css";

/* The case study's two faces load here, and their variables are applied to
   this page's wrapper rather than to <html>, so the prototype keeps Inter. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alivo Mission Control — human supervision for AI operations",
  description:
    "An independently conceived supervision layer exploring how human operators could oversee AI-driven home-service workflows.",
};

const STAGES = [
  { id: "overview", num: "01", name: "Overview" },
  { id: "how-it-works", num: "02", name: "How it works" },
  { id: "decisions", num: "03", name: "Key decisions" },
  { id: "built", num: "04", name: "Built" },
] as const;

const IMG = "/case-study/img";

function Shot({
  src,
  alt,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <Image
      className={s.shot}
      src={`${IMG}/${src}`}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 899px) 100vw, 900px"
      priority={priority}
    />
  );
}

export default function CaseStudyPage() {
  return (
    <div className={`${s.root} ${fraunces.variable} ${schibsted.variable}`}>
      <Motion revealClass={s.reveal} inClass={s.revealIn} activeClass={s.thumbActive} />

      <header className={s.header}>
        <span className={s.mark}>Marzia Saidi</span>
      </header>

      {/* ── INTRO — what, why, proof, in one viewport ──────────────────── */}
      <section className={s.intro}>
        <p className={s.eyebrow}>Independent concept · Design engineering · 2026</p>
        <h1 className={`${s.introTitle} ${s.display}`}>Alivo Mission Control</h1>
        <p className={s.introLead}>
          Human supervision for AI-powered home service operations.
        </p>
        <div className={s.introActions}>
          <Link className={s.cta} href="/mission-control">
            Try Mission Control
            <span aria-hidden="true">→</span>
          </Link>
          <a className={s.ctaGhost} href="#how-it-works">
            See how it works
          </a>
        </div>
        <p className={s.introNote}>
          An independently conceived supervision layer exploring how human operators
          could oversee AI-driven home-service workflows. Not commissioned by Alivo,
          not connected to any production system, and no customer shown is real.
        </p>
      </section>

      <section className={s.case}>
        <div className={s.grid}>
          {/* ── STICKY CONTEXT ──────────────────────────────────────── */}
          <aside className={s.meta}>
            <div className={s.metaBlock}>
              <p className={s.eyebrow}>About</p>
              <p className={s.metaCopy}>
                Alivo&rsquo;s agents book jobs, answer customers and update connected
                systems on their own. This explores what the human job becomes next:
                judgment, not monitoring.
              </p>
            </div>

            <div className={`${s.metaBlock} ${s.metaRow}`}>
              <div>
                <p className={s.eyebrow}>Role</p>
                <p className={s.metaStrong}>Design Engineer</p>
              </div>
              <div>
                <p className={s.eyebrow}>Year</p>
                <p className={s.metaStrong}>2026</p>
              </div>
            </div>

            <div className={s.metaBlock}>
              <p className={s.eyebrow}>Scope</p>
              <ul className={s.metaList}>
                <li>Product strategy</li>
                <li>UX &amp; interaction</li>
                <li>Visual system</li>
                <li>Frontend implementation</li>
              </ul>
            </div>

            <div className={s.metaBlock}>
              <p className={s.eyebrow}>State</p>
              <p className={s.metaCopy}>
                Working responsive prototype. Ten routes, real state, no backend.
              </p>
            </div>
          </aside>

          {/* ── CONTENT ─────────────────────────────────────────────── */}
          <div className={s.content}>
            {/* ═══ 01 OVERVIEW ═══ */}
            <section className={s.stage} id="overview" data-stage="overview">
              <div className={s.stageHead}>
                <span className={s.stageNum}>01</span>
                <h2 className={s.stageName}>Overview</h2>
              </div>

              <figure className={`${s.figure} ${s.reveal}`}>
                <Shot
                  src="mission-control.png"
                  alt="Mission Control. An operating statement reads 'Everything is running. 3 decisions are waiting on you.' One bounded exception for Sarah Mitchell sits above a short queue, with a quiet rail of work that ran without the operator."
                  width={2880}
                  height={1800}
                  priority
                />
                <p className={s.annotation}>
                  Only consequential work interrupts the operator. Everything the agents
                  did successfully stays in the rail on the right.
                </p>
              </figure>

              <p className={`${s.lead} ${s.display}`}>
                When AI handles the routine work, the human job stops being monitoring
                and becomes judgment.
              </p>
              <p className={s.body}>
                I explored what happens after agents become capable of most day-to-day
                operations: how the right exception reaches a person, how they get
                enough evidence to understand it, and how repeated decisions can improve
                the system without quietly widening what it is allowed to do.
              </p>
              <p className={s.body}>
                I designed and built all of it — the product model, the interaction
                design, the visual system and the frontend.
              </p>

              <div className={`${s.facts} ${s.reveal}`}>
                <div>
                  <p className={s.factLabel}>What it is</p>
                  <p className={s.factValue}>
                    A supervision layer for AI operations
                  </p>
                </div>
                <div>
                  <p className={s.factLabel}>What I did</p>
                  <p className={s.factValue}>
                    Product thinking, interaction design, frontend
                  </p>
                </div>
                <div>
                  <p className={s.factLabel}>What it is now</p>
                  <p className={s.factValue}>
                    A working, responsive, stateful prototype
                  </p>
                </div>
              </div>
            </section>

            {/* ═══ 02 HOW IT WORKS ═══ */}
            <section className={s.stage} id="how-it-works" data-stage="how-it-works">
              <div className={s.stageHead}>
                <span className={s.stageNum}>02</span>
                <h2 className={s.stageName}>How it works</h2>
              </div>

              <p className={`${s.lead} ${s.display}`}>
                One loop, from quiet autonomous work to guidance a human approved.
              </p>

              <figure className={`${s.figure} ${s.reveal}`}>
                <LoopDiagram />
              </figure>

              <div className={`${s.beat} ${s.reveal}`}>
                <div className={s.beatHead}>
                  <span className={s.beatStep}>01</span>
                  <h3 className={s.beatTitle}>Mission Control prioritises, it does not report</h3>
                </div>
                <p className={s.body}>
                  Not an activity dashboard. The screen carries the exceptions that need
                  a person, and nothing else competes for the first glance.
                </p>
                <p className={s.caption}>
                  &ldquo;3 need you&rdquo; counts records that need a human decision.
                  &ldquo;Open 4&rdquo; counts every unresolved record, system failures
                  included. Different questions, different numbers, both derived from
                  one rule.
                </p>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <div className={s.beatHead}>
                  <span className={s.beatStep}>02</span>
                  <h3 className={s.beatTitle}>The exception arrives with its evidence</h3>
                </div>
                <Shot
                  src="exception-detail.png"
                  alt="Sarah Mitchell's exception. The decision, the pricing rule, what Alivo knows and doesn't know, the suggestion, and the operator's four options with an editable counter amount."
                  width={2880}
                  height={1800}
                />
                <p className={s.annotation}>
                  The suggestion is visible. The commitment remains human.
                </p>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <div className={s.beatHead}>
                  <span className={s.beatStep}>03</span>
                  <h3 className={s.beatTitle}>The trace records what happened, in business language</h3>
                </div>
                <Shot
                  src="activity-sarah.png"
                  alt="Sarah's activity trace: a sequence of plain-language events ending with Alivo stopping because competitor matches require human approval."
                  width={2880}
                  height={1720}
                />
                <p className={s.body}>
                  Operational events, not logs and not model reasoning. An operator can
                  read what the agent did and where it stopped without being handed a
                  debugging problem.
                </p>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <div className={s.beatHead}>
                  <span className={s.beatStep}>04</span>
                  <h3 className={s.beatTitle}>Repeated situations become a review</h3>
                </div>
                <Shot
                  src="coach-overview.png"
                  alt="Agent Coach. Two improvements worth reviewing: insurance deductible questions, and competitor pricing requests."
                  width={2880}
                  height={1520}
                />
                <p className={s.annotation}>
                  Repeated behaviour becomes a review, not an automatic permission.
                </p>
              </div>
            </section>

            {/* ═══ 03 KEY DECISIONS ═══ */}
            <section className={s.stage} id="decisions" data-stage="decisions">
              <div className={s.stageHead}>
                <span className={s.stageNum}>03</span>
                <h2 className={s.stageName}>Key decisions</h2>
              </div>

              <p className={`${s.lead} ${s.display}`}>
                Four decisions did most of the work.
              </p>

              {/* D1 */}
              <div className={`${s.decision} ${s.reveal}`}>
                <p className={s.decisionQ}>How much AI activity should a human see?</p>
                <h3 className={`${s.decisionTitle} ${s.display}`}>
                  Autonomy without noise
                </h3>
                <p className={s.body}>
                  Routine successful work stays quiet. Mission Control shows one bounded
                  exception, a short queue, and a rail summarising everything that ran
                  without the operator. A screen where nothing needs a person is short
                  and quiet — that is the goal state, not an empty state.
                </p>
              </div>

              {/* D2 */}
              <div className={`${s.decision} ${s.reveal}`}>
                <p className={s.decisionQ}>
                  How should a deliberate AI stop differ from a system failure?
                </p>
                <h3 className={`${s.decisionTitle} ${s.display}`}>Stopped is not broken</h3>
                <p className={s.body}>
                  A policy stop means the agent behaved correctly, so it stays neutral. A
                  connected-system failure means something actually broke, so it gets
                  failure treatment. Collapsing the two would teach operators to
                  distrust a system that is working.
                </p>
                <div className={s.stackUp}>
                  <div className={s.twoUpItem}>
                    <p className={s.twoUpLabel}>Sarah — the agent stopped on purpose</p>
                    <Shot
                      src="crop-sarah-stop.png"
                      alt="A beat in Sarah's trace reading 'Alivo stopped', with the reasons beneath it: competitor matches require human approval, Alivo checked the pricing rules before stopping, follow-ups are paused until you decide."
                      width={1760}
                      height={836}
                    />
                    <p className={s.annotation}>
                      Policy stopped the agent here. Nothing failed, so nothing is
                      coloured as failure.
                    </p>
                  </div>
                  <div className={s.twoUpItem}>
                    <p className={s.twoUpLabel}>Marcus — something actually broke</p>
                    <Shot
                      src="crop-marcus-fail.png"
                      alt="A bounded failure block in Marcus's trace: JobNimbus rejected the appointment change, with the consequence that Marcus expects Friday at 8:30 AM and nobody is scheduled for that visit."
                      width={1760}
                      height={842}
                    />
                    <p className={s.annotation}>
                      A bounded block, failure colour on the statement, and the
                      consequence stated in the operator&rsquo;s own terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* D3 */}
              <div className={`${s.decision} ${s.reveal}`}>
                <p className={s.decisionQ}>
                  How can AI help with a consequential decision without quietly making
                  it?
                </p>
                <h3 className={`${s.decisionTitle} ${s.display}`}>
                  Suggestion is not authority
                </h3>
                <p className={s.body}>
                  The decision surface keeps four registers separate, in this order. The
                  model may recommend a counteroffer; the operator is the one who
                  commits it.
                </p>
                <figure className={s.figure}>
                  <RegisterDiagram />
                </figure>
                <Shot
                  src="crop-decision.png"
                  alt="The lower half of Sarah's decision surface: 'Alivo suggests, counter at $23,200' above 'Your decision', four options, an editable counter amount, the message Sarah would receive, and the note 'Prototype — nothing is sent.'"
                  width={1760}
                  height={1016}
                />
                <p className={s.annotation}>
                  The suggestion is labelled as a suggestion. The commitment sits in a
                  separate register, under the operator&rsquo;s hand.
                </p>
              </div>

              {/* D4 */}
              <div className={`${s.decision} ${s.reveal}`}>
                <p className={s.decisionQ}>
                  If humans keep making the same decision, should the agent just learn
                  it?
                </p>
                <h3 className={`${s.decisionTitle} ${s.display}`}>
                  Learning is not more permission
                </h3>
                <p className={s.body}>
                  Not when that learning changes meaningful authority. Agent Coach can
                  propose reusable guidance, but it has to show what would change and
                  what would not before anyone can approve it. And a pattern that touches
                  pricing is surfaced without ever becoming a proposal.
                </p>
                <div className={s.stackUp}>
                  <div className={s.twoUpItem}>
                    <p className={s.twoUpLabel}>Lower-risk guidance — approvable after review</p>
                    <Shot
                      src="crop-boundary.png"
                      alt="The boundary pair on the deductible review: 'What would change' beside 'What would not change', bounded by rules above and below, listing the four situations Follow-up still asks for help with."
                      width={1760}
                      height={862}
                    />
                    <p className={s.annotation}>
                      The boundary is the largest block on the page, and it is read
                      before the approve control is reached.
                    </p>
                  </div>
                  <div className={s.twoUpItem}>
                    <p className={s.twoUpLabel}>Consequential authority — surfaced only</p>
                    <Shot
                      src="crop-pattern.png"
                      alt="The competitor pricing screen: a heading reading 'What Alivo will not change' followed by a statement that pricing, discount limits, contract commitments and refunds stay where the operator set them."
                      width={1760}
                      height={782}
                    />
                    <p className={s.annotation}>
                      Pricing authority stays outside the proposed guidance. This screen
                      has no approve control at all.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ 04 BUILT ═══ */}
            <section className={s.stage} id="built" data-stage="built">
              <div className={s.stageHead}>
                <span className={s.stageNum}>04</span>
                <h2 className={s.stageName}>Built</h2>
              </div>

              <p className={`${s.lead} ${s.display}`}>
                The boundaries had to hold in the implementation, not just the design.
              </p>

              <div className={`${s.beat} ${s.reveal}`}>
                <h3 className={s.beatTitle}>State that cannot contradict itself</h3>
                <p className={s.body}>
                  An exception&rsquo;s state must read the same everywhere it appears. A
                  register that calls a failure resolved while its own trace still shows
                  it broken is not a cosmetic bug — it breaks the one thing a supervision
                  tool sells.
                </p>
                <figure className={s.figure}>
                  <StateDiagram />
                </figure>
                <p className={s.caption}>
                  Both screens read one session key. I found this by testing from a clean
                  session during release QA: the register said &ldquo;Resolved, 11:22
                  AM&rdquo; before the operator had done anything, and 11:22 AM was the
                  timestamp resolution creates.
                </p>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <h3 className={s.beatTitle}>Counts derived from product semantics</h3>
                <p className={s.body}>
                  Every operational count comes from a stated rule rather than a display
                  string. A decision needs a person to choose; a system exception needs
                  attention but carries no choice. So &ldquo;need you&rdquo; counts
                  decisions, &ldquo;Open&rdquo; counts unresolved records, and the
                  numbers move when the data does. The information architecture lives in
                  the code, not only in the design file.
                </p>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <h3 className={s.beatTitle}>Work in progress survives inspection</h3>
                <p className={s.body}>
                  Sarah&rsquo;s edited counteroffer and message persist across navigation
                  and refresh. Opening the conversation to check the evidence must never
                  cost the operator the draft they were in the middle of — inspection
                  changes nothing.
                </p>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <h3 className={s.beatTitle}>Responsive, and accessible where it matters</h3>
                <div className={s.twoUp}>
                  <div className={s.twoUpItem}>
                    <p className={s.twoUpLabel}>1440</p>
                    <Shot
                      src="exceptions.png"
                      alt="The exceptions register at desktop width, with customer, value, description, state and waiting columns."
                      width={2880}
                      height={1520}
                    />
                  </div>
                  <div className={s.twoUpItem}>
                    <p className={s.twoUpLabel}>390</p>
                    <Shot
                      src="exceptions-390.png"
                      alt="The same register on a narrow screen. Each row keeps identity, value, state and time on one line and moves the description to its own line beneath."
                      width={780}
                      height={1688}
                    />
                  </div>
                </div>
                <p className={s.body}>
                  The register changes layout on its own available width using a
                  container query, not a viewport breakpoint, so it stays correct
                  whatever the shell does around it. Closing the evidence panel returns
                  focus to the control that opened it, focus is always visible, decision
                  options are a labelled radio group, and no state is communicated by
                  motion alone.
                </p>
                <p className={s.caption}>
                  Contrast was computed per text node rather than sampled: every route
                  passes AA at 1440, 1280, 1024 and 390, with no horizontal overflow.
                  Keyboard activation of native buttons has not yet been confirmed on
                  real hardware, so I am not claiming it.
                </p>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <h3 className={s.beatTitle}>Truthful simulation</h3>
                <p className={s.body}>
                  This prototype cannot send a message or update a CRM, so it never
                  pretends to. Resolving Marcus&rsquo;s failure records a simulated
                  result and says so; the decision controls state that nothing is sent
                  before you press them. Making that boundary explicit is part of the
                  product argument, not a caveat hidden at the bottom.
                </p>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <h3 className={s.beatTitle}>How it was actually made</h3>
                <ol className={s.steps}>
                  {[
                    ["Product hypothesis", "What should a human still own once agents handle the routine work?"],
                    ["System model", "The loop, the registers, and the authority boundaries."],
                    ["Interaction decisions", "Screen by screen, each one frozen before the next began."],
                    ["Prototype", "Next.js, real state, ten routes."],
                    ["Cross-screen state", "Making the screens agree with each other."],
                    ["Trust and accessibility audit", "Per-node contrast, focus, and a copy audit for false live-action claims."],
                    ["Release QA", "A clean-session walk of the whole story against a production build."],
                  ].map(([title, desc], i) => (
                    <li className={s.step} key={title}>
                      <span className={s.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                      <p className={s.stepText}>
                        <b>{title}</b> — {desc}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={`${s.beat} ${s.reveal}`}>
                <h3 className={s.beatTitle}>Stack</h3>
                <p className={s.caption}>
                  Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 with
                  semantic design tokens · session-scoped state. No backend, no component
                  library.
                </p>
              </div>

              <div className={`${s.closing} ${s.reveal}`}>
                <p className={s.bodyInk}>
                  The prototype demonstrates a supervision model where AI can do the
                  routine operational work without forcing anyone to watch it, while the
                  consequential moments stay understandable, reviewable and explicitly
                  human-controlled.
                </p>
                <p className={`${s.reflection} ${s.display}`}>
                  The hard part was never deciding what AI could automate. It was
                  deciding where automation should stop.
                </p>
                <p className={s.body}>
                  Designing those stopping points — making them legible in the interface
                  and enforceable in the code — turned out to be the whole project.
                </p>
              </div>
            </section>
          </div>

          {/* ── RAIL ────────────────────────────────────────────────── */}
          <nav className={s.rail} aria-label="Case study sections">
            {STAGES.map((stage) => (
              <a
                key={stage.id}
                className={s.thumb}
                href={`#${stage.id}`}
                data-stage-link={stage.id}
              >
                <span className={s.thumbNum}>{stage.num}</span>
                {stage.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <footer className={s.footer}>
        <span>Alivo Mission Control — independent concept, 2026</span>
      </footer>
    </div>
  );
}
