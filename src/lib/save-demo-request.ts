import { createServerFn } from "@tanstack/react-start";

export interface DemoRequestPayload {
  uid?: string;
  status?: string;
  source?: string;
  submittedAtMs?: number;
  responseDueAtMs?: number;
  name: string;
  email: string;
  companyName: string;
  country: string;
  industry: string;
  automationGoal: string;
  interactionVolume?: string;
  phone?: string;
  roleTitle?: string;
  // Backward compatibility fields
  request?: {
    roleTitle?: string;
    teamSize?: string;
    useCasePainPoints?: string;
    preferredLanguages?: string[];
  };
  profileSnapshot?: {
    name?: string;
    email?: string;
    phone?: string;
    companyName?: string;
    city?: string;
    state?: string;
  };
}

export const saveDemoRequest = createServerFn()
  .inputValidator((data: DemoRequestPayload) => {
    if (!data?.email || !data?.name) {
      throw new Error("Name and work email are required");
    }
    return data;
  })
  .handler(async (ctx) => {
    const payload = ctx.data;
    const nowMs = payload.submittedAtMs || Date.now();
    const effectiveUid = payload.uid || `lead_${nowMs}_${Math.random().toString(36).substring(2, 8)}`;

    console.log("[save-demo-request] invoked for:", payload.email, "uid:", effectiveUid);

    const projectId = process.env["FIREBASE_ADMIN_PROJECT_ID"];
    const clientEmail = process.env["FIREBASE_ADMIN_CLIENT_EMAIL"];
    const privateKey = process.env["FIREBASE_ADMIN_PRIVATE_KEY"];
    if (!projectId || !clientEmail || !privateKey) {
      console.warn("[save-demo-request] Firebase Admin env vars not configured, operating in mock/fallback mode");
      return { ok: true as const, docId: `mock_${Date.now()}` };
    }

    try {
      const { cert } = await import("firebase-admin/app");
      const credential = cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") });
      const { access_token } = await credential.getAccessToken();

      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/demo_requests`;

      const body = {
        fields: {
          uid: { stringValue: effectiveUid },
          status: { stringValue: payload.status || "new" },
          source: { stringValue: payload.source || "website_lead_capture" },
          submittedAtMs: { integerValue: String(nowMs) },
          responseDueAtMs: { integerValue: String(payload.responseDueAtMs || nowMs + 24 * 60 * 60 * 1000) },
          submittedAt: { timestampValue: new Date(nowMs).toISOString() },
          name: { stringValue: payload.name },
          email: { stringValue: payload.email },
          companyName: { stringValue: payload.companyName || "" },
          country: { stringValue: payload.country || "" },
          industry: { stringValue: payload.industry || "" },
          automationGoal: { stringValue: payload.automationGoal || payload.request?.useCasePainPoints || "" },
          interactionVolume: { stringValue: payload.interactionVolume || payload.request?.teamSize || "" },
          phone: { stringValue: payload.phone || payload.profileSnapshot?.phone || "" },
          roleTitle: { stringValue: payload.roleTitle || payload.request?.roleTitle || "" },
        },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("[save-demo-request] Firestore REST error:", err);
        return { ok: false as const, error: "firestore_write_failed" as const };
      }

      const doc = (await res.json()) as { name?: string };
      const docId = doc.name?.split("/").pop() ?? "";
      console.log("[save-demo-request] saved successfully, docId:", docId);
      return { ok: true as const, docId };
    } catch (err) {
      console.error("[save-demo-request] exception:", err);
      return { ok: false as const, error: "firestore_write_failed" as const };
    }
  });
