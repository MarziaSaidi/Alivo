import { leadException as sarah, usd } from "./data";

/* ------------------------------------------------------------------ *
 * BEAT MODEL
 *
 * A beat is one meaningful thing that changed in the business, not a
 * system event. The mechanics that produced it live inside the beat and
 * are only revealed on expansion.
 *
 * Weight is derived from business consequence, never assigned by hand:
 * if something moved money, a customer promise, a calendar or an external
 * business record, it carries more weight. If it failed or blocks work,
 * it interrupts the spine. These words never appear in the interface.
 * ------------------------------------------------------------------ */

export type Weight =
  | "ambient"
  | "quiet"
  | "consequential"
  | "needs-human"
  | "failed";

/** A block of mechanics or conclusions revealed on expansion. */
export type DetailGroup = {
  heading: string;
  lines: string[];
};

export type Recording = {
  duration: string;
  said: { from: string; body: string }[];
};

/** Why an external system refused, which decides whether a human is needed. */
export type FailureKind =
  /** Understood the change and would not accept it. Stops and asks. */
  | "rejected"
  /** Could not be reached at all. Retries quietly, no interruption block. */
  | "unreachable";

export type Remedy = {
  label: string;
  note?: string;
  /** The one action that actually fixes it. Says what will happen. */
  primary?: boolean;
};

export type Failure = {
  kind: FailureKind;
  system: string;
  headline: string;
  /** The operational consequence, stated immediately under the headline.
      Neutral text — the failure colour stays on the headline alone. */
  consequence: string;
  why: string[];
  meaning: string[];
  stillWorks: string[];
  /** Retry behaviour in business language. No logs, no codes. */
  retry: string;
  remedies: Remedy[];
  /** Stated with the remedies, before activation: what choosing one does
      in this prototype. */
  remedyNote?: string;
  /** Quiet historical line once a human has fixed it. */
  fixedBy: string;
};

export type Stopped = {
  headline: string;
  lines: string[];
  waiting: string;
};

export type Beat = {
  id: string;
  time: string;
  /** Sentence subject. Alivo, the customer, a named person, or a system. */
  actor: string;
  /** The business sentence. Past tense, no mechanism. */
  sentence: string;
  /** What is now true. Only on consequential beats and above. */
  consequence?: string[];
  weight: Weight;
  details?: DetailGroup[];
  recording?: Recording;
  stopped?: Stopped;
  failure?: Failure;
};

export type TraceRow =
  | { kind: "day"; id: string; label: string }
  | { kind: "gap"; id: string; label: string }
  | ({ kind: "beat" } & Beat);

export type Trace = {
  slug: string;
  name: string;
  job: string;
  value?: number;
  address: string;
  /** Where the operator came from, so context is never lost. */
  backHref: string;
  backLabel: string;
  /** Answers "did everything work" before any reading. */
  status: string[];
  statusAfterFix?: string[];
  rows: TraceRow[];
  /** Appended once a human resolves the failure. */
  afterFixRows?: TraceRow[];
  /** What is true NOW, not the last historical event. */
  closing: string;
  closingAfterFix?: string;
  /** Shown beside the resolution result once a human has fixed the failure.
      The remedy simulates an external write; this says so plainly, so the
      success beat is never read as a real JobNimbus update. */
  simulationNoteAfterFix?: string;
};

/* ------------------------------------------------------------------ *
 * STATE A — Sarah Mitchell
 * Reuses the shared exception fixture. No duplicated amounts.
 * ------------------------------------------------------------------ */

export const sarahTrace: Trace = {
  slug: sarah.slug,
  name: sarah.subject,
  job: "Roof replacement",
  value: sarah.value,
  address: "4418 Cedar Ridge Dr",
  backHref: `/exceptions/${sarah.slug}`,
  backLabel: "Sarah Mitchell · the decision",
  status: [
    "Everything Alivo did for Sarah worked.",
    "One decision is waiting on you.",
  ],
  closing: "Nothing further will be sent to Sarah until you decide.",
  rows: [
    { kind: "day", id: "d1", label: "Thursday" },
    {
      kind: "beat",
      id: "b1",
      time: "9:40 AM",
      actor: "Sarah",
      sentence: "Sarah called.",
      consequence: ["Alivo answered."],
      weight: "quiet",
      recording: {
        duration: "3m 12s",
        said: [
          {
            from: "Sarah",
            body: "Hi — I had some shingles come off in the storm last week and I think the whole roof is due. Do you do free estimates?",
          },
          {
            from: "Alivo",
            body: "We do. Can I get the address so I can check we cover you?",
          },
          { from: "Sarah", body: "4418 Cedar Ridge Drive, in Portland." },
          {
            from: "Alivo",
            body: "That is inside our area. I can get someone out Friday morning at 8 if that works.",
          },
          { from: "Sarah", body: "Friday at 8 is good." },
        ],
      },
      details: [
        {
          heading: "What Alivo established",
          lines: [
            "New customer",
            "Roof replacement",
            "4418 Cedar Ridge Dr",
            "Inside service area",
            "Added to JobNimbus",
          ],
        },
      ],
    },
    {
      kind: "beat",
      id: "b2",
      time: "9:47 AM",
      actor: "Alivo",
      sentence: "Alivo booked an inspection.",
      consequence: [
        "Friday 8:00 AM",
        "Ray Delgado",
        "Sarah confirmed by text.",
        "Added to JobNimbus.",
      ],
      weight: "consequential",
      details: [
        {
          heading: "What this involved",
          lines: [
            "Availability checked for Friday morning",
            "Ray Delgado selected",
            "Appointment created",
            "Sarah confirmed by text",
            "JobNimbus updated",
          ],
        },
      ],
    },
    { kind: "day", id: "d2", label: "Friday" },
    {
      kind: "beat",
      id: "b3",
      time: "9:30 AM",
      actor: "Ray",
      sentence: "Ray completed the inspection.",
      consequence: ["28 squares", "Two existing roof layers"],
      weight: "consequential",
      details: [
        {
          heading: "What Ray recorded",
          lines: [
            "28 squares",
            "Two existing layers — full tear-off required",
            "Decking sound, no replacement needed",
            "Measurements saved to JobNimbus",
          ],
        },
      ],
    },
    { kind: "day", id: "d3", label: "Tuesday" },
    {
      kind: "beat",
      id: "b4",
      time: "4:12 PM",
      actor: "Alivo",
      sentence: "Alivo sent the quote.",
      consequence: [usd(sarah.value), "Saved in JobNimbus."],
      weight: "consequential",
      details: [
        {
          heading: "What the quote covered",
          lines: [
            "Full tear-off of both existing layers",
            "New underlayment and architectural shingles",
            "28 squares",
            "Saved in JobNimbus",
          ],
        },
      ],
    },
    { kind: "day", id: "d4", label: "Wednesday" },
    {
      kind: "beat",
      id: "b5",
      time: "10:03 AM",
      actor: "Alivo",
      sentence: "Alivo followed up.",
      consequence: ["No reply."],
      weight: "quiet",
      details: [
        {
          heading: "What Alivo sent",
          lines: [
            "Just making sure the estimate came through alright. Happy to walk you through any part of it.",
          ],
        },
      ],
    },
    { kind: "gap", id: "g1", label: "quiet for 4 days" },
    { kind: "day", id: "d5", label: "Today" },
    {
      kind: "beat",
      id: "b6",
      time: "2:14 PM",
      actor: "Sarah",
      sentence: `Sarah asked whether you could match a ${usd(
        sarah.competitorQuote
      )} competitor quote.`,
      weight: "consequential",
      details: [
        {
          heading: "What Sarah wrote",
          lines: [
            "I got another quote for $21,500. Is that something you would be able to match?",
          ],
        },
      ],
    },
    {
      kind: "beat",
      id: "b7",
      time: "2:14 PM",
      actor: "Alivo",
      sentence: "Alivo replied without discussing price.",
      weight: "quiet",
      details: [
        {
          heading: "What Alivo sent",
          lines: [
            "Thanks Sarah — let me confirm what we can do on price and come back to you within the hour.",
          ],
        },
      ],
    },
    {
      kind: "beat",
      id: "b8",
      time: "2:14 PM",
      actor: "Alivo",
      sentence: "Alivo stopped.",
      weight: "needs-human",
      stopped: {
        headline: "Alivo stopped",
        lines: [
          "Competitor matches require human approval.",
          "Alivo checked your pricing rules before stopping.",
          "Follow-ups are paused until you decide.",
        ],
        waiting: "Waiting 17 minutes",
      },
    },
  ],
};

/* ------------------------------------------------------------------ *
 * STATE B — Marcus Webb
 * Same model. A rejected external change, which stops and asks.
 * ------------------------------------------------------------------ */

/**
 * Where a trace's resolution lives for the session. Both the trace itself
 * and the Exceptions register read this one key, so the two screens cannot
 * disagree about whether a failure has been resolved. (final-audit S1)
 */
export const traceStateKey = (slug: string) => `alivo:trace:${slug}`;

export const marcusTrace: Trace = {
  slug: "marcus-webb",
  name: "Marcus Webb",
  job: "Storm repair",
  address: "2210 Halstead Ave",
  backHref: "/activity",
  backLabel: "Activity",
  status: [
    "One thing didn't work.",
    "Marcus has been told Friday at 8:30 AM.",
    "Your scheduling record still shows Thursday at 10:00 AM.",
  ],
  statusAfterFix: [
    "Fixed. Marcus is booked for Friday at 8:30 AM with Tomas Reyes.",
    "JobNimbus now matches what Marcus was told.",
  ],
  closing: "Marcus is expecting someone Friday at 8:30 AM.",
  closingAfterFix: "Nothing else is pending for Marcus.",
  simulationNoteAfterFix:
    "Prototype simulation — this result is recorded in your browser session " +
    "only. No JobNimbus record, customer or connected system was changed.",
  rows: [
    { kind: "day", id: "md1", label: "Today" },
    {
      kind: "beat",
      id: "mb1",
      time: "11:02 AM",
      actor: "Marcus",
      sentence: "Marcus asked to move his appointment to Friday.",
      weight: "quiet",
      details: [
        {
          heading: "What Marcus wrote",
          lines: [
            "Something came up Thursday. Any chance you could do Friday instead?",
          ],
        },
      ],
    },
    {
      kind: "beat",
      id: "mb2",
      time: "11:02 AM",
      actor: "Alivo",
      sentence: "Alivo checked Friday.",
      consequence: [
        "8:30 AM available.",
        "Ray Delgado appeared available to Alivo.",
      ],
      weight: "quiet",
    },
    {
      kind: "beat",
      id: "mb3",
      time: "11:03 AM",
      actor: "Alivo",
      sentence: "Alivo confirmed Friday at 8:30 AM with Marcus.",
      consequence: ['Marcus replied: "Perfect, thanks."'],
      weight: "consequential",
      details: [
        {
          heading: "What Alivo sent",
          lines: [
            "All set — we will see you Friday at 8:30 AM. Ray will be out to you.",
          ],
        },
      ],
    },
    {
      kind: "beat",
      id: "mb4",
      time: "11:03 AM",
      actor: "Alivo",
      sentence: "Alivo moved the appointment on the Alivo schedule.",
      consequence: ["Friday 8:30 AM"],
      weight: "consequential",
    },
    {
      kind: "beat",
      id: "mb5",
      time: "11:03 AM",
      actor: "JobNimbus",
      sentence: "JobNimbus did not accept the change.",
      weight: "failed",
      failure: {
        kind: "rejected",
        system: "JobNimbus",
        headline: "JobNimbus rejected the appointment change.",
        consequence:
          "Marcus expects Friday at 8:30 AM. Nobody is scheduled for that visit.",
        why: [
          "The appointment is assigned to Ray Delgado.",
          "Ray is marked unavailable Friday in JobNimbus.",
          "JobNimbus therefore still shows the old appointment.",
        ],
        meaning: [
          "Marcus is expecting someone Friday at 8:30 AM.",
          "JobNimbus still shows Thursday at 10:00 AM.",
          "As things stand, nobody is correctly scheduled to visit Marcus Friday.",
        ],
        stillWorks: [
          "Texts and calls with Marcus are unaffected.",
          "Other JobNimbus updates are working.",
          "This issue affects this appointment.",
        ],
        retry:
          "Alivo tried again and stopped, because nothing had changed. It will not keep trying until someone changes something.",
        remedies: [
          {
            label: "Assign Tomas to Friday 8:30 AM",
            note: "Tomas Reyes · available Friday 8:30 AM",
            primary: true,
          },
          {
            label: "Open Ray's schedule in JobNimbus",
            note: "Keeps Ray on the visit. The schedule matches once he is marked available.",
          },
          {
            label: "Move Marcus back to Thursday",
            note: "Marcus is asked before the visit moves.",
          },
          {
            label: "I'll handle the schedule myself",
            note: "Marcus stays on Friday. JobNimbus will not match.",
          },
        ],
        /* Shown with the remedies, before activation. Three of the four
           demonstrate the option only; the first records a simulated result
           on this screen. Neither sends anything. (final-audit P1-5) */
        remedyNote:
          "Prototype — nothing is sent and no connected system is changed. " +
          "Only assigning Tomas records a result here.",
        fixedBy: "Fixed by Mike at 11:22 AM",
      },
    },
  ],
  afterFixRows: [
    {
      kind: "beat",
      id: "mb6",
      time: "11:22 AM",
      actor: "Alivo",
      sentence: "Alivo updated JobNimbus.",
      consequence: ["Friday 8:30 AM", "Tomas Reyes", "Successful."],
      weight: "consequential",
    },
  ],
};

export const traces: Trace[] = [sarahTrace, marcusTrace];

export function getTrace(slug: string) {
  return traces.find((t) => t.slug === slug);
}
