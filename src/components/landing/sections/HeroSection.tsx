import { useState, type ReactNode } from "react";
import { ArrowRight, Activity, Mic } from "lucide-react";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { heroConversationByLanguage } from "@/data/landing";


type HeroLanguage = keyof typeof heroConversationByLanguage;

function Bubble({ who, children }: { who: "caller" | "khyra"; children: ReactNode }) {
  const isKhyra = who === "khyra";
  return (
    <div className={`flex ${isKhyra ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
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

export function HeroSection() {
  const [language, setLanguage] = useState<HeroLanguage>("HN");
  const heroConversation = heroConversationByLanguage[language];

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
            Built in India · 11 Indian languages
          </div>
          <h1 className="font-display text-6xl leading-[1.02] text-balance text-ink md:text-8xl">
            Your customers called.
            <br />
            <span className="italic text-primary/90">Khyra already answered.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            AI voice agents that handle front desk, sales follow-up and Tier-1 support — in <span className="font-normal text-foreground">11 Indian languages</span>, with sub-second response time.
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

        <div className="mx-auto mt-20 max-w-4xl">
          <div className="rounded-4xl border border-primary/10 bg-background/90 p-3 shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--primary)_28%,transparent)] backdrop-blur">
            <div className="rounded-[1.6rem] bg-beige/40 p-6 md:p-10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron" />
                  </span>
                  <span className="font-medium uppercase tracking-wider text-foreground/50">Live call · Khyra Front Desk</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-foreground/40">
                  {(["EN", "KN", "HN"] as const).map((lang, index) => (
                    <span key={lang} className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLanguage(lang)}
                        className={`transition ${language === lang ? "text-foreground font-medium" : "text-muted-foreground"}`}
                        aria-pressed={language === lang}
                      >
                        {lang}
                      </button>
                      {index < 2 && <span className="opacity-40">|</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {heroConversation.map(({ who, text }) => (
                  <Bubble key={text} who={who}>{text}</Bubble>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full bg-primary" /> Latency · 612ms
                </span>
                <span>Intent: Book appointment · ✓ Calendar updated · ✓ SMS sent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
