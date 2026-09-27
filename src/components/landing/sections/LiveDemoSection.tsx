import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw, ShieldCheck, Sparkles, Workflow, CheckCircle2 } from "lucide-react";
import { useLiveDemoSession, SiriOrb, DEMO_LANGUAGES, DEMO_ROLES, DEMO_VOICES, type DemoConfig } from "@/components/live-demo-modal";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "@tanstack/react-router";

const defaultRoleId = "support_line";
const defaultLanguageCode = "en";
const defaultVoiceId = "voice_1";

function getDefaultDemoConfig(roleId: string, domainId: string, languageCode: string, voiceId: string, voiceLabel: string): DemoConfig {
  return { roleId, domainId, languageCode, voiceId, voiceLabel };
}

export function LiveDemoSection() {
  const [active, setActive] = useState(false);
  const [simulatedStep, setSimulatedStep] = useState<number>(0);

  const [roleId, setRoleId] = useState<string>(defaultRoleId);
  const role = useMemo(
    () => DEMO_ROLES.find((item) => item.id === roleId) ?? DEMO_ROLES[0],
    [roleId],
  );
  const [domainId, setDomainId] = useState<string>(role.domains[0].id);
  const [languageCode, setLanguageCode] = useState<string>(defaultLanguageCode);
  const [voiceId, setVoiceId] = useState<string>(defaultVoiceId);

  useEffect(() => {
    if (!role.domains.some((domain) => domain.id === domainId)) {
      setDomainId(role.domains[0].id);
    }
  }, [domainId, role.domains]);

  const domain = useMemo(
    () => role.domains.find((item) => item.id === domainId) ?? role.domains[0],
    [domainId, role.domains],
  );

  const voice = useMemo(
    () => DEMO_VOICES.find((item) => item.id === voiceId) ?? DEMO_VOICES[0],
    [voiceId],
  );

  const config = useMemo(
    () =>
      getDefaultDemoConfig(
        role.id,
        domain.id,
        languageCode,
        voice.id,
        `${voice.label} · ${voice.gender}`,
      ),
    [domain.id, languageCode, role.id, voice.gender, voice.id, voice.label],
  );

  const { sessionState, orbState, statusLabel, errorMsg, micVolumeRef, endConversation } = useLiveDemoSession(config, active);

  const handleEndConversation = () => {
    endConversation();
    setActive(false);
    setSimulatedStep(0);
  };

  const roleWorkflowInfo = useMemo(() => {
    if (role.id === "support_line") {
      return {
        callerSample: "“Our team needs to update the webhook configuration for user authentication.”",
        intent: "Inbound Triage & Technical Work Order",
        action: "Queries knowledge base, creates priority ticket in Helpdesk, updates account log",
        system: "Zendesk · Jira Service Management · Internal DB",
        stages: [
          { phase: "01 / Inbound Intake", title: "Caller Query Verified", desc: "Recognizes verified client ID and parses technical configuration inquiry." },
          { phase: "02 / Reasoning & Rules", title: "Intent & Priority Scored", desc: "Applies enterprise support SLA policy (Tier-1 high-priority routing)." },
          { phase: "03 / System Execution", title: "Zendesk Ticket #TK-9081 Created", desc: "Automated ticket logging with error codes, attachments, and Slack notification to engineering." },
        ],
      };
    }
    if (role.id === "lead_followup") {
      return {
        callerSample: "“I'm inquiring about enterprise pricing for our 150-person organization.”",
        intent: "Inbound Lead Qualification & Meeting Booking",
        action: "Scores prospect criteria, enriches CRM profile, reserves executive discovery slot",
        system: "Salesforce CRM · HubSpot · Outlook Calendar",
        stages: [
          { phase: "01 / Inbound Intake", title: "Buyer Scope Parsed", desc: "Captures 150-user company size, timeline, and security compliance requirements." },
          { phase: "02 / Reasoning & Rules", title: "BANT Qualification Scored", desc: "Scores lead (92/100 Tier-1); selects enterprise sales executive calendar." },
          { phase: "03 / System Execution", title: "Salesforce CRM Deal & Calendar Lock", desc: "Creates verified deal in pipeline, sends calendar invite and meeting brief to AE." },
        ],
      };
    }
    return {
      callerSample: "“I need to reschedule Alex Morgan's consultation with Dr. Lawrence to Thursday afternoon.”",
      intent: "Appointment Rescheduling & Patient File Sync",
      action: "Checks Horizon Health calendar, locks Thursday 3:30 PM, updates clinic EHR, texts confirmation",
      system: "Epic / Cerner EHR · Clinic Calendar · SMS Bridge",
      stages: [
        { phase: "01 / Inbound Intake", title: "Patient Identified", desc: "Matches caller number with patient medical record at Horizon Health and queries current booking." },
        { phase: "02 / Reasoning & Rules", title: "Provider Availability Query", desc: "Checks Dr. Lawrence's schedule; verifies slot buffer and rescheduling policy." },
        { phase: "03 / System Execution", title: "EHR Calendar Lock & SMS Sent", desc: "Locks Thursday 3:30 PM slot, releases prior time to waitlist, and sends confirmation SMS." },
      ],
    };
  }, [role.id]);

  const configGrid = (locked: boolean) => (
    <div className={locked ? "pointer-events-none opacity-80 transition-opacity" : "transition-opacity"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wider opacity-60 mb-1.5 font-semibold">Agent Role</p>
          <Select value={roleId} onValueChange={locked ? undefined : setRoleId}>
            <SelectTrigger className="h-11 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 text-xs sm:text-sm transition hover:bg-primary-foreground/10 focus:ring-1 focus:ring-primary-foreground/30 text-primary-foreground">
              <SelectValue placeholder="Choose role" />
            </SelectTrigger>
            <SelectContent>
              {DEMO_ROLES.map((item) => (
                <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider opacity-60 mb-1.5 font-semibold">Industry Domain</p>
          <Select value={domainId} onValueChange={locked ? undefined : setDomainId}>
            <SelectTrigger className="h-11 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 text-xs sm:text-sm transition hover:bg-primary-foreground/10 focus:ring-1 focus:ring-primary-foreground/30 text-primary-foreground">
              <SelectValue placeholder="Choose industry" />
            </SelectTrigger>
            <SelectContent>
              {role.domains.map((item) => (
                <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider opacity-60 mb-1.5 font-semibold">Language</p>
          <Select value={languageCode} onValueChange={locked ? undefined : setLanguageCode}>
            <SelectTrigger className="h-11 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 text-xs sm:text-sm transition hover:bg-primary-foreground/10 focus:ring-1 focus:ring-primary-foreground/30 text-primary-foreground">
              <SelectValue placeholder="Choose language" />
            </SelectTrigger>
            <SelectContent>
              {DEMO_LANGUAGES.map((item) => (
                <SelectItem key={item.code} value={item.code}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider opacity-60 mb-1.5 font-semibold">Voice Persona</p>
          <Select value={voiceId} onValueChange={locked ? undefined : setVoiceId}>
            <SelectTrigger className="h-11 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 text-xs sm:text-sm transition hover:bg-primary-foreground/10 focus:ring-1 focus:ring-primary-foreground/30 text-primary-foreground">
              <SelectValue placeholder="Choose voice" />
            </SelectTrigger>
            <SelectContent>
              {DEMO_VOICES.map((item) => (
                <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {[role.label, domain.label, DEMO_LANGUAGES.find((item) => item.code === languageCode)?.label ?? "English", voice.label].map((tag) => (
          <span key={tag} className="rounded-full border border-primary-foreground/20 px-2.5 py-0.5 text-[11px] opacity-70">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const workflowPipeline = (
    <div className="w-full max-w-md rounded-2xl border border-primary/20 bg-background/95 p-4 text-xs space-y-2 mt-3 text-left shadow-sm">
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-primary border-b border-border/50 pb-2">
        <span className="flex items-center gap-1.5">
          <Workflow className="h-3.5 w-3.5" />
          Execution Pipeline
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          System Sync
        </span>
      </div>

      <div className="space-y-2 pt-1">
        {roleWorkflowInfo.stages.map((st, idx) => {
          const isCurrent = sessionState === "listening" ? idx === 0 : sessionState === "thinking" ? idx === 1 : idx <= 2;
          return (
            <div
              key={st.phase}
              className={`p-2.5 rounded-xl transition-all ${
                isCurrent
                  ? "bg-primary/5 border border-primary/20 text-ink"
                  : "opacity-60 border border-transparent"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="text-primary">{st.phase}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{st.title}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">{st.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-border/40 text-[10px] font-mono text-muted-foreground flex items-center justify-between">
        <span>Systems: {roleWorkflowInfo.system}</span>
        <span className="text-emerald-600 font-semibold">● 200 OK</span>
      </div>
    </div>
  );

  return (
    <RevealSection id="demo" className="mx-auto max-w-7xl px-6 py-24 scroll-mt-24">
      <div className={`overflow-hidden rounded-[2.5rem] border border-border transition-colors duration-500 shadow-xl ${active ? 'bg-beige text-primary' : 'bg-primary text-primary-foreground'}`}>

        {/* Top Header */}
        <div className="transition-all duration-500 ease-in-out px-6 pt-8 sm:px-10">
          <div className="text-xs uppercase tracking-[0.2em] opacity-70 font-semibold flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Operational Prototype</span>
          </div>
        </div>

        {/* ── Mobile Layout ── */}
        <div className="md:hidden p-6 pt-4 flex flex-col gap-6">
          {!active ? (
            <>
              <div>
                <h2 className="mt-1 font-display text-3xl sm:text-4xl tracking-tight leading-tight">
                  Test Khyra live.
                </h2>
                <p className="mt-3 text-xs sm:text-sm opacity-85 leading-relaxed">
                  Select an operational role and industry domain to test Khyra's conversational reasoning and workflow execution. No account required.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col gap-5 text-primary-foreground shadow-inner backdrop-blur-xl">
                {configGrid(false)}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setActive(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground py-3.5 text-sm font-semibold text-primary hover:opacity-90 active:scale-95 transition shadow-md"
                  >
                    Start operational test <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center text-[10px] opacity-60">
                    Browser session · No voice audio or personal data is stored.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <SiriOrb state={orbState} volumeRef={micVolumeRef} size={150} />

              <div className="text-center leading-snug">
                <p className={`text-xs font-semibold tracking-wide uppercase ${sessionState === "error" ? "text-red-500" : "opacity-75"}`}>
                  {statusLabel}
                </p>
                <p className="text-sm font-medium mt-1 opacity-90">{voice.label} · {role.label}</p>
                <p className="text-[11px] opacity-60">{domain.label}</p>
              </div>

              {/* Mobile Pipeline */}
              {workflowPipeline}

              <div className="mt-4 w-full flex flex-col gap-2">
                {sessionState === "ended" || sessionState === "error" ? (
                  <button
                    type="button"
                    onClick={handleEndConversation}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary/10 py-3 text-xs font-semibold text-ink hover:bg-primary/20 active:scale-95 transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset &amp; Reconfigure
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleEndConversation}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500/10 text-red-600 py-3 text-xs font-semibold hover:bg-red-500/20 active:scale-95 transition"
                  >
                    End conversation
                  </button>
                )}

                <Link
                  to="/book-demo"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground py-3 text-xs font-semibold hover:bg-primary/90 transition"
                >
                  <span>Schedule Full Enterprise Demo</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Desktop Layout ── */}
        <div className="relative hidden md:block" style={{ minHeight: 600 }}>
          {/* Panel A: Text copy */}
          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-between py-10 pl-14 pr-8 transition-all duration-500 ease-in-out"
            style={{
              width: "50%",
              opacity: active ? 0 : 1,
              transform: active ? "translateX(-20px)" : "translateX(0)",
              pointerEvents: active ? "none" : "auto",
            }}
          >
            <div>
              <h2 className="mt-2 font-display text-4xl lg:text-5xl tracking-tight leading-[1.08]">
                Experience operational AI<br />in real time.
              </h2>
              <p className="mt-5 max-w-md text-sm lg:text-base opacity-85 leading-relaxed">
                Configure an operational role and industry domain, then speak with Khyra directly in your browser. Test how it evaluates business rules, verifies parameters, and triggers backend system tasks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pb-2 mt-8">
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-3.5 text-sm font-semibold text-primary transition hover:opacity-90 active:scale-95 shadow-md"
              >
                Schedule an Operational Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Panel B: Config card */}
          <div
            className="absolute inset-y-0 p-6 lg:p-8"
            style={{
              width: "50%",
              left: active ? 0 : "50%",
              transition: "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-primary border border-white/10 p-7 lg:p-8 text-primary-foreground shadow-inner backdrop-blur-xl">
              {configGrid(active)}

              <div className="mt-6">
                {!active ? (
                  <button
                    type="button"
                    onClick={() => setActive(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground py-3.5 text-sm font-semibold text-primary transition hover:opacity-90 active:scale-95 shadow-md"
                  >
                    Start interactive session <ArrowRight className="h-4 w-4" />
                  </button>
                ) : sessionState === "ended" || sessionState === "error" ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleEndConversation}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground/15 py-3 text-xs font-semibold text-primary-foreground transition hover:bg-primary-foreground/25 active:scale-95"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Reset &amp; Reconfigure
                    </button>
                    <Link
                      to="/book-demo"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground py-3 text-xs font-semibold text-primary transition hover:opacity-90"
                    >
                      Schedule full company demo <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleEndConversation}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground py-3.5 text-sm font-semibold text-primary transition hover:opacity-90 active:scale-95 shadow-md"
                  >
                    End session
                  </button>
                )}
                <p className="mt-3 text-center text-[10px] opacity-60">
                  Browser session · Zero data retained
                </p>
              </div>
            </div>
          </div>

          {/* Panel C: Siri orb & Workflow Action */}
          <div
            className="absolute inset-y-0 right-0 p-6 lg:p-8"
            style={{
              width: "50%",
              transform: active ? "translateX(0)" : "translateX(100%)",
              opacity: active ? 1 : 0,
              transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-4">
              <SiriOrb state={orbState} volumeRef={micVolumeRef} size={170} />

              <div className="flex flex-col items-center text-center">
                <p className={`text-xs font-semibold tracking-wide uppercase ${sessionState === "error" ? "text-red-500" : "text-primary/70"}`}>
                  {statusLabel}
                </p>
                <div className="leading-tight mt-1">
                  <p className="text-sm font-semibold text-primary/90">
                    {voice.label} · {role.label}
                  </p>
                  <p className="text-[11px] text-primary/60">
                    {domain.label}
                  </p>
                </div>
              </div>

              {/* Desktop Pipeline */}
              {workflowPipeline}
            </div>
          </div>
        </div>

      </div>
    </RevealSection>
  );
}
