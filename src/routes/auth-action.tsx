import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth-action")({
  component: AuthActionPage,
});

type Status = "loading" | "success" | "error";

function AuthActionPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const oobCode = params.get("oobCode");

    if (mode === "verifyEmail" && oobCode && auth) {
      applyActionCode(auth, oobCode)
        .then(async () => {
          await auth.authStateReady();
          setStatus("success");
          if (auth.currentUser) {
            await auth.currentUser.reload();
            setTimeout(() => navigate({ to: "/" }), 2500);
          } else {
            setTimeout(() => navigate({ to: "/login" }), 2500);
          }
        })
        .catch((err: { message?: string }) => {
          setStatus("error");
          setErrorMsg(err.message ?? "Verification failed. The link may have expired.");
        });
    } else {
      setStatus("error");
      setErrorMsg("Invalid or missing verification code.");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Verifying your email…</h1>
            <p className="mt-2 text-sm text-muted-foreground">This will only take a moment.</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h1 className="text-xl font-semibold text-foreground">Email verified!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {auth?.currentUser ? "Redirecting to your dashboard…" : "Redirecting you to login…"}
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h1 className="text-xl font-semibold text-foreground">Verification failed</h1>
            <p className="mt-2 text-sm text-muted-foreground">{errorMsg}</p>
            <button
              onClick={() => navigate({ to: "/login" })}
              className="mt-6 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
