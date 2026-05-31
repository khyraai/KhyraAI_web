import { createServerFn } from "@tanstack/react-start";

export const saveDemoRequest = createServerFn()
  .inputValidator((data: {
    uid: string;
    status: string;
    source: string;
    submittedAtMs: number;
    responseDueAtMs: number;
    request: {
      roleTitle: string;
      teamSize: string;
      useCasePainPoints: string;
      preferredLanguages: string[];
    };
    profileSnapshot: {
      name: string;
      email: string;
      phone: string;
      companyName: string;
      city: string;
      state: string;
    };
  }) => {
    if (!data?.uid) throw new Error("uid is required");
    return data;
  })
  .handler(async (ctx) => {
    const payload = ctx.data;
    console.log("[save-demo-request] invoked for uid:", payload.uid);

    const projectId = process.env["FIREBASE_ADMIN_PROJECT_ID"];
    const clientEmail = process.env["FIREBASE_ADMIN_CLIENT_EMAIL"];
    const privateKey = process.env["FIREBASE_ADMIN_PRIVATE_KEY"];
    if (!projectId || !clientEmail || !privateKey) {
      console.error("[save-demo-request] Missing Firebase Admin env vars");
      throw new Error("Firebase Admin env vars not configured");
    }

    const { cert } = await import("firebase-admin/app");
    const credential = cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") });
    const { access_token } = await credential.getAccessToken();

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/demo_requests`;

    const body = {
      fields: {
        uid: { stringValue: payload.uid },
        status: { stringValue: payload.status },
        source: { stringValue: payload.source },
        submittedAtMs: { integerValue: String(payload.submittedAtMs) },
        responseDueAtMs: { integerValue: String(payload.responseDueAtMs) },
        submittedAt: { timestampValue: new Date(payload.submittedAtMs).toISOString() },
        request: {
          mapValue: {
            fields: {
              roleTitle: { stringValue: payload.request.roleTitle },
              teamSize: { stringValue: payload.request.teamSize },
              useCasePainPoints: { stringValue: payload.request.useCasePainPoints },
              preferredLanguages: {
                arrayValue: { values: payload.request.preferredLanguages.map((l) => ({ stringValue: l })) },
              },
            },
          },
        },
        profileSnapshot: {
          mapValue: {
            fields: {
              name: { stringValue: payload.profileSnapshot.name },
              email: { stringValue: payload.profileSnapshot.email },
              phone: { stringValue: payload.profileSnapshot.phone },
              companyName: { stringValue: payload.profileSnapshot.companyName },
              city: { stringValue: payload.profileSnapshot.city },
              state: { stringValue: payload.profileSnapshot.state },
            },
          },
        },
      },
    };

    try {
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
      console.error("[save-demo-request] fetch failed:", err);
      return { ok: false as const, error: "firestore_write_failed" as const };
    }
  });
