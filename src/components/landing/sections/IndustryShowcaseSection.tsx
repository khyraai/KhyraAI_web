import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Stethoscope, Building2, Sparkles, Hotel, PawPrint, GraduationCap, Server, Activity, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const INDUSTRIES = [
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    outcome: "Every patient call ends with the next step booked.",
    detail: "HIPAA-compliant voice AI that triage calls, schedules appointments in your EHR, and answers post-visit FAQs 24/7.",
    metric: "3.2× more bookings captured after hours",
    Icon: Stethoscope,
    accentHex: "#16a34a",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    outcome: "Never lose a property lead to an unanswered ring.",
    detail: "Qualifies buyers, captures property criteria, sends tour links via SMS, and books agent calendar slots instantly.",
    metric: "< 5s response time on inbound property inquiries",
    Icon: Building2,
    accentHex: "#1d4ed8",
  },
  {
    slug: "salons-wellness",
    name: "Salons & Wellness",
    outcome: "Fill appointment slots while staff focus on clients.",
    detail: "Handles booking, reschedules, service inquiries, and confirmation texts so your stylists never have to touch a phone.",
    metric: "45% reduction in appointment no-shows",
    Icon: Sparkles,
    accentHex: "#db2777",
  },
  {
    slug: "hotels-hospitality",
    name: "Hotels & Hospitality",
    outcome: "Answer guest requests before they reach front desk.",
    detail: "Handles room inquiries, amenities info, early check-in requests, and direct booking transfers in 30+ languages.",
    metric: "68% of front desk phone calls automated",
    Icon: Hotel,
    accentHex: "#d97706",
  },
  {
    slug: "veterinary",
    name: "Veterinary Clinics",
    outcome: "24/7 triage and appointment booking for pets.",
    detail: "Categorizes urgent vs routine visits, books appointment slots, and provides post-op care instructions over phone.",
    metric: "100% of emergency calls routed instantly",
    Icon: PawPrint,
    accentHex: "#0f9b8e",
  },
  {
    slug: "education",
    name: "Education & Academies",
    outcome: "Turn student inquiries into enrolled interviews.",
    detail: "Answers tuition & program questions, qualifies applicants, and schedules admissions interviews automatically.",
    metric: "2.4× faster lead-to-counsellor booking time",
    Icon: GraduationCap,
    accentHex: "#4f46e5",
  },
  {
    slug: "it-services",
    name: "IT Services & Support",
    outcome: "Resolve Tier-1 voice tickets without technician time.",
    detail: "Collects ticket symptoms, runs initial diagnostic scripts via voice, and routes complex issues to the right engineer.",
    metric: "50% lower average handle time for voice tickets",
    Icon: Server,
    accentHex: "#0891b2",
  },
  {
    slug: "cosmetic-clinics",
    name: "Cosmetic & Aesthetics",
    outcome: "Convert high-intent aesthetic leads into paid consults.",
    detail: "Answers treatment questions, collects deposit links, and books initial consultations into your aesthetic software.",
    metric: "38% increase in weekend consult bookings",
    Icon: Sparkles,
    accentHex: "#9333ea",
  },
  {
    slug: "dental",
    name: "Dental Practices",
    outcome: "Your practice front desk, available between patients.",
    detail: "Schedules hygiene & emergency appointments, handles insurance questions, and sends automated SMS confirmations.",
    metric: "0 missed emergency dental calls during procedures",
    Icon: Activity,
    accentHex: "#0284c7",
  },
];

export function IndustryShowcaseSection() {
  const [activeSlug, setActiveSlug] = useState("healthcare");
  const reveal = useScrollReveal();

  const activeIndustry = INDUSTRIES.find((i) => i.slug === activeSlug) || INDUSTRIES[0];
  const ActiveIcon = activeIndustry.Icon;

  return (
    <section
      ref={reveal.ref}
      className="mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Vertical Intelligence
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink md:text-5xl">
            Built for your industry.{" "}
            <span className="italic text-primary">Not just any business.</span>
          </h2>
        </div>
        <Link
          to="/industries"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:translate-x-1"
        >
          View all 9 verticals <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Split Interactive Editorial Layout */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Vertical List (5 cols) */}
        <div className="lg:col-span-5 border-l border-border/60 pl-6 space-y-1">
          {INDUSTRIES.map((ind) => {
            const isActive = ind.slug === activeSlug;
            const IconComponent = ind.Icon;

            return (
              <button
                key={ind.slug}
                onClick={() => setActiveSlug(ind.slug)}
                onMouseEnter={() => setActiveSlug(ind.slug)}
                className={`group flex w-full items-center justify-between py-3 px-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? "bg-secondary/70 text-ink font-semibold"
                    : "text-muted-foreground hover:text-ink hover:bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    style={{ backgroundColor: ind.accentHex }}
                  />
                  <IconComponent
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "" : "opacity-60"
                    }`}
                    style={{ color: isActive ? ind.accentHex : undefined }}
                  />
                  <span className="text-sm tracking-tight">{ind.name}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isActive
                      ? "translate-x-0 opacity-100 text-ink"
                      : "-translate-x-1 opacity-0 group-hover:opacity-40"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Display Stage (7 cols) */}
        <div className="lg:col-span-7">
          <div
            key={activeIndustry.slug}
            className="relative flex flex-col justify-between min-h-[420px] p-8 md:p-12 rounded-3xl transition-all duration-500 border border-border/40"
            style={{
              backgroundColor: `${activeIndustry.accentHex}08`,
            }}
          >
            {/* Top Tag & Metric */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${activeIndustry.accentHex}18` }}
                  >
                    <ActiveIcon
                      className="h-5 w-5"
                      style={{ color: activeIndustry.accentHex }}
                    />
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: activeIndustry.accentHex }}
                  >
                    {activeIndustry.name}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium px-3 py-1 rounded-full border border-border/60 bg-background/60 text-muted-foreground">
                  {activeIndustry.metric}
                </span>
              </div>

              {/* Main Headline */}
              <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-6">
                “{activeIndustry.outcome}”
              </h3>

              {/* Detail Paragraph */}
              <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                {activeIndustry.detail}
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 pt-8 border-t border-border/40 flex items-center justify-between">
              <Link
                to={`/industries/${activeIndustry.slug}` as any}
                className="group inline-flex items-center gap-3 text-sm font-semibold transition-all"
                style={{ color: activeIndustry.accentHex }}
              >
                <span>Explore {activeIndustry.name} voice workflows</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>

              <span className="text-xs text-muted-foreground font-mono">
                {INDUSTRIES.findIndex((i) => i.slug === activeSlug) + 1} / 9
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
