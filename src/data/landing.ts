import type { ElementType } from "react";
import {
  Activity,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
  Database,
  FileCheck,
  Globe,
  Headphones,
  Hotel,
  Layers,
  MessageSquare,
  Network,
  Phone,
  PhoneCall,
  PhoneForwarded,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Truck,
  Users,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

export type UseCaseTab =
  | "Customer Support"
  | "Front Desk & Reception"
  | "Sales & Lead Qualification"
  | "Scheduling & Coordination"
  | "Service Operations";

export const heroConversation = [
  { who: "caller", text: "Hi, I need to reschedule my consultation to tomorrow afternoon." },
  { who: "khyra", text: "I can help with that. Dr. Lawrence has an open slot tomorrow at 3:30 PM. Would you like me to lock that in?" },
  { who: "caller", text: "Yes, 3:30 PM works perfectly." },
  { who: "khyra", text: "Confirmed. I've updated your appointment in our clinic system and sent a confirmation SMS to your number." },
] as const;

export const trustIndustries = [
  { Icon: Stethoscope as ElementType, label: "Healthcare & Clinics" },
  { Icon: Hotel as ElementType, label: "Hospitality & Hotels" },
  { Icon: Building2 as ElementType, label: "Real Estate & Property" },
  { Icon: Users as ElementType, label: "Professional Services" },
  { Icon: Truck as ElementType, label: "Field & Home Services" },
] as const;

export const trustStats = [
  { value: "Understand → Act", label: "End-to-end operational execution", sublabel: "Conversations turn directly into business actions" },
  { value: "Zero Rip-and-Replace", label: "Connects to your existing software", sublabel: "CRM, ERP, calendars, EHR & custom APIs" },
  { value: "24/7 Availability", label: "Autonomous task handling", sublabel: "Never leave high-intent callers waiting" },
  { value: "Human Safeguard", label: "Contextual escalation protocol", sublabel: "Warm transfer with real-time call summary" },
] as const;

export const impactStats = [
  { value: "< 1s", label: "Average response time to inbound calls — no hold queue" },
  { value: "24/7", label: "Autonomous operational coverage across voice and digital channels" },
  { value: "92%+", label: "First-contact resolution rate for Tier-1 workflow execution" },
] as const;

export const executionPipeline = [
  {
    step: "01",
    phase: "Understand",
    title: "Conversational Intake",
    description: "Khyra listens, transcribes, and extracts intent, parameters, and customer identifiers in real time across phone or digital channels.",
    badge: "Intent & Entity Extraction",
  },
  {
    step: "02",
    phase: "Decide",
    title: "Business Rule Logic",
    description: "Evaluates your company's operational rules, availability schedules, customer tiers, and compliance requirements before acting.",
    badge: "Rule Engine & Policy Check",
  },
  {
    step: "03",
    phase: "Execute",
    title: "System Action",
    description: "Communicates directly with your backend systems via APIs or webhooks: booking slots, updating records, or dispatching services.",
    badge: "Direct API / System Sync",
  },
  {
    step: "04",
    phase: "Update",
    title: "Confirmation & Logging",
    description: "Dispatches multi-channel confirmation to the customer (SMS/WhatsApp/Email) and updates internal audit logs and team dashboards.",
    badge: "Multi-Channel Delivery",
  },
  {
    step: "05",
    phase: "Escalate",
    title: "Human Escalation Safeguard",
    description: "If an exception arises or complex human judgment is needed, Khyra routes to a staff member with a full brief of the conversation so far.",
    badge: "Warm Transfer with Context",
  },
] as const;

export const pillars = [
  {
    Icon: Headphones as ElementType,
    title: "Customer Support Operator",
    description: "Resolves tier-1 customer inquiries, answers status questions, troubleshoots known issues, and generates tickets in your helpdesk.",
    tab: "Customer Support" as const,
    outcomes: ["Instant triage without wait queues", "Automatic CRM / ticketing sync", "Intelligent escalation with full summary"],
  },
  {
    Icon: Phone as ElementType,
    title: "Front Desk & Reception",
    description: "Answers inbound calls 24/7, books appointments, coordinates reschedules, handles cancellations, and answers common facility questions.",
    tab: "Front Desk & Reception" as const,
    outcomes: ["Zero missed calls during peak hours", "Live calendar validation & booking", "Automatic confirmation dispatch"],
  },
  {
    Icon: Target as ElementType,
    title: "Sales & Lead Qualification",
    description: "Engages high-intent inbound prospects instantly, qualifies budget and timeline, collects requirements, and schedules discovery meetings.",
    tab: "Sales & Lead Qualification" as const,
    outcomes: ["Sub-minute response to inbound leads", "Strict qualification rubric scoring", "Warm handoff to sales reps"],
  },
  {
    Icon: CalendarCheck as ElementType,
    title: "Scheduling & Coordination",
    description: "Manages complex multi-party appointments, reservation modifications, reminders, and confirmations directly inside your calendar or PMS.",
    tab: "Scheduling & Coordination" as const,
    outcomes: ["Two-way calendar & booking sync", "Automated reschedule workflows", "Significant reduction in no-shows"],
  },
  {
    Icon: Truck as ElementType,
    title: "Field & Service Operations",
    description: "Handles emergency service dispatch, work-order status requests, customer arrival updates, and technician routing coordination.",
    tab: "Service Operations" as const,
    outcomes: ["Real-time case and job creation", "Emergency triage & priority routing", "Customer arrival notifications"],
  },
] as const;

export const howItWorksSteps = [
  {
    number: "01",
    title: "Understand the workflow",
    description:
      "We map the conversations, business logic, validation rules, and backend actions your organization wants automated.",
  },
  {
    number: "02",
    title: "Connect existing systems",
    description:
      "We securely connect your telephony and business systems (CRM, calendar, EHR, ticketing) through supported APIs and webhooks.",
  },
  {
    number: "03",
    title: "Configure operational workflows",
    description:
      "Khyra's reasoning and execution engine is configured around your specific processes, business rules, and escalation paths.",
  },
  {
    number: "04",
    title: "Test & validate",
    description:
      "Workflows are rigorously tested against realistic scenarios, edge cases, background noise, interruptions, and system errors.",
  },
  {
    number: "05",
    title: "Go live",
    description:
      "Khyra begins handling live interactions with real-time monitoring and built-in human escalation safeguards.",
  },
  {
    number: "06",
    title: "Monitor and refine",
    description:
      "Interaction logs, operational outcomes, and escalation rates are continuously monitored to optimize accuracy and workflow speed.",
  },
] as const;

export const platformCapabilities = [
  {
    Icon: Workflow as ElementType,
    title: "Workflow Execution Engine",
    description: "Khyra does not just reply with text; it evaluates rules, validates parameters, and triggers transactions in your backend software.",
  },
  {
    Icon: Database as ElementType,
    title: "Enterprise Systems Integration",
    description: "Native and webhook connectors for CRMs, EHRs, calendar systems, ERPs, ticketing tools, and custom business databases.",
  },
  {
    Icon: PhoneForwarded as ElementType,
    title: "Telephony & Digital Ingestion",
    description: "Connect via your existing business telephone numbers, SIP trunking, WebSockets, or embedded web-based calling.",
  },
  {
    Icon: Activity as ElementType,
    title: "Context-Aware Multi-Turn Reasoning",
    description: "Maintains situational memory across lengthy interactions, effortlessly handling interruptions, corrections, and clarifications.",
  },
  {
    Icon: ShieldCheck as ElementType,
    title: "Enterprise Governance & Security",
    description: "Role-based access control, TLS 1.3 encryption in transit, AES-256 encryption at rest, and comprehensive operational audit trails.",
  },
  {
    Icon: Globe as ElementType,
    title: "Global Multilingual Capability",
    description: "Built for international deployment with English as the primary operational layer, adaptable to regional languages as required.",
  },
  {
    Icon: Users as ElementType,
    title: "Human Escalation Safeguard",
    description: "Configurable confidence thresholds trigger warm handoffs to human operators, accompanied by structured context summaries.",
  },
  {
    Icon: Layers as ElementType,
    title: "Adaptable Architecture",
    description: "One unified operational AI foundation configured to support distinct operational roles across different departments.",
  },
] as const;

export const useCases: Record<UseCaseTab, readonly [string, string][]> = {
  "Customer Support": [
    ["Inbound Triage & FAQ", "Answers routine service questions, verifies customer identity, and provides instantaneous answers."],
    ["Ticket Generation", "Creates structured support tickets in Zendesk, Freshdesk, or Jira with categorized priority and tags."],
    ["Status Inquiries", "Looks up real-time order, shipment, or service claim status directly from internal databases."],
    ["Intelligent Human Escalation", "Transfers critical or high-frustration cases to senior support personnel with live context."],
  ],
  "Front Desk & Reception": [
    ["24/7 Call Answering", "Ensures zero missed calls after hours, on weekends, or during peak front desk rush periods."],
    ["Appointment Scheduling", "Checks live provider calendars, confirms open slots, and books appointments in real time."],
    ["Rescheduling & Cancellations", "Modifies existing appointments and frees up slots without requiring receptionist involvement."],
    ["Direction & Facility Queries", "Provides location directions, prep instructions, and parking information accurately."],
  ],
  "Sales & Lead Qualification": [
    ["Immediate Inbound Response", "Engages prospects within seconds of their call or web inquiry while interest is highest."],
    ["Rubric-Based Qualification", "Gathers budget, timeline, authority, and requirement details systematically."],
    ["Meeting Booking", "Schedules discovery consultations directly on account executives' calendars."],
    ["CRM Record Enrichment", "Logs the full qualification transcript, tags, and summary into Salesforce or HubSpot."],
  ],
  "Scheduling & Coordination": [
    ["Calendar Synchronization", "Coordinates multi-practitioner or multi-facility availability dynamically."],
    ["Automated Reminder Workflows", "Dispatches multi-channel confirmation and reminder messages to reduce no-shows."],
    ["Waitlist Management", "Notifies waitlisted clients when a cancellation occurs to maximize utilization."],
    ["Multi-Party Coordination", "Handles complex scheduling requirements involving multiple staff or resources."],
  ],
  "Service Operations": [
    ["Emergency Service Triage", "Identifies urgent breakdowns or leaks and routes immediate alerts to on-call managers."],
    ["Field Dispatch Scheduling", "Assigns service windows and dispatches field technicians based on territory and skills."],
    ["Work Order Status Updates", "Provides customers with accurate updates on technician arrival and job progress."],
    ["Case Resolution Logging", "Updates field management software when service calls are completed."],
  ],
};

export const focusedIndustries = [
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    role: "Patient Intake & Coordination",
    headline: "Automate patient scheduling, triage routing, and appointment workflows.",
    workflowExample: {
      caller: "“I need to reschedule my consultation with Dr. Lawrence for Thursday afternoon.”",
      systemAction: "Khyra queries clinic calendar, locks Thursday 3:30 PM slot, updates patient record, and sends SMS confirmation.",
    },
    software: "Epic, Cerner, Practo, Custom EHR",
  },
  {
    slug: "hospitality",
    name: "Hospitality & Hotels",
    role: "Guest Services & Reservations",
    headline: "Handle reservation changes, guest requests, and concierge inquiries 24/7.",
    workflowExample: {
      caller: "“Can we arrange late checkout at 2 PM for room 408 tomorrow?”",
      systemAction: "Khyra looks up reservation in Opera PMS, authorizes late checkout, alerts housekeeping, and sends digital pass.",
    },
    software: "Oracle Opera, Cloudbeds, FrontDesk",
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property",
    role: "Inbound Lead Qualification",
    headline: "Qualify prospective buyers and tenants, answer property specs, and book viewings.",
    workflowExample: {
      caller: "“I'm calling about the 3-bedroom downtown penthouse listed yesterday.”",
      systemAction: "Khyra captures buyer criteria, verifies pre-qualification, creates CRM lead, and schedules private tour.",
    },
    software: "Salesforce, HubSpot, LeadSquared",
  },
  {
    slug: "professional-services",
    name: "Professional & Financial Services",
    role: "Client Intake & Advisory Scheduling",
    headline: "Streamline client intake, consultation bookings, and status inquiries.",
    workflowExample: {
      caller: "“We are seeking an operational compliance audit proposal for our 200-person firm.”",
      systemAction: "Khyra collects firm scope, logs requirement brief in CRM, and books discovery call with practice lead.",
    },
    software: "Salesforce, Clio, Calendly, Microsoft 365",
  },
  {
    slug: "field-services",
    name: "Field & Home Services",
    role: "Dispatch & Service Operations",
    headline: "Coordinate emergency dispatch, job scheduling, and technician status updates.",
    workflowExample: {
      caller: "“Our commercial HVAC system is leaking water and stopped cooling.”",
      systemAction: "Khyra logs high-priority service ticket, dispatches available technician, and sends live ETA tracker.",
    },
    software: "ServiceTitan, Jobber, FieldEdge",
  },
] as const;

export const faqItems = [
  {
    question: "What makes Khyra different from a traditional chatbot or voice bot?",
    answer:
      "Traditional chatbots and voice bots are designed only for conversation: they answer frequently asked questions with script-based replies. Khyra is an operational AI system: it understands conversational context and executes real workflows inside your business systems — booking appointments, updating CRMs, querying databases, dispatching work orders, and escalating exceptions with complete context.",
  },
  {
    question: "Is voice the only interface Khyra supports?",
    answer:
      "No. Voice is one primary interface because a large percentage of high-value business interactions begin with a phone call. However, Khyra's operational engine is multi-channel: it can power voice telephony, browser-based voice calls, digital chat, and messaging workflows, executing the exact same backend business logic regardless of how the customer initiates contact.",
  },
  {
    question: "Can Khyra connect with our existing CRM, calendar, or EHR systems?",
    answer:
      "Yes. Khyra is engineered to integrate with the systems you already use rather than requiring you to overhaul your stack. We connect via secure REST APIs, webhooks, and database connectors to major platforms (such as Salesforce, HubSpot, Google Calendar, Microsoft Outlook, EHRs, and ticketing tools) as well as proprietary in-house systems.",
  },
  {
    question: "What happens when an interaction requires human judgment or escalation?",
    answer:
      "Khyra includes robust, configurable human-in-the-loop safeguards. When an inquiry falls outside predefined business policies, involves complex emotional or clinical nuances, or requires manual override, Khyra performs a seamless warm transfer to your human team, accompanied by a real-time summary transcript and extracted details.",
  },
  {
    question: "How long does deployment take and what does implementation involve?",
    answer:
      "We follow a disciplined 6-step implementation methodology: mapping your workflow, connecting your systems securely via APIs, configuring business rules, rigorous testing across realistic scenarios, going live with monitoring, and continuous refinement. Most standard deployments are live in days, while complex multi-system enterprise integrations typically take one to two weeks.",
  },
  {
    question: "Which languages and geographic regions does Khyra support?",
    answer:
      "Khyra is built for global deployment with polished English as its default operational layer. The system is designed to serve businesses across international markets, including Saudi Arabia and the GCC, Europe, North America, and Asia, with support for multilingual interaction configured according to your customer requirements.",
  },
  {
    question: "How does Khyra handle data privacy and system security?",
    answer:
      "Khyra enforces enterprise security best practices: all communication is encrypted in transit via TLS 1.3 and at rest with AES-256 encryption. We utilize strict role-based access controls (RBAC) and scoped API tokens, and we never ask clients to share sensitive administrative passwords or raw master credentials.",
  },
  {
    question: "Do we need to change our existing phone numbers?",
    answer:
      "No. Khyra is telephony agnostic. It connects to your existing phone numbers through standard SIP trunking, call forwarding, or cloud telephony bridges. You maintain full ownership of your numbers with zero disruption to your existing communications.",
  },
] as const;

export const demoFields = [
  { label: "AI Operator Role", value: "Operational AI Layer" },
  { label: "Core Execution", value: "Workflow & System Integration" },
  { label: "Deployment", value: "Enterprise Cloud" },
  { label: "Interface", value: "Voice & Multi-Channel" },
] as const;
