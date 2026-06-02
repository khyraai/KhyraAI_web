import { RevealSection } from "@/components/landing/ui/RevealSection";
import { useCases } from "@/data/landing";
import type { UseCaseTab } from "@/data/landing";

interface UseCasesSectionProps {
  activeTab: UseCaseTab;
  setActiveTab: (tab: UseCaseTab) => void;
}

export function UseCasesSection({ activeTab, setActiveTab }: UseCasesSectionProps) {

  const tabKeys = Object.keys(useCases) as UseCaseTab[];

  return (
    <RevealSection id="use-cases" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-10 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Use cases</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">One platform. Every conversation.</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tabKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeTab === key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {useCases[activeTab].map(([title, description]) => (
          <div key={title} className="rounded-xl border border-border bg-card p-6 transition hover:border-primary/30">
            <div className="font-medium text-ink">{title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
