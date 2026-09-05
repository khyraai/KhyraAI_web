import { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Pause, Play, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const MOBILE_SCREENS = [
  {
    id: "patients-list",
    title: "Patient Directory & Search",
    subtitle: "Real-time EHR database lookup",
    desc: "Khyra searches existing patients by phone number (+91 98765 43210) before every booking, preventing duplicate patient profiles.",
    image: "/images/healthcare-app/screen-1.jpg",
    fallbackImage: "/images/healthcare-app/patients-list.png",
    badge: "Directory Sync",
    features: [
      "Instant phone number search & patient matching",
      "Tracks total patient visits & last visit date",
      "Direct integration with clinic management database",
    ],
  },
  {
    id: "create-appointment",
    title: "1-Click Appointment Locking",
    subtitle: "Automated booking & doctor assignment",
    desc: "When a patient calls, Khyra automatically fills out patient details, locks available time slots (03:30 PM), assigns the doctor, and sends SMS confirmations.",
    image: "/images/healthcare-app/screen-4.jpg",
    fallbackImage: "/images/healthcare-app/create-appointment.png",
    badge: "Booking Engine",
    features: [
      "Doctor assignment (e.g., Dr. Naga Deepti) & treatment selection",
      "Live slot locking prevents double bookings",
      "Automated DLT SMS confirmation to patient",
    ],
  },
  {
    id: "patient-history",
    title: "Patient Visit & Billing Timeline",
    subtitle: "Complete medical audit trail",
    desc: "Every completed call and procedure is automatically logged into the patient's timeline, including procedure fees (Root Canal ₹3,500) and payment status.",
    image: "/images/healthcare-app/screen-2.jpg",
    fallbackImage: "/images/healthcare-app/patient-history.png",
    badge: "Medical Timeline",
    features: [
      "Timelines for Today, Yesterday, and past visits",
      "Fee status tracking (Paid / Pending)",
      "Prescription and follow-up date logging",
    ],
  },
  {
    id: "patient-details",
    title: "Detailed EHR & Health Files",
    subtitle: "Comprehensive patient health profiles",
    desc: "Access complete patient profiles including DOB, Blood Group, Address, and past procedures (Root Canal, Tooth Extraction) updated automatically.",
    image: "/images/healthcare-app/screen-3.jpg",
    fallbackImage: "/images/healthcare-app/patient-details.png",
    badge: "EHR Record Sync",
    features: [
      "Blood group, address, and emergency contact storage",
      "Categorized treatment history (Hygiene, Emergency, Consult)",
      "Zero manual data entry for front desk staff",
    ],
  },
];

export function MobileAppShowcase({ accentHex = "#16a34a" }: { accentHex?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const reveal = useScrollReveal();

  // Auto-rotation timer (4.5s)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % MOBILE_SCREENS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = MOBILE_SCREENS[activeTab];

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-24 border-t border-border/60 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      {/* Header */}
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="section-label" style={{ color: accentHex }}>
              Mobile Clinic Software Sync
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Mobile App Mockups
            </span>
          </div>
          <h2 className="font-display text-3xl text-ink md:text-5xl leading-tight">
            Synced directly to your <span className="italic text-primary">Clinic Mobile App</span>.
          </h2>
        </div>
        
        {/* Play / Pause Auto-Rotate Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-secondary hover:text-ink"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-emerald-600" />
                <span>Auto-rotating</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-primary" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slide Progress Bar Indicator */}
      <div className="mb-12 grid grid-cols-4 gap-3">
        {MOBILE_SCREENS.map((sc, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveTab(idx);
                setIsPlaying(false);
              }}
              className="group text-left space-y-2 focus:outline-none"
            >
              <div className="relative h-1 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                  style={{ backgroundColor: accentHex }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-mono ${isActive ? "font-bold text-ink" : "text-muted-foreground"}`}>
                  0{idx + 1}
                </span>
                <span className={`hidden sm:inline text-[11px] truncate max-w-[120px] ${isActive ? "font-semibold text-ink" : "text-muted-foreground/70"}`}>
                  {sc.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Sequential Animated Feature Points (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            {current.badge}
          </div>

          <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight">
            {current.title}
          </h3>

          <p className="text-base leading-relaxed text-muted-foreground">
            {current.desc}
          </p>

          {/* Points Revealed One by One */}
          <div className="space-y-4 pt-6 border-t border-border/60">
            {current.features.map((feat, fIdx) => (
              <div
                key={feat}
                style={{
                  transitionDelay: `${fIdx * 150}ms`,
                }}
                className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/40 bg-background/80 shadow-sm transition-all duration-500"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 pt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-ink tracking-tight block">
                    {feat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Realistic iPhone Mobile Mockup Frame (6 cols) */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            className="relative w-full max-w-[340px] sm:max-w-[360px]"
          >
            {/* iPhone Device Shell */}
            <div className="relative rounded-[48px] border-[10px] border-zinc-900 bg-zinc-900 shadow-2xl p-2 ring-1 ring-white/10">
              {/* Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 h-5 w-24 rounded-full bg-black flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-900/80 mr-3" />
                <div className="h-2 w-2 rounded-full bg-indigo-900/60" />
              </div>

              {/* Mobile Screen Display Viewport */}
              <div className="relative overflow-hidden rounded-[38px] bg-background aspect-[9/19.5] shadow-inner">
                <img
                  key={current.id}
                  src={imgError[activeTab] ? current.fallbackImage : current.image}
                  onError={() => setImgError((prev) => ({ ...prev, [activeTab]: true }))}
                  alt={current.title}
                  className="w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out"
                />

                {/* Subtle Glass Highlight */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
              </div>

              {/* Phone Home Bar Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-1 w-32 rounded-full bg-white/30" />
            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 z-20 rounded-2xl border border-border/80 bg-background/95 p-4 shadow-2xl backdrop-blur-xl max-w-[220px]">
              <div className="flex items-center gap-2 text-xs font-bold text-ink">
                <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" />
                <span>Khyra EHR Sync</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground leading-tight">
                Live mobile clinic records updated automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
