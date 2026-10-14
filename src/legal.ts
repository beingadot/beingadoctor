export interface PolicySection {
  h: string;
  p: string[];
  list?: string[];
}

export interface Policy {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
}

export const PRIVACY: Policy = {
  slug: "privacy",
  title: "Privacy Policy",
  updated: "October 2026",
  intro:
    "This policy explains what information Beingadot collects when you contact us, why we collect it, and how to ask us to delete it. We collect only what we need to reply to you and deliver the service.",
  sections: [
    {
      h: "What we collect",
      p: ["When you submit the enquiry form, we collect:"],
      list: [
        "Your name",
        "Your phone or WhatsApp number",
        "Your medical specialty (so we can plan relevant content)",
        "The services you are interested in",
        "Anything you choose to write in the message box",
      ],
    },
    {
      h: "What we do not collect",
      p: [
        "We do not ask for your date of birth, address, patient details, medical records, payment card details or any patient information. Never put patient names or records in our form or in WhatsApp.",
        "The form has no tracking, no profiling and no advertising pixels. We do not buy or sell contact data.",
      ],
    },
    {
      h: "Why we use it",
      p: [
        "Only to reply to your enquiry, prepare a plan for your clinic, and send you the quote you asked for. We do not add you to a marketing mailing list. If we ever send newsletters, every email will include an unsubscribe link.",
      ],
    },
    {
      h: "Where it goes",
      p: [
        "Pressing Send on WhatsApp opens your own WhatsApp app with the message ready. The message travels through Meta's WhatsApp service under Meta's terms.",
        "Pressing the email option opens your own email app. Your message travels through your email provider and ours (Gmail).",
        "We do not run our own database of leads beyond what you see in those messages.",
      ],
    },
    {
      h: "Third-party services on this site",
      p: ["This website loads a small number of outside resources:"],
      list: [
        "Google Fonts (Inter, Outfit) served from fonts.gstatic.com, which receives your IP address as with any web request",
        "WhatsApp (wa.me) only when you tap a WhatsApp button",
        "No analytics, no advertising SDKs, no session replay, no chat widgets",
      ],
    },
    {
      h: "Children",
      p: [
        "Our service is offered to medical professionals and clinic owners aged 18 and above. We do not knowingly collect personal information from anyone under 18. If you believe a minor has sent us information, write to us and we will delete it.",
      ],
    },
    {
      h: "How long we keep it",
      p: [
        "Enquiry details are kept only as long as needed to handle your request and any active engagement. If you do not become a client, ask us and we will delete your message.",
      ],
    },
    {
      h: "Your rights",
      p: [
        "You can ask for a copy of your data, a correction, or complete deletion at any time. We respond within 7 working days.",
      ],
      list: [
        "Data deletion request: email beingadot@gmail.com with the subject 'Data deletion request' and the phone number you used",
        "Or tap Request my data in the contact section of this site",
      ],
    },
    {
      h: "Contact",
      p: ["Beingadot · Email: beingadot@gmail.com · Phone and WhatsApp: +91 75640 24877."],
    },
  ],
};

export const TERMS: Policy = {
  slug: "terms",
  title: "Terms of Service",
  updated: "October 2026",
  intro:
    "These terms govern the services Beingadot provides to doctors and clinics. By booking a call or confirming a package in writing, you agree to them.",
  sections: [
    {
      h: "Our services",
      p: [
        "We produce short-form video content using an approved recording of your face and voice, manage your social posting, manage your Google Business Profile, run Meta and Google advertising, and build clinic websites. The exact scope for your clinic is confirmed in writing before work starts.",
      ],
    },
    {
      h: "Prices and billing",
      p: [
        "Every price on this site is shown upfront. There are no setup surprises and no charges you were not told about in writing before work began.",
      ],
      list: [
        "Package price: the monthly service fee shown on the package card",
        "AI software: a separate monthly line item, shown separately on every package card",
        "Advertising spend: paid by you directly to Meta and Google. We never mark it up and it is not part of our fee",
        "Taxes, if applicable, are stated on the quote before you pay",
        "No hidden fees: if any extra cost appears, we ask in writing first",
      ],
    },
    {
      h: "Your approvals",
      p: [
        "You approve each Reel on WhatsApp before it is published. Nothing is posted without your yes. You are responsible for confirming that clinical statements in the approved script are accurate.",
      ],
    },
    {
      h: "Your content and AI use",
      p: [
        "The recording you send stays yours. We use it only to make content for your own channels, for the duration of the engagement. Content is produced with AI assistance, with your knowledge and approval. On request we can label AI-assisted content on your posts.",
        "You must follow the advertising guidelines of your medical council. We avoid treatment guarantees, patient testimonials for treatments, and exaggerated claims.",
      ],
    },
    {
      h: "Cancelling",
      p: [
        "Packages run monthly. Cancel any time before the next cycle and the service stops at the end of the paid period. Deliverables already approved and posted remain live unless you ask us to take them down.",
      ],
    },
    {
      h: "Results",
      p: [
        "We do not promise a specific number of patients, views, or revenue. Search ranking, ad performance and social reach depend on many factors outside anyone's control. We report what actually happened each month.",
      ],
    },
    {
      h: "Liability",
      p: [
        "To the extent the law allows, our liability is limited to the fee you paid us in the month in which the issue arose. We are not responsible for indirect or consequential losses.",
      ],
    },
    {
      h: "Governing law",
      p: ["These terms are governed by the laws of India. Disputes are subject to the courts where Beingadot operates."],
    },
    {
      h: "Contact",
      p: ["Beingadot · Email: beingadot@gmail.com · Phone and WhatsApp: +91 75640 24877."],
    },
  ],
};

export const REFUNDS: Policy = {
  slug: "refunds",
  title: "Refund Policy",
  updated: "October 2026",
  intro:
    "Plain and simple: you pay for work delivered, not for work promised. Here is exactly how refunds work.",
  sections: [
    {
      h: "Before we start",
      p: ["If you pay and we have not started work (no call held, no recording received, no content produced), you get a full refund of the service fee."],
    },
    {
      h: "Mid-cycle cancellation",
      p: [
        "If part of the month's Reels have been delivered, you pay only for the Reels delivered so far. The balance is refunded.",
        "If all Reels for the cycle are delivered and approved, no refund is due for that cycle.",
      ],
    },
    {
      h: "AI software fee",
      p: [
        "The AI software line item is billed separately and is shown before you pay. If we have not used it to produce anything for you, it is refunded with the service fee.",
      ],
    },
    {
      h: "Advertising spend",
      p: ["Ad spend is paid by you directly to Meta and Google. It is not refundable by us. Any unused balance stays in your ad account."],
    },
    {
      h: "Websites and one-time projects",
      p: [
        "For one-time work such as a clinic website, a deposit may be retained if work has begun, proportional to the work completed. The balance is refunded.",
      ],
    },
    {
      h: "How to request",
      p: [
        "Email beingadot@gmail.com with the subject 'Refund request', your phone number and your package. Approved refunds are returned to the original payment method within 7 to 10 working days.",
      ],
    },
    {
      h: "Something went wrong?",
      p: ["If a Reel was posted without your approval, or work was not delivered as agreed, tell us immediately. We make it right, and a refund is always available in that case."],
    },
  ],
};

export const COOKIES: Policy = {
  slug: "cookies",
  title: "Cookie Policy",
  updated: "October 2026",
  intro:
    "This site is deliberately light on cookies. Here is the complete list of what is stored in your browser and what third parties can see.",
  sections: [
    {
    h: "What this site stores",
    p: ["That is the whole list. No tracking cookies, no advertising cookies, no analytics cookies."],
    list: [
      "bead-consent: remembers whether you accepted or declined, so we do not ask again (12 months, stored in your browser only)",
    ],
    },
    {
      h: "What third parties can see",
      p: ["We load no analytics or advertising scripts, so no third party sets cookies through this site. Two outside services are contacted:"],
      list: [
        "Google Fonts: your browser requests the font files from Google, which receives your IP address",
        "WhatsApp: only when you tap a WhatsApp button, you leave for wa.me and Meta's cookie policy applies",
      ],
    },
    {
      h: "How to control this",
      p: [
        "You can clear stored preferences at any time from your browser settings, or use private browsing. Declining on the banner changes nothing about how the site works.",
      ],
    },
    {
      h: "Contact",
      p: ["Questions about cookies or data: beingadot@gmail.com or +91 75640 24877."],
    },
  ],
};

export const POLICIES: Policy[] = [PRIVACY, TERMS, REFUNDS, COOKIES];

export const NAV_LEGAL = [
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "terms", label: "Terms of Service" },
  { slug: "refunds", label: "Refund Policy" },
  { slug: "cookies", label: "Cookie Policy" },
];
