import { ArrowUpRight } from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { pillars } from "@/data/landing";
import type { UseCaseTab } from "@/data/landing";

interface PillarsSectionProps {
  setActiveTab: (tab: UseCaseTab) => void;
}

export function PillarsSection({ setActiveTab }: PillarsSectionProps) {
  const handleSelect = (tab: UseCaseTab) => {
    setActiveTab(tab);
    document.getElementById("use-cases")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <RevealSection className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
        {/* Left Editorial Text Column (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What is Khyra
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl leading-tight">
            The voice layer for your{" "}
            <span className="italic text-primary">business operations</span>.
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Enterprise-grade AI voice agents built specifically for Indian business realities. Replace or augment your front desk, sales callers, and support teams — fluent in 11 Indian languages, integrated with your CRMs, live in hours.
          </p>
        </div>

        {/* Right Editorial Stacked List (7 cols) */}
        <div className="lg:col-span-7 border-t border-border/60 divide-y divide-border/60">
          {pillars.map(({ Icon, title, description, tab }, index) => (
            <div
              key={title}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(tab)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleSelect(tab);
                }
              }}
              className="group py-8 transition-colors hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-4 -mx-4 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                  <span className="font-mono text-xs font-semibold text-muted-foreground/60 pt-1">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="font-display text-2xl text-ink group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 shrink-0 pt-1">
                  <span>Explore</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
