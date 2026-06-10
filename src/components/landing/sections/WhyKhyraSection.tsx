import { RevealSection } from "@/components/landing/ui/RevealSection";
import { whyKhyraItems } from "@/data/landing";
import mascot from "@/assets/khyra-mascot.png";

export function WhyKhyraSection() {
  return (
    <RevealSection className="bg-beige/40 mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative mx-auto max-w-md">
          <div className="absolute inset-x-0 top-8 -z-10 mx-auto h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <img
            src={mascot}
            alt="Khyra AI mascot"
            className="relative mx-auto w-full rounded-4xl border border-border bg-background object-cover shadow-2xl"
          />
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why Khyra</div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Built in India. <span className="italic text-primary">Built for India.</span>
          </h2>

          <ul className="mt-10 space-y-6 rounded-4xl border border-border bg-background p-8">
            {whyKhyraItems.map((item, index) => (
              <li key={item.title} className="group rounded-3xl border border-border/60 bg-card p-6 transition hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="font-display text-xl text-primary/80">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="font-medium text-ink">{item.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </RevealSection>
  );
}
