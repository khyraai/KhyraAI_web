// ─────────────────────────────────────────────────────────────────────────────
// industries.ts — Central data layer for all industry landing pages
// ─────────────────────────────────────────────────────────────────────────────

export interface CallFlowStep {
  title: string;
  detail: string;
}

export interface WorkflowStep {
  label: string;
  callerQ: string;
  khyraReply: string;
  actions: string[];
}

export interface IndustryMetric {
  value: string;
  label: string;
  sublabel?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ConvoAction {
  label: string;
}

export interface ConvoDemo {
  callerLine: string;
  khyraLine: string;
  actions: ConvoAction[];
}

export interface IntegrationCategory {
  category: string;
  description: string;
  examples: string[];
}

export interface SafeguardsInfo {
  summary: string;
  transferProtocol: string;
  emergencyPolicy?: string;
}

export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  accentColor: string;
  accentHex: string;
  icon: string;
  heroHeadline: string;
  heroSubhead: string;
  heroBadge: string;
  operationalRoles?: string[];
  callFlowSteps: CallFlowStep[];
  painPoints: { title: string; description: string }[];
  capabilities: { title: string; description: string }[];
  workflows: WorkflowStep[];
  convoDemo: ConvoDemo;
  integrationCategories?: IntegrationCategory[];
  safeguards?: SafeguardsInfo;
  metrics: IndustryMetric[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  liveDemo?: { roleId: string; domainId: string };
}

export const COMPACT_DEPLOYMENT_STEPS = [
  { step: "01", title: "Map the Workflow", desc: "Define intent boundaries, validation rules, and backend actions for your operations." },
  { step: "02", title: "Connect Existing Systems", desc: "Securely link your CRM, EHR, PMS, calendars, and telephony through supported APIs." },
  { step: "03", title: "Configure Business Rules", desc: "Tailor scheduling availability, provider policies, and qualification rubrics." },
  { step: "04", title: "Test & Validate", desc: "Simulate caller scenarios, noise, interruptions, and edge-case exceptions." },
  { step: "05", title: "Go Live with Safeguards", desc: "Launch live interaction handling backed by real-time monitoring and warm transfer." },
  { step: "06", title: "Monitor and Refine", desc: "Continuous observability over interaction logs, task completion, and escalation rates." },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// 1. Healthcare & Clinics
// ─────────────────────────────────────────────────────────────────────────────
const healthcare: Industry = {
  slug: "healthcare",
  name: "Healthcare & Clinics",
  shortName: "Healthcare",
  accentColor: "142 71% 45%",
  accentHex: "#22c55e",
  icon: "Stethoscope",
  heroHeadline: "Every patient call ends with the next step booked.",
  heroSubhead:
    "Khyra answers patient calls 24×7, books and reschedules appointments, handles routine questions, and escalates emergencies — so your front desk focuses on patients in front of them.",
  heroBadge: "Healthcare & Clinics",
  operationalRoles: [
    "Patient Intake & Reception",
    "Appointment Booking & Rescheduling",
    "Clinic EHR & Calendar Sync",
    "Emergency Clinical Triage Routing",
  ],
  callFlowSteps: [
    { title: "Patient calls", detail: "Arrives at the clinic, any hour of the day or night" },
    { title: "Need identified", detail: "Booking, query, or urgent triage understood in real time" },
    { title: "Calendar checked", detail: "Live slot availability queried for Dr. Lawrence" },
    { title: "Appointment confirmed", detail: "Slot locked, patient record updated" },
    { title: "Records updated", detail: "SMS sent and clinic management system synchronized" },
  ],
  painPoints: [
    {
      title: "Missed calls lead to lost patient visits",
      description:
        "Patients who can't reach your clinic on the first call often book elsewhere. Khyra answers every call instantly.",
    },
    {
      title: "Receptionists overwhelmed at peak morning hours",
      description:
        "Morning rush and lunchtime spikes leave patients waiting on hold. Khyra handles unlimited parallel calls.",
    },
    {
      title: "After-hours inquiries go unanswered",
      description:
        "Patients call evenings and weekends. Without coverage, you lose bookings. Khyra is available 24×7.",
    },
    {
      title: "Repetitive FAQ calls drain front desk time",
      description:
        "Timing, directions, procedure prep — Khyra answers these instantly without tying up your staff.",
    },
    {
      title: "Rescheduling creates calendar chaos",
      description:
        "Khyra handles reschedules and cancellations in real time, keeping your provider calendars accurate.",
    },
    {
      title: "No-show reminder calls don't happen manually",
      description:
        "Khyra automatically confirms appointments via multi-channel messages and outbound calls to reduce no-shows.",
    },
  ],
  capabilities: [
    { title: "Instant call answering", description: "Picks up on the first ring, every time — zero hold music, no missed calls." },
    { title: "Appointment booking & rescheduling", description: "Checks live calendar availability and confirms slots in real time." },
    { title: "After-hours front desk", description: "Handles patient calls around the clock, including weekends and holidays." },
    { title: "Automated reminder workflows", description: "Outbound reminder messages that reduce no-show rates." },
    { title: "Emergency clinical escalation", description: "Identifies urgent symptoms and routes calls to on-call medical staff immediately." },
    { title: "EHR & patient record updates", description: "Logs every interaction directly into your clinic management system automatically." },
  ],
  workflows: [
    {
      label: "New Patient Appointment",
      callerQ: "Hi, I'd like to book Alex Morgan for a consultation with Dr. Lawrence at Horizon Health tomorrow.",
      khyraReply: "Certainly. Dr. Lawrence has openings tomorrow at 11:00 AM and 3:30 PM at Horizon Health. Which slot works better for you?",
      actions: ["Appointment booked", "Patient record created", "SMS confirmation sent"],
    },
    {
      label: "Reschedule / Cancel",
      callerQ: "I need to move Emily Parker's consultation with Dr. Sarah Collins at Westfield Medical to Friday.",
      khyraReply: "I've pulled up Emily's file. Dr. Collins has availability on Friday at 4:00 PM at Westfield Medical. Shall I lock that in for you?",
      actions: ["Appointment rescheduled", "Calendar updated", "Confirmation SMS sent"],
    },
    {
      label: "After-Hours Clinic Query",
      callerQ: "What time does Al Noor Medical Center open tomorrow? And does Dr. Khalid Al-Rashid take walk-ins?",
      khyraReply: "Al Noor Medical Center opens at 9:00 AM. Dr. Al-Rashid accepts walk-ins before 11:00 AM, or I can pre-book a reserved slot for you right now.",
      actions: ["Question answered", "Slot offered", "Call logged"],
    },
  ],
  convoDemo: {
    callerLine: "Can I get an appointment with Dr. Lawrence at Horizon Health for tomorrow afternoon?",
    khyraLine: "Dr. Lawrence has 3:30 PM available tomorrow at Horizon Health. Should I confirm and lock that slot for you?",
    actions: [
      { label: "Appointment booked" },
      { label: "Patient record updated" },
      { label: "SMS confirmation sent" },
    ],
  },
  integrationCategories: [
    {
      category: "EHR & Clinic Management Software",
      description: "Direct two-way synchronization for patient profiles, visit timelines, doctor schedules, and treatment history.",
      examples: ["Epic", "Cerner", "Practo", "Athenahealth", "Custom REST EHRs"],
    },
    {
      category: "Provider Calendars & Scheduling",
      description: "Live slot querying across multi-doctor practices with double-booking prevention and buffer window rules.",
      examples: ["Google Calendar", "Microsoft 365 / Outlook", "Clinic Management Calendars"],
    },
    {
      category: "Telephony & VoIP Infrastructure",
      description: "Connects to your existing clinic phone numbers via SIP trunking, call forwarding, or cloud telephony bridges.",
      examples: ["Twilio SIP", "Cisco Webex", "Vonage", "Existing Clinic PBX"],
    },
    {
      category: "Patient Messaging & Notifications",
      description: "Automated SMS, WhatsApp, and email appointment confirmations, prep instructions, and clinic directions.",
      examples: ["Twilio SMS", "WhatsApp Cloud API", "SendGrid Email"],
    },
    {
      category: "Custom Webhooks & Database Connectors",
      description: "Secure REST APIs and webhooks for private hospital databases and custom clinic applications.",
      examples: ["Encrypted REST Endpoints", "OAuth 2.0 Webhooks", "PostgreSQL / MySQL"],
    },
  ],
  safeguards: {
    summary: "Every patient call is governed by strict clinical boundaries. When an inquiry requires medical diagnosis, falls outside scheduling policy, or reports urgent symptoms, Khyra warm-transfers the call to on-call staff with a real-time transcript brief.",
    transferProtocol: "Warm transfer to nurse triage or front desk with patient ID, reported symptoms, and verified caller context.",
    emergencyPolicy: "Khyra detects emergency keywords and immediately alerts on-call clinical personnel. Khyra never provides unverified clinical diagnosis or prescription advice.",
  },
  metrics: [
    { value: "35%", label: "Reduction in no-shows", sublabel: "via automated reminder workflows" },
    { value: "Instant", label: "Call pickup & triage", sublabel: "zero hold queues or busy signals" },
    { value: "3×", label: "More bookings captured", sublabel: "after-hours and peak hours" },
  ],
  faqs: [
    { question: "Can Khyra integrate with our clinic management software?", answer: "Yes. Khyra connects via secure REST APIs, webhooks, and database connectors to major clinic management platforms and EHRs. Our team handles the integration configuration." },
    { question: "What happens during a medical emergency call?", answer: "Khyra evaluates urgency keywords, captures basic details, and immediately routes the call to your on-call medical team. It does not attempt to provide clinical diagnoses or prescriptive medical advice." },
    { question: "Is patient data stored securely?", answer: "All communication is encrypted in transit via TLS 1.3 and at rest with AES-256 encryption. Khyra operates on secure cloud infrastructure with strict role-based access control (RBAC)." },
    { question: "Can it handle multiple doctors' schedules?", answer: "Yes. Khyra manages separate calendars and appointment durations for each doctor, ensuring callers are scheduled with the correct provider." },
    { question: "How long does setup take?", answer: "Standard deployments are typically live in days, configured around your clinical operating guidelines, provider schedules, and EHR systems." },
  ],
  relatedSlugs: ["professional-services", "hotels-hospitality", "real-estate"],
  liveDemo: { roleId: "support_line", domainId: "general_clinic" },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Real Estate
// ─────────────────────────────────────────────────────────────────────────────
const realEstate: Industry = {
  slug: "real-estate",
  name: "Real Estate & Property",
  shortName: "Real Estate",
  accentColor: "221 83% 40%",
  accentHex: "#1d4ed8",
  icon: "Building2",
  heroHeadline: "Never lose a property lead to a missed call.",
  heroSubhead:
    "Khyra answers buyer and tenant inquiries 24×7, qualifies budget and timeline, answers property questions, and books site visits — before competitors even return the call.",
  heroBadge: "Real Estate & Property",
  operationalRoles: [
    "Inbound Buyer & Tenant Qualification",
    "Property Specs & Availability Queries",
    "Private Viewing Tour Scheduling",
    "Salesforce & HubSpot CRM Enrichment",
  ],
  callFlowSteps: [
    { title: "Enquiry arrives", detail: "Buyer or seller calls about a property listing" },
    { title: "Lead qualified", detail: "Budget, location criteria, and purchase timeline captured" },
    { title: "Property answered", detail: "Availability, unit specs, and pricing verified" },
    { title: "Visit scheduled", detail: "Site visit booked against listing broker's calendar" },
    { title: "Broker notified", detail: "Lead summary and WhatsApp brief dispatched in real time" },
  ],
  painPoints: [
    { title: "Leads go cold within minutes of calling", description: "Buyers who enquire and don't get through quickly move to another listing. Khyra responds instantly to every inquiry." },
    { title: "Brokers cannot cover high-volume project launches", description: "During new development launches, call volumes surge. Khyra handles unlimited simultaneous buyer inquiries." },
    { title: "Weekend and evening property calls missed", description: "Most property inquiries occur outside standard office hours. Khyra captures leads 24×7." },
    { title: "Lead qualification is inconsistent across teams", description: "Khyra consistently asks structured qualification questions — budget, location, timeline, financing — every time." },
    { title: "Site visit scheduling is a slow back-and-forth", description: "Khyra checks broker availability and books private viewings on the spot, eliminating scheduling lag." },
    { title: "Follow-up calls on warm prospects don't happen", description: "Khyra automatically follows up with leads who enquired but haven't yet confirmed a viewing." },
  ],
  capabilities: [
    { title: "Instant inquiry response", description: "Answers every inbound call immediately — no prospect waits, no deal is lost." },
    { title: "BANT lead qualification", description: "Captures budget range, location preferences, purchase timeline, and financing status." },
    { title: "Private tour scheduling", description: "Checks broker availability and locks site visit appointments in real time." },
    { title: "Property FAQ answering", description: "Answers questions on pricing, square footage, amenities, HOA fees, and handover dates." },
    { title: "Automated prospect follow-up", description: "Outbound re-engagement calls to warm leads who haven't yet converted." },
    { title: "Real-time broker notification", description: "Dispatches structured buyer briefs to listing agents via WhatsApp or Slack." },
  ],
  workflows: [
    {
      label: "Property Inquiry & Specs",
      callerQ: "Is the 3-bedroom Central District penthouse still available? What is the asking price?",
      khyraReply: "Yes, it is available at $1.2M / SAR 4.5M. It is a 2,200 sq ft unit with dedicated parking. Would you like to schedule a private viewing this week?",
      actions: ["Property details provided", "Lead qualified", "Agent notified"],
    },
    {
      label: "Site Visit Booking",
      callerQ: "Can Daniel Carter visit the Austin development this Friday at 11:00 AM?",
      khyraReply: "Friday at 11:00 AM works. I've reserved the slot with our listing specialist, David Sterling, and sent Daniel's private showing pass via WhatsApp.",
      actions: ["Site visit booked", "WhatsApp pass dispatched", "Calendar updated"],
    },
    {
      label: "Lead Follow-Up & Re-engagement",
      callerQ: "(Khyra calls) Hi Faisal, following up on your inquiry regarding our Riyadh Boulevard residential units.",
      khyraReply: "We have an availability update on the 3-bedroom unit (SAR 4.5M) you reviewed. Would you like to schedule a private walkthrough this week?",
      actions: ["Lead re-engaged", "Follow-up logged", "Meeting booked"],
    },
  ],
  convoDemo: {
    callerLine: "Is the 3-bedroom Central District penthouse still available?",
    khyraLine: "Yes, available at $1.2M / SAR 4.5M. I can schedule a private viewing with our listing specialist this Friday at 11:00 AM. Shall I lock that in?",
    actions: [
      { label: "Lead scored (94/100)" },
      { label: "Salesforce CRM deal created" },
      { label: "Private tour calendar locked" },
    ],
  },
  integrationCategories: [
    {
      category: "CRM & Pipeline Management",
      description: "Automated deal creation, BANT qualification scoring, contact enrichment, and conversational transcripts.",
      examples: ["Salesforce CRM", "HubSpot", "LeadSquared", "Pipedrive", "Zoho CRM"],
    },
    {
      category: "Broker Calendars & Showing Schedules",
      description: "Direct booking against individual agent calendars with buffer times and multi-agent routing.",
      examples: ["Calendly", "Google Calendar", "Microsoft Outlook"],
    },
    {
      category: "Telephony & Campaign Tracking",
      description: "Connects to marketing campaign phone numbers and IVRs with automatic source attribution.",
      examples: ["Twilio Voice", "CallRail", "Cloud Telephony", "SIP Trunking"],
    },
    {
      category: "Messaging & Digital Passes",
      description: "Dispatches WhatsApp showing confirmations, Google Maps location pins, and building gate passes.",
      examples: ["WhatsApp Cloud API", "Twilio SMS", "Slack Broker Alerts"],
    },
    {
      category: "Property Management & MLS APIs",
      description: "Queries real-time unit availability, pricing tiers, and floor plan specifications directly.",
      examples: ["Custom MLS APIs", "Yardi", "PropertyBase", "REST Webhooks"],
    },
  ],
  safeguards: {
    summary: "When a high-value or institutional buyer is detected, or when pricing negotiations fall outside authorized parameters, Khyra initiates an immediate warm transfer to the senior listing broker with full BANT qualification notes.",
    transferProtocol: "Live call transfer with buyer profile, target budget ($1.2M+), and property criteria pre-loaded on the broker's screen.",
  },
  metrics: [
    { value: "Immediate", label: "Lead response time", sublabel: "vs industry avg of 47 minutes" },
    { value: "2.5×", label: "More site visits booked", sublabel: "with instant AI qualification" },
    { value: "60%", label: "Of inquiries captured", sublabel: "after hours & on weekends" },
  ],
  faqs: [
    { question: "Can Khyra answer questions about specific property inventory and specs?", answer: "Yes. Khyra is configured with your current development inventory, pricing, square footage, amenities, and handover schedules to answer accurately." },
    { question: "How does lead qualification work?", answer: "Khyra asks structured qualification questions — budget range, location preference, property specifications, purchase timeline, and financing readiness — logging responses directly to your CRM." },
    { question: "Can it book site visits directly with specific listing agents?", answer: "Yes. Khyra routes tour bookings to the assigned agent based on development, territory, or availability." },
    { question: "What happens when a buyer wants to negotiate pricing?", answer: "Khyra quotes authorized list pricing and routes custom negotiation requests to the senior broker for personal follow-up." },
    { question: "Does it support commercial and rental inquiries as well?", answer: "Yes. Khyra can be configured for commercial leasing, residential sales, tenant management, and off-plan developments." },
  ],
  relatedSlugs: ["hotels-hospitality", "professional-services", "field-services"],
  liveDemo: { roleId: "lead_followup", domainId: "real_estate" },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Hotels & Hospitality
// ─────────────────────────────────────────────────────────────────────────────
const hotelsHospitality: Industry = {
  slug: "hotels-hospitality",
  name: "Hotels & Hospitality",
  shortName: "Hospitality",
  accentColor: "38 92% 50%",
  accentHex: "#f59e0b",
  icon: "Hotel",
  heroHeadline: "Your hotel should answer before the guest hangs up.",
  heroSubhead:
    "Khyra runs your hotel's front desk around the clock — handling reservation inquiries, room questions, and guest requests instantly, in any language.",
  heroBadge: "Hotels & Hospitality",
  operationalRoles: [
    "24/7 Guest Front Desk Reception",
    "Reservation Inquiries & Modifications",
    "Early Arrival & Late Checkout Authorization",
    "Housekeeping & Concierge Work Order Dispatch",
  ],
  callFlowSteps: [
    { title: "Guest calls", detail: "Reservation inquiry or in-stay guest request arrives" },
    { title: "Requirement captured", detail: "Room preference, dates, and reservation code parsed" },
    { title: "Inventory checked", detail: "Live room availability queried in Opera PMS" },
    { title: "Reservation made", detail: "Folio updated and digital confirmation sent" },
    { title: "Service routed", detail: "Housekeeping or concierge alerted automatically" },
  ],
  painPoints: [
    { title: "Front desk overwhelmed during peak check-in", description: "Check-in time creates front desk phone surges. Khyra manages simultaneous calls with zero wait." },
    { title: "After-hours reservation inquiries lost", description: "Late-night booking inquiries go to voicemail. Khyra captures and books reservations 24×7." },
    { title: "Repetitive amenity and policy questions", description: "Check-in times, pool hours, parking, breakfast menus — Khyra answers instantly." },
    { title: "Language barriers with international guests", description: "Khyra communicates fluently across multiple languages, ensuring all guests feel understood." },
    { title: "Missed upgrade and package opportunities", description: "Khyra proactively mentions room upgrades and dining packages during booking calls." },
    { title: "In-room service requests delayed in transit", description: "Khyra logs in-room requests instantly and routes work orders to housekeeping or F&B." },
  ],
  capabilities: [
    { title: "24×7 reservation handling", description: "Takes and confirms room bookings at any hour with live PMS inventory synchronization." },
    { title: "Room availability & pricing", description: "Quotes current seasonal rates and room specifications in real time." },
    { title: "Amenity & policy FAQs", description: "Answers questions on check-in/out, valet parking, pool hours, and dining options." },
    { title: "Multilingual guest support", description: "Multi-language conversational capability for international travelers." },
    { title: "In-room service dispatch", description: "Logs housekeeping, F&B, and maintenance requests directly to operational teams." },
    { title: "Upgrade & package prompting", description: "Mentions relevant suite upgrades and seasonal packages during reservation calls." },
  ],
  workflows: [
    {
      label: "Reservation Inquiry",
      callerQ: "Do you have a Deluxe King room available at Horizon Grand Hotel for this Saturday night?",
      khyraReply: "Yes, we have a Deluxe King available at $180 / €165 per night including breakfast. Would you like me to reserve it for you?",
      actions: ["Availability confirmed", "Reservation created", "Confirmation email sent"],
    },
    {
      label: "Guest In-Stay Request",
      callerQ: "This is Olivia Hayes in room 408. Can we arrange late checkout at 2:00 PM tomorrow?",
      khyraReply: "I've checked your reservation in Opera PMS, authorized late checkout at 2:00 PM for suite 408, and alerted housekeeping.",
      actions: ["PMS folio updated", "Late checkout authorized", "Housekeeping notified"],
    },
    {
      label: "Amenity & Facility FAQ",
      callerQ: "We are arriving at Gulf Oasis Resort in Riyadh tomorrow. What time is the executive lounge open?",
      khyraReply: "Our executive lounge is open from 6:30 AM to 11:00 PM daily. Complimentary airport transfer has also been noted for your booking.",
      actions: ["Policy answered", "Amenity verified", "Call logged"],
    },
  ],
  convoDemo: {
    callerLine: "Can we request early check-in at 11:30 AM for reservation #HK-4091 tomorrow?",
    khyraLine: "I've verified room turnover in Opera PMS, approved early check-in at 11:30 AM for suite 408, and updated housekeeping.",
    actions: [
      { label: "PMS reservation checked" },
      { label: "Early check-in approved" },
      { label: "Digital room pass issued" },
    ],
  },
  integrationCategories: [
    {
      category: "Property Management Systems (PMS)",
      description: "Direct API connectors for room inventory, reservation modifications, and guest folios.",
      examples: ["Oracle Opera PMS", "Cloudbeds", "FrontDesk Anywhere", "Mews"],
    },
    {
      category: "Guest Messaging & Mobile Pass",
      description: "Sends digital keys, arrival confirmations, Wi-Fi access passes, and dining vouchers.",
      examples: ["WhatsApp Business API", "Twilio SMS", "Hotel Mobile App Bridge"],
    },
    {
      category: "Telephony & Room PBX",
      description: "Handles in-room guest dialing as well as central reservations phone lines.",
      examples: ["SIP Trunking", "Mitel / Avaya PBX", "Twilio Voice"],
    },
    {
      category: "Housekeeping & Facility Work Orders",
      description: "Dispatches task tickets directly to housekeeping and maintenance staff.",
      examples: ["HotSOS", "Opera Housekeeping", "Custom Webhooks"],
    },
  ],
  safeguards: {
    summary: "Complex booking exceptions, VIP guest inquiries, or billing disputes are escalated immediately to the front office duty manager with full reservation context.",
    transferProtocol: "Direct warm transfer to front office manager with guest profile and request summary.",
  },
  metrics: [
    { value: "100%", label: "Calls answered", sublabel: "including peak check-in & late night" },
    { value: "2×", label: "More bookings captured", sublabel: "vs unassisted front desk" },
    { value: "24/7", label: "Multi-language support", sublabel: "for global travelers" },
  ],
  faqs: [
    { question: "Can Khyra connect with our hotel PMS?", answer: "Yes. Khyra connects via secure APIs and webhooks to Oracle Opera, Cloudbeds, and other major hospitality management systems." },
    { question: "How does Khyra handle guest complaints?", answer: "Khyra acknowledges the issue with empathy, logs an immediate work order in the PMS, and escalates to the duty manager if required." },
    { question: "Can it support multiple hotel properties under one group?", answer: "Yes. Khyra supports multi-property configurations with distinct inventory, rates, and policies for each location." },
  ],
  relatedSlugs: ["real-estate", "professional-services", "healthcare"],
  liveDemo: { roleId: "front_desk", domainId: "hotel_resort" },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Professional & Advisory Services
// ─────────────────────────────────────────────────────────────────────────────
const professionalServices: Industry = {
  slug: "professional-services",
  name: "Professional & Advisory Services",
  shortName: "Professional Services",
  accentColor: "262 83% 58%",
  accentHex: "#8b5cf6",
  icon: "Users",
  heroHeadline: "Automate client intake, proposal scoping, and advisory consultations.",
  heroSubhead:
    "Khyra handles inbound corporate inquiries, qualifies prospective clients against scope and budget criteria, and schedules discovery consultations — synchronizing directly with your CRM and practice calendar.",
  heroBadge: "Professional & Advisory Services",
  operationalRoles: [
    "Executive Inbound Inquiry Qualification",
    "Practice Lead Calendar Scheduling",
    "Proposal Scope & Requirement Intake",
    "Practice Management & CRM Sync",
  ],
  callFlowSteps: [
    { title: "Client calls", detail: "Corporate inquiry or advisory request received" },
    { title: "Scope captured", detail: "Organization size, timeline, and project requirements parsed" },
    { title: "Lead scored", detail: "Qualified against practice engagement criteria" },
    { title: "Consultation booked", detail: "Directly scheduled on practice partner's calendar" },
    { title: "CRM synchronized", detail: "Detailed brief and transcript logged in practice management" },
  ],
  painPoints: [
    { title: "High-value corporate leads delayed in triage", description: "Executive prospects expect immediate responsiveness. Khyra qualifies and routes inquiries in seconds." },
    { title: "Advisory partners waste hours on unqualified leads", description: "Khyra filters inquiries against your minimum project threshold, ensuring partners speak only to serious buyers." },
    { title: "Inbound briefs lack critical operational details", description: "Khyra systematically collects organization size, current stack, and regulatory deadlines before booking." },
    { title: "After-hours international inquiries lost", description: "Cross-border clients in different time zones receive instant intake and calendar booking 24/7." },
    { title: "Practice management systems aren't updated", description: "Khyra automatically logs every requirement summary directly into Salesforce, HubSpot, or Clio." },
  ],
  capabilities: [
    { title: "Executive intake qualification", description: "Captures corporate scope, company size, urgency, and decision-maker roles." },
    { title: "Partner calendar scheduling", description: "Checks live availability across practice leads and books discovery sessions." },
    { title: "CRM & practice system sync", description: "Enriches CRM profiles with complete structured intake transcripts." },
    { title: "Engagement scope FAQ answering", description: "Answers advisory methodology, compliance standards, and retainer structure questions." },
    { title: "Warm partner escalation", description: "Transfers urgent or key-account prospects directly to senior partners with live briefs." },
  ],
  workflows: [
    {
      label: "Corporate Scope Intake",
      callerQ: "We are seeking an operational compliance audit proposal for Meridian Advisory's 200-person organization.",
      khyraReply: "I can help configure that. What is your target completion date, and are you evaluating specific frameworks such as ISO or SOC 2?",
      actions: ["Scope captured", "Qualification score logged", "Partner brief created"],
    },
    {
      label: "Discovery Consultation Booking",
      callerQ: "Can Michael Bennett schedule a 30-minute discovery call with your London regulatory practice lead?",
      khyraReply: "Our practice lead has openings this Wednesday at 2:00 PM or Thursday at 10:30 AM GMT. Which time aligns better for your team?",
      actions: ["Calendar checked", "Consultation booked", "Calendar invite & agenda sent"],
    },
  ],
  convoDemo: {
    callerLine: "We need an operational audit for our 200-person organization.",
    khyraLine: "I've logged your scope and booked a discovery call with our practice lead for Thursday 10:30 AM. Confirmation sent.",
    actions: [
      { label: "Scope captured" },
      { label: "Partner calendar booked" },
      { label: "CRM profile created" },
    ],
  },
  integrationCategories: [
    {
      category: "CRM & Practice Management",
      description: "Structured client intake logging, contact enrichment, and deal pipeline creation.",
      examples: ["Salesforce", "HubSpot", "Clio", "Microsoft Dynamics"],
    },
    {
      category: "Partner Calendars & Conferencing",
      description: "Direct booking on practice lead calendars with meeting agendas and Zoom / Teams links.",
      examples: ["Microsoft Outlook", "Google Workspace", "Calendly"],
    },
    {
      category: "Telephony & VoIP",
      description: "Inbound corporate lines with intelligent routing by practice area.",
      examples: ["Twilio SIP", "Teams Voice", "Zoom Phone"],
    },
  ],
  safeguards: {
    summary: "Inquiries exceeding practice thresholds or existing key client matters are routed directly to designated practice leads with full background.",
    transferProtocol: "Warm patch to principal advisor with company profile and scoping transcript.",
  },
  metrics: [
    { value: "Immediate", label: "Corporate intake response", sublabel: "zero wait time for executive leads" },
    { value: "3.2×", label: "More qualified meetings booked", sublabel: "vs asynchronous email forms" },
    { value: "100%", label: "CRM record completeness", sublabel: "fully automated intake summaries" },
  ],
  faqs: [
    { question: "Can Khyra qualify leads according to our firm's specific engagement thresholds?", answer: "Yes. Khyra is configured with your firm's qualification rubric — minimum budget, company size, timeline, and decision-maker authority." },
    { question: "Does Khyra connect with our CRM and calendar tools?", answer: "Yes. Khyra integrates with Salesforce, HubSpot, Microsoft 365, Google Calendar, and Clio via secure APIs." },
  ],
  relatedSlugs: ["healthcare", "real-estate", "hotels-hospitality"],
  liveDemo: { roleId: "lead_followup", domainId: "it_projects" },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Field & Home Services
// ─────────────────────────────────────────────────────────────────────────────
const fieldServices: Industry = {
  slug: "field-services",
  name: "Field & Home Services",
  shortName: "Field Services",
  accentColor: "199 89% 48%",
  accentHex: "#0ea5e9",
  icon: "Truck",
  heroHeadline: "Triage urgent service requests and dispatch technicians in real time.",
  heroSubhead:
    "Khyra answers emergency and maintenance calls around the clock, prioritizes work orders, matches technician territories and skills, and sends live ETA updates — without manual dispatcher intervention.",
  heroBadge: "Field & Service Operations",
  operationalRoles: [
    "24/7 Emergency Dispatch Intake",
    "Technician Skill & Territory Matching",
    "ServiceTitan & Jobber Work Order Creation",
    "Customer ETA Tracking Updates",
  ],
  callFlowSteps: [
    { title: "Customer calls", detail: "Emergency breakdown or service request arrives" },
    { title: "Urgency triaged", detail: "Commercial priority vs routine maintenance classified" },
    { title: "Technician matched", detail: "Territory, skill certification, and availability verified" },
    { title: "Work order created", detail: "Job logged in dispatch software with full diagnostic notes" },
    { title: "ETA dispatched", detail: "Customer receives live technician tracker via SMS" },
  ],
  painPoints: [
    { title: "Emergency calls lost during night and weekend peaks", description: "Severe leaks and HVAC failures don't wait for business hours. Khyra captures emergencies 24/7." },
    { title: "Dispatchers overwhelmed by call spikes", description: "Weather events create massive call spikes. Khyra handles unlimited simultaneous calls without busy signals." },
    { title: "Inaccurate job intake causes repeat truck rolls", description: "Khyra captures equipment model, error codes, and symptoms systematically so techs arrive prepared." },
    { title: "Customer anxiety over technician arrival windows", description: "Khyra provides real-time arrival estimates and sends automated SMS tracking updates." },
    { title: "Manual dispatch entry creates delays", description: "Direct integration with ServiceTitan, Jobber, and FieldEdge eliminates manual data entry." },
  ],
  capabilities: [
    { title: "24/7 emergency dispatch intake", description: "Immediate triage and priority routing for urgent repairs, leaks, and commercial outages." },
    { title: "Skill & territory matching", description: "Matches jobs to the nearest certified technician based on trade license and location." },
    { title: "Work order & job creation", description: "Automatically creates structured jobs in your field service management software." },
    { title: "Live ETA & customer tracking", description: "Dispatches multi-channel arrival updates and technician ETA alerts." },
    { title: "On-call manager escalation", description: "Instantly alerts on-call field supervisors when critical commercial emergencies arise." },
  ],
  workflows: [
    {
      label: "Emergency Commercial HVAC",
      callerQ: "Our commercial HVAC system is leaking water and stopped cooling the main server room at 440 Industrial Parkway.",
      khyraReply: "I've flagged this as high priority commercial service, created work order #HV-892 in ServiceTitan, and dispatched technician Marcus for a 1:30 PM arrival.",
      actions: ["Emergency triaged", "Work order created", "Technician dispatched", "Live ETA sent"],
    },
    {
      label: "Routine Maintenance Booking",
      callerQ: "I need to schedule annual preventative maintenance for our commercial refrigeration units.",
      khyraReply: "We have service windows open this Friday between 8:00 AM and 11:00 AM. Which window fits your operational schedule?",
      actions: ["Service window selected", "Job scheduled", "Customer confirmation sent"],
    },
  ],
  convoDemo: {
    callerLine: "Our commercial HVAC system stopped cooling and is leaking.",
    khyraLine: "Flagged as urgent commercial repair. Work order created, technician Marcus dispatched for 1:30 PM arrival. Tracker sent via SMS.",
    actions: [
      { label: "Emergency triaged" },
      { label: "Work order created" },
      { label: "Technician dispatched" },
    ],
  },
  integrationCategories: [
    {
      category: "Field Service Management (FSM)",
      description: "Automated work order generation, job scheduling, and equipment diagnostic logging.",
      examples: ["ServiceTitan", "Jobber", "FieldEdge", "Housecall Pro"],
    },
    {
      category: "Technician Mobile & Dispatch",
      description: "Routes jobs to nearest qualified tech and captures live transit ETA.",
      examples: ["ServiceTitan Mobile", "Custom Dispatch APIs", "Fleet Tracking"],
    },
    {
      category: "Customer SMS & Tracking",
      description: "Sends live technician arrival tracker and emergency prep instructions.",
      examples: ["Twilio SMS", "WhatsApp Cloud API"],
    },
  ],
  safeguards: {
    summary: "Life-safety emergencies trigger immediate safety instructions and instant escalation to on-call emergency field supervisors.",
    transferProtocol: "Immediate priority phone patch to on-call field manager.",
    emergencyPolicy: "Provides standard utility shutdown guidance while immediately patching emergency response.",
  },
  metrics: [
    { value: "Instant", label: "Emergency intake response", sublabel: "zero callers left on hold" },
    { value: "35%", label: "Faster technician dispatch", sublabel: "automated skill & territory matching" },
    { value: "0", label: "Dropped after-hours calls", sublabel: "24/7 continuous dispatch intake" },
  ],
  faqs: [
    { question: "Can Khyra integrate with our field service management software?", answer: "Yes. Khyra connects via direct APIs and webhooks with ServiceTitan, Jobber, FieldEdge, Housecall Pro, and custom dispatch systems." },
    { question: "How does Khyra handle true emergency escalations?", answer: "Khyra evaluates urgency keywords, customer contract tier, and failure type, then immediately alerts and routes calls to on-call technicians or supervisors." },
  ],
  relatedSlugs: ["healthcare", "real-estate", "hotels-hospitality"],
  liveDemo: { roleId: "support_line", domainId: "devops_support" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Other Supporting Industries
// ─────────────────────────────────────────────────────────────────────────────
const salonsWellness: Industry = {
  slug: "salons-wellness",
  name: "Salons & Wellness",
  shortName: "Salons",
  accentColor: "336 80% 55%",
  accentHex: "#ec4899",
  icon: "Sparkles",
  heroHeadline: "Fill more appointment slots without adding another receptionist.",
  heroSubhead:
    "Khyra answers every call, books appointments, handles pricing questions, and reschedules automatically — so your stylists focus on clients, not phones.",
  heroBadge: "Salons & Wellness",
  operationalRoles: ["24/7 Call Intake & Booking", "Stylist Preference Matching", "Service & Pricing Inquiries", "Rescheduling & Cancellations", "Automated Appointment Reminders"],
  callFlowSteps: [
    { title: "Client calls", detail: "During a service, after hours, or at peak volume" },
    { title: "Preference noted", detail: "Treatment type and stylist preference identified" },
    { title: "Calendar checked", detail: "Live availability queried across all stylists" },
    { title: "Booking confirmed", detail: "Slot locked, SMS confirmation dispatched" },
    { title: "Reminder scheduled", detail: "Automated reminder queued before the appointment" },
  ],
  painPoints: [
    { title: "Phone rings interrupt ongoing client services", description: "Your team can't step away to answer calls during treatments. Khyra covers every call so stylists stay focused." },
    { title: "Empty slots from last-minute cancellations", description: "Khyra handles reschedules in real time and immediately offers vacant slots to waitlisted clients." },
    { title: "Pricing and service questions drain the front desk", description: "Khyra instantly answers questions on treatments, duration, and pricing without interrupting staff." },
    { title: "After-hours booking inquiries go unanswered", description: "Clients often want to book evenings and weekends. Khyra captures those bookings 24×7." },
    { title: "No-show rates hurt daily revenue", description: "Khyra sends automated reminder messages and confirmation calls to dramatically reduce no-shows." },
  ],
  capabilities: [
    { title: "24×7 call answering", description: "Every call answered — even while your team is mid-service or the salon is closed." },
    { title: "Real-time booking", description: "Checks live stylist availability and books the right specialist on the spot." },
    { title: "Service & pricing FAQs", description: "Instantly answers questions on treatments, durations, and pricing for all services." },
    { title: "Cancellation & rescheduling", description: "Processes cancellations and fills freed slots from a waiting client list automatically." },
    { title: "Automated appointment reminders", description: "Outbound reminder calls or SMS messages reduce no-show rates significantly." },
  ],
  workflows: [
    {
      label: "New Booking",
      callerQ: "Hi, can I book a styling consultation with Elena at Meridian Wellness this Saturday afternoon?",
      khyraReply: "Saturday 3:00 PM is open with Elena at Meridian Wellness. Shall I confirm and lock that booking for you?",
      actions: ["Appointment booked", "SMS confirmation sent", "Calendar updated"],
    },
    {
      label: "Reschedule",
      callerQ: "I need to move my Friday 2 PM appointment to next Monday morning.",
      khyraReply: "We have Monday at 10:00 AM open with the same specialist. Want me to move your appointment to that time?",
      actions: ["Friday slot released", "Monday slot booked", "Reminder updated"],
    },
  ],
  convoDemo: {
    callerLine: "Can I book a haircut for Saturday afternoon?",
    khyraLine: "Saturday 3:00 PM is open with our specialist. Confirm the booking?",
    actions: [{ label: "Booking confirmed" }, { label: "SMS sent" }, { label: "Calendar updated" }],
  },
  integrationCategories: [
    {
      category: "Salon Booking & Scheduling",
      description: "Direct two-way sync for stylist calendars, service menus, and appointment management.",
      examples: ["Mindbody", "Vagaro", "Fresha", "Booksy", "Square Appointments"],
    },
    {
      category: "Telephony & VoIP",
      description: "Connects to your existing salon phone number with zero disruption.",
      examples: ["Twilio Voice", "SIP Trunking", "Existing Salon PBX"],
    },
    {
      category: "Client Messaging",
      description: "Automated SMS and WhatsApp appointment confirmations and reminder sequences.",
      examples: ["Twilio SMS", "WhatsApp Cloud API"],
    },
  ],
  safeguards: {
    summary: "When a client raises a complaint, requests a manager, or a booking conflict cannot be resolved automatically, Khyra warm-transfers to salon staff with full context.",
    transferProtocol: "Immediate warm transfer to the salon manager or receptionist with client name, service, and issue summary.",
  },
  metrics: [
    { value: "40%", label: "Fewer no-shows", sublabel: "with automated reminders" },
    { value: "3×", label: "More bookings captured", sublabel: "after-hours and peak hours" },
    { value: "0", label: "Calls dropped", sublabel: "during peak service hours" },
  ],
  faqs: [
    { question: "Can Khyra book appointments for multiple stylists?", answer: "Yes. Khyra manages separate schedules for each stylist and routes bookings based on the client's preference and stylist availability." },
    { question: "What happens when all slots are full?", answer: "Khyra informs the client of the next available opening and can add them to a cancellation waitlist, notifying them automatically when a slot opens up." },
    { question: "Can Khyra answer questions about specific services and pricing?", answer: "Yes. Khyra is configured with your full service menu, pricing, duration, and stylist specialisations to answer inquiries accurately." },
    { question: "Does Khyra send appointment reminders?", answer: "Yes. Khyra dispatches automated SMS or WhatsApp reminders before appointments, significantly reducing no-show rates for salons." },
  ],
  relatedSlugs: ["healthcare", "hotels-hospitality"],
  liveDemo: { roleId: "front_desk", domainId: "spa_salon" },
};

const veterinary: Industry = {
  slug: "veterinary",
  name: "Veterinary Clinics",
  shortName: "Veterinary",
  accentColor: "173 80% 36%",
  accentHex: "#0f9b8e",
  icon: "PawPrint",
  heroHeadline: "A 24×7 front desk for your veterinary clinic.",
  heroSubhead:
    "Khyra answers pet owner calls, books appointments, handles vaccination reminders, and routes urgent cases — so your vet team stays focused on patients.",
  heroBadge: "Veterinary Clinics",
  operationalRoles: ["Pet Intake & Appointment Booking", "Emergency Urgency Triage", "Vaccination Reminder Calls", "After-Hours Coverage", "Practice Management System Sync"],
  callFlowSteps: [
    { title: "Owner calls", detail: "About a pet's health, appointment, or vaccination" },
    { title: "Urgency assessed", detail: "Emergency vs. routine visit classified instantly" },
    { title: "Vet matched", detail: "Right doctor selected by species and case type" },
    { title: "Appointment booked", detail: "Slot confirmed and owner notified" },
    { title: "Records updated", detail: "Pet history and appointment logged in practice system" },
  ],
  painPoints: [
    { title: "Emergency pet calls need instant routing", description: "Khyra identifies urgent symptoms and distress keywords, routing emergencies to on-call veterinary staff immediately." },
    { title: "After-hours pet owners have nowhere to call", description: "Pets don't get sick on schedule. Khyra provides 24×7 coverage and routes genuine emergencies while booking routine appointments." },
    { title: "Receptionists overwhelmed during morning rush", description: "Morning appointment spikes leave owners waiting on hold. Khyra handles unlimited simultaneous calls." },
    { title: "Vaccination reminder follow-ups don't happen", description: "Khyra automatically reaches out to pet owners when annual vaccines are due, reducing missed preventative care." },
    { title: "Species-specific appointment routing is complex", description: "Khyra captures the species, condition, and urgency level, routing to the correct specialist or exotic animal vet." },
  ],
  capabilities: [
    { title: "Emergency call triage", description: "Detects urgent symptoms and distress signals, routing immediately to on-call veterinary staff." },
    { title: "Pet appointment booking", description: "Books appointments by species, condition type, and vet availability." },
    { title: "24×7 after-hours coverage", description: "Handles owner inquiries around the clock — capturing bookings and routing true emergencies." },
    { title: "Vaccination reminder outreach", description: "Outbound reminder calls to pet owners when annual vaccines or follow-ups are due." },
    { title: "Practice management sync", description: "Logs appointments and pet history directly into your veterinary management software." },
  ],
  workflows: [
    {
      label: "Urgent Pet Inquiry",
      callerQ: "My dog hasn't been eating and seems lethargic. I need an appointment today at Riverside Vet.",
      khyraReply: "I understand. Riverside Vet has openings today at 3:00 PM and 5:30 PM with Dr. Miller. Which works for you?",
      actions: ["Appointment booked", "Symptom notes logged", "SMS confirmation sent"],
    },
    {
      label: "Vaccination Reminder",
      callerQ: "(Khyra outbound) Hi Jordan, calling from Riverside Vet regarding your pet's annual vaccination due this month.",
      khyraReply: "We have availability Thursday at 10:00 AM and Friday at 2:00 PM. Would you like to lock in a slot?",
      actions: ["Vaccination due detected", "Appointment offered", "Pet record flagged"],
    },
  ],
  convoDemo: {
    callerLine: "My dog is lethargic. I need a vet today.",
    khyraLine: "We have 3:00 PM available today with our veterinarian. Book that slot?",
    actions: [{ label: "Appointment booked" }, { label: "Symptom flagged" }, { label: "SMS sent" }],
  },
  integrationCategories: [
    {
      category: "Veterinary Practice Management",
      description: "Direct sync for patient records, appointment scheduling, and treatment history.",
      examples: ["Cornerstone", "ImproMed", "ezyVet", "VetBadger", "Avimark"],
    },
    {
      category: "Telephony & VoIP",
      description: "Connects to your existing clinic phone line with zero number changes.",
      examples: ["Twilio Voice", "SIP Trunking", "Existing Clinic PBX"],
    },
    {
      category: "Client Messaging",
      description: "Automated SMS appointment confirmations, reminders, and vaccine due alerts.",
      examples: ["Twilio SMS", "WhatsApp Cloud API", "Email Notifications"],
    },
  ],
  safeguards: {
    summary: "All calls containing emergency symptoms are evaluated and immediately routed to on-call veterinary personnel. Khyra never provides clinical diagnoses or treatment advice.",
    transferProtocol: "Immediate warm transfer to on-call vet or clinic manager with species, symptoms, and caller details.",
    emergencyPolicy: "Khyra detects distress keywords and emergency symptoms, immediately routing to on-call staff. It does not provide medical diagnoses.",
  },
  metrics: [
    { value: "24×7", label: "Emergency call coverage", sublabel: "no missed urgent calls" },
    { value: "45%", label: "Fewer no-shows", sublabel: "with automated reminders" },
    { value: "Instant", label: "Answer time", sublabel: "for every call" },
  ],
  faqs: [
    { question: "Can Khyra identify veterinary emergencies?", answer: "Yes. Khyra evaluates urgent symptom keywords and distress signals and immediately routes emergency calls to on-call veterinary staff. It does not provide clinical diagnoses." },
    { question: "Can Khyra book appointments for different species?", answer: "Yes. Khyra captures the species, condition, and urgency level, routing to the appropriate veterinarian or specialist." },
    { question: "Can Khyra integrate with our practice management software?", answer: "Yes. Khyra connects via secure APIs to major veterinary practice management systems including Cornerstone, ezyVet, and ImproMed." },
    { question: "Does Khyra handle after-hours calls?", answer: "Yes. Khyra is available 24×7, capturing routine appointment requests and routing genuine medical emergencies to on-call staff at any hour." },
  ],
  relatedSlugs: ["healthcare", "salons-wellness"],
  liveDemo: { roleId: "front_desk", domainId: "veterinary_clinic" },
};

const education: Industry = {
  slug: "education",
  name: "Education",
  shortName: "Education",
  accentColor: "239 84% 58%",
  accentHex: "#4f46e5",
  icon: "GraduationCap",
  heroHeadline: "Turn every education inquiry into a confirmed counselling session.",
  heroSubhead:
    "Khyra answers course questions, qualifies prospective students, schedules counselling calls, and follows up automatically — so your admissions team converts more leads with less effort.",
  heroBadge: "Education",
  operationalRoles: ["Student Lead Qualification", "Admissions Advising Scheduling", "Course & Fee Inquiries", "CRM Lead Logging", "After-Hours Inquiry Capture"],
  callFlowSteps: [
    { title: "Student calls", detail: "Course inquiry received at any hour" },
    { title: "Interest captured", detail: "Programme, eligibility, and timeline noted" },
    { title: "Questions answered", detail: "Fees, duration, and admission details provided" },
    { title: "Counsellor booked", detail: "Advising session scheduled on counsellor calendar" },
    { title: "Lead logged", detail: "Student profile stored in CRM, follow-up queued" },
  ],
  painPoints: [
    { title: "Admission inquiries go unanswered during busy periods", description: "Prospective students who can't get through quickly choose another institution. Khyra answers every call immediately." },
    { title: "Evening and weekend inquiries missed", description: "Students often research and call after office hours. Khyra provides 24×7 coverage and captures every lead." },
    { title: "Admissions counsellors waste time on early-stage FAQ calls", description: "Course fees, eligibility, duration — Khyra answers these accurately so counsellors focus on conversion conversations." },
    { title: "International student inquiries need immediate response", description: "Cross-timezone prospective students expect instant answers. Khyra responds regardless of the time zone." },
    { title: "CRM records are incomplete or delayed", description: "Khyra automatically logs every student inquiry, eligibility capture, and interest level directly into your admissions CRM." },
  ],
  capabilities: [
    { title: "24×7 inquiry handling", description: "Answers course and admissions inquiries at any hour — never miss a prospective student." },
    { title: "Student lead qualification", description: "Captures eligibility requirements, preferred programme, budget, and enrolment timeline." },
    { title: "Admissions advising scheduling", description: "Books counsellor sessions directly on the correct programme advisor's calendar." },
    { title: "Automated follow-up sequences", description: "Reaches out to prospective students who enquired but haven't yet booked a session." },
    { title: "CRM lead logging", description: "Logs structured student profiles and interest summaries into your admissions management system." },
  ],
  workflows: [
    {
      label: "Course Inquiry",
      callerQ: "What is the fee for the MBA programme and what are the eligibility requirements?",
      khyraReply: "Tuition is $12,500 / £9,800 per academic year. Admission requires a recognised bachelor's degree and relevant work experience. Would you like me to schedule an admissions advising call?",
      actions: ["Course details provided", "Lead captured", "Counsellor session offered"],
    },
    {
      label: "Admissions Advising Booking",
      callerQ: "I'd like to speak to an admissions advisor about the Engineering programme.",
      khyraReply: "Our Engineering admissions advisor has availability Thursday at 11:00 AM or Friday at 2:30 PM. Which time works better for you?",
      actions: ["Advisor calendar checked", "Session booked", "Calendar invite sent"],
    },
  ],
  convoDemo: {
    callerLine: "What's the fee for the MBA programme?",
    khyraLine: "Tuition is $12,500/year. Admission requires a bachelor's degree. Want to book an advising call?",
    actions: [{ label: "Details provided" }, { label: "Counsellor booked" }, { label: "Lead captured" }],
  },
  integrationCategories: [
    {
      category: "Admissions CRM & Lead Management",
      description: "Automated student profile creation, lead scoring, and follow-up queue management.",
      examples: ["Salesforce Education Cloud", "HubSpot", "LeadSquared", "Slate"],
    },
    {
      category: "Counsellor Calendars & Scheduling",
      description: "Direct booking on individual programme advisor calendars with meeting confirmations.",
      examples: ["Google Calendar", "Microsoft 365", "Calendly"],
    },
    {
      category: "Telephony & Communication",
      description: "Handles inbound inquiry lines and outbound follow-up campaigns.",
      examples: ["Twilio Voice", "SIP Trunking", "WhatsApp Cloud API"],
    },
  ],
  safeguards: {
    summary: "Complex admission policy questions or scholarship negotiation inquiries are routed directly to senior admissions staff with the student's full inquiry profile.",
    transferProtocol: "Warm transfer to the admissions officer with student name, programme interest, and eligibility details pre-loaded.",
  },
  metrics: [
    { value: "3×", label: "More advising calls booked", sublabel: "vs manual follow-up" },
    { value: "65%", label: "Inquiries after office hours", sublabel: "captured automatically" },
    { value: "Instant", label: "Response time", sublabel: "to every inquiry" },
  ],
  faqs: [
    { question: "Can Khyra handle inquiries for multiple courses and programmes?", answer: "Yes. Khyra is configured with complete details for all your programmes, intake requirements, fees, and schedules, routing each inquiry to the correct information." },
    { question: "Can Khyra schedule appointments with specific admissions advisors?", answer: "Yes. Khyra books sessions on individual counsellor calendars based on programme and availability." },
    { question: "How does Khyra handle international student inquiries across time zones?", answer: "Khyra operates 24×7 with no time-zone constraints, ensuring every global prospective student gets an immediate response regardless of when they call." },
    { question: "Does Khyra log student details into our CRM?", answer: "Yes. Khyra automatically creates structured student profiles in your admissions CRM (Salesforce, HubSpot, LeadSquared, or Slate) with programme interest, eligibility capture, and follow-up notes." },
  ],
  relatedSlugs: ["real-estate", "healthcare"],
  liveDemo: { roleId: "lead_followup", domainId: "it_projects" },
};

const cosmeticClinics: Industry = {
  slug: "cosmetic-clinics",
  name: "Cosmetic Clinics",
  shortName: "Cosmetic",
  accentColor: "270 80% 60%",
  accentHex: "#9333ea",
  icon: "Sparkles",
  heroHeadline: "Turn every consultation inquiry into a confirmed appointment.",
  heroSubhead:
    "Khyra answers treatment questions, handles pricing inquiries, and books consultation appointments — converting curious callers into confirmed clients with discretion and professionalism.",
  heroBadge: "Cosmetic Clinics",
  operationalRoles: ["Discreet Treatment & Pricing Inquiries", "Consultation Appointment Scheduling", "After-Hours Lead Capture", "Appointment Reminders & Follow-ups", "Clinic System Sync"],
  callFlowSteps: [
    { title: "Prospect calls", detail: "Inquiry about an aesthetic or cosmetic procedure" },
    { title: "Interest identified", detail: "Treatment type and timeline discretely noted" },
    { title: "Questions answered", detail: "Procedure, recovery, and pricing explained" },
    { title: "Consultation booked", detail: "Slot confirmed with the right specialist" },
    { title: "Follow-up dispatched", detail: "Confirmation SMS and reminder queued" },
  ],
  painPoints: [
    { title: "Pricing inquiries don't convert without immediate follow-up", description: "Khyra offers a consultation booking at exactly the right moment — before the prospect considers alternatives." },
    { title: "Reception too busy during active treatment hours", description: "Khyra covers every inbound call while your team focuses on client care." },
    { title: "After-hours inquiry callers go unbooked", description: "Many clients prefer to call about sensitive procedures after hours. Khyra captures those consultations 24×7." },
    { title: "Inconsistent handling of sensitive inquiries", description: "Khyra maintains a consistent, discreet, and professional tone for every cosmetic inquiry without fail." },
    { title: "High no-show rate on free consultations", description: "Khyra sends automated reminders and confirmation calls to ensure clients show up for their booked sessions." },
  ],
  capabilities: [
    { title: "Discreet treatment & pricing FAQs", description: "Answers procedure, pricing, and recovery questions professionally and confidentially." },
    { title: "Consultation booking", description: "Locks consultation slots directly on the right specialist's calendar." },
    { title: "24×7 after-hours inquiry capture", description: "Captures leads and books consultations even outside clinic operating hours." },
    { title: "Automated consultation reminders", description: "Sends reminder messages to reduce no-shows for consultation appointments." },
    { title: "Clinic system synchronization", description: "Logs client enquiries and bookings directly into your practice management or CRM system." },
  ],
  workflows: [
    {
      label: "Treatment Inquiry & Booking",
      callerQ: "I'm interested in an aesthetic consultation with Dr. Reynolds at Greenway Aesthetics. How much is it?",
      khyraReply: "Our consultations with Dr. Reynolds at Greenway Aesthetics are $150 / SAR 550. Would you like me to reserve a slot this Thursday at 3:00 PM?",
      actions: ["Treatment details provided", "Consultation booked", "SMS confirmation sent"],
    },
    {
      label: "After-Hours Inquiry",
      callerQ: "Hi, I'm calling Al Noor Aesthetics regarding consultation availability tomorrow.",
      khyraReply: "Our clinic opens tomorrow at 9:00 AM. Consultations start at SAR 550 / $150. I can reserve a slot for tomorrow at 10:30 AM — shall I lock that in?",
      actions: ["Pricing provided", "Consultation offered", "After-hours lead captured"],
    },
  ],
  convoDemo: {
    callerLine: "I'm interested in a consultation. Do you have slots this week?",
    khyraLine: "We have Thursday at 3:00 PM open with our specialist. Shall I reserve that for you?",
    actions: [{ label: "Pricing provided" }, { label: "Consultation booked" }, { label: "SMS sent" }],
  },
  integrationCategories: [
    {
      category: "Clinic & Practice Management",
      description: "Patient profile creation, consultation scheduling, and treatment history logging.",
      examples: ["Aesthetics Pro", "Cliniko", "Jane App", "Pabau", "Custom CMS"],
    },
    {
      category: "Calendars & Booking",
      description: "Live availability checking and direct booking on specialist calendars.",
      examples: ["Google Calendar", "Microsoft Outlook", "Acuity Scheduling"],
    },
    {
      category: "Client Messaging & Reminders",
      description: "Discreet appointment confirmations, reminders, and follow-up messages.",
      examples: ["Twilio SMS", "WhatsApp Cloud API", "Email Notifications"],
    },
    {
      category: "Telephony",
      description: "Connects to your existing clinic phone line with zero disruption.",
      examples: ["Twilio Voice", "SIP Trunking", "Existing Clinic PBX"],
    },
  ],
  safeguards: {
    summary: "Inquiries requiring clinical consultation, complex treatment planning, or specific medical history review are routed immediately to the treating physician or clinic manager.",
    transferProtocol: "Warm transfer to the treating physician or clinic director with client name and enquiry context.",
  },
  metrics: [
    { value: "2×", label: "Consultation conversion", sublabel: "from inquiry to booking" },
    { value: "40%", label: "Fewer no-shows", sublabel: "with automated reminders" },
    { value: "Instant", label: "Inquiry response time", sublabel: "every call, 24/7" },
  ],
  faqs: [
    { question: "Can Khyra handle sensitive cosmetic inquiries discreetly?", answer: "Yes. Khyra is configured to handle aesthetic inquiries with complete discretion, professionalism, and patient privacy as a core operational principle." },
    { question: "Can Khyra answer questions about specific procedures and pricing?", answer: "Yes. Khyra is configured with your clinic's full treatment menu, pricing, consultation fees, and specialist profiles to answer accurately." },
    { question: "Can Khyra capture after-hours consultation requests?", answer: "Yes. Khyra operates 24×7, capturing consultation bookings and enquiries even when the clinic is closed, and confirming them the next business day." },
    { question: "Does Khyra integrate with our clinic management software?", answer: "Yes. Khyra connects via secure APIs with major aesthetic and medical practice management platforms including Cliniko, Jane App, Pabau, and custom systems." },
  ],
  relatedSlugs: ["healthcare", "salons-wellness"],
  liveDemo: { roleId: "front_desk", domainId: "cosmetic_clinic" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Master registry
// ─────────────────────────────────────────────────────────────────────────────
export const INDUSTRIES: Industry[] = [
  healthcare,
  hotelsHospitality,
  realEstate,
  professionalServices,
  fieldServices,
];

export const ALL_INDUSTRIES: Industry[] = [
  healthcare,
  hotelsHospitality,
  realEstate,
  professionalServices,
  fieldServices,
  salonsWellness,
  veterinary,
  education,
  cosmeticClinics,
];

export const INDUSTRY_MAP: Record<string, Industry> = Object.fromEntries(
  ALL_INDUSTRIES.map((ind) => [ind.slug, ind]),
);

// Hero rotation scenarios for homepage auto-rotate — operational AI workflows
export const HERO_INDUSTRY_ROTATIONS = [
  {
    industry: "Healthcare",
    badge: "Horizon Health · Appointment & EHR Sync",
    callerLine: "Hi, I need to reschedule Alex Morgan's consultation with Dr. Lawrence to Thursday afternoon.",
    khyraLine: "Dr. Lawrence has an open slot Thursday at 3:30 PM at Horizon Health. I've updated your clinic file and locked that in for you.",
    actions: ["Intent verified", "EHR calendar checked", "Appointment updated", "SMS confirmation sent"],
    accentHex: "#22c55e",
  },
  {
    industry: "Real Estate",
    badge: "Central Properties · Lead Qualification",
    callerLine: "I'm calling to inquire about the 3-bedroom Central District penthouse listed yesterday.",
    khyraLine: "The penthouse is available at $1.2M / SAR 4.5M. I've noted your purchase criteria, verified qualification, and scheduled a private tour for Friday at 11:00 AM.",
    actions: ["Lead qualified", "CRM profile created", "Viewing tour locked", "Agent brief dispatched"],
    accentHex: "#1d4ed8",
  },
  {
    industry: "Hospitality",
    badge: "Horizon Grand Hotel · Guest Operations",
    callerLine: "Can we request a late checkout at 2:00 PM for suite 408 tomorrow?",
    khyraLine: "I've checked your reservation in Opera PMS, authorized late checkout at 2:00 PM for suite 408, and alerted housekeeping.",
    actions: ["Reservation verified", "PMS record updated", "Housekeeping alerted", "Digital pass issued"],
    accentHex: "#d97706",
  },
  {
    industry: "Field Services",
    badge: "Metro Field Services · Dispatch & Job Routing",
    callerLine: "Our commercial HVAC unit is leaking water and stopped cooling at 440 Industrial Parkway.",
    khyraLine: "I've flagged this as urgent commercial HVAC service, created work order #HV-892, and dispatched technician Marcus for 1:30 PM arrival.",
    actions: ["Urgency triaged", "Work order created", "Technician dispatched", "Live ETA tracker sent"],
    accentHex: "#0ea5e9",
  },
] as const;
