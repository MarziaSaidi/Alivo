"use client";

import Link from "next/link";
import Label from "./ui/Label";
import { improvements } from "@/lib/coach";
import { useCoachState } from "@/lib/useCoachState";

/**
 * COACH OVERVIEW — deliberately quiet.
 *
 * Not an inbox, not a feed, not analytics. Only patterns that have already
 * crossed an evidence threshold appear, and nothing here changes anything
 * on its own. Alivo prepares; the operator decides. (ux-spec §8)
 *
 * A register of proposed improvements, not a collection of cards: rules and
 * space separate the items, and no item is ever given a fill, a four-sided
 * edge, a score or a status colour. With two improvements the page is short,
 * which is what an overview with little to review should look like.
 * (layout §8)
 */

/* 720, centred — the reading measure, no rail. (layout §4, §8) */
export default function CoachOverview() {
  const { statusOf } = useCoachState();

  const open = improvements.filter((i) => statusOf(i.slug) === "proposed");
  /* Approved and dismissed both leave the overview and are reported as one
     quiet line. Neither becomes a second queue. (ux-spec §8) */
  const settled = improvements.filter((i) => statusOf(i.slug) !== "proposed");

  return (
    <div className="mx-auto max-w-[720px] pt-6">
      <Label as="p">Agent Coach</Label>

      {/* Page title carries the state; the label above it names the section. */}
      <h1 className="mt-2 text-[18px] font-[550] leading-[1.3] tracking-[-0.01em] text-text-primary">
        {open.length === 0
          ? "Nothing to review right now."
          : `${open.length} improvement${
              open.length === 1 ? "" : "s"
            } worth reviewing`}
      </h1>
      <p className="mt-1 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
        {open.length === 0
          ? "Alivo will let you know if it notices another repeated pattern."
          : "Alivo found repeated situations where your agents needed the same kind of help."}
      </p>

      {open.length > 0 && (
        <div className="mt-8 border-t border-border-default">
          {open.map((imp) => {
            /* The data is shaped observation → observation → conclusion. The
               observations group tightly; the conclusion — what makes this
               worth a person's time — is given its own air, so the four
               levels read as title, agent, evidence, conclusion, action
               rather than as five equal lines. */
            const observations = imp.summary.slice(0, -1);
            const conclusion = imp.summary[imp.summary.length - 1];

            return (
              <section
                key={imp.slug}
                className="border-b border-border-default py-6"
              >
                {/* What Alivo noticed, and which agent it involves. */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-[15px] font-[550] leading-[1.4] text-text-primary">
                    {imp.title}
                  </h2>
                  <span className="text-[13px] leading-[1.45] text-text-tertiary">
                    {imp.agent}
                  </span>
                </div>

                {/* The measure sits on the element that carries the type
                    size — `ch` resolves against the element's own font-size,
                    so 58ch on an unsized list would be 58 characters of 16px. */}
                <ul className="mt-2 max-w-[58ch] space-y-1 text-[14px] leading-[1.55] text-text-secondary">
                  {observations.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                {/* Why it is worth reviewing. */}
                <p className="mt-3 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
                  {conclusion}
                </p>

                {/* The review action. The arrow, not the colour, is what
                    marks this as the affordance. (component §3) */}
                <Link
                  href={`/coach/${imp.slug}`}
                  className="-mx-1 mt-3 inline-flex h-7 items-center rounded-[6px] px-1 text-[14px] font-medium text-text-interactive underline-offset-4 hover:underline"
                >
                  {imp.cta}
                  <span aria-hidden className="ml-1">
                    &rarr;
                  </span>
                </Link>
              </section>
            );
          })}
        </div>
      )}

      {/* Already decided — a quiet pointer, never a second queue. */}
      <p className="mt-6 flex flex-wrap items-center gap-x-1 text-[13px] leading-[1.45] text-text-tertiary">
        {settled.length > 0 && (
          <>
            <span>{settled.length} already decided</span>
            <span aria-hidden>&middot;</span>
          </>
        )}
        <Link
          href="/coach/history"
          className="-mx-1 inline-flex h-7 items-center rounded-[6px] px-1 text-text-interactive underline-offset-4 hover:underline"
        >
          Change history
        </Link>
      </p>
    </div>
  );
}
