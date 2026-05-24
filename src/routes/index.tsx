import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, Target, Wrench, ArrowRight, Check, Minus, Plus,
  Mic, Globe, Zap, ShieldCheck, Headphones, Workflow, Activity,
  Hotel, Building2, Server, Sparkles, Stethoscope, PawPrint,
} from "lucide-react";
import mascot from "@/assets/kharaa-mascot.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kharaa AI — Answers That Act" },
      { name: "description", content: "AI voice agents for Indian businesses — multilingual, always-on, deployable in hours. Hindi, Kannada, Tamil and 8 more languages." },
    ],
  }),
});

/* ---------- Brand mark ---------- */
function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path d="M6 18c0-5 4-9 10-9s10 4 10 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 9v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 27h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="25" cy="11" r="2" fill="var(--saffron)" />
    </svg>
  );
}

/* ---------- Top tagline banner ---------- */
function TopBanner() {
  return (
    <div className="w-full bg-primary py-2 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground">
      Answers That Act
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5 text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/70 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Mark className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl leading-none tracking-tight">Kharaa AI</span>
        </a>
        <nav className="hidden items-center gap-10 text-sm font-medium text-foreground/70 md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#use-cases" className="transition-colors hover:text-foreground">Use cases</a>
          <a href="#compare" className="transition-colors hover:text-foreground">Compare</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-5">
          <a href="#demo" className="hidden text-sm font-medium text-foreground/70 decoration-saffron underline-offset-4 transition hover:text-foreground hover:underline lg:inline">Hear it live</a>
          <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.97]">
            Book a demo <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 65%, transparent), transparent 70%)" }}
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
            Your customers called.<br />
            <span className="italic text-primary/90">Kharaa already answered.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            AI voice agents that handle front desk, sales follow-up and Tier-1 support —
            in <span className="font-normal text-foreground">11 Indian languages</span>, with sub-second response time.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a href="#demo" className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-semibold text-primary-foreground shadow-xl shadow-primary/15 transition-all hover:shadow-2xl hover:shadow-primary/25 active:scale-[0.98]">
              Book a live demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#demo" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-4 text-[15px] font-semibold text-foreground transition hover:bg-secondary">
              <Mic className="h-4 w-4 opacity-70" /> Hear it live
            </a>
          </div>
        </div>

        {/* Phone mock */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="rounded-[2rem] border border-primary/10 bg-background/90 p-3 shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--primary)_28%,transparent)] backdrop-blur">
            <div className="rounded-[1.6rem] bg-beige/40 p-6 md:p-10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron" />
                  </span>
                  <span className="font-medium uppercase tracking-wider text-foreground/50">Live call · Kharaa Front Desk</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-foreground/30">
                  <span>EN</span><span className="opacity-40">/</span>
                  <span className="text-primary">HI</span><span className="opacity-40">/</span>
                  <span>KN</span>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <Bubble who="caller">नमस्ते, क्या मैं कल शाम का appointment book कर सकती हूँ?</Bubble>
                <Bubble who="kharaa">बिल्कुल। Dr. Mehta के साथ कल 6:30 PM का slot available है — confirm कर दूँ?</Bubble>
                <Bubble who="caller">Haan, please confirm.</Bubble>
                <Bubble who="kharaa">Done. Confirmation SMS भेज दिया है. कुछ और मदद चाहिए?</Bubble>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-primary" /> Latency · 612ms</span>
                <span>Intent: Book appointment · ✓ Calendar updated · ✓ SMS sent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ who, children }: { who: "caller" | "kharaa"; children: React.ReactNode }) {
  const isKharaa = who === "kharaa";
  return (
    <div className={`flex ${isKharaa ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
        isKharaa ? "bg-primary text-primary-foreground rounded-bl-sm" : "bg-background border border-border rounded-br-sm"
      }`}>
        <div className={`mb-0.5 text-[10px] uppercase tracking-wider ${isKharaa ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {isKharaa ? "Kharaa" : "Caller"}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Trust strip ---------- */
function Trust() {
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
    <section className="border-y border-border bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Trusted across industries</div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
          {industries.map(({ i: Icon, l }) => (
            <div key={l} className="inline-flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4" /> {l}
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {stats.map(s => (
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
  const pillars = [
    { i: Phone, t: "Front Desk Agent", d: "Answers calls, books appointments, handles cancellations — around the clock." },
    { i: Target, t: "Lead Follow-Up Agent", d: "Calls back warm leads, qualifies prospects, and schedules meetings automatically." },
    { i: Wrench, t: "Support Line Agent", d: "Resolves Tier-1 support tickets, resets access, and escalates intelligently." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-end gap-10 md:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What is Kharaa</div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            The voice layer for your <span className="italic text-primary">business operations</span>.
          </h2>
        </div>
        <p className="text-muted-foreground">
          Enterprise-grade AI voice agents built specifically for the Indian market.
          Replace or augment your front desk, sales callers and support teams — fluent
          in 11 Indian languages, integrated with your stack, live in hours.
        </p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pillars.map(({ i: Icon, t, d }) => (
          <div key={t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:border-primary/30 hover:shadow-lg">
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
  const steps = [
    { n: "01", t: "Configure your agent", d: "Choose role, industry, voice persona and language. No code." },
    { n: "02", t: "Connect your systems", d: "Plug in your phone number, calendar, CRM or helpdesk via webhook or API." },
    { n: "03", t: "Go live", d: "Kharaa starts answering calls immediately. Monitor every conversation in real time." },
  ];
  return (
    <section className="bg-beige/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">How it works</div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">From sign-up to live calls in hours.</h2>
        </div>

        <div className="relative mt-20">
          {/* Vertical line */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20" />

          <ol className="space-y-20 md:space-y-28">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li key={s.n} className="relative grid grid-cols-2 gap-8 md:gap-16">
                  {/* Node on the line */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-6 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-primary ring-8 ring-beige/40"
                  />

                  <div className={left ? "pr-8 text-right md:pr-16" : "col-start-2 pl-8 md:pl-16"}>
                    <div className="font-display text-6xl leading-none text-primary/80 md:text-7xl">{s.n}</div>
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
  const items = [
    { i: Globe, t: "11 Indian languages", d: "Hindi, English, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi, Odia." },
    { i: Zap, t: "Sub-second latency", d: "Groq-powered LPU inference delivers end-to-end voice response under 800ms." },
    { i: Headphones, t: "Natural voice personas", d: "Multiple male and female voices, tuned for Indian accents." },
    { i: Activity, t: "Context-aware", d: "Remembers earlier turns in the call and responds intelligently." },
    { i: Mic, t: "Live interruptions", d: "Callers can talk over the agent; it adapts in real time like a human." },
    { i: Workflow, t: "Domain intelligence", d: "Pre-trained on 15+ verticals — not a generic chatbot you retrain." },
    { i: ShieldCheck, t: "India data residency", d: "Hosted in India. Encrypted at rest and in transit. RBAC throughout." },
    { i: Phone, t: "Telephony agnostic", d: "Works with your existing number via SIP / WebSocket bridge." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
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
    <section id="use-cases" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-10 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Use cases</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">One platform. Every conversation.</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {keys.map(k => (
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
          <div key={t} className="rounded-xl border border-border bg-card p-6 transition hover:border-primary/30">
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
  const stats = [
    ["60%", "Reduction in front desk staffing costs"],
    ["<800ms", "End-to-end voice latency"],
    ["11", "Indian languages supported"],
    ["99.9%", "Production uptime SLA"],
    ["15+", "Verticals out of the box"],
    ["100s", "Concurrent calls per deployment"],
  ];
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] opacity-70">Impact</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            The numbers that <span className="italic" style={{ color: "var(--beige-deep)" }}>matter</span>.
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
  const cols = ["Kharaa AI", "VAPI", "Retell AI", "Telnyx", "Bland AI"];
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
    <section id="compare" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Comparison</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          Why teams choose <span className="italic text-primary">Kharaa</span>.
        </h2>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-beige/40">
                <th className="px-6 py-4 font-medium text-muted-foreground">Feature</th>
                {cols.map((c, i) => (
                  <th key={c} className={`px-6 py-4 font-medium ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{c}</th>
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

/* ---------- Why Kharaa (with mascot — single appearance) ---------- */
function WhyKharaa() {
  const items = [
    { t: "India-first, not afterthought", d: "Built from day one for Indian accents, languages and workflows. Powered by Sarvam AI's STT/TTS." },
    { t: "Deploy in hours, not months", d: "Agents pre-trained on your vertical. No data labelling. No six-month pilot." },
    { t: "The full stack, not just an API", d: "Voice, brain, telephony, integrations and observability — one vendor, one contract." },
    { t: "Priced for the Indian market", d: "INR pricing in tiers that make sense for a 3-clinic chain, not just Fortune 500." },
  ];
  return (
    <section className="bg-beige/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-beige-deep/30 to-transparent blur-2xl" />
          <img
            src={mascot}
            alt="Kharaa AI mascot — friendly voice agent on a call"
            className="relative mx-auto w-full max-w-md drop-shadow-2xl"
            loading="lazy"
          />
          <div className="divider-dot mt-2 text-center font-display text-xl italic text-primary">Answers that act</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why Kharaa</div>
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

/* ---------- Demo CTA ---------- */
function DemoCTA() {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-24">
      <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
        <div className="grid gap-10 p-10 md:grid-cols-2 md:p-16">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] opacity-70">Live demo</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Hear Kharaa before you buy.</h2>
            <p className="mt-4 max-w-md opacity-80">
              Pick a role, pick a language, and have a live conversation with a Kharaa agent right now. No sign-up.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary"
                 style={{ background: "var(--beige-deep)" }} href="#">
                Try the live demo <ArrowRight className="h-4 w-4" />
              </a>
              <a className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium" href="#">
                Book personalised demo
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-primary-foreground/5 p-6 backdrop-blur">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <DemoField label="Agent role" value="Front Desk" />
              <DemoField label="Industry" value="Dental Clinic" />
              <DemoField label="Language" value="Hindi" />
              <DemoField label="Voice" value="Meera · Female" />
            </div>
            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-foreground py-3 text-sm font-medium text-primary">
              <Mic className="h-4 w-4" /> Start conversation
            </button>
            <div className="mt-3 text-center text-[11px] opacity-60">This demo does not store any data.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
function DemoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-3">
      <div className="text-[10px] uppercase tracking-wider opacity-60">{label}</div>
      <div className="mt-1">{value}</div>
    </div>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const t = [
    { q: "We went from missing 40% of after-hours calls to zero overnight. Booking rate up 30% in month one.", a: "Dr. Priya S.", r: "Dental Clinic Owner, Bengaluru" },
    { q: "Our sales team was spending 3 hours a day on cold follow-ups. Kharaa does that now. They focus on closing.", a: "Rohan M.", r: "Founder, PropTech Startup, Hyderabad" },
    { q: "The Kannada support was the deciding factor. Our patients speak Kannada first. No other tool could do that.", a: "Operations Manager", r: "Multi-specialty Hospital, Mysuru" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Customers</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">From the front desk.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {t.map(x => (
          <figure key={x.a} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7">
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
  const tiers = [
    { n: "Starter", d: "Solo practitioners and small clinics.", f: ["1 agent", "1 language", "500 minutes / month", "Email support"] },
    { n: "Growth", d: "SMBs and multi-location businesses.", f: ["3 agents", "5 languages", "3,000 minutes / month", "Priority support"], featured: true },
    { n: "Enterprise", d: "Large teams and multi-vertical deployments.", f: ["Unlimited agents", "All 11 languages", "Custom volume", "Dedicated SLA + on-prem"] },
  ];
  return (
    <section id="pricing" className="bg-beige/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pricing</div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            INR pricing. <span className="italic text-primary">Indian volumes.</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map(t => (
            <div
              key={t.n}
              className={`rounded-2xl border p-8 ${
                t.featured ? "border-primary bg-primary text-primary-foreground shadow-xl" : "border-border bg-background"
              }`}
            >
              <div className="font-display text-2xl">{t.n}</div>
              <p className={`mt-1 text-sm ${t.featured ? "opacity-80" : "text-muted-foreground"}`}>{t.d}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {t.f.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${t.featured ? "" : "text-primary"}`} /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
                  t.featured ? "text-primary" : "bg-primary text-primary-foreground hover:opacity-90"
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
  const qs = [
    ["How long does it take to go live?", "Most customers are live within 24–48 hours. Complex enterprise integrations may take up to a week."],
    ["Which languages does Kharaa support?", "English, Hindi, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi and Odia — with more on the way."],
    ["Do I need to train the AI on my business data?", "No. Agents come pre-trained on your industry vertical. You provide basic config and Kharaa handles the rest."],
    ["Can I keep my existing phone number?", "Yes. Kharaa works with your existing DID via a SIP bridge. No porting required."],
    ["What happens when the AI can't handle a call?", "It gracefully escalates to a human, sends a summary transcript, and routes the caller appropriately."],
    ["Is my call data stored in India?", "Yes. All data is stored on Indian cloud infrastructure, encrypted at rest and in transit."],
    ["Do you integrate with our CRM / calendar / helpdesk?", "Webhook-based integration with any system, plus native connectors on the roadmap."],
    ["What telephony providers do you support?", "Vobiz today, plus any SIP-compatible provider. WebRTC supported for demo and internal use."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
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
                {isOpen ? <Minus className="h-4 w-4 shrink-0 text-primary" /> : <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />}
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
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="rounded-3xl border border-border bg-beige/50 p-12 text-center md:p-20">
        <h2 className="mx-auto max-w-2xl font-display text-4xl text-ink md:text-6xl">
          Every missed call is a missed opportunity.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Give your business an AI voice agent that sounds local, works around the clock,
          and costs a fraction of a full-time hire.
        </p>
        <a href="#demo" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
          Book a live demo <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-primary">
              <Mark />
              <span className="font-display text-2xl">Kharaa AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              AI voice agents for Indian businesses. Multilingual, always-on, deployable in hours.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Product</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#features" className="hover:text-primary">Features</a></li>
              <li><a href="#use-cases" className="hover:text-primary">Use cases</a></li>
              <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
              <li><a href="#compare" className="hover:text-primary">Compare</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:hello@kharaa.ai" className="hover:text-primary">hello@kharaa.ai</a></li>
              <li><a href="#" className="hover:text-primary">WhatsApp</a></li>
              <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <div>© 2026 Kharaa AI. Built in India for Indian businesses.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
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
      <Nav />
      <Hero />
      <Trust />
      <Pillars />
      <HowItWorks />
      <Features />
      <UseCases />
      <Impact />
      <Compare />
      <WhyKharaa />
      <DemoCTA />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
