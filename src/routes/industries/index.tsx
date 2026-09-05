import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Stethoscope, Building2, Sparkles, Hotel, PawPrint, GraduationCap, Server, Activity } from "lucide-react";
import { TopBanner, SiteNav } from "@/components/site-nav";
import { FooterSection } from "@/components/landing/sections/FooterSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import { INDUSTRIES } from "@/data/industries";

export const Route = createFileRoute("/industries/")({
  component: IndustriesHubPage,
});

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope, Building2, Sparkles, Hotel, PawPrint, GraduationCap, Server, Activity,
};

function IndustriesHubPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.25]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 60%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            9 Industries · 1 Platform
          </div>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-7xl">
            Built for your industry.
            <br />
            <span className="italic text-primary/90">Not just any business.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
            Khyra adapts to the way your business handles customer conversations — with
            industry-specific workflows, terminology, and outcomes out of the box.
          </p>
          <div className="mt-10">
            <BookDemoButton className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-semibold text-primary-foreground shadow-xl shadow-primary/15 transition-all hover:shadow-2xl hover:shadow-primary/25 active:scale-[0.98]">
              Book a demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BookDemoButton>
          </div>
        </div>
      </section>

      {/* Industry grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Industries</div>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
            Choose your industry
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => {
            const Icon = ICON_MAP[industry.icon] ?? Sparkles;
            return (
              <Link
                key={industry.slug}
                to={`/industries/${industry.slug}` as any}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-transparent hover:shadow-xl"
              >
                {/* Hover border glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${industry.accentHex}50` }}
                />

                {/* Icon */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${industry.accentHex}18` }}
                >
                  <Icon className="h-6 w-6" style={{ color: industry.accentHex }} />
                </div>

                {/* Content */}
                <div
                  className="mb-2 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: industry.accentHex }}
                >
                  {industry.name}
                </div>
                <h3 className="flex-1 text-lg font-semibold leading-snug text-ink">
                  {industry.heroHeadline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {industry.heroSubhead}
                </p>

                {/* CTA row */}
                <div
                  className="mt-6 flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-0.5"
                  style={{ color: industry.accentHex }}
                >
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-card p-10 text-center md:p-16">
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Don't see your industry?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Khyra can be configured for virtually any appointment-driven or customer-facing business.
            Book a demo and we'll show you what's possible for your vertical.
          </p>
          <div className="mt-8">
            <BookDemoButton className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:bg-primary/90 active:scale-[0.98]">
              Talk to us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BookDemoButton>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
