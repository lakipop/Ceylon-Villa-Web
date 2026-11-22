import { NextResponse } from "next/server";
import { enquirySchema, type EnquiryResponse } from "@/lib/schemas";
import { SITE } from "@/lib/site";

const TEST_RECIPIENT = "lakindu.once@gmail.com";
const DEFAULT_RECIPIENTS: readonly string[] = [
  ...SITE.contacts.map((contact) => contact.email),
  TEST_RECIPIENT,
];

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const rateBucket = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || now > entry.resetAt) {
    rateBucket.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export async function POST(request: Request): Promise<NextResponse<EnquiryResponse>> {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "validation" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "validation" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;
  const envRecipients = process.env.ENQUIRY_TO_EMAIL
    ?.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  const toEmails = envRecipients && envRecipients.length > 0 ? envRecipients : [...DEFAULT_RECIPIENTS];

  const { name, email, checkIn, checkOut, guests, message } = parsed.data;
  const subject = `CEYLON VILLA enquiry: ${name} (${checkIn} to ${checkOut})`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Guests: ${guests}`,
    message ? `Message: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    if (apiKey && fromEmail && toEmails.length > 0) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmails,
          reply_to: email,
          subject,
          text,
        }),
      });

      if (!res.ok) {
        return NextResponse.json({ ok: false, code: "server" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    // Fallback: FormSubmit AJAX (no API key required; 1-time activation on primary email)
    const primaryRecipient = TEST_RECIPIENT;
    const ccRecipients = SITE.contacts.map((contact) => contact.email).join(",");
    const referer = request.headers.get("origin") || request.headers.get("referer") || "https://ceylon-villa-web.vercel.app";

    const fallbackRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(primaryRecipient)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: referer,
      },
      body: JSON.stringify({
        name,
        email,
        "Check-in": checkIn,
        "Check-out": checkOut,
        Guests: String(guests),
        Message: message || "—",
        _subject: subject,
        _replyto: email,
        _cc: ccRecipients,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!fallbackRes.ok) {
      return NextResponse.json({ ok: false, code: "server" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, code: "server" }, { status: 500 });
  }
}
