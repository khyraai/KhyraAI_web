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

    const [{ initializeApp, getApps, cert }, { getFirestore }] = await Promise.all([
      import("firebase-admin/app"),
      import("firebase-admin/firestore"),
    ]);

    if (!getApps().length) {
      const projectId = process.env["FIREBASE_ADMIN_PROJECT_ID"];
      const clientEmail = process.env["FIREBASE_ADMIN_CLIENT_EMAIL"];
      const privateKey = process.env["FIREBASE_ADMIN_PRIVATE_KEY"];
      if (!projectId || !clientEmail || !privateKey) {
        console.error("[save-demo-request] Missing Firebase Admin env vars");
        throw new Error("Firebase Admin env vars not configured");
      }
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
    }

    const db = getFirestore();
    try {
      const now = new Date(payload.submittedAtMs);
      const responseDue = new Date(payload.responseDueAtMs);
      const docRef = await db.collection("demo_requests").add({
        uid: payload.uid,
        status: payload.status,
        source: payload.source,
        submittedAt: now,
        submittedAtMs: payload.submittedAtMs,
        responseDueAt: responseDue,
        request: payload.request,
        profileSnapshot: payload.profileSnapshot,
      });
      console.log("[save-demo-request] saved successfully, docId:", docRef.id);
      return { ok: true as const, docId: docRef.id };
    } catch (err) {
      console.error("[save-demo-request] firestore write failed:", err);
      return { ok: false as const, error: "firestore_write_failed" as const };
    }
  });
