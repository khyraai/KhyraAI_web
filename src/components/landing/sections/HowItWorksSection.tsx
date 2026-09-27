import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { howItWorksSteps } from "@/data/landing";

export function HowItWorksSection() {
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      id="how-it-works"
      data-visible={reveal.visible}
      className="bg-beige/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 border-t border-border/70"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Implementation Methodology
          </div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl lg:text-6xl">
            From workflow mapping to live execution.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            A disciplined, enterprise-ready deployment process that connects to your existing infrastructure without disrupting day-to-day business.
          </p>
        </div>

        {/* 6-step Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-background/90 p-8 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="font-mono text-3xl font-bold text-primary/80">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/50 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                Phase {step.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
