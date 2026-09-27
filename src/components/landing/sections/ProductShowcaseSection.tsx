import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  ChevronRight,
} from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";

import dashboardImg from "@/assets/1. dashboard.png";
import timeSlotsImg from "@/assets/2. time slots.png";
import appointmentsImg from "@/assets/3. Appointment .png";
import customersImg from "@/assets/4. users.png";

interface ShowcaseView {
  id: string;
  tabNumber: string;
  tag: string;
  title: string;
  subtitle: string;
  headline: string;
  copy: string;
  image: string;
  alt: string;
  icon: typeof LayoutDashboard;
  keyPoints: string[];
  badge: string;
  workflowStage: string;
}

const SHOWCASE_VIEWS: ShowcaseView[] = [
  {
    id: "dashboard",
    tabNumber: "01",
    tag: "Primary Workspace",
    title: "Central Command",
    subtitle: "Real-time Operational Visibility",
    headline: "See what is happening now",
    copy: "Live operational visibility across activities, customers, schedules and ongoing work.",
    image: dashboardImg,
    alt: "Khyra Operations dashboard showing customer activities and scheduled work",
    icon: LayoutDashboard,
    keyPoints: [
      "Real-time timeline of completed and upcoming customer actions across all operational roles",
      "Next scheduled activity status with direct entity linking to customer profiles and work orders",
      "Unified enterprise calendar synchronization eliminating fragmented spreadsheets and siloed apps",
    ],
    badge: "Operational Visibility",
    workflowStage: "Live Command Surface",
  },
  {
    id: "scheduling",
    tabNumber: "02",
    tag: "Operational Coordination",
    title: "Capacity & Coordination",
    subtitle: "Real-time Availability & Slot Locking",
    headline: "Coordinate what happens next",
    copy: "Appointments, follow-ups, meetings and service activities stay organized in one operational view.",
    image: timeSlotsImg,
    alt: "Khyra scheduling workspace showing available time slots",
    icon: Clock,
    keyPoints: [
      "Live morning and afternoon capacity visualization with real-time remaining slot counters",
      "Multi-slot availability indicators with automated double-booking prevention and buffer rules",
      "Instant reservation locking triggered directly by customer conversations and inbound requests",
    ],
    badge: "Capacity Management",
    workflowStage: "Automated Slot Locking",
  },
  {
    id: "customers",
    tabNumber: "03",
    tag: "Customer Context",
    title: "Customer Workspace",
    subtitle: "Unified Customer Context & History",
    headline: "Keep every interaction connected",
    copy: "Customer context, recent activity and follow-ups stay connected across the workflow.",
    image: customersImg,
    alt: "Khyra customer operations workspace",
    icon: Users,
    keyPoints: [
      "Instant customer directory lookup with verified contact details, account history, and company affiliation",
      "Continuous activity counters tracking every historical interaction and triggered task touchpoint",
      "Eliminates siloed records between front-line communication channels and back-office execution teams",
    ],
    badge: "Context & Timeline",
    workflowStage: "Continuous Audit Trail",
  },
  {
    id: "appointments",
    tabNumber: "04",
    tag: "Activity Execution",
    title: "Execution Engine",
    subtitle: "Request-to-Execution Engine",
    headline: "Turn conversations into scheduled action",
    copy: "When a customer needs something done, Khyra moves the workflow forward — from request to scheduled activity.",
    image: appointmentsImg,
    alt: "Khyra appointment management screen",
    icon: CalendarCheck2,
    keyPoints: [
      "Chronological upcoming and past operational schedules with clear reason codes and status badges",
      "Direct workflow reason tagging (Follow-up, Review, Contract, Kickoff, Onsite visits)",
      "Automated transition from inbound customer request directly to confirmed, recorded business action",
    ],
    badge: "Action Execution",
    workflowStage: "Request-to-Action Pipeline",
  },
];

const EXECUTION_STAGES = [
  {
    num: "01",
    phase: "Understand",
    desc: "Parses caller intent, verifies identity, and extracts action parameters.",
  },
  {
    num: "02",
    phase: "Decide",
    desc: "Evaluates business rules, operational policies, and live availability.",
  },
  {
    num: "03",
    phase: "Execute",
    desc: "Locks slots, updates CRM/ERP records, and dispatches work orders.",
  },
  {
    num: "04",
    phase: "Update",
    desc: "Dispatches multi-channel confirmations and updates internal dashboards.",
  },
  {
    num: "05",
    phase: "Complete",
    desc: "Logs immutable audit trail and confirms full operational completion.",
  },
];

export function ProductShowcaseSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const current = SHOWCASE_VIEWS[activeTab];

  // Calculate secondary offset previews for layered desktop composition
  const nextIdx = (activeTab + 1) % SHOWCASE_VIEWS.length;
  const secondaryView = SHOWCASE_VIEWS[nextIdx];

  return (
    <RevealSection
      id="product-showcase"
      className="mx-auto max-w-7xl px-6 py-14 sm:py-18 lg:py-20 border-t border-border/70 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-border/60">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <LayoutDashboard className="h-3.5 w-3.5" />
            Operational Application Suite
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1]">
            The system behind{" "}
            <span className="italic text-primary">every interaction.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Khyra gives teams a single operational workspace to see what is happening, coordinate what comes next, and keep every interaction connected to the work it triggers.
          </p>
        </div>

        <div className="max-w-xs">
          <p className="text-xs font-medium text-muted-foreground/90 border-l-2 border-primary/40 pl-4 py-1 leading-relaxed">
            One operational system, configured around the workflows your business already runs.
          </p>
        </div>
      </div>

      {/* 5-Stage Execution Sequence Callout: From Interaction to Action */}
      <div className="my-8 sm:my-10 rounded-2xl border border-border/80 bg-secondary/30 p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Workflow className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                From interaction to action
              </h3>
              <p className="text-xs text-muted-foreground">
                How Khyra connects customer conversations directly to business execution
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Zero manual lag · Full audit trail
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {EXECUTION_STAGES.map((st, idx) => (
            <div
              key={st.phase}
              className="group relative rounded-xl border border-border/70 bg-background/90 p-3.5 transition-all hover:border-primary/40 hover:shadow-xs"
            >
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span className="font-semibold text-primary/80">{st.num}</span>
                {idx < EXECUTION_STAGES.length - 1 && (
                  <span className="hidden lg:inline text-muted-foreground/40 text-xs">→</span>
                )}
              </div>
              <div className="mt-1.5 font-display text-base text-ink font-semibold">
                {st.phase}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Workspace Navigation Selector */}
      <div
        role="tablist"
        aria-label="Khyra Operational Workspaces"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-6 sm:mb-8"
      >
        {SHOWCASE_VIEWS.map((view, idx) => {
          const isActive = activeTab === idx;
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              role="tab"
              id={`tab-${view.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${view.id}`}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`group text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
                isActive
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                  : "border-border/80 bg-card hover:bg-secondary/40 hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground group-hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <span
                  className={`font-mono text-xs ${
                    isActive ? "font-bold text-primary" : "text-muted-foreground/60"
                  }`}
                >
                  {view.tabNumber}
                </span>
              </div>
              <div
                className={`text-[11px] sm:text-xs font-semibold transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {view.tag}
              </div>
              <div className="font-display text-sm sm:text-base text-ink font-semibold mt-0.5 truncate">
                {view.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Stage */}
      <div
        id={`tabpanel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="rounded-3xl border border-border/90 bg-card p-5 sm:p-6 lg:p-8 shadow-lg"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Context, Narrative & Feature Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>{current.badge}</span>
              <span className="text-primary/40">·</span>
              <span className="text-[11px] font-mono">{current.workflowStage}</span>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {current.subtitle}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-3xl text-ink leading-snug">
                {current.headline}
              </h3>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {current.copy}
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2.5 pt-3 border-t border-border/60">
              {current.keyPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-background/80 p-2.5 sm:p-3 shadow-2xs transition-all hover:border-primary/30"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span className="text-xs font-medium text-foreground/90 leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Action / CTA Hook */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-4">
              <BookDemoButton className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90 cursor-pointer">
                <span>See Live Operational Demo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </BookDemoButton>

              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Enterprise ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced Layered Screenshot Display (7 cols) */}
          <div className="lg:col-span-7 flex justify-center items-center py-2">
            <div className="relative flex justify-center items-center w-full min-h-[460px] sm:min-h-[500px]">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-radial from-primary/8 via-transparent to-transparent blur-2xl pointer-events-none" />

              {/* Dominant Active Screenshot - Complete Screen Visible in One Glance */}
              <div className="relative z-10 transition-all duration-500 flex justify-center sm:translate-x-[-20px] md:translate-x-[-30px] lg:translate-x-[-35px]">
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.alt}
                  className="h-[430px] sm:h-[470px] lg:h-[500px] w-auto max-w-[245px] sm:max-w-[260px] object-contain rounded-[24px] sm:rounded-[28px] drop-shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>

              {/* Secondary Layered Subordinate Device (Staggered Composition) */}
              <button
                type="button"
                onClick={() => setActiveTab(nextIdx)}
                className="hidden sm:block absolute right-2 sm:right-4 md:right-8 lg:right-4 xl:right-8 bottom-3 z-20 w-[145px] sm:w-[155px] lg:w-[165px] rounded-2xl border border-border/80 bg-background/95 p-2 shadow-2xl backdrop-blur-md opacity-95 transition-all duration-300 hover:opacity-100 hover:scale-105 hover:border-primary/40 cursor-pointer text-left group"
                title={`Next: Switch to ${secondaryView.title}`}
              >
                <div className="flex items-center justify-between px-1.5 py-0.5 border-b border-border/60 text-[9px] font-semibold text-muted-foreground uppercase">
                  <div className="flex items-center gap-1 text-primary">
                    <secondaryView.icon className="h-2.5 w-2.5" />
                    <span>Next View</span>
                  </div>
                  <ChevronRight className="h-2.5 w-2.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="px-1.5 pt-1 pb-0.5">
                  <p className="text-[10px] font-semibold text-ink truncate">{secondaryView.title}</p>
                </div>
                <img
                  src={secondaryView.image}
                  alt={secondaryView.alt}
                  className="mt-0.5 h-[230px] sm:h-[255px] lg:h-[275px] w-auto mx-auto rounded-xl object-contain opacity-90 transition-opacity group-hover:opacity-100"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
