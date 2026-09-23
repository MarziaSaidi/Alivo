import Link from "next/link";
import Label from "./ui/Label";
import type { Improvement } from "@/lib/coach";

/** Section heading — 15/550 sentence case. (typography §17 role 4, §6) */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-[550] leading-[1.4] text-text-primary">
      {children}
    </h2>
  );
}

/**
 * CONSEQUENTIAL PATTERN — surfaced, never proposed as a change.
 *
 * Discount limits, contract and appointment commitments, refunds and other
 * financial promises are consequential authority: Coach states the pattern
 * and stops. This screen therefore has no approval control, no editable
 * limit, no simulation and no score — and it must never read as a
 * recommendation that Follow-up should counter future requests.
 * (ux-spec §8 — "It states the pattern and stops.")
 *
 * It shares the Coach measure and register with the deductible review, but
 * not its two-column boundary: that geometry exists to let an operator weigh
 * what a decision would and would not do. There is no decision here, so the
 * boundary is one statement, carried by rules, space and 15px content.
 * (layout §8, §11, typography §11)
 */
export default function PatternNotice({ imp }: { imp: Improvement }) {
  /* Shaped observation → observation → conclusion, as on the overview. */
  const observations = imp.summary.slice(0, -1);
  const conclusion = imp.summary[imp.summary.length - 1];

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
          {imp.title}
        </h1>
        <p className="mt-1 text-[13px] leading-[1.45] text-text-tertiary">
          {imp.agent}
        </p>
      </header>

      {/* ── WHAT ALIVO NOTICED ─────────────────────────────────────────
          The figures are the evidence and are stated as counts of what
          already happened. They are never extrapolated into a rate, a
          recommendation or a prediction. ─────────────────────────────── */}
      <section className="mt-8 border-t border-border-default pt-6">
        <Label>What Alivo noticed</Label>
        <ul className="tnum mt-2 max-w-[58ch] space-y-1 text-[14px] leading-[1.55] text-text-primary">
          {observations.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {/* Why it is worth a person's time — given its own air, as on the
            overview, so the page does not read as five equal lines. */}
        <p className="mt-3 max-w-[58ch] text-[14px] leading-[1.55] text-text-primary">
          {conclusion}
        </p>
      </section>

      {/* ── THE PRICING BOUNDARY ───────────────────────────────────────
          Unmistakable by position, rules and size — never by a warning
          card or a failure colour. Nothing here is broken, so nothing here
          is red. (colour §20 — state.failure is for failure, not for
          caution) ─────────────────────────────────────────────────────── */}
      <section className="mt-8 border-y border-border-default py-6">
        <Heading>What Alivo will not change</Heading>
        <p className="mt-2 max-w-[510px] text-[15px] leading-[1.5] text-text-primary">
          Pricing is one of the areas Alivo will not change on its own.
          Discount limits, contract and appointment commitments, refunds and
          other financial promises stay exactly where you set them. Alivo
          surfaced this pattern so you can look at it, and nothing more.
        </p>
      </section>

      <p className="mt-6 max-w-[58ch] text-[14px] leading-[1.55] text-text-secondary">
        Changing what Follow-up may offer on price would need its own review,
        with explicit scope and a stronger confirmation than this. That is not
        built yet.
      </p>
    </div>
  );
}
