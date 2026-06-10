import { ArrowRight, Check } from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { pricingTiers } from "@/data/landing";

export function PricingSection() {
  return (
    <RevealSection id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pricing</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          INR pricing for Indian teams.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl border p-8 transition ${tier.featured ? "border-primary bg-primary text-primary-foreground shadow-xl" : "border-border bg-background"}`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl font-semibold">{tier.name}</div>
                <p className={`mt-2 text-sm ${tier.featured ? "opacity-80" : "text-muted-foreground"}`}>{tier.description}</p>
              </div>
              {tier.featured ? <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Popular</span> : null}
            </div>

            <ul className="mt-8 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className={`mt-1 h-4 w-4 ${tier.featured ? "text-primary-foreground" : "text-primary"}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#demo"
              className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${tier.featured ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
            >
              {tier.featured ? "Talk to sales" : "Get started"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
