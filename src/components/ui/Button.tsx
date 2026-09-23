import Link from "next/link";

/**
 * Blue means interactive, not important. A screen may hold several blue
 * elements when several things are genuinely actionable; what it may not hold
 * is more than one filled primary action. (component §3)
 *
 * Only the variants Mission Control uses are implemented.
 */
type Variant = "primary" | "quiet";

const BASE =
  "inline-flex items-center justify-center whitespace-nowrap rounded-[6px] " +
  "text-[14px] font-medium leading-[1.2] transition-colors duration-100";

const VARIANT: Record<Variant, string> = {
  // control.height.default 36 · space.related 16 horizontal
  primary:
    "h-9 px-4 bg-action-primary text-text-inverse " +
    "hover:bg-action-primary-hover active:bg-action-primary-pressed",
  // control.height.text 28, target extended to 40 by surrounding row height
  quiet: "h-7 px-2 -mx-2 text-text-secondary hover:text-text-primary",
};

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  href?: string;
  className?: string;
  tabular?: boolean;
  onClick?: () => void;
};

export default function Button({
  variant = "primary",
  children,
  href,
  className = "",
  tabular = false,
  onClick,
}: Props) {
  const cls = `${BASE} ${VARIANT[variant]} ${tabular ? "tnum" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
