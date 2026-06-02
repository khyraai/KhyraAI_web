import { RevealSection } from "@/components/landing/ui/RevealSection";
import { trustIndustries, trustStats } from "@/data/landing";

export function TrustStrip() {
  return (
    <RevealSection className="border-y border-border bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Venturing across industries
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
          {trustIndustries.map(({ Icon, label }) => (
            <div key={label} className="inline-flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4" /> {label}
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="bg-background p-6">
              <div className="font-display text-3xl text-primary md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
