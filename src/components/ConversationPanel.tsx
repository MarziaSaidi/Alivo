"use client";

import { useEffect, useRef } from "react";
import Label from "./ui/Label";
import { leadException as lead } from "@/lib/data";

/**
 * Inspection layer — read-only evidence.
 *
 * Does NOT dim the decision surface: the decision is still live and still
 * holds an edited amount, so dimming would assert something false. No
 * backdrop at either width. Never stacks. Reading changes no state.
 *
 * At >= split it sits in flow with a hairline left edge and no shadow. Below
 * that it overlays from the right with elevation.overlay, because there it is
 * genuinely above the plane. (component §13)
 */
export default function ConversationPanel({ onClose }: { onClose: () => void }) {
  const headingRef = useRef<HTMLDivElement>(null);

  /* Focus moves to the panel on open and Escape closes it. Focus is not
     trapped — the decision behind stays operable, and trapping would
     contradict that. */
  useEffect(() => {
    headingRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <aside
      aria-label="Conversation with Sarah Mitchell"
      className="
        fixed inset-y-0 right-0 z-20 w-[340px] overflow-y-auto
        border-l border-border-default bg-canvas px-5 py-4 shadow-overlay
        split:static split:z-auto split:h-auto split:w-[320px] split:shrink-0
        split:overflow-visible split:border-l-0 split:px-0 split:py-0
        split:shadow-none
      "
    >
      <div className="split:border-l split:border-border-default split:pl-6">
        <div className="flex items-baseline justify-between">
          <div ref={headingRef} tabIndex={-1} className="outline-none">
            <Label>Conversation</Label>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mx-1 flex h-7 items-center rounded-[6px] px-1 text-[13px] text-text-tertiary hover:text-text-primary"
          >
            Close
          </button>
        </div>

        <p className="mt-1 text-[13px] text-text-tertiary">
          Recent messages only &middot; read only
        </p>

        <ol className="mt-4 space-y-4">
          {lead.conversation.map((m) => (
            <li key={m.id}>
              {/* actor as sentence subject, not as a chat bubble */}
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[14px] font-medium text-text-primary">
                  {m.from}
                </span>
                <span className="tnum shrink-0 text-[13px] text-text-tertiary">
                  {m.at}
                </span>
              </div>
              <p className="mt-1 text-[14px] leading-[1.55] text-text-secondary">
                {m.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-6 border-t border-border-default pt-3 text-[13px] text-text-tertiary">
          Nothing further will be sent until you decide.
        </p>
      </div>
    </aside>
  );
}
