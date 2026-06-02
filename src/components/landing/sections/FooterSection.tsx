import logo from "@/assets/Khyra.svg";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function FooterSection() {
  const reveal = useScrollReveal();

  return (
    <footer
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="border-t border-primary/30 bg-primary opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-primary-foreground">
              <img
                src={logo}
                alt="Khyra AI logo"
                className="h-9 w-9 rounded-full border border-primary-foreground/30 object-contain"
              />
              <span className="font-display text-2xl">Khyra AI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-primary-foreground/70">
              AI voice agents for Indian businesses. Multilingual, always-on, deployable in hours.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-primary-foreground/60">Product</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#features" className="text-primary-foreground hover:text-white transition-colors cursor-pointer">
                  Features
                </a>
              </li>
              <li>
                <a href="#use-cases" className="text-primary-foreground hover:text-white transition-colors cursor-pointer">
                  Use cases
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-primary-foreground/60">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:hello@khyraai.com" className="text-primary-foreground hover:text-white transition-colors cursor-pointer">
                  hello@khyraai.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/9480007233" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-white transition-colors cursor-pointer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/khyra-ai/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-white transition-colors cursor-pointer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60">
          <div>© 2026 Khyra AI. Built in India for Indian businesses.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
