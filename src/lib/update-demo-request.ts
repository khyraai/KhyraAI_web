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

    const projectId = process.env["FIREBASE_ADMIN_PROJECT_ID"];
    const clientEmail = process.env["FIREBASE_ADMIN_CLIENT_EMAIL"];
    const privateKey = process.env["FIREBASE_ADMIN_PRIVATE_KEY"];
    if (!projectId || !clientEmail || !privateKey) {
      console.error("[update-demo-request] Missing Firebase Admin env vars");
      throw new Error("Firebase Admin env vars not configured");
    }

    const { cert } = await import("firebase-admin/app");
    const credential = cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") });
    const { access_token } = await credential.getAccessToken();

    const base = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/demo_requests`;
    const headers = { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" };

    try {
      let docId = payload.docId;

      if (!docId) {
        const queryUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
        const queryRes = await fetch(queryUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({
            structuredQuery: {
              from: [{ collectionId: "demo_requests" }],
              where: {
                compositeFilter: {
                  op: "AND",
                  filters: [
                    { fieldFilter: { field: { fieldPath: "uid" }, op: "EQUAL", value: { stringValue: payload.uid } } },
                    { fieldFilter: { field: { fieldPath: "submittedAtMs" }, op: "EQUAL", value: { integerValue: String(payload.submittedAtMs) } } },
                  ],
                },
              },
              limit: 1,
            },
          }),
        });
        const queryData = (await queryRes.json()) as { document?: { name?: string } }[];
        const docName = queryData[0]?.document?.name;
        if (!docName) {
          console.error("[update-demo-request] no matching doc found for uid:", payload.uid);
          return { ok: false as const, error: "doc_not_found" as const };
        }
        docId = docName.split("/").pop()!;
      }

      const updatedAt = new Date().toISOString();
      const fieldPaths = ["status", "source", "request", "profileSnapshot", "updatedAt"];
      const updateMask = fieldPaths.map((f) => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join("&");

      const patchRes = await fetch(`${base}/${docId}?${updateMask}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          fields: {
            status: { stringValue: payload.status },
            source: { stringValue: payload.source },
            updatedAt: { timestampValue: updatedAt },
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
        }),
      });

      if (!patchRes.ok) {
        const err = await patchRes.text();
        console.error("[update-demo-request] Firestore PATCH error:", err);
        return { ok: false as const, error: "firestore_update_failed" as const };
      }

      console.log("[update-demo-request] updated successfully, docId:", docId);
      return { ok: true as const, docId };
    } catch (err) {
      console.error("[update-demo-request] fetch failed:", err);
      return { ok: false as const, error: "firestore_update_failed" as const };
    }
  });
