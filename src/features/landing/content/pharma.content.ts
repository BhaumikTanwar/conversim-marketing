import type { SectorFAQItem, SectorUseCaseItem } from "../types/landing.types";

export const USE_CASES: SectorUseCaseItem[] = [
  {
    icon: "school",
    title: "New MR Onboarding",
    copy: "Let new reps take their first hundred objections from an AI doctor instead of a real one.",
  },
  {
    icon: "rocket_launch",
    title: "Product Launch Readiness",
    copy: "Pressure-test new messaging on a molecule before the field ever says it out loud.",
  },
  {
    icon: "verified_user",
    title: "Objection Handling Drills",
    copy: "Rehearse pricing, safety, and efficacy pushback until it stops feeling scripted.",
  },
  {
    icon: "stethoscope",
    title: "KOL & Specialist Engagement",
    copy: "Practice the high-stakes conversations with personas modeled on skeptical specialists.",
  },
  {
    icon: "fact_check",
    title: "Compliance-Safe Coaching",
    copy: "Flag off-label claims and promotional missteps automatically, every rehearsal.",
  },
  {
    icon: "bar_chart",
    title: "Manager Scorecards",
    copy: "Review AI-scored call recordings by rep and territory without sitting in on every call.",
  },
];

export const FAQS: SectorFAQItem[] = [
  {
    question: "Is real patient or HCP data used to train the AI personas?",
    answer:
      "No. Personas are synthetic - built from role, specialty, and behavior patterns, never from real patient or provider records.",
  },
  {
    question: "Can we customize personas for our therapy area?",
    answer: "Yes. Personas, objections, and product context can be configured per therapy area, molecule, and market.",
  },
  {
    question: "Does it flag off-label or non-compliant language?",
    answer:
      "You can add scoring criteria for off-label claims, promotional overreach and any other compliance point you care about. Each session is scored against them, and the feedback appears in the rep's report.",
  },
  {
    question: "How is rep performance scored?",
    answer:
      "Each session is scored against a rubric you define, such as message clarity, objection handling and compliance, with a per-criterion breakdown in the report.",
  },
  {
    question: "Can this integrate with our LMS?",
    answer:
      "There is no built-in LMS sync today. Sessions, scores and transcripts live in Conversim, and personas can connect to Google Calendar and other tools during a call. Tell us which system you use and we'll look at what's possible.",
  },
  {
    question: "What languages are supported?",
    answer:
      "More than 80 languages. You choose each persona's language when you set it up, and it can switch mid-conversation if the rep does.",
  },
];
