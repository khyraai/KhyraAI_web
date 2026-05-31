import { createServerFn } from "@tanstack/react-start";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const sendDemoRequestEmail = createServerFn()
  .inputValidator((data: { email: string; name: string }) => {
    if (!data?.email || !data?.name) throw new Error("email and name are required");
    return data;
  })
  .handler(async (ctx) => {
    const { email, name } = ctx.data;

    const [{ Resend }] = await Promise.all([import("resend")]);
    const resendKey = process.env["RESEND_API_KEY"];
    if (!resendKey) throw new Error("RESEND_API_KEY not configured");

    const assetsDir = join(process.cwd(), "src", "assets");
    const logoB64 = readFileSync(join(assetsDir, "Khyra.svg")).toString("base64");
    const mascotB64 = readFileSync(join(assetsDir, "email-mascot.png")).toString("base64");

    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: "Khyra AI <noreply@khyraai.com>",
      to: email,
      subject: "We received your demo request",
      html: buildEmailHtml(name, logoB64, mascotB64),
    });

    if (error) return { ok: false as const };
    return { ok: true as const };
  });

function buildEmailHtml(name: string, logoB64: string, mascotB64: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Demo request received</title>
</head>
<body style="margin:0;padding:0;background:#eae8e3;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eae8e3;padding:40px 16px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);max-width:560px;width:100%;">
        <tr>
          <td style="background:#1a3c34;padding:28px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
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
                <td style="vertical-align:bottom;text-align:right;width:100px;">
                  <img src="data:image/png;base64,${mascotB64}" width="90" alt="Khyra AI Mascot" style="display:block;margin-left:auto;">
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0;color:#1a3c34;font-size:28px;font-weight:700;line-height:1.2;">Demo request received</h2>
            <div style="width:36px;height:3px;background:#c8a96e;border-radius:2px;margin:18px 0 22px;"></div>
            <p style="margin:0 0 8px;color:#1a3c34;font-size:15px;line-height:1.6;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 12px;color:#4b5563;font-size:15px;line-height:1.7;">
              Thanks for requesting a demo with Khyra AI. Our representative will get back to you within 24 hours.
            </p>
            <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.7;">
              We will share the scheduling details in our follow-up response.
            </p>
          </td>
        </tr>
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

