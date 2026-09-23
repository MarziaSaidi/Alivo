"use client";

import Link from "next/link";
import { improvements } from "@/lib/coach";
import { useCoachState } from "@/lib/useCoachState";

/** Section heading — 15/550 sentence case. (typography §17 role 4) */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-[550] leading-[1.4] text-text-primary">
      {children}
    </h2>
  );
}

/**
 * CHANGE HISTORY.
 *
 * The operational record of what the operator decided about Coach
 * improvements — not a second queue, not analytics, not a technical audit
 * log. Every decision stays, including reversals: turning guidance off is
 * itself part of the record, and nothing is deleted. (ux-spec §8)
 *
 * A row that grew. It keeps the operational-row grammar — identity left,
 * metadata beneath it, a quiet divider between records — but it is a
 * composition rather than an instance of `Row`, because it carries a status
 * line and a control. (component §6)
 *
 * Status recedes rather than colouring: active guidance is `text.primary`,
 * turned-off guidance `text.tertiary` — it recedes, it is never deleted —
 * and a dismissal sits between them. No pills, no badges, no hue.
 * (colour §11)
 */
export default function CoachHistory() {
  const { state, update, statusOf } = useCoachState();

  const decided = improvements.filter((i) => statusOf(i.slug) !== "proposed");

  return (
    <div className="mx-auto max-w-[720px] pt-6">
      <Link
        href="/coach"
        className="-mx-1 inline-flex h-7 items-center rounded-[6px] px-1 text-[13px] leading-[1.45] text-text-tertiary hover:text-text-primary"
      >
        <span aria-hidden className="mr-1">
          &larr;
        </span>
        Agent Coach
      </Link>

      <header className="mt-4">
        <h1 className="text-[18px] font-[550] leading-[1.3] tracking-[-0.01em] text-text-primary">
          Change history
        </h1>
        <p className="mt-1 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
          What you approved, edited, turned off or dismissed. Kept whether or
          not it is still in effect.
        </p>
      </header>

      {decided.length === 0 ? (
        <p className="mt-8 border-t border-border-default pt-6 text-[14px] leading-[1.55] text-text-tertiary">
          Nothing decided yet.
        </p>
      ) : (
        <div className="mt-8 border-t border-border-default">
          {decided.map((imp) => {
            const rec = state[imp.slug];
            const status = statusOf(imp.slug);

            /* Active holds full contrast; turned off recedes a step further
               than dismissed, because it was in force and no longer is. */
            const statusTone =
              status === "approved"
                ? "text-text-primary"
                : status === "dismissed"
                  ? "text-text-secondary"
                  : "text-text-tertiary";

            return (
              <section
                key={imp.slug}
                className="border-b border-border-quiet py-6"
              >
                <Heading>{imp.historyTitle ?? imp.title}</Heading>

                {/* The approval record. It survives a turn-off unchanged —
                    that is the whole point of keeping it. */}
                {status !== "dismissed" && (
                  <p className="tnum mt-1 text-[13px] leading-[1.45] text-text-tertiary">
                    Approved by {rec?.approvedBy} &middot; {rec?.approvedAt}
                    {rec?.edited ? " · your edited wording" : ""}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="w-[112px] shrink-0 text-[13px] leading-[1.45] text-text-tertiary">
                    Current status
                  </span>
                  <span
                    className={`min-w-0 flex-1 text-[14px] leading-[1.5] ${statusTone}`}
                  >
                    {status === "approved" && `Active for ${imp.agent}`}
                    {status === "off" && "Turned off"}
                    {status === "dismissed" && "Dismissed"}
                  </span>
                </div>

                {/* Secondary action: an outline, never a fill. The filled
                    control in Coach belongs to approval, which lives on the
                    review screen. (component §3, §14) */}
                {status === "approved" && (
                  <button
                    type="button"
                    aria-label={`Turn off this guidance — ${
                      imp.historyTitle ?? imp.title
                    }`}
                    onClick={() => update(imp.slug, { ...rec, status: "off" })}
                    className="mt-4 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-[6px] border border-border-input px-4 text-[14px] font-medium leading-[1.2] text-text-primary transition-colors duration-100 hover:bg-surface-hover"
                  >
                    Turn off this guidance
                  </button>
                )}

                {status === "off" && (
                  <p className="mt-2 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
                    Follow-up is back to asking for human help on these
                    questions. The record above stays.
                  </p>
                )}

                {status === "dismissed" && (
                  <p className="mt-2 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
                    Not adopted. Follow-up keeps asking for help on these
                    questions.
                    {rec?.dismissReason ? ` Reason: ${rec.dismissReason}` : ""}
                  </p>
                )}
              </section>
            );
          })}
        </div>
      )}

      {/* Same qualifier the review screens carry. "Active for Follow-up"
          describes what the decision would mean, not something this build
          did to a running agent. */}
      <p className="mt-6 max-w-[58ch] text-[13px] leading-[1.45] text-text-tertiary">
        Prototype &mdash; these decisions are recorded in your browser session
        only. No live agent, customer or connected system has been changed.
      </p>
    </div>
  );
}
