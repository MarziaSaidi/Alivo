/**
 * Editable single value.
 *
 * surface.input is LIGHTER than surface.canvas — on a paper metaphor an input
 * is the blank space you write into. That affordance lets the border stay
 * quiet. Editable is one of only four justifications for a boundary.
 * (layout §11, component §4)
 */
export default function Input({
  id,
  value,
  onChange,
  prefix,
  width = "w-[96px]",
  ariaLabel,
  inputMode,
  tabular = false,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  /** Rendered inside the field, optically subordinate to the digits. */
  prefix?: string;
  width?: string;
  ariaLabel?: string;
  inputMode?: "numeric" | "text";
  tabular?: boolean;
}) {
  return (
    <div className="inline-flex h-9 items-center rounded-[6px] border border-border-input bg-surface-input px-3 focus-within:border-border-focus">
      {prefix && (
        <span aria-hidden className="mr-[2px] text-[15px] text-text-tertiary">
          {prefix}
        </span>
      )}
      <input
        id={id}
        inputMode={inputMode}
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${width} ${
          tabular ? "tnum" : ""
        } h-full bg-transparent text-right text-[15px] font-medium text-text-primary outline-none`}
      />
    </div>
  );
}
