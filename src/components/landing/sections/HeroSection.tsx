import { useState, useEffect, type ReactNode } from "react";
import { ArrowRight, Workflow, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { HERO_INDUSTRY_ROTATIONS } from "@/data/industries";

function Bubble({ who, children }: { who: "caller" | "khyra"; children: ReactNode }) {
  const isKhyra = who === "khyra";
  return (
    <div className={`flex ${isKhyra ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-5 py-3 text-sm md:text-[15px] leading-relaxed ${
          isKhyra
            ? "bg-primary text-primary-foreground rounded-bl-sm shadow-sm"
            : "bg-background border border-border/80 text-foreground rounded-br-sm shadow-xs"
        }`}
      >
        <div
          className={`mb-1 text-[10px] font-semibold uppercase tracking-wider ${
            isKhyra ? "text-primary-foreground/75" : "text-muted-foreground"
          }`}
        >
          {isKhyra ? "Khyra Operational AI" : "Customer / Caller"}
        </div>
        {children}
      </div>
    </div>
  );
}

const ROTATION_INTERVAL = 5500;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % HERO_INDUSTRY_ROTATIONS.length);
        setFading(false);
      }, 300);
    }, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const scenario = HERO_INDUSTRY_ROTATIONS[activeIndex];

  return (
    <RevealSection id="top" className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 65%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Top category label */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Operational AI Platform · Workflow Automation
          </div>

          <h1 className="font-display text-5xl leading-[1.04] text-balance text-ink sm:text-6xl md:text-7xl lg:text-8xl">
            Turn business conversations into{" "}
            <span className="italic text-primary">completed operations.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-balance text-base font-light leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            Khyra is an operational AI platform that communicates with customers and stakeholders across voice and digital channels, reasons through defined business rules, and executes the backend workflows behind every interaction — 24/7, without manual overhead.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookDemoButton className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-[15px] font-semibold text-primary-foreground shadow-xl shadow-primary/15 transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/25 active:scale-[0.98]">
              Schedule a Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BookDemoButton>
            <a
              href="#workflow-engine"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-4 text-[15px] font-semibold text-foreground transition hover:bg-secondary active:scale-[0.98]"
            >
              See How Khyra Works <Workflow className="h-4 w-4 text-primary" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> No account required to request demo
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Connects to existing software & telephony
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Human escalation safeguards included
            </span>
          </div>
        </div>

        {/* Rotating operational execution card */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-3xl border border-primary/15 bg-background/95 p-3 shadow-[0_30px_90px_-20px_color-mix(in_oklab,var(--primary)_20%,transparent)] backdrop-blur">
            <div className="rounded-[1.4rem] bg-beige/35 p-6 md:p-8">
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-border/50 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-semibold uppercase tracking-wider text-ink/75">
                    Live Workflow Simulation
                  </span>
                </div>

                {/* Industry tabs */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-medium uppercase tracking-wider">
                  {HERO_INDUSTRY_ROTATIONS.map((r, i) => (
                    <button
                      key={r.industry}
                      type="button"
                      onClick={() => {
                        setFading(true);
                        setTimeout(() => { setActiveIndex(i); setFading(false); }, 200);
                      }}
                      className={`px-2.5 py-1 rounded-full transition-colors ${
                        activeIndex === i
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {r.industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversation & Action Stage */}
              <div
                className={`mt-6 space-y-4 transition-opacity duration-300 ${
                  fading ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Workflow badge */}
                <div className="flex justify-start">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider border"
                    style={{
                      background: `${scenario.accentHex}12`,
                      borderColor: `${scenario.accentHex}30`,
                      color: scenario.accentHex,
                    }}
                  >
                    Workflow: {scenario.badge}
                  </span>
                </div>

                <Bubble who="caller">{scenario.callerLine}</Bubble>
                <Bubble who="khyra">{scenario.khyraLine}</Bubble>

                {/* Backend Execution Actions strip */}
                <div className="mt-5 rounded-2xl border border-border/80 bg-background/80 p-4">
                  <div className="mb-2.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 text-primary">
                      <Workflow className="h-3.5 w-3.5" /> Backend Operational Tasks Executed
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Sync Complete
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scenario.actions.map((action) => (
                      <span
                        key={action}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Autonomous Execution with Human Escalation Safeguard
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Workflow Engine · System Synchronized
                </span>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-5 flex justify-center gap-2">
            {HERO_INDUSTRY_ROTATIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFading(true); setTimeout(() => { setActiveIndex(i); setFading(false); }, 200); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-7 bg-primary" : "w-1.5 bg-primary/25"
                }`}
                aria-label={`Show ${HERO_INDUSTRY_ROTATIONS[i].industry} operational workflow`}
              />
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
