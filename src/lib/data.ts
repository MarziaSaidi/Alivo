/**
 * Fixture data for the Mission Control prototype.
 *
 * Mirrors the approved event/exception model:
 *   - work exceptions attach to a job (customer + money)
 *   - system exceptions attach to an integration (no customer, no money)
 *   - exactly one exception occupies the expanded slot
 */

export type ExceptionKind = "work" | "system";

export type Exception = {
  id: string;
  kind: ExceptionKind;
  /** Customer name, or the external system name for system exceptions. */
  subject: string;
  /** Job value in dollars. Absent on system exceptions. */
  value?: number;
  /** Four to six words. What is needed. */
  need: string;
  /** How long someone has been waiting. */
  waiting: string;
  /** Which agent raised it. */
  agent?: string;
};

/** The single exception that occupies the expanded slot. */
export const leadException = {
  id: "exc_sarah_mitchell",
  subject: "Sarah Mitchell",
  job: "roof replacement",
  value: 24800,
  competitorQuote: 21500,
  gap: 3300,
  gapPercent: "13.3%",
  waiting: "17 minutes",
  promisedBy: "3:14 PM",
  agent: "Follow-up",
  policy: [
    "Follow-up can discount up to 5%.",
    "Competitor matches always come to you, whatever the amount.",
  ],
  suggestion: "Counter at $23,200",
  suggestionValue: 23200,
  /** 5% of the quote — what Follow-up may give without asking. */
  allowedDiscount: 1240,
  allowedPercent: "5.0%",

  /* ---- Exception Detail ---- */

  slug: "sarah-mitchell",
  location: "Portland, Maine",

  /** FACT. What Alivo established. Past tense, no interpretation. */
  knows: [
    "Inspection completed \u2014 28 squares, two existing layers",
    "Quote already sent",
    "Sarah is comparing providers",
    "No discount has been promised",
  ],

  /** FACT. Gaps that bear on the decision, stated rather than omitted. */
  doesNotKnow: [
    "Competitor company",
    "Whether $21,500 includes tear-off of the existing layers",
  ],

  /** POLICY. Configured by the company, not inferred. */
  rules: [
    "Follow-up can discount up to 5%.",
    "Competitor matches require your approval.",
  ],

  /** FACT. Historical context only. Not a prediction. */
  evidence: {
    window: "Based on 6 similar situations",
    summary:
      "4 received counteroffers \u00b7 3 booked \u00b7 average accepted discount 6.4%",
  },

  /** Representative recent messages for the read-only inspection panel. */
  conversation: [
    {
      id: "m1",
      at: "Tue 4:12 PM",
      from: "Alivo",
      body: "Hi Sarah \u2014 here is the estimate for your roof replacement: $24,800. That covers full tear-off of both existing layers, new underlayment and architectural shingles.",
    },
    {
      id: "m2",
      at: "Wed 10:03 AM",
      from: "Alivo",
      body: "Just making sure the estimate came through alright. Happy to walk you through any part of it.",
    },
    {
      id: "m3",
      at: "Today 2:14 PM",
      from: "Sarah",
      body: "I got another quote for $21,500. Is that something you would be able to match?",
    },
    {
      id: "m4",
      at: "Today 2:14 PM",
      from: "Alivo",
      body: "Thanks Sarah \u2014 let me confirm what we can do on price and come back to you within the hour.",
    },
  ],
};

/** The four things the operator can decide. */
export type DecisionOption = "counter" | "match" | "hold" | "ask";

/**
 * ALIVO SUGGESTION register.
 *
 * Prototype copy for what Sarah would receive. Regenerated from the chosen
 * decision and the current counter amount; the operator can edit it.
 */
export function suggestedMessage(option: DecisionOption, amount: number) {
  const { competitorQuote, value } = leadException;
  switch (option) {
    case "counter":
      return `Thanks for sharing that quote. We can't match ${usd(
        competitorQuote
      )}, but I can bring your project to ${usd(
        amount
      )} based on the scope we inspected. If you'd like, I can keep that price available while you compare.`;
    case "match":
      return `Thanks for sharing that quote. We can meet ${usd(
        competitorQuote
      )} on this project. Want me to get you on the schedule?`;
    case "hold":
      return `Thanks for sharing that quote. We're staying at ${usd(
        value
      )} \u2014 that covers full tear-off of both existing layers and our workmanship warranty, which may not be in the other estimate. Happy to walk you through the scope side by side.`;
    case "ask":
      return `Thanks for sending that over. Before I take it to Mike \u2014 does the ${usd(
        competitorQuote
      )} include tearing off both existing layers? Yours has two, and that is a real cost difference. I want to compare like for like.`;
  }
}

/** HUMAN DECISION register. The commit label always states the outcome. */
export function commitLabel(option: DecisionOption, amount: number) {
  switch (option) {
    case "counter":
      return `Send counter at ${usd(amount)}`;
    case "match":
      return `Match competitor at ${usd(leadException.competitorQuote)}`;
    case "hold":
      return `Keep quote at ${usd(leadException.value)}`;
    case "ask":
      return "Ask Sarah what's included";
  }
}

/** Everything else in the queue. One line each. */
export const queue: Exception[] = [
  {
    id: "exc_torres",
    kind: "work",
    subject: "D. Torres",
    value: 9400,
    need: "Needs appointment slot",
    waiting: "2h",
    agent: "Scheduler",
  },
  {
    id: "exc_okafor",
    kind: "work",
    subject: "R. Okafor",
    value: 18200,
    need: "Unknown customer question",
    waiting: "4h",
    agent: "Follow-up",
  },
  {
    id: "exc_jobnimbus",
    kind: "system",
    subject: "JobNimbus",
    need: "3 records failed to sync",
    waiting: "6h",
  },
];

/** Coverage assertion. Makes the quiet trustworthy. */
/* ------------------------------------------------------------------ *
 * COUNT RULES
 *
 * Three populations exist and they are deliberately different sizes. Each
 * is derived here from one stated rule, so no screen carries a count as a
 * string literal and no two screens can drift apart.
 * ------------------------------------------------------------------ */

/**
 * A decision needs a person to CHOOSE something. A system exception needs
 * attention — someone has to look at it — but there is no choice to make on
 * behalf of a customer, so it is not a decision.
 */
export const isDecision = (e: Exception) => e.kind !== "system";

/**
 * Mission Control's attention count: the featured exception plus every
 * queued item that needs a human decision.
 * Today: Sarah + D. Torres + R. Okafor = 3. JobNimbus is excluded.
 */
export const decisionsWaiting = 1 + queue.filter(isDecision).length;

/**
 * What is left in the queue once the featured exception is lifted out of
 * it. Includes system exceptions, because they are still waiting.
 * Today: 3.
 */
export const alsoWaiting = queue.length;

/**
 * Every open record, decisions and system exceptions alike. This is the
 * population the Exceptions index calls "Open", and it is one larger than
 * `decisionsWaiting` for exactly as long as a system exception is open.
 * Today: 4. Re-exported by `lib/exceptions.ts` as `openCount`.
 */
export const openExceptions = 1 + queue.length;

export const coverage = {
  agents: 4,
  liveConversations: 18,
  lastAction: "40 seconds ago",
};

/** Quiet counterweight to a surface that otherwise only shows failure. */
export const ranWithoutYou = [
  { count: 47, label: "conversations handled" },
  { count: 12, label: "appointments booked" },
  { count: 6, label: "quotes sent" },
  { count: 3, label: "exceptions resolved themselves" },
];

export const thisWeek = [
  "31 leads, 28 answered within 5 min",
  "19 appointments booked",
  "$284,000 quoted",
  "41 sec median first reply",
];

export const coachCount = 2;

export function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
