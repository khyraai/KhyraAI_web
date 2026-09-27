import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Layers,
  MessageSquare,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";

interface WorkflowDemoScenario {
  id: string;
  name: string;
  industry: string;
  customerPrompt: string;
  khyraResponse: string;
  steps: {
    phase: "Understand" | "Decide" | "Execute" | "Update" | "Escalate";
    title: string;
    detail: string;
  }[];
  outcome: string;
}

const SCENARIOS: WorkflowDemoScenario[] = [
  {
    id: "healthcare",
    name: "Patient Rescheduling",
    industry: "Healthcare & Clinics",
    customerPrompt: "“Hi, this is Alex Morgan. I need to reschedule my consultation with Dr. Lawrence at Horizon Health to Thursday afternoon.”",
    khyraResponse: "“Certainly, Alex. I see your current appointment for Tuesday. Dr. Lawrence has an open consultation slot at Horizon Health this Thursday at 3:30 PM. Shall I lock that in for you?”",
    steps: [
      {
        phase: "Understand",
        title: "Intent & Caller Verification",
        detail: "Recognizes patient identity from caller number, parses reschedule intent, and extracts target practitioner and time window.",
      },
      {
        phase: "Decide",
        title: "EHR Policy & Slot Verification",
        detail: "Queries clinic EHR calendar; verifies rescheduling policy (greater than 24 hours notice) and confirms open consultation slots.",
      },
      {
        phase: "Execute",
        title: "Calendar Lock & Record Update",
        detail: "Modifies appointment time in EHR, releases previous Tuesday slot to waitlist, and records reason code in patient timeline.",
      },
      {
        phase: "Update",
        title: "Multi-Channel Confirmation",
        detail: "Sends SMS and calendar invite with clinic location and prep instructions; updates reception daily schedule.",
      },
      {
        phase: "Escalate",
        title: "Escalation Guardrail",
        detail: "If patient requests a slot outside clinic hours or reports urgent symptoms, call warm-transfers to nurse triage.",
      },
    ],
    outcome: "Patient rescheduled in 45 seconds · Clinic calendar synchronized · Zero receptionist phone time",
  },
  {
    id: "hospitality",
    name: "Guest Service & Reservation",
    industry: "Hotels & Hospitality",
    customerPrompt: "“Hello, this is Tariq Al-Mansour checking in tomorrow for reservation #HK-4091. Can we request an early check-in at 11:30 AM?”",
    khyraResponse: "“Welcome back, Mr. Al-Mansour. I have pulled up reservation #HK-4091 at Horizon Grand. Room 504 is available for early check-in at 11:30 AM. I have approved your request and updated housekeeping.”",
    steps: [
      {
        phase: "Understand",
        title: "Reservation & Request Extraction",
        detail: "Extracts reservation code #HK-4091, identifies guest profile, and parses early check-in time preference.",
      },
      {
        phase: "Decide",
        title: "PMS Availability Check",
        detail: "Queries Oracle Opera PMS for prior-night occupancy and housekeeping turnover status for the executive suite tier.",
      },
      {
        phase: "Execute",
        title: "PMS Authorization & Housekeeping Flag",
        detail: "Updates reservation record to approved early arrival, flags room for priority morning cleaning, and logs guest preference.",
      },
      {
        phase: "Update",
        title: "Digital Key & Pass Notification",
        detail: "Dispatches SMS confirmation with directions and prepares digital room pass for mobile arrival.",
      },
      {
        phase: "Escalate",
        title: "Front Desk Alert",
        detail: "If suite is occupied and early check-in cannot be guaranteed, coordinates luggage drop-off and notifies front desk.",
      },
    ],
    outcome: "PMS updated instantly · Housekeeping alerted · Front desk phone call eliminated",
  },
  {
    id: "real-estate",
    name: "Buyer Lead Qualification",
    industry: "Real Estate & Property",
    customerPrompt: "“I saw your listing for the 3-bedroom Central District penthouse. What is the asking price and can Daniel Carter view it this weekend?”",
    khyraResponse: "“The penthouse is listed at $1.2M / SAR 4.5M with private terrace access. To prepare Daniel's viewing, are you looking to purchase with financing or cash, and what is your move-in timeframe?”",
    steps: [
      {
        phase: "Understand",
        title: "Listing Match & Buyer Intent",
        detail: "Identifies property listing ID from speech, matches against current inventory, and notes tour request intent.",
      },
      {
        phase: "Decide",
        title: "Lead Scoring & Agent Availability",
        detail: "Applies broker qualification rubric (budget, timeline, financing); checks listing broker's tour calendar.",
      },
      {
        phase: "Execute",
        title: "CRM Creation & Tour Lock",
        detail: "Creates new lead record in Salesforce, tags high-intent criteria, and books private showing slot for Saturday 11 AM.",
      },
      {
        phase: "Update",
        title: "Brief to Broker & Buyer Confirmation",
        detail: "Dispatches verified buyer brief to listing agent via WhatsApp/Slack and sends tour location details to prospect.",
      },
      {
        phase: "Escalate",
        title: "Immediate Broker Patch",
        detail: "If buyer indicates institutional fund or immediate all-cash closing, live transfers call directly to senior partner.",
      },
    ],
    outcome: "Inbound buyer qualified · Salesforce CRM updated · Private tour booked without manual lag",
  },
  {
    id: "field-services",
    name: "Urgent Service Dispatch",
    industry: "Field & Home Services",
    customerPrompt: "“Our warehouse commercial refrigeration unit at 440 Industrial Parkway just failed and temperature is rising rapidly.”",
    khyraResponse: "“I understand this is an emergency. I have logged high-priority commercial refrigeration failure for your warehouse at 440 Industrial Parkway. Technician Marcus is nearby and dispatched for arrival by 1:15 PM.”",
    steps: [
      {
        phase: "Understand",
        title: "Emergency Triage & Location Match",
        detail: "Detects commercial refrigeration breakdown keyword, flags urgency score as critical, and matches caller business address.",
      },
      {
        phase: "Decide",
        title: "Technician Territory & Skills Match",
        detail: "Queries dispatch system for technicians certified in commercial refrigeration with open capacity within 10 miles.",
      },
      {
        phase: "Execute",
        title: "Work Order Creation & Dispatch",
        detail: "Creates urgent dispatch ticket in ServiceTitan, reserves slot on technician Marcus's device, and locks required parts.",
      },
      {
        phase: "Update",
        title: "Live Tracking & Facility Notification",
        detail: "Dispatches SMS to facility manager with technician ETA tracker and emergency shutdown instructions.",
      },
      {
        phase: "Escalate",
        title: "Operations Supervisor Alert",
        detail: "Auto-pages field operations manager via phone if no certified tech accepts within 4 minutes.",
      },
    ],
    outcome: "Critical breakdown triaged · Work order created · Technician dispatched in under 90 seconds",
  },
];

export function WorkflowExecutionSection() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("healthcare");

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  return (
    <RevealSection id="workflow-engine" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <Workflow className="h-3.5 w-3.5" />
          The Execution Engine
        </div>
        <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl lg:text-6xl leading-[1.08]">
          Khyra doesn't just hold a conversation.{" "}
          <span className="italic text-primary">It executes the work.</span>
        </h2>
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
          Traditional voice bots stop after giving a canned answer. Khyra bridges the gap between conversational understanding and backend business execution across your existing software stack.
        </p>
      </div>

      {/* The 5-Step Operational Pipeline Banner */}
      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { num: "01", name: "Understand", desc: "Intent, entities, caller profile" },
          { num: "02", name: "Decide", desc: "Business rules, policies, availability" },
          { num: "03", name: "Execute", desc: "APIs, database updates, bookings" },
          { num: "04", name: "Update", desc: "Customer confirmations & audit logs" },
          { num: "05", name: "Escalate", desc: "Human handoff when thresholds require" },
        ].map((step, idx) => (
          <div
            key={step.name}
            className="group relative rounded-2xl border border-border/80 bg-background/90 p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{step.num}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
            </div>
            <div className="mt-3 font-display text-xl text-ink font-semibold">{step.name}</div>
            <div className="mt-1 text-xs text-muted-foreground leading-normal">{step.desc}</div>
          </div>
        ))}
      </div>

      {/* Interactive Live Scenario Simulation */}
      <div className="mt-16 rounded-3xl border border-border/90 bg-card p-6 md:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Interactive Workflow Demonstration
            </span>
            <h3 className="mt-1 font-display text-2xl text-ink md:text-3xl">
              Inspect how Khyra performs work end-to-end
            </h3>
          </div>

          {/* Workflow Scenario Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveScenarioId(s.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  activeScenarioId === s.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Dialogue Box */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left: Conversational Exchange (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-border/80 bg-beige/30 p-6">
            <div className="space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Channel: Phone Call or Digital Interface
              </div>

              {/* Caller bubble */}
              <div className="rounded-xl border border-border bg-white p-4 text-sm leading-relaxed text-ink shadow-2xs">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Customer / Caller
                </span>
                {scenario.customerPrompt}
              </div>

              {/* Khyra response bubble */}
              <div className="rounded-xl bg-primary p-4 text-sm leading-relaxed text-primary-foreground shadow-xs">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-primary-foreground/70 mb-1">
                  Khyra Operational AI
                </span>
                {scenario.khyraResponse}
              </div>
            </div>

            {/* Bottom Outcome Strip */}
            <div className="mt-6 border-t border-border/60 pt-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
                Completed Operational Outcome
              </div>
              <p className="text-xs font-medium text-foreground/90">
                {scenario.outcome}
              </p>
            </div>
          </div>

          {/* Right: Step-by-Step Backend Systems Execution (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2">
              Executed Backend Workflow Stages
            </div>

            {scenario.steps.map((st, i) => (
              <div
                key={st.phase}
                className="flex items-start gap-4 rounded-xl border border-border/60 bg-background/80 p-4 transition-all hover:border-primary/30"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
                  0{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-ink">{st.title}</h4>
                    <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {st.phase}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {st.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>All system transactions logged with full audit trail and rollback safety.</span>
          </div>

          <BookDemoButton className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90">
            Schedule a Workflow Audit <ArrowRight className="h-3.5 w-3.5" />
          </BookDemoButton>
        </div>
      </div>
    </RevealSection>
  );
}
