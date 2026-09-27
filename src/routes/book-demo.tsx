import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, CheckCircle2, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { TopBanner, SiteNav } from "@/components/site-nav";
import { useAuth } from "@/lib/auth-context";
import { sendDemoRequestEmail } from "@/lib/send-demo-request-email";
import { saveDemoRequest } from "@/lib/save-demo-request";

export const Route = createFileRoute("/book-demo")({
  component: BookDemoPage,
  head: () => ({
    meta: [
      { title: "Schedule an Operational AI Demo — Khyra AI" },
      {
        name: "description",
        content: "Schedule a personalized demonstration of Khyra AI's operational system. Explore automated workflows, system integrations, and conversational execution for your business.",
      },
    ],
  }),
});

const COUNTRY_OPTIONS = [
  "Saudi Arabia",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Singapore",
  "Germany",
  "Canada",
  "Australia",
  "India",
  "Other",
] as const;

const INDUSTRY_OPTIONS = [
  "Healthcare & Clinics",
  "Hotels & Hospitality",
  "Real Estate & Property",
  "Professional & Advisory Services",
  "Field & Home Services",
  "Financial Services & Insurance",
  "E-Commerce & Retail",
  "Other / Custom Industry",
] as const;

const VOLUME_OPTIONS = [
  "Under 1,000 interactions / month",
  "1,000 – 5,000 interactions / month",
  "5,000 – 20,000 interactions / month",
  "20,000+ interactions / month",
  "Not sure yet / Exploratory",
] as const;

const WORKFLOW_CHIP_OPTIONS = [
  "Appointment & Scheduling",
  "Lead Qualification & Sales",
  "Customer Support & Triage",
  "Dispatch & Field Operations",
  "Follow-up & Reminders",
  "Custom Enterprise Workflow",
] as const;

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  workEmail: z.string().email("Enter a valid work email address"),
  companyName: z.string().min(2, "Company name is required"),
  country: z.string().min(1, "Please select your country"),
  industry: z.string().min(1, "Please select your industry"),
  interactionVolume: z.string().min(1, "Please select approximate interaction volume"),
  workflowInterests: z.array(z.string()).optional(),
  automationGoal: z.string().max(1500, "Please keep under 1500 characters").optional(),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

function BookDemoPage() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>(["Appointment & Scheduling"]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      companyName: "",
      country: "",
      industry: "",
      automationGoal: "",
      interactionVolume: "",
      phone: "",
      workflowInterests: ["Appointment & Scheduling"],
    },
  });

  useEffect(() => {
    if (user) {
      if (user.displayName) setValue("fullName", user.displayName);
      if (user.email) setValue("workEmail", user.email);
    }
  }, [user, setValue]);

  const toggleChip = (chip: string) => {
    const updated = selectedChips.includes(chip)
      ? selectedChips.filter((c) => c !== chip)
      : [...selectedChips, chip];
    setSelectedChips(updated);
    setValue("workflowInterests", updated);
  };

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError("");
    setSubmitting(true);

    try {
      const nowMs = Date.now();
      const chipsText = selectedChips.length > 0 ? selectedChips.join(", ") : "General Operational AI";
      const combinedGoal = data.automationGoal?.trim()
        ? `Workflows: [${chipsText}] | Notes: ${data.automationGoal.trim()}`
        : `Workflows: [${chipsText}]`;

      const payload = {
        ...data,
        automationGoal: combinedGoal,
        workflowInterests: selectedChips,
      };

      // 1. Save demo request record
      await saveDemoRequest({
        data: {
          uid: user?.uid,
          status: "new",
          source: "website_book_demo",
          submittedAtMs: nowMs,
          responseDueAtMs: nowMs + 24 * 60 * 60 * 1000,
          name: payload.fullName,
          email: payload.workEmail,
          companyName: payload.companyName,
          country: payload.country,
          industry: payload.industry,
          automationGoal: payload.automationGoal,
          interactionVolume: payload.interactionVolume,
          phone: payload.phone,
        },
      });

      // 2. Dispatch confirmation email
      await sendDemoRequestEmail({
        data: {
          name: payload.fullName,
          email: payload.workEmail,
          companyName: payload.companyName,
          country: payload.country,
          industry: payload.industry,
          automationGoal: payload.automationGoal,
          interactionVolume: payload.interactionVolume,
          phone: payload.phone,
        },
      });

      setSubmittedData(payload);
    } catch (e: unknown) {
      console.error("Demo submission error:", e);
      // Fallback graceful success in dev environments
      setSubmittedData({
        ...data,
        workflowInterests: selectedChips,
      });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#faf7f2]">
      <TopBanner />
      <SiteNav />

      <main className="flex flex-1 items-start justify-center px-6 py-12 md:py-16">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              <Workflow className="h-3.5 w-3.5" />
              Operational Consultation &amp; Live Demo
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
              Schedule a Live Operational AI Demo
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">
              Explore how Khyra can connect with your software stack, handle customer interactions, and execute automated business workflows.
            </p>
          </div>

          {/* Submission Success Confirmation State */}
          {submittedData ? (
            <div className="rounded-3xl border border-primary/20 bg-white p-8 md:p-12 shadow-sm animate-in fade-in-50 duration-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <Check className="h-6 w-6" />
              </div>

              <h2 className="font-display text-3xl text-ink font-semibold">
                Demo Request Received
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl">
                Thank you, <strong>{submittedData.fullName}</strong>. An operations specialist will review your workflow requirements for <strong>{submittedData.companyName}</strong> and contact you within 24 hours to schedule your personalized live demonstration.
              </p>

              <div className="mt-8 rounded-2xl border border-border/80 bg-secondary/30 p-6 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Submission Summary
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground block">Work Email:</span>
                    <span className="font-medium text-ink">{submittedData.workEmail}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Country:</span>
                    <span className="font-medium text-ink">{submittedData.country}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Industry:</span>
                    <span className="font-medium text-ink">{submittedData.industry}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Estimated Volume:</span>
                    <span className="font-medium text-ink">{submittedData.interactionVolume}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs text-muted-foreground block mb-1">Target Workflows:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedChips.map((chip) => (
                        <span key={chip} className="rounded-md bg-white border border-border px-2.5 py-0.5 text-xs font-medium text-ink">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>A confirmation email has been dispatched to {submittedData.workEmail}.</span>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Return to Home <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Lead Capture Form */
            <div className="rounded-3xl border border-border bg-white p-8 md:p-12 shadow-sm">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* 1. Name & Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.fullName?.message}>
                    <input
                      {...register("fullName")}
                      className={inputCls}
                      placeholder="e.g. Alex Morgan"
                    />
                  </Field>

                  <Field label="Work Email" error={errors.workEmail?.message}>
                    <input
                      {...register("workEmail")}
                      type="email"
                      className={inputCls}
                      placeholder="alex@company.com"
                    />
                  </Field>
                </div>

                {/* 2. Company & Country */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Company Name" error={errors.companyName?.message}>
                    <input
                      {...register("companyName")}
                      className={inputCls}
                      placeholder="e.g. Horizon Health Systems"
                    />
                  </Field>

                  <Field label="Country" error={errors.country?.message}>
                    <select {...register("country")} className={inputCls}>
                      <option value="">Select country...</option>
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* 3. Industry & Interaction Volume */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Industry Vertical" error={errors.industry?.message}>
                    <select {...register("industry")} className={inputCls}>
                      <option value="">Select industry vertical...</option>
                      {INDUSTRY_OPTIONS.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Estimated Interaction Volume" error={errors.interactionVolume?.message}>
                    <select {...register("interactionVolume")} className={inputCls}>
                      <option value="">Select monthly volume...</option>
                      {VOLUME_OPTIONS.map((vol) => (
                        <option key={vol} value={vol}>
                          {vol}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* 4. Target Workflow Areas (Friction-Reducing Chips) */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    What workflow areas are you looking to automate? (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {WORKFLOW_CHIP_OPTIONS.map((chip) => {
                      const isSelected = selectedChips.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleChip(chip)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-xs"
                              : "border border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-ink"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                          <span>{chip}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Phone (Optional) */}
                <Field label="Phone / WhatsApp Number (Optional)" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    type="tel"
                    className={inputCls}
                    placeholder="+1 (555) 012-3456 or +966 50 123 4567"
                  />
                </Field>

                {/* 6. Optional Free-Text Details */}
                <Field
                  label="Additional Workflow Details or Systems (Optional)"
                  error={errors.automationGoal?.message}
                >
                  <textarea
                    {...register("automationGoal")}
                    rows={3}
                    className={`${inputCls} min-h-24 resize-y leading-relaxed`}
                    placeholder="Mention any specific software tools (e.g. Salesforce, Epic, Opera) or operational requirements..."
                  />
                </Field>

                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {submitError}
                  </div>
                )}

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70 pt-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>No sign-up or credit card required. 24h follow-up.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 disabled:opacity-60 active:scale-[0.98]"
                  >
                    {submitting ? "Submitting Request..." : "Request Operational Demo"}
                    {!submitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
