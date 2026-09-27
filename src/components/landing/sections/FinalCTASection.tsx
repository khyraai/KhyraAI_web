import { ArrowRight, CheckCircle2, ShieldCheck, Workflow } from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";

export function FinalCTASection() {
  return (
    <RevealSection className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="rounded-3xl border border-primary-foreground/15 bg-primary p-10 text-center text-primary-foreground md:p-20 shadow-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/90 backdrop-blur mb-6">
          <Workflow className="h-3.5 w-3.5" />
          Transform Conversation Into Completed Work
        </div>

        <h2 className="mx-auto max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08]">
          Ready to automate the operations behind every conversation?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-primary-foreground/80">
          Speak with a Khyra solutions specialist to evaluate your communication touchpoints, identify repetitive manual bottlenecks, and explore a tailored workflow deployment.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <BookDemoButton className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary transition hover:bg-white/95 active:scale-95 shadow-xl">
            Schedule a Demo <ArrowRight className="h-4 w-4" />
          </BookDemoButton>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-primary-foreground/70">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Direct consultation — no signup needed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Integrates with your existing software stack
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Enterprise response within 24 hours
          </span>
        </div>
      </div>
    </RevealSection>
  );
}