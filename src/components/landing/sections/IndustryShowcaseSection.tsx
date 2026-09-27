import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Stethoscope,
  Building2,
  Hotel,
  Users,
  Truck,
  CheckCircle2,
  ChevronRight,
  Database,
  Workflow,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";

interface IndustryCardData {
  slug: string;
  routeSlug?: string;
  name: string;
  tagline: string;
  targetBuyer: string;
  operationalRoles: string[];
  exampleWorkflow: {
    callerPrompt: string;
    khyraAction: string;
    systemsUpdated: string;
  };
  supportedStack: string;
  Icon: typeof Stethoscope;
  accentHex: string;
}

const TARGET_INDUSTRIES: IndustryCardData[] = [
  {
    slug: "healthcare",
    routeSlug: "healthcare",
    name: "Healthcare & Clinics",
    tagline: "Every patient call ends with the next clinical step executed.",
    targetBuyer: "Specialty clinics, medical practices, dental centers & outpatient facilities",
    operationalRoles: [
      "Front desk call handling",
      "Patient scheduling & rescheduling",
      "EHR appointment sync",
      "Emergency clinical triage routing",
    ],
    exampleWorkflow: {
      callerPrompt: "“I need to reschedule Alex Morgan's consultation with Dr. Lawrence to Thursday afternoon.”",
      khyraAction: "Queries Horizon Health EHR calendar, verifies doctor availability, locks Thursday 3:30 PM slot, and sends patient SMS confirmation.",
      systemsUpdated: "Epic / Cerner / Practo EHR · Google Calendar · Twilio SMS",
    },
    supportedStack: "EHRs (Epic, Cerner, Practo), Clinic Calendars, SMS & VoIP",
    Icon: Stethoscope,
    accentHex: "#16a34a",
  },
  {
    slug: "hospitality",
    routeSlug: "hotels-hospitality",
    name: "Hotels & Hospitality",
    tagline: "Answer guest requests and modify bookings without front desk bottlenecks.",
    targetBuyer: "Hotels, luxury resorts, boutique stays & serviced residences",
    operationalRoles: [
      "24/7 guest call reception",
      "Reservation inquiry & modifications",
      "Late checkout / early arrival authorization",
      "Housekeeping & concierge dispatch",
    ],
    exampleWorkflow: {
      callerPrompt: "“Can we arrange an early check-in at 11:30 AM for reservation #HK-4091 tomorrow?”",
      khyraAction: "Looks up reservation in Opera PMS, verifies room turnover status, authorizes early arrival, and alerts housekeeping.",
      systemsUpdated: "Oracle Opera PMS · Cloudbeds · Housekeeping Task Engine",
    },
    supportedStack: "Oracle Opera, Cloudbeds, FrontDesk Anywhere, Twilio SIP",
    Icon: Hotel,
    accentHex: "#d97706",
  },
  {
    slug: "real-estate",
    routeSlug: "real-estate",
    name: "Real Estate & Property",
    tagline: "Never lose a high-value property buyer to an unanswered inquiry.",
    targetBuyer: "Property developers, commercial brokers, leasing teams & agencies",
    operationalRoles: [
      "Inbound buyer & tenant qualification",
      "Property availability & pricing lookup",
      "Private viewing tour scheduling",
      "CRM prospect record enrichment",
    ],
    exampleWorkflow: {
      callerPrompt: "“I saw your listing for the 3-bedroom Central District penthouse. Can I schedule a private tour this Friday?”",
      khyraAction: "Verifies buyer criteria, captures timeline & financing status, creates Salesforce lead, and books broker tour slot.",
      systemsUpdated: "Salesforce CRM · HubSpot · Broker Tour Calendar · WhatsApp",
    },
    supportedStack: "Salesforce, HubSpot, LeadSquared, Calendly, WhatsApp API",
    Icon: Building2,
    accentHex: "#1d4ed8",
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    tagline: "Automate intake, client qualification, and consultation bookings.",
    targetBuyer: "Corporate advisory firms, accounting practices, legal teams & consultancies",
    operationalRoles: [
      "Inbound inquiry qualification",
      "Initial scope & requirement capture",
      "Partner consultation booking",
      "Practice management system sync",
    ],
    exampleWorkflow: {
      callerPrompt: "“We are looking for an operational compliance audit proposal for our 200-person organization.”",
      khyraAction: "Gathers company size and audit requirements, logs proposal scope in CRM, and schedules discovery call with practice lead.",
      systemsUpdated: "HubSpot CRM · Clio · Microsoft Outlook · Teams / Zoom",
    },
    supportedStack: "HubSpot, Salesforce, Clio, Microsoft 365, Google Workspace",
    Icon: Users,
    accentHex: "#8b5cf6",
  },
  {
    slug: "field-services",
    name: "Field & Home Services",
    tagline: "Triage urgent service requests and dispatch technicians in real time.",
    targetBuyer: "Commercial HVAC, electrical, plumbing, maintenance & facility contractors",
    operationalRoles: [
      "24/7 emergency dispatch intake",
      "Technician territory & skill matching",
      "Work order creation & scheduling",
      "Customer arrival ETA notifications",
    ],
    exampleWorkflow: {
      callerPrompt: "“Our commercial HVAC system is leaking water and stopped cooling the server room at 440 Industrial Parkway.”",
      khyraAction: "Flags emergency priority, creates work order in ServiceTitan, dispatches nearest certified technician, and texts live ETA tracker.",
      systemsUpdated: "ServiceTitan · Jobber · Technician Mobile Dispatch · Customer SMS",
    },
    supportedStack: "ServiceTitan, Jobber, FieldEdge, Custom Dispatch APIs",
    Icon: Truck,
    accentHex: "#0ea5e9",
  },
];

export function IndustryShowcaseSection() {
  const [activeSlug, setActiveSlug] = useState("healthcare");
  const reveal = useScrollReveal();

  const active = TARGET_INDUSTRIES.find((i) => i.slug === activeSlug) || TARGET_INDUSTRIES[0];
  const ActiveIcon = active.Icon;

  return (
    <section
      ref={reveal.ref}
      id="industries"
      className="mx-auto max-w-7xl px-6 py-24 sm:py-32 border-t border-border/70"
    >
      {/* Header */}
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Targeted Industry Deployments
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink md:text-5xl leading-tight">
            High-impact operational AI.{" "}
            <span className="italic text-primary">Configured for your vertical.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            We focus on industries where conversation volume is high, response speed is critical, and every interaction ties directly into backend business systems.
          </p>
        </div>
        <Link
          to="/industries"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:translate-x-1 shrink-0"
        >
          View all industry architectures <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Split Interactive Layout */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left Column: 5 Target Industries List (5 cols) */}
        <div className="lg:col-span-5 space-y-2 border-l border-border/60 pl-4 sm:pl-6">
          {TARGET_INDUSTRIES.map((ind) => {
            const isActive = ind.slug === activeSlug;
            const IconComponent = ind.Icon;

            return (
              <button
                key={ind.slug}
                onClick={() => setActiveSlug(ind.slug)}
                className={`group flex w-full items-center justify-between p-4 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? "bg-secondary/80 text-ink shadow-xs border border-border/60"
                    : "text-muted-foreground hover:text-ink hover:bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                    style={{
                      backgroundColor: `${ind.accentHex}15`,
                    }}
                  >
                    <IconComponent
                      className="h-4 w-4"
                      style={{ color: ind.accentHex }}
                    />
                  </span>
                  <div>
                    <span className="block text-sm font-semibold text-ink">{ind.name}</span>
                    <span className="block text-[11px] text-muted-foreground line-clamp-1">
                      {ind.operationalRoles[0]}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    isActive ? "translate-x-0 opacity-100 text-primary" : "-translate-x-1 opacity-20 group-hover:opacity-60"
                  }`}
                />
              </button>
            );
          })}

          <div className="pt-4 pl-2">
            <span className="text-xs text-muted-foreground">
              Need a custom workflow for your industry?{" "}
              <Link to="/book-demo" className="text-primary font-semibold hover:underline">
                Talk to our solutions team →
              </Link>
            </span>
          </div>
        </div>

        {/* Right Column: Display Stage (7 cols) */}
        <div className="lg:col-span-7">
          <div
            key={active.slug}
            className="rounded-3xl border border-border/80 bg-background/90 p-8 sm:p-10 shadow-lg transition-all duration-300"
            style={{
              borderColor: `${active.accentHex}30`,
            }}
          >
            {/* Header tag & target buyer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${active.accentHex}18` }}
                >
                  <ActiveIcon className="h-5 w-5" style={{ color: active.accentHex }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink">{active.name}</h3>
                  <p className="text-xs text-muted-foreground">{active.targetBuyer}</p>
                </div>
              </div>

              <span
                className="rounded-full px-3 py-1 text-xs font-mono font-medium border"
                style={{
                  backgroundColor: `${active.accentHex}10`,
                  borderColor: `${active.accentHex}30`,
                  color: active.accentHex,
                }}
              >
                {active.operationalRoles.length} Operational Roles
              </span>
            </div>

            {/* Headline */}
            <div className="mt-6">
              <p className="font-display text-2xl sm:text-3xl text-ink leading-snug">
                “{active.tagline}”
              </p>
            </div>

            {/* Operational Roles list */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                What Khyra Handles in this Industry:
              </h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {active.operationalRoles.map((role) => (
                  <div key={role} className="flex items-center gap-2 text-xs font-medium text-foreground/90">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concrete Workflow Example Card */}
            <div className="mt-8 rounded-2xl border border-border/80 bg-secondary/30 p-5">
              <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Workflow className="h-3.5 w-3.5" />
                  Live Workflow Execution Example
                </span>
                <span className="text-[10px] text-muted-foreground">Automated Turn</span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Caller Interaction:
                  </span>
                  <p className="text-xs italic text-foreground font-medium bg-background/80 p-2.5 rounded-lg border border-border/50">
                    {active.exampleWorkflow.callerPrompt}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary block mb-0.5">
                    Khyra Operational Execution:
                  </span>
                  <p className="text-xs text-foreground/90 bg-background/80 p-2.5 rounded-lg border border-border/50 leading-relaxed">
                    {active.exampleWorkflow.khyraAction}
                  </p>
                </div>

                <div className="pt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                  <Database className="h-3 w-3 text-primary" />
                  <span>Systems: {active.exampleWorkflow.systemsUpdated}</span>
                </div>
              </div>
            </div>

            {/* Bottom Stack & CTA */}
            <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Supported Stack: </span>
                {active.supportedStack}
              </div>

              <div className="flex items-center gap-3">
                {active.routeSlug ? (
                  <Link
                    to={`/industries/${active.routeSlug}` as any}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    Deep dive <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <BookDemoButton className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                    Schedule demo <ArrowRight className="h-3.5 w-3.5" />
                  </BookDemoButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
