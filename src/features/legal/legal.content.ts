export const CONTACT_EMAIL = "info@conversim.co";
export const EFFECTIVE_DATE = "September 25, 2026";

export interface LegalSection {
  id: string;
  title: string;
  body: string[]; // paragraphs
  list?: string[];
}

export interface LegalDoc {
  title: string;
  summary: string;
  sections: LegalSection[];
}

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  summary:
    "Conversim lets you practise conversations with AI personas by voice, avatar video or phone. This policy explains what we collect, why, and the choices you have.",
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      body: ["We collect only what we need to run the service."],
      list: [
        "Account data: name, email address and profile details.",
        "Call data: audio of your conversations, live transcripts, and, for avatar calls, the video session with the AI persona. For phone calls, the phone number you ask us to dial.",
        "Reports: scores, feedback and rubric results generated after each call.",
        "Content you create: personas, agendas, rubrics, call presets and any instructions you add.",
        "Usage and billing data: plan, token and call usage, and payment status handled by our billing provider.",
        "Technical data: device, browser, IP address and error logs used to keep the service secure and reliable.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use your information",
      body: ["We use your information to:"],
      list: [
        "Run live calls and connect you to the AI persona you chose.",
        "Transcribe calls and score them against the rubric on the persona.",
        "Save attempts so you can replay recordings, read transcripts and compare results over time.",
        "Provide the sharing, workshop and team features you switch on.",
        "Meter usage, bill your plan and prevent abuse.",
        "Maintain, secure and improve Conversim, and contact you about your account.",
      ],
    },
    {
      id: "ai-processing",
      title: "AI processing",
      body: [
        "Your call audio and transcripts are processed by AI models to hold the conversation and to produce your report. AI-generated feedback can be wrong, so treat it as coaching and not as professional advice.",
        "We do not sell your call content, and we do not use it to train our own models. Our providers process it only to deliver the service to you, under their terms with us.",
      ],
    },
    {
      id: "service-providers",
      title: "Service providers we share data with",
      body: [
        "We share data with trusted third-party providers only as needed to run Conversim. Each acts on our instructions and is bound by confidentiality and data protection terms. We share data with these kinds of providers:",
      ],
      list: [
        "Authentication and identity providers.",
        "Voice, speech and conversational AI providers.",
        "Real-time audio and video infrastructure providers.",
        "Avatar and video rendering providers.",
        "Telephony providers, for phone calls you ask us to place.",
        "AI model providers, for evaluating transcripts and generating reports.",
        "Cloud hosting, storage and background processing providers.",
        "Billing and usage metering providers.",
        "Tools you choose to connect (for example email or calendar), only when a persona uses them during your call.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing and workshops",
      body: [
        "Personas and attempts are private by default. If you share one with a link or PIN, or add it to a workshop, the people with access can see the content you shared, which can include transcripts and recordings. Workshop administrators can see attempts made inside their workshop.",
        "Demo personas on our public pages may be tried without an account. Demo attempts can be viewed by the team that runs the demo.",
      ],
    },
    {
      id: "recording-consent",
      title: "Recording and consent",
      body: [
        "Calls are recorded and transcribed so we can give you a report. You must have the right to record any conversation you start, including phone calls to other people. If you use Conversim to call someone, you are responsible for telling them and getting any consent the law requires.",
      ],
    },
    {
      id: "retention",
      title: "Retention",
      body: [
        "We keep your account data while your account is active. Call recordings, transcripts and reports are kept until you delete them or close your account, after which we delete or anonymise them within a reasonable period, except where the law requires us to keep records (for example billing records).",
      ],
    },
    {
      id: "your-rights",
      title: "Your choices and rights",
      body: [
        `You can access, correct or delete your data from your account, or by emailing ${CONTACT_EMAIL}. Depending on where you live, you may also have the right to object to or restrict processing, to receive a portable copy of your data, and to complain to your local data protection authority.`,
        "You can disconnect any integration from your settings at any time.",
      ],
    },
    {
      id: "security",
      title: "Security",
      body: [
        "We authenticate every request on our servers, and data is encrypted in transit. No system is perfectly secure, so please use a strong password and tell us right away if you suspect misuse of your account.",
      ],
    },
    {
      id: "international",
      title: "International transfers",
      body: [
        "Conversim and its providers operate in several countries. Where we transfer personal data across borders, we rely on appropriate safeguards such as standard contractual clauses.",
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "Conversim is for people aged 18 and over. We do not knowingly collect data from children. If you believe a child has given us data, contact us and we will delete it.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "We may update this policy as the product changes. If a change is material we will notify you in the app or by email before it takes effect.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [`Questions about privacy? Email ${CONTACT_EMAIL}.`],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms of Service",
  summary:
    "These terms govern your use of Conversim. By creating an account or using the service you agree to them.",
  sections: [
    {
      id: "the-service",
      title: "The service",
      body: [
        "Conversim is a platform for practising conversations with AI personas over voice, avatar video or phone, and for receiving scored feedback. We may add, change or remove features over time.",
      ],
    },
    {
      id: "your-account",
      title: "Your account",
      body: [
        "You must be at least 18 and able to form a binding contract. Give us accurate information, keep your credentials secure, and tell us if you think your account has been compromised. You are responsible for activity under your account.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      body: ["You agree not to:"],
      list: [
        "Use Conversim to harass, deceive, defraud or impersonate a real person.",
        "Record or call anyone without the consent the law requires.",
        "Upload unlawful, infringing or harmful content, or content you have no right to use.",
        "Probe, overload or bypass the security, rate limits or billing of the service.",
        "Reverse engineer the service or use its output to build a competing product.",
        "Use the service for emergency communication or for decisions that need professional judgment.",
      ],
    },
    {
      id: "ai-output",
      title: "AI output",
      body: [
        "Personas, replies, scores and reports are generated by AI and may be inaccurate, incomplete or inappropriate. They are practice and coaching tools, not legal, medical, financial or compliance advice. You are responsible for how you use them.",
      ],
    },
    {
      id: "your-content",
      title: "Your content",
      body: [
        "You keep ownership of the personas, materials and recordings you create. You give us a limited licence to host, process and display them solely to operate Conversim for you, including sharing them where you choose to share. You confirm you have the rights needed to do so.",
      ],
    },
    {
      id: "integrations",
      title: "Third-party integrations",
      body: [
        "If you connect third-party tools such as email or calendar, you authorise a persona to act through them during your calls, including sending email or creating events on your behalf. You are responsible for those actions and for the third-party terms that apply.",
      ],
    },
    {
      id: "plans-billing",
      title: "Plans and billing",
      body: [
        "Paid plans are billed in advance through our billing provider and include usage limits. Usage from a shared persona is counted against the plan of the workshop's owner. Fees are non-refundable except where the law requires, and you can cancel at any time to stop future charges. We will give notice before changing prices.",
      ],
    },
    {
      id: "our-rights",
      title: "Our intellectual property",
      body: [
        "Conversim, including its software, design and branding, belongs to us and our licensors. These terms do not give you any rights in it beyond using the service as intended.",
      ],
    },
    {
      id: "suspension",
      title: "Suspension and termination",
      body: [
        "You can stop using Conversim and delete your account at any time. We may suspend or end access if you break these terms, put the service or others at risk, or if required by law. Sections that should survive termination, such as ownership, disclaimers and liability, will survive.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      body: [
        'The service is provided "as is" and "as available". To the fullest extent the law allows, we disclaim all warranties, including fitness for a particular purpose, and we do not promise the service will be uninterrupted or error free.',
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: [
        "To the fullest extent the law allows, Conversim is not liable for indirect, incidental or consequential damages, or for lost profits or data. Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim. Nothing here limits liability that cannot be limited by law.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      body: [
        "These terms are governed by the laws of the jurisdiction in which Conversim is established, and disputes will be handled by the courts there, unless mandatory consumer law in your country says otherwise.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "We may update these terms. If a change is material we will tell you in advance. Continuing to use Conversim after the change means you accept the new terms.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [`Questions about these terms? Email ${CONTACT_EMAIL}.`],
    },
  ],
};
