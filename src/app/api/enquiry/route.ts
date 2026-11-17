import { NextResponse } from "next/server";
import { enquirySchema, type EnquiryResponse } from "@/lib/schemas";

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
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const { name, email, checkIn, checkOut, guests, message } = parsed.data;
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
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Ceylon Villa enquiry: ${name} (${checkIn} to ${checkOut})`,
        text,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, code: "server" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, code: "server" }, { status: 500 });
  }
}
