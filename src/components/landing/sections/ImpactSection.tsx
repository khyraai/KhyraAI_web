import { RevealSection } from "@/components/landing/ui/RevealSection";
import { impactStats } from "@/data/landing";

export function ImpactSection() {
  return (
    <RevealSection className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] opacity-70">Impact</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            The numbers that <span className="italic" style={{ color: "var(--beige-deep)" }}>matter</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {impactStats.map((stat) => (
            <div key={stat.label} className="border-t border-primary-foreground/15 pt-6">
              <div className="font-display text-5xl md:text-6xl">{stat.value}</div>
              <div className="mt-3 text-sm opacity-75">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
