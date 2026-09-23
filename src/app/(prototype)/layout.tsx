import AppShell from "@/components/AppShell";

/**
 * The prototype's own shell. A route group leaves the URLs untouched —
 * `/mission-control`, `/exceptions`, `/activity` and `/coach` are exactly
 * where they were — while keeping the case study at `/` outside the
 * application chrome.
 */
export default function PrototypeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
