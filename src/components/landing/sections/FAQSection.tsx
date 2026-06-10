import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { faqItems } from "@/data/landing";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <RevealSection id="faq" className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12 text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">FAQ</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Questions, answered.</h2>
      </div>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="font-medium text-ink">{item.question}</span>
                {isOpen ? (
                  <Minus className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {isOpen && <div className="px-6 pb-6 text-sm text-muted-foreground">{item.answer}</div>}
            </div>
          );
        })}
      </div>
    </RevealSection>
  );
}
