import { useState } from "react";
import { CheckCircle2, ShieldCheck, Sparkles, Workflow, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Industry } from "@/data/industries";

interface UniversalEvidenceShowcaseProps {
  industry: Industry;
}

export function UniversalEvidenceShowcase({ industry }: UniversalEvidenceShowcaseProps) {
  const [activeStep, setActiveStep] = useState(0);
  const reveal = useScrollReveal();

  const currentWorkflow = industry.workflows[activeStep] || industry.workflows[0];

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
            <span className="section-label" style={{ color: industry.accentHex }}>
              Operational Product Evidence
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Execution Flow
            </span>
          </div>
          <h2 className="font-display text-3xl text-ink md:text-5xl leading-tight">
            How Khyra executes <span className="italic text-primary">{industry.shortName} workflows</span>.
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          Every conversation is verified against your business rules and directly synchronizes records, bookings, and dispatch tasks in your software stack.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="mb-8 flex flex-wrap gap-2.5 border-b border-border/60 pb-4">
        {industry.workflows.map((wf, idx) => (
          <button
            key={wf.label}
            type="button"
            onClick={() => setActiveStep(idx)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
              activeStep === idx
                ? "bg-ink text-white shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-ink"
            }`}
          >
            <span className="font-mono opacity-60">0{idx + 1}</span>
            <span>{wf.label}</span>
          </button>
        ))}
      </div>

      {/* Main Showcase Grid */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left: Conversation & Intent Extraction (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-border/70 bg-secondary/30 p-5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Caller Interaction</span>
              <span className="font-mono text-primary">Inbound Stream</span>
            </div>
            <p className="text-sm font-medium text-ink italic leading-relaxed bg-background/90 p-3.5 rounded-xl border border-border/50">
              "{currentWorkflow.callerQ}"
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-secondary/30 p-5 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-primary">
              <span>Khyra Operational Response</span>
              <span className="text-emerald-600 font-mono text-[10px]">Intent Verified</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed bg-background/90 p-3.5 rounded-xl border border-border/50">
              "{currentWorkflow.khyraReply}"
            </p>
          </div>
        </div>

        {/* Right: Executed Backend System Payload (7 cols) */}
        <div className="lg:col-span-7">
          <div
            className="rounded-2xl border border-border/80 bg-background/95 p-6 shadow-xl backdrop-blur-md space-y-5"
            style={{ borderColor: `${industry.accentHex}35` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3.5">
              <div className="flex items-center gap-2.5">
                <Workflow className="h-4 w-4" style={{ color: industry.accentHex }} />
                <span className="font-display text-base font-bold text-ink">
                  Completed Backend Actions
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                ● 200 OK · Action Executed
              </span>
            </div>

            <div className="space-y-3">
              {currentWorkflow.actions.map((act, idx) => (
                <div
                  key={act}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border/50 bg-secondary/20 text-xs font-medium text-ink"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{act}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">
                    Stage 0{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Synchronized with connected software databases &amp; audit trails</span>
              </div>
              <span className="font-mono text-[10px] text-primary font-semibold">
                Autonomous with Safeguards
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
