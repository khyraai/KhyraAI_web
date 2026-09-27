import { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Pause, Play, Building2, UserCheck, CalendarCheck, Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface RealEstateScreen {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  desc: string;
  features: string[];
  mockup: {
    tag: string;
    headline: string;
    details: { label: string; value: string }[];
    statusBadge: string;
    systemTarget: string;
  };
}

const REAL_ESTATE_SCREENS: RealEstateScreen[] = [
  {
    id: "lead-qualification",
    title: "1. Inbound Qualification & Scoring",
    subtitle: "Automated BANT qualification rubric",
    badge: "Lead Triage Engine",
    desc: "Khyra captures buyer criteria, verifies budget threshold ($1.2M / SAR 4.5M), move-in timeline, and pre-qualifies intent in real time before booking.",
    features: [
      "Instant inquiry response within seconds",
      "Calculates buyer intent score (94/100 Tier-1 Lead)",
      "Captures property specs, financing status & urgency",
    ],
    mockup: {
      tag: "INBOUND QUALIFICATION CARD",
      headline: "Sarah Al-Rashid · Luxury Penthouse Inquiry",
      details: [
        { label: "Budget Range", value: "$1.2M – $1.5M / SAR 4.5M – 5.5M" },
        { label: "Property Interest", value: "3-Bedroom Downtown Penthouse (#PH-12)" },
        { label: "Move-In Timeline", value: "Immediate / 30 Days" },
        { label: "Financing Status", value: "Pre-Approved (Cash / Private Banking)" },
      ],
      statusBadge: "Score: 94/100 · High Intent",
      systemTarget: "Khyra NLU Qualification Rubric",
    },
  },
  {
    id: "crm-sync",
    title: "2. Salesforce & HubSpot CRM Sync",
    subtitle: "Complete contact & deal record enrichment",
    badge: "CRM Record Sync",
    desc: "Every interaction automatically creates or updates the prospect profile, attaches the full conversation transcript, and logs custom property tags.",
    features: [
      "Zero manual data entry for real estate sales teams",
      "Auto-creates deal record in active pipeline stage",
      "Enriches profile with preferred location & amenities",
    ],
    mockup: {
      tag: "SALESFORCE CRM DEAL RECORD",
      headline: "Deal #RE-8842 · Sarah Al-Rashid",
      details: [
        { label: "Pipeline Stage", value: "Qualified Lead → Viewing Scheduled" },
        { label: "Estimated Deal Value", value: "$1,350,000" },
        { label: "Assigned Property", value: "Downtown Sky Residence #1204" },
        { label: "Audit Log", value: "Verified Inbound Call · 03:45 min transcript attached" },
      ],
      statusBadge: "CRM Synced · 200 OK",
      systemTarget: "Salesforce / HubSpot API Connector",
    },
  },
  {
    id: "broker-routing",
    title: "3. Listing Broker Assignment",
    subtitle: "Intelligent territory & project routing",
    badge: "Broker Dispatch",
    desc: "Khyra matches the prospect with the dedicated listing specialist (David Sterling) and dispatches an instant WhatsApp / Slack briefing with buyer context.",
    features: [
      "Territory and luxury project matching",
      "Instant WhatsApp & email brief to listing broker",
      "Direct phone patch option for institutional buyers",
    ],
    mockup: {
      tag: "BROKER DISPATCH BRIEF",
      headline: "Assigned Specialist: David Sterling",
      details: [
        { label: "Notification Channel", value: "WhatsApp Business API & Slack" },
        { label: "Buyer Context", value: "Seeking 3-bed penthouse with terrace & parking" },
        { label: "Recommended Prep", value: "Bring floor plans & handover schedule" },
        { label: "Broker Calendar", value: "Friday 11:00 AM Slot Reserved" },
      ],
      statusBadge: "Broker Alerted & Confirmed",
      systemTarget: "WhatsApp Cloud API & Slack Webhook",
    },
  },
  {
    id: "viewing-calendar",
    title: "4. Private Showing Confirmation",
    subtitle: "Calendar lock & multi-channel pass",
    badge: "Tour Scheduling Engine",
    desc: "Locks the viewing slot on the broker's calendar and sends the buyer a branded SMS / WhatsApp confirmation with location pin and gate pass.",
    features: [
      "Real-time calendar slot reservation",
      "Automated reminder 2 hours prior to viewing",
      "Reschedule and directions workflow via message",
    ],
    mockup: {
      tag: "PRIVATE SHOWING PASS",
      headline: "Downtown Sky Residences · Private Tour",
      details: [
        { label: "Viewing Date & Time", value: "Friday at 11:00 AM" },
        { label: "Meeting Point", value: "Tower Concierge Desk, Downtown Boulevard" },
        { label: "Host", value: "David Sterling (+1 555 019 2834)" },
        { label: "Visitor Pass", value: "Pass #DT-9081 (Dispatched to Buyer)" },
      ],
      statusBadge: "Calendar Locked · SMS Dispatched",
      systemTarget: "Google / Outlook Calendar & SMS Bridge",
    },
  },
];

export function RealEstateShowcase({ accentHex = "#1d4ed8" }: { accentHex?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const reveal = useScrollReveal();

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % REAL_ESTATE_SCREENS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = REAL_ESTATE_SCREENS[activeTab];

  return (
    <section
      ref={reveal.ref}
      id="product-evidence"
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-20 border-t border-border/60 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="section-label" style={{ color: accentHex }}>
              Real Estate Product Evidence
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              CRM &amp; Tour Booking Sync
            </span>
          </div>
          <h2 className="font-display text-3xl text-ink md:text-5xl leading-tight">
            From buyer inquiry to <span className="italic text-primary">CRM deal &amp; private tour</span>.
          </h2>
        </div>

        {/* Play / Pause Auto-Rotate Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-secondary hover:text-ink"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-blue-600" />
                <span>Auto-rotating</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-primary" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar Indicators */}
      <div className="mb-10 grid grid-cols-4 gap-3">
        {REAL_ESTATE_SCREENS.map((sc, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                setIsPlaying(false);
              }}
              className="group text-left space-y-2 focus:outline-none"
            >
              <div className="relative h-1 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                  style={{ backgroundColor: accentHex }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-mono ${isActive ? "font-bold text-ink" : "text-muted-foreground"}`}>
                  0{idx + 1}
                </span>
                <span className={`hidden sm:inline text-[11px] truncate max-w-[150px] ${isActive ? "font-semibold text-ink" : "text-muted-foreground/70"}`}>
                  {sc.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Context & Feature Points (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-500/10 border border-blue-500/20">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            {current.badge}
          </div>

          <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight">
            {current.title}
          </h3>

          <p className="text-base leading-relaxed text-muted-foreground max-w-xl">
            {current.desc}
          </p>

          <div className="space-y-3 pt-2 border-t border-border/60">
            {current.features.map((feat) => (
              <div key={feat} className="flex items-start gap-3 p-3 rounded-xl border border-border/40 bg-background/80 shadow-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 pt-0.5" />
                <span className="text-xs font-semibold text-ink tracking-tight">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: High-Fidelity Interactive CRM & Workflow UI Mockup (7 cols) */}
        <div className="lg:col-span-7 flex justify-center items-center py-2">
          <div
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            className="w-full max-w-xl rounded-2xl border border-border/80 bg-background/95 p-6 shadow-xl backdrop-blur-md"
            style={{ borderColor: `${accentHex}35` }}
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${accentHex}18` }}
                >
                  <Building2 className="h-4 w-4" style={{ color: accentHex }} />
                </span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                    {current.mockup.tag}
                  </span>
                  <span className="font-display text-base font-bold text-ink">
                    {current.mockup.headline}
                  </span>
                </div>
              </div>

              <span
                className="rounded-full px-3 py-1 text-[11px] font-mono font-semibold border"
                style={{
                  backgroundColor: `${accentHex}10`,
                  borderColor: `${accentHex}30`,
                  color: accentHex,
                }}
              >
                {current.mockup.statusBadge}
              </span>
            </div>

            {/* Content Table / Field Grid */}
            <div className="space-y-3 rounded-xl bg-secondary/30 p-4 border border-border/50">
              {current.mockup.details.map((d) => (
                <div key={d.label} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1.5 border-b border-border/30 last:border-0">
                  <span className="text-muted-foreground font-medium">{d.label}:</span>
                  <span className="font-semibold text-ink sm:text-right mt-0.5 sm:mt-0 font-mono text-[11px]">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Footer Info */}
            <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px]">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Connected System: {current.mockup.systemTarget}</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                ● Live Execution Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
