import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, PhoneCall, Cpu, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { INDUSTRIES, type Industry } from "@/data/industries";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Voice-to-Action Interactive Visual Stage (The Core Differentiator)
// "A customer calls → Khyra understands → Khyra takes business action"
// ─────────────────────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: "healthcare",
    industry: "Healthcare & Clinics",
    callerPrompt: "“Hi, I need to reschedule my root canal consult with Dr. Jacob to Wednesday afternoon.”",
    understanding: {
      intent: "RescheduleAppointment",
      caller: "John Smith (+91 98765 43210)",
      targetDoctor: "Dr. Jacob",
      requestedSlot: "Wednesday 03:30 PM",
    },
    actionExecuted: [
      "Searched patient record in EHR database",
      "Locked 03:30 PM slot for Dr. Jacob (#8942)",
      "Dispatched DLT SMS confirmation to patient",
    ],
    softwareBadge: "Clinic EHR & Calendar Sync",
    accentHex: "#16a34a",
  },
  {
    id: "real-estate",
    industry: "Real Estate",
    callerPrompt: "“Looking for a 3BHK in Koramangala under ₹2.5 Cr with ready possession.”",
    understanding: {
      intent: "PropertyLeadQualification",
      caller: "Priya Sharma (+91 98123 45678)",
      budget: "₹2.5 Cr",
      specs: "3BHK, Koramangala, Ready Possession",
    },
    actionExecuted: [
      "Qualified lead score (92/100 High Intent)",
      "Created lead profile in Salesforce CRM",
      "Sent site tour booking calendar via WhatsApp",
    ],
    softwareBadge: "Salesforce CRM Integration",
    accentHex: "#1d4ed8",
  },
  {
    id: "hotels-hospitality",
    industry: "Hotels & Hospitality",
    callerPrompt: "“Can we request an early check-in at 11 AM for Reservation #HK-4091 tomorrow?”",
    understanding: {
      intent: "EarlyCheckInRequest",
      caller: "Rahul Verma (+91 99887 66554)",
      resId: "HK-4091",
      requestedTime: "11:00 AM Tomorrow",
    },
    actionExecuted: [
      "Looked up reservation status in Opera PMS",
      "Flagged Room #304 for priority housekeeping",
      "Sent instant SMS confirmation with early check-in pass",
    ],
    softwareBadge: "Opera PMS Live Bridge",
    accentHex: "#d97706",
  },
];

export function VoiceToActionStage() {
  const [activeScenario, setActiveScenario] = useState(0);
  const reveal = useScrollReveal();
  const current = SCENARIOS[activeScenario];

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-20 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      {/* Editorial Header */}
      <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border/60 pb-8 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Core Architecture
          </span>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl leading-tight">
            Voice in. <span className="italic text-primary">Business action out.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          Khyra doesn't just hold conversation. It connects every call directly to your software stack, updating databases and locking schedules in real time.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="mb-10 flex flex-wrap gap-3">
        {SCENARIOS.map((scen, idx) => (
          <button
            key={scen.id}
            onClick={() => setActiveScenario(idx)}
            className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
              activeScenario === idx
                ? "bg-ink text-white shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-ink"
            }`}
          >
            <span className="font-mono opacity-60">0{idx + 1}</span>
            <span>{scen.industry}</span>
          </button>
        ))}
      </div>

      {/* 3-Step Pipeline Stage */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Step 01: Inbound Call */}
        <div className="lg:col-span-4 rounded-2xl border border-border/60 bg-secondary/20 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                01 / INBOUND CALL
              </span>
              <PhoneCall className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Customer speaks
            </div>
            <p className="font-display text-lg text-ink leading-relaxed italic">
              {current.callerPrompt}
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
            Latency: &lt; 800ms • Audio Stream Input
          </div>
        </div>

        {/* Step 02: Real-Time Understanding */}
        <div className="lg:col-span-4 rounded-2xl border border-border/60 bg-secondary/20 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                02 / CONTEXT NLU
              </span>
              <Cpu className="h-4 w-4 text-primary" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Khyra extracts intent
            </div>

            <div className="space-y-2 font-mono text-xs bg-background/80 p-3.5 rounded-xl border border-border/60">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Intent:</span>
                <span className="font-semibold text-primary">{current.understanding.intent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Caller:</span>
                <span className="text-ink">{current.understanding.caller}</span>
              </div>
              {current.understanding.targetDoctor && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor:</span>
                  <span className="text-ink">{current.understanding.targetDoctor}</span>
                </div>
              )}
              {current.understanding.specs && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Criteria:</span>
                  <span className="text-ink">{current.understanding.specs}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
            Zero-Shot Domain Engine • 11 Languages
          </div>
        </div>

        {/* Step 03: System Action Executed */}
        <div className="lg:col-span-4 rounded-2xl border border-border/60 bg-background p-6 shadow-lg flex flex-col justify-between relative overflow-hidden"
          style={{ borderColor: `${current.accentHex}40` }}
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-xs font-semibold" style={{ color: current.accentHex }}>
                03 / SYSTEM ACTION
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: `${current.accentHex}15`, color: current.accentHex }}
              >
                {current.softwareBadge}
              </span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Business action taken
            </div>

            <div className="space-y-3">
              {current.actionExecuted.map((act) => (
                <div key={act} className="flex items-start gap-2.5 text-xs font-medium text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 pt-0.5" style={{ color: current.accentHex }} />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>Webhook Executed</span>
            <span className="text-emerald-600 font-semibold">● 200 OK</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Numbered Industry Specification Rows (Replacing 3-Column Card Grid)
// Layout: Full-width typographic specification rows with thin dividers
// ─────────────────────────────────────────────────────────────────────────────
export function NumberedIndustryList() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-20 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      {/* Section Header */}
      <div className="mb-12 border-b border-border/60 pb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Vertical Implementations
          </span>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            9 Verticals. <span className="italic text-primary">Pre-trained out of the box.</span>
          </h2>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Select any vertical to explore workflows →
        </span>
      </div>

      {/* Numbered Specification Rows (Dividers only) */}
      <div className="border-t border-border/60 divide-y divide-border/60">
        {INDUSTRIES.map((ind, index) => {
          const isHovered = hoveredSlug === ind.slug;
          const step1 = ind.callFlowSteps[0] || { title: "Call arrives", detail: "Inbound voice query" };
          const stepEnd = ind.callFlowSteps[ind.callFlowSteps.length - 1] || { title: "Action completed", detail: "Record updated" };

          return (
            <Link
              key={ind.slug}
              to={`/industries/${ind.slug}` as any}
              onMouseEnter={() => setHoveredSlug(ind.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className={`group block py-8 px-4 -mx-4 rounded-xl transition-all duration-300 ${
                isHovered ? "bg-secondary/30" : "hover:bg-secondary/15"
              }`}
            >
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                {/* Left Number (2 cols) */}
                <div className="md:col-span-2 flex items-center gap-4">
                  <span
                    className="font-display text-2xl md:text-3xl transition-colors duration-300"
                    style={{ color: isHovered ? ind.accentHex : "rgba(0,0,0,0.25)" }}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className="h-2 w-2 rounded-full transition-transform duration-300 md:hidden"
                    style={{ backgroundColor: ind.accentHex }}
                  />
                </div>

                {/* Middle Industry Title & Tagline (4 cols) */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="hidden md:inline-block h-2 w-2 rounded-full transition-transform duration-300"
                      style={{
                        backgroundColor: ind.accentHex,
                        transform: isHovered ? "scale(1.25)" : "scale(1)",
                      }}
                    />
                    <h3 className="font-display text-2xl md:text-3xl text-ink group-hover:text-primary transition-colors">
                      {ind.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                    {ind.heroHeadline}
                  </p>
                </div>

                {/* Right Call-to-Action Workflow Story (5 cols) */}
                <div className="md:col-span-5 border-l border-border/40 pl-4 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink">Call Prompt:</span>
                    <span className="text-muted-foreground italic truncate max-w-[200px]">{step1.detail}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold" style={{ color: ind.accentHex }}>Action Executed:</span>
                    <span className="font-medium text-ink truncate max-w-[200px]">{stepEnd.detail}</span>
                  </div>
                </div>

                {/* Far Right Arrow (1 col) */}
                <div className="md:col-span-1 flex justify-end">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? ind.accentHex : "transparent",
                      color: isHovered ? "#fff" : "rgba(0,0,0,0.4)",
                    }}
                  >
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-0.5" : ""}`} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Vertical Integration Matrix (Software Ecosystem Specification)
// Editorial table comparing Intent vs Software Systems across industries
// ─────────────────────────────────────────────────────────────────────────────
const MATRIX_DATA = [
  { industry: "Healthcare & Clinics", intent: "Triage & Appointment Booking", software: "Practo, Hospital EHR, Custom HIS", latency: "< 800ms" },
  { industry: "Real Estate", intent: "Lead Qualification & Site Tour", software: "Salesforce, HubSpot, LeadSquared", latency: "< 750ms" },
  { industry: "Salons & Wellness", intent: "Service Booking & Reschedule", software: "Vagaro, Fresha, Zenith", latency: "< 820ms" },
  { industry: "Hotels & Hospitality", intent: "Guest Requests & Check-In", software: "Oracle Opera, Cloudbeds, PMS", latency: "< 790ms" },
  { industry: "Veterinary Clinics", intent: "Emergency Triage & Visit Lock", software: "Vetport, ClinicHQ", latency: "< 810ms" },
  { industry: "Education", intent: "Applicant Inquiry & Counseling", software: "ExtraaEdge, LeadSquared CRM", latency: "< 830ms" },
  { industry: "IT Services", intent: "Tier-1 Voice Diagnostics", software: "Zendesk, ServiceNow, Jira", latency: "< 760ms" },
  { industry: "Cosmetic Clinics", intent: "Consult Deposit & Booking", software: "Aesthetic Record, Zenoti", latency: "< 840ms" },
  { industry: "Dental Practices", intent: "Hygiene & Emergency Lock", software: "Dentrix, OpenDental EHR", latency: "< 800ms" },
];

export function VerticalMatrixSection() {
  const reveal = useScrollReveal();
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-20 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-12 border-b border-border/60 pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Ecosystem Integrations
        </span>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          Integrates with your existing software stack.
        </h2>
      </div>

      {/* Editorial Specification Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border/80 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="py-4 pr-6">Vertical</th>
              <th className="py-4 px-6">Primary Voice Intent</th>
              <th className="py-4 px-6">Software & EHR Stack</th>
              <th className="py-4 pl-6 text-right">Voice Response Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-medium">
            {MATRIX_DATA.map((row) => (
              <tr key={row.industry} className="hover:bg-secondary/20 transition-colors">
                <td className="py-5 pr-6 font-semibold text-ink">{row.industry}</td>
                <td className="py-5 px-6 text-muted-foreground">{row.intent}</td>
                <td className="py-5 px-6 text-ink font-mono text-xs">{row.software}</td>
                <td className="py-5 pl-6 text-right font-mono text-xs text-emerald-600 font-semibold">{row.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Custom Vertical Deployment CTA Section
// Dark editorial layout with left-aligned headline & clean actions
// ─────────────────────────────────────────────────────────────────────────────
export function CustomVerticalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-12">
      <div
        className="relative overflow-hidden rounded-3xl p-10 md:p-16"
        style={{ background: "oklch(0.13 0.03 165)" }}
      >
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Custom Vertical Engineering
          </span>
          <h2 className="mt-4 font-display text-4xl text-white md:text-5xl leading-tight">
            Don't see your vertical? <br />
            <span className="italic text-white/70">Trained on your workflow in 48 hours.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/60">
            Khyra's zero-shot conversational architecture configures to any appointment-driven, lead-qualification, or customer-coordination operational workflow.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BookDemoButton className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition hover:bg-white/90 active:scale-[0.98]">
              Book a custom demo <ArrowRight className="h-4 w-4" />
            </BookDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
