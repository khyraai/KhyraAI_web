import { createServerFn } from "@tanstack/react-start";

type DemoRequestInput = {
  uid: string;
  roleTitle: string;
  teamSize: string;
  useCasePainPoints: string;
  preferredLanguages: string[];
  profileSnapshot: {
    name: string;
    email: string;
    phone: string;
    companyName: string;
    city: string;
    state: string;
  };
};

export const createDemoRequest = createServerFn()
  .inputValidator((data: DemoRequestInput) => {
    if (!data?.uid) throw new Error("uid is required");
    if (!data?.roleTitle) throw new Error("roleTitle is required");
    if (!data?.teamSize) throw new Error("teamSize is required");
    if (!data?.useCasePainPoints) throw new Error("useCasePainPoints is required");
    if (!Array.isArray(data?.preferredLanguages) || data.preferredLanguages.length < 1) {
      throw new Error("preferredLanguages is required");
    }
    if (!data?.profileSnapshot?.email) throw new Error("profileSnapshot.email is required");
    return data;
  })
  .handler(async (ctx) => {
    const input = ctx.data;
    const [{ initializeApp, getApps, getApp, cert }, { getFirestore, initializeFirestore, FieldValue }] = await Promise.all([
      import("firebase-admin/app"),
      import("firebase-admin/firestore"),
    ]);

    if (!getApps().length) {
      const projectId = process.env["FIREBASE_ADMIN_PROJECT_ID"];
      const clientEmail = process.env["FIREBASE_ADMIN_CLIENT_EMAIL"];
      const privateKey = process.env["FIREBASE_ADMIN_PRIVATE_KEY"];
      if (!projectId || !clientEmail || !privateKey) {
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

    const app = getApp();
    const globalState = globalThis as { __khyraFirestoreInit?: boolean };
    if (!globalState.__khyraFirestoreInit) {
      // Force REST transport to avoid gRPC constructor/runtime issues in serverless bundles.
      initializeFirestore(app, { preferRest: true });
      globalState.__khyraFirestoreInit = true;
    }

    const adminDb = getFirestore(app);
    const tenDaysAgoMs = Date.now() - 10 * 24 * 60 * 60 * 1000;
    const existingSnap = await adminDb
      .collection("demo_requests")
      .where("uid", "==", input.uid)
      .limit(50)
      .get();

    const hasRecent = existingSnap.docs.some((d: { get: (key: string) => { toDate?: () => Date } }) => {
      const submittedAt = d.get("submittedAt");
      const submittedAtMs = submittedAt?.toDate?.()?.getTime?.();
      return typeof submittedAtMs === "number" && submittedAtMs >= tenDaysAgoMs;
    });

    if (hasRecent) {
      return { ok: false as const, error: "duplicate_recent" as const };
    }

    await adminDb.collection("demo_requests").add({
      uid: input.uid,
      status: "new",
      submittedAt: FieldValue.serverTimestamp(),
      roleTitle: input.roleTitle,
      teamSize: input.teamSize,
      useCasePainPoints: input.useCasePainPoints,
      preferredLanguages: input.preferredLanguages,
      profileSnapshot: input.profileSnapshot,
      source: "website_book_demo",
    });

    return { ok: true as const };
  });
