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
    const [{ initializeApp, getApps, cert }, adminModule] = await Promise.all([
      import("firebase-admin/app"),
      import("firebase-admin"),
    ]);
    const admin = (adminModule as unknown as { default?: any }).default ?? adminModule;

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

    const adminDb = admin.firestore();
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
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      roleTitle: input.roleTitle,
      teamSize: input.teamSize,
      useCasePainPoints: input.useCasePainPoints,
      preferredLanguages: input.preferredLanguages,
      profileSnapshot: input.profileSnapshot,
      source: "website_book_demo",
    });

    return { ok: true as const };
  });
