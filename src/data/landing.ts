import type { ElementType } from "react";
import {
  Activity,
  Building2,
  Globe,
  Headphones,
  Hotel,
  PawPrint,
  Server,
  Sparkles,
  Stethoscope,
  Target,
  Phone,
  Wrench,
  Zap,
  ShieldCheck,
  Workflow,
  Mic,
} from "lucide-react";

export type UseCaseTab = "Front Desk" | "Lead Follow-Up" | "Support Line";

export const heroConversationByLanguage = {
  EN: [
    { who: "caller", text: "Hello, can I book an appointment for tomorrow evening?" },
    { who: "khyra", text: "Sure. Dr. Mehta has a 6:30 PM slot available — should I confirm?" },
    { who: "caller", text: "Yes, please confirm." },
    { who: "khyra", text: "Done. Confirmation SMS has been sent. Anything else I can help with?" },
  ],
  KN: [
    { who: "caller", text: "ನಮಸ್ಕಾರ, ನಾನು ನಾಳೆ ಸಂಜೆ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಬಹುದೆ?" },
    { who: "khyra", text: "ಖಂಡಿತ. ಡಾ. ಮೆಹ್ತಾಗೆ ನಾಳೆ 6:30 PM ಗೆ ಸ್ಲಾಟ್ ಲಭ್ಯವಿದೆ — ದೃಢೀಕರಿಸಬೇಕಾ?" },
    { who: "caller", text: "ಹೌದು, ದಯವಿಟ್ಟು ದೃಢೀಕರಿಸಿ." },
    { who: "khyra", text: "ಸರಿಯಾಗಿದೆ. ದೃಢೀಕರಣ SMS ಕಳುಹಿಸಲಾಗಿದೆ. ಇನ್ನೇನು ಸಹಾಯ ಬೇಕೇ?" },
  ],
  HN: [
    { who: "caller", text: "नमस्ते, क्या मैं कल शाम का appointment book कर सकती हूँ?" },
    { who: "khyra", text: "बिल्कुल। Dr. Mehta के साथ कल 6:30 PM का slot available है — confirm कर दूँ?" },
    { who: "caller", text: "Haan, please confirm." },
    { who: "khyra", text: "Done. Confirmation SMS भेज दिया है. कुछ और मदद चाहिए?" },
  ],
} as const;

export const heroConversation = heroConversationByLanguage.HN;

export const trustIndustries = [
  { Icon: Stethoscope as ElementType, label: "Healthcare" },
  { Icon: Hotel as ElementType, label: "Hospitality" },
  { Icon: Building2 as ElementType, label: "Real Estate" },
  { Icon: Server as ElementType, label: "IT Services" },
  { Icon: Sparkles as ElementType, label: "Wellness" },
  { Icon: PawPrint as ElementType, label: "Veterinary" },
] as const;

export const trustStats = [
  { value: "11+", label: "Indian languages" },
  { value: "1200ms", label: "Avg response latency" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24×7", label: "No breaks. No sick days." },
] as const;

export const pillars = [
  {
    Icon: Phone as ElementType,
    title: "Front Desk Agent",
    description: "Answers calls, books appointments, handles cancellations — around the clock.",
    tab: "Front Desk" as const,
  },
  {
    Icon: Target as ElementType,
    title: "Lead Follow-Up Agent",
    description: "Calls back warm leads, qualifies prospects, and schedules meetings automatically.",
    tab: "Lead Follow-Up" as const,
  },
  {
    Icon: Wrench as ElementType,
    title: "Support Line Agent",
    description: "Resolves Tier-1 support tickets, resets access, and escalates intelligently.",
    tab: "Support Line" as const,
  },
] as const;

export const howItWorksSteps = [
  {
    number: "01",
    title: "Book a demo with us",
    description:
      "We walk you through a personalised demo tailored to your use case and answer your questions.",
  },
  {
    number: "02",
    title: "We set up your systems",
    description:
      "Our experts collect your credentials and configure everything — telephony, calendars, CRM — for you.",
  },
  {
    number: "03",
    title: "Go live",
    description: "Khyra starts answering calls immediately. Monitor every conversation in real time.",
  },
] as const;

export const featureCards = [
  {
    Icon: Globe as ElementType,
    title: "11 Indian languages",
    description:
      "Hindi, English, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi, Odia.",
  },
  {
    Icon: Zap as ElementType,
    title: "Sub-second latency",
    description: "Groq-powered LPU inference delivers end-to-end voice response under 800ms.",
  },
  {
    Icon: Headphones as ElementType,
    title: "Natural voice personas",
    description: "Multiple male and female voices, tuned for Indian accents.",
  },
  {
    Icon: Activity as ElementType,
    title: "Context-aware",
    description: "Remembers earlier turns in the call and responds intelligently.",
  },
  {
    Icon: Mic as ElementType,
    title: "Live interruptions",
    description: "Callers can talk over the agent; it adapts in real time like a human.",
  },
  {
    Icon: Workflow as ElementType,
    title: "Domain intelligence",
    description: "Pre-trained on 15+ verticals — not a generic chatbot you retrain.",
  },
  {
    Icon: ShieldCheck as ElementType,
    title: "India data residency",
    description: "Hosted in India. Encrypted at rest and in transit. RBAC throughout.",
  },
  {
    Icon: Phone as ElementType,
    title: "Telephony agnostic",
    description: "Works with your existing number via SIP / WebSocket bridge.",
  },
] as const;

export const useCases: Record<UseCaseTab, readonly [string, string][]> = {
  "Front Desk": [
    ["Dental clinic", "Booking, rescheduling, FAQ on procedures and timings."],
    ["Veterinary", "Pet appointments, emergency triage routing, vaccination reminders."],
    ["Spa & salon", "Bookings, pricing queries, real-time slot availability."],
    ["Hotel & resort", "Reservations, room queries, check-in / check-out info."],
    ["Therapist & wellness", "Empathetic intake calls with full privacy."],
    ["Cosmetic clinic", "Consultation bookings, procedure FAQs, follow-ups."],
  ],
  "Lead Follow-Up": [
    ["Real estate", "Follow up on enquiries, qualify buyers, schedule site visits."],
    ["IT services", "Follow up RFQs, qualify scope, route to sales engineers."],
    ["Voice AI agency", "Pitch solutions, qualify prospects, book discovery calls."],
  ],
  "Support Line": [
    ["DevOps & infra", "Tier-1 incident intake, basic runbooks, on-call escalation."],
    ["Access management", "Password resets, account unlocks, 2FA issues — resolved."],
    ["SaaS support", "Answer FAQs, guide users, raise tickets for Tier-2."],
  ],
};

export const impactStats = [
  { value: "40%", label: "Reduction in front desk staffing costs" },
  { value: "1200ms", label: "End-to-end voice latency" },
  { value: "11", label: "Indian languages supported" },
  { value: "99.9%", label: "Production uptime SLA" },
  { value: "15+", label: "Verticals out of the box" },
  { value: "20", label: "Concurrent calls per deployment" },
] as const;

export const faqItems = [
  {
    question: "How long does it take to go live?",
    answer:
      "Most customers are live within 24–48 hours. Complex enterprise integrations may take up to a week.",
  },
  {
    question: "Which languages does Khyra support?",
    answer:
      "English, Hindi, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi and Odia — with more on the way.",
  },
  {
    question: "Do I need to train the AI on my business data?",
    answer:
      "No. Agents come pre-trained on your industry vertical. You provide basic config and Khyra handles the rest.",
  },
  {
    question: "Can I keep my existing phone number?",
    answer: "Yes. Khyra works with your existing DID via a SIP bridge. No porting required.",
  },
  {
    question: "What happens when the AI can't handle a call?",
    answer:
      "It gracefully escalates to a human, sends a summary transcript, and routes the caller appropriately.",
  },
  {
    question: "Is my call data stored in India?",
    answer: "Yes. All data is stored on Indian cloud infrastructure, encrypted at rest and in transit.",
  },
  {
    question: "Do you integrate with our CRM / calendar / helpdesk?",
    answer: "Webhook-based integration with any system, plus native connectors on the roadmap.",
  },
  {
    question: "What telephony providers do you support?",
    answer: "Vobiz today, plus any SIP-compatible provider. WebRTC supported for demo and internal use.",
  },
] as const;

export const demoFields = [
  { label: "Agent role", value: "Front Desk" },
  { label: "Industry", value: "Dental Clinic" },
  { label: "Language", value: "Hindi" },
  { label: "Voice", value: "Meera · Female" },
] as const;

export const pricingTiers = [
  {
    name: "Starter",
    description: "Solo practitioners and small clinics.",
    features: ["1 agent", "1 language", "500 minutes / month", "Email support"],
  },
  {
    name: "Growth",
    description: "SMBs and multi-location businesses.",
    features: ["3 agents", "5 languages", "3,000 minutes / month", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    description: "Large teams and custom deployments.",
    features: ["Unlimited agents", "All 11 languages", "Custom volume", "Dedicated SLA + on-prem"],
  },
] as const;

export const testimonials = [
  {
    quote:
      "We went from missing 40% of after-hours calls to zero overnight. Booking rate is up 30% in month one.",
    author: "Dr. Priya S.",
    role: "Dental Clinic Owner, Bengaluru",
  },
  {
    quote:
      "Our sales team was spending 3 hours a day on follow-ups. Khyra does that now. They focus on closing.",
    author: "Rohan M.",
    role: "Founder, PropTech Startup, Hyderabad",
  },
  {
    quote:
      "The Kannada support was the deciding factor. Our patients speak Kannada first. No other tool could do that.",
    author: "Operations Manager",
    role: "Multi-specialty Hospital, Mysuru",
  },
] as const;

export const whyKhyraItems = [
  {
    title: "India-first, not afterthought",
    description:
      "Built from day one for Indian accents, languages and workflows. Powered by Sarvam AI's STT/TTS.",
  },
  {
    title: "Deploy in hours, not months",
    description:
      "Agents come pre-trained on your vertical. No data labelling. No six-month pilot.",
  },
  {
    title: "The full stack, not just an API",
    description:
      "Voice, brain, telephony, integrations and observability — one vendor, one contract.",
  },
  {
    title: "Priced for the Indian market",
    description:
      "INR pricing in tiers that make sense for a 3-clinic chain, not just Fortune 500.",
  },
] as const;

export const comparisonColumns = [
  "Khyra AI",
  "VAPI",
  "Retell AI",
  "Telnyx",
  "Bland AI",
] as const;

export const comparisonRows = [
  {
    feature: "11 Indian languages",
    values: [true, false, false, false, false],
  },
  {
    feature: "India-specific voices",
    values: [true, false, false, false, false],
  },
  {
    feature: "15+ prebuilt verticals",
    values: [true, "Manual", "Manual", false, false],
  },
  {
    feature: "Sub-800ms latency",
    values: [true, "Varies", "Varies", "Varies", "Varies"],
  },
  {
    feature: "Front desk + sales + support",
    values: [true, "Build it", "Build it", false, "Build it"],
  },
  {
    feature: "Indian telephony",
    values: [true, false, false, "Partial", false],
  },
  {
    feature: "No-code config",
    values: [true, "Dev req.", "Partial", false, "Partial"],
  },
  {
    feature: "Data residency in India",
    values: [true, false, false, false, false],
  },
] as const;
