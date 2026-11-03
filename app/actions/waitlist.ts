"use server";

/**
 * Waitlist signup → Google Sheet (via a Google Apps Script web app; see scripts/google-sheets-waitlist.gs).
 *
 * Env (server-only, never exposed to the browser):
 *   WAITLIST_WEBHOOK_URL  the Apps Script web-app URL ending in /exec
 *   WAITLIST_SECRET       any long random string; must match SECRET in the Apps Script
 */

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ROLES = new Set(["customer", "provider"]);

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  // Honeypot: real people never see or fill this field; bots usually do.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "You're on the list. We'll email you at launch." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = String(formData.get("role") ?? "customer");
  const source = String(formData.get("source") ?? "").slice(0, 100);

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "Enter a valid email address, like name@example.com." };
  }

  const url = process.env.WAITLIST_WEBHOOK_URL;
  const secret = process.env.WAITLIST_SECRET;
  if (!url || !secret) {
    console.error("[waitlist] WAITLIST_WEBHOOK_URL or WAITLIST_SECRET is not set");
    return { status: "error", message: "Signups aren't open yet. Please try again shortly." };
  }

  try {
    // Apps Script answers POST with a 302 to the result; fetch follows it automatically.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        email,
        role: ROLES.has(role) ? role : "customer",
        source,
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; duplicate?: boolean; error?: string } | null;

    if (!res.ok || !data?.ok) {
      console.error("[waitlist] sheet rejected the signup", res.status, data?.error);
      return { status: "error", message: "We couldn't save your email. Please try again." };
    }

    return {
      status: "success",
      message: data.duplicate
        ? "You're already on the list. We'll email you at launch."
        : "You're on the list. We'll email you at launch.",
    };
  } catch (err) {
    console.error("[waitlist] request failed", err);
    return { status: "error", message: "We couldn't reach our server. Check your connection and try again." };
  }
}
