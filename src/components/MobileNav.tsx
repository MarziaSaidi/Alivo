"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Routes that exist in this prototype. Shown below md, where LeftNav hides. */
const ROUTES = [
  { label: "Mission Control", href: "/mission-control" },
  { label: "Exceptions", href: "/exceptions" },
  { label: "Activity", href: "/activity" },
  { label: "Agent Coach", href: "/coach" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Sections" className="border-b border-border-default md:hidden">
      <ul className="flex gap-6 overflow-x-auto px-6 py-2">
        {ROUTES.map((r) => {
          const active = pathname.startsWith(r.href);
          return (
            <li key={r.href}>
              <Link
                href={r.href}
                aria-current={active ? "page" : undefined}
                className={
                  "block whitespace-nowrap rounded-[6px] py-1 text-[14px] " +
                  (active
                    ? "font-medium text-text-primary"
                    : "text-text-secondary")
                }
              >
                {r.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
