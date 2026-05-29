import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { a as signInWithEmailAndPassword, s as sendPasswordResetEmail } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { a as auth } from "./router-D55qtpW9.mjs";
import { l as logo } from "./Khyra-di50hbBa.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__firestore.mjs";
import { M as Mail, L as Lock, b as EyeOff, E as Eye, a as ArrowRight } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
const loginSchema = objectType({
  email: stringType().email("Enter a valid email address"),
  password: stringType().min(1, "Password is required")
});
function getFirebaseError(code) {
  const map = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your connection."
  };
  return map[code] ?? "Something went wrong. Please try again.";
}
function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [authError, setAuthError] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [resetMode, setResetMode] = reactExports.useState(false);
  const [resetSent, setResetSent] = reactExports.useState(false);
  const [resetEmail, setResetEmail] = reactExports.useState("");
  const [resetError, setResetError] = reactExports.useState("");
  const [resetLoading, setResetLoading] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: u(loginSchema)
  });
  const onSubmit = async (data) => {
    setAuthError("");
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate({
        to: "/"
      });
    } catch (err) {
      const code = err.code ?? "";
      setAuthError(getFirebaseError(code));
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePasswordReset = async () => {
    setResetError("");
    if (!resetEmail) {
      setResetError("Enter your email address.");
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch (err) {
      const code = err.code ?? "";
      setResetError(getFirebaseError(code));
    } finally {
      setResetLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid opacity-[0.35]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", style: {
      backgroundImage: "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 65%, transparent), transparent 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative flex h-20 items-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group flex items-center gap-2.5 text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Khyra AI", className: "h-9 w-9 rounded-full border border-primary/70 object-contain transition-colors group-hover:bg-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl leading-none tracking-tight", children: "Khyra AI" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-8 shadow-sm", children: !resetMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-3xl text-ink md:text-4xl", children: "Sign in to Khyra." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "font-medium text-primary underline-offset-4 hover:underline", children: "Create one" })
        ] })
      ] }),
      authError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: authError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-[0.15em] text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", autoComplete: "email", placeholder: "you@company.com", className: "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10", ...register("email") })
          ] }),
          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.email.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-[0.15em] text-muted-foreground", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setResetMode(true), className: "text-[11px] text-primary underline-offset-4 hover:underline", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", autoComplete: "current-password", placeholder: "••••••••", className: "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-11 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10", ...register("password") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] }),
          errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.password.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60", children: isSubmitting ? "Signing in…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Sign in ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Password reset" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-3xl text-ink md:text-4xl", children: "Reset your password." }),
        !resetSent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Enter your email and we'll send a reset link." })
      ] }),
      resetSent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-center text-sm text-primary", children: [
        "Reset link sent to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: resetEmail }),
        ". Check your inbox (and spam folder)."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        resetError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: resetError }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-[0.15em] text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: resetEmail, onChange: (e) => setResetEmail(e.target.value), placeholder: "you@company.com", className: "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handlePasswordReset, disabled: resetLoading, className: "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60", children: resetLoading ? "Sending…" : "Send reset link" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
        setResetMode(false);
        setResetSent(false);
        setResetEmail("");
        setResetError("");
      }, className: "mt-4 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline", children: "Back to sign in" })
    ] }) }) }) })
  ] });
}
export {
  LoginPage as component
};
