import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  Building2,
  Hotel,
  Users,
  Truck,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import logo from "@/assets/Khyra.svg";

export function TopBanner() {
  return (
    <div className="w-full bg-primary py-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-primary-foreground">
      Answers That Act — Operational AI for Conversation-Driven Workflows
    </div>
  );
}

const INDUSTRIES_NAV = [
  { label: "Healthcare & Clinics", slug: "healthcare", Icon: Stethoscope, color: "#16a34a" },
  { label: "Hotels & Hospitality", slug: "hotels-hospitality", Icon: Hotel, color: "#d97706" },
  { label: "Real Estate & Property", slug: "real-estate", Icon: Building2, color: "#1d4ed8" },
  { label: "Professional Services", slug: "professional-services", Icon: Users, color: "#8b5cf6" },
  { label: "Field & Home Services", slug: "field-services", Icon: Truck, color: "#0ea5e9" },
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
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
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
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const pathname = location.pathname;
  const isIndustryPage = pathname.startsWith("/industries/") && pathname !== "/industries";
  const isHomePage = pathname === "/";

  // Context-aware navigation link resolver
  const getNavLinks = () => {
    if (isIndustryPage) {
      return {
        workflows: { href: "#workflow", label: "Workflows" },
        roles: { href: "#capabilities", label: "Operational Roles" },
        integrations: { href: "#integrations", label: "Integrations" },
        deployment: { href: "#deployment", label: "Deployment" },
        faq: { href: "#faq", label: "FAQ" },
      };
    }
    if (isHomePage) {
      return {
        workflows: { href: "#workflow-engine", label: "Execution Engine" },
        roles: { href: "#roles", label: "Operational Roles" },
        integrations: { href: "#features", label: "Integrations & Platform" },
        deployment: { href: "#how-it-works", label: "Implementation" },
        faq: { href: "#faq", label: "FAQ" },
      };
    }
    return {
      workflows: { href: "/#workflow-engine", label: "Execution Engine" },
      roles: { href: "/#roles", label: "Operational Roles" },
      integrations: { href: "/#features", label: "Integrations & Platform" },
      deployment: { href: "/#how-it-works", label: "Implementation" },
      faq: { href: "/#faq", label: "FAQ" },
    };
  };

  const navLinks = getNavLinks();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary/5 bg-background/85 backdrop-blur-xl">
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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/75 lg:flex">
          <a
            href={navLinks.workflows.href}
            onClick={(e) => {
              if (navLinks.workflows.href.startsWith("#")) {
                e.preventDefault();
                handleNavClick(navLinks.workflows.href);
              }
            }}
            className="transition-colors hover:text-foreground"
          >
            {navLinks.workflows.label}
          </a>

          <a
            href={navLinks.roles.href}
            onClick={(e) => {
              if (navLinks.roles.href.startsWith("#")) {
                e.preventDefault();
                handleNavClick(navLinks.roles.href);
              }
            }}
            className="transition-colors hover:text-foreground"
          >
            {navLinks.roles.label}
          </a>

          {/* Industries dropdown */}
          <Dropdown label="Target Industries">
            <div className="w-80 p-3">
              <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Core Industry Verticals
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
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5"
                  >
                    View all vertical architectures <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Dropdown>

          <a
            href={navLinks.integrations.href}
            onClick={(e) => {
              if (navLinks.integrations.href.startsWith("#")) {
                e.preventDefault();
                handleNavClick(navLinks.integrations.href);
              }
            }}
            className="transition-colors hover:text-foreground"
          >
            {navLinks.integrations.label}
          </a>

          <a
            href={navLinks.deployment.href}
            onClick={(e) => {
              if (navLinks.deployment.href.startsWith("#")) {
                e.preventDefault();
                handleNavClick(navLinks.deployment.href);
              }
            }}
            className="transition-colors hover:text-foreground"
          >
            {navLinks.deployment.label}
          </a>

          <a
            href={navLinks.faq.href}
            onClick={(e) => {
              if (navLinks.faq.href.startsWith("#")) {
                e.preventDefault();
                handleNavClick(navLinks.faq.href);
              }
            }}
            className="transition-colors hover:text-foreground"
          >
            {navLinks.faq.label}
          </a>
        </nav>

        {/* Right CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-foreground/70 lg:inline">
                Hi, {user.displayName?.split(" ")[0] ?? "there"}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary active:scale-[0.97]"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs sm:text-sm sm:px-5 sm:py-2.5 font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.97]"
            >
              Schedule a Demo <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
            </Link>
          )}

          {/* Hamburger Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 text-foreground transition hover:bg-secondary lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Functioning Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-border/80 bg-background/95 backdrop-blur-2xl shadow-2xl px-6 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 text-base font-medium text-ink hover:text-primary transition-colors"
            >
              <span>Overview / Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </Link>

            <a
              href={navLinks.workflows.href}
              onClick={(e) => {
                if (navLinks.workflows.href.startsWith("#")) {
                  e.preventDefault();
                  handleNavClick(navLinks.workflows.href);
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="flex items-center justify-between py-2.5 text-base font-medium text-ink hover:text-primary transition-colors"
            >
              <span>{navLinks.workflows.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </a>

            <a
              href={navLinks.roles.href}
              onClick={(e) => {
                if (navLinks.roles.href.startsWith("#")) {
                  e.preventDefault();
                  handleNavClick(navLinks.roles.href);
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="flex items-center justify-between py-2.5 text-base font-medium text-ink hover:text-primary transition-colors"
            >
              <span>{navLinks.roles.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </a>

            {/* Target Industries Accordion on Mobile */}
            <div className="py-2 border-y border-border/50">
              <button
                type="button"
                onClick={() => setMobileIndustriesOpen((v) => !v)}
                className="flex w-full items-center justify-between py-1 text-base font-medium text-ink hover:text-primary transition-colors"
              >
                <span>Target Industries</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    mobileIndustriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileIndustriesOpen && (
                <div className="mt-2 space-y-1 pl-2">
                  {INDUSTRIES_NAV.map(({ label, slug, Icon, color }) => (
                    <Link
                      key={slug}
                      to={`/industries/${slug}` as any}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-ink transition-colors"
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                        style={{ background: `${color}18` }}
                      >
                        <Icon className="h-3 w-3" style={{ color }} />
                      </span>
                      <span>{label}</span>
                    </Link>
                  ))}
                  <Link
                    to="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 pt-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>Explore all vertical architectures</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>

            <a
              href={navLinks.integrations.href}
              onClick={(e) => {
                if (navLinks.integrations.href.startsWith("#")) {
                  e.preventDefault();
                  handleNavClick(navLinks.integrations.href);
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="flex items-center justify-between py-2.5 text-base font-medium text-ink hover:text-primary transition-colors"
            >
              <span>{navLinks.integrations.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </a>

            <a
              href={navLinks.deployment.href}
              onClick={(e) => {
                if (navLinks.deployment.href.startsWith("#")) {
                  e.preventDefault();
                  handleNavClick(navLinks.deployment.href);
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="flex items-center justify-between py-2.5 text-base font-medium text-ink hover:text-primary transition-colors"
            >
              <span>{navLinks.deployment.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </a>

            <a
              href={navLinks.faq.href}
              onClick={(e) => {
                if (navLinks.faq.href.startsWith("#")) {
                  e.preventDefault();
                  handleNavClick(navLinks.faq.href);
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="flex items-center justify-between py-2.5 text-base font-medium text-ink hover:text-primary transition-colors"
            >
              <span>{navLinks.faq.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
            </a>
          </nav>

          <div className="pt-3 border-t border-border/70">
            <Link
              to="/book-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90"
            >
              <span>Schedule a Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
