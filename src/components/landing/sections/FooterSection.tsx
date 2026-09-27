import { Link } from "@tanstack/react-router";
import logo from "@/assets/Khyra.svg";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function FooterSection() {
  const reveal = useScrollReveal();

  return (
    <footer
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="border-t border-primary/20 bg-primary opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-primary-foreground">
              <img
                src={logo}
                alt="Khyra AI logo"
                className="h-9 w-9 rounded-full border border-primary-foreground/30 object-contain"
              />
              <span className="font-display text-2xl font-bold tracking-tight">Khyra AI</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
              The operational AI system for conversation-driven business workflows. Khyra interacts with customers, reasons within defined rules, and executes work directly inside your existing business systems.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary-foreground/60">
              Platform & Solution
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li>
                <a href="/#workflow-engine" className="hover:text-primary-foreground transition-colors">
                  Execution Engine
                </a>
              </li>
              <li>
                <a href="/#roles" className="hover:text-primary-foreground transition-colors">
                  Operational Roles
                </a>
              </li>
              <li>
                <a href="/#industries" className="hover:text-primary-foreground transition-colors">
                  Target Industries
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-primary-foreground transition-colors">
                  System Integrations
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-primary-foreground transition-colors">
                  Implementation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary-foreground/60">
              Industries
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li>
                <Link to="/industries/healthcare" className="hover:text-primary-foreground transition-colors">
                  Healthcare & Clinics
                </Link>
              </li>
              <li>
                <Link to="/industries/hotels-hospitality" className="hover:text-primary-foreground transition-colors">
                  Hotels & Hospitality
                </Link>
              </li>
              <li>
                <Link to="/industries/real-estate" className="hover:text-primary-foreground transition-colors">
                  Real Estate & Property
                </Link>
              </li>
              <li>
                <Link to="/industries/professional-services" className="hover:text-primary-foreground transition-colors">
                  Professional Services
                </Link>
              </li>
              <li>
                <Link to="/industries/field-services" className="hover:text-primary-foreground transition-colors">
                  Field &amp; Home Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-primary-foreground transition-colors font-medium text-primary-foreground">
                  View All Verticals →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-primary-foreground/60">
              Company & Contact
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li>
                <Link to="/book-demo" className="hover:text-primary-foreground transition-colors font-semibold">
                  Schedule a Demo
                </Link>
              </li>
              <li>
                <a href="mailto:hello@khyraai.com" className="hover:text-primary-foreground transition-colors">
                  hello@khyraai.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/khyra-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-primary-foreground transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/65">
          <div>© 2026 Khyra AI. Global product, adaptable deployment.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
