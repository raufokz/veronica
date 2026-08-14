import { Resend } from "resend";
import type { ParsedLead } from "@/lib/schemas";
import { siteConfig } from "@/lib/site-config";

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const interestLabel: Record<ParsedLead["interest_type"], string> = {
  buying: "Buying",
  selling: "Selling",
  investing: "Investing",
  valuation: "Home valuation",
  other: "General question",
};

export async function sendLeadNotification(lead: ParsedLead) {
  const resend = getResend();
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;
  if (!resend || !notifyEmail) {
    console.warn("[email] Skipped lead notification — RESEND_API_KEY or LEAD_NOTIFY_EMAIL not set.");
    return;
  }

  try {
    await resend.emails.send({
      from: `Veronica Medellin Website <leads@${new URL(siteConfig.siteUrl).hostname}>`,
      to: notifyEmail,
      replyTo: lead.email,
      subject: `New lead: ${lead.full_name} (${interestLabel[lead.interest_type]})`,
      html: `
        <h2>New website lead</h2>
        <p><strong>Name:</strong> ${escapeHtml(lead.full_name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>
        ${lead.phone ? `<p><strong>Phone:</strong> <a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></p>` : ""}
        <p><strong>Interested in:</strong> ${interestLabel[lead.interest_type]}</p>
        <p><strong>Preferred language:</strong> ${lead.preferred_language === "es" ? "Español" : "English"}</p>
        ${lead.source_page ? `<p><strong>Source page:</strong> ${escapeHtml(lead.source_page)}</p>` : ""}
        ${lead.message ? `<p><strong>Message:</strong><br/>${escapeHtml(lead.message).replace(/\n/g, "<br/>")}</p>` : ""}
      `,
    });
  } catch (err) {
    console.error("[email] Failed to send lead notification", err);
  }
}

export async function sendAutoResponder(lead: ParsedLead) {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] Skipped auto-responder — RESEND_API_KEY not set.");
    return;
  }

  const isEs = lead.preferred_language === "es";
  const subject = isEs
    ? "Gracias por tu mensaje — Veronica Medellin"
    : "Thanks for reaching out — Veronica Medellin";
  const body = isEs
    ? `<p>Hola ${escapeHtml(lead.full_name)},</p>
       <p>Recibí tu mensaje y te contactaré dentro de un día hábil. Si es urgente, puedes llamarme o escribirme al ${siteConfig.phoneDisplay}.</p>
       <p>— Veronica Medellin, REALTOR®</p>`
    : `<p>Hi ${escapeHtml(lead.full_name)},</p>
       <p>Got your message — I'll be in touch within one business day. If it's urgent, feel free to call or text me at ${siteConfig.phoneDisplay}.</p>
       <p>— Veronica Medellin, REALTOR®</p>`;

  try {
    await resend.emails.send({
      from: `Veronica Medellin <hello@${new URL(siteConfig.siteUrl).hostname}>`,
      to: lead.email,
      subject,
      html: body,
    });
  } catch (err) {
    console.error("[email] Failed to send auto-responder", err);
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
