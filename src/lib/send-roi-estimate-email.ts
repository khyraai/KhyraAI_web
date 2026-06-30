import { createServerFn } from "@tanstack/react-start";

export interface ROIEmailPayload {
  email: string;
  name: string;
  // Inputs
  industryName: string;
  consultLabel: string;
  procedureLabel: string;
  agents: number;
  salary: number;
  callsPerDay: number;
  missedPct: number;
  workingDays: number;
  openHours: number;
  consultCharge: number;
  procedureCharge: number;
  // Computed outputs
  khyraMonthlyCost: number;
  humanMonthlyCost: number;
  netMonthlyBenefit: number;
  annualBenefit: number;
  roiPct: number;
  missedCallsMonth: number;
  recoveredRevenue: number;
  hoursFreed: number;
  callsHandled: number;
}

export const sendROIEstimateEmail = createServerFn()
  .inputValidator((data: ROIEmailPayload) => {
    if (!data?.email || !data?.name) throw new Error("email and name are required");
    return data;
  })
  .handler(async (ctx) => {
    const payload = ctx.data;
    console.log("[send-roi-estimate-email] invoked for:", payload.email);

    const [{ Resend }] = await Promise.all([import("resend")]);
    const resendKey = process.env["RESEND_API_KEY"];
    if (!resendKey) {
      console.error("[send-roi-estimate-email] RESEND_API_KEY not configured");
      return { ok: false as const, error: "missing_resend_key" as const };
    }

    const resend = new Resend(resendKey);
    let error: unknown = null;
    try {
      const sendRes = await resend.emails.send({
        from: "Khyra AI <noreply@khyraai.com>",
        to: payload.email,
        subject: "Your personalised Khyra AI savings estimate",
        html: buildROIEmailHtml(payload),
      });
      error = sendRes.error;
    } catch (err) {
      console.error("[send-roi-estimate-email] Resend send exception:", err);
      return { ok: false as const, error: "send_exception" as const };
    }

    if (error) {
      console.error("[send-roi-estimate-email] Resend send failed:", error);
      return { ok: false as const, error: "send_failed" as const };
    }
    console.log("[send-roi-estimate-email] email sent successfully to:", payload.email);
    return { ok: true as const };
  });

// ── Email HTML builder ────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtNum(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:0 0 10px;color:#6b7280;font-size:13px;width:200px;vertical-align:top;">${label}</td>
      <td style="padding:0 0 10px;color:#1a3c34;font-size:14px;font-weight:600;vertical-align:top;">${value}</td>
    </tr>`;
}

function buildROIEmailHtml(p: ROIEmailPayload): string {
  const isPositive = p.netMonthlyBenefit > 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Khyra AI Savings Estimate</title>
</head>
<body style="margin:0;padding:0;background:#eae8e3;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eae8e3;padding:40px 16px;">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);max-width:580px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1a3c34;padding:28px 40px;">
            <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Khyra AI</span><br>
            <span style="color:rgba(255,255,255,0.55);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;display:inline-block;margin-top:6px;">AI-FIRST VOICE PLATFORM FOR INDIA</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0;color:#1a3c34;font-size:26px;font-weight:700;line-height:1.2;">Your personalised savings estimate</h2>
            <div style="width:36px;height:3px;background:#c8a96e;border-radius:2px;margin:16px 0 20px;"></div>

            <p style="margin:0 0 8px;color:#1a3c34;font-size:15px;line-height:1.6;">Hi <strong>${p.name}</strong>,</p>
            <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.7;">
              Based on your inputs, here is a conservative estimate of how much Khyra AI could save your business every year.
            </p>

            <!-- Hero saving -->
            <table cellpadding="0" cellspacing="0" style="width:100%;background:#1a3c34;border-radius:14px;margin:0 0 24px;">
              <tr><td style="padding:28px 32px;">
                <p style="margin:0 0 4px;color:rgba(255,255,255,0.6);font-size:11px;text-transform:uppercase;letter-spacing:1.5px;">Estimated annual saving</p>
                <p style="margin:0;color:#ffffff;font-size:42px;font-weight:700;letter-spacing:-1px;">${isPositive ? fmtINR(p.annualBenefit) : "—"}</p>
                ${isPositive ? `<p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:14px;">${fmtINR(p.netMonthlyBenefit)}/month net after Khyra's cost</p>
                <div style="margin-top:16px;display:inline-block;background:rgba(255,255,255,0.15);border-radius:99px;padding:6px 16px;color:#ffffff;font-size:13px;font-weight:600;">${p.roiPct}% ROI on staff cost</div>` : ""}
              </td></tr>
            </table>

            <!-- Inputs used -->
            <table cellpadding="0" cellspacing="0" style="width:100%;background:#f9f6f1;border-radius:12px;margin:0 0 20px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 14px;color:#1a3c34;font-size:15px;font-weight:700;">Your inputs</p>
                <table cellpadding="0" cellspacing="0" style="width:100%;">
                  ${row("Industry", p.industryName)}
                  ${row("Working hours", `${p.openHours} hrs/day, ${p.workingDays} days/wk`)}
                  ${row("Front-desk staff", `${p.agents} ${p.agents === 1 ? "person" : "people"}`)}
                  ${row("Monthly salary / person", fmtINR(p.salary))}
                  ${row("Inbound calls / day", `${fmtNum(p.callsPerDay)} calls`)}
                  ${row("Estimated missed calls", `${p.missedPct}% of total`)}
                  ${row(p.consultLabel, fmtINR(p.consultCharge))}
                  ${row(p.procedureLabel, fmtINR(p.procedureCharge))}
                </table>
              </td></tr>
            </table>

            <!-- Results breakdown -->
            <table cellpadding="0" cellspacing="0" style="width:100%;background:#f9f6f1;border-radius:12px;margin:0 0 24px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 14px;color:#1a3c34;font-size:15px;font-weight:700;">Savings breakdown</p>
                <table cellpadding="0" cellspacing="0" style="width:100%;">
                  ${row("Khyra monthly cost", fmtINR(p.khyraMonthlyCost))}
                  ${row("Current staff salaries / mo", fmtINR(p.humanMonthlyCost))}
                  ${row("Calls handled by Khyra / mo", fmtNum(p.callsHandled))}
                  ${row("Missed calls recovered / mo", fmtNum(p.missedCallsMonth))}
                  ${row("Revenue recovered / mo", fmtINR(p.recoveredRevenue))}
                  ${row("Staff hours freed / mo", `${fmtNum(p.hoursFreed)} hrs`)}
                  ${row("Net monthly benefit", fmtINR(p.netMonthlyBenefit))}
                </table>
                <p style="margin:16px 0 0;color:#6b7280;font-size:12px;line-height:1.6;">
                  Assumptions: Khyra handles 92% of calls autonomously. One human kept for escalations.
                  We conservatively assume 40% of recovered missed calls convert to a consultation/inquiry, and 20% of those convert to a main transaction. Khyra pricing: ₹12,000/mo base + ₹2.50/call.
                </p>
              </td></tr>
            </table>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="width:100%;">
              <tr><td align="center">
                <a href="https://khyraai.com/book-demo" style="display:inline-block;background:#1a3c34;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:99px;">Book a personalised demo →</a>
              </td></tr>
            </table>
            <p style="margin:16px 0 0;color:#6b7280;font-size:13px;text-align:center;line-height:1.6;">
              Most customers see payback within the first month. Our team will walk you through a live demo tailored to your use case.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f5f2ed;padding:20px 40px;border-top:1px solid #e8e2d9;text-align:right;">
            <p style="margin:0;color:#6b7280;font-size:12px;">&copy; 2026 Khyra AI</p>
            <p style="margin:4px 0 0;"><a href="https://khyraai.com" style="color:#1a3c34;font-size:12px;text-decoration:none;font-weight:500;">khyraai.com</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
