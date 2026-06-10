import { ArrowRight, Mic } from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import { demoFields } from "@/data/landing";

function DemoField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-3">
      <div className="text-[10px] uppercase tracking-wider opacity-60">
        {label}
      </div>

      <div className="mt-1">{value}</div>
    </div>
  );
}

export function FinalCTASection() {
  return (
    <RevealSection className="mx-auto max-w-7xl px-6 pt-16 md:pt-24">
      <div className="rounded-3xl border border-primary-foreground/15 bg-primary p-12 text-center text-primary-foreground md:p-20">
        <h2 className="mx-auto max-w-2xl font-display text-4xl md:text-6xl">
          Every missed call is a missed opportunity.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
          Give your business an AI voice agent that sounds local, works around
          the clock, and costs a fraction of a full-time hire.
        </p>

        <BookDemoButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-primary transition hover:opacity-90">
          Book a demo <ArrowRight className="h-4 w-4" />
        </BookDemoButton>
      </div>
    </RevealSection>
  );
}