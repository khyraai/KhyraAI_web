import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { c as createUserWithEmailAndPassword, u as updateProfile } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { a as setDoc, d as doc, s as serverTimestamp } from "../_libs/firebase__firestore.mjs";
import { a as auth, d as db } from "./router-D55qtpW9.mjs";
import { l as logo } from "./Khyra-di50hbBa.mjs";
import "../_libs/firebase.mjs";
import { U as User, f as Phone, M as Mail, L as Lock, b as EyeOff, E as Eye, a as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const signupSchema = objectType({
  name: stringType().min(2, "Name must be at least 2 characters").max(60),
  email: stringType().email("Enter a valid email address"),
  phone: stringType().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  password: stringType().min(8, "Password must be at least 8 characters").regex(/[A-Za-z]/, "Must include at least one letter").regex(/[0-9]/, "Must include at least one number"),
  confirmPassword: stringType()
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
function getFirebaseError(code) {
  const map = {
    "auth/email-already-in-use": "An account with this email already exists. Try signing in.",
    "auth/weak-password": "Password is too weak. Use at least 8 characters.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/too-many-requests": "Too many requests. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your connection."
  };
  return map[code] ?? "Something went wrong. Please try again.";
}
function InputField({
  label,
  error,
  icon: Icon,
  right,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-[0.15em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-11 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10", ...props }),
      right && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3.5 top-1/2 -translate-y-1/2", children: right })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [authError, setAuthError] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: u(signupSchema)
  });
  const onSubmit = async (data) => {
    setAuthError("");
    setIsSubmitting(true);
    try {
      const {
        user
      } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(user, {
        displayName: data.name
      });
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: data.name,
          email: data.email,
          phone: data.phone,
          createdAt: serverTimestamp()
        });
      } catch {
      }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid opacity-[0.35]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", style: {
      backgroundImage: "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklab, var(--beige) 65%, transparent), transparent 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative flex h-20 items-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group flex items-center gap-2.5 text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Khyra AI", className: "h-9 w-9 rounded-full border border-primary/70 object-contain transition-colors group-hover:bg-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl leading-none tracking-tight", children: "Khyra AI" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 pb-16 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Get started" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-3xl text-ink md:text-4xl", children: "Create your account." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-medium text-primary underline-offset-4 hover:underline", children: "Sign in" })
        ] })
      ] }),
      authError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: authError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { label: "Full name", icon: User, type: "text", autoComplete: "name", placeholder: "Priya Sharma", error: errors.name?.message, ...register("name") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-[0.15em] text-muted-foreground", children: "Phone number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-9 top-1/2 -translate-y-1/2 select-none pr-2 text-sm text-muted-foreground/60 after:absolute after:right-0 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-border", children: "+91" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", autoComplete: "tel", placeholder: "98765 43210", className: "w-full rounded-xl border border-border bg-background py-3 pl-[4.25rem] pr-4 text-sm text-ink outline-none transition placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10", ...register("phone") })
            ] }),
            errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.phone.message })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { label: "Email address", icon: Mail, type: "email", autoComplete: "email", placeholder: "you@company.com", error: errors.email?.message, ...register("email") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { label: "Password", icon: Lock, type: showPassword ? "text" : "password", autoComplete: "new-password", placeholder: "Min. 8 chars with a number", error: errors.password?.message, right: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "text-muted-foreground/60 hover:text-muted-foreground", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }), ...register("password") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { label: "Confirm password", icon: Lock, type: showConfirm ? "text" : "password", autoComplete: "new-password", placeholder: "Repeat your password", error: errors.confirmPassword?.message, right: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowConfirm(!showConfirm), className: "text-muted-foreground/60 hover:text-muted-foreground", children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }), ...register("confirmPassword") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] leading-relaxed text-muted-foreground", children: [
          "By creating an account you agree to our",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary underline-offset-4 hover:underline", children: "Terms of Service" }),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary underline-offset-4 hover:underline", children: "Privacy Policy" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60", children: isSubmitting ? "Creating account…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Create account ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] })
    ] }) }) })
  ] });
}
export {
  SignupPage as component
};
