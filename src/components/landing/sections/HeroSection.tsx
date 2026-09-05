import { useState, useEffect, type ReactNode } from "react";
import { ArrowRight, Mic } from "lucide-react";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { HERO_INDUSTRY_ROTATIONS } from "@/data/industries";

function Bubble({ who, children }: { who: "caller" | "khyra"; children: ReactNode }) {
  const isKhyra = who === "khyra";
  return (
    <div className={`flex ${isKhyra ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isKhyra
            ? "bg-primary text-primary-foreground rounded-bl-sm"
            : "bg-background border border-border rounded-br-sm"
        }`}
      >
        <div
          className={`mb-0.5 text-[10px] uppercase tracking-wider ${
            isKhyra ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {isKhyra ? "Khyra" : "Caller"}
        </div>
        {children}
      </div>
    </div>
  );
}

const ROTATION_INTERVAL = 4500;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % HERO_INDUSTRY_ROTATIONS.length);
        setFading(false);
      }, 350);
    }, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const scenario = HERO_INDUSTRY_ROTATIONS[activeIndex];

  return (
    <RevealSection id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 65%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-12 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron" />
            </span>
            AI voice agents for every customer-facing business
          </div>
          <h1 className="font-display text-6xl leading-[1.02] text-balance text-ink md:text-8xl">
            Every customer call
            <br />
            <span className="italic text-primary/90">ends with an action.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            Khyra's AI voice agents answer, qualify, book, and follow up — across{" "}
            <span className="font-normal text-foreground">9 industries</span> and{" "}
            <span className="font-normal text-foreground">11 languages</span>, with sub-second
            response time.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <BookDemoButton className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-semibold text-primary-foreground shadow-xl shadow-primary/15 transition-all hover:shadow-2xl hover:shadow-primary/25 active:scale-[0.98]">
              Book a demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BookDemoButton>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-4 text-[15px] font-semibold text-foreground transition hover:bg-secondary"
            >
              Hear it live <Mic className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Rotating industry demo card */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="rounded-4xl border border-primary/10 bg-background/90 p-3 shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--primary)_28%,transparent)] backdrop-blur">
            <div className="rounded-[1.6rem] bg-beige/40 p-6 md:p-10">
              {/* Header row */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron" />
                  </span>
                  <span className="font-medium uppercase tracking-wider text-foreground/50">
                    Live call
                  </span>
                </div>
                {/* Industry tabs */}
                <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest">
                  {HERO_INDUSTRY_ROTATIONS.map((r, i) => (
                    <button
                      key={r.industry}
                      type="button"
                      onClick={() => {
                        setFading(true);
                        setTimeout(() => { setActiveIndex(i); setFading(false); }, 200);
                      }}
                      className={`transition-colors ${
                        activeIndex === i
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground hover:text-foreground/70"
                      }`}
                    >
                      {r.industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversation bubbles */}
              <div
                className={`mt-6 space-y-4 transition-opacity duration-300 ${
                  fading ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Industry badge */}
                <div className="mb-2 flex justify-center">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                    style={{
                      background: `${scenario.accentHex}18`,
                      color: scenario.accentHex,
                    }}
                  >
                    {scenario.badge}
                  </span>
                </div>

                <Bubble who="caller">{scenario.callerLine}</Bubble>
                <Bubble who="khyra">{scenario.khyraLine}</Bubble>

                {/* Actions row */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {scenario.actions.map((action) => (
                    <span
                      key={action}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/70"
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full bg-primary" /> Latency · 612ms
                </span>
                <span>Intent recognised · Action taken · ✓</span>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-5 flex justify-center gap-2">
            {HERO_INDUSTRY_ROTATIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFading(true); setTimeout(() => { setActiveIndex(i); setFading(false); }, 200); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-6 bg-primary" : "w-1.5 bg-primary/25"
                }`}
                aria-label={`Show ${HERO_INDUSTRY_ROTATIONS[i].industry} demo`}
              />
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
