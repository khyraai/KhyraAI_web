import { createServerFn } from "@tanstack/react-start";

export const updateDemoRequest = createServerFn()
  .inputValidator((data: {
    docId?: string;
    uid: string;
    submittedAtMs: number;
    status: string;
    source: string;
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
    console.log("[update-demo-request] invoked for uid:", payload.uid, "docId:", payload.docId);

    const [{ initializeApp, getApps, cert }, { getFirestore }] = await Promise.all([
      import("firebase-admin/app"),
      import("firebase-admin/firestore"),
    ]);

    if (!getApps().length) {
      const projectId = process.env["FIREBASE_ADMIN_PROJECT_ID"];
      const clientEmail = process.env["FIREBASE_ADMIN_CLIENT_EMAIL"];
      const privateKey = process.env["FIREBASE_ADMIN_PRIVATE_KEY"];
      if (!projectId || !clientEmail || !privateKey) {
        console.error("[update-demo-request] Missing Firebase Admin env vars");
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
      let docId = payload.docId;

      if (!docId) {
        const snapshot = await db
          .collection("demo_requests")
          .where("uid", "==", payload.uid)
          .where("submittedAtMs", "==", payload.submittedAtMs)
          .limit(1)
          .get();
        if (snapshot.empty) {
          console.error("[update-demo-request] no matching doc found for uid:", payload.uid);
          return { ok: false as const, error: "doc_not_found" as const };
        }
        docId = snapshot.docs[0].id;
      }

      await db.collection("demo_requests").doc(docId).update({
        status: payload.status,
        source: payload.source,
        request: payload.request,
        profileSnapshot: payload.profileSnapshot,
        updatedAt: new Date(),
      });

      console.log("[update-demo-request] updated successfully, docId:", docId);
      return { ok: true as const };
    } catch (err) {
      console.error("[update-demo-request] firestore update failed:", err);
      return { ok: false as const, error: "firestore_update_failed" as const };
    }
  });
