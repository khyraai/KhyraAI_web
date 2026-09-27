import { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Pause, Play, LayoutDashboard } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

import dashboardImg from "@/assets/1. dashboard.png";
import timeSlotsImg from "@/assets/2. time slots.png";
import appointmentsImg from "@/assets/3. Appointment .png";
import customersImg from "@/assets/4. users.png";

const MOBILE_SCREENS = [
  {
    id: "customer-workspace",
    title: "Operational context, in one place",
    subtitle: "Unified customer context & record verification",
    desc: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
    image: customersImg,
    badge: "Customer Context",
    features: [
      "Instant caller directory search and identity matching",
      "Tracks customer activities, interaction logs, and request history",
      "Direct integration with central operational records and databases",
    ],
  },
  {
    id: "slot-coordination",
    title: "Capacity & slot coordination",
    subtitle: "Real-time availability & slot locking",
    desc: "Appointments, consultations, and team schedules stay organized with real-time slot locking that prevents double-booking.",
    image: timeSlotsImg,
    badge: "Capacity Management",
    features: [
      "Live morning and afternoon slot availability with buffer rules",
      "Multi-slot availability indicators with automated conflict prevention",
      "Instant reservation locking triggered directly by customer conversations",
    ],
  },
  {
    id: "activity-execution",
    title: "From request to completed action",
    subtitle: "Request-to-Execution Engine",
    desc: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
    image: appointmentsImg,
    badge: "Action Execution",
    features: [
      "Chronological upcoming and past operational schedules with status badges",
      "Direct workflow reason tagging and team assignment briefs",
      "Automated multi-channel confirmations and proactive reminders",
    ],
  },
  {
    id: "central-command",
    title: "Operational visibility, in real time",
    subtitle: "Central command across active work",
    desc: "Live operational visibility across activities, customers, schedules, and ongoing work across all operational roles.",
    image: dashboardImg,
    badge: "Central Command",
    features: [
      "Real-time timeline of completed and upcoming customer actions",
      "Next scheduled activity status with direct entity linking",
      "Eliminates siloed records between front-line communication and execution",
    ],
  },
];

export function MobileAppShowcase({ accentHex = "#16a34a" }: { accentHex?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const reveal = useScrollReveal();

  // Auto-rotation timer (4.5s)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % MOBILE_SCREENS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = MOBILE_SCREENS[activeTab];

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-14 sm:py-18 lg:py-20 border-t border-border/60 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="section-label font-semibold text-xs tracking-wider uppercase" style={{ color: accentHex }}>
              Operational Platform Evidence
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Khyra Operations Suite
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight">
            Synced directly to <span className="italic" style={{ color: accentHex }}>Khyra Operations</span>.
          </h2>
        </div>

        {/* Play / Pause Auto-Rotate Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-secondary hover:text-ink cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-emerald-600" />
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

      {/* Slide Progress Bar Indicator */}
      <div className="mb-8 grid grid-cols-4 gap-3">
        {MOBILE_SCREENS.map((sc, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveTab(idx);
                setIsPlaying(false);
              }}
              className="group text-left space-y-2 focus:outline-none cursor-pointer"
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
                <span className={`hidden sm:inline text-[11px] truncate max-w-[140px] ${isActive ? "font-semibold text-ink" : "text-muted-foreground/70"}`}>
                  {sc.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="rounded-3xl border border-border/90 bg-card p-5 sm:p-6 lg:p-8 shadow-lg">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Context & Feature Points (6 cols) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border"
              style={{
                backgroundColor: `${accentHex}10`,
                borderColor: `${accentHex}25`,
                color: accentHex,
              }}
            >
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: accentHex }} />
              {current.badge}
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {current.subtitle}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-3xl text-ink leading-snug">
                {current.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl">
              {current.desc}
            </p>

            {/* Feature Checkpoints */}
            <div className="space-y-2.5 pt-3 border-t border-border/60">
              {current.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border border-border/50 bg-background/80 shadow-2xs transition-all hover:border-border"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: accentHex }} />
                  <span className="text-xs font-medium text-ink tracking-tight block leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Complete Phone Screen Visible in One Glance (6 cols) */}
          <div className="lg:col-span-6 flex justify-center items-center py-2">
            <div
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
              className="relative flex justify-center items-center w-full min-h-[460px] sm:min-h-[500px]"
            >
              {/* Subtle Ambient Radial Accent */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none opacity-40"
                style={{
                  background: `radial-gradient(ellipse at center, ${accentHex}18, transparent 70%)`,
                }}
              />

              {/* Dominant Active Screenshot - Completely Visible Without Scrolling */}
              <div className="relative z-10 overflow-hidden rounded-[24px] sm:rounded-[28px] drop-shadow-2xl transition-all duration-500">
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  className="h-[430px] sm:h-[470px] lg:h-[490px] w-auto max-w-[245px] sm:max-w-[260px] object-contain rounded-[24px] sm:rounded-[28px] transition-opacity duration-700 ease-in-out"
                />
              </div>

              {/* Floating Live Sync Badge */}
              <div className="absolute -bottom-2 right-2 sm:right-6 z-20 rounded-2xl border border-border/80 bg-background/95 p-3 shadow-2xl backdrop-blur-xl max-w-[210px]">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                  <span>Khyra Operations Sync</span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground leading-tight">
                  Live operational records updated automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
