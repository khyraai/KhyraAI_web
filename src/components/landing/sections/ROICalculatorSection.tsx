import { useState, useMemo, useEffect, useCallback } from "react";
import { ArrowRight, TrendingDown, IndianRupee, Clock, Phone, Check, X, Loader2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { doc, getDoc } from "firebase/firestore";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { useAuth } from "@/lib/auth-context";
import { auth, db } from "@/lib/firebase";
import { sendROIEstimateEmail } from "@/lib/send-roi-estimate-email";

// ── Constants ─────────────────────────────────────────────────────────────────

const KHYRA_MONTHLY_BASE   = 12_000;
const KHYRA_PER_CALL_COST  = 2.5;
const AGENT_EFFICIENCY     = 0.92;
const MISSED_CALL_REVENUE  = 800;
const SESSION_KEY          = "khyra_roi_params";

// ── Formatters ────────────────────────────────────────────────────────────────

const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const fmtNum = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

// ── Calculation ───────────────────────────────────────────────────────────────

function computeROI(agents: number, salary: number, callsPerDay: number, missedPct: number) {
  const monthlyCallVolume  = callsPerDay * 30;
  const humanMonthlyCost   = agents * salary;
  const khyraMonthlyCost   = KHYRA_MONTHLY_BASE + monthlyCallVolume * KHYRA_PER_CALL_COST;
  const staffReplaceable   = Math.max(0, agents - 1);
  const staffSavings       = staffReplaceable * salary;
  const missedCallsMonth   = Math.round((missedPct / 100) * monthlyCallVolume);
  const recoveredRevenue   = Math.round(missedCallsMonth * AGENT_EFFICIENCY * MISSED_CALL_REVENUE);
  const netMonthlyBenefit  = staffSavings + recoveredRevenue - khyraMonthlyCost;
  const annualBenefit      = netMonthlyBenefit * 12;
  const roiPct             = humanMonthlyCost > 0
    ? Math.round((netMonthlyBenefit / humanMonthlyCost) * 100) : 0;
  const hoursFreed         = Math.round((monthlyCallVolume * AGENT_EFFICIENCY * 4) / 60);
  const callsHandled       = Math.round(monthlyCallVolume * AGENT_EFFICIENCY);
  return {
    humanMonthlyCost, khyraMonthlyCost, netMonthlyBenefit, annualBenefit,
    roiPct, missedCallsMonth, recoveredRevenue, hoursFreed, callsHandled,
  };
}

// ── SliderField ───────────────────────────────────────────────────────────────

function SliderField({
  id, label, value, min, max, step, format, onChange,
}: {
  id: string; label: string; value: number; min: number; max: number;
  step: number; format: (v: number) => string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground/80">{label}</label>
        <span className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary tabular-nums">
          {format(value)}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-border">
        <div className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-100" style={{ width: `${pct}%` }} />
        <input id={id} type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label={label} />
        <div className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-md transition-all duration-100"
          style={{ left: `calc(${pct}% - 8px)` }} />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
}

// ── MetricCard ────────────────────────────────────────────────────────────────

function MetricCard({ icon: Icon, label, value, sub }: {
  icon: React.ElementType; label: string; value: string; sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/8">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="font-display text-2xl tracking-tight text-foreground">{value}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      {sub && <div className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{sub}</div>}
    </div>
  );
}

// ── ROI Report Modal ──────────────────────────────────────────────────────────

function ROIReportModal({
  calc, isPositive, onClose, onBookDemo,
}: {
  calc: ReturnType<typeof computeROI>;
  isPositive: boolean;
  onClose: () => void;
  onBookDemo: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-8 py-7 text-primary-foreground">
          <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-1.5 text-primary-foreground/60 transition hover:bg-primary-foreground/15 hover:text-primary-foreground">
            <X className="h-4 w-4" />
          </button>
          <div className="text-[10px] uppercase tracking-[0.2em] opacity-60">Your personalised estimate</div>
          <div className="mt-1 font-display text-4xl tracking-tight">
            {isPositive ? fmtINR(calc.annualBenefit) : "—"}
          </div>
          {isPositive && (
            <>
              <div className="mt-1 text-sm opacity-70">{fmtINR(calc.netMonthlyBenefit)}/month net after Khyra's cost</div>
              <div className="mt-4 inline-block rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold">
                {calc.roiPct}% ROI on staff cost
              </div>
            </>
          )}
        </div>

        {/* Breakdown */}
        <div className="p-8 space-y-3">
          {[
            ["Khyra monthly cost",       fmtINR(calc.khyraMonthlyCost)],
            ["Current staff salaries",   fmtINR(calc.humanMonthlyCost) + "/mo"],
            ["Calls handled by Khyra",   fmtNum(calc.callsHandled) + "/mo"],
            ["Missed calls recovered",   fmtNum(calc.missedCallsMonth) + "/mo"],
            ["Revenue recovered",        fmtINR(calc.recoveredRevenue) + "/mo"],
            ["Staff hours freed",        fmtNum(calc.hoursFreed) + " hrs/mo"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="text-sm font-semibold text-foreground">{value}</span>
            </div>
          ))}

          <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
            A copy of this report has been sent to your email. These are conservative estimates — most customers see payback within the first month.
          </p>

          <button
            onClick={onBookDemo}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-95"
          >
            Book a personalised demo <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sign-in Gate Modal ────────────────────────────────────────────────────────

function SignInGateModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display text-2xl text-foreground">Sign in to get your report</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll email your full personalised ROI report and savings breakdown. Redirecting you to sign in…
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:200ms]" />
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}

// ── ROICalculatorSection ──────────────────────────────────────────────────────

export function ROICalculatorSection() {
  const { user } = useAuth();
  const navigate  = useNavigate();

  // ── Input state ──────────────────────────────────────────────────────────────
  const [agents,      setAgents]      = useState(2);
  const [salary,      setSalary]      = useState(25_000);
  const [callsPerDay, setCallsPerDay] = useState(40);
  const [missedPct,   setMissedPct]   = useState(20);

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [showSignInGate, setShowSignInGate] = useState(false);
  const [showReport,     setShowReport]     = useState(false);
  const [emailSending,   setEmailSending]   = useState(false);
  const [emailSent,      setEmailSent]      = useState(false);

  // ── Derived ──────────────────────────────────────────────────────────────────
  const calc      = useMemo(() => computeROI(agents, salary, callsPerDay, missedPct), [agents, salary, callsPerDay, missedPct]);
  const isPositive = calc.netMonthlyBenefit > 0;

  // ── Persist ROI params to sessionStorage ────────────────────────────────────
  const saveToSession = useCallback(() => {
    const params = { agents, salary, callsPerDay, missedPct };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(params));
  }, [agents, salary, callsPerDay, missedPct]);

  // ── Fire email + show report after returning from login ──────────────────────
  const fireROIEmail = useCallback(async () => {
    if (!auth?.currentUser || !db) return;
    setEmailSending(true);
    try {
      const profileSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      const profileData  = profileSnap.data();
      const name  = profileData?.name  || auth.currentUser.displayName || "there";
      const email = profileData?.email || auth.currentUser.email || "";
      if (!email) return;

      await sendROIEstimateEmail({
        data: { email, name, agents, salary, callsPerDay, missedPct, ...calc },
      });
      setEmailSent(true);
    } catch (err) {
      console.error("[ROICalculator] email send failed:", err);
    } finally {
      setEmailSending(false);
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [agents, salary, callsPerDay, missedPct, calc]);

  // ── On mount: check if we just returned from a login redirect with ROI params ──
  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw || !user) return;
    try {
      const params = JSON.parse(raw) as { agents: number; salary: number; callsPerDay: number; missedPct: number };
      setAgents(params.agents);
      setSalary(params.salary);
      setCallsPerDay(params.callsPerDay);
      setMissedPct(params.missedPct);
      // Show the report and fire the email
      setShowReport(true);
      fireROIEmail();
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ── Handle CTA click ─────────────────────────────────────────────────────────
  const handleGetEstimate = useCallback(() => {
    if (user) {
      // Already signed in — fire email + show report immediately
      setShowReport(true);
      if (!emailSent) fireROIEmail();
      return;
    }
    // Not signed in → persist params, show gate, then redirect to login
    saveToSession();
    setShowSignInGate(true);
    setTimeout(() => {
      navigate({ to: "/login", search: { redirect: "/#calculator" } });
    }, 2500);
  }, [user, emailSent, fireROIEmail, saveToSession, navigate]);

  return (
    <RevealSection id="calculator" className="mx-auto max-w-7xl px-6 py-24">

      {/* ── Heading ── */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">ROI calculator</div>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          How much could{" "}
          <span className="italic" style={{ color: "var(--primary)" }}>Khyra save you?</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Adjust the sliders to match your business and see your personalised
          savings estimate — we'll email you a full report.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start">

        {/* Left: Inputs */}
        <div className="flex flex-col gap-8 rounded-3xl border border-border bg-secondary/40 p-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your current setup</h3>
          <div className="flex flex-col gap-8">
            <SliderField id="calc-agents" label="Front-desk staff on your team" value={agents} min={1} max={10} step={1}
              format={(v) => `${v} ${v === 1 ? "person" : "people"}`} onChange={setAgents} />
            <SliderField id="calc-salary" label="Monthly salary per staff member" value={salary} min={10_000} max={80_000} step={1_000}
              format={fmtINR} onChange={setSalary} />
            <SliderField id="calc-calls" label="Inbound calls per day" value={callsPerDay} min={10} max={300} step={5}
              format={(v) => `${fmtNum(v)} calls`} onChange={setCallsPerDay} />
            <SliderField id="calc-missed" label="Estimated missed calls (% of total)" value={missedPct} min={0} max={60} step={5}
              format={(v) => `${v}%`} onChange={setMissedPct} />
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-4 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground/70">Assumptions: </span>
            Khyra handles 92% of calls end-to-end. One human kept for escalations.
            Avg missed-call revenue: ₹800. Khyra pricing: ₹12,000/mo base + ₹2.50/call.
          </div>
        </div>

        {/* Right: Results */}
        <div className="flex flex-col gap-5">

          {/* Hero saving card */}
          <div className={`rounded-3xl border p-8 transition-all duration-500 ${
            isPositive ? "border-primary/30 bg-primary text-primary-foreground shadow-2xl shadow-primary/20" : "border-border bg-muted"
          }`}>
            <div className="text-xs uppercase tracking-[0.2em] opacity-70">Your estimated annual saving</div>
            <div className="mt-2 font-display text-5xl md:text-6xl tabular-nums tracking-tight">
              {isPositive ? fmtINR(calc.annualBenefit) : "—"}
            </div>
            {isPositive ? (
              <>
                <div className="mt-2 text-sm opacity-75">{fmtINR(calc.netMonthlyBenefit)}/month net after Khyra's cost</div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <div className="rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold">{calc.roiPct}% ROI on staff cost</div>
                </div>
              </>
            ) : (
              <div className="mt-2 text-sm text-muted-foreground">Increase call volume or team size to see your ROI</div>
            )}
          </div>

          {/* Metric grid */}
          <div className="grid grid-cols-2 gap-4">
            <MetricCard icon={IndianRupee} label="Khyra monthly cost" value={fmtINR(calc.khyraMonthlyCost)} sub={`vs ${fmtINR(calc.humanMonthlyCost)} in salaries`} />
            <MetricCard icon={Phone} label="Calls handled / mo" value={fmtNum(calc.callsHandled)} sub="by Khyra — no human needed" />
            <MetricCard icon={TrendingDown} label="Missed calls recovered" value={fmtNum(calc.missedCallsMonth)} sub={`Worth ${fmtINR(calc.recoveredRevenue)}/mo`} />
            <MetricCard icon={Clock} label="Staff hours freed" value={`${fmtNum(calc.hoursFreed)} hrs`} sub="per month for higher-value work" />
          </div>

          {/* CTA card */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              These are conservative estimates. Most customers see{" "}
              <span className="font-semibold text-foreground">payback within the first month.</span>
            </p>
            <button
              id="roi-get-estimate-btn"
              onClick={handleGetEstimate}
              disabled={emailSending}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-95 disabled:opacity-60"
            >
              {emailSending ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending your report…</>
              ) : emailSent ? (
                <><Check className="h-4 w-4" /> Report sent — view it below</>
              ) : (
                <>Get my personalised estimate <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
            {emailSent && (
              <p className="mt-2 text-center text-xs text-primary">
                ✓ Check your inbox — your full ROI report has been sent
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {showSignInGate && <SignInGateModal onClose={() => setShowSignInGate(false)} />}

      {showReport && (
        <ROIReportModal
          calc={calc}
          isPositive={isPositive}
          onClose={() => setShowReport(false)}
          onBookDemo={() => navigate({ to: "/book-demo" })}
        />
      )}
    </RevealSection>
  );
}

