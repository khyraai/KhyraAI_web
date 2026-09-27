import { createServerFn } from "@tanstack/react-start";

export interface DemoEmailPayload {
  email: string;
  name: string;
  companyName?: string;
  country?: string;
  industry?: string;
  automationGoal?: string;
  interactionVolume?: string;
  phone?: string;
  roleTitle?: string;
  teamSize?: string;
  useCasePainPoints?: string;
  preferredLanguages?: string[];
  isUpdate?: boolean;
}

export const sendDemoRequestEmail = createServerFn()
  .inputValidator((data: DemoEmailPayload) => {
    if (!data?.email || !data?.name) throw new Error("email and name are required");
    return data;
  })
  .handler(async (ctx) => {
    const payload = ctx.data;
    console.log("[send-demo-request-email] invoked for:", payload.email);

    const resendKey = process.env["RESEND_API_KEY"];
    if (!resendKey) {
      console.warn("[send-demo-request-email] RESEND_API_KEY not configured, operating in mock mode");
      return { ok: true as const };
    }

    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const sendRes = await resend.emails.send({
        from: "Khyra AI <noreply@khyraai.com>",
        to: payload.email,
        subject: payload.isUpdate ? "Your Demo Request Has Been Updated — Khyra AI" : "Thank you for requesting a Demo — Khyra AI",
        html: buildEmailHtml(payload),
      });

      if (sendRes.error) {
        console.error("[send-demo-request-email] Resend send failed:", sendRes.error);
        return { ok: false as const, error: "send_failed" as const };
      }

      console.log("[send-demo-request-email] email sent successfully");
      return { ok: true as const };
    } catch (err) {
      console.error("[send-demo-request-email] Resend exception:", err);
      return { ok: false as const, error: "send_exception" as const };
    }
  });

function buildEmailHtml(payload: DemoEmailPayload): string {
  const {
    name,
    companyName = "Not specified",
    country = "Not specified",
    industry = "Not specified",
    automationGoal = payload.useCasePainPoints || "Operational workflow automation",
    interactionVolume = payload.teamSize || "Not specified",
    isUpdate,
  } = payload;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Demo request received — Khyra AI</title>
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
                  <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Khyra AI</span>
                  <br>
                  <span style="color:rgba(255,255,255,0.70);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;display:inline-block;margin-top:4px;">
                    OPERATIONAL AI PLATFORM
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0;color:#1a3c34;font-size:26px;font-weight:700;line-height:1.2;">
              ${isUpdate ? 'Demo request updated' : 'Demo request received'}
            </h2>
            <div style="width:36px;height:3px;background:#c8a96e;border-radius:2px;margin:18px 0 22px;"></div>
            <p style="margin:0 0 8px;color:#1a3c34;font-size:15px;line-height:1.6;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 16px;color:#4b5563;font-size:15px;line-height:1.7;">
              ${isUpdate
                ? 'Your consultation request details have been updated. Our operations specialist will review your requirements and reach out within 24 hours.'
                : 'Thank you for your interest in Khyra AI. An operations specialist will review your workflow requirements and reach out within 24 hours to schedule your personalized demonstration.'}
            </p>

            <table cellpadding="0" cellspacing="0" style="width:100%;background:#f9f6f1;border-radius:12px;margin:0 0 20px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 14px;color:#1a3c34;font-size:15px;font-weight:700;">Request Summary</p>
                <table cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="padding:0 0 8px;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">Company</td>
                    <td style="padding:0 0 8px;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${companyName}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px;color:#6b7280;font-size:13px;vertical-align:top;">Country</td>
                    <td style="padding:0 0 8px;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${country}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px;color:#6b7280;font-size:13px;vertical-align:top;">Industry</td>
                    <td style="padding:0 0 8px;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${industry}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px;color:#6b7280;font-size:13px;vertical-align:top;">Estimated Volume</td>
                    <td style="padding:0 0 8px;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${interactionVolume}</td>
                  </tr>
                  <tr>
                    <td style="padding:0;color:#6b7280;font-size:13px;vertical-align:top;">Automation Goals</td>
                    <td style="padding:0;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${automationGoal}</td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
              If you have any urgent operational questions in the meantime, reply directly to this email or reach us at <a href="mailto:hello@khyraai.com" style="color:#1a3c34;font-weight:600;">hello@khyraai.com</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f5f2ed;padding:20px 40px;border-top:1px solid #e8e2d9;text-align:right;">
            <p style="margin:0;color:#6b7280;font-size:12px;">&copy; 2026 Khyra AI. All rights reserved.</p>
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
