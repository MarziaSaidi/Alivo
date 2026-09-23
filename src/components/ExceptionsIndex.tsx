"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Label from "./ui/Label";
import {
  exceptionRecordsFor,
  openCountFor,
  type ExceptionRecord,
  type ExceptionState,
} from "@/lib/exceptions";
import { marcusTrace, traceStateKey } from "@/lib/activity";
import { usd } from "@/lib/data";

type Filter = ExceptionState | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "open", label: "Open" },
  { id: "resolved", label: "Resolved" },
  { id: "self-resolved", label: "Self-resolved" },
  { id: "all", label: "All" },
];

/* The register switches presentation on its OWN available width, not on the
   viewport's. Those two diverge: the nav rail takes 216 and the gutters 48, so
   the same 980 register measures 760 at a 1024 viewport. Every breakpoint
   below is a container query against the register element, so the layout stays
   correct whatever the shell does around it. (layout §9 — minimum useful
   width 880)

   880 is written literally in every variant below rather than held in a
   constant: Tailwind resolves class names by scanning source text, so an
   interpolated breakpoint would simply never be generated. */

/* Shared row grammar — border.quiet divider inset to the content edge, 16px
   column gap, identity first and left, numerics right. 42px wide; taller when
   narrow, because the description then occupies a second line in full.
   (component §6) */
const ROW =
  "flex w-full flex-wrap items-baseline gap-x-4 gap-y-1 border-b " +
  "border-border-quiet py-[10px] text-left @min-[880px]:flex-nowrap";

/**
 * One record. A row, never a card.
 *
 * History recedes by contrast, never by size: a resolved or self-resolved
 * record drops a contrast step so it cannot be mistaken for an active
 * failure, while staying above 4.5:1. (colour §15, typography §7)
 *
 * DOM order is the reading order and never changes — customer, value,
 * description, state, time. Wide, that is also the visual order. Narrow, the
 * description is moved below the identity line by `order`, so the same single
 * sequence serves both layouts and nothing is duplicated.
 */
function RegisterRow({ record }: { record: ExceptionRecord }) {
  const settled = record.state !== "open";
  const subject = settled ? "text-text-secondary" : "text-text-primary";
  const description = settled ? "text-text-tertiary" : "text-text-secondary";
  /* "Needs your decision" and "Needs attention" are the states that require a
     person; they hold full contrast. Everything else recedes. */
  const state =
    record.state === "open" && record.stateLabel !== "Open"
      ? "text-text-primary"
      : settled
        ? "text-text-tertiary"
        : "text-text-secondary";

  const cells = (
    <>
      <span
        className={`order-1 shrink-0 truncate text-[14px] @min-[880px]:w-[132px] ${subject}`}
      >
        {record.subject}
      </span>
      <span
        className="tnum order-2 shrink-0 text-[14px] text-text-secondary @min-[880px]:w-[72px] @min-[880px]:text-right"
      >
        {record.value !== undefined ? usd(record.value) : ""}
      </span>
      {/* Narrow: line two, wrapping in full — a description the operator
          cannot finish reading is not a description. Wide: one line, and the
          only column permitted to truncate. */}
      <span
        title={record.what}
        className={`order-5 min-w-0 basis-full text-[14px] @max-[880px]:leading-[1.55] @min-[880px]:order-none @min-[880px]:basis-auto @min-[880px]:flex-1 @min-[880px]:truncate ${description}`}
      >
        {record.what}
      </span>
      {/* Narrow: state and time sit together at the right of line one, so both
          keep a predictable edge down the register. */}
      <span
        className={`order-3 ml-auto shrink-0 text-[14px] @min-[880px]:order-none @min-[880px]:ml-0 @min-[880px]:w-[150px] ${state}`}
      >
        {record.stateLabel}
      </span>
      <span
        className="tnum order-4 w-[120px] shrink-0 whitespace-nowrap text-right text-[13px] text-text-tertiary @min-[880px]:order-none"
      >
        {record.when}
      </span>
    </>
  );

  /* An inert row must not pretend to be a link: no hover, no cursor change,
     no focus. Only records with a built destination are interactive. */
  if (!record.href) return <div className={ROW}>{cells}</div>;

  return (
    <Link
      href={record.href}
      className={`${ROW} rounded-[6px] transition-colors duration-75 hover:bg-surface-hover`}
    >
      {cells}
    </Link>
  );
}

export default function ExceptionsIndex() {
  const [filter, setFilter] = useState<Filter>("open");
  const [query, setQuery] = useState("");

  /* Marcus's row reads the same session key his Activity trace writes, so
     the register and the trace can never disagree about whether the
     JobNimbus failure has been resolved. Unresolved is the correct
     prerendered default, so there is nothing to gate the first paint on.
     (final-audit S1) */
  const [marcusFixed, setMarcusFixed] = useState(false);
  useEffect(() => {
    let resolved = false;
    try {
      resolved =
        sessionStorage.getItem(traceStateKey(marcusTrace.slug)) === "resolved";
    } catch {
      /* blocked storage — the unresolved default is correct */
    }
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    if (resolved) setMarcusFixed(true);
  }, []);

  const records = useMemo(() => exceptionRecordsFor(marcusFixed), [marcusFixed]);
  const openCount = openCountFor(marcusFixed);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((r) => {
      if (filter !== "all" && r.state !== filter) return false;
      if (!q) return true;
      return [r.subject, r.what, r.stateLabel, r.keywords ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [filter, query, records]);

  return (
    <div className="@container mx-auto max-w-[980px] pt-6">
      <h1 className="text-[18px] font-[550] leading-[1.3] tracking-[-0.01em] text-text-primary">
        Exceptions
      </h1>
      <p className="mt-1 max-w-[62ch] text-[14px] leading-[1.55] text-text-secondary">
        Open, resolved, and self-resolved situations where Alivo needed
        attention or encountered a problem.
      </p>

      {/* compact control, not a filter toolbar */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div
          role="group"
          aria-label="Filter by state"
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={
                  "flex h-7 items-center border-b-2 pb-1 text-[14px] " +
                  /* weight, contrast AND an underline — the active filter is
                     recognisable without relying on colour */
                  (active
                    ? "border-text-primary font-medium text-text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary")
                }
              >
                {f.label}
                {f.id === "open" && (
                  <span className="tnum ml-[6px] font-normal text-text-tertiary">
                    {openCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customer or exception"
          aria-label="Search customer or exception"
          className="h-8 w-full rounded-[6px] border border-border-input bg-surface-input px-3 text-[14px] text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none @min-[560px]:w-[248px]"
        />
      </div>

      {/* Column headers name the wide layout's columns, so they exist only
          where those columns do. */}
      <div
        className="mt-5 hidden items-baseline gap-x-4 border-b border-border-default pb-2 @min-[880px]:flex"
      >
        <span className="w-[132px] shrink-0">
          <Label as="span">Customer</Label>
        </span>
        <span className="w-[72px] shrink-0 text-right">
          <Label as="span">Value</Label>
        </span>
        <span className="min-w-0 flex-1">
          <Label as="span">What happened</Label>
        </span>
        <span className="w-[150px] shrink-0">
          <Label as="span">State</Label>
        </span>
        <span className="w-[120px] shrink-0 text-right">
          <Label as="span">Waiting</Label>
        </span>
      </div>

      {/* Narrow has no header, so the register still needs its opening edge. */}
      <div
        className="mt-5 border-b border-border-default @min-[880px]:hidden"
      />

      {rows.length > 0 ? (
        <div>
          {rows.map((r) => (
            <RegisterRow key={r.id} record={r} />
          ))}
        </div>
      ) : (
        <p className="py-6 text-[14px] text-text-tertiary">
          Nothing matches that.
        </p>
      )}

      <p aria-live="polite" className="mt-4 text-[13px] text-text-tertiary">
        {rows.length} of {records.length} shown.
      </p>
    </div>
  );
}
