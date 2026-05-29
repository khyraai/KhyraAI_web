import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";
import logo from "@/assets/Khyra.svg";

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

function getFirebaseError(code: string): string {
  const map: Record<string, string> = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later.",
    "auth/network-request-failed":
      "Network error. Please check your connection.",
  };
  return map[code] ?? "Something went wrong. Please try again.";
}

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setAuthError("");
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth!, data.email, data.password);
      navigate({ to: "/" });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setAuthError(getFirebaseError(code));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    setResetError("");
    if (!resetEmail) {
      setResetError("Enter your email address.");
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth!, resetEmail);
      setResetSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setResetError(getFirebaseError(code));
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 65%, transparent), transparent 70%)",
        }}
      />

      {/* Header */}
      <header className="relative flex h-20 items-center px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-primary"
        >
          <img
            src={logo}
            alt="Khyra AI"
            className="h-9 w-9 rounded-full border border-primary/70 object-contain transition-colors group-hover:bg-primary"
          />
          <span className="font-display text-2xl leading-none tracking-tight">
            Khyra AI
          </span>
        </Link>
      </header>

      {/* Card */}
      <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            {!resetMode ? (
              <>
                <div className="mb-8 text-center">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Welcome back
                  </div>
                  <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                    Sign in to Khyra.
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Create one
                    </Link>
                  </p>
                </div>

                {authError && (
                  <div className="mb-5 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setResetMode(true)}
                        className="text-[11px] text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-11 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      "Signing in…"
                    ) : (
                      <>
                        Sign in <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Password reset
                  </div>
                  <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                    Reset your password.
                  </h1>
                  {!resetSent && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Enter your email and we'll send a reset link.
                    </p>
                  )}
                </div>

                {resetSent ? (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-center text-sm text-primary">
                    Reset link sent to <strong>{resetEmail}</strong>. Check your
                    inbox (and spam folder).
                  </div>
                ) : (
                  <>
                    {resetError && (
                      <div className="mb-5 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                        {resetError}
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                        <input
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      disabled={resetLoading}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60"
                    >
                      {resetLoading ? "Sending…" : "Send reset link"}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setResetMode(false);
                    setResetSent(false);
                    setResetEmail("");
                    setResetError("");
                  }}
                  className="mt-4 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Back to sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
