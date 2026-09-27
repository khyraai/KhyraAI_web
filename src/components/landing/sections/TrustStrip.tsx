import { RevealSection } from "@/components/landing/ui/RevealSection";
import { trustIndustries, trustStats } from "@/data/landing";

export function TrustStrip() {
  return (
    <RevealSection className="border-y border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Deployable across conversation-heavy industries
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-muted-foreground">
          {trustIndustries.map(({ Icon, label }) => (
            <div key={label} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80">
              <Icon className="h-4 w-4 text-primary" /> {label}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/70 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="bg-background p-6 flex flex-col justify-between">
              <div>
                <div className="font-display text-2xl text-ink md:text-3xl font-semibold">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-foreground/90">{stat.label}</div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground leading-relaxed">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
