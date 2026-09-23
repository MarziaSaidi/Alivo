/**
 * Operational row — one record in a register.
 *
 * control.row.height 42 (10 vertical padding on 14px body at 1.55).
 * Divider is border.quiet, inset to the content edge. Identity is always
 * first and always left — it is the scan target. Only the description
 * column truncates. (component §6)
 *
 * Below sm the description wraps to its own line rather than truncating.
 */
export default function Row({
  subject,
  value,
  description,
  trailing,
  onClick,
}: {
  subject: string;
  value?: string;
  description: string;
  trailing: string;
  onClick?: () => void;
}) {
  const cells = (
    <>
      <span className="order-1 shrink-0 truncate text-[14px] text-text-primary sm:w-[120px]">
        {subject}
      </span>
      <span className="tnum order-2 shrink-0 text-[14px] text-text-secondary sm:w-[76px] sm:text-right">
        {value ?? ""}
      </span>
      <span className="tnum order-3 ml-auto shrink-0 text-[13px] text-text-tertiary sm:order-4 sm:ml-0">
        {trailing}
      </span>
      <span
        title={description}
        className="order-4 min-w-0 basis-full text-[14px] text-text-secondary sm:order-3 sm:basis-auto sm:flex-1 sm:truncate"
      >
        {description}
      </span>
    </>
  );

  const shared =
    "flex w-full flex-wrap items-baseline gap-x-4 gap-y-1 border-b " +
    "border-border-quiet py-[10px] text-left sm:flex-nowrap";

  /* An inert row must not pretend to be a link: no hover, no cursor change. */
  if (!onClick) return <div className={shared}>{cells}</div>;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${shared} rounded-[6px] transition-colors duration-75 hover:bg-surface-hover`}
    >
      {cells}
    </button>
  );
}
