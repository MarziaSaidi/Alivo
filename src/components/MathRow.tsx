import { usd } from "@/lib/data";

/**
 * One line of a reckoning. Values align in a fixed right-hand column so
 * amounts and percentages read as a single comparison.
 *
 * `strong` marks the contested value — the one the operator must weigh.
 * Never coloured: 13.3% is not bad and 5% is not good, so red/green would
 * editorialise a decision that belongs to the operator. (colour §13)
 *
 * Shared by Mission Control and Exception Detail.
 */
export default function MathRow({
  label,
  amount,
  text,
  percent,
  strong = false,
}: {
  label: string;
  amount?: number;
  /** Raw value rendered in the amount column, for a lone percentage. */
  text?: string;
  percent?: string;
  strong?: boolean;
}) {
  const value = strong
    ? "font-medium text-text-primary"
    : "text-text-secondary";

  return (
    <div className="flex items-baseline gap-4 py-[2px]">
      <dt className="flex-1 text-[12px] text-text-tertiary">{label}</dt>
      <dd className={`tnum w-[72px] text-right text-[15px] ${value}`}>
        {text ?? (amount === undefined ? "" : usd(amount))}
      </dd>
      <dd className={`tnum w-[52px] text-right text-[15px] ${value}`}>
        {percent ?? ""}
      </dd>
    </div>
  );
}
