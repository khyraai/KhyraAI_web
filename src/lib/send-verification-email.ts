import { createServerFn } from "@tanstack/react-start";
import { readFileSync } from "node:fs";
import { join } from "node:path";

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
    const appUrl = process.env["VITE_APP_URL"] ?? "https://khyraai.com";

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

    // Read assets server-side and embed as base64 data URIs (works without a CDN)
    const assetsDir = join(process.cwd(), "src", "assets");
    const logoB64 = readFileSync(join(assetsDir, "Khyra.svg")).toString("base64");
    const mascotB64 = readFileSync(join(assetsDir, "email-mascot.png")).toString("base64");

    const { data: sendData, error } = await resend.emails.send({
      from: "Khyra AI <noreply@khyraai.com>",
      to: email,
      subject: "Verify your Khyra AI account",
      html: buildEmailHtml(displayName, link, logoB64, mascotB64),
    });

    if (error) {
      console.error("[send-verification-email] Resend send failed:", error);
      throw new Error(`Resend error: ${(error as { message: string }).message}`);
    }

    console.log("[send-verification-email] email sent successfully, id:", sendData?.id);
    return { ok: true };
  });

function buildEmailHtml(name: string, link: string, logoB64: string, mascotB64: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Verify your Khyra AI account</title>
</head>
<body style="margin:0;padding:0;background:#eae8e3;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eae8e3;padding:40px 16px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);max-width:560px;width:100%;">

        <!-- ===== HEADER ===== -->
        <tr>
          <td style="background:#1a3c34;padding:28px 40px;position:relative;overflow:hidden;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <!-- Khyra AI Logo -->
                  <table cellpadding="0" cellspacing="0" style="display:inline-table;vertical-align:middle;">
                    <tr>
                      <td style="vertical-align:middle;">
                        <img src="data:image/svg+xml;base64,${logoB64}" width="38" height="38" alt="Khyra AI" style="display:block;border-radius:50%;border:1.5px solid rgba(255,255,255,0.3);">
                      </td>
                      <td style="padding-left:10px;vertical-align:middle;">
                        <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Khyra AI</span>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <span style="color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;padding-left:48px;display:inline-block;margin-top:4px;">AI-FIRST VOICE PLATFORM FOR INDIA</span>
                </td>
                <!-- Email mascot -->
                <td style="vertical-align:bottom;text-align:right;width:100px;">
                  <img src="data:image/png;base64,${mascotB64}" width="90" alt="Khyra AI Mascot" style="display:block;margin-left:auto;">
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ===== BODY ===== -->
        <tr>
          <td style="padding:40px 40px 28px;">

            <!-- Icon + Heading row -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td style="vertical-align:middle;padding-right:18px;">
                  <!-- Envelope with checkmark icon -->
                  <div style="width:58px;height:58px;background:#f0ebe2;border-radius:50%;text-align:center;line-height:58px;font-size:26px;position:relative;display:inline-block;">
                    &#9993;
                    <div style="position:absolute;bottom:2px;right:2px;width:18px;height:18px;background:#1a3c34;border-radius:50%;border:2px solid #ffffff;text-align:center;line-height:16px;font-size:10px;color:#fff;">&#10003;</div>
                  </div>
                </td>
                <td style="vertical-align:middle;">
                  <h2 style="margin:0;color:#1a3c34;font-size:28px;font-weight:700;line-height:1.15;">Verify your<br><em style="font-style:italic;color:#1a3c34;font-weight:600;">email address</em></h2>
                </td>
              </tr>
            </table>

            <!-- Divider line -->
            <div style="width:36px;height:3px;background:#c8a96e;border-radius:2px;margin-bottom:22px;"></div>

            <p style="margin:0 0 6px;color:#1a3c34;font-size:15px;line-height:1.6;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 28px;color:#4b5563;font-size:15px;line-height:1.7;">
              Thanks for signing up with Khyra AI! Click the button below to verify your email address and activate your account.
            </p>

            <!-- ===== CTA Button ===== -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;width:100%;">
              <tr>
                <td style="background:#1a3c34;border-radius:10px;text-align:center;">
                  <a href="${link}"
                     style="display:block;padding:16px 36px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.3px;">
                    &#10003;&nbsp;&nbsp;Verify my email &nbsp;&rarr;
                  </a>
                </td>
              </tr>
            </table>

            <!-- OR divider -->
            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
              <tr>
                <td style="border-top:1px solid #e5e0d8;width:45%;"></td>
                <td style="text-align:center;padding:0 12px;color:#9ca3af;font-size:12px;white-space:nowrap;">OR</td>
                <td style="border-top:1px solid #e5e0d8;width:45%;"></td>
              </tr>
            </table>

            <p style="margin:0 0 6px;color:#6b7280;font-size:13px;line-height:1.5;">
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="margin:0 0 24px;word-break:break-all;">
              <a href="${link}" style="color:#1a3c34;font-size:12px;text-decoration:none;line-height:1.6;">${link}</a>
            </p>

            <!-- Expiry notice -->
            <table cellpadding="0" cellspacing="0" style="background:#f9f6f1;border-radius:10px;padding:0;width:100%;">
              <tr>
                <td style="padding:14px 18px;vertical-align:middle;width:36px;text-align:center;">
                  <!-- Clock icon -->
                  <div style="width:32px;height:32px;background:#1a3c34;border-radius:50%;text-align:center;line-height:32px;font-size:16px;color:#fff;">&#8987;</div>
                </td>
                <td style="padding:14px 14px 14px 0;vertical-align:middle;">
                  <p style="margin:0;color:#374151;font-size:13px;font-weight:600;line-height:1.4;">This link expires in 24 hours.</p>
                  <p style="margin:4px 0 0;color:#6b7280;font-size:12px;line-height:1.5;">If you didn't create a Khyra AI account, you can safely ignore this email.</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ===== FOOTER ===== -->
        <tr>
          <td style="background:#f5f2ed;padding:20px 40px;border-top:1px solid #e8e2d9;text-align:right;">
            <p style="margin:0;color:#6b7280;font-size:12px;">&copy; 2026 Khyra AI</p>
            <p style="margin:4px 0 0;">
              <a href="https://khyraai.com" style="color:#1a3c34;font-size:12px;text-decoration:none;font-weight:500;">khyraai.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
