import type { SectorFAQItem, SectorUseCaseItem } from "../types/landing.types";

export const USE_CASES: SectorUseCaseItem[] = [
  {
    icon: "person_add",
    title: "New Agent Onboarding",
    copy: "Let new agents take their first hundred objections from an AI prospect instead of a real one.",
  },
  {
    icon: "gpp_maybe",
    title: "Renewal & Premium Pushback",
    copy: 'Rehearse premium-increase objections and "why did my rate go up" conversations until they stop feeling scripted.',
  },
  {
    icon: "trending_up",
    title: "Cross-Sell & Upsell Practice",
    copy: "Practice bundling and coverage upgrade conversations without risking a real customer relationship.",
  },
  {
    icon: "handshake",
    title: "Difficult Claims Conversations",
    copy: "Rehearse denial explanations and frustrated-customer calls before they happen in the field.",
  },
  {
    icon: "fact_check",
    title: "Compliance-Safe Coaching",
    copy: "Flag misrepresentation and suitability issues automatically, every rehearsal.",
  },
  {
    icon: "bar_chart",
    title: "Manager Scorecards",
    copy: "Review AI-scored call recordings by agent and territory without sitting in on every call.",
  },
];

export const FAQS: SectorFAQItem[] = [
  {
    question: "Is real customer or policyholder data used to train the AI personas?",
    answer:
      "No. Personas are synthetic - built from role, behavior, and objection patterns, never from real customer or policy records.",
  },
  {
    question: "Can we customize personas for our product lines?",
    answer:
      "Yes. Personas, objections, and product context can be configured per line - auto, life, health, home, and more.",
  },
  {
    question: "Does it flag compliance issues like misrepresentation or suitability?",
    answer:
      "You can add scoring criteria for misrepresentation, suitability and any other compliance point you care about. Each session is scored against them, and the feedback appears in the agent's report.",
  },
  {
    question: "How is agent performance scored?",
    answer:
      "Each session is scored against a rubric you define, such as message clarity, objection handling and compliance, with a per-criterion breakdown in the report.",
  },
  {
    question: "Can this integrate with our LMS or CRM?",
    answer:
      "There is no built-in LMS or CRM sync today. Sessions, scores and transcripts live in Conversim, and personas can connect to Google Calendar and other tools during a call. Tell us which system you use and we'll look at what's possible.",
  },
  {
    question: "What languages are supported?",
    answer:
      "More than 80 languages. You choose each persona's language when you set it up, and it can switch mid-conversation if the agent does.",
  },
];
