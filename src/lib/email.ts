import { Resend } from "resend";
import {
  sanitizePlainText,
  sanitizeSingleLine,
  type ContactFormValues,
} from "@/lib/validation";

export type EmailResult =
  | { ok: true; provider: "resend" | "formspree" }
  | { ok: false; reason: "not-configured" | "provider-error"; detail?: string };

function buildEmailText(values: ContactFormValues): string {
  return [
    `Name: ${sanitizeSingleLine(values.name)}`,
    `Email: ${values.email}`,
    `Organization: ${sanitizeSingleLine(values.organization ?? "") || "—"}`,
    `Opportunity type: ${values.opportunityType}`,
    `Subject: ${sanitizeSingleLine(values.subject)}`,
    "",
    sanitizePlainText(values.message),
  ].join("\n");
}

function validHttpsEndpoint(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

export function isContactEmailConfigured(): boolean {
  const resendConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL,
  );
  return resendConfigured || Boolean(validHttpsEndpoint(process.env.FORMSPREE_ENDPOINT));
}

/**
 * Send through the first configured provider:
 * 1. Resend (preferred)
 * 2. Formspree (server-side fallback)
 */
export async function sendContactEmail(values: ContactFormValues): Promise<EmailResult> {
  const subject = `[Portfolio] ${sanitizeSingleLine(values.subject)} — ${values.opportunityType}`;
  const text = buildEmailText(values);

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (resendKey && from && to) {
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo: values.email,
        subject,
        text,
      });
      if (error) return { ok: false, reason: "provider-error", detail: error.message };
      return { ok: true, provider: "resend" };
    } catch (error) {
      return {
        ok: false,
        reason: "provider-error",
        detail: error instanceof Error ? error.message : "unknown Resend error",
      };
    }
  }

  const formspree = validHttpsEndpoint(process.env.FORMSPREE_ENDPOINT);
  if (formspree) {
    try {
      const response = await fetch(formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: sanitizeSingleLine(values.name),
          email: values.email,
          organization: sanitizeSingleLine(values.organization ?? ""),
          opportunityType: values.opportunityType,
          subject,
          message: text,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        return { ok: false, reason: "provider-error", detail: `Formspree responded ${response.status}` };
      }
      return { ok: true, provider: "formspree" };
    } catch (error) {
      return {
        ok: false,
        reason: "provider-error",
        detail: error instanceof Error ? error.message : "unknown Formspree error",
      };
    }
  }

  return { ok: false, reason: "not-configured" };
}
