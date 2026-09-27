import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Database, ShieldCheck, Workflow } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { pillars } from "@/data/landing";
import type { UseCaseTab } from "@/data/landing";

interface PillarsSectionProps {
  setActiveTab?: (tab: UseCaseTab) => void;
}

const ROLE_BLUEPRINTS: Record<string, {
  workflows: string[];
  systems: string;
  safeguard: string;
}> = {
  "Customer Support Operator": {
    workflows: [
      "Tier-1 inquiry triage and knowledge-base problem resolution",
      "Automated ticket creation with structured entity tagging",
      "Live order/account status lookup from CRM or ERP",
      "Context-rich warm handoff to human specialists",
    ],
    systems: "Zendesk, Salesforce Service Cloud, HubSpot, Jira Service Management, Intercom",
    safeguard: "Immediate transfer to human agents upon sentiment dip, complex policy exceptions, or low confidence.",
  },
  "Front Desk & Reception": {
    workflows: [
      "24/7 inbound interaction greeting and caller identification",
      "Real-time calendar slot validation, booking, and slot locking",
      "Multi-channel confirmation dispatch (SMS, Email, WhatsApp)",
      "Cancellation processing with immediate schedule re-opening",
    ],
    systems: "Google Calendar, Microsoft 365, Practo, Cloudbeds, Mindbody, Custom PMS",
    safeguard: "Double-booking prevention lock, buffer window enforcement, and emergency call transfer.",
  },
  "Sales & Lead Qualification": {
    workflows: [
      "Instant inbound lead engagement and requirement gathering",
      "BANT (Budget, Authority, Need, Timeline) qualification rubric scoring",
      "Automated CRM deal creation and contact enrichment",
      "Discovery call calendar booking with account executives",
    ],
    systems: "Salesforce CRM, HubSpot, LeadSquared, Pipedrive, Calendly",
    safeguard: "Strict adherence to qualification parameters; non-qualifying inquiries routed to email nurturing.",
  },
  "Scheduling & Coordination": {
    workflows: [
      "Multi-party appointment booking and schedule conflict resolution",
      "Automated reschedule workflows initiated by customer or staff",
      "Proactive attendance reminders and pre-visit intake checks",
      "Resource and room assignment management",
    ],
    systems: "Outlook Calendar, Google Workspace, Cal.com, Acuity Scheduling, EHR/PMS",
    safeguard: "Enforces minimum notice windows, cancellation policies, and automated waitlist backfilling.",
  },
  "Field & Service Operations": {
    workflows: [
      "Urgent inbound triage and emergency level classification",
      "Automated work order creation with location and issue details",
      "Technician availability verification and arrival window booking",
      "Real-time status updates to customers and dispatcher dashboard",
    ],
    systems: "ServiceTitan, Jobber, Housecall Pro, Salesforce Field Service, Custom ERP",
    safeguard: "Immediate escalation for life-safety or structural emergencies, with direct phone transfer.",
  },
};

export function PillarsSection({ setActiveTab }: PillarsSectionProps) {
  const [expandedRole, setExpandedRole] = useState<string | null>("Customer Support Operator");

  const handleToggle = (title: string, tab: UseCaseTab) => {
    setExpandedRole((prev) => (prev === title ? null : title));
    if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  return (
    <RevealSection id="roles" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 border-t border-border/70 scroll-mt-24">
      {/* Anchor for backward compatibility with operational-roles link */}
      <div id="operational-roles" className="sr-only" />

      <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
        {/* Left Editorial Text Column (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Operational Roles & Functions
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl leading-tight">
            One AI system. <br />
            <span className="italic text-primary">Configured for your core workflows.</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Khyra is not a one-trick receptionist bot. It operates as a digital employee configured with the specific business logic, system connections, and escalation protocols required for distinct operational functions.
          </p>
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Enterprise Adaptability
            </h4>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Each operational role connects to your existing software stack and follows your team's exact operating guidelines. Click any role to inspect its automated workflows and system connectors.
            </p>
          </div>
        </div>

        {/* Right Editorial Stacked List (7 cols) */}
        <div className="lg:col-span-7 border-t border-border/70 divide-y divide-border/70">
          {pillars.map(({ Icon, title, description, tab, outcomes }, index) => {
            const isExpanded = expandedRole === title;
            const blueprint = ROLE_BLUEPRINTS[title];

            return (
              <div
                key={title}
                className="py-6 transition-colors rounded-xl px-4 -mx-4 hover:bg-secondary/15"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggle(title, tab)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleToggle(title, tab);
                    }
                  }}
                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <span className="font-mono text-xs font-semibold text-muted-foreground/60 pt-1">
                        0{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="font-display text-2xl text-ink group-hover:text-primary transition-colors">
                            {title}
                          </h3>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                          {description}
                        </p>

                        {/* Concrete operational outcomes */}
                        {outcomes && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {outcomes.map((outcome) => (
                              <span
                                key={outcome}
                                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80 font-medium"
                              >
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                {outcome}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary shrink-0 pt-1">
                      <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Inline Expandable Details Panel */}
                {isExpanded && blueprint && (
                  <div className="mt-6 rounded-2xl border border-primary/25 bg-secondary/35 p-6 animate-in fade-in-50 slide-in-from-top-2 duration-300">
                    <div className="grid gap-5 md:grid-cols-2">
                      {/* Left: Automated Workflows */}
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink mb-3">
                          <Workflow className="h-4 w-4 text-primary" />
                          <span>Automated Workflows</span>
                        </div>
                        <ul className="space-y-2 text-xs text-muted-foreground">
                          {blueprint.workflows.map((wf) => (
                            <li key={wf} className="flex items-start gap-2">
                              <span className="font-mono text-primary font-bold">→</span>
                              <span>{wf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Connected Systems & Safeguards */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                            <Database className="h-3.5 w-3.5 text-primary" />
                            <span>Software & Stack Sync</span>
                          </div>
                          <p className="text-xs font-mono text-muted-foreground bg-background/80 p-2.5 rounded-lg border border-border/60">
                            {blueprint.systems}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Escalation Safeguard</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {blueprint.safeguard}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action link */}
                    <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Ready to automate this role in your stack?
                      </span>
                      <Link
                        to="/book-demo"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        <span>Schedule a role blueprint session</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
