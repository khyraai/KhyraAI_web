import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import logo from "@/assets/Khyra.svg";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [{ title: "Create Account — Khyra AI" }],
  }),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(60),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(
        /^(\+91[\s-]?)?[6-9]\d{9}$/,
        "Enter a valid 10-digit Indian mobile number"
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Za-z]/, "Must include at least one letter")
      .regex(/[0-9]/, "Must include at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

function getFirebaseError(code: string): string {
  const map: Record<string, string> = {
    "auth/email-already-in-use":
      "An account with this email already exists. Try signing in.",
    "auth/weak-password": "Password is too weak. Use at least 8 characters.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/too-many-requests": "Too many requests. Please try again later.",
    "auth/network-request-failed":
      "Network error. Please check your connection.",
  };
  return map[code] ?? "Something went wrong. Please try again.";
}

function InputField({
  label,
  error,
  icon: Icon,
  right,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon: React.ElementType;
  right?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <input
          className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-11 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
          {...props}
        />
        {right && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {right}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupForm) => {
    setAuthError("");
    setIsSubmitting(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.name });

      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: data.name,
          email: data.email,
          phone: data.phone,
          createdAt: serverTimestamp(),
        });
      } catch {
        /* Firestore may not be enabled — auth still succeeded */
      }

      navigate({ to: "/" });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      setAuthError(getFirebaseError(code));
    } finally {
      setIsSubmitting(false);
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
        <Link to="/" className="group flex items-center gap-2.5 text-primary">
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
      <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 pb-16 py-8">
        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-8 text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Get started
              </div>
              <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Create your account.
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {authError && (
              <div className="mb-5 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {authError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name + Phone — 2 col on md+ */}
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Full name"
                  icon={User}
                  type="text"
                  autoComplete="name"
                  placeholder="Priya Sharma"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    Phone number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                    <div className="absolute left-9 top-1/2 -translate-y-1/2 select-none pr-2 text-sm text-muted-foreground/60 after:absolute after:right-0 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-border">
                      +91
                    </div>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="98765 43210"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-[4.25rem] pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <InputField
                label="Email address"
                icon={Mail}
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                error={errors.email?.message}
                {...register("email")}
              />

              {/* Password */}
              <InputField
                label="Password"
                icon={Lock}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 8 chars with a number"
                error={errors.password?.message}
                right={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground/60 hover:text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                {...register("password")}
              />

              {/* Confirm password */}
              <InputField
                label="Confirm password"
                icon={Lock}
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your password"
                error={errors.confirmPassword?.message}
                right={
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-muted-foreground/60 hover:text-muted-foreground"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                {...register("confirmPassword")}
              />

              <p className="text-[11px] leading-relaxed text-muted-foreground">
                By creating an account you agree to our{" "}
                <a href="#" className="text-primary underline-offset-4 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary underline-offset-4 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Creating account…"
                ) : (
                  <>
                    Create account <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
