import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TopBanner, SiteNav } from "@/components/site-nav";
import { FooterSection } from "@/components/landing/sections/FooterSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import {
  VoiceToActionStage,
  NumberedIndustryList,
  VerticalMatrixSection,
  CustomVerticalCTA,
} from "@/components/industry/IndustryHubComponents";

export const Route = createFileRoute("/industries/")({
  component: IndustriesHubPage,
});

function IndustriesHubPage() {
  return (
    <main className="min-h-screen bg-background text-ink">
      <TopBanner />
      <SiteNav />

      {/* ─────────────────────────────────────────────────────────────────────────
          HERO — Editorial Left-Aligned Composition (No cards, generous space)
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-border/60">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Left Hero Text (8 cols) */}
          <div className="lg:col-span-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Vertical Intelligence Engine
            </span>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink sm:text-7xl">
              Built for your industry. <br />
              <span className="italic text-primary">Engineered for execution.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-muted-foreground">
              Khyra adapts to the exact way your organization operates — understanding domain terminology, navigating complex business rules, and executing backend system actions in real time.
            </p>
          </div>

          {/* Right Hero CTA & Features (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-border/60 lg:pl-8">
            <div className="space-y-1">
              <div className="font-display text-xl font-bold text-ink">End-to-End System Action</div>
              <div className="text-xs text-muted-foreground">Directly syncs with your CRM, EHR, PMS &amp; scheduling tools</div>
            </div>
            <div className="space-y-1">
              <div className="font-display text-xl font-bold text-primary">Human Escalation Protocol</div>
              <div className="text-xs text-muted-foreground">Seamless warm handoffs with real-time situational briefs</div>
            </div>
            <div className="pt-2">
              <BookDemoButton className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-ink/90 active:scale-[0.98]">
                Schedule an industry demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </BookDemoButton>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 1 — The Core Visual Engine: Voice-to-Action Pipeline
      ───────────────────────────────────────────────────────────────────────── */}
      <VoiceToActionStage />

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 2 — Numbered Specification Rows 01-09 (No Cards)
      ───────────────────────────────────────────────────────────────────────── */}
      <NumberedIndustryList />

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 3 — Software Ecosystem Matrix Table
      ───────────────────────────────────────────────────────────────────────── */}
      <VerticalMatrixSection />

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 4 — Custom Vertical Engineering CTA
      ───────────────────────────────────────────────────────────────────────── */}
      <CustomVerticalCTA />

      <FooterSection />
    </main>
  );
}
