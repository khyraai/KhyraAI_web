import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-D55qtpW9.mjs";
import { l as logo } from "./Khyra-di50hbBa.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__firestore.mjs";
import { a as ArrowRight, d as Mic, A as Activity, j as Stethoscope, c as Hotel, B as Building2, S as Server, i as Sparkles, P as PawPrint, f as Phone, T as Target, k as Wrench, G as Globe, Z as Zap, H as Headphones, W as Workflow, h as ShieldCheck, C as Check, e as Minus, g as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "path";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/@protobufjs/inquire.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
const mascot = "/assets/khyra-mascot-S12TyQ5J.png";
function useScrollReveal(options) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (visible) return;
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
        ...options
      }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [options, visible]);
  return { ref, visible };
}
function TopBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-primary py-2 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground", children: "Answers That Act" });
}
function Nav() {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 border-b border-primary/5 bg-background/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "group flex items-center gap-2.5 text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Khyra AI logo", className: "h-9 w-9 rounded-full border border-primary/70 object-contain transition-colors group-hover:bg-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl leading-none tracking-tight", children: "Khyra AI" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-10 text-sm font-medium text-foreground/70 md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "transition-colors hover:text-foreground", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#use-cases", className: "transition-colors hover:text-foreground", children: "Use cases" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#compare", className: "transition-colors hover:text-foreground", children: "Compare" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#pricing", className: "transition-colors hover:text-foreground", children: "Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#faq", className: "transition-colors hover:text-foreground", children: "FAQ" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#demo", className: "hidden text-sm font-medium text-foreground/70 decoration-saffron underline-offset-4 transition hover:text-foreground hover:underline lg:inline", children: "Hear it live" }),
      user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden text-sm font-medium text-foreground/70 lg:inline", children: [
          "Hi, ",
          user.displayName?.split(" ")[0] ?? "there"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSignOut, className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary active:scale-[0.97]", children: "Sign out" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "hidden text-sm font-medium text-foreground/70 underline-offset-4 transition hover:text-foreground hover:underline lg:inline", children: "Sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/signup", className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.97]", children: [
          "Get started ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ] })
      ] })
    ] })
  ] }) });
}
function Hero() {
  const reveal = useScrollReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: reveal.ref, "data-visible": reveal.visible, id: "top", className: "relative overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid opacity-[0.35]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", style: {
      backgroundImage: "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 65%, transparent), transparent 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6 pt-24 pb-12 md:pt-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-saffron" })
          ] }),
          "Built in India · 11 Indian languages"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-6xl leading-[1.02] text-balance text-ink md:text-8xl", children: [
          "Your customers called.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary/90", children: "Khyra already answered." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mx-auto mt-8 max-w-2xl text-balance text-lg font-light leading-relaxed text-muted-foreground md:text-xl", children: [
          "AI voice agents that handle front desk, sales follow-up and Tier-1 support — in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-foreground", children: "11 Indian languages" }),
          ", with sub-second response time."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#demo", className: "group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-semibold text-primary-foreground shadow-xl shadow-primary/15 transition-all hover:shadow-2xl hover:shadow-primary/25 active:scale-[0.98]", children: [
            "Book a live demo",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#demo", className: "inline-flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-4 text-[15px] font-semibold text-foreground transition hover:bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-4 w-4 opacity-70" }),
            " Hear it live"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-20 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-4xl border border-primary/10 bg-background/90 p-3 shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--primary)_28%,transparent)] backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.6rem] bg-beige/40 p-6 md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-saffron" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium uppercase tracking-wider text-foreground/50", children: "Live call · Khyra Front Desk" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-foreground/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "EN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "HI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "KN" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bubble, { who: "caller", children: "नमस्ते, क्या मैं कल शाम का appointment book कर सकती हूँ?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bubble, { who: "khyra", children: "बिल्कुल। Dr. Mehta के साथ कल 6:30 PM का slot available है — confirm कर दूँ?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bubble, { who: "caller", children: "Haan, please confirm." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bubble, { who: "khyra", children: "Done. Confirmation SMS भेज दिया है. कुछ और मदद चाहिए?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 text-primary" }),
            " Latency · 612ms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Intent: Book appointment · ✓ Calendar updated · ✓ SMS sent" })
        ] })
      ] }) }) })
    ] })
  ] });
}
function Bubble({
  who,
  children
}) {
  const isKhyra = who === "khyra";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${isKhyra ? "justify-start" : "justify-end"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${isKhyra ? "bg-primary text-primary-foreground rounded-bl-sm" : "bg-background border border-border rounded-br-sm"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mb-0.5 text-[10px] uppercase tracking-wider ${isKhyra ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: isKhyra ? "Khyra" : "Caller" }),
    children
  ] }) });
}
function Trust() {
  const reveal = useScrollReveal();
  const industries = [{
    i: Stethoscope,
    l: "Healthcare"
  }, {
    i: Hotel,
    l: "Hospitality"
  }, {
    i: Building2,
    l: "Real Estate"
  }, {
    i: Server,
    l: "IT Services"
  }, {
    i: Sparkles,
    l: "Wellness"
  }, {
    i: PawPrint,
    l: "Veterinary"
  }];
  const stats = [{
    k: "11+",
    v: "Indian languages"
  }, {
    k: "<800ms",
    v: "Avg response latency"
  }, {
    k: "99.9%",
    v: "Uptime SLA"
  }, {
    k: "24×7",
    v: "No breaks. No sick days."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: reveal.ref, "data-visible": reveal.visible, className: "border-y border-border bg-secondary/60 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Trusted across industries" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground", children: industries.map(({
      i: Icon,
      l
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
      " ",
      l
    ] }, l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-primary md:text-4xl", children: s.k }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: s.v })
    ] }, s.v)) })
  ] }) });
}
function Pillars() {
  const reveal = useScrollReveal();
  const pillars = [{
    i: Phone,
    t: "Front Desk Agent",
    d: "Answers calls, books appointments, handles cancellations — around the clock."
  }, {
    i: Target,
    t: "Lead Follow-Up Agent",
    d: "Calls back warm leads, qualifies prospects, and schedules meetings automatically."
  }, {
    i: Wrench,
    t: "Support Line Agent",
    d: "Resolves Tier-1 support tickets, resets access, and escalates intelligently."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: reveal.ref, "data-visible": reveal.visible, className: "mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-end gap-10 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "What is Khyra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl text-ink md:text-5xl", children: [
          "The voice layer for your",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "business operations" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Enterprise-grade AI voice agents built specifically for the Indian market. Replace or augment your front desk, sales callers and support teams — fluent in 11 Indian languages, integrated with your stack, live in hours." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-5 md:grid-cols-3", children: pillars.map(({
      i: Icon,
      t,
      d
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:border-primary/30 hover:shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-beige text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl text-ink", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: d }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "absolute right-6 top-7 h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" })
    ] }, t)) })
  ] });
}
function HowItWorks() {
  const reveal = useScrollReveal();
  const steps = [{
    n: "01",
    t: "Configure your agent",
    d: "Choose role, industry, voice persona and language. No code."
  }, {
    n: "02",
    t: "Connect your systems",
    d: "Plug in your phone number, calendar, CRM or helpdesk via webhook or API."
  }, {
    n: "03",
    t: "Go live",
    d: "Khyra starts answering calls immediately. Monitor every conversation in real time."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: reveal.ref, "data-visible": reveal.visible, className: "bg-beige/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl text-ink md:text-5xl", children: "From sign-up to live calls in hours." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-20 md:space-y-28", children: steps.map((s, i) => {
        const left = i % 2 === 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { "data-visible": reveal.visible, style: {
          transitionDelay: `${i * 120}ms`
        }, className: "relative grid grid-cols-2 gap-8 md:gap-16 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "absolute left-1/2 top-6 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-primary ring-8 ring-beige/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: left ? "pr-8 text-right md:pr-16" : "col-start-2 pl-8 md:pl-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-6xl leading-none text-primary/80 md:text-7xl", children: s.n }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold text-ink md:text-xl", children: s.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-[15px]", children: s.d }),
            left && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto mt-6 h-px w-16 bg-primary/30" }),
            !left && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-px w-16 bg-primary/30" })
          ] })
        ] }, s.n);
      }) })
    ] })
  ] }) });
}
function Features() {
  const reveal = useScrollReveal();
  const items = [{
    i: Globe,
    t: "11 Indian languages",
    d: "Hindi, English, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi, Odia."
  }, {
    i: Zap,
    t: "Sub-second latency",
    d: "Groq-powered LPU inference delivers end-to-end voice response under 800ms."
  }, {
    i: Headphones,
    t: "Natural voice personas",
    d: "Multiple male and female voices, tuned for Indian accents."
  }, {
    i: Activity,
    t: "Context-aware",
    d: "Remembers earlier turns in the call and responds intelligently."
  }, {
    i: Mic,
    t: "Live interruptions",
    d: "Callers can talk over the agent; it adapts in real time like a human."
  }, {
    i: Workflow,
    t: "Domain intelligence",
    d: "Pre-trained on 15+ verticals — not a generic chatbot you retrain."
  }, {
    i: ShieldCheck,
    t: "India data residency",
    d: "Hosted in India. Encrypted at rest and in transit. RBAC throughout."
  }, {
    i: Phone,
    t: "Telephony agnostic",
    d: "Works with your existing number via SIP / WebSocket bridge."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: reveal.ref, "data-visible": reveal.visible, id: "features", className: "mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 flex flex-wrap items-end justify-between gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 max-w-2xl font-display text-4xl text-ink md:text-5xl", children: [
        "Built for India. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "Engineered for scale." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4", children: items.map(({
      i: Icon,
      t,
      d
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 font-medium text-ink", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: d })
    ] }, t)) })
  ] });
}
function UseCases() {
  const reveal = useScrollReveal();
  const tabs = {
    "Front Desk": [["Dental clinic", "Booking, rescheduling, FAQ on procedures and timings."], ["Veterinary", "Pet appointments, emergency triage routing, vaccination reminders."], ["Spa & salon", "Bookings, pricing queries, real-time slot availability."], ["Hotel & resort", "Reservations, room queries, check-in / check-out info."], ["Therapist & wellness", "Empathetic intake calls with full privacy."], ["Cosmetic clinic", "Consultation bookings, procedure FAQs, follow-ups."]],
    "Lead Follow-Up": [["Real estate", "Follow up on enquiries, qualify buyers, schedule site visits."], ["IT services", "Follow up RFQs, qualify scope, route to sales engineers."], ["Voice AI agency", "Pitch solutions, qualify prospects, book discovery calls."]],
    "Support Line": [["DevOps & infra", "Tier-1 incident intake, basic runbooks, on-call escalation."], ["Access management", "Password resets, account unlocks, 2FA issues — resolved."], ["SaaS support", "Answer FAQs, guide users, raise tickets for Tier-2."]]
  };
  const keys = Object.keys(tabs);
  const [active, setActive] = reactExports.useState(keys[0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: reveal.ref, "data-visible": reveal.visible, id: "use-cases", className: "mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Use cases" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl text-ink md:text-5xl", children: "One platform. Every conversation." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActive(k), className: `rounded-full border px-4 py-2 text-sm transition ${active === k ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground"}`, children: k }, k)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: tabs[active].map(([t, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 transition hover:border-primary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-ink", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: d })
    ] }, t)) })
  ] });
}
function Impact() {
  const reveal = useScrollReveal();
  const stats = [["60%", "Reduction in front desk staffing costs"], ["<800ms", "End-to-end voice latency"], ["11", "Indian languages supported"], ["99.9%", "Production uptime SLA"], ["15+", "Verticals out of the box"], ["100s", "Concurrent calls per deployment"]];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: reveal.ref, "data-visible": reveal.visible, className: "bg-primary text-primary-foreground opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] opacity-70", children: "Impact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl md:text-5xl", children: [
        "The numbers that",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", style: {
          color: "var(--beige-deep)"
        }, children: "matter" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3", children: stats.map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-primary-foreground/15 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl md:text-6xl", children: k }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm opacity-75", children: v })
    ] }, v)) })
  ] }) });
}
function Compare() {
  const reveal = useScrollReveal();
  const cols = ["Khyra AI", "VAPI", "Retell AI", "Telnyx", "Bland AI"];
  const rows = [["11 Indian languages", [true, false, false, false, false]], ["India-specific voices", [true, false, false, false, false]], ["15+ prebuilt verticals", [true, "Manual", "Manual", false, false]], ["Sub-800ms latency", [true, "Varies", "Varies", "Varies", "Varies"]], ["Front desk + sales + support", [true, "Build it", "Build it", false, "Build it"]], ["Indian telephony", [true, false, false, "Partial", false]], ["No-code config", [true, "Dev req.", "Partial", false, "Partial"]], ["Data residency in India", [true, false, false, false, false]], ["Pricing for Indian SMBs", [true, "USD only", "USD only", "USD only", "USD only"]]];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: reveal.ref, "data-visible": reveal.visible, id: "compare", className: "mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Comparison" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl text-ink md:text-5xl", children: [
        "Why teams choose ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "Khyra" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-beige/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-medium text-muted-foreground", children: "Feature" }),
        cols.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `px-6 py-4 font-medium ${i === 0 ? "text-primary" : "text-muted-foreground"}`, children: c }, c))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map(([feat, vals], ri) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: ri % 2 ? "bg-secondary/40" : "bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-ink", children: feat }),
        vals.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `px-6 py-4 ${i === 0 ? "bg-beige/30" : ""}`, children: v === true ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary" }) : v === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4 text-muted-foreground/50" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: v }) }, i))
      ] }, feat)) })
    ] }) }) })
  ] });
}
function WhyKhyra() {
  const reveal = useScrollReveal();
  const items = [{
    t: "India-first, not afterthought",
    d: "Built from day one for Indian accents, languages and workflows. Powered by Sarvam AI's STT/TTS."
  }, {
    t: "Deploy in hours, not months",
    d: "Agents pre-trained on your vertical. No data labelling. No six-month pilot."
  }, {
    t: "The full stack, not just an API",
    d: "Voice, brain, telephony, integrations and observability — one vendor, one contract."
  }, {
    t: "Priced for the Indian market",
    d: "INR pricing in tiers that make sense for a 3-clinic chain, not just Fortune 500."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: reveal.ref, "data-visible": reveal.visible, className: "bg-beige/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-4xl bg-linear-to-br from-beige-deep/30 to-transparent blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: mascot, alt: "Khyra AI mascot — friendly voice agent on a call", className: "relative mx-auto w-full max-w-md drop-shadow-2xl", loading: "lazy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-dot mt-2 text-center font-display text-xl italic text-primary", children: "Answers that act" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Why Khyra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl text-ink md:text-5xl", children: [
        "Built in India. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "Built for India." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-10 divide-y divide-primary/10 border-y border-primary/10", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group flex gap-6 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl leading-none text-primary/50 tabular-nums", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-ink", children: it.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: it.d })
        ] })
      ] }, it.t)) })
    ] })
  ] }) });
}
function DemoCTA() {
  const reveal = useScrollReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: reveal.ref, "data-visible": reveal.visible, id: "demo", className: "mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 p-10 md:grid-cols-2 md:p-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] opacity-70", children: "Live demo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl md:text-5xl", children: "Hear Khyra before you buy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-md opacity-80", children: "Pick a role, pick a language, and have a live conversation with a Khyra agent right now. No sign-up." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary", style: {
          background: "var(--beige-deep)"
        }, href: "#", children: [
          "Try the live demo ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium", href: "#", children: "Book personalised demo" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary-foreground/5 p-6 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DemoField, { label: "Agent role", value: "Front Desk" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DemoField, { label: "Industry", value: "Dental Clinic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DemoField, { label: "Language", value: "Hindi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DemoField, { label: "Voice", value: "Meera · Female" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-foreground py-3 text-sm font-medium text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-4 w-4" }),
        " Start conversation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-center text-[11px] opacity-60", children: "This demo does not store any data." })
    ] })
  ] }) }) });
}
function DemoField({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider opacity-60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: value })
  ] });
}
function Testimonials() {
  const reveal = useScrollReveal();
  const t = [{
    q: "We went from missing 40% of after-hours calls to zero overnight. Booking rate up 30% in month one.",
    a: "Dr. Priya S.",
    r: "Dental Clinic Owner, Bengaluru"
  }, {
    q: "Our sales team was spending 3 hours a day on cold follow-ups. Khyra does that now. They focus on closing.",
    a: "Rohan M.",
    r: "Founder, PropTech Startup, Hyderabad"
  }, {
    q: "The Kannada support was the deciding factor. Our patients speak Kannada first. No other tool could do that.",
    a: "Operations Manager",
    r: "Multi-specialty Hospital, Mysuru"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: reveal.ref, "data-visible": reveal.visible, className: "mx-auto max-w-7xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Customers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl text-ink md:text-5xl", children: "From the front desk." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: t.map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "flex flex-col justify-between rounded-2xl border border-border bg-card p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-display text-xl leading-snug text-ink", children: [
        "“",
        x.q,
        "”"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-ink", children: x.a }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: x.r })
      ] })
    ] }, x.a)) })
  ] });
}
function Pricing() {
  const reveal = useScrollReveal();
  const tiers = [{
    n: "Starter",
    d: "Solo practitioners and small clinics.",
    f: ["1 agent", "1 language", "500 minutes / month", "Email support"]
  }, {
    n: "Growth",
    d: "SMBs and multi-location businesses.",
    f: ["3 agents", "5 languages", "3,000 minutes / month", "Priority support"],
    featured: true
  }, {
    n: "Enterprise",
    d: "Large teams and multi-vertical deployments.",
    f: ["Unlimited agents", "All 11 languages", "Custom volume", "Dedicated SLA + on-prem"]
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: reveal.ref, "data-visible": reveal.visible, id: "pricing", className: "bg-beige/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl text-ink md:text-5xl", children: [
        "INR pricing. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "Indian volumes." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: tiers.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-8 ${t.featured ? "border-primary bg-primary text-primary-foreground shadow-xl" : "border-border bg-background"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: t.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-sm ${t.featured ? "opacity-80" : "text-muted-foreground"}`, children: t.d }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3 text-sm", children: t.f.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: `h-4 w-4 ${t.featured ? "" : "text-primary"}` }),
        " ",
        f
      ] }, f)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#demo", className: `mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${t.featured ? "text-primary" : "bg-primary text-primary-foreground hover:opacity-90"}`, style: t.featured ? {
        background: "var(--beige-deep)"
      } : void 0, children: [
        "Talk to sales ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, t.n)) })
  ] }) });
}
function FAQ() {
  const reveal = useScrollReveal();
  const qs = [["How long does it take to go live?", "Most customers are live within 24–48 hours. Complex enterprise integrations may take up to a week."], ["Which languages does Khyra support?", "English, Hindi, Kannada, Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, Punjabi and Odia — with more on the way."], ["Do I need to train the AI on my business data?", "No. Agents come pre-trained on your industry vertical. You provide basic config and Khyra handles the rest."], ["Can I keep my existing phone number?", "Yes. Khyra works with your existing DID via a SIP bridge. No porting required."], ["What happens when the AI can't handle a call?", "It gracefully escalates to a human, sends a summary transcript, and routes the caller appropriately."], ["Is my call data stored in India?", "Yes. All data is stored on Indian cloud infrastructure, encrypted at rest and in transit."], ["Do you integrate with our CRM / calendar / helpdesk?", "Webhook-based integration with any system, plus native connectors on the roadmap."], ["What telephony providers do you support?", "Vobiz today, plus any SIP-compatible provider. WebRTC supported for demo and internal use."]];
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: reveal.ref, "data-visible": reveal.visible, id: "faq", className: "mx-auto max-w-4xl px-6 py-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl text-ink md:text-5xl", children: "Questions, answered." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border rounded-2xl border border-border bg-card", children: qs.map(([q, a], i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(isOpen ? null : i), className: "flex w-full items-center justify-between gap-6 px-6 py-5 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-ink", children: q }),
          isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4 shrink-0 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
        ] }),
        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 text-sm text-muted-foreground", children: a })
      ] }, q);
    }) })
  ] });
}
function FinalCTA() {
  const reveal = useScrollReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: reveal.ref, "data-visible": reveal.visible, className: "mx-auto max-w-7xl px-6 pb-24 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-beige/50 p-12 text-center md:p-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mx-auto max-w-2xl font-display text-4xl text-ink md:text-6xl", children: "Every missed call is a missed opportunity." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Give your business an AI voice agent that sounds local, works around the clock, and costs a fraction of a full-time hire." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#demo", className: "mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90", children: [
      "Book a live demo ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
    ] })
  ] }) });
}
function Footer() {
  const reveal = useScrollReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { ref: reveal.ref, "data-visible": reveal.visible, className: "border-t border-border bg-secondary/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Khyra AI logo", className: "h-9 w-9 rounded-full border border-primary/70 object-contain" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl", children: "Khyra AI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-sm text-sm text-muted-foreground", children: "AI voice agents for Indian businesses. Multilingual, always-on, deployable in hours." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-primary", children: "Features" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#use-cases", className: "hover:text-primary", children: "Use cases" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#pricing", className: "hover:text-primary", children: "Pricing" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#compare", className: "hover:text-primary", children: "Compare" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@khyra.ai", className: "hover:text-primary", children: "hello@khyra.ai" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-primary", children: "WhatsApp" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-primary", children: "LinkedIn" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "© 2026 Khyra AI. Built in India for Indian businesses." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Cookies" })
      ] })
    ] })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Trust, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Pillars, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorks, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoCTA, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UseCases, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Impact, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Compare, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyKhyra, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Pricing, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTA, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
