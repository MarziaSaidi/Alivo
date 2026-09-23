"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Beat, Trace, TraceRow } from "@/lib/activity";
import { traceStateKey } from "@/lib/activity";
import Button from "./ui/Button";
import Label from "./ui/Label";
import { usd } from "@/lib/data";

/* Timestamp column 68 + gap 16 = spine at x 84; +20 = content at x 104.
   Ordinary beats occupy ~560 from x 104. Interruptions occupy the full 760
   from x 0 — that 104px leftward jump is what makes an interruption
   unmistakable during fast scrolling. (layout §7) */
const TIME_COL = "w-[68px]";

/* ------------------------------------------------------------------ *
 * Expanded evidence. Mounted only while open, so the recording control
 * and the transcript reset on collapse and the transcript is never shown
 * by default. (component §11)
 * ------------------------------------------------------------------ */
function BeatExpansion({ beat }: { beat: Beat }) {
  const [playing, setPlaying] = useState(false);
  const [transcript, setTranscript] = useState(false);

  return (
    <div className="mt-3 space-y-4 border-l border-border-quiet pl-4">
      {beat.recording && (
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              className="-mx-1 flex h-7 items-center rounded-[6px] px-1 text-[14px] text-text-interactive underline-offset-4 hover:underline"
            >
              {playing ? "Stop" : "Play recording"}
            </button>
            <span className="tnum text-[13px] text-text-tertiary">
              {beat.recording.duration}
            </span>
            <button
              type="button"
              onClick={() => setTranscript((v) => !v)}
              className="-mx-1 flex h-7 items-center rounded-[6px] px-1 text-[14px] text-text-interactive underline-offset-4 hover:underline"
            >
              {transcript ? "Hide what was said" : "Read what was said"}
            </button>
          </div>
          {playing && (
            <p className="mt-1 text-[13px] text-text-tertiary">
              Prototype &mdash; no audio.
            </p>
          )}
          {transcript && (
            <ol className="mt-3 space-y-3">
              {beat.recording.said.map((m, i) => (
                <li key={i}>
                  <span className="text-[14px] font-medium text-text-primary">
                    {m.from}
                  </span>
                  <p className="text-[14px] leading-[1.5] text-text-secondary">
                    {m.body}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {beat.details?.map((group) => (
        <div key={group.heading}>
          {/* conclusions and checks — never a narration of reasoning */}
          <Label as="p">{group.heading}</Label>
          <ul className="mt-1 space-y-[2px]">
            {group.lines.map((line) => (
              <li
                key={line}
                className="text-[14px] leading-[1.5] text-text-secondary"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * An ordinary beat on the spine.
 * Quiet beats recede; consequential beats carry their consequence.
 * The actor is the grammatical subject — the scan target.
 * ------------------------------------------------------------------ */
function BeatRow({
  beat,
  open,
  onToggle,
}: {
  beat: Beat;
  open: boolean;
  onToggle: () => void;
}) {
  const expandable = Boolean(beat.details?.length || beat.recording);
  const strong = beat.weight === "consequential";
  const sentence =
    "text-[14px] leading-[1.5] " +
    (strong ? "font-medium text-text-primary" : "text-text-secondary");

  return (
    <div className="flex gap-4">
      <div
        className={`tnum ${TIME_COL} shrink-0 pt-[1px] text-right text-[13px] leading-[1.4] text-text-tertiary`}
      >
        {beat.time}
      </div>

      <div className="min-w-0 flex-1 border-l border-border-quiet pb-4 pl-5">
        {expandable ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="group -mx-1 -my-1 flex w-full items-baseline gap-2 rounded-[6px] px-1 py-1 text-left"
          >
            <span className={sentence}>{beat.sentence}</span>
            <span
              aria-hidden
              className="ml-auto shrink-0 text-[13px] text-text-tertiary group-hover:text-text-interactive"
            >
              {open ? "−" : "+"}
            </span>
          </button>
        ) : (
          <p className={sentence}>{beat.sentence}</p>
        )}

        {beat.consequence && (
          <ul className="tnum mt-[2px] space-y-[2px]">
            {beat.consequence.map((line) => (
              <li
                key={line}
                className="text-[14px] leading-[1.45] text-text-tertiary"
              >
                {line}
              </li>
            ))}
          </ul>
        )}

        {open && <BeatExpansion beat={beat} />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * INTERRUPTION — species A: a human must decide.
 *
 * Breaks the measure, carries a live clock, and has NO internal
 * sub-sections and NO failure colour. This is the product working
 * correctly, not an error. (component §9)
 * ------------------------------------------------------------------ */
function StoppedBlock({ beat, backHref }: { beat: Beat; backHref: string }) {
  const s = beat.stopped!;
  return (
    <div className="my-8 rounded-[8px] border border-border-strong px-6 py-5">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="tnum text-[13px] text-text-tertiary">{beat.time}</span>
        <Label as="p">{s.headline}</Label>
      </div>
      <ul className="mt-3 max-w-[62ch] space-y-1">
        {s.lines.map((line) => (
          <li key={line} className="text-[14px] leading-[1.55] text-text-primary">
            {line}
          </li>
        ))}
      </ul>
      {/* the clock — pressure, not a fact. Never animates. */}
      <p className="tnum mt-4 text-[13px] text-text-tertiary">{s.waiting}</p>
      <div className="mt-6">
        <Button href={backHref}>Open the decision</Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * INTERRUPTION — species B: something failed.
 *
 * Breaks the measure, gains border.failure, and carries three internal
 * sub-sections plus inline remedies. Only the statement takes
 * state.failure; explanation and remedies stay neutral. No clock.
 * ------------------------------------------------------------------ */
function FailureBlock({
  beat,
  onResolve,
}: {
  beat: Beat;
  onResolve: () => void;
}) {
  const f = beat.failure!;
  return (
    <div className="my-8 rounded-[8px] border border-border-failure px-6 py-5">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="tnum text-[13px] text-text-tertiary">{beat.time}</span>
        {/* the one failure-coloured line on the page */}
        <p className="text-[15px] font-[550] leading-[1.4] text-state-failure">
          {f.headline}
        </p>
      </div>

      {/* the operational consequence, stated immediately. Neutral: the
          failure colour stays on the headline alone. */}
      <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.5] text-text-primary">
        {f.consequence}
      </p>

      {(
        [
          ["Why", f.why],
          ["What this means", f.meaning],
          ["What still works", f.stillWorks],
        ] as const
      ).map(([heading, lines]) => (
        <div key={heading} className="mt-4">
          <Label as="p">{heading}</Label>
          <ul className="mt-1 max-w-[62ch] space-y-1">
            {lines.map((line) => (
              <li
                key={line}
                className="text-[14px] leading-[1.55] text-text-secondary"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.55] text-text-secondary">
        {f.retry}
      </p>

      <div className="mt-6 border-t border-border-default pt-6">
        {f.remedies.map((r) =>
          r.primary ? (
            <div key={r.label} className="mb-4">
              <Button onClick={onResolve}>{r.label}</Button>
              {r.note && (
                <p className="mt-2 text-[13px] text-text-tertiary">{r.note}</p>
              )}
            </div>
          ) : (
            <div key={r.label} className="mb-3">
              <button
                type="button"
                className="-mx-1 flex h-7 items-center rounded-[6px] px-1 text-[14px] text-text-interactive underline-offset-4 hover:underline"
              >
                {r.label}
              </button>
              {r.note && (
                <p className="text-[13px] text-text-tertiary">{r.note}</p>
              )}
            </div>
          )
        )}

        {/* What choosing a remedy does here — stated before activation, at
            metadata scale. Not a banner: one line, no fill, no border. */}
        {f.remedyNote && (
          <p className="mt-4 max-w-[62ch] text-[13px] leading-[1.45] text-text-tertiary">
            {f.remedyNote}
          </p>
        )}
      </div>
    </div>
  );
}

/** A resolved failure stays in the record, collapsed to a quiet line.
 *  state.failure is removed — it is history, not an active problem. */
function FixedRow({ beat }: { beat: Beat }) {
  const f = beat.failure!;
  return (
    <div className="flex gap-4">
      <div
        className={`tnum ${TIME_COL} shrink-0 pt-[1px] text-right text-[13px] leading-[1.4] text-text-tertiary`}
      >
        {beat.time}
      </div>
      <div className="min-w-0 flex-1 border-l border-border-quiet pb-4 pl-5">
        <p className="text-[14px] leading-[1.5] text-text-secondary">
          {f.headline}
        </p>
        {/* attribution — the marker that a human was involved */}
        <p className="text-[14px] leading-[1.45] text-text-tertiary">
          {f.fixedBy}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function ActivityTrace({ trace }: { trace: Trace }) {
  /** Only one beat expanded at a time. */
  const [openId, setOpenId] = useState<string | null>(null);
  const [fixed, setFixed] = useState(false);

  /* Resolution survives navigation and refresh within the session, matching
     the Exception Detail draft convention. Prototype only — nothing is sent
     and no external system is actually updated. */
  const FIXED_KEY = traceStateKey(trace.slug);
  /* State, not a ref: the persist effect must wait for the render that
     carries the restored value, or it writes the default back over it. */
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      if (sessionStorage.getItem(FIXED_KEY) === "resolved") setFixed(true);
    } catch {
      /* blocked storage — the unresolved default is correct */
    }
    setHydrated(true);
  }, [FIXED_KEY]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (fixed) sessionStorage.setItem(FIXED_KEY, "resolved");
      else sessionStorage.removeItem(FIXED_KEY);
    } catch {
      /* nothing to do; the resolution simply will not persist */
    }
  }, [FIXED_KEY, hydrated, fixed]);

  const rows: TraceRow[] =
    fixed && trace.afterFixRows
      ? [...trace.rows, ...trace.afterFixRows]
      : trace.rows;

  const status =
    fixed && trace.statusAfterFix ? trace.statusAfterFix : trace.status;
  const closing =
    fixed && trace.closingAfterFix ? trace.closingAfterFix : trace.closing;

  return (
    <div className="mx-auto max-w-[760px] pt-6">
      <Link
        href={trace.backHref}
        className="-mx-1 inline-flex h-7 items-center rounded-[6px] px-1 text-[13px] leading-[1.45] text-text-tertiary hover:text-text-primary"
      >
        &larr; {trace.backLabel}
      </Link>

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <header className="mt-4">
        <Label>Activity</Label>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
          <h1 className="text-[17px] font-[550] leading-[1.3] tracking-[-0.005em] text-text-primary">
            {trace.name}
          </h1>
          {trace.value !== undefined && (
            <span className="tnum text-[17px] font-medium text-text-primary">
              {usd(trace.value)}
            </span>
          )}
          <span className="text-[13px] text-text-tertiary">
            {trace.value !== undefined ? "potential job" : trace.job}
          </span>
        </div>
        <p className="text-[13px] leading-[1.45] text-text-tertiary">
          {trace.value !== undefined ? `${trace.job} · ` : ""}
          {trace.address}
        </p>
      </header>

      {/* ── STATUS ──────────────────────────────────────────────────
          Answers "did everything work" before any of the timeline is
          read. ──────────────────────────────────────────────────── */}
      <section
        aria-live="polite"
        className="mt-6 border-t border-border-default pt-6"
      >
        {status.map((line, i) => (
          <p
            key={line}
            className={
              "text-[15px] leading-[1.45] " +
              (i === 0 ? "text-text-primary" : "text-text-secondary")
            }
          >
            {line}
          </p>
        ))}
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────────── */}
      <div className="mt-6">
        {rows.map((row) => {
          if (row.kind === "day") {
            /* the spine breaks at a day label */
            return (
              <div key={row.id} className="flex gap-4">
                <div className={`${TIME_COL} shrink-0`} />
                <div className="flex-1 pb-2 pl-5 pt-6">
                  <Label as="p">{row.label}</Label>
                </div>
              </div>
            );
          }

          if (row.kind === "gap") {
            /* real inactivity, not an invented event */
            return (
              <div key={row.id} className="flex gap-4">
                <div className={`${TIME_COL} shrink-0`} />
                <div className="flex-1 border-l border-dashed border-border-quiet py-3 pl-5 text-[13px] text-text-tertiary">
                  {row.label}
                </div>
              </div>
            );
          }

          if (row.weight === "needs-human") {
            return (
              <StoppedBlock key={row.id} beat={row} backHref={trace.backHref} />
            );
          }

          if (row.weight === "failed") {
            return fixed ? (
              <FixedRow key={row.id} beat={row} />
            ) : (
              <FailureBlock
                key={row.id}
                beat={row}
                onResolve={() => setFixed(true)}
              />
            );
          }

          return (
            <BeatRow
              key={row.id}
              beat={row}
              open={openId === row.id}
              onToggle={() => setOpenId(openId === row.id ? null : row.id)}
            />
          );
        })}
        {/* The remedy simulates an external write. The success beat above
            stays exactly as it is — it correctly records what the operator
            did — and this line says, once and quietly, what that means in a
            prototype. Metadata scale, no fill, no colour: the resolution is
            still the subject, not the disclaimer. */}
        {fixed && trace.simulationNoteAfterFix && (
          <p className="ml-[104px] max-w-[58ch] pb-4 text-[13px] leading-[1.45] text-text-tertiary">
            {trace.simulationNoteAfterFix}
          </p>
        )}
      </div>

      {/* ── CURRENT STATE ───────────────────────────────────────────
          What is true now, not the last historical event. ────────── */}
      <p className="mt-2 border-t border-border-default pt-5 text-[14px] leading-[1.55] text-text-secondary">
        {closing}
      </p>
    </div>
  );
}
