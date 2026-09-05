import React from "react";
import { Globe, Zap, Headphones, Activity, Mic, Workflow, ShieldCheck, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function FeaturesSection() {
  const reveal = useScrollReveal();
  const items = [
    {
      num: "01",
      Icon: Globe,
      title: "11 Indian languages",
      desc: "Hindi, English, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi, Odia.",
    },
    {
      num: "02",
      Icon: Zap,
      title: "Sub-second latency",
      desc: "Groq-powered LPU inference delivers end-to-end voice response under 800ms.",
    },
    {
      num: "03",
      Icon: Headphones,
      title: "Natural voice personas",
      desc: "Multiple male and female voices, tuned for regional Indian accents.",
    },
    {
      num: "04",
      Icon: Activity,
      title: "Context-aware turns",
      desc: "Remembers earlier turns in the call and responds intelligently without losing state.",
    },
    {
      num: "05",
      Icon: Mic,
      title: "Live barge-in",
      desc: "Callers can speak over the agent naturally; it pauses and adapts in real time.",
    },
    {
      num: "06",
      Icon: Workflow,
      title: "Domain pre-trained",
      desc: "Pre-trained on 15+ verticals — not a blank chatbot you have to retrain.",
    },
    {
      num: "07",
      Icon: ShieldCheck,
      title: "India data residency",
      desc: "Hosted in India. Encrypted at rest and in transit with enterprise RBAC throughout.",
    },
    {
      num: "08",
      Icon: Phone,
      title: "Telephony agnostic",
      desc: "Works with your existing number via SIP or WebSocket telephony bridge.",
    },
  ];

  return (
    <section
      ref={reveal.ref}
      id="features"
      className="mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      {/* Header */}
      <div className="mb-16 border-b border-border/60 pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Platform Architecture
        </span>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink md:text-5xl">
          Built for India. <span className="italic text-primary">Engineered for scale.</span>
        </h2>
      </div>

      {/* Editorial Specification Grid — Dividers only, no cards */}
      <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ num, Icon, title, desc }) => (
          <div key={title} className="group relative border-t border-border/60 pt-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-xs font-semibold text-muted-foreground/60">
                {num}
              </span>
              <Icon className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
            </div>

            <h3 className="font-semibold text-ink text-base tracking-tight mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
