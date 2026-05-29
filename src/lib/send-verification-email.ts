import { createServerFn } from "@tanstack/react-start";

export const sendVerificationEmail = createServerFn()
  .inputValidator((data: { email: string; displayName: string }) => {
    if (!data?.email || !data?.displayName) throw new Error("email and displayName are required");
    return data;
  })
  .handler(async (ctx) => {
    const { email, displayName } = ctx.data;
    console.log("[send-verification-email] invoked for:", email);

    // Dynamic imports — these never ship to the browser bundle
    const [{ initializeApp, getApps, cert }, { getAuth }, { Resend }] = await Promise.all([
      import("firebase-admin/app"),
      import("firebase-admin/auth"),
      import("resend"),
    ]);

    if (!getApps().length) {
      console.log("[send-verification-email] initialising Firebase Admin...");
      const projectId = process.env["FIREBASE_ADMIN_PROJECT_ID"];
      const clientEmail = process.env["FIREBASE_ADMIN_CLIENT_EMAIL"];
      const privateKey = process.env["FIREBASE_ADMIN_PRIVATE_KEY"];
      if (!projectId || !clientEmail || !privateKey) {
        console.error("[send-verification-email] Missing Firebase Admin env vars:", {
          projectId: !!projectId,
          clientEmail: !!clientEmail,
          privateKey: !!privateKey,
        });
        throw new Error("Firebase Admin env vars not configured");
      }
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
      console.log("[send-verification-email] Firebase Admin initialised");
    }

    const auth = getAuth();
    const appUrl = process.env["VITE_APP_URL"] ?? "https://khyra-ai-web.vercel.app";

    let link: string;
    try {
      link = await auth.generateEmailVerificationLink(email, { url: `${appUrl}/login` });
      console.log("[send-verification-email] verification link generated");
    } catch (err) {
      console.error("[send-verification-email] generateEmailVerificationLink failed:", err);
      throw err;
    }

    const resendKey = process.env["RESEND_API_KEY"];
    if (!resendKey) {
      console.error("[send-verification-email] RESEND_API_KEY is not set");
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(resendKey);
    const { data: sendData, error } = await resend.emails.send({
      from: "Khyra AI <noreply@khyraai.com>",
      to: email,
      subject: "Verify your Khyra AI account",
      html: buildEmailHtml(displayName, link),
    });

    if (error) {
      console.error("[send-verification-email] Resend send failed:", error);
      throw new Error(`Resend error: ${(error as { message: string }).message}`);
    }

    console.log("[send-verification-email] email sent successfully, id:", sendData?.id);
    return { ok: true };
  });

function buildEmailHtml(name: string, link: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Verify your Khyra AI account</title>
</head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:40px 16px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 100%);padding:36px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">Khyra AI</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.55);font-size:13px;letter-spacing:0.3px;">AI-First Voice Platform for India</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <h2 style="margin:0 0 16px;color:#1e1b4b;font-size:22px;font-weight:600;">Verify your email address</h2>
            <p style="margin:0 0 8px;color:#374151;font-size:15px;line-height:1.65;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 28px;color:#374151;font-size:15px;line-height:1.65;">
              Thanks for signing up with Khyra AI! Click the button below to verify your email address and activate your account.
            </p>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
              <tr>
                <td style="background:#4f46e5;border-radius:10px;">
                  <a href="${link}"
                     style="display:inline-block;padding:15px 36px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.2px;">
                    Verify my email &rarr;
                  </a>
                </td>
              </tr>
            </table>

            <hr style="border:none;border-top:1px solid #f0ebe4;margin:0 0 24px;">

            <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="margin:0 0 24px;word-break:break-all;">
              <a href="${link}" style="color:#4f46e5;font-size:12px;text-decoration:none;">${link}</a>
            </p>
            <p style="margin:0;color:#c9bfb0;font-size:12px;line-height:1.6;">
              This link expires in 24 hours. If you didn't create a Khyra AI account, you can safely ignore this email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#faf7f2;padding:20px 40px;text-align:center;border-top:1px solid #f0ebe4;">
            <p style="margin:0;color:#b0a090;font-size:12px;">
              &copy; 2025 Khyra AI &middot;
              <a href="https://khyraai.com" style="color:#b0a090;text-decoration:none;">khyraai.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
