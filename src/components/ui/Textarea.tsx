/**
 * Editable prose. Bounded because it is editable, not because it is grouped.
 *
 * `maxRows` caps growth so a long edit cannot push what follows off-screen;
 * the field then scrolls internally and stays fully reviewable. (component §4)
 */
export default function Textarea({
  value,
  onChange,
  ariaLabel,
  rows = 3,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
  rows?: number;
  className?: string;
}) {
  return (
    <textarea
      aria-label={ariaLabel}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={
        "block w-full resize-y rounded-[6px] border border-border-input " +
        "bg-surface-input px-3 py-2 text-[14px] leading-[1.5] text-text-secondary " +
        "outline-none focus:border-border-focus " +
        className
      }
    />
  );
}
