"use client";

import Link from "next/link";
import { deductibles, improvements } from "@/lib/coach";
import { useCoachState } from "@/lib/useCoachState";

/**
 * Mission Control's Coach line.
 *
 * Approving never produces a new alert here. The line simply gets quieter,
 * and a settled improvement is reported as one short past-tense note.
 */
export default function CoachEntry() {
  const { statusOf } = useCoachState();

  const open = improvements.filter((i) => statusOf(i.slug) === "proposed");
  const deductibleStatus = statusOf(deductibles.slug);

  return (
    <>
      <Link
        href="/coach"
        className="mt-1 inline-block rounded-[6px] py-1 text-[14px] leading-[1.55] text-text-interactive underline-offset-4 hover:underline"
      >
        {open.length === 0
          ? "Nothing waiting to review"
          : open.length === 1
          ? "1 improvement still worth reviewing"
          : `${open.length} repeated patterns found that could reduce future exceptions`}
        <span aria-hidden className="ml-1">&rarr;</span>
      </Link>

      {deductibleStatus === "approved" && (
        <p className="mt-1 text-[13px] text-text-tertiary">
          Deductible guidance approved for {deductibles.agent}
        </p>
      )}
    </>
  );
}
