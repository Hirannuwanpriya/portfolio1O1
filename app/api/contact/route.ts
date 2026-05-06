import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_CONTACT } from "@/lib/site-contact";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ErrorResponse {
  ok: false;
  error: string;
}

interface SuccessResponse {
  ok: true;
}

const FROM_ADDRESS = "Hiran's Site <onboarding@resend.dev>";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 200,
  email: 320,
  subject: 200,
  message: 5000,
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validate(
  body: unknown,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;
  const { name, email, subject, message } = record;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(subject) ||
    !isNonEmptyString(message)
  ) {
    return { ok: false, error: "All fields are required" };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedSubject = subject.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length > LIMITS.name) {
    return { ok: false, error: "Name is too long" };
  }
  if (trimmedEmail.length > LIMITS.email) {
    return { ok: false, error: "Email is too long" };
  }
  if (trimmedSubject.length > LIMITS.subject) {
    return { ok: false, error: "Subject is too long" };
  }
  if (trimmedMessage.length > LIMITS.message) {
    return { ok: false, error: "Message is too long" };
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { ok: false, error: "Please enter a valid email address" };
  }

  return {
    ok: true,
    data: {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
    },
  };
}

function buildTextBody(data: ContactPayload): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function buildHtmlBody(data: ContactPayload): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\r?\n/g, "<br>");

  return `<!doctype html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111111; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3498DB;">${email}</a></p>
      <p style="margin: 0 0 8px;"><strong>Subject:</strong> ${subject}</p>
      <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 16px 0;">
      <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${message}</p>
    </div>
  </body>
</html>`;
}

export async function POST(
  request: Request,
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  let parsedBody: unknown;
  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const validation = validate(parsedBody);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not configured — cannot send email.",
    );
    return NextResponse.json(
      { ok: false, error: "Email service not configured" },
      { status: 500 },
    );
  }

  const data = validation.data;
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [SITE_CONTACT.email],
      replyTo: data.email,
      subject: `New contact form submission: ${data.subject}`,
      text: buildTextBody(data),
      html: buildHtmlBody(data),
    });

    if (result.error) {
      console.error("[contact] Resend returned an error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Failed to send message" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] Failed to send email via Resend:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send message" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
