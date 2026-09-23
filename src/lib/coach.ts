/* ------------------------------------------------------------------ *
 * AGENT COACH
 *
 * Alivo notices repeated situations and prepares an improvement for
 * review. It never expands its own authority, and it never "learns"
 * anything on its own. The human approves, edits, or dismisses.
 * ------------------------------------------------------------------ */

/**
 * Lower-risk GUIDANCE may be approved directly after review: FAQs,
 * service area, process, approved company policy.
 *
 * Consequential AUTHORITY — discounts, pricing, contract or appointment
 * commitments, refunds, financial promises — is never proposed as a
 * change by Coach. Those patterns are only ever surfaced for review.
 */
export type Risk = "guidance" | "authority";

export type ImprovementStatus = "proposed" | "approved" | "dismissed" | "off";

export type PastExample = {
  id: string;
  customer: string;
  question: string;
  handledBy: string;
  answer: string;
  /** How the proposed guidance would have behaved. A preview, not a score. */
  preview: string;
  /** Whether it would still have come to a human. */
  stillAsks: boolean;
};

export type Improvement = {
  slug: string;
  title: string;
  agent: string;
  risk: Risk;
  /** Overview lines. */
  summary: string[];
  /** Overview call to action. */
  cta: string;
  /** Counts shown in the detail header. */
  counts?: string[];
  noticed?: string[];
  whyItMatters?: string;
  examples?: PastExample[];
  proposedGuidance?: string;
  wouldChange?: string[];
  wouldNotChange?: string[];
  scope?: { label: string; value: string[] }[];
  /** Short name used in history. */
  historyTitle?: string;
  /** True when a full review screen exists. */
  reviewable: boolean;
};

export const DISMISS_REASONS = [
  "Already handled another way",
  "Not enough evidence",
  "I don't want Alivo answering this",
  "Other",
];

export const deductibles: Improvement = {
  slug: "insurance-deductibles",
  title: "Insurance deductible questions",
  agent: "Follow-up",
  risk: "guidance",
  reviewable: true,
  historyTitle: "Insurance deductible guidance",
  summary: [
    "14 customers asked about insurance deductibles.",
    "11 conversations needed a human because Follow-up does not have approved guidance.",
    "Suggested improvement: teach Follow-up how your company handles insurance deductible questions.",
  ],
  cta: "Review improvement",
  counts: ["14 customers asked", "11 required human help"],
  noticed: [
    "Over the last several weeks, customers repeatedly asked Follow-up how insurance deductibles work.",
    "In 11 conversations, Follow-up paused because your company does not have approved guidance for this question.",
    "Your team answered essentially the same question several times.",
  ],
  whyItMatters:
    "These questions repeatedly interrupt Follow-up even though your team usually gives a similar answer.",
  examples: [
    {
      id: "ex1",
      customer: "Sarah B.",
      question: "Do I have to pay my deductible before work starts?",
      handledBy: "Mike",
      answer:
        "Your deductible is part of your insurance agreement. We can explain the project costs, but your insurer determines how and when the deductible applies.",
      preview: "Would answer using the new guidance.",
      stillAsks: false,
    },
    {
      id: "ex2",
      customer: "David R.",
      question: "Can you waive my deductible?",
      handledBy: "Hailey",
      answer:
        "We don't waive insurance deductibles. We can walk you through your estimate and help explain what your policy is showing.",
      preview:
        "Would still ask for help because the customer asked to waive the deductible.",
      stillAsks: true,
    },
    {
      id: "ex3",
      customer: "Carlos M.",
      question: "Does insurance send you the deductible?",
      handledBy: "Mike",
      answer:
        "The deductible is the homeowner's responsibility under the insurance policy. We can help you understand the estimate, but we don't change the deductible.",
      preview: "Would answer using the new guidance.",
      stillAsks: false,
    },
  ],
  proposedGuidance:
    "When customers ask about insurance deductibles, explain that the deductible is determined by their insurance policy and remains the homeowner's responsibility. Alivo may help explain the estimate and project costs, but should not offer to waive, reduce, or modify the deductible.",
  wouldChange: [
    "Follow-up can answer general deductible questions using this guidance.",
    "Follow-up no longer needs to escalate questions that clearly fall within this approved guidance.",
  ],
  wouldNotChange: [
    "A customer asks Alivo to waive or change a deductible.",
    "A question depends on the customer's specific insurance coverage.",
    "The customer disputes what their insurer told them.",
    "The conversation moves into legal or policy interpretation beyond the approved guidance.",
  ],
  scope: [
    { label: "Applies to", value: ["Follow-up"] },
    { label: "Used for", value: ["Insurance deductible questions"] },
    {
      label: "Does not change",
      value: [
        "Pricing authority",
        "Scheduling authority",
        "Other agents",
        "Existing customer records",
      ],
    },
  ],
};

export const competitorPricing: Improvement = {
  slug: "competitor-pricing",
  title: "Competitor pricing requests",
  agent: "Follow-up",
  /* Consequential. Coach surfaces the pattern; it never proposes widening
     discount authority on its own. */
  risk: "authority",
  reviewable: false,
  historyTitle: "Competitor pricing pattern",
  summary: [
    "6 recent pricing exceptions involved competitor quotes.",
    "Your team countered in 4 of them.",
    "Alivo found a repeated pricing pattern worth reviewing.",
  ],
  cta: "Review pattern",
};

export const improvements: Improvement[] = [deductibles, competitorPricing];

export function getImprovement(slug: string) {
  return improvements.find((i) => i.slug === slug);
}

/** Prototype operator. */
export const OPERATOR = "Mike";
export const TODAY = "Sep 19, 2026";
