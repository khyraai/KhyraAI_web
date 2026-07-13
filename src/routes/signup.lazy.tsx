import { createLazyFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { sendVerificationEmail } from "@/lib/send-verification-email";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Eye, EyeOff, Check, ArrowRight, Mail, ChevronLeft } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { TopBanner, SiteNav } from "@/components/site-nav";
import indiaImg from "@/assets/india-infographic.png";

export const Route = createLazyFileRoute("/signup")({
  component: SignupPage,
});

/* ---------- Schemas ---------- */
const step1Schema = z
  .object({
    name: z.string().min(2, "At least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type Step1Data = z.infer<typeof step1Schema>;

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

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const segColors = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-green-600"];
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const labelColor = strength <= 2 ? "text-red-500" : strength === 3 ? "text-yellow-600" : "text-green-600";
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? segColors[strength - 1] : "bg-border"}`} />
        ))}
      </div>
      <p className={`mt-1 text-[12px] font-medium ${labelColor}`}>{labels[strength]}</p>
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
    <div className="relative hidden w-[420px] flex-shrink-0 flex-col overflow-hidden bg-primary px-10 pb-8 pt-0 text-primary-foreground lg:flex">
      <div className="pointer-events-none absolute inset-0 opacity-25"
        style={{ backgroundImage: "radial-gradient(ellipse at 20% 80%, color-mix(in oklab, var(--saffron) 55%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, color-mix(in oklab, white 12%, transparent) 0%, transparent 50%)" }}
      />

      {/* India infographic */}
      <div className="relative flex flex-1 items-start justify-center pt-0">
        <img
          src={indiaImg}
          alt="India market infographic showing Khyra AI coverage"
          width="420"
          height="420"
          className="h-full max-h-[420px] w-full object-contain drop-shadow-lg"
        />
      </div>

      <div className="relative pt-1">
        <p className="font-display text-2xl leading-snug">Scale your voice business globally.</p>
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
  const { email: prefillEmail, redirect } = useSearch({ from: "/signup" });
  const { refreshProfile } = useAuth();
  
  // step 1: Account setup
  // step 2: Verification
  const [step, setStep] = useState<1 | 2>(1);
  
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
  const [emailSendIssue, setEmailSendIssue] = useState<"" | "rate_limited" | "failed">("");

  const s1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema) });
  const pwValue = s1.watch("password") ?? "";

  useEffect(() => {
    if (prefillEmail) {
      s1.setValue("email", prefillEmail);
    }
  }, [prefillEmail, s1]);

  /* Step 1 → create Firebase user */
  const handleStep1 = s1.handleSubmit(async (data) => {
    if (!agreed) { setAuthError("Please agree to the Terms of Service."); return; }
    setAuthError("");
    try {
      const { user } = await createUserWithEmailAndPassword(auth!, data.email, data.password);
      await updateProfile(user, { displayName: data.name });
      
      // Immediately create the basic profile document
      await setDoc(doc(db!, "users", user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        createdAt: serverTimestamp(),
      });

      // Send verification email
      sendVerificationEmail({ data: { email: data.email, displayName: data.name } }).then((res) => {
        if (!res?.ok) {
          setEmailSendIssue(res.error === "rate_limited" ? "rate_limited" : "failed");
        } else {
          setEmailSendIssue("");
        }
      }).catch(() => {
        setEmailSendIssue("failed");
      });
      
      setFirebaseUser(user);
      setUserEmail(data.email);
      setStep(2);
    } catch (e: unknown) {
      setAuthError(fbError((e as { code?: string }).code ?? ""));
    }
  });

  /* Step 2 (Verification) → check email verified */
  const handleVerify = async () => {
    if (!firebaseUser) return;
    setVerifying(true); setVerifyError("");
    try {
      await firebaseUser.reload();
      if (firebaseUser.emailVerified) {
        await refreshProfile(); // sync auth context before navigating home
        if (redirect) window.location.href = redirect;
        else navigate({ to: "/" });
      } else {
        setVerifyError("Email not yet verified. Please click the link in your inbox first.");
      }
    } catch { setVerifyError("Verification check failed. Please try again."); }
    finally { setVerifying(false); }
  };

  const handleResend = async () => {
    if (!firebaseUser) return;
    setResendLoading(true); setResendSent(false);
    try {
      const res = await sendVerificationEmail({ data: { email: userEmail, displayName: firebaseUser.displayName ?? "User" } });
      if (res?.ok) {
        setResendSent(true);
        setEmailSendIssue("");
        setVerifyError("");
      } else if (res?.error === "rate_limited") {
        setEmailSendIssue("rate_limited");
        setVerifyError("Too many verification attempts for this email. Please wait and try resending later.");
      } else {
        setEmailSendIssue("failed");
        setVerifyError("We couldn't send the verification email right now. Please try again shortly.");
      }
    }
    catch {
      setEmailSendIssue("failed");
      setVerifyError("We couldn't send the verification email right now. Please try again shortly.");
    } finally { setResendLoading(false); }
  };

  const handleGoogle = async () => {
    setAuthError("");
    try {
      const result = await signInWithPopup(auth!, new GoogleAuthProvider());
      const { user } = result;

      // Check if user document exists
      const userDocRef = doc(db!, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Automatically create the user profile
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || "User",
          email: user.email || "",
          createdAt: serverTimestamp(),
        });
      }

      // Already registered or just registered seamlessly — go to dashboard or redirect
      await refreshProfile();
      if (redirect) window.location.href = redirect;
      else navigate({ to: "/" });
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
            <Link to="/login" search={redirect ? { redirect } : undefined} className="font-semibold text-primary underline-offset-4 hover:underline">Log in</Link>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-8 pb-10">
          <div className="w-full max-w-[500px]">

            {/* ── STEP 1: Account ── */}
            {step === 1 && (
              <>
                <div className="mb-6">
                  <h1 className="font-display text-[2rem] leading-tight text-ink">Create Your Account</h1>
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
                      <div>
                        <div className="relative">
                          <input {...s1.register("password")} type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="Enter password" className={`${inputCls} pr-11`} />
                          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <PasswordStrength password={pwValue} />
                        {!pwValue && <p className="mt-1.5 text-[12px] text-muted-foreground">Min 8 chars · uppercase · lowercase · number · special char</p>}
                      </div>
                    </F>
                    <F label="Confirm Password" req error={s1.formState.errors.confirmPassword?.message}>
                      <div className="relative">
                        <input {...s1.register("confirmPassword")} type={showConfirm ? "text" : "password"} autoComplete="new-password" placeholder="Confirm Password" className={`${inputCls} pr-11`} />
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
                      <a href="/terms" className="text-primary hover:underline">Terms of Service</a> &amp; <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.{" "}
                      By creating an account, you confirm that you have read and accepted these terms.
                    </span>
                  </label>

                  <div className="flex justify-center pt-1">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-[13px] uppercase tracking-wider text-muted-foreground">or sign up with</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  </div>

                  <button type="button" onClick={handleGoogle} className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white py-3 text-[15px] font-medium text-foreground transition hover:bg-stone-50 active:scale-[0.98]">
                    {GOOGLE_ICON}<span>Sign up with Google</span>
                  </button>

                  <div className="flex justify-end pt-2">
                    <button type="submit" className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-[15px] font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]">
                      Create Account
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* ── STEP 2: Verify ── */}
            {step === 2 && (
              <div className="py-4 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h1 className="font-display text-[2rem] leading-tight text-ink">Verify Your Email</h1>
                <p className="mt-2 text-[15px] text-muted-foreground">We've sent a verification link to</p>
                <p className="mt-0.5 text-[15px] font-semibold text-primary">{userEmail}</p>
                {emailSendIssue === "rate_limited" && (
                  <div className="mx-auto mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    Verification email is temporarily rate-limited by Firebase for this address. Please wait a while, then use Resend.
                  </div>
                )}
                {emailSendIssue === "failed" && (
                  <div className="mx-auto mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    We couldn't send the verification email right now. Please use Resend in a moment.
                  </div>
                )}

                <div className="mx-auto mt-6 rounded-xl border border-border bg-secondary/40 px-6 py-5 text-left">
                  <p className="text-[15px] font-medium text-foreground">How to verify:</p>
                  <ol className="mt-2 space-y-1.5 text-[15px] text-muted-foreground">
                    <li>1. Open the email from Khyra AI in your inbox</li>
                    <li>2. Click the <strong className="text-foreground">Verify Email</strong> button in the email</li>
                    <li>3. Return here and click <strong className="text-foreground">I've Verified</strong> below</li>
                  </ol>
                </div>

                {verifyError && (
                  <div className="mx-auto mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{verifyError}</div>
                )}

                {resendSent && (
                  <p className="mt-3 text-[13px] text-primary">Verification email resent!</p>
                )}

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button type="button" onClick={handleVerify} disabled={verifying} className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-[15px] font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60">
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
