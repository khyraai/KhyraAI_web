import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Eye, EyeOff } from "lucide-react";
import { TopBanner, SiteNav } from "@/components/site-nav";
import robotImg from "@/assets/khyra-login-mascot.png";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Sign In — Khyra AI" }],
  }),
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

const GOOGLE_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" aria-hidden>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function getFirebaseError(code: string): string {
  const map: Record<string, string> = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/too-many-requests": "Too many failed attempts. Try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/popup-closed-by-user": "Sign-in cancelled.",
    "auth/cancelled-popup-request": "Sign-in cancelled.",
    "auth/popup-blocked": "Allow popups for this site.",
    "auth/account-exists-with-different-credential": "An account exists with a different sign-in method.",
  };
  return map[code] ?? "Something went wrong. Please try again.";
}

/* ---------- Left panel ---------- */
function LeftPanel() {
  return (
    <div className="relative hidden w-[420px] flex-shrink-0 flex-col overflow-hidden bg-primary px-10 pb-10 pt-6 text-primary-foreground lg:flex">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 80%, color-mix(in oklab, var(--saffron) 60%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, color-mix(in oklab, white 15%, transparent) 0%, transparent 50%)",
        }}
      />

      {/* Robot mascot */}
      <div className="relative flex flex-1 items-start justify-center pt-4">
        <img
          src={robotImg}
          alt="Khyra AI"
          className="w-full max-w-[400px] object-contain drop-shadow-2xl"
        />
      </div>

      <div className="relative pt-4">
        <h2 className="font-display text-2xl leading-snug">AI-First Voice Platform<br />for India</h2>
        <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65">
          Deploy intelligent voice agents for Indian businesses — multilingual, always-on, up and running in hours.
        </p>
      </div>
    </div>
  );
}

/* ---------- Input ---------- */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[15px] font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

/* ---------- Page ---------- */
function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setAuthError(""); setSubmitting(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth!, data.email, data.password);
      // Guard: if the user abandoned signup at Step 2, their Firestore profile
      // will be missing. Redirect them back to finish the registration.
      const userDoc = await getDoc(doc(db!, "users", user.uid));
      if (!userDoc.exists()) {
        navigate({ to: "/signup", search: { incomplete: true } });
        return;
      }
      navigate({ to: "/" });
    } catch (e: unknown) {
      setAuthError(getFirebaseError((e as { code?: string }).code ?? ""));
    } finally { setSubmitting(false); }
  };

  const handleReset = async () => {
    setResetError("");
    if (!resetEmail) { setResetError("Enter your email address."); return; }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth!, resetEmail);
      setResetSent(true);
    } catch (e: unknown) {
      setResetError(getFirebaseError((e as { code?: string }).code ?? ""));
    } finally { setResetLoading(false); }
  };

  const handleGoogle = async () => {
    setAuthError("");
    try {
      const result = await signInWithPopup(auth!, new GoogleAuthProvider());
      const { user } = result;

      // Check if user has completed registration (Firestore profile exists)
      const userDoc = await getDoc(doc(db!, "users", user.uid));
      if (!userDoc.exists()) {
        // Keep the user authenticated — signup page will detect auth.currentUser
        // and auto-jump to Step 2 to complete the mandatory profile form.
        navigate({ to: "/signup", search: { incomplete: true } });
        return;
      }

      navigate({ to: "/" });
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? "";
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request")
        setAuthError(getFirebaseError(code));
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
          <p className="text-sm text-muted-foreground">
            Don't have an Account?{" "}
            <Link to="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">Create an Account</Link>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-8 pb-10">
          <div className="w-full max-w-[500px]">
            {!resetMode ? (
              <>
                <div className="mb-7">
                  <h1 className="font-display text-[2.15rem] leading-tight text-ink">Welcome to Khyra AI</h1>
                  <p className="mt-0.5 text-base font-semibold text-foreground/80">Smarter Voice Infrastructure</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                    Access secure, AI-first voice agents to build, manage, and scale intelligent voice applications across India effortlessly.
                  </p>
                </div>

                {authError && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{authError}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Field label="Email Address" error={errors.email?.message}>
                    <input {...register("email")} type="email" autoComplete="email" placeholder="name@domain.com" className={inputCls} />
                  </Field>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-[15px] font-medium text-foreground">Password</label>
                      <button type="button" onClick={() => setResetMode(true)} className="text-[15px] font-medium text-primary underline-offset-4 hover:underline">Forgot Password?</button>
                    </div>
                    <div className="relative">
                      <input {...register("password")} type={showPw ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className={`${inputCls} pr-11`} />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-[13px] text-red-500">{errors.password.message}</p>}
                  </div>

                  <button type="submit" disabled={submitting} className="w-full rounded-xl bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60">
                    {submitting ? "Signing in…" : "Login"}
                  </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" /><span className="text-xs uppercase tracking-wider text-muted-foreground">or</span><div className="h-px flex-1 bg-border" />
                </div>

                <button type="button" onClick={handleGoogle} className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-4 py-3 transition hover:bg-stone-50 active:scale-[0.98]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">K</div>
                    <div className="text-left">
                      <p className="text-[15px] font-medium text-foreground">Continue with Google</p>
                      <p className="text-[13px] text-muted-foreground">Sign in using your Google account</p>
                    </div>
                  </div>
                  {GOOGLE_ICON}
                </button>

                <p className="mt-5 text-center text-[13px] text-muted-foreground">
                  By continuing, you agree to Khyra AI's{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a> &{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </>
            ) : (
              <>
                <div className="mb-7">
                  <h1 className="font-display text-[2rem] leading-tight text-ink">Reset your password</h1>
                  <p className="mt-1.5 text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
                </div>

                {resetSent ? (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-6 text-center">
                    <p className="text-3xl mb-2">📧</p>
                    <p className="text-sm font-medium text-primary">Reset link sent!</p>
                    <p className="mt-1 text-xs text-muted-foreground">Check your inbox at <strong>{resetEmail}</strong></p>
                  </div>
                ) : (
                  <>
                    {resetError && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{resetError}</div>}
                    <Field label="Email Address">
                      <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="name@domain.com" className={inputCls} />
                    </Field>
                    <button type="button" onClick={handleReset} disabled={resetLoading} className="mt-4 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60">
                      {resetLoading ? "Sending…" : "Send Reset Link"}
                    </button>
                  </>
                )}

                <button type="button" onClick={() => { setResetMode(false); setResetSent(false); setResetEmail(""); setResetError(""); }}
                  className="mt-4 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  ← Back to sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
