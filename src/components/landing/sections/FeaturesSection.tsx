import React from "react";
import { Globe, Zap, Headphones, Activity, Mic, Workflow, ShieldCheck, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function FeaturesSection() {
  const reveal = useScrollReveal();
  const items = [
    {
      i: Globe,
      t: "11 Indian languages",
      d: "Hindi, English, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi, Odia.",
    },
    {
      i: Zap,
      t: "Sub-second latency",
      d: "Groq-powered LPU inference delivers end-to-end voice response under 800ms.",
    },
    {
      i: Headphones,
      t: "Natural voice personas",
      d: "Multiple male and female voices, tuned for Indian accents.",
    },
    {
      i: Activity,
      t: "Context-aware",
      d: "Remembers earlier turns in the call and responds intelligently.",
    },
    {
      i: Mic,
      t: "Live interruptions",
      d: "Callers can talk over the agent; it adapts in real time like a human.",
    },
    {
      i: Workflow,
      t: "Domain intelligence",
      d: "Pre-trained on 15+ verticals — not a generic chatbot you retrain.",
    },
    {
      i: ShieldCheck,
      t: "India data residency",
      d: "Hosted in India. Encrypted at rest and in transit. RBAC throughout.",
    },
    {
      i: Phone,
      t: "Telephony agnostic",
      d: "Works with your existing number via SIP / WebSocket bridge.",
    },
  ];

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      id="features"
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Features</div>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink md:text-5xl">
            Built for India. <span className="italic text-primary">Engineered for scale.</span>
          </h2>
        </div>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ i: Icon, t, d }) => (
          <div key={t} className="bg-background p-6">
            <Icon className="h-5 w-5 text-primary" />
            <div className="mt-5 font-medium text-ink">{t}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
