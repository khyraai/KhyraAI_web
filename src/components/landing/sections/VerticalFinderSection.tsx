import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Stethoscope, Building2, Sparkles, Hotel, GraduationCap, Server, PawPrint, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const VERTICAL_PROFILES = [
  {
    id: "healthcare",
    name: "Medical & Specialist Clinics",
    badge: "Healthcare & EHR Integration",
    Icon: Stethoscope,
    slug: "healthcare",
    accentHex: "#22c55e",
    question: "“Will Khyra handle patient appointments and emergency triage?”",
    exampleCall: "“I need to book a consultation with Dr. Mehta for tomorrow afternoon.”",
    systemAction: "Khyra searches patient database by phone (+91 98765 43210), locks 06:30 PM slot in Clinic EHR, and dispatches SMS confirmation.",
    software: "Practo, Hospital EHR, Custom HIS",
  },
  {
    id: "real-estate",
    name: "Real Estate & Property Developers",
    badge: "Real Estate & CRM Integration",
    Icon: Building2,
    slug: "real-estate",
    accentHex: "#1d4ed8",
    question: "“Will Khyra capture property leads while agents are in the field?”",
    exampleCall: "“Looking for a 3BHK in Koramangala under ₹2.5 Cr with ready possession.”",
    systemAction: "Khyra rates lead intent score (92/100), creates contact in Salesforce CRM, and sends site visit booking calendar via WhatsApp.",
    software: "Salesforce, HubSpot, LeadSquared",
  },
  {
    id: "hotels-hospitality",
    name: "Hotels, Resorts & Hospitality",
    badge: "Hotels & PMS Integration",
    Icon: Hotel,
    slug: "hotels-hospitality",
    accentHex: "#d97706",
    question: "“Will Khyra answer guest requests in multiple languages?”",
    exampleCall: "“Can we request an early check-in at 11 AM for Reservation #HK-4091 tomorrow?”",
    systemAction: "Khyra looks up reservation in Opera PMS, flags room for priority housekeeping, and dispatches early check-in pass via SMS.",
    software: "Oracle Opera PMS, Cloudbeds, Front Desk",
  },
  {
    id: "salons-wellness",
    name: "Salons, Spas & Wellness Centers",
    badge: "Salons & Calendar Sync",
    Icon: Sparkles,
    slug: "salons-wellness",
    accentHex: "#db2777",
    question: "“Will Khyra book client appointments without front desk staff?”",
    exampleCall: "“Can I book a haircut and blow-dry this Saturday at 3 PM with Priya?”",
    systemAction: "Khyra checks stylist availability in Vagaro, locks the appointment slot, and sends automatic confirmation SMS.",
    software: "Vagaro, Fresha, Zenith",
  },
  {
    id: "education",
    name: "Education & Academies",
    badge: "Education & Admissions CRM",
    Icon: GraduationCap,
    slug: "education",
    accentHex: "#4f46e5",
    question: "“Will Khyra qualify student inquiries and schedule interviews?”",
    exampleCall: "“What are the eligibility criteria and tuition fee structure for the Data Science program?”",
    systemAction: "Khyra details fee breakdown, qualifies student candidate profile, and schedules admissions interview in LeadSquared.",
    software: "ExtraaEdge, LeadSquared CRM",
  },
];

export function VerticalFinderSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const reveal = useScrollReveal();
  const current = VERTICAL_PROFILES[selectedIdx];
  const CurrentIcon = current.Icon;

  return (
    <section
      ref={reveal.ref}
      className="mx-auto max-w-7xl px-6 py-24 sm:py-32 border-t border-border/60"
    >
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Interactive Vertical Finder
        </span>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl leading-tight">
          Will Khyra work for <span className="italic text-primary">your business?</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Select your business type below to see the exact call flow, backend software integration, and business outcome Khyra delivers out of the box.
        </p>
      </div>

      {/* Grid Layout: Left Selector (5 cols), Right Live Outcome Stage (7 cols) */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Business Type Buttons */}
        <div className="lg:col-span-5 space-y-2">
          {VERTICAL_PROFILES.map((prof, idx) => {
            const isSelected = selectedIdx === idx;
            const ProfileIcon = prof.Icon;

            return (
              <button
                key={prof.id}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 border ${
                  isSelected
                    ? "bg-background border-border/80 shadow-md"
                    : "border-transparent text-muted-foreground hover:bg-secondary/40 hover:text-ink"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                    style={{
                      backgroundColor: isSelected ? `${prof.accentHex}18` : "rgba(0,0,0,0.04)",
                    }}
                  >
                    <ProfileIcon
                      className="h-4 w-4"
                      style={{ color: isSelected ? prof.accentHex : "inherit" }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? "text-ink font-semibold" : ""}`}>
                    {prof.name}
                  </span>
                </div>
                <ArrowRight
                  className={`h-4 w-4 transition-transform ${
                    isSelected ? "translate-x-0 text-ink" : "-translate-x-2 opacity-0"
                  }`}
                />
              </button>
            );
          })}

          <div className="pt-6">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-primary transition hover:translate-x-1"
            >
              <span>Explore all 7 verticals & software integrations</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Outcome & Workflow Display Stage */}
        <div className="lg:col-span-7">
          <div
            className="rounded-3xl border border-border/60 p-8 sm:p-10 transition-all duration-500 shadow-xl"
            style={{ backgroundColor: `${current.accentHex}06` }}
          >
            {/* Top Tag & Software Stack */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${current.accentHex}18` }}
                >
                  <CurrentIcon className="h-4 w-4" style={{ color: current.accentHex }} />
                </div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: current.accentHex }}
                >
                  {current.badge}
                </span>
              </div>
              <span className="text-xs font-mono font-medium px-3 py-1 rounded-full border border-border/60 bg-background/80 text-muted-foreground">
                Stack: {current.software}
              </span>
            </div>

            {/* Core Question */}
            <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-6">
              {current.question}
            </h3>

            {/* Simulated Live Call Flow Card */}
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-2xl border border-border/60 bg-background/90 shadow-sm">
                <div className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  1. Customer Call Example
                </div>
                <p className="text-sm font-medium text-ink italic">
                  {current.exampleCall}
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-border/60 bg-background/90 shadow-sm">
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono font-semibold uppercase tracking-wider mb-1" style={{ color: current.accentHex }}>
                  <span>2. Khyra Voice AI System Execution</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {current.systemAction}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-border/40 flex items-center justify-between">
              <Link
                to={`/industries/${current.slug}` as any}
                className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-xs font-semibold text-white transition-all hover:opacity-90 shadow-md"
                style={{ backgroundColor: current.accentHex }}
              >
                <span>Check {current.name} live workflow</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/book-demo"
                className="text-xs font-medium text-muted-foreground hover:text-ink transition-colors"
              >
                Book a demo →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
