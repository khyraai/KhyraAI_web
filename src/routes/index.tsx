import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { TopBanner, SiteNav } from "@/components/site-nav";
import {
  SiriOrb,
  DEMO_ROLES,
  DEMO_LANGUAGES,
  DEMO_VOICES,
  WS_URL,
  float32ToInt16,
  int16ToFloat32,
  type SessionState,
  type OrbState,
} from "@/components/live-demo-modal";
import {
  Phone,
  Target,
  Wrench,
  ArrowRight,
  Check,
  Minus,
  Plus,
  Mic,
  MicOff,
  RotateCcw,
  ChevronDown,
  Globe,
  Zap,
  ShieldCheck,
  Headphones,
  Workflow,
  Activity,
  Hotel,
  Building2,
  Server,
  Sparkles,
  Stethoscope,
  PawPrint,
} from "lucide-react";
import mascot from "@/assets/khyra-mascot.png";
import logo from "@/assets/Khyra.svg";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Khyra AI — Answers That Act" },
      {
        name: "description",
        content:
          "AI voice agents for Indian businesses — multilingual, always-on, deployable in hours. Hindi, Kannada, Tamil and 8 more languages.",
      },
    ],
  }),
});

/* ---------- Brand mark ---------- */
function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path
        d="M6 18c0-5 4-9 10-9s10 4 10 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M16 9v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 27h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="25" cy="11" r="2" fill="var(--saffron)" />
    </svg>
  );
}



/* ---------- Hero ---------- */
function Hero() {
  const reveal = useScrollReveal();
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      id="top"
      className="relative overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 65%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron" />
            </span>
            Built in India · 11 Indian languages
          </div>
          <h1 className="font-display text-6xl leading-[1.02] text-balance text-ink md:text-8xl">
            Your customers called.
            <br />
            <span className="italic text-primary/90">Khyra already answered.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            AI voice agents that handle front desk, sales follow-up and Tier-1 support — in{" "}
            <span className="font-normal text-foreground">11 Indian languages</span>, with
            sub-second response time.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/book-demo"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-semibold text-primary-foreground shadow-xl shadow-primary/15 transition-all hover:shadow-2xl hover:shadow-primary/25 active:scale-[0.98]"
            >
              Book a demo{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-4 text-[15px] font-semibold text-foreground transition hover:bg-secondary"
            >
              <Mic className="h-4 w-4 opacity-70" /> Hear it live
            </a>
          </div>
        </div>

        {/* Phone mock */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="rounded-4xl border border-primary/10 bg-background/90 p-3 shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--primary)_28%,transparent)] backdrop-blur">
            <div className="rounded-[1.6rem] bg-beige/40 p-6 md:p-10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron" />
                  </span>
                  <span className="font-medium uppercase tracking-wider text-foreground/50">
                    Live call · Khyra Front Desk
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-foreground/30">
                  <span>EN</span>
                  <span className="opacity-40">/</span>
                  <span className="text-primary">HI</span>
                  <span className="opacity-40">/</span>
                  <span>KN</span>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <Bubble who="caller">
                  नमस्ते, क्या मैं कल शाम का appointment book कर सकती हूँ?
                </Bubble>
                <Bubble who="khyra">
                  बिल्कुल। Dr. Mehta के साथ कल 6:30 PM का slot available है — confirm कर दूँ?
                </Bubble>
                <Bubble who="caller">Haan, please confirm.</Bubble>
                <Bubble who="khyra">Done. Confirmation SMS भेज दिया है. कुछ और मदद चाहिए?</Bubble>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-primary" /> Latency · 612ms
                </span>
                <span>Intent: Book appointment · ✓ Calendar updated · ✓ SMS sent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ who, children }: { who: "caller" | "khyra"; children: React.ReactNode }) {
  const isKhyra = who === "khyra";
  return (
    <div className={`flex ${isKhyra ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
          isKhyra
            ? "bg-primary text-primary-foreground rounded-bl-sm"
            : "bg-background border border-border rounded-br-sm"
        }`}
      >
        <div
          className={`mb-0.5 text-[10px] uppercase tracking-wider ${isKhyra ? "text-primary-foreground/70" : "text-muted-foreground"}`}
        >
          {isKhyra ? "Khyra" : "Caller"}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Trust strip ---------- */
function Trust() {
  const reveal = useScrollReveal();
  const industries = [
    { i: Stethoscope, l: "Healthcare" },
    { i: Hotel, l: "Hospitality" },
    { i: Building2, l: "Real Estate" },
    { i: Server, l: "IT Services" },
    { i: Sparkles, l: "Wellness" },
    { i: PawPrint, l: "Veterinary" },
  ];
  const stats = [
    { k: "11+", v: "Indian languages" },
    { k: "<800ms", v: "Avg response latency" },
    { k: "99.9%", v: "Uptime SLA" },
    { k: "24×7", v: "No breaks. No sick days." },
  ];
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="border-y border-border bg-secondary/60 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted across industries
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
          {industries.map(({ i: Icon, l }) => (
            <div key={l} className="inline-flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4" /> {l}
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="bg-background p-6">
              <div className="font-display text-3xl text-primary md:text-4xl">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pillars ---------- */
function Pillars() {
  const reveal = useScrollReveal();
  const pillars = [
    {
      i: Phone,
      t: "Front Desk Agent",
      d: "Answers calls, books appointments, handles cancellations — around the clock.",
    },
    {
      i: Target,
      t: "Lead Follow-Up Agent",
      d: "Calls back warm leads, qualifies prospects, and schedules meetings automatically.",
    },
    {
      i: Wrench,
      t: "Support Line Agent",
      d: "Resolves Tier-1 support tickets, resets access, and escalates intelligently.",
    },
  ];
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="grid items-end gap-10 md:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            What is Khyra
          </div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            The voice layer for your{" "}
            <span className="italic text-primary">business operations</span>.
          </h2>
        </div>
        <p className="text-muted-foreground">
          Enterprise-grade AI voice agents built specifically for the Indian market. Replace or
          augment your front desk, sales callers and support teams — fluent in 11 Indian languages,
          integrated with your stack, live in hours.
        </p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pillars.map(({ i: Icon, t, d }) => (
          <div
            key={t}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:border-primary/30 hover:shadow-lg"
          >
            <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-beige text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-display text-2xl text-ink">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            <ArrowRight className="absolute right-6 top-7 h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const reveal = useScrollReveal();
  const steps = [
    {
      n: "01",
      t: "Configure your agent",
      d: "Choose role, industry, voice persona and language. No code.",
    },
    {
      n: "02",
      t: "Connect your systems",
      d: "Plug in your phone number, calendar, CRM or helpdesk via webhook or API.",
    },
    {
      n: "03",
      t: "Go live",
      d: "Khyra starts answering calls immediately. Monitor every conversation in real time.",
    },
  ];
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="bg-beige/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            From sign-up to live calls in hours.
          </h2>
        </div>

        <div className="relative mt-20">
          {/* Vertical line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20"
          />

          <ol className="space-y-20 md:space-y-28">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={s.n}
                  data-visible={reveal.visible}
                  style={{ transitionDelay: `${i * 120}ms` }}
                  className="relative grid grid-cols-2 gap-8 md:gap-16 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
                >
                  {/* Node on the line */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-6 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-primary ring-8 ring-beige/40"
                  />

                  <div className={left ? "pr-8 text-right md:pr-16" : "col-start-2 pl-8 md:pl-16"}>
                    <div className="font-display text-6xl leading-none text-primary/80 md:text-7xl">
                      {s.n}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-ink md:text-xl">{s.t}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {s.d}
                    </p>
                    {left && <div className="ml-auto mt-6 h-px w-16 bg-primary/30" />}
                    {!left && <div className="mt-6 h-px w-16 bg-primary/30" />}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
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

/* ---------- Use cases (tabs) ---------- */
function UseCases() {
  const reveal = useScrollReveal();
  const tabs = {
    "Front Desk": [
      ["Dental clinic", "Booking, rescheduling, FAQ on procedures and timings."],
      ["Veterinary", "Pet appointments, emergency triage routing, vaccination reminders."],
      ["Spa & salon", "Bookings, pricing queries, real-time slot availability."],
      ["Hotel & resort", "Reservations, room queries, check-in / check-out info."],
      ["Therapist & wellness", "Empathetic intake calls with full privacy."],
      ["Cosmetic clinic", "Consultation bookings, procedure FAQs, follow-ups."],
    ],
    "Lead Follow-Up": [
      ["Real estate", "Follow up on enquiries, qualify buyers, schedule site visits."],
      ["IT services", "Follow up RFQs, qualify scope, route to sales engineers."],
      ["Voice AI agency", "Pitch solutions, qualify prospects, book discovery calls."],
    ],
    "Support Line": [
      ["DevOps & infra", "Tier-1 incident intake, basic runbooks, on-call escalation."],
      ["Access management", "Password resets, account unlocks, 2FA issues — resolved."],
      ["SaaS support", "Answer FAQs, guide users, raise tickets for Tier-2."],
    ],
  } as const;
  const keys = Object.keys(tabs) as Array<keyof typeof tabs>;
  const [active, setActive] = useState<keyof typeof tabs>(keys[0]);
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      id="use-cases"
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-10 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Use cases</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          One platform. Every conversation.
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === k
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tabs[active].map(([t, d]) => (
          <div
            key={t}
            className="rounded-xl border border-border bg-card p-6 transition hover:border-primary/30"
          >
            <div className="font-medium text-ink">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Impact (dark) ---------- */
function Impact() {
  const reveal = useScrollReveal();
  const stats = [
    ["60%", "Reduction in front desk staffing costs"],
    ["<800ms", "End-to-end voice latency"],
    ["11", "Indian languages supported"],
    ["99.9%", "Production uptime SLA"],
    ["15+", "Verticals out of the box"],
    ["100s", "Concurrent calls per deployment"],
  ];
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="bg-primary text-primary-foreground opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] opacity-70">Impact</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            The numbers that{" "}
            <span className="italic" style={{ color: "var(--beige-deep)" }}>
              matter
            </span>
            .
          </h2>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {stats.map(([k, v]) => (
            <div key={v} className="border-t border-primary-foreground/15 pt-6">
              <div className="font-display text-5xl md:text-6xl">{k}</div>
              <div className="mt-3 text-sm opacity-75">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */
function Compare() {
  const reveal = useScrollReveal();
  const cols = ["Khyra AI", "VAPI", "Retell AI", "Telnyx", "Bland AI"];
  const rows: Array<[string, (boolean | string)[]]> = [
    ["11 Indian languages", [true, false, false, false, false]],
    ["India-specific voices", [true, false, false, false, false]],
    ["15+ prebuilt verticals", [true, "Manual", "Manual", false, false]],
    ["Sub-800ms latency", [true, "Varies", "Varies", "Varies", "Varies"]],
    ["Front desk + sales + support", [true, "Build it", "Build it", false, "Build it"]],
    ["Indian telephony", [true, false, false, "Partial", false]],
    ["No-code config", [true, "Dev req.", "Partial", false, "Partial"]],
    ["Data residency in India", [true, false, false, false, false]],
    ["Pricing for Indian SMBs", [true, "USD only", "USD only", "USD only", "USD only"]],
  ];
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      id="compare"
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-12 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Comparison</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          Why teams choose <span className="italic text-primary">Khyra</span>.
        </h2>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-beige/40">
                <th className="px-6 py-4 font-medium text-muted-foreground">Feature</th>
                {cols.map((c, i) => (
                  <th
                    key={c}
                    className={`px-6 py-4 font-medium ${i === 0 ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([feat, vals], ri) => (
                <tr key={feat} className={ri % 2 ? "bg-secondary/40" : "bg-background"}>
                  <td className="px-6 py-4 text-ink">{feat}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={`px-6 py-4 ${i === 0 ? "bg-beige/30" : ""}`}>
                      {v === true ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : v === false ? (
                        <Minus className="h-4 w-4 text-muted-foreground/50" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Khyra (with mascot — single appearance) ---------- */
function WhyKhyra() {
  const reveal = useScrollReveal();
  const items = [
    {
      t: "India-first, not afterthought",
      d: "Built from day one for Indian accents, languages and workflows. Powered by Sarvam AI's STT/TTS.",
    },
    {
      t: "Deploy in hours, not months",
      d: "Agents pre-trained on your vertical. No data labelling. No six-month pilot.",
    },
    {
      t: "The full stack, not just an API",
      d: "Voice, brain, telephony, integrations and observability — one vendor, one contract.",
    },
    {
      t: "Priced for the Indian market",
      d: "INR pricing in tiers that make sense for a 3-clinic chain, not just Fortune 500.",
    },
  ];
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="bg-beige/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-beige-deep/30 to-transparent blur-2xl" />
          <img
            src={mascot}
            alt="Khyra AI mascot — friendly voice agent on a call"
            className="relative mx-auto w-full max-w-md drop-shadow-2xl"
            loading="lazy"
          />
          <div className="divider-dot mt-2 text-center font-display text-xl italic text-primary">
            Answers that act
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why Khyra</div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Built in India. <span className="italic text-primary">Built for India.</span>
          </h2>
          <ul className="mt-10 divide-y divide-primary/10 border-y border-primary/10">
            {items.map((it, i) => (
              <li key={it.t} className="group flex gap-6 py-6">
                <span className="font-display text-xl leading-none text-primary/50 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-ink">{it.t}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Demo select field ---------- */
function DemoSelectField({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-3 text-left transition hover:bg-primary-foreground/10"
      >
        <div className="text-[10px] uppercase tracking-wider opacity-60">{label}</div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span>{selected?.label ?? value}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 max-h-52 w-full overflow-y-auto rounded-xl border border-primary-foreground/20 bg-primary shadow-xl">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-primary-foreground/10 ${
                opt.value === value ? "font-medium opacity-100" : "opacity-75"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Demo CTA ---------- */
function DemoCTA() {
  const reveal = useScrollReveal();

  /* ── Config ─────────────────────────────────────────── */
  const [roleId,       setRoleId]       = useState("front_desk");
  const [domainId,     setDomainId]     = useState("dental_clinic");
  const [languageCode, setLanguageCode] = useState("hi-IN");
  const [voiceId,      setVoiceId]      = useState("voice_1");

  /* ── Session ─────────────────────────────────────────── */
  const [active,       setActive]       = useState(false);
  const [sessionState, setSSRaw]        = useState<SessionState>("connecting");
  const [errorMsg,     setErrorMsg]     = useState("");

  const ssRef          = useRef<SessionState>("connecting");
  const wsRef          = useRef<WebSocket | null>(null);
  const playCtxRef     = useRef<AudioContext | null>(null);
  const nextPlayRef    = useRef(0);
  const recCtxRef      = useRef<AudioContext | null>(null);
  const procRef        = useRef<ScriptProcessorNode | null>(null);
  const streamRef      = useRef<MediaStream | null>(null);

  /* ── Derived config ──────────────────────────────────── */
  const selectedRole   = DEMO_ROLES.find((r) => r.id === roleId)!;
  const selectedDomain = selectedRole.domains.find((d) => d.id === domainId);
  const selectedLang   = DEMO_LANGUAGES.find((l) => l.code === languageCode)!;
  const selectedVoice  = DEMO_VOICES.find((v) => v.id === voiceId)!;

  const handleRoleChange = useCallback((id: string) => {
    setRoleId(id);
    const role = DEMO_ROLES.find((r) => r.id === id);
    if (role) setDomainId(role.domains[0].id);
  }, []);

  const setSS = useCallback((s: SessionState) => {
    ssRef.current = s;
    setSSRaw(s);
  }, []);

  /* ── Playback ─────────────────────────────────────────── */
  const playChunk = useCallback((buf: ArrayBuffer) => {
    if (!playCtxRef.current || playCtxRef.current.state === "closed") {
      playCtxRef.current = new AudioContext({ sampleRate: 16000 });
      nextPlayRef.current = 0;
    }
    const ctx  = playCtxRef.current;
    const f32  = int16ToFloat32(buf);
    const abuf = ctx.createBuffer(1, f32.length, 16000);
    abuf.copyToChannel(f32, 0);
    const src  = ctx.createBufferSource();
    src.buffer = abuf;
    src.connect(ctx.destination);
    const now  = ctx.currentTime;
    const t    = Math.max(now, nextPlayRef.current);
    src.start(t);
    nextPlayRef.current = t + abuf.duration;
  }, []);

  /* ── Recording ───────────────────────────────────────── */
  const stopRecording = useCallback(() => {
    procRef.current?.disconnect();
    procRef.current = null;
    recCtxRef.current?.close().catch(() => {});
    recCtxRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      const nCtx   = new AudioContext();
      recCtxRef.current = nCtx;
      const ratio  = nCtx.sampleRate / 16000;
      const src    = nCtx.createMediaStreamSource(stream);
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const proc   = nCtx.createScriptProcessor(4096, 1, 1);
      procRef.current = proc;
      proc.onaudioprocess = (e) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        const raw  = e.inputBuffer.getChannelData(0);
        const len  = Math.round(raw.length / ratio);
        const out  = ratio === 1 ? raw : new Float32Array(len);
        if (ratio !== 1) for (let i = 0; i < len; i++) out[i] = raw[Math.round(i * ratio)];
        wsRef.current.send(float32ToInt16(out));
      };
      src.connect(proc);
      proc.connect(nCtx.destination);
      setSS("listening");
    } catch {
      setErrorMsg("Microphone access denied.");
      setSS("error");
    }
  }, [setSS]);

  const handleMicClick = useCallback(async () => {
    const s = ssRef.current;
    if (s === "listening") {
      stopRecording();
      if (wsRef.current?.readyState === WebSocket.OPEN)
        wsRef.current.send(JSON.stringify({ type: "audio_end" }));
      setSS("thinking");
    } else if (s === "idle") {
      await startRecording();
    }
  }, [startRecording, stopRecording, setSS]);

  /* ── WebSocket — fires when active flips to true ─────── */
  useEffect(() => {
    if (!active) return;
    const ws = new WebSocket(WS_URL);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () =>
      ws.send(JSON.stringify({ type: "init", role: roleId, domain: domainId,
        language: languageCode, voice_id: voiceId }));

    ws.onmessage = (evt) => {
      if (evt.data instanceof ArrayBuffer) {
        playChunk(evt.data);
        if (ssRef.current !== "speaking") setSS("speaking");
        return;
      }
      let d: { type: string; text?: string; message?: string };
      try { d = JSON.parse(evt.data as string); } catch { return; }
      if      (d.type === "ready")     setSS("idle");
      else if (d.type === "audio_end") { nextPlayRef.current = 0; setSS("idle"); }
      else if (d.type === "error")     { setErrorMsg(d.message ?? "Error"); setSS("error"); }
    };

    ws.onerror  = () => { setErrorMsg("Cannot reach demo server."); setSS("error"); };
    ws.onclose  = () => { if (ssRef.current !== "error") setSS("ended"); };

    return () => {
      ws.close();
      stopRecording();
      playCtxRef.current?.close().catch(() => {});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const endConversation = useCallback(() => {
    wsRef.current?.close();
    stopRecording();
    playCtxRef.current?.close().catch(() => {});
    setActive(false);
    setTimeout(() => { ssRef.current = "connecting"; setSSRaw("connecting"); setErrorMsg(""); }, 520);
  }, [stopRecording]);

  /* ── Derived UI ──────────────────────────────────────── */
  const orbState: OrbState =
    sessionState === "listening"  ? "listening"  :
    sessionState === "thinking"   ? "thinking"   :
    sessionState === "speaking"   ? "speaking"   :
    sessionState === "connecting" ? "connecting" : "idle";

  const statusLabel: Record<SessionState, string> = {
    connecting: "Connecting…",
    idle:       "Tap mic to speak",
    listening:  "Listening…  tap to send",
    thinking:   "Thinking…",
    speaking:   "Speaking…",
    error:      errorMsg || "Error",
    ended:      "Session ended",
  };

  const canTapMic = sessionState === "idle" || sessionState === "listening";

  /* ── Config panel (shared between mobile + desktop) ──── */
  const configGrid = (locked: boolean) => (
    <div className={locked ? "pointer-events-none" : ""}>
      <div className="grid grid-cols-2 gap-2.5 text-sm">
        <DemoSelectField label="Agent role"  value={roleId}       options={DEMO_ROLES.map((r) => ({ label: r.label, value: r.id }))}                        onSelect={locked ? () => {} : handleRoleChange} />
        <DemoSelectField label="Industry"    value={domainId}     options={selectedRole.domains.map((d) => ({ label: d.label, value: d.id }))}               onSelect={locked ? () => {} : setDomainId} />
        <DemoSelectField label="Language"    value={languageCode} options={DEMO_LANGUAGES.map((l) => ({ label: l.label, value: l.code }))}                   onSelect={locked ? () => {} : setLanguageCode} />
        <DemoSelectField label="Voice"       value={voiceId}      options={DEMO_VOICES.map((v) => ({ label: `${v.label} · ${v.gender}`, value: v.id }))}     onSelect={locked ? () => {} : setVoiceId} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[selectedRole.label,
          selectedDomain ? selectedDomain.label : "",
          selectedLang.label,
          selectedVoice.label + " · " + selectedVoice.gender,
        ].filter(Boolean).map((tag) => (
          <span key={tag} className="rounded-full border border-primary-foreground/20 px-2.5 py-0.5 text-[10px] opacity-60">{tag}</span>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      id="demo"
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className={`overflow-hidden rounded-3xl border border-border transition-colors duration-500 ${active ? 'bg-beige text-primary' : 'bg-primary text-primary-foreground'}`}>

        {/* ── "Live demo" label — nudges up+left when active ── */}
        <div
          className="transition-all duration-500 ease-in-out"
          style={{ padding: active ? "1.5rem 2.5rem 0.25rem" : "2.5rem 2.5rem 0" }}
        >
          <div className="text-xs uppercase tracking-[0.2em] opacity-70">Live demo</div>
        </div>

        {/* ── Mobile (stacked, no slide) ── */}
        <div className="md:hidden p-6 pt-4 flex flex-col gap-5">
          {!active ? (
            <>
              <div>
                <h2 className="font-display text-4xl">Hear Khyra before you buy.</h2>
                <p className="mt-3 text-sm opacity-80 leading-relaxed">Pick a role, pick a language, and talk live. No sign-up.</p>
              </div>
              <div className="rounded-2xl bg-primary p-5 flex flex-col gap-4 text-primary-foreground">
                {configGrid(false)}
                <button onClick={() => setActive(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-foreground py-3 text-sm font-semibold text-primary hover:opacity-90 active:scale-95 transition">
                  <Mic className="h-4 w-4" /> Start conversation
                </button>
                <p className="text-center text-[10px] opacity-40">This demo does not store any data.</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-4">
              <SiriOrb state={orbState} size={160} />
              <p className="text-xs font-medium opacity-45">{sessionState !== "error" ? statusLabel[sessionState] : statusLabel["idle"]}</p>
              <div className="text-center leading-snug">
                <p className="text-sm font-medium opacity-75">{selectedVoice.label} · {selectedRole.label}</p>
                {selectedDomain && <p className="mt-0.5 text-xs opacity-45">{selectedDomain.label}</p>}
              </div>
              {sessionState !== "ended" && sessionState !== "error" && (
                <button onClick={handleMicClick} disabled={!canTapMic} className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${sessionState === "listening" ? "scale-110 bg-red-500 shadow-lg shadow-red-500/40" : canTapMic ? "bg-primary/10 hover:bg-primary/20 active:scale-95" : "cursor-not-allowed bg-primary/5 opacity-40"}`}>
                  {sessionState === "listening" ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              )}
              {sessionState === "ended" || sessionState === "error" ? (
                <button onClick={endConversation} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition">
                  <RotateCcw className="h-4 w-4" /> Close &amp; reconfigure
                </button>
              ) : (
                <button onClick={endConversation} className="text-[11px] opacity-40 hover:opacity-70 transition-opacity">End conversation</button>
              )}
            </div>
          )}
        </div>

        {/* ── Desktop (sliding panels) ── */}
        <div className="relative hidden md:block" style={{ minHeight: 400 }}>

          {/* Panel A: text copy — fades + slides out on active */}
          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-between py-10 pl-16 pr-8 transition-all duration-400 ease-in-out"
            style={{
              width: "50%",
              opacity: active ? 0 : 1,
              transform: active ? "translateX(-20px)" : "translateX(0)",
              pointerEvents: active ? "none" : "auto",
            }}
          >
            <div>
              <h2 className="font-display text-5xl leading-tight">Hear Khyra<br />before you buy.</h2>
              <p className="mt-4 max-w-sm text-sm opacity-80 leading-relaxed">
                Pick a role, pick a language, and have a live conversation with a Khyra agent right now. No sign-up.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pb-2">
              <a className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary" style={{ background: "var(--beige-deep)" }} href="#demo">
                Configure &amp; try <ArrowRight className="h-4 w-4" />
              </a>
              <a className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium" href="/book-demo">
                Book a demo
              </a>
            </div>
          </div>

          {/* Panel B: config card — slides from right half → left half */}
          <div
            className="absolute inset-y-0 p-5"
            style={{
              width: "50%",
              left: active ? 0 : "50%",
              transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="flex h-full flex-col gap-3 rounded-2xl bg-primary p-5 text-primary-foreground">
              {configGrid(active)}
              {!active ? (
                <button
                  onClick={() => setActive(true)}
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary-foreground py-3 text-sm font-semibold text-primary transition hover:opacity-90 active:scale-95"
                >
                  <Mic className="h-4 w-4" /> Start conversation
                </button>
              ) : (sessionState === "ended" || sessionState === "error") ? (
                <button
                  onClick={endConversation}
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary-foreground py-3 text-sm font-semibold text-primary transition hover:opacity-90 active:scale-95"
                >
                  <RotateCcw className="h-4 w-4" /> Close &amp; reconfigure
                </button>
              ) : null}
              <p className="text-center text-[10px] opacity-40">This demo does not store any data.</p>
            </div>
          </div>

          {/* Panel C: Siri orb — slides in from right */}
          <div
            className="absolute inset-y-0 right-0 p-5"
            style={{
              width: "50%",
              transform: active ? "translateX(0)" : "translateX(100%)",
              opacity: active ? 1 : 0,
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 px-4 py-5">
              <SiriOrb state={orbState} size={160} />

              <p className="text-xs font-medium text-primary/45">
                {sessionState !== "error" ? statusLabel[sessionState] : statusLabel["idle"]}
              </p>

              {/* Voice · Role / Industry */}
              <div className="text-center leading-snug">
                <p className="text-sm font-medium text-primary/75">
                  {selectedVoice.label} · {selectedRole.label}
                </p>
                {selectedDomain && (
                  <p className="mt-0.5 text-xs text-primary/45">
                    {selectedDomain.label}
                  </p>
                )}
              </div>

              {sessionState !== "ended" && sessionState !== "error" && (
                <>
                  <button
                    onClick={handleMicClick}
                    disabled={!canTapMic}
                    aria-label={sessionState === "listening" ? "Stop recording" : "Start recording"}
                    className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200 ${
                      sessionState === "listening"
                        ? "scale-110 bg-red-500 shadow-xl shadow-red-500/40"
                        : canTapMic
                        ? "bg-primary/10 hover:bg-primary/20 active:scale-95"
                        : "cursor-not-allowed bg-primary/5 opacity-40"
                    }`}
                  >
                    {sessionState === "listening" ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </button>
                  <button onClick={endConversation} className="mt-auto text-[11px] text-primary/40 hover:text-primary/70 transition-colors">
                    End conversation
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const reveal = useScrollReveal();
  const t = [
    {
      q: "We went from missing 40% of after-hours calls to zero overnight. Booking rate up 30% in month one.",
      a: "Dr. Priya S.",
      r: "Dental Clinic Owner, Bengaluru",
    },
    {
      q: "Our sales team was spending 3 hours a day on cold follow-ups. Khyra does that now. They focus on closing.",
      a: "Rohan M.",
      r: "Founder, PropTech Startup, Hyderabad",
    },
    {
      q: "The Kannada support was the deciding factor. Our patients speak Kannada first. No other tool could do that.",
      a: "Operations Manager",
      r: "Multi-specialty Hospital, Mysuru",
    },
  ];
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-12 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Customers</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">From the front desk.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {t.map((x) => (
          <figure
            key={x.a}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7"
          >
            <blockquote className="font-display text-xl leading-snug text-ink">“{x.q}”</blockquote>
            <figcaption className="mt-6 text-sm">
              <div className="font-medium text-ink">{x.a}</div>
              <div className="text-muted-foreground">{x.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const reveal = useScrollReveal();
  const tiers = [
    {
      n: "Starter",
      d: "Solo practitioners and small clinics.",
      f: ["1 agent", "1 language", "500 minutes / month", "Email support"],
    },
    {
      n: "Growth",
      d: "SMBs and multi-location businesses.",
      f: ["3 agents", "5 languages", "3,000 minutes / month", "Priority support"],
      featured: true,
    },
    {
      n: "Enterprise",
      d: "Large teams and multi-vertical deployments.",
      f: ["Unlimited agents", "All 11 languages", "Custom volume", "Dedicated SLA + on-prem"],
    },
  ];
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      id="pricing"
      className="bg-beige/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pricing</div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            INR pricing. <span className="italic text-primary">Indian volumes.</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.n}
              className={`rounded-2xl border p-8 ${
                t.featured
                  ? "border-primary bg-primary text-primary-foreground shadow-xl"
                  : "border-border bg-background"
              }`}
            >
              <div className="font-display text-2xl">{t.n}</div>
              <p className={`mt-1 text-sm ${t.featured ? "opacity-80" : "text-muted-foreground"}`}>
                {t.d}
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {t.f.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${t.featured ? "" : "text-primary"}`} /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
                  t.featured
                    ? "text-primary"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
                style={t.featured ? { background: "var(--beige-deep)" } : undefined}
              >
                Talk to sales <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const reveal = useScrollReveal();
  const qs = [
    [
      "How long does it take to go live?",
      "Most customers are live within 24–48 hours. Complex enterprise integrations may take up to a week.",
    ],
    [
      "Which languages does Khyra support?",
      "English, Hindi, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi and Odia — with more on the way.",
    ],
    [
      "Do I need to train the AI on my business data?",
      "No. Agents come pre-trained on your industry vertical. You provide basic config and Khyra handles the rest.",
    ],
    [
      "Can I keep my existing phone number?",
      "Yes. Khyra works with your existing DID via a SIP bridge. No porting required.",
    ],
    [
      "What happens when the AI can't handle a call?",
      "It gracefully escalates to a human, sends a summary transcript, and routes the caller appropriately.",
    ],
    [
      "Is my call data stored in India?",
      "Yes. All data is stored on Indian cloud infrastructure, encrypted at rest and in transit.",
    ],
    [
      "Do you integrate with our CRM / calendar / helpdesk?",
      "Webhook-based integration with any system, plus native connectors on the roadmap.",
    ],
    [
      "What telephony providers do you support?",
      "Vobiz today, plus any SIP-compatible provider. WebRTC supported for demo and internal use.",
    ],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      id="faq"
      className="mx-auto max-w-4xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mb-12 text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">FAQ</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Questions, answered.</h2>
      </div>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {qs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="font-medium text-ink">{q}</span>
                {isOpen ? (
                  <Minus className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {isOpen && <div className="px-6 pb-6 text-sm text-muted-foreground">{a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Final CTA + Footer ---------- */
function FinalCTA() {
  const reveal = useScrollReveal();
  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 pb-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="rounded-3xl border border-border bg-beige/50 p-12 text-center md:p-20">
        <h2 className="mx-auto max-w-2xl font-display text-4xl text-ink md:text-6xl">
          Every missed call is a missed opportunity.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Give your business an AI voice agent that sounds local, works around the clock, and costs
          a fraction of a full-time hire.
        </p>
        <a
          href="/book-demo"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Book a demo <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  const reveal = useScrollReveal();
  return (
    <footer
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="border-t border-border bg-secondary/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-primary">
              <img
                src={logo}
                alt="Khyra AI logo"
                className="h-9 w-9 rounded-full border border-primary/70 object-contain"
              />
              <span className="font-display text-2xl">Khyra AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              AI voice agents for Indian businesses. Multilingual, always-on, deployable in hours.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Product</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-primary">
                  Use cases
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#compare" className="hover:text-primary">
                  Compare
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:hello@khyra.ai" className="hover:text-primary">
                  hello@khyra.ai
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <div>© 2026 Khyra AI. Built in India for Indian businesses.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />
      <Hero />
      <Trust />
      <Pillars />
      <HowItWorks />
      <DemoCTA />
      <Features />
      <UseCases />
      <Impact />
      <Compare />
      <WhyKhyra />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
