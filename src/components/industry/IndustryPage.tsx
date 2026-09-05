// ─────────────────────────────────────────────────────────────────────────────
// IndustryPage.tsx — Shared editorial template for all 9 industry pages
// Design principles:
//   • No two consecutive sections share the same layout primitive
//   • Cards only where genuinely appropriate (FAQ accordion, nowhere else)
//   • Content determines layout, not the component library
//   • Motion communicates hierarchy, not decoration
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Industry } from "@/data/industries";
import { INDUSTRY_MAP } from "@/data/industries";
import { TopBanner, SiteNav } from "@/components/site-nav";
import { FooterSection } from "@/components/landing/sections/FooterSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import {
  Stethoscope, Building2, Sparkles, Hotel, PawPrint,
  GraduationCap, Server, Activity,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope, Building2, Sparkles, Hotel, PawPrint, GraduationCap, Server, Activity,
};

// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — Hero: split layout, left editorial, right conversation (no card)
// ─────────────────────────────────────────────────────────────────────────────
function IndustryHero({ industry }: { industry: Industry }) {
  const Icon = ICON_MAP[industry.icon] ?? Sparkles;
  return (
    <section className="relative overflow-hidden">
      {/* Accent wash — no blob, just a very subtle radial on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 80% at 105% 50%, ${industry.accentHex}10, transparent 65%)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24">
        {/* Breadcrumb */}
        <nav className="mb-14 flex items-center gap-2 section-label text-muted-foreground">
          <Link to="/industries" className="transition-colors hover:text-foreground">
            Industries
          </Link>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span style={{ color: industry.accentHex }}>{industry.shortName}</span>
        </nav>

        <div className="grid gap-16 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] lg:items-center">
          {/* ── Left: editorial content ──────────────────── */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: `${industry.accentHex}18` }}
              >
                <Icon className="h-4 w-4" style={{ color: industry.accentHex }} />
              </span>
              <span
                className="section-label"
                style={{ color: industry.accentHex }}
              >
                {industry.heroBadge}
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.4rem,4.5vw,4.25rem)] leading-[1.05] text-ink">
              {industry.heroHeadline}
            </h1>
            <p className="mt-6 max-w-[480px] text-[17px] font-light leading-relaxed text-muted-foreground">
              {industry.heroSubhead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div
                className="inline-flex rounded-full transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ background: industry.accentHex }}
              >
                <BookDemoButton className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </BookDemoButton>
              </div>
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 transition hover:text-foreground"
              >
                See it in action <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* ── Right: conversation in open space, no card wrapper ── */}
          <div className="relative">
            {/* Extremely subtle background differentiation — not a card */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-3xl"
              style={{ background: `${industry.accentHex}07` }}
            />
            <div className="relative px-4 py-8">
              {/* Status line */}
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
                <span className="section-label text-muted-foreground/60">
                  Live call · {industry.shortName}
                </span>
              </div>

              {/* Caller line — right-aligned */}
              <div className="flex justify-end">
                <div className="max-w-[82%] rounded-2xl rounded-br-sm border border-border bg-white px-4 py-3 shadow-sm">
                  <div className="mb-1.5 section-label text-muted-foreground/50">Caller</div>
                  <p className="text-sm text-ink">{industry.convoDemo.callerLine}</p>
                </div>
              </div>

              {/* Khyra line — left-aligned, accent colored */}
              <div className="mt-3 flex justify-start">
                <div
                  className="max-w-[82%] rounded-2xl rounded-bl-sm px-4 py-3 text-white"
                  style={{ background: industry.accentHex }}
                >
                  <div className="mb-1.5 section-label opacity-60">Khyra</div>
                  <p className="text-sm">{industry.convoDemo.khyraLine}</p>
                </div>
              </div>

              {/* Actions — inline text, no container */}
              <div className="mt-5 pl-1 space-y-1.5">
                {industry.convoDemo.actions.map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-2 text-[13px] font-medium"
                    style={{ color: industry.accentHex }}
                  >
                    <span className="font-sans text-base leading-none">✓</span>
                    <span>{a.label}</span>
                  </div>
                ))}
              </div>

              {/* Footer metadata */}
              <div className="mt-6 border-t border-border/40 pt-4 section-label text-muted-foreground/40">
                Response latency · 612ms · No human involved
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Call Flow: full-width horizontal timeline
// Layout: completely different from hero (horizontal sequence vs. split)
// ─────────────────────────────────────────────────────────────────────────────
function CallFlowSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="bg-beige/40 py-20 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <div className="section-label text-muted-foreground mb-3">How it works</div>
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            From call to action — in under a second
          </h2>
        </div>

        <div className="relative">
          {/* Horizontal connector line */}
          <div
            aria-hidden
            className="absolute top-[1.2rem] left-[1.2rem] right-0 h-px"
            style={{
              background: `linear-gradient(to right, ${industry.accentHex}60, ${industry.accentHex}10 90%)`,
            }}
          />

          <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-5 sm:gap-8">
            {industry.callFlowSteps.map((step, i) => (
              <div
                key={step.title}
                data-visible={reveal.visible}
                style={{ transitionDelay: `${i * 100}ms` }}
                className="relative opacity-0 translate-y-4 transition-all duration-500 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
              >
                {/* Numbered node */}
                <div
                  className="relative z-10 mb-4 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: industry.accentHex }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-[13px] font-semibold text-ink">{step.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 3 — Pain Points: editorial two-column, sticky left, divider list right
// Layout: completely different from call flow (two-column text composition)
// ─────────────────────────────────────────────────────────────────────────────
function PainPointsSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="grid gap-16 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
        {/* Left: sticky heading block */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="section-label text-muted-foreground mb-3">The challenge</div>
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            What's holding {industry.shortName.toLowerCase()} businesses back
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground">
            These aren't edge cases. They're the daily operational gaps that cost revenue.
          </p>
        </div>

        {/* Right: items separated by horizontal dividers — no cards */}
        <div>
          {industry.painPoints.map(({ title, description }, i) => (
            <div
              key={title}
              data-visible={reveal.visible}
              style={{ transitionDelay: `${i * 55}ms` }}
              className={`py-7 opacity-0 translate-y-3 transition-all duration-500 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 ${
                i < industry.painPoints.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-baseline gap-6">
                {/* Muted large number */}
                <span
                  className="shrink-0 font-display text-[2rem] leading-none"
                  style={{ color: `${industry.accentHex}35` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-semibold text-[15px] text-ink">{title}</div>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
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
// Section 4 — Capabilities: full-width numbered rows with dividers
// Layout: completely different from above (alternating three-column rows)
// ─────────────────────────────────────────────────────────────────────────────
function CapabilitiesSection({ industry }: { industry: Industry }) {
  const reveal = useScrollReveal();
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="py-20 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
      style={{ background: `${industry.accentHex}05` }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header row */}
        <div className="mb-0 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="section-label mb-3" style={{ color: industry.accentHex }}>
              Built for {industry.shortName}
            </div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Everything included. Nothing to configure.
            </h2>
          </div>
          <p className="max-w-xs text-[14px] text-muted-foreground">
            Pre-trained on {industry.name.toLowerCase()} workflows. Live within 48 hours.
          </p>
        </div>

        {/* Numbered editorial rows */}
        <div>
          {industry.capabilities.map(({ title, description }, i) => (
            <div
              key={title}
              data-visible={reveal.visible}
              style={{ transitionDelay: `${i * 45}ms` }}
              className={`grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_200px_1fr] items-baseline gap-x-6 gap-y-1 py-6 opacity-0 translate-y-2 transition-all duration-400 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 ${
                i < industry.capabilities.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* Number */}
              <span
                className="font-display text-xl leading-none"
                style={{ color: `${industry.accentHex}45` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Title */}
              <span className="font-semibold text-[15px] text-ink col-start-2">{title}</span>
              {/* Description */}
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
// Section 5 — Workflow: vertical tab selector + open transcript
// Layout: completely different (left sidebar + full-width transcript prose)
// ─────────────────────────────────────────────────────────────────────────────
function WorkflowSection({ industry }: { industry: Industry }) {
  const [activeTab, setActiveTab] = useState(0);
  const reveal = useScrollReveal();
  const wf = industry.workflows[activeTab];

  return (
    <section
      id="workflow"
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-12">
        <div className="section-label text-muted-foreground mb-3">Workflows</div>
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          How Khyra handles {industry.shortName.toLowerCase()} conversations
        </h2>
      </div>

      <div className="grid gap-12 lg:grid-cols-[200px_1fr] xl:grid-cols-[240px_1fr] lg:items-start">
        {/* Left: vertical tab list — just text, no card */}
        <div className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {industry.workflows.map((w, i) => (
            <button
              key={w.label}
              onClick={() => setActiveTab(i)}
              className={`relative flex-shrink-0 rounded-none text-left py-3 pr-6 pl-4 text-sm transition-all ${
                activeTab === i
                  ? "font-semibold text-ink"
                  : "font-medium text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {/* Active left border */}
              <span
                className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full transition-all"
                style={{ background: activeTab === i ? industry.accentHex : "transparent" }}
              />
              {w.label}
            </button>
          ))}
        </div>

        {/* Right: transcript — typography only, no containers */}
        <div className="min-h-[260px]">
          {/* Caller turn */}
          <div className="mb-8">
            <div className="section-label text-muted-foreground mb-3">Caller</div>
            <p className="text-lg text-ink leading-relaxed max-w-xl">
              "{wf.callerQ}"
            </p>
          </div>

          {/* Khyra turn — left accent border, italics */}
          <div
            className="mb-8 pl-5 border-l-2"
            style={{ borderColor: industry.accentHex }}
          >
            <div
              className="section-label mb-3"
              style={{ color: industry.accentHex }}
            >
              Khyra
            </div>
            <p className="text-lg text-ink italic leading-relaxed max-w-xl">
              "{wf.khyraReply}"
            </p>
          </div>

          {/* Actions — inline arrows, no card */}
          <div>
            <div className="section-label text-muted-foreground mb-3">Actions taken</div>
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
// Section 6 — Metrics: dark background, massive typography, no cards
// Layout: completely different (dark, full-bleed, huge numbers)
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
          The difference Khyra makes
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
// Section 7 — FAQ: full-width clean accordion, dividers only
// Layout: completely different from metrics (light, full-width, typographic)
// ─────────────────────────────────────────────────────────────────────────────
function FAQSection({ industry }: { industry: Industry }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-3xl px-6 py-24 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-12">
        <div className="section-label text-muted-foreground mb-3">FAQ</div>
        <h2 className="font-display text-3xl text-ink">
          {industry.shortName} questions, answered
        </h2>
      </div>

      {/* Accordion — dividers only, no card containers */}
      <div className="border-t border-border">
        {industry.faqs.map(({ question, answer }, i) => (
          <div key={question} className="border-b border-border">
            <button
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
// Section 8 — CTA: full-width editorial, dark background, left-aligned
// Layout: completely different (dark, left-aligned editorial)
// ─────────────────────────────────────────────────────────────────────────────
function CTASection({ industry }: { industry: Industry }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div
        className="relative overflow-hidden rounded-3xl px-10 py-16 md:px-16 md:py-20"
        style={{ background: "oklch(0.13 0.03 165)" }}
      >
        {/* Accent glow from right — single subtle element */}
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
          <h2 className="font-display text-3xl text-white md:text-5xl">
            Ready to see Khyra in action?
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Book a personalised demo and we'll walk you through exactly how Khyra handles{" "}
            {industry.name.toLowerCase()} calls — in your language, with your workflows.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div
              className="inline-flex rounded-full transition hover:opacity-90 active:scale-[0.97]"
              style={{ background: industry.accentHex }}
            >
              <BookDemoButton className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white">
                Book a demo <ArrowRight className="h-4 w-4" />
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
// Section 9 — Related: horizontal inline strip, no cards
// Layout: completely different (minimal horizontal row)
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
          Related
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
// Not Found
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
          The industry page you're looking for doesn't exist.
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
// Main export — assembles all sections in order
// ─────────────────────────────────────────────────────────────────────────────
export function IndustryPage({ slug }: { slug: string }) {
  const industry = INDUSTRY_MAP[slug];
  if (!industry) return <NotFoundPage />;

  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />
      {/* Section rhythm: split → horizontal → two-column list → rows → tabs → dark → accordion → dark → strip */}
      <IndustryHero industry={industry} />
      <CallFlowSection industry={industry} />
      <PainPointsSection industry={industry} />
      <CapabilitiesSection industry={industry} />
      <WorkflowSection industry={industry} />
      <MetricsSection industry={industry} />
      <FAQSection industry={industry} />
      <CTASection industry={industry} />
      <RelatedSection industry={industry} />
      <FooterSection />
    </main>
  );
}
