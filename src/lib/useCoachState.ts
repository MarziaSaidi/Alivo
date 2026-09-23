"use client";

import { useCallback, useEffect, useState } from "react";
import type { ImprovementStatus } from "./coach";

export type ImprovementRecord = {
  status: ImprovementStatus;
  /** The version the operator approved — theirs if they edited it. */
  guidance?: string;
  edited?: boolean;
  approvedBy?: string;
  approvedAt?: string;
  dismissReason?: string;
};

export type CoachState = Record<string, ImprovementRecord>;

const KEY = "alivo:coach";

/**
 * Prototype state, shared by the Coach overview, the improvement review,
 * change history and Mission Control's Coach line. Session-scoped: moving
 * between routes during a session must not reset a decision.
 *
 * Hydration is gated on state rather than a ref — the persist effect has to
 * wait for the render that carries the restored values, or it writes the
 * defaults straight back over them.
 */
export function useCoachState() {
  const [state, setState] = useState<CoachState>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      if (saved) setState(JSON.parse(saved));
    } catch {
      /* blocked storage — defaults are correct */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* nothing to do; the decision simply will not persist */
    }
  }, [hydrated, state]);

  const update = useCallback((slug: string, record: ImprovementRecord) => {
    setState((prev) => ({ ...prev, [slug]: record }));
  }, []);

  const statusOf = useCallback(
    (slug: string): ImprovementStatus => state[slug]?.status ?? "proposed",
    [state]
  );

  return { state, hydrated, update, statusOf };
}
