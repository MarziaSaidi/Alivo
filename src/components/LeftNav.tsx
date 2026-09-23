"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Primary navigation — 216px, recessive.
 *
 * Never blue except a focus ring: the active item is distinguished by
 * contrast, weight and a 2px marker. Colouring it blue would make the shell
 * compete with the commit control. (component §7)
 */
const PRIMARY = [
  { label: "Mission Control", href: "/mission-control" },
  { label: "Exceptions", href: "/exceptions" },
  { label: "Activity", href: "/activity" },
  { label: "Agent Coach", href: "/coach" },
];

/** Part of the wider product. Inert, not focusable. */
const CONTEXT = ["Customers", "Agents"];

export default function LeftNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="hidden w-[216px] shrink-0 border-r border-border-default md:block"
    >
      <div className="sticky top-0 flex h-screen flex-col">
        {/* brand area aligns with the 48px top bar */}
        <div className="flex h-12 items-center px-6">
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-text-primary">
            Alivo
          </span>
        </div>

        <ul className="mt-6 px-3">
          {PRIMARY.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    "relative flex h-8 items-center rounded-[6px] px-3 text-[14px] " +
                    (active
                      ? "font-medium text-text-primary"
                      : "text-text-secondary hover:text-text-primary")
                  }
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 h-4 w-[2px] rounded-full bg-text-primary"
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mx-6 mt-6 border-t border-border-default pt-6">
          <ul className="-mx-3">
            {CONTEXT.map((label) => (
              <li key={label}>
                <span className="flex h-8 cursor-default items-center px-3 text-[14px] text-text-tertiary">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto px-6 py-6 text-[12px] text-text-tertiary">
          Prototype
        </div>
      </div>
    </nav>
  );
}
