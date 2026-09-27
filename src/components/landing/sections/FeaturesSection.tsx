import {
  Activity,
  Database,
  Globe,
  Layers,
  PhoneForwarded,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function FeaturesSection() {
  const reveal = useScrollReveal();

  const capabilities = [
    {
      num: "01",
      Icon: Workflow,
      title: "Workflow Execution Engine",
      desc: "Evaluates business logic, validates parameters, and triggers transactions directly inside your software rather than simply providing canned script responses.",
    },
    {
      num: "02",
      Icon: Database,
      title: "Enterprise Systems Integration",
      desc: "Connects securely with CRMs (Salesforce, HubSpot), scheduling calendars, EHRs, ticketing systems, ERPs, and custom internal REST APIs.",
    },
    {
      num: "03",
      Icon: PhoneForwarded,
      title: "Telephony & Multi-Channel Ingestion",
      desc: "Bridges to your existing business phone numbers, SIP infrastructure, and cloud telephony with zero requirement to port or alter your numbers.",
    },
    {
      num: "04",
      Icon: Activity,
      title: "Context-Aware Multi-Turn Dialog",
      desc: "Maintains conversational state across multi-step inquiries, seamlessly handling user interruptions, topic shifts, and mid-sentence corrections.",
    },
    {
      num: "05",
      Icon: ShieldCheck,
      title: "Enterprise Governance & Security",
      desc: "End-to-end encryption in transit (TLS 1.3) and at rest (AES-256), strict role-based access control (RBAC), and immutable operational audit logs.",
    },
    {
      num: "06",
      Icon: Globe,
      title: "Global Multilingual Capability",
      desc: "Polished English by default for international business operations, with adaptable multilingual support for diverse customer geographies.",
    },
    {
      num: "07",
      Icon: Users,
      title: "Contextual Human Escalation",
      desc: "When complex judgment or edge cases arise, Khyra executes warm handoffs to human staff, complete with a structured summary brief.",
    },
    {
      num: "08",
      Icon: Layers,
      title: "Continuous Observability",
      desc: "Real-time visibility into every conversation, completed workflow step, system payload, and operational outcome across all channels.",
    },
  ];

  return (
    <section
      ref={reveal.ref}
      id="features"
      className="mx-auto max-w-7xl px-6 py-24 sm:py-32 border-t border-border/70"
    >
      {/* Header */}
      <div className="mb-16 border-b border-border/60 pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Platform Architecture & Capabilities
        </span>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink md:text-5xl">
          Engineered for operational rigor.{" "}
          <span className="italic text-primary">Built to integrate.</span>
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
          Khyra sits between your communication layer and your core operational systems, executing tasks safely within predefined guardrails.
        </p>
      </div>

      {/* Specification Grid */}
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map(({ num, Icon, title, desc }) => (
          <div key={title} className="group relative border-t border-border/60 pt-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-xs font-semibold text-muted-foreground/60">
                {num}
              </span>
              <Icon className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors" />
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
