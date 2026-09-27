// ─────────────────────────────────────────────────────────────────────────────
// IndustryPage.tsx — Self-contained editorial template for all industry pages
// Customer Journey:
//   1. Understand problem → 2. What Khyra handles (Roles) → 3. Workflow example
//   → 4. Product Evidence → 5. Integrations → 6. Deployment → 7. Safeguards → 8. Demo CTA
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  ShieldCheck,
  Workflow,
  Cpu,
  PhoneCall,
  Clock,
  Layers,
  Sparkles,
  Stethoscope,
  Building2,
  Hotel,
  PawPrint,
  GraduationCap,
  Users,
  Truck,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Industry } from "@/data/industries";
import { INDUSTRY_MAP, COMPACT_DEPLOYMENT_STEPS } from "@/data/industries";
import { TopBanner, SiteNav } from "@/components/site-nav";
import { FooterSection } from "@/components/landing/sections/FooterSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import { IndustryProductShowcase } from "@/components/industry/IndustryProductShowcase";

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope,
  Building2,
  Sparkles,
  Hotel,
  PawPrint,
  GraduationCap,
  Users,
  Truck,
};

// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — Hero
// ─────────────────────────────────────────────────────────────────────────────
function IndustryHero({ industry }: { industry: Industry }) {
  const Icon = ICON_MAP[industry.icon] ?? Sparkles;
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 80% at 105% 50%, ${industry.accentHex}10, transparent 65%)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-2 section-label text-muted-foreground">
          <Link to="/industries" className="transition-colors hover:text-foreground">
            Industries
          </Link>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span style={{ color: industry.accentHex }}>{industry.shortName}</span>
        </nav>

        <div className="grid gap-16 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] lg:items-center">
          {/* Left: Editorial content */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: `${industry.accentHex}18` }}
              >
                <Icon className="h-4 w-4" style={{ color: industry.accentHex }} />
              </span>
              <span className="section-label" style={{ color: industry.accentHex }}>
                {industry.heroBadge}
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.4rem,4.5vw,4.25rem)] leading-[1.05] text-ink">
              {industry.heroHeadline}
            </h1>
            <p className="mt-6 max-w-[520px] text-[17px] font-light leading-relaxed text-muted-foreground">
              {industry.heroSubhead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div
                className="inline-flex rounded-full transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ background: industry.accentHex }}
              >
                <BookDemoButton className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white">
                  Schedule a Demo <ArrowRight className="h-4 w-4" />
                </BookDemoButton>
              </div>
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition hover:text-foreground"
              >
                Inspect live workflow <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Live conversation demonstration in open space */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-3xl"
              style={{ background: `${industry.accentHex}07` }}
            />
            <div className="relative px-4 py-8">
              <div className="mb-6 flex items-center gap-2">
                <span
                  className="relative flex h-1.5 w-1.5 rounded-full"
                  style={{ background: industry.accentHex }}
                >
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ background: industry.accentHex }}
                  />
                </span>
                <span className="section-label text-muted-foreground/70 font-mono text-[11px]">
                  Live Interaction · {industry.shortName}
                </span>
              </div>

              {/* Caller turn */}
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm border border-border bg-white px-4 py-3 shadow-xs">
                  <div className="mb-1 section-label text-muted-foreground/60 text-[10px]">Caller</div>
                  <p className="text-sm text-ink">{industry.convoDemo.callerLine}</p>
                </div>
              </div>

              {/* Khyra turn */}
              <div className="mt-3 flex justify-start">
                <div
                  className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 text-white shadow-xs"
                  style={{ background: industry.accentHex }}
                >
                  <div className="mb-1 section-label opacity-75 text-[10px]">Khyra Operational AI</div>
                  <p className="text-sm leading-relaxed">{industry.convoDemo.khyraLine}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pl-1 space-y-1.5">
                {industry.convoDemo.actions.map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-2 text-[13px] font-medium"
                    style={{ color: industry.accentHex }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{a.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-border/40 pt-4 section-label text-muted-foreground/50 text-[10px]">
                Audio streaming · Real-time NLU · Direct database &amp; calendar update
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Call Flow: responsive single-column on mobile, horizontal on desktop
// ─────────────────────────────────────────────────────────────────────────────
function CallFlowSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="bg-beige/40 py-20 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 border-t border-border/60"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <div className="section-label text-muted-foreground mb-3">Operational Call Flow</div>
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            From interaction to system action — in seconds.
          </h2>
        </div>

        {/* Desktop: Horizontal sequence */}
        <div className="hidden sm:block relative">
          <div
            aria-hidden
            className="absolute top-[1.2rem] left-[1.2rem] right-0 h-px"
            style={{
              background: `linear-gradient(to right, ${industry.accentHex}60, ${industry.accentHex}10 90%)`,
            }}
          />

          <div className="grid sm:grid-cols-5 gap-8">
            {industry.callFlowSteps.map((step, i) => (
              <div
                key={step.title}
                data-visible={reveal.visible}
                style={{ transitionDelay: `${i * 100}ms` }}
                className="relative opacity-0 translate-y-4 transition-all duration-500 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
              >
                <div
                  className="relative z-10 mb-4 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs"
                  style={{ background: industry.accentHex }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-[14px] font-semibold text-ink">{step.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Clean vertical sequence */}
        <div className="sm:hidden space-y-6 relative pl-6 border-l-2" style={{ borderColor: `${industry.accentHex}40` }}>
          {industry.callFlowSteps.map((step, i) => (
            <div key={step.title} className="relative">
              <div
                className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: industry.accentHex }}
              >
                0{i + 1}
              </div>
              <div className="text-sm font-semibold text-ink">{step.title}</div>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 3 — Pain Points / Challenges
// ─────────────────────────────────────────────────────────────────────────────
function PainPointsSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  return (
    <section
      id="challenges"
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 border-t border-border/60 scroll-mt-24"
    >
      <div className="grid gap-16 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="section-label text-muted-foreground mb-3">The Operational Challenge</div>
          <h2 className="font-display text-3xl text-ink md:text-4xl leading-tight">
            What's holding {industry.shortName.toLowerCase()} operations back
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground">
            These aren't edge cases. They are daily communication bottlenecks that create lost bookings, staff burnout, and missed revenue.
          </p>
        </div>

        <div>
          {industry.painPoints.map(({ title, description }, i) => (
            <div
              key={title}
              data-visible={reveal.visible}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={`py-6 opacity-0 translate-y-3 transition-all duration-500 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 ${
                i < industry.painPoints.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-baseline gap-6">
                <span
                  className="shrink-0 font-display text-[1.75rem] leading-none"
                  style={{ color: `${industry.accentHex}40` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-semibold text-[15px] text-ink">{title}</div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 4 — Capabilities & Operational Roles
// ─────────────────────────────────────────────────────────────────────────────
function CapabilitiesSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  return (
    <section
      id="capabilities"
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="py-20 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 scroll-mt-24"
      style={{ background: `${industry.accentHex}05` }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-0 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="section-label mb-3" style={{ color: industry.accentHex }}>
              What Khyra Handles in {industry.shortName}
            </div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Pre-built workflow blueprints.
            </h2>
          </div>
          <p className="max-w-xs text-[14px] text-muted-foreground">
            Configured around your operating guidelines, provider schedules, and software stack.
          </p>
        </div>

        {/* Operational Roles Tags */}
        {industry.operationalRoles && (
          <div className="py-6 border-b border-border/60 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Covered Operational Roles:
            </span>
            {industry.operationalRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium border"
                style={{
                  backgroundColor: `${industry.accentHex}10`,
                  borderColor: `${industry.accentHex}25`,
                  color: industry.accentHex,
                }}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {role}
              </span>
            ))}
          </div>
        )}

        {/* Numbered editorial rows */}
        <div>
          {industry.capabilities.map(({ title, description }, i) => (
            <div
              key={title}
              data-visible={reveal.visible}
              style={{ transitionDelay: `${i * 45}ms` }}
              className={`grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_220px_1fr] items-baseline gap-x-6 gap-y-1 py-6 opacity-0 translate-y-2 transition-all duration-400 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 ${
                i < industry.capabilities.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span
                className="font-display text-lg leading-none"
                style={{ color: `${industry.accentHex}50` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-semibold text-[15px] text-ink col-start-2">{title}</span>
              <p className="text-[14px] leading-relaxed text-muted-foreground col-start-2 md:col-start-3">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 5 — Workflows: vertical tab selector + conversation + actions
// ─────────────────────────────────────────────────────────────────────────────
function WorkflowSection({ industry }: { industry: Industry }) {
  const [activeTab, setActiveTab] = useState(0);
  const reveal = useScrollReveal();
  const wf = industry.workflows[activeTab] || industry.workflows[0];

  return (
    <section
      id="workflow"
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 border-t border-border/60 scroll-mt-24"
    >
      <div className="mb-12">
        <div className="section-label text-muted-foreground mb-3">Workflow Execution</div>
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          How Khyra handles {industry.shortName.toLowerCase()} interactions
        </h2>
      </div>

      <div className="grid gap-12 lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] lg:items-start">
        {/* Left: Tab list */}
        <div className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible pb-2 lg:pb-0">
          {industry.workflows.map((w, i) => (
            <button
              key={w.label}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`relative flex-shrink-0 rounded-none text-left py-3 pr-6 pl-4 text-sm transition-all ${
                activeTab === i
                  ? "font-semibold text-ink"
                  : "font-medium text-muted-foreground hover:text-foreground/70"
              }`}
            >
              <span
                className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full transition-all"
                style={{ background: activeTab === i ? industry.accentHex : "transparent" }}
              />
              {w.label}
            </button>
          ))}
        </div>

        {/* Right: Transcript */}
        <div className="min-h-[260px]">
          <div className="mb-8">
            <div className="section-label text-muted-foreground mb-2 text-xs">Caller / Customer</div>
            <p className="text-lg text-ink leading-relaxed max-w-xl">
              "{wf.callerQ}"
            </p>
          </div>

          <div
            className="mb-8 pl-5 border-l-2"
            style={{ borderColor: industry.accentHex }}
          >
            <div
              className="section-label mb-2 text-xs font-semibold"
              style={{ color: industry.accentHex }}
            >
              Khyra Operational AI
            </div>
            <p className="text-lg text-ink italic leading-relaxed max-w-xl">
              "{wf.khyraReply}"
            </p>
          </div>

          <div>
            <div className="section-label text-muted-foreground mb-3 text-xs">Executed System Actions</div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {wf.actions.map((action) => (
                <span
                  key={action}
                  className="flex items-center gap-2 text-[14px] font-medium"
                  style={{ color: industry.accentHex }}
                >
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  {action}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 6 — Dedicated Integrations Section (Fixing Audit Problem #2)
// ─────────────────────────────────────────────────────────────────────────────
function DedicatedIntegrationsSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  const integrations = industry.integrationCategories ?? [
    {
      category: "Core Business & CRM Software",
      description: "Direct record updates, contact enrichment, and pipeline synchronization.",
      examples: ["Salesforce", "HubSpot", "Industry Software"],
    },
    {
      category: "Calendars & Scheduling",
      description: "Live availability checking, slot reservation, and reschedule workflows.",
      examples: ["Google Calendar", "Microsoft 365", "Custom Calendars"],
    },
    {
      category: "Telephony & VoIP Bridges",
      description: "Seamless connection to existing business phone numbers with zero downtime.",
      examples: ["SIP Trunking", "Twilio Voice", "Existing PBX"],
    },
    {
      category: "Messaging & Dispatch",
      description: "Automated multi-channel confirmations, arrival trackers, and client summaries.",
      examples: ["WhatsApp Business API", "SMS", "Email"],
    },
    {
      category: "Custom Webhooks & REST APIs",
      description: "Bi-directional REST connectors for proprietary internal applications and databases.",
      examples: ["OAuth 2.0 Webhooks", "REST Endpoints", "SQL Databases"],
    },
  ];

  return (
    <section
      id="integrations"
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-24 border-t border-border/60 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 scroll-mt-24"
    >
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="section-label mb-3" style={{ color: industry.accentHex }}>
            Systems &amp; Integrations
          </span>
          <h2 className="font-display text-3xl text-ink md:text-5xl leading-tight">
            Connects to your <span className="italic text-primary">existing software stack</span>.
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          Khyra is engineered for zero rip-and-replace. We integrate directly into your current CRM, EHR, PMS, telephony, and calendar tools via secure APIs.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((item, idx) => (
          <div
            key={item.category}
            className="rounded-2xl border border-border/80 bg-background/90 p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-4">
                <span>0{idx + 1} / CATEGORY</span>
                <Database className="h-4 w-4" style={{ color: industry.accentHex }} />
              </div>
              <h3 className="font-semibold text-ink text-base mb-2">
                {item.category}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border/40">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Supported &amp; Compatible Systems:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-md bg-secondary/60 px-2.5 py-1 text-xs font-mono text-ink"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border/60 bg-secondary/20 p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Have a custom proprietary system? We configure secure REST API and OAuth 2.0 connectors.</span>
        </div>
        <Link to="/book-demo" className="font-semibold text-primary hover:underline">
          Discuss technical integration requirements →
        </Link>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 7 — Compact Deployment Section (Fixing Audit Problem #3)
// ─────────────────────────────────────────────────────────────────────────────
function CompactDeploymentSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  return (
    <section
      id="deployment"
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="bg-beige/35 py-24 border-t border-border/60 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <span className="section-label mb-3" style={{ color: industry.accentHex }}>
            Deployment &amp; Implementation
          </span>
          <h2 className="font-display text-3xl text-ink md:text-5xl leading-tight">
            How we deploy Khyra in your operations.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Standard deployments are live in days without disruption to your existing phone numbers or daily business operations.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMPACT_DEPLOYMENT_STEPS.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-border/80 bg-background/95 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div
                  className="font-mono text-2xl font-bold mb-3"
                  style={{ color: industry.accentHex }}
                >
                  {step.step}
                </div>
                <h3 className="font-bold text-ink text-base mb-1.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/40 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Deployment Stage {step.step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 8 — Safeguards & Human Escalation
// ─────────────────────────────────────────────────────────────────────────────
function SafeguardsSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  const safeguards = industry.safeguards ?? {
    summary: "Every interaction is evaluated against predefined operational guardrails. When an inquiry falls outside standard business rules, Khyra performs a seamless warm transfer to human staff with a live context summary.",
    transferProtocol: "Warm transfer with real-time transcript summary, extracted caller details, and verified intent.",
    emergencyPolicy: "Urgent keywords immediately route to on-call supervisors or emergency personnel.",
  };

  return (
    <section
      id="safeguards"
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-20 border-t border-border/60 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 scroll-mt-24"
    >
      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 md:p-12">
        <div className="flex items-center gap-2 section-label text-primary mb-3">
          <ShieldCheck className="h-4 w-4" />
          <span>Operational Safeguards &amp; Human Escalation</span>
        </div>

        <h2 className="font-display text-3xl text-ink md:text-4xl max-w-2xl leading-tight">
          What happens when an interaction requires human judgment?
        </h2>

        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {safeguards.summary}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-6 border-t border-primary/15 text-xs">
          <div className="p-4 rounded-xl bg-background/80 border border-primary/10 space-y-1">
            <span className="font-semibold text-ink block">Contextual Warm Transfer</span>
            <span className="text-muted-foreground leading-relaxed">{safeguards.transferProtocol}</span>
          </div>

          <div className="p-4 rounded-xl bg-background/80 border border-primary/10 space-y-1">
            <span className="font-semibold text-ink block">Confidence Thresholds</span>
            <span className="text-muted-foreground leading-relaxed">Configurable confidence rules trigger staff handoffs before errors can occur.</span>
          </div>

          {safeguards.emergencyPolicy && (
            <div className="p-4 rounded-xl bg-background/80 border border-primary/10 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-semibold text-ink block">Emergency Triage Policy</span>
              <span className="text-muted-foreground leading-relaxed">{safeguards.emergencyPolicy}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 9 — Metrics
// ─────────────────────────────────────────────────────────────────────────────
function MetricsSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="py-24 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
      style={{ background: "oklch(0.13 0.03 165)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="section-label mb-16" style={{ color: "rgba(255,255,255,0.35)" }}>
          Measurable Operational Impact
        </div>
        <div className="grid grid-cols-1 divide-y divide-white/8 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {industry.metrics.map(({ value, label, sublabel }, i) => (
            <div
              key={label}
              data-visible={reveal.visible}
              style={{ transitionDelay: `${i * 120}ms` }}
              className="px-0 sm:px-12 first:pl-0 last:pr-0 py-10 sm:py-0 opacity-0 translate-y-4 transition-all duration-600 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
            >
              <div className="text-display-xl font-display text-white">
                {value}
              </div>
              <div className="mt-4 text-[14px] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
                {label}
              </div>
              {sublabel && (
                <div className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {sublabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 10 — FAQ
// ─────────────────────────────────────────────────────────────────────────────
function FAQSection({ industry }: { industry: Industry }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reveal = useScrollReveal();

  return (
    <section
      id="faq"
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-3xl px-6 py-24 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 scroll-mt-24"
    >
      <div className="mb-12">
        <div className="section-label text-muted-foreground mb-3">Frequently Asked Questions</div>
        <h2 className="font-display text-3xl text-ink">
          {industry.shortName} questions, answered
        </h2>
      </div>

      <div className="border-t border-border">
        {industry.faqs.map(({ question, answer }, i) => (
          <div key={question} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-8 py-5 text-left text-[15px] font-medium text-ink transition-colors hover:text-foreground"
            >
              <span>{question}</span>
              <ChevronRight
                className={`h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform duration-200 ${
                  openIndex === i ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                openIndex === i ? "max-h-64 pb-6 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-[14px] leading-relaxed text-muted-foreground">{answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 11 — CTA
// ─────────────────────────────────────────────────────────────────────────────
function CTASection({ industry }: { industry: Industry }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div
        className="relative overflow-hidden rounded-3xl px-10 py-16 md:px-16 md:py-20"
        style={{ background: "oklch(0.13 0.03 165)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-full w-1/2"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 100% 50%, ${industry.accentHex}1a, transparent)`,
          }}
        />
        <div className="relative max-w-xl">
          <div
            className="section-label mb-6"
            style={{ color: industry.accentHex }}
          >
            {industry.heroBadge}
          </div>
          <h2 className="font-display text-3xl text-white md:text-5xl leading-tight">
            Ready to see Khyra in action?
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Schedule an operational consultation and live demonstration. We'll show you exactly how Khyra automates{" "}
            {industry.name.toLowerCase()} workflows with your software stack.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div
              className="inline-flex rounded-full transition hover:opacity-90 active:scale-[0.97]"
              style={{ background: industry.accentHex }}
            >
              <BookDemoButton className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white">
                Schedule a Demo <ArrowRight className="h-4 w-4" />
              </BookDemoButton>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition hover:border-white/25 hover:text-white"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Explore all industries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 12 — Related
// ─────────────────────────────────────────────────────────────────────────────
function RelatedSection({ industry }: { industry: Industry }) {
  const related = industry.relatedSlugs
    .map((slug) => INDUSTRY_MAP[slug])
    .filter(Boolean) as Industry[];
  if (!related.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-12">
      <div className="flex flex-wrap items-center gap-6 border-t border-border pt-8 md:gap-0 md:divide-x md:divide-border">
        <div className="section-label text-muted-foreground md:pr-8">
          Related Verticals
        </div>
        {related.map((rel) => {
          const RelIcon = ICON_MAP[rel.icon] ?? Sparkles;
          return (
            <Link
              key={rel.slug}
              to={`/industries/${rel.slug}` as any}
              className="group flex items-center gap-2.5 text-[14px] font-medium text-foreground/55 transition-colors hover:text-foreground md:px-8"
            >
              <RelIcon className="h-3.5 w-3.5 shrink-0" style={{ color: rel.accentHex }} />
              {rel.name}
              <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 404 Not Found
// ─────────────────────────────────────────────────────────────────────────────
function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <div className="section-label text-muted-foreground mb-4">404</div>
        <h1 className="font-display text-4xl text-ink">Industry not found</h1>
        <p className="mt-4 text-muted-foreground">
          The industry vertical you're looking for doesn't exist.
        </p>
        <Link
          to="/industries"
          className="mt-8 inline-flex items-center gap-2 text-primary transition hover:opacity-70"
        >
          <ArrowRight className="h-4 w-4 rotate-180" /> Browse all industries
        </Link>
      </div>
      <FooterSection />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page Export
// ─────────────────────────────────────────────────────────────────────────────
export function IndustryPage({ slug }: { slug: string }) {
  const industry = INDUSTRY_MAP[slug];
  if (!industry) return <NotFoundPage />;

  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />
      {/* Complete Customer Journey: Problem → Roles → Workflow → Evidence → Integrations → Deployment → Safeguards → Demo */}
      <IndustryHero industry={industry} />
      <CallFlowSection industry={industry} />
      <PainPointsSection industry={industry} />
      <CapabilitiesSection industry={industry} />
      <WorkflowSection industry={industry} />

      {/* Product Evidence Section */}
      <IndustryProductShowcase industry={industry} />

      {/* Dedicated Integrations Section */}
      <DedicatedIntegrationsSection industry={industry} />

      {/* Compact Deployment Section */}
      <CompactDeploymentSection industry={industry} />

      {/* Safeguards & Escalation */}
      <SafeguardsSection industry={industry} />

      {/* Measurable Metrics */}
      <MetricsSection industry={industry} />

      {/* FAQ */}
      <FAQSection industry={industry} />

      {/* Final CTA */}
      <CTASection industry={industry} />

      {/* Related Verticals */}
      <RelatedSection industry={industry} />

      <FooterSection />
    </main>
  );
}
