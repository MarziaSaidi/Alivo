"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Label from "./ui/Label";
import Button from "./ui/Button";
import RadioOption from "./ui/RadioOption";
import PatternNotice from "./PatternNotice";
import {
  DISMISS_REASONS,
  OPERATOR,
  TODAY,
  type Improvement,
} from "@/lib/coach";
import { useCoachState } from "@/lib/useCoachState";

/* Coach measure. The boundary splits it 336 + 48 + 336. (layout §8, §21) */
const MEASURE = "mx-auto max-w-[720px]";

/** Section heading — 15/550 sentence case. (typography §17 role 4) */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-[550] leading-[1.4] text-text-primary">
      {children}
    </h2>
  );
}

/**
 * IMPROVEMENT REVIEW — insurance deductible guidance.
 *
 * A review, not a settings form. The operator must be able to see the
 * behavioural boundary — what changes and what still comes to them — before
 * the approve control is reached, and must be able to tell *I chose* from
 * *I sent*. (ux-spec §8, component §14)
 *
 * The centre of gravity is the boundary pair, and it wins by three geometric
 * moves rather than by a box: it is the only full-width block (examples are
 * indented, guidance is 470), the only block with rules above *and* below,
 * and its content is 15px where everything else on the page is 14.
 * (layout §8, typography §11, colour §11)
 */
export default function ImprovementReview({ imp }: { imp: Improvement }) {
  const { state, hydrated, update, statusOf } = useCoachState();
  const status = statusOf(imp.slug);
  const record = state[imp.slug];

  const [guidance, setGuidance] = useState(imp.proposedGuidance ?? "");
  const [edited, setEdited] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  /* Restore an approved or edited version once session state is available. */
  useEffect(() => {
    if (!hydrated || !record?.guidance) return;
    /* eslint-disable react-hooks/set-state-in-effect */
    setGuidance(record.guidance);
    setEdited(Boolean(record.edited));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [hydrated, record?.guidance, record?.edited]);

  /* Consequential authority is surfaced, never proposed as a change. That
     route keeps its own component and is untouched by this pass. */
  if (!imp.reviewable) return <PatternNotice imp={imp} />;

  function approve() {
    update(imp.slug, {
      status: "approved",
      guidance,
      edited,
      approvedBy: OPERATOR,
      approvedAt: TODAY,
    });
  }

  function dismiss() {
    update(imp.slug, {
      status: "dismissed",
      dismissReason: reason ?? undefined,
    });
    setDismissing(false);
  }

  const decided = status === "approved" || status === "dismissed";
  /* Turned off from change history. The record survives — an improvement that
     was approved and then switched off is not the same thing as one nobody
     has looked at, and the review must not present it as though it were.
     (ux-spec §8 — nothing is deleted) */
  const turnedOff = status === "off" && Boolean(record?.approvedAt);

  return (
    <div className={`${MEASURE} pt-6`}>
      <Link
        href="/coach"
        className="-mx-1 inline-flex h-7 items-center rounded-[6px] px-1 text-[13px] leading-[1.45] text-text-tertiary hover:text-text-primary"
      >
        <span aria-hidden className="mr-1">
          &larr;
        </span>
        Agent Coach
      </Link>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="mt-4">
        <h1 className="text-[18px] font-[550] leading-[1.3] tracking-[-0.01em] text-text-primary">
          {imp.title}
        </h1>
        <p className="tnum mt-1 text-[13px] leading-[1.45] text-text-tertiary">
          {imp.agent}
          {imp.counts?.length ? ` · ${imp.counts.join(" · ")}` : ""}
        </p>
      </header>

      {/* ── PREVIOUSLY APPROVED, CURRENTLY OFF ─────────────────────────
          Stated where the operator arrives, at metadata scale. No badge,
          no fill, no colour — this is a fact about the record, not an
          alarm. ────────────────────────────────────────────────────────── */}
      {turnedOff && (
        <div className="mt-4">
          <p className="max-w-[58ch] text-[14px] leading-[1.55] text-text-primary">
            This guidance was approved and is currently turned off.
          </p>
          <p className="tnum mt-1 max-w-[58ch] text-[13px] leading-[1.45] text-text-tertiary">
            Approved by {record?.approvedBy} &middot; {record?.approvedAt}
            {record?.edited ? " · your edited wording" : ""} &middot; turned off
            from change history. {imp.agent} is asking for human help on these
            questions again. The approval record is kept.
          </p>
        </div>
      )}

      {/* ── WHAT ALIVO NOTICED ─────────────────────────────────────────── */}
      <section className="mt-8 border-t border-border-default pt-6">
        <Label>What Alivo noticed</Label>
        <ul className="mt-2 max-w-[58ch] space-y-1 text-[14px] leading-[1.55] text-text-primary">
          {imp.noticed?.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-2 max-w-[58ch] text-[13px] leading-[1.45] text-text-tertiary">
          Based on what was said in those conversations and how your team
          resolved them.
        </p>
      </section>

      {/* ── WHY THIS MATTERS ───────────────────────────────────────────── */}
      <section className="mt-6">
        <Label>Why this matters</Label>
        <p className="mt-2 max-w-[58ch] text-[14px] leading-[1.55] text-text-primary">
          {imp.whyItMatters}
        </p>
      </section>

      {/* ── PAST EXAMPLES ──────────────────────────────────────────────
          Evidence, deliberately quiet. Indented behind a hairline rather
          than boxed — three bounded blocks here would read as three
          competing claims. (layout §11, colour §11) ───────────────────── */}
      <section className="mt-6">
        <Label>Past examples</Label>
        <p className="tnum mt-1 text-[13px] leading-[1.45] text-text-tertiary">
          3 of 14, representative. Prototype data.
        </p>
        <ul className="mt-3 space-y-4">
          {imp.examples?.map((ex) => (
            <li
              key={ex.id}
              className="border-l border-border-default pl-4"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[14px] font-medium leading-[1.5] text-text-primary">
                  {ex.customer}
                </span>
                <span className="text-[13px] leading-[1.45] text-text-tertiary">
                  handled by {ex.handledBy}
                </span>
              </div>
              <p className="mt-1 max-w-[58ch] text-[14px] leading-[1.5] text-text-secondary">
                &ldquo;{ex.question}&rdquo;
              </p>
              {/* The answer recedes one contrast step — it is the quietest
                  text on the page, beneath the boundary it supports. */}
              <p className="mt-1 max-w-[58ch] text-[14px] leading-[1.5] text-text-tertiary">
                {ex.answer}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── PROPOSED GUIDANCE ──────────────────────────────────────────
          Bounded because it is editable, and for no other reason.
          62ch ≈ 470, capped at 8 rows. (layout §11, component §4) ─────── */}
      <section className="mt-8">
        <Label>What Follow-up could say</Label>
        {decided ? (
          <>
            <p className="mt-2 max-w-[470px] rounded-[6px] border border-border-input bg-surface-subtle px-3 py-2 text-[14px] leading-[1.55] text-text-secondary">
              {guidance}
            </p>
            <p className="mt-1 text-[13px] leading-[1.45] text-text-tertiary">
              Read-only. This is the wording that was
              {status === "approved" ? " approved." : " under review."}
            </p>
          </>
        ) : (
          <>
            <textarea
              aria-label="Proposed guidance"
              rows={6}
              value={guidance}
              onChange={(e) => {
                setGuidance(e.target.value);
                setEdited(true);
              }}
              className="mt-2 block max-h-[192px] w-full max-w-[470px] resize-y rounded-[6px] border border-border-input bg-surface-input px-3 py-2 text-[14px] leading-[1.55] text-text-secondary outline-none focus:border-border-focus"
            />
            {/* Edited is a metadata line. No colour, no border, no badge.
                (component §14) */}
            <p className="mt-1 max-w-[58ch] text-[13px] leading-[1.45] text-text-tertiary">
              {edited
                ? "You edited this. Approving will use your version, not Alivo’s original wording."
                : "Prepared by Alivo. Edit it before approving if you want different wording."}
            </p>
          </>
        )}
      </section>

      {/* ── THE BOUNDARY ───────────────────────────────────────────────
          The most important thing on the page. Full measure, rules above
          and below, 15px content — carried by position, space and size,
          never by a box or a colour. Both halves share one colour: this is
          one statement in two parts, not two opposed options.
          (layout §8, typography §11, colour §11) ─────────────────────── */}
      <section className="mt-8 border-y border-border-default py-6">
        <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-0">
          <div className="min-w-0">
            <Heading>What would change</Heading>
            <ul className="mt-2 space-y-2 text-[15px] leading-[1.5] text-text-primary">
              {imp.wouldChange?.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <Heading>What would not change</Heading>
            <p className="mt-2 text-[14px] leading-[1.45] text-text-tertiary">
              Follow-up still asks for help when:
            </p>
            <ul className="mt-2 space-y-2 text-[15px] leading-[1.5] text-text-primary">
              {imp.wouldNotChange?.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SCOPE ──────────────────────────────────────────────────────
          Supports the boundary at metadata scale; never competes with it. */}
      <section className="mt-6">
        <Label>Scope</Label>
        <dl className="mt-2 space-y-2">
          {imp.scope?.map((s) => (
            <div key={s.label} className="flex flex-wrap gap-x-4 gap-y-1">
              <dt className="w-[124px] shrink-0 text-[13px] leading-[1.45] text-text-tertiary">
                {s.label}
              </dt>
              <dd className="min-w-0 flex-1 text-[14px] leading-[1.5] text-text-secondary">
                {s.value.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── BEHAVIOUR PREVIEW ──────────────────────────────────────────
          What would have happened. Not a score and not a prediction. */}
      <section className="mt-6">
        <Label>Test against past situations</Label>
        <p className="mt-1 text-[13px] leading-[1.45] text-text-tertiary">
          How this guidance would have behaved on the three examples above.
        </p>
        <ul className="mt-3 space-y-2">
          {imp.examples?.map((ex) => (
            <li key={ex.id} className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="w-[92px] shrink-0 text-[14px] font-medium leading-[1.5] text-text-primary">
                {ex.customer}
              </span>
              <span className="min-w-0 flex-1 text-[14px] leading-[1.5] text-text-secondary">
                {ex.preview}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 max-w-[58ch] text-[13px] leading-[1.45] text-text-tertiary">
          What would have happened in these three conversations. Not a
          prediction about future ones.
        </p>
      </section>

      {/* ── DECISION ───────────────────────────────────────────────────
          Separated from the evidence by a rule and 32 above the control.
          Committed replaces the action area with a statement; it never
          shares a visual property with "selected". (component §14) ────── */}
      <section className="mt-8 border-t border-border-default pt-6">
        {status === "approved" && (
          <div>
            <Heading>Approved for {imp.agent}</Heading>
            <p className="mt-2 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
              This approval authorizes Follow-up to answer general insurance
              deductible questions using this guidance.
            </p>
            <p className="mt-1 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
              Questions outside this guidance will still come to you.
            </p>
            {record?.edited && (
              <p className="mt-2 text-[13px] leading-[1.45] text-text-tertiary">
                Approved using your edited wording.
              </p>
            )}
            {/* The limitation is stated once, quietly, in the same register as
                the other metadata. A banner would make the prototype the
                subject of the screen; the decision is. */}
            <p className="mt-2 max-w-[58ch] text-[13px] leading-[1.45] text-text-tertiary">
              Prototype &mdash; this approval is recorded in your browser
              session only. No live agent, customer or connected system has
              been changed.
            </p>
            <Link
              href="/coach/history"
              className="-mx-1 mt-4 inline-flex h-7 items-center rounded-[6px] px-1 text-[14px] font-medium text-text-interactive underline-offset-4 hover:underline"
            >
              View change history
            </Link>
          </div>
        )}

        {status === "dismissed" && (
          <div>
            <Heading>Dismissed</Heading>
            <p className="mt-2 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
              Follow-up keeps asking for help on these questions. This is out of
              Coach, and kept in history.
            </p>
            {record?.dismissReason && (
              <p className="mt-1 text-[14px] leading-[1.55] text-text-secondary">
                Reason: {record.dismissReason}
              </p>
            )}
            {/* Same qualifier as the approved state — a dismissal is also
                only recorded locally. */}
            <p className="mt-2 max-w-[58ch] text-[13px] leading-[1.45] text-text-tertiary">
              Prototype &mdash; this decision is recorded in your browser
              session only. No live agent, customer or connected system has
              been changed.
            </p>
            <Link
              href="/coach/history"
              className="-mx-1 mt-4 inline-flex h-7 items-center rounded-[6px] px-1 text-[14px] font-medium text-text-interactive underline-offset-4 hover:underline"
            >
              View change history
            </Link>
          </div>
        )}

        {!decided && !dismissing && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button onClick={approve}>Approve for {imp.agent}</Button>
            <Button variant="quiet" onClick={() => setDismissing(true)}>
              Not useful
            </Button>
          </div>
        )}

        {/* Inline, never a modal. The reason is optional. (ux-spec §8) */}
        {!decided && dismissing && (
          <div className="mt-8">
            <p className="text-[14px] leading-[1.55] text-text-secondary">
              Anything you want to note? Optional.
            </p>
            <fieldset className="mt-2">
              <legend className="sr-only">Reason for dismissing</legend>
              {DISMISS_REASONS.map((r) => (
                <RadioOption
                  key={r}
                  name="dismiss-reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                >
                  {r}
                </RadioOption>
              ))}
            </fieldset>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button onClick={dismiss}>Dismiss this improvement</Button>
              <Button
                variant="quiet"
                onClick={() => {
                  setDismissing(false);
                  setReason(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {!decided && (
          <p className="mt-3 max-w-[58ch] text-[13px] leading-[1.45] text-text-tertiary">
            {turnedOff
              ? `Approving turns this guidance back on for ${imp.agent}, using the wording above. `
              : ""}
            Nothing changes until you approve. Prototype &mdash; no agent is
            modified.
          </p>
        )}
      </section>
    </div>
  );
}
