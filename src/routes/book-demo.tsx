import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, addDoc, getDoc, getDocs, limit, query, serverTimestamp, where, Timestamp, doc } from "firebase/firestore";
import { ArrowRight, Check } from "lucide-react";
import { TopBanner, SiteNav } from "@/components/site-nav";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { sendDemoRequestEmail } from "@/lib/send-demo-request-email";

export const Route = createFileRoute("/book-demo")({
  component: BookDemoPage,
  head: () => ({
    meta: [{ title: "Book a Demo - Khyra AI" }],
  }),
});

const LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Odia",
  "Tamil",
  "Punjabi",
  "Telugu",
] as const;

const schema = z.object({
  roleTitle: z.string().min(2, "Role/title is required"),
  teamSize: z.string().min(1, "Team size is required"),
  useCasePainPoints: z.string().min(10, "Please share a little more detail").max(1000, "Please keep this under 1000 characters"),
  preferredLanguages: z.array(z.enum(LANGUAGE_OPTIONS)).min(1, "Select at least one preferred language"),
});

type FormData = z.infer<typeof schema>;

function BookDemoPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [profile, setProfile] = useState<{ name: string; email: string; phone: string; companyName: string; city: string; state: string } | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { preferredLanguages: [] },
  });
  const selectedLanguages = watch("preferredLanguages");

  useEffect(() => {
    if (loading) return;
    if (!auth?.currentUser) {
      navigate({ to: "/login" });
      return;
    }
    setAuthChecked(true);
  }, [loading, navigate]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!authChecked || !auth?.currentUser || !db) return;
      const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (!snap.exists()) {
        navigate({ to: "/signup", search: { incomplete: true } });
        return;
      }
      const data = snap.data();
      setProfile({
        name: data.name ?? auth.currentUser.displayName ?? "",
        email: data.email ?? auth.currentUser.email ?? "",
        phone: data.phone ?? "",
        companyName: data.companyName ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
      });
    };
    loadProfile().catch(() => setSubmitError("Unable to load your profile. Please try again."));
  }, [authChecked, navigate]);

  const canRenderForm = useMemo(() => !!user && !!profile, [user, profile]);

  const onSubmit = handleSubmit(async (data) => {
    if (!auth?.currentUser || !db || !profile) return;
    setSubmitError("");
    setPendingMessage("");
    setSubmitting(true);
    try {
      const tenDaysAgo = Timestamp.fromDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000));
      const existingQuery = query(
        collection(db, "demo_requests"),
        where("uid", "==", auth.currentUser.uid),
        where("submittedAt", ">=", tenDaysAgo),
        limit(1),
      );
      const existing = await getDocs(existingQuery);
      if (!existing.empty) {
        setPendingMessage("You already submitted a demo request in the last 10 days. Our representative will get back to you within 24 hours.");
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, "demo_requests"), {
        uid: auth.currentUser.uid,
        status: "new",
        submittedAt: serverTimestamp(),
        roleTitle: data.roleTitle,
        teamSize: data.teamSize,
        useCasePainPoints: data.useCasePainPoints,
        preferredLanguages: data.preferredLanguages,
        profileSnapshot: profile,
        source: "website_book_demo",
      });

      await sendDemoRequestEmail({ data: { email: profile.email, name: profile.name || "there" } }).catch(() => {
        // Do not block successful request submission if email fails.
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Could not submit your demo request right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  });

  const toggleLanguage = (lang: (typeof LANGUAGE_OPTIONS)[number]) => {
    const next = selectedLanguages.includes(lang)
      ? selectedLanguages.filter((l) => l !== lang)
      : [...selectedLanguages, lang];
    setValue("preferredLanguages", next, { shouldValidate: true });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <TopBanner />
      <SiteNav />
      <div className="flex flex-1 items-start justify-center bg-[#faf7f2] px-6 pb-12 pt-10">
        <div className="w-full max-w-3xl rounded-2xl border border-border bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="font-display text-4xl text-ink">Book a Demo</h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Share a few details and our representative will get back to you within 24 hours.
            </p>
          </div>

          {!canRenderForm && !submitted && (
            <p className="text-sm text-muted-foreground">Loading your profile...</p>
          )}

          {submitted && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Request received</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Thanks. Our representative will get back to you within 24 hours with demo scheduling details.
              </p>
              <Link to="/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Back to Home <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {!submitted && canRenderForm && (
            <form onSubmit={onSubmit} className="space-y-5">
              {(() => {
                const profileData = profile!;
                return (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Info label="Name" value={profileData.name} />
                    <Info label="Email" value={profileData.email} />
                    <Info label="Phone" value={profileData.phone} />
                    <Info label="Company" value={profileData.companyName} />
                  </div>
                );
              })()}

              <Field label="Role / Title" error={errors.roleTitle?.message}>
                <input {...register("roleTitle")} className={inputCls} placeholder="Founder, Ops Manager, Sales Lead..." />
              </Field>

              <Field label="Team size" error={errors.teamSize?.message}>
                <input {...register("teamSize")} className={inputCls} placeholder="e.g. 5-10, 20, 50+" />
              </Field>

              <Field label="Use case / pain points" error={errors.useCasePainPoints?.message}>
                <textarea {...register("useCasePainPoints")} className={`${inputCls} min-h-28 resize-y`} placeholder="Tell us what you want to automate and key challenges today." />
              </Field>

              <div>
                <label className="mb-1.5 block text-[15px] font-medium text-foreground">Preferred languages</label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {LANGUAGE_OPTIONS.map((lang) => {
                    const active = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`rounded-xl border px-3 py-2 text-sm transition ${
                          active ? "border-primary bg-primary/10 text-primary" : "border-border bg-white text-foreground hover:bg-secondary"
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
                {errors.preferredLanguages && <p className="mt-1 text-[13px] text-red-500">{errors.preferredLanguages.message}</p>}
              </div>

              {pendingMessage && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">{pendingMessage}</div>
              )}
              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{submitError}</div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Request"} {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground">{value || "-"}</div>
    </div>
  );
}

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
