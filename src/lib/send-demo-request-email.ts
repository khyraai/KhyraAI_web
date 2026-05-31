import { createServerFn } from "@tanstack/react-start";

export const sendDemoRequestEmail = createServerFn()
  .inputValidator((data: {
    email: string;
    name: string;
    roleTitle: string;
    teamSize: string;
    useCasePainPoints: string;
    preferredLanguages: string[];
    isUpdate?: boolean;
  }) => {
    if (!data?.email || !data?.name) throw new Error("email and name are required");
    return data;
  })
  .handler(async (ctx) => {
    const { email, name, roleTitle, teamSize, useCasePainPoints, preferredLanguages, isUpdate } = ctx.data;
    console.log("[send-demo-request-email] invoked for:", email);

    const [{ Resend }] = await Promise.all([import("resend")]);
    const resendKey = process.env["RESEND_API_KEY"];
    if (!resendKey) {
      console.error("[send-demo-request-email] RESEND_API_KEY not configured");
      return { ok: false as const, error: "missing_resend_key" as const };
    }

    const resend = new Resend(resendKey);
    let error: unknown = null;
    try {
      const sendRes = await resend.emails.send({
        from: "Khyra AI <noreply@khyraai.com>",
        to: email,
        subject: isUpdate ? "Your Demo Request Has Been Updated" : "Thank you for requesting a Demo.",
        html: buildEmailHtml(name, roleTitle, teamSize, useCasePainPoints, preferredLanguages, isUpdate),
      });
      error = sendRes.error;
    } catch (err) {
      console.error("[send-demo-request-email] Resend send exception:", err);
      return { ok: false as const, error: "send_exception" as const };
    }

    if (error) {
      console.error("[send-demo-request-email] Resend send failed:", error);
      return { ok: false as const, error: "send_failed" as const };
    }
    console.log("[send-demo-request-email] email sent successfully");
    return { ok: true as const };
  });

function buildEmailHtml(
  name: string,
  roleTitle: string,
  teamSize: string,
  useCasePainPoints: string,
  preferredLanguages: string[],
  isUpdate?: boolean,
): string {
  const languagesText = preferredLanguages.join(", ");
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
                      <td style="padding-left:10px;vertical-align:middle;">
                        <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Khyra AI</span>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <span style="color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;display:inline-block;margin-top:4px;">AI-FIRST VOICE PLATFORM FOR INDIA</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0;color:#1a3c34;font-size:28px;font-weight:700;line-height:1.2;">${isUpdate ? 'Demo request updated' : 'Demo request received'}</h2>
            <div style="width:36px;height:3px;background:#c8a96e;border-radius:2px;margin:18px 0 22px;"></div>
            <p style="margin:0 0 8px;color:#1a3c34;font-size:15px;line-height:1.6;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 12px;color:#4b5563;font-size:15px;line-height:1.7;">
              ${isUpdate
                ? 'Your demo request details have been updated. Our representative will get back to you within 24 hours regarding your updated request.'
                : 'Thanks for requesting a demo with Khyra AI. Our representative will get back to you within 24 hours.'}
            </p>
            ${isUpdate ? `<p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.7;">If a demo was already scheduled, it will become tentative — final confirmation will be sent via email.</p>` : `<p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.7;">We will share the scheduling details in our follow-up response.</p>`}

            <table cellpadding="0" cellspacing="0" style="width:100%;background:#f9f6f1;border-radius:12px;margin:0 0 20px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 14px;color:#1a3c34;font-size:16px;font-weight:700;">Your demo request details</p>
                <table cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="padding:0 0 8px;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">Role / Title</td>
                    <td style="padding:0 0 8px;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${roleTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px;color:#6b7280;font-size:13px;vertical-align:top;">Team size</td>
                    <td style="padding:0 0 8px;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${teamSize}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px;color:#6b7280;font-size:13px;vertical-align:top;">Use case</td>
                    <td style="padding:0 0 8px;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${useCasePainPoints}</td>
                  </tr>
                  <tr>
                    <td style="padding:0;color:#6b7280;font-size:13px;vertical-align:top;">Languages</td>
                    <td style="padding:0;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${languagesText}</td>
                  </tr>
                </table>
              </td></tr>
            </table>
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
