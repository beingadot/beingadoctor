export const WA_NUM = "917564024877";
export const PHONE_DISPLAY = "+91 75640 24877";
export const PHONE_LINK = "+917564024877";
export const EMAIL = "beingadot@gmail.com";
export const wa = (t: string) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(t)}`;
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export interface Segment { t: string; hl?: boolean }

/* ---- doctors + their Reels ----
   Ordered by strength of content: the first is the main Hero video,
   the second is the swap video, the rest follow in the Formats section.
   Video files live in /public/video/ (see public/video/README.txt). */
export interface Doctor {
  id: string;
  name: string;
  spec: string; // shown next to the name
  role: string; // short label, e.g. for the Google-profile mockup
  video: string;
  grad: string; // shows behind the video while it loads
  lines: string[]; // what the doctor says, used for the synced captions
  cap: Segment[]; // short headline caption
  format: string;
}
export type HeroDoc = Doctor;

export const DOCTORS: Doctor[] = [
  {
    id: "desai",
    name: "Dr. Siddharth Desai",
    spec: "Cardiology & General Medicine",
    role: "Cardiologist",
    video: "video/reel-4.mp4",
    grad: "linear-gradient(210deg,#0f2e7e,#0b1a4a)",
    lines: [
      "Kya har chest pain heart attack hota hai?",
      "Zaroori nahi!",
      "Lekin achanak seene mein dard ho, toh ignore mat kijiye.",
      "Turant medical help lijiye.",
    ],
    cap: [{ t: "⠀ " }, { t: "⠀ ", hl: true }, { t: " ⠀ " }],
    format: "Myth vs fact",
  },
  {
    id: "sharma-gyn",
    name: "Dr. Ananya Sharma",
    spec: "Gynecology",
    role: "Gynecologist",
    video: "video/reel-2.mp4",
    grad: "linear-gradient(210deg,#0f6b4f,#06281f)",
    lines: [
      "Periods baar-baar irregular ho rahe hain?",
      "Ise normal samajhkar ignore mat kijiye!",
      "Yeh hormonal imbalance ya PCOS ka sanket ho sakta hai.",
      "Samay par checkup zaroor karayein.",
    ],
    cap: [{ t: "Periods baar-baar " }, { t: "IRREGULAR", hl: true }, { t: " ho rahe hain?" }],
    format: "Patient questions",
  },
  {
    id: "sharma-dental",
    name: "Dr. Ananya Sharma",
    spec: "Dentistry",
    role: "Dentist",
    video: "video/reel-3.mp4",
    grad: "linear-gradient(210deg,#0f2e7e,#131a3d)",
    lines: [
      "Brush karte waqt masudon se khoon aata hai?",
      "Ise normal samajhkar ignore mat kijiye!",
      "Ye gum disease ka sanket ho sakta hai.",
      "Dentist se checkup zaroor karayein.",
    ],
    cap: [{ t: "Masudon se " }, { t: "KHOON", hl: true }, { t: " aata hai?" }],
    format: "Warning signs",
  },
  {
    id: "joshi",
    name: "Dr. Vikram Joshi",
    spec: "Homeopathy",
    role: "Homeopath",
    video: "video/reel-1.mp4",
    grad: "linear-gradient(210deg,#a35a10,#2a1604)",
    lines: [
      "Baar-baar wahi pareshani ho rahi hai?",
      "Sirf lakshan nahi, uski wajah samajhna bhi zaroori hai.",
      "Homeopathy mein hum aapki poori health history ko samajhkar treatment plan banate hain.",
    ],
    cap: [{ t: "Baar-baar " }, { t: "WAHI PARESHANI", hl: true }, { t: " ho rahi hai?" }],
    format: "Treatment approach",
  },
];

export const HERO_A: HeroDoc = DOCTORS[0];
export const HERO_B: HeroDoc = DOCTORS[1];

export const SPECIALTIES = [
  "Gynaecologists", "Dermatologists", "Physicians", "General surgeons", "Dentists",
  "Orthopaedic doctors", "Paediatricians", "Diabetologists", "Cardiologists",
  "Eye specialists", "Physiotherapists", "Neurologists", "ENT specialists", "Psychiatrists",
];

export const FORMATS = [
  { no: "01", title: "Myth vs fact", desc: "A common belief, checked and corrected in plain language.", doc: DOCTORS[0] },
  { no: "02", title: "Answers to common patient questions", desc: "The questions you hear most, answered once, clearly.", doc: DOCTORS[1] },
  { no: "03", title: "Warning signs not to ignore", desc: "Early symptoms patients brush off, and when to see a doctor.", doc: DOCTORS[2] },
  { no: "04", title: "Your treatment approach, explained", desc: "How you treat, in your own words, so patients know what to expect.", doc: DOCTORS[3] },
];

export const INCLUDES = ["Content strategy", "Scripting", "AI cloning", "Editing", "Posting"];

export interface Plan { name: string; reels: number; price: number; was: number; ai: number; pop?: boolean }
export const PLANS: Plan[] = [
  { name: "STARTER", reels: 10, price: 15000, was: 19500, ai: 4000 },
  { name: "GROWTH", reels: 15, price: 20000, was: 26000, ai: 6000, pop: true },
  { name: "PRO", reels: 30, price: 25000, was: 32500, ai: 9000 },
];

export interface Service { title: string; blurb: string; price: string; note: string; items: string[]; key: string; icon: "map" | "ad" | "web" }
export const SERVICES: Service[] = [
  {
    title: "Google Business Profile",
    blurb: "We set up and manage your Google listing so nearby patients find and trust you.",
    price: "₹10,000", note: "/month · Optimisation + management",
    items: [
      "Complete profile setup and verification support",
      "Categories, services and description optimised",
      "Clinic photos and video uploads",
      "Regular Google posts and updates",
      "Replies to every patient review",
      "Review request QR code for your clinic",
      "Questions & answers managed",
      "Accurate timings, holidays and contact details",
      "Spam edits and wrong info monitored",
      "Monthly report: calls, directions and views",
    ],
    key: "a Google Business Profile", icon: "map",
  },
  {
    title: "Meta & Google Ads",
    blurb: "Ads on Instagram, Facebook and Google that reach people near you looking for your specialty.",
    price: "From ₹20,000", note: "/month · Ad spend separate, paid directly to Meta/Google",
    items: [
      "Ads on Instagram, Facebook and Google",
      "Reach people near you looking for your specialty",
      "Complete campaign setup and creatives",
      "Precise location targeting",
      "Daily monitoring and optimisation",
      "Monthly reports you can actually read",
    ],
    key: "ads", icon: "ad",
  },
  {
    title: "Clinic Website",
    blurb: "A fast, mobile-friendly website, so visitors become appointments.",
    price: "From ₹15,000", note: "Final price based on your requirements",
    items: [
      "Fast, mobile-friendly single or multi-page site",
      "Your profile, services and credentials",
      "Location and directions built in",
      "One-tap call and WhatsApp buttons",
      "Built so visitors become appointments",
    ],
    key: "a website", icon: "web",
  },
];

/* Facts about the service itself, not customer metrics. */
export const STATS: { c: number; prefix?: string; suffix?: string; top: string; label: string }[] = [
  { c: 15000, prefix: "₹", top: "Starter package", label: "per month, plus the AI software line item" },
  { c: 10, top: "\u00A0", label: "Reels per month on Starter, all approved by you" },
  { c: 30, suffix: " min", top: "\u00A0", label: "of your time each month: one call, one recording, approvals" },
];

/* ---- WhatsApp chat screenshots (unique per doctor) ---- */
export interface WaChatMsg { from: "b" | "d"; text: string; time: string; hl?: boolean }
export interface WaChat {
  title: string; // e.g. "Beingadot × Dr. Ankit Gupta"
  docName: string;
  messages: WaChatMsg[];
  caption: string; // line below the phone
}
/* Sample threads for layout only. Replace with real, permissioned chats. */
export const WA_CHATS: WaChat[] = [
  {
    title: "Beingadot x Dr. Ankit Gupta",
    docName: "Dr. Ankit Gupta",
    messages: [
      { from: "b", text: "Sir updated video bhej diya hai, voice ek baar check kar lena", time: "9:47 AM" },
      { from: "d", text: "Abhi dekha", time: "9:47 AM" },
      { from: "d", text: "Haan, is tone me theek hai", time: "9:48 AM" },
      { from: "b", text: "Ji sir, isi tone me next videos bhi banayein?", time: "9:48 AM" },
      { from: "d", text: "Yes, isi me rakhein", time: "9:49 AM" },
      { from: "d", text: "Isi ko final maan lete hain", time: "9:49 AM", hl: true },
      { from: "b", text: "Theek hai sir, post kar diya", time: "9:50 AM" },
    ],
    caption: "Dr. Ankit Gupta, sample approval thread",
  },
  {
    title: "Beingadot x Dr. Priya Verma",
    docName: "Dr. Priya Verma",
    messages: [
      { from: "b", text: "Mam dono versions bhej diye hain. Ek baar dekh kar bata dijiye kaunsa behtar hai", time: "9:58 AM" },
      { from: "d", text: "2nd one", time: "9:58 AM" },
      { from: "d", text: "Voice and expressions dono natural lag rahe hain", time: "9:59 AM", hl: true },
      { from: "b", text: "Thank you mam. 2nd wala post kar dein?", time: "9:59 AM" },
      { from: "d", text: "Yes, go ahead", time: "10:01 AM" },
      { from: "d", text: "Cover me clinic ka naam chhota rakhna", time: "10:01 AM" },
      { from: "b", text: "Ji mam, updated cover ke saath bhejta hu", time: "10:02 AM" },
    ],
    caption: "Dr. Priya Verma, sample approval thread",
  },
  {
    title: "Beingadot x Dr. Praveen Agarwal",
    docName: "Dr. Praveen Agarwal",
    messages: [
      { from: "d", text: "Clinic ka address bhi daal dena last me", time: "9:20 AM" },
      { from: "b", text: "Ji sir, add kar diya hai", time: "9:20 AM" },
      { from: "d", text: "Baki sahi hai", time: "9:21 AM" },
      { from: "b", text: "Pauses aur speed bhi aapke hisab se rakhi hai", time: "9:21 AM" },
      { from: "d", text: "Lag nahi raha ki record nahi kiya", time: "9:21 AM", hl: true },
      { from: "b", text: "Thank you sir. Address wala version bhejta hu", time: "9:22 AM" },
    ],
    caption: "Dr. Praveen Agarwal, sample approval thread",
  },
];

/* Approval checkpoints. These describe our workflow, not customer testimonials. */
export const APPROVAL_STEPS = [
  { t: "Plan", d: "Topics and the script are agreed with you on the monthly call." },
  { t: "Record", d: "One short recording from you: your face, your voice." },
  { t: "Draft", d: "The finished Reel reaches you on WhatsApp for review." },
  { t: "Change", d: "Tell us what to fix. We redo it before anything goes live." },
  { t: "Post", d: "One tap from you, then it is published." },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Will it really look and sound like me?",
    a: "It's built from your own recording, so it uses your face and your voice. We send you every video on WhatsApp, and only what you say yes to goes live. If something doesn't feel like you, tell us and we'll change it before it's posted.",
  },
  {
    q: "Who chooses the topics and writes the scripts?",
    a: "We plan topics with you on a monthly call and write the scripts in simple language your patients understand. You review everything before anything is posted.",
  },
  {
    q: "How much of my time does this take?",
    a: "Less than 30 minutes a month: one call, one recording, and one-tap approvals on WhatsApp. That's the whole ask.",
  },
  {
    q: "Is this allowed for doctors?",
    a: "We keep content educational and avoid exaggerated claims or treatment testimonials. Please also check the latest advertising guidelines of your medical council, and we will align the content plan with them.",
  },
  {
    q: "What happens to my recordings and AI clone?",
    a: "They are used only to make your Reels, never shared or reused elsewhere. If you ever stop, we delete your clone and source recordings on request.",
  },
  {
    q: "What does it cost?",
    a: "Reel packages start at ₹15,000/month plus the AI software that powers your clone. Google profile, ads and websites are priced separately, or ask us for a custom bundle on a call.",
  },
];

export const POST_DAYS = [1, 3, 5, 7, 9, 12, 14, 16, 19, 21, 23, 26, 28, 30];

export const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#reels", label: "Reels" },
  { href: "#pricing", label: "Pricing" },
  { href: "#results", label: "Results" },
  { href: "#faq", label: "FAQ" },
];

/* ---- 8-step pipeline for "How it works" column 02 ---- */
export interface PipeStep {
  label: string;
  icon: string; // emoji/symbol
  detail: string;
}
export const PIPE_8: PipeStep[] = [
  { label: "Strategy", icon: "plan", detail: "Chest pain: myth vs fact" },
  { label: "Script", icon: "script", detail: "Simple Hinglish script" },
  { label: "Face clone", icon: "face", detail: "Face cloned" },
  { label: "Voice clone", icon: "voice", detail: "Voice cloned" },
  { label: "Captions", icon: "captions", detail: "Hinglish captions added" },
  { label: "Edit", icon: "edit", detail: "Cuts and effects" },
  { label: "You approve", icon: "approve", detail: "Yes, post it" },
  { label: "Posted", icon: "posted", detail: "Live on Instagram" },
];

export const INTERESTS = ["AI Reels", "Google Business Profile", "Meta & Google Ads", "Clinic Website"];
