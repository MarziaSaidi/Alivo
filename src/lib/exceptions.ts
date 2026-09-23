import { leadException as sarah, openExceptions, queue } from "./data";
import { marcusTrace } from "./activity";

/* ------------------------------------------------------------------ *
 * THE EXCEPTION RECORD
 *
 * Mission Control prioritises what needs a person now.
 * This is the complete record: retrieval and history.
 *
 *   open          still needs a person
 *   resolved      a person intervened and it is finished
 *   self-resolved Alivo hit an exception and handled it within its
 *                 existing authority, without a person
 * ------------------------------------------------------------------ */

export type ExceptionState = "open" | "resolved" | "self-resolved";

export type ExceptionRecord = {
  id: string;
  /** Customer, or the external system for system exceptions. */
  subject: string;
  /** Absent on system exceptions and on jobs with no value attached. */
  value?: number;
  /** What happened, in one line. */
  what: string;
  state: ExceptionState;
  /** The qualifier shown in the state column. */
  stateLabel: string;
  /** Waiting time while open; when it finished once closed. */
  when: string;
  /** Only rows with a built destination link anywhere. */
  href?: string;
  /** Extra text matched by search but not shown as its own column. */
  keywords?: string;
};

/* Open rows come from the same fixtures Mission Control renders. */
const open: ExceptionRecord[] = [
  {
    id: sarah.id,
    subject: sarah.subject,
    value: sarah.value,
    what: "Competitor pricing request",
    state: "open",
    stateLabel: "Needs your decision",
    when: "17m",
    href: `/exceptions/${sarah.slug}`,
    keywords: "roof replacement competitor match discount pricing",
  },
  ...queue.map((q) => ({
    id: q.id,
    subject: q.subject,
    value: q.value,
    what: q.need,
    state: "open" as const,
    stateLabel: q.kind === "system" ? "Needs attention" : "Open",
    when: q.waiting,
    keywords: q.agent ?? "",
  })),
];

/* ------------------------------------------------------------------ *
 * MARCUS — one record, two presentations
 *
 * His register row is the same event the Activity trace shows, so the two
 * screens must not disagree about whether it has been resolved. The row is
 * unresolved until the operator chooses a remedy on the trace, and resolved
 * afterwards; both are selected from the one persisted trace state, never
 * from a second copy of the truth. (final-audit S1)
 * ------------------------------------------------------------------ */

const marcusBase = {
  id: "res_marcus",
  subject: marcusTrace.name,
  what: "Appointment mismatch with JobNimbus",
  href: `/activity/${marcusTrace.slug}`,
  keywords: "storm repair scheduling jobnimbus tomas reyes",
} as const;

/** Before the operator intervenes: a failure still waiting on a person.
 *  "Needs attention" is the label the register already gives a system
 *  exception; 11:03 AM is when JobNimbus rejected the change, not the
 *  11:22 AM stamp that only exists once the remedy is chosen. */
export const marcusOpen: ExceptionRecord = {
  ...marcusBase,
  state: "open",
  stateLabel: "Needs attention",
  when: "Today 11:03 AM",
};

/** After the operator assigns Tomas — agrees with the trace's own record. */
export const marcusResolved: ExceptionRecord = {
  ...marcusBase,
  state: "resolved",
  stateLabel: "Resolved",
  when: "Today 11:22 AM",
};

/* Prototype history. Only Marcus has a built destination. */
const resolved: ExceptionRecord[] = [
  {
    id: "res_whitfield",
    subject: "J. Whitfield",
    value: 12600,
    what: "Asked for a discount above 5%",
    state: "resolved",
    stateLabel: "Resolved",
    when: "Yesterday 4:05 PM",
    keywords: "pricing discount",
  },
  {
    id: "res_nguyen",
    subject: "L. Nguyen",
    value: 7300,
    what: "Question about warranty terms",
    state: "resolved",
    stateLabel: "Resolved",
    when: "Tue 9:18 AM",
    keywords: "warranty unknown question",
  },
  {
    id: "res_calendar",
    subject: "Calendar",
    what: "Two inspections booked in the same slot",
    state: "resolved",
    stateLabel: "Resolved",
    when: "Mon 2:40 PM",
    keywords: "scheduling conflict double booked",
  },
];

/* Alivo hit an exception and cleared it inside its existing authority. */
const selfResolved: ExceptionRecord[] = [
  {
    id: "self_alvarez",
    subject: "T. Alvarez",
    value: 15400,
    what: "Appointment slot conflict — Alivo found another time",
    state: "self-resolved",
    stateLabel: "Self-resolved",
    when: "Today 8:12 AM",
    keywords: "scheduling conflict",
  },
  {
    id: "self_rowe",
    subject: "P. Rowe",
    value: 6900,
    what: "Asked for a different time — Alivo rescheduled",
    state: "self-resolved",
    stateLabel: "Self-resolved",
    when: "Yesterday 1:47 PM",
    keywords: "reschedule inspection",
  },
];

/**
 * The complete register. Marcus sits with the open records until his trace
 * is resolved, and with the history afterwards.
 */
export function exceptionRecordsFor(marcusFixed: boolean): ExceptionRecord[] {
  return marcusFixed
    ? [...open, marcusResolved, ...resolved, ...selfResolved]
    : [...open, marcusOpen, ...resolved, ...selfResolved];
}

/**
 * Open = every open exception record, system exceptions included — the rule
 * is unchanged from lib/data.ts. The population now also includes Marcus
 * while his failure is unresolved, which is what makes the register agree
 * with the trace. `openExceptions` still supplies the fixture baseline.
 */
export function openCountFor(marcusFixed: boolean): number {
  return marcusFixed ? openExceptions : openExceptions + 1;
}

/** Fresh-session defaults: nothing has been resolved yet. */
export const exceptionRecords: ExceptionRecord[] = exceptionRecordsFor(false);
export const openCount = openCountFor(false);
