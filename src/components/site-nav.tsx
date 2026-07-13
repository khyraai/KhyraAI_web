import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import logo from "@/assets/Khyra.svg";

export function TopBanner() {
  return (
    <div className="w-full bg-primary py-2 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground">
      Answers That Act
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
            width="36"
            height="36"
            className="h-9 w-9 rounded-full border border-primary/70 object-contain transition-colors group-hover:bg-primary"
          />
          <span className="font-display text-2xl leading-none tracking-tight">
            Khyra AI
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-foreground/70 md:flex">
          <a href="/#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="/#use-cases" className="transition-colors hover:text-foreground">
            Use cases
          </a>
          {/* <a href="/#compare" className="transition-colors hover:text-foreground">
            Compare
          </a>
          <a href="/#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a> */}
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
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.97]"
            >
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
