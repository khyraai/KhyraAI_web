import { useState, useMemo } from "react";
import { ArrowRight, TrendingDown, IndianRupee, Clock, Phone } from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";

// ── Constants ─────────────────────────────────────────────────────────────────

const KHYRA_MONTHLY_BASE   = 12_000;  // ₹ / month base plan
const KHYRA_PER_CALL_COST  = 2.5;    // ₹ per call handled
const AGENT_EFFICIENCY     = 0.92;   // Khyra handles 92% of calls autonomously
const MISSED_CALL_REVENUE  = 800;    // avg revenue opportunity per missed call (₹)

// ── Formatters ────────────────────────────────────────────────────────────────

const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const fmtNum = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

// ── SliderField ───────────────────────────────────────────────────────────────

function SliderField({
  id,
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground/80">
          {label}
        </label>
        <span className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary tabular-nums">
          {format(value)}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-2 rounded-full bg-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
        />
        {/* Thumb */}
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-md transition-all duration-100"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

// ── MetricCard ────────────────────────────────────────────────────────────────

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  highlight = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 ${
        highlight
          ? "border-primary/30 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "border-border bg-background"
      }`}
    >
      <div
        className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${
          highlight ? "bg-primary-foreground/15" : "bg-primary/8"
        }`}
      >
        <Icon
          className={`h-4 w-4 ${highlight ? "text-primary-foreground" : "text-primary"}`}
        />
      </div>
      <div
        className={`font-display text-2xl tracking-tight ${
          highlight ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div
        className={`mt-1 text-[10px] font-semibold uppercase tracking-wider ${
          highlight ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
      {sub && (
        <div
          className={`mt-1.5 text-xs leading-relaxed ${
            highlight ? "text-primary-foreground/60" : "text-muted-foreground"
          }`}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// ── ROICalculatorSection ──────────────────────────────────────────────────────

export function ROICalculatorSection() {
  const [agents,      setAgents]      = useState(2);
  const [salary,      setSalary]      = useState(25_000);
  const [callsPerDay, setCallsPerDay] = useState(40);
  const [missedPct,   setMissedPct]   = useState(20);

  const calc = useMemo(() => {
    const monthlyCallVolume  = callsPerDay * 30;
    const humanMonthlyCost   = agents * salary;
    const khyraMonthlyCost   = KHYRA_MONTHLY_BASE + monthlyCallVolume * KHYRA_PER_CALL_COST;
    const staffReplaceable   = Math.max(0, agents - 1); // always keep 1 human for escalations
    const staffSavings       = staffReplaceable * salary;
    const missedCallsMonth   = Math.round((missedPct / 100) * monthlyCallVolume);
    const recoveredRevenue   = Math.round(missedCallsMonth * AGENT_EFFICIENCY * MISSED_CALL_REVENUE);
    const grossSavings       = staffSavings + recoveredRevenue;
    const netMonthlyBenefit  = grossSavings - khyraMonthlyCost;
    const annualBenefit      = netMonthlyBenefit * 12;
    const roiPct             = humanMonthlyCost > 0
      ? Math.round((netMonthlyBenefit / humanMonthlyCost) * 100)
      : 0;
    const hoursFreed         = Math.round((monthlyCallVolume * AGENT_EFFICIENCY * 4) / 60);
    const callsHandled       = Math.round(monthlyCallVolume * AGENT_EFFICIENCY);

    return {
      humanMonthlyCost,
      khyraMonthlyCost,
      netMonthlyBenefit,
      annualBenefit,
      roiPct,
      missedCallsMonth,
      recoveredRevenue,
      hoursFreed,
      callsHandled,
    };
  }, [agents, salary, callsPerDay, missedPct]);

  const isPositive = calc.netMonthlyBenefit > 0;

  return (
    <RevealSection id="calculator" className="mx-auto max-w-7xl px-6 py-24">

      {/* ── Heading ── */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          ROI calculator
        </div>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          How much could{" "}
          <span className="italic" style={{ color: "var(--primary)" }}>
            Khyra save you?
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Adjust the sliders to match your business and see your personalised
          savings estimate in real time — no sign-up required.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">

        {/* ── Left: Inputs ── */}
        <div className="flex flex-col gap-8 rounded-3xl border border-border bg-secondary/40 p-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your current setup
          </h3>

          <div className="flex flex-col gap-8">
            <SliderField
              id="calc-agents"
              label="Front-desk staff on your team"
              value={agents}
              min={1}
              max={10}
              step={1}
              format={(v) => `${v} ${v === 1 ? "person" : "people"}`}
              onChange={setAgents}
            />
            <SliderField
              id="calc-salary"
              label="Monthly salary per staff member"
              value={salary}
              min={10_000}
              max={80_000}
              step={1_000}
              format={fmtINR}
              onChange={setSalary}
            />
            <SliderField
              id="calc-calls"
              label="Inbound calls per day"
              value={callsPerDay}
              min={10}
              max={300}
              step={5}
              format={(v) => `${fmtNum(v)} calls`}
              onChange={setCallsPerDay}
            />
            <SliderField
              id="calc-missed"
              label="Estimated missed calls (% of total)"
              value={missedPct}
              min={0}
              max={60}
              step={5}
              format={(v) => `${v}%`}
              onChange={setMissedPct}
            />
          </div>

          {/* Assumptions */}
          <div className="rounded-xl border border-border bg-background/60 p-4 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground/70">Assumptions: </span>
            Khyra handles 92% of calls end-to-end. One human kept for
            escalations. Avg missed-call revenue opportunity: ₹800. Khyra
            pricing: ₹12,000/mo base + ₹2.50/call.
          </div>
        </div>

        {/* ── Right: Results ── */}
        <div className="flex flex-col gap-5">

          {/* Hero saving card */}
          <div
            className={`rounded-3xl border p-8 transition-all duration-500 ${
              isPositive
                ? "border-primary/30 bg-primary text-primary-foreground shadow-2xl shadow-primary/20"
                : "border-border bg-muted"
            }`}
          >
            <div className="text-xs uppercase tracking-[0.2em] opacity-70">
              Your estimated annual saving
            </div>
            <div className="mt-2 font-display text-5xl md:text-6xl tabular-nums tracking-tight">
              {isPositive ? fmtINR(calc.annualBenefit) : "—"}
            </div>

            {isPositive ? (
              <>
                <div className="mt-2 text-sm opacity-75">
                  That&rsquo;s {fmtINR(calc.netMonthlyBenefit)}/month net after
                  Khyra&rsquo;s cost
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <div className="rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold">
                    {calc.roiPct}% ROI on staff cost
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-2 text-sm text-muted-foreground">
                Increase call volume or team size to see your ROI
              </div>
            )}
          </div>

          {/* Metric grid */}
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              icon={IndianRupee}
              label="Khyra monthly cost"
              value={fmtINR(calc.khyraMonthlyCost)}
              sub={`vs ${fmtINR(calc.humanMonthlyCost)} in staff salaries`}
            />
            <MetricCard
              icon={Phone}
              label="Calls handled / mo"
              value={fmtNum(calc.callsHandled)}
              sub="by Khyra — no human needed"
            />
            <MetricCard
              icon={TrendingDown}
              label="Missed calls recovered"
              value={fmtNum(calc.missedCallsMonth)}
              sub={`Worth ${fmtINR(calc.recoveredRevenue)}/mo`}
            />
            <MetricCard
              icon={Clock}
              label="Staff hours freed"
              value={`${fmtNum(calc.hoursFreed)} hrs`}
              sub="per month for higher-value work"
            />
          </div>

          {/* CTA card */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              These are conservative estimates. Most customers see{" "}
              <span className="font-semibold text-foreground">
                payback within the first month.
              </span>
            </p>
            <BookDemoButton className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-95">
              Get my personalised estimate <ArrowRight className="h-4 w-4" />
            </BookDemoButton>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
