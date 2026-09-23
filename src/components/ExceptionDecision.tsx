"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ConversationPanel from "./ConversationPanel";
import MathRow from "./MathRow";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";
import RadioOption from "./ui/RadioOption";
import Textarea from "./ui/Textarea";
import {
  commitLabel,
  type DecisionOption,
  leadException as lead,
  suggestedMessage,
  usd,
} from "@/lib/data";

const OPTIONS: { id: DecisionOption; label: string }[] = [
  { id: "counter", label: "Counter" },
  { id: "match", label: `Match ${usd(lead.competitorQuote)}` },
  { id: "hold", label: `Hold ${usd(lead.value)}` },
  { id: "ask", label: "Ask what's included first" },
];

/**
 * EXCEPTION DETAIL — a decision surface, not a document.
 *
 * Register order is load-bearing and never interleaves:
 *   FACT (context, math, what Alivo knows and doesn't)
 *   POLICY (your pricing rule — authoritative, never dimmed)
 *   ALIVO SUGGESTION (provisional, editable, subordinate to policy)
 *   HUMAN DECISION (selection, then an explicit commit)
 *
 * Only two elements carry a boundary: the amount and the message. Both are
 * editable, which is the justification. Nothing else is boxed.
 */
export default function ExceptionDecision() {
  const [option, setOption] = useState<DecisionOption>("counter");
  const [amountInput, setAmountInput] = useState(
    lead.suggestionValue.toLocaleString("en-US")
  );
  const [message, setMessage] = useState(() =>
    suggestedMessage("counter", lead.suggestionValue)
  );
  const [messageEdited, setMessageEdited] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  /* The control that opened the panel. Closing returns focus to it, so a
     keyboard operator lands back where they left rather than at the top of
     the document. Both close paths — Escape and the panel's own Close —
     come through `closePanel`. (component §13) */
  const panelTriggerRef = useRef<HTMLButtonElement>(null);
  const closePanel = () => {
    setPanelOpen(false);
    panelTriggerRef.current?.focus();
  };

  /* The draft survives a trip to Activity and back. Inspecting the record
     must never cost the operator work in progress. */
  const DRAFT_KEY = `alivo:decision:${lead.slug}`;
  /* State, not a ref: the persist effect must wait for the render that
     carries the restored values, or it writes the defaults back over them. */
  const [hydrated, setHydrated] = useState(false);

  /* Restoring a persisted draft has to happen after mount: the page is
     prerendered, so the server cannot know what the operator had typed. */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        /* eslint-disable react-hooks/set-state-in-effect */
        if (d.option) setOption(d.option);
        if (typeof d.amountInput === "string") setAmountInput(d.amountInput);
        if (typeof d.message === "string") setMessage(d.message);
        if (typeof d.messageEdited === "boolean") setMessageEdited(d.messageEdited);
        /* eslint-enable react-hooks/set-state-in-effect */
      }
    } catch {
      /* private mode or blocked storage — the defaults are already correct */
    }
    setHydrated(true);
  }, [DRAFT_KEY]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ option, amountInput, message, messageEdited })
      );
    } catch {
      /* nothing to do; the draft simply will not persist */
    }
  }, [DRAFT_KEY, hydrated, option, amountInput, message, messageEdited]);

  /* Container template and item placement must switch together. When the
     panel overlays below the split the workspace stacks, so the items must
     drop their two-column placement too — otherwise an item pinned to column
     2 forces an implicit track and collapses column 1 to zero. */
  const grid = panelOpen
    ? {
        container: "split:grid-cols-[minmax(0,1fr)_264px]",
        a: "split:col-start-1 split:row-start-1",
        b: "split:col-start-2 split:row-start-1 split:row-span-2",
        c: "split:col-start-1 split:row-start-2",
      }
    : {
        container: "lg:grid-cols-[minmax(0,1fr)_264px]",
        a: "lg:col-start-1 lg:row-start-1",
        b: "lg:col-start-2 lg:row-start-1 lg:row-span-2",
        c: "lg:col-start-1 lg:row-start-2",
      };

  const amount = Number(amountInput.replace(/[^0-9]/g, "")) || 0;
  const discount = lead.value - amount;
  const percent =
    lead.value > 0 ? Math.abs((discount / lead.value) * 100).toFixed(1) : "0.0";

  /** A different decision is a different message, so the draft is replaced. */
  function chooseOption(next: DecisionOption) {
    setOption(next);
    setMessage(suggestedMessage(next, amount));
    setMessageEdited(false);
  }

  /** Editing the amount refreshes the draft unless the operator has typed. */
  function changeAmount(raw: string) {
    const digits = raw.replace(/[^0-9]/g, "");
    const next = Number(digits) || 0;
    setAmountInput(digits ? next.toLocaleString("en-US") : "");
    if (!messageEdited) setMessage(suggestedMessage(option, next));
  }

  return (
    /* surface (800) + space.major (56) + reserved slot (320) = 1176.
       The slot is held whether or not the panel is open, so the decision
       never moves when evidence is opened. */
    <div className="mx-auto flex max-w-[1176px] gap-14 pt-6">
      <div
        className={
          "min-w-0 flex-1 split:max-w-[800px] " +
          (panelOpen ? "max-w-[440px]" : "max-w-[800px]")
        }
      >
        <Link
          href="/mission-control"
          className="-mx-1 inline-flex h-7 items-center rounded-[6px] px-1 text-[13px] leading-[1.45] text-text-tertiary hover:text-text-primary"
        >
          &larr; Mission Control
        </Link>

        {/* ── CONTEXT ─────────────────────────────── FACT ─────────────── */}
        <header className="mt-4">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h1 className="text-[17px] font-[550] leading-[1.3] tracking-[-0.005em] text-text-primary">
              {lead.subject}
            </h1>
            <span className="tnum text-[17px] font-medium text-text-primary">
              {usd(lead.value)}
            </span>
            <span className="text-[13px] text-text-tertiary">potential job</span>
          </div>
          <p className="tnum mt-1 text-[13px] leading-[1.45] text-text-tertiary">
            Roof replacement &middot; {lead.location} &middot; waiting 17 min
            &middot; reply promised by {lead.promisedBy}
          </p>
        </header>

        {/* ── DECISION WORKSPACE ──────────────────────────────────────────
            A grid, not a flex row. On desktop the primary column occupies
            rows 1 and 2 of column 1 while evidence spans both rows in column
            2 — so the suggestion still begins the moment policy ends, and the
            evidence column may run lower.

            Stacked, the grid collapses to one column and the same DOM order
            reads: facts, policy, evidence, suggestion, decision. One DOM
            sequence serves both layouts, so nothing is duplicated and the
            keyboard and screen-reader order stays sensible. */}
        <div
          className={
            "mt-6 grid grid-cols-1 gap-8 border-t border-border-default pt-6 " +
            grid.container
          }
        >
          {/* A · FACT → POLICY ── primary column, row 1 */}
          <div className={`min-w-0 ${grid.a}`}>
            <Label>The decision</Label>
            <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-text-secondary">
              Sarah wants you to match a competitor&rsquo;s{" "}
              <span className="tnum">{usd(lead.competitorQuote)}</span> quote.
            </p>

            <dl className="mt-4 max-w-[276px]">
              <MathRow label="Your quote" amount={lead.value} />
              <MathRow label="Competitor" amount={lead.competitorQuote} />
              {/* ledger rule — separates facts from reckoning */}
              <div className="my-1 border-t border-border-default" />
              <MathRow label="Difference" amount={lead.gap} />
              {/* the conflict: required sits directly above allowed, same
                  column, same units, split only by weight and contrast */}
              <MathRow label="Required" text={lead.gapPercent} strong />
              <MathRow label="Allowed" text={lead.allowedPercent} />
            </dl>

            {/* ── POLICY — authoritative, never dimmed to tertiary ──────── */}
            <div className="mt-6">
              <Label>Your pricing rule</Label>
              <ul className="mt-2 max-w-[46ch] space-y-1 text-[14px] leading-[1.5] text-text-secondary">
                {lead.rules.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* B · EVIDENCE ── independent column. Spans both primary rows so
              it never constrains where the suggestion begins. Sits between
              policy and suggestion in DOM order, which is the reading order
              when the workspace stacks. */}
          <div className={`min-w-0 self-start ${grid.b}`}>
            <Label>What Alivo knows</Label>
            <ul className="mt-2 space-y-1 text-[14px] leading-[1.5] text-text-secondary">
              {lead.knows.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            {/* sentence case, not a second uppercase marker — two adjacent
                register labels is the overuse the type rule prevents */}
            <p className="mt-4 text-[13px] font-medium text-text-tertiary">
              Doesn&rsquo;t know
            </p>
            <ul className="mt-1 space-y-1 text-[14px] leading-[1.5] text-text-tertiary">
              {lead.doesNotKnow.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            {/* inspection, not decision — sits beside the claims it verifies */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4">
              <button
                ref={panelTriggerRef}
                type="button"
                onClick={() => (panelOpen ? closePanel() : setPanelOpen(true))}
                className="-mx-1 flex h-7 items-center rounded-[6px] px-1 text-[14px] text-text-interactive underline-offset-4 hover:underline"
              >
                {panelOpen ? "Hide conversation" : "View conversation"}
              </button>
              <Link
                href={`/activity/${lead.slug}`}
                className="-mx-1 flex h-7 items-center rounded-[6px] px-1 text-[14px] text-text-interactive underline-offset-4 hover:underline"
              >
                See all activity
              </Link>
            </div>

            {/* ── HISTORICAL CONTEXT ──────────────── FACT ──────────────
                Supporting evidence, grouped with the other evidence rather
                than sitting in the decision spine. Never a prediction, and
                never a card — it recedes at tertiary contrast. */}
            <div className="mt-6">
              <p className="text-[13px] leading-[1.45] text-text-tertiary">
                {lead.evidence.window} &mdash; historical context, not a
                prediction
              </p>
              <p className="tnum mt-1 text-[13px] leading-[1.45] text-text-secondary">
                {lead.evidence.summary}
              </p>
            </div>
          </div>

          {/* C · SUGGESTION → DECISION ── primary column, row 2 */}
          <div className={`min-w-0 ${grid.c}`}>
            {/* ── ALIVO SUGGESTS ──────────────────────── SUGGESTION ─────────
                Provisional and editable. Nothing here has been approved.
                No top margin: the grid row gap already separates it. */}
            <section>
              <Label>Alivo suggests</Label>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <label
                  htmlFor="counter-amount"
                  className="text-[14px] text-text-secondary"
                >
                  Counter at
                </label>
                <Input
                  id="counter-amount"
                  value={amountInput}
                  onChange={changeAmount}
                  prefix="$"
                  width="w-[80px]"
                  inputMode="numeric"
                  ariaLabel="Counter amount in dollars"
                  tabular
                />
                <span className="tnum text-[14px] text-text-secondary">
                  {usd(Math.abs(discount))} discount &middot; {percent}%{" "}
                  {discount >= 0 ? "below" : "above"} your quote
                </span>
              </div>

              <p className="mt-4 text-[13px] text-text-tertiary">
                What Sarah would receive
              </p>
              <Textarea
                ariaLabel="Message Sarah would receive"
                rows={3}
                value={message}
                onChange={(v) => {
                  setMessage(v);
                  setMessageEdited(true);
                }}
                className="mt-1 max-w-[58ch]"
              />
              <p className="mt-1 text-[13px] text-text-tertiary">
                Nothing has been sent. Editable before you decide.
              </p>
            </section>

            {/* ── YOUR DECISION ───────────────────────── HUMAN ────────────── */}
            <section className="mt-6 border-t border-border-default pt-6">
              <Label>Your decision</Label>

              <fieldset className="mt-2">
                <legend className="sr-only">Choose what happens next</legend>
                <div className="flex flex-wrap gap-x-6">
                  {OPTIONS.map((o) => (
                    <RadioOption
                      key={o.id}
                      name="decision"
                      value={o.id}
                      checked={option === o.id}
                      onChange={() => chooseOption(o.id)}
                    >
                      {o.label}
                    </RadioOption>
                  ))}
                </div>
              </fieldset>

              {/* space.section before an irreversible act */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button tabular>{commitLabel(option, amount)}</Button>
                <Button variant="quiet">Handle Sarah myself</Button>
                <Button variant="quiet">Assign to someone else</Button>
              </div>

              <p className="mt-3 text-[13px] text-text-tertiary">
                Prototype &mdash; nothing is sent.
              </p>
            </section>
          </div>
        </div>

      </div>

      {/* INSPECTION LAYER — in flow beside the decision at wide widths,
          overlaying from the right below the split. Never dims, never stacks. */}
      {panelOpen && <ConversationPanel onClose={closePanel} />}
    </div>
  );
}
