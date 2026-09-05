import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Stethoscope, Building2, Sparkles, Hotel, PawPrint, GraduationCap, Server } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import logo from "@/assets/Khyra.svg";

export function TopBanner() {
  return (
    <div className="w-full bg-primary py-2 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground">
      Answers That Act
    </div>
  );
}

const INDUSTRIES_NAV = [
  { label: "Healthcare & Clinics", slug: "healthcare", Icon: Stethoscope, color: "#22c55e" },
  { label: "Real Estate", slug: "real-estate", Icon: Building2, color: "#1d4ed8" },
  { label: "Salons & Wellness", slug: "salons-wellness", Icon: Sparkles, color: "#ec4899" },
  { label: "Hotels & Hospitality", slug: "hotels-hospitality", Icon: Hotel, color: "#f59e0b" },
  { label: "Veterinary", slug: "veterinary", Icon: PawPrint, color: "#0f9b8e" },
  { label: "Education", slug: "education", Icon: GraduationCap, color: "#4f46e5" },
  { label: "Cosmetic Clinics", slug: "cosmetic-clinics", Icon: Sparkles, color: "#9333ea" },
];

function Dropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute left-0 top-full z-50 mt-3 rounded-2xl border border-border bg-background shadow-xl shadow-black/10 ring-1 ring-black/5"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function SiteNav() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5 text-primary">
          <img
            src={logo}
            alt="Khyra AI logo"
            className="h-9 w-9 rounded-full border border-primary/70 object-contain transition-colors group-hover:bg-primary"
          />
          <span className="font-display text-2xl leading-none tracking-tight">
            Khyra AI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
          {/* Industries dropdown */}
          <Dropdown label="Industries">
            <div className="w-80 p-3">
              <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                All Verticals
              </div>
              <div className="grid grid-cols-1 gap-0.5">
                {INDUSTRIES_NAV.map(({ label, slug, Icon, color }) => (
                  <Link
                    key={slug}
                    to={`/industries/${slug}` as any}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-secondary group"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${color}18` }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color }} />
                    </span>
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                      {label}
                    </span>
                  </Link>
                ))}
                <div className="mt-1 border-t border-border pt-1">
                  <Link
                    to="/industries"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
                  >
                    View all 7 verticals <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Dropdown>

          <a href="/#how-it-works" className="transition-colors hover:text-foreground">
            How It Works
          </a>

          <a href="/#features" className="transition-colors hover:text-foreground">
            Features
          </a>

          <a href="/#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-foreground/70 lg:inline">
                Hi, {user.displayName?.split(" ")[0] ?? "there"}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary active:scale-[0.97]"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.97]"
            >
              Book a demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
