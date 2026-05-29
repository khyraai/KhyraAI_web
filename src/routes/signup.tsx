import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Eye, EyeOff, Check, ArrowRight, ChevronLeft, Mail } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { TopBanner, SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [{ title: "Create Account — Khyra AI" }],
  }),
});

/* ---------- Schemas ---------- */
const step1Schema = z
  .object({
    name: z.string().min(2, "At least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "At least 8 characters").regex(/[A-Za-z]/, "Must include a letter").regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

const step2Schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  phone: z.string().min(7, "Enter a valid phone number"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State / Province is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(3, "Enter a valid postal code"),
  streetAddress: z.string().min(1, "Street address is required"),
  about: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

/* ---------- Helpers ---------- */
const GOOGLE_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" aria-hidden>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function fbError(code: string) {
  const m: Record<string, string> = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password is too weak.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/too-many-requests": "Too many requests. Try again later.",
    "auth/network-request-failed": "Network error.",
    "auth/popup-closed-by-user": "Sign-in cancelled.",
    "auth/cancelled-popup-request": "Sign-in cancelled.",
    "auth/popup-blocked": "Allow popups for this site.",
    "auth/account-exists-with-different-credential": "An account exists with a different sign-in method.",
  };
  return m[code] ?? "Something went wrong. Please try again.";
}

const inputCls = "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";
const selectCls = `${inputCls} appearance-none pr-8`;

function F({ label, req, error, children }: { label: string; req?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[15px] font-medium text-foreground">
        {label}{req && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
    </div>
  );
}

/* ---------- Stepper ---------- */
function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = [{ n: 1, label: "Account" }, { n: 2, label: "Details" }, { n: 3, label: "Verify" }];
  return (
    <div className="mb-8 flex items-start">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-start">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-semibold transition-colors ${
              step > s.n ? "bg-primary text-primary-foreground" :
              step === s.n ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
              "border-2 border-border text-muted-foreground"
            }`}>
              {step > s.n ? <Check className="h-4 w-4" /> : s.n}
            </div>
            <span className={`text-[13px] font-medium ${
              step === s.n ? "text-primary" : step > s.n ? "text-foreground" : "text-muted-foreground"
            }`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && <div className={`mx-5 mt-4 h-px w-20 flex-shrink-0 transition-colors ${step > s.n ? "bg-primary" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );
}

/* ---------- Left panel ---------- */
function LeftPanel() {
  const bullets = [
    { title: "Instant Deployment", body: "Deploy voice agents in hours, not months." },
    { title: "Enterprise Grade", body: "99.9% uptime with 10+ Indian languages supported." },
    { title: "Pay As You Scale", body: "No hidden fees. Start small, grow big." },
  ];
  return (
    <div className="relative hidden w-[420px] flex-shrink-0 flex-col overflow-hidden bg-primary px-10 py-8 text-primary-foreground lg:flex">
      <div className="pointer-events-none absolute inset-0 opacity-25"
        style={{ backgroundImage: "radial-gradient(ellipse at 20% 80%, color-mix(in oklab, var(--saffron) 55%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, color-mix(in oklab, white 12%, transparent) 0%, transparent 50%)" }}
      />

      {/* India infographic */}
      <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
        <svg viewBox="0 0 200 210" fill="none" className="h-[190px] w-auto">
          <defs>
            <radialGradient id="ig" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.12" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="95" cy="108" rx="85" ry="95" fill="url(#ig)" />
          <path
            d="M 88,6 L 100,4 L 112,6 L 122,10 L 135,16 L 148,25 L 158,38 L 162,52 L 158,65 L 162,76 L 156,90 L 148,104 L 140,118 L 130,134 L 120,150 L 108,166 L 98,178 L 90,185 L 82,178 L 70,162 L 58,145 L 46,126 L 36,108 L 26,90 L 20,74 L 18,60 L 22,48 L 28,38 L 24,28 L 30,18 L 40,10 L 55,5 L 70,4 Z"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {([[88,68],[50,122],[140,102],[118,152],[92,162]] as [number,number][]).map(([cx,cy],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="rgba(251,191,36,0.18)" />
              <circle cx={cx} cy={cy} r="3.5" fill="#fbbf24" opacity="0.9" />
            </g>
          ))}
          <line x1="88" y1="68" x2="50" y2="122" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,4" />
          <line x1="88" y1="68" x2="140" y2="102" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,4" />
          <line x1="50" y1="122" x2="92" y2="162" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,4" />
          <line x1="140" y1="102" x2="118" y2="152" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,4" />
          <line x1="118" y1="152" x2="92" y2="162" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,4" />
        </svg>

        <div className="grid w-full grid-cols-3 gap-2">
          {[{ value: "1.4B+", label: "Population" }, { value: "800M+", label: "Internet" }, { value: "22+", label: "Languages" }].map((s) => (
            <div key={s.label} className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/10 px-2 py-3 text-center">
              <p className="text-lg font-bold leading-none">{s.value}</p>
              <p className="mt-1 text-[11px] leading-tight text-primary-foreground/65">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative pt-5">
        <h2 className="font-display text-2xl leading-snug">Scale your voice<br />business globally.</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-primary-foreground/65">
          Join forward-thinking businesses using Khyra AI's intelligent voice agents to automate customer interactions in India.
        </p>
        <div className="mt-4 space-y-3">
          {bullets.map((b) => (
            <div key={b.title} className="flex gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10">
                <Check className="h-3 w-3" />
              </div>
              <div>
                <p className="text-[13px] font-semibold">{b.title}</p>
                <p className="text-[11px] leading-relaxed text-primary-foreground/60">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [authError, setAuthError] = useState("");
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  const s1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema) });
  const s2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: { country: "India" } });

  /* Step 1 → create Firebase user */
  const handleStep1 = s1.handleSubmit(async (data) => {
    if (!agreed) { setAuthError("Please agree to the Terms of Service."); return; }
    setAuthError("");
    try {
      const { user } = await createUserWithEmailAndPassword(auth!, data.email, data.password);
      await updateProfile(user, { displayName: data.name });
      await sendEmailVerification(user);
      setFirebaseUser(user);
      setUserEmail(data.email);
      setStep(2);
    } catch (e: unknown) {
      setAuthError(fbError((e as { code?: string }).code ?? ""));
    }
  });

  /* Step 2 → save details to Firestore */
  const handleStep2 = s2.handleSubmit(async (data) => {
    setAuthError("");
    if (firebaseUser) {
      try {
        await setDoc(doc(db!, "users", firebaseUser.uid), {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: userEmail,
          ...data,
          createdAt: serverTimestamp(),
        });
      } catch { /* Firestore optional */ }
    }
    setStep(3);
  });

  /* Step 3 → check email verified */
  const handleVerify = async () => {
    if (!firebaseUser) return;
    setVerifying(true); setVerifyError("");
    try {
      await firebaseUser.reload();
      if (firebaseUser.emailVerified) {
        navigate({ to: "/" });
      } else {
        setVerifyError("Email not yet verified. Please click the link in your inbox first.");
      }
    } catch { setVerifyError("Verification check failed. Please try again."); }
    finally { setVerifying(false); }
  };

  const handleResend = async () => {
    if (!firebaseUser) return;
    setResendLoading(true); setResendSent(false);
    try { await sendEmailVerification(firebaseUser); setResendSent(true); }
    catch { /* silently ignore */ } finally { setResendLoading(false); }
  };

  const handleGoogle = async () => {
    setAuthError("");
    try {
      await signInWithPopup(auth!, new GoogleAuthProvider());
      navigate({ to: "/" });
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? "";
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request")
        setAuthError(fbError(code));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <TopBanner />
      <SiteNav />
      <div className="flex flex-1">
      <LeftPanel />

      {/* Right panel */}
      <div className="flex flex-1 flex-col bg-[#faf7f2]">
        <div className="flex items-center justify-end px-8 py-5">
          <p className="text-[15px] text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary underline-offset-4 hover:underline">Log in</Link>
          </p>
        </div>

        <div className="flex flex-1 items-start justify-center overflow-y-auto px-8 pb-10 pt-2">
          <div className="w-full max-w-[620px]">
            <Stepper step={step} />

            {/* ── STEP 1: Account ── */}
            {step === 1 && (
              <>
                <div className="mb-6">
                  <h1 className="font-display text-[1.75rem] text-ink">Create Your Account</h1>
                  <p className="mt-1 text-[15px] text-muted-foreground">Enter your basic information to get started</p>
                </div>
                {authError && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{authError}</div>}
                <form onSubmit={handleStep1} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <F label="Full name" req error={s1.formState.errors.name?.message}>
                      <input {...s1.register("name")} type="text" autoComplete="name" placeholder="John Doe" className={inputCls} />
                    </F>
                    <F label="Email address" req error={s1.formState.errors.email?.message}>
                      <input {...s1.register("email")} type="email" autoComplete="email" placeholder="name@domain.com" className={inputCls} />
                    </F>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <F label="Password" req error={s1.formState.errors.password?.message}>
                      <div className="relative">
                        <input {...s1.register("password")} type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="8 digit Password" className={`${inputCls} pr-11`} />
                        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </F>
                    <F label="Confirm Password" req error={s1.formState.errors.confirmPassword?.message}>
                      <div className="relative">
                        <input {...s1.register("confirmPassword")} type={showConfirm ? "text" : "password"} autoComplete="new-password" placeholder="8 digit Password" className={`${inputCls} pr-11`} />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </F>
                  </div>

                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                    <span className="text-[13px] leading-relaxed text-muted-foreground">
                      I agree to the Khyra AI{" "}
                      <a href="#" className="text-primary hover:underline">Terms of Service &amp; Privacy Policy</a>.{" "}
                      By creating an account, you confirm that you have read and accepted these terms.
                    </span>
                  </label>

                  <div className="flex justify-center pt-1">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-16 bg-border" />
                      <span className="text-[13px] uppercase tracking-wider text-muted-foreground">or sign up with</span>
                      <div className="h-px w-16 bg-border" />
                    </div>
                  </div>

                  <button type="button" onClick={handleGoogle} className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white py-3 text-[15px] font-medium text-foreground transition hover:bg-stone-50 active:scale-[0.98]">
                    {GOOGLE_ICON}<span>Sign up with Google</span>
                  </button>

                  <div className="flex justify-end pt-2">
                    <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-[15px] font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]">
                      Next <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* ── STEP 2: Details ── */}
            {step === 2 && (
              <>
                <div className="mb-6">
                  <h1 className="font-display text-[1.75rem] text-ink">Additional Information</h1>
                  <p className="mt-1 text-[15px] text-muted-foreground">Tell us more about yourself. Fields marked <span className="text-red-500">*</span> are required.</p>
                </div>
                {authError && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{authError}</div>}
                <form onSubmit={handleStep2} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <F label="Company name" req error={s2.formState.errors.companyName?.message}>
                      <input {...s2.register("companyName")} type="text" placeholder="XYZ pvt. ltd" className={inputCls} />
                    </F>
                    <F label="Phone number" req error={s2.formState.errors.phone?.message}>
                      <div className="flex gap-2">
                        <div className="flex items-center rounded-xl border border-border bg-white px-3 text-[15px] text-muted-foreground">+91 IN</div>
                        <input {...s2.register("phone")} type="tel" placeholder="1234567890" className={inputCls} />
                      </div>
                    </F>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <F label="Country" req error={s2.formState.errors.country?.message}>
                      <select {...s2.register("country")} className={selectCls}>
                        {["India","United States","United Kingdom","Canada","Australia","Singapore","UAE","Germany","Other"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </F>
                    <F label="State/Province" req error={s2.formState.errors.state?.message}>
                      <input {...s2.register("state")} type="text" placeholder="Select state/province" className={inputCls} />
                    </F>
                    <F label="City" req error={s2.formState.errors.city?.message}>
                      <input {...s2.register("city")} type="text" placeholder="City" className={inputCls} />
                    </F>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <F label="ZIP/Postal code" req error={s2.formState.errors.zip?.message}>
                      <input {...s2.register("zip")} type="text" placeholder="ZIP" className={inputCls} />
                    </F>
                    <F label="Street Address" req error={s2.formState.errors.streetAddress?.message}>
                      <input {...s2.register("streetAddress")} type="text" placeholder="Street address" className={inputCls} />
                    </F>
                  </div>
                  <F label="About your account (optional)">
                    <textarea {...s2.register("about")} rows={3} placeholder="Brief description" className={`${inputCls} resize-none`} />
                  </F>
                  <div className="flex items-center justify-between pt-2">
                    <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-5 py-3 text-[15px] font-medium text-foreground transition hover:bg-secondary">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-[15px] font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]">
                      Next <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* ── STEP 3: Verify ── */}
            {step === 3 && (
              <div className="py-4 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h1 className="font-display text-[1.75rem] text-ink">Verify Your Email</h1>
                <p className="mt-2 text-[15px] text-muted-foreground">We've sent a verification link to</p>
                <p className="mt-0.5 text-[15px] font-semibold text-primary">{userEmail}</p>

                <div className="mx-auto mt-6 max-w-sm rounded-xl border border-border bg-secondary/40 px-6 py-5 text-left">
                  <p className="text-[15px] font-medium text-foreground">How to verify:</p>
                  <ol className="mt-2 space-y-1.5 text-[15px] text-muted-foreground">
                    <li>1. Open the email from Khyra AI in your inbox</li>
                    <li>2. Click the <strong className="text-foreground">Verify Email</strong> button in the email</li>
                    <li>3. Return here and click <strong className="text-foreground">I've Verified</strong> below</li>
                  </ol>
                </div>

                {verifyError && (
                  <div className="mx-auto mt-4 max-w-sm rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{verifyError}</div>
                )}

                {resendSent && (
                  <p className="mt-3 text-[13px] text-primary">Verification email resent!</p>
                )}

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-5 py-3 text-[15px] font-medium text-foreground transition hover:bg-secondary">
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button type="button" onClick={handleVerify} disabled={verifying} className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-[15px] font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60">
                    {verifying ? "Checking…" : "I've Verified"} {!verifying && <Check className="h-4 w-4" />}
                  </button>
                </div>

                <button type="button" onClick={handleResend} disabled={resendLoading} className="mt-4 text-[15px] text-muted-foreground underline-offset-4 hover:text-primary hover:underline disabled:opacity-50">
                  {resendLoading ? "Resending…" : "Didn't receive email? Resend"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
