import { ArrowRight } from "lucide-react";
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
    <RevealSection className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-end gap-10 md:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What is Khyra</div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            The voice layer for your <span className="italic text-primary">business operations</span>.
          </h2>
        </div>
        <p className="text-muted-foreground">
          Enterprise-grade AI voice agents built specifically for the Indian market. Replace or augment your front desk, sales callers and support teams — fluent in 11 Indian languages, integrated with your stack, live in hours.
        </p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pillars.map(({ Icon, title, description, tab }) => (
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
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-beige text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-display text-2xl text-ink">{title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            <ArrowRight className="absolute right-6 top-7 h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
