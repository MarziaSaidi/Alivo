import CoachEntry from "@/components/CoachEntry";
import MathRow from "@/components/MathRow";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Row from "@/components/ui/Row";
import {
  coverage,
  leadException as lead,
  queue,
  ranWithoutYou,
  thisWeek,
  usd,
  alsoWaiting,
  decisionsWaiting,
} from "@/lib/data";

/**
 * MISSION CONTROL — high fidelity.
 *
 * Answers: "Is the operation working, and what needs me?"
 *
 * The expanded exception is the ONLY bounded surface on this screen. A box
 * means the normal flow has stopped, and that meaning holds only because
 * nothing else here is boxed. Every other section is grouped by space,
 * alignment and a single rule. (layout §11, component §9)
 *
 * The healthy screen carries exactly one blue element — the Open control.
 */
export default function MissionControlPage() {
  return (
    <div className="pt-10">
      {/* ── OPERATING STATEMENT ─────────────────────────────────────────
          Role 2: 24 / 450 / −0.015em. Gains presence through size while
          LOSING weight — authoritative rather than emphatic. */}
      <section className="max-w-[760px]">
        <h1 className="tnum text-[24px] font-[450] leading-[1.35] tracking-[-0.015em] text-text-primary">
          Everything is running. {decisionsWaiting}{" "}
          {decisionsWaiting === 1 ? "decision is" : "decisions are"} waiting on you.
        </h1>
        <p className="tnum mt-1 text-[13px] leading-[1.45] text-text-tertiary">
          {coverage.agents} agents &middot; {coverage.liveConversations} live
          conversations &middot; last action {coverage.lastAction}
        </p>
      </section>

      {/* ── TWO COLUMNS — primary 800 + space.major 56 + rail 320 ──────── */}
      <div className="mt-8 flex flex-col gap-10 split:flex-row split:gap-14">
        <div className="min-w-0 flex-1 split:max-w-[800px] wide:split:max-w-[880px]">
          {/* ── LEAD EXCEPTION — the one interruption ──────────────────
              border.strong, no fill. A fill would make it a card. */}
          <article className="rounded-[8px] border border-border-strong px-6 py-4">
            <header className="flex flex-wrap items-baseline gap-x-3">
              {/* Customer identity, role 6: 17 / 550 / −0.005em */}
              <h2 className="text-[17px] font-[550] leading-[1.3] tracking-[-0.005em] text-text-primary">
                {lead.subject}
              </h2>
              {/* Numeric — decision: inherits context size, weight 500 */}
              <span className="tnum text-[17px] font-medium text-text-primary">
                {usd(lead.value)}
              </span>
              <span className="text-[13px] text-text-tertiary">{lead.job}</span>
            </header>

            <p className="mt-1 text-[14px] leading-[1.55] text-text-secondary">
              Asking you to match a competitor&rsquo;s quote.
            </p>

            {/* decision math beside policy and suggestion, so the block reads
                as one compact object rather than a tall stack */}
            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:gap-8">
              <dl className="sm:w-[300px] sm:shrink-0">
                <MathRow label="Your quote" amount={lead.value} />
                <MathRow label="Competitor" amount={lead.competitorQuote} />
                {/* ledger rule — separates facts from reckoning */}
                <div className="my-1 border-t border-border-default" />
                <MathRow
                  strong
                  label="She is asking for"
                  amount={lead.gap}
                  percent={lead.gapPercent}
                />
                <MathRow
                  label="Follow-up may give"
                  amount={lead.allowedDiscount}
                  percent={lead.allowedPercent}
                />
              </dl>

              <div className="min-w-0 flex-1">
                <Label as="h3">Your rule</Label>
                {/* POLICY is never dimmed to tertiary */}
                <div className="mt-2 space-y-[2px] text-[14px] leading-[1.5] text-text-secondary">
                  <p>Follow-up can discount up to 5%.</p>
                  <p>Competitor matches require human approval.</p>
                </div>

                <div className="mt-4">
                  <Label as="h3">Alivo suggests</Label>
                  <p className="tnum mt-2 text-[14px] leading-[1.5] text-text-primary">
                    Counter at {usd(lead.suggestionValue)}.
                  </p>
                </div>
              </div>
            </div>

            {/* the clock — pressure, not a fact. Never animates. */}
            <p className="tnum mt-4 text-[13px] leading-[1.45] text-text-tertiary">
              Waiting {lead.waiting} &middot; you promised a reply by{" "}
              {lead.promisedBy}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={`/exceptions/${lead.slug}`}>Open</Button>
              <Button variant="quiet">Reassign</Button>
            </div>
            {/* Reassign demonstrates the option; it commits nothing. Stated
                before activation, in the same register Exception Detail uses
                for "Prototype — nothing is sent." (final-audit P1-5) */}
            <p className="mt-3 text-[13px] leading-[1.45] text-text-tertiary">
              Prototype &mdash; nothing is reassigned.
            </p>
          </article>

          {/* ── ALSO WAITING ───────────────────────────────────────────── */}
          <div className="mt-8 border-b border-border-default pb-2">
            <Label>
              Also waiting{" "}
              <span className="tnum ml-1 font-normal tracking-normal text-text-tertiary">
                {alsoWaiting}
              </span>
            </Label>
          </div>

          <ul>
            {queue.map((item) => (
              <li key={item.id}>
                <Row
                  subject={item.subject}
                  value={item.value ? usd(item.value) : undefined}
                  description={item.need}
                  trailing={item.waiting}
                />
              </li>
            ))}
          </ul>

          {/* ── END OF QUEUE — explicit, never ambiguous whitespace ─────── */}
          <p className="mt-4 text-[14px] text-text-tertiary">
            That&rsquo;s everything.
          </p>

          {/* ── AGENT COACH ────────────────────────────────────────────── */}
          <section className="mt-8">
            <Label>Agent Coach</Label>
            <CoachEntry />
          </section>
        </div>

        {/* ── RAIL — 320 fixed, offset 72 so it does not compete with the
            lead exception for the first glance ─────────────────────────── */}
        <aside className="w-full shrink-0 split:w-[320px] split:pt-[72px]">
          <section>
            <Label>What ran without you</Label>
            <p className="mt-1 text-[13px] text-text-tertiary">Last 24 hours</p>
            <ul className="mt-3 space-y-2">
              {ranWithoutYou.map((row) => (
                <li
                  key={row.label}
                  className="flex items-baseline gap-3 text-[14px] leading-[1.55] text-text-secondary"
                >
                  <span className="tnum w-7 shrink-0 text-right text-text-primary">
                    {row.count}
                  </span>
                  <span>{row.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 border-t border-border-default pt-6">
            <Label>This week</Label>
            <ul className="tnum mt-3 space-y-2">
              {thisWeek.map((line) => (
                <li
                  key={line}
                  className="text-[14px] leading-[1.55] text-text-secondary"
                >
                  {line}
                </li>
              ))}
            </ul>
            {/* ux-spec §5F describes a link to a full report, but no
                destination is specified and §13.8 records it as having no
                behaviour. Stated as supporting text rather than advertising
                an affordance that does not exist. (final-audit S4) */}
            <p className="mt-4 text-[13px] leading-[1.45] text-text-tertiary">
              Full report is not part of this prototype.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
