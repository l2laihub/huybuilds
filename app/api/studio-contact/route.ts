import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactPayload } from "@/app/studio/lib/contact-schema";
import { CONTACT } from "@/app/studio/config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "required" }, { status: 400 });
  }

  const result = validateContactPayload(body);
  if (!result.ok) {
    // Honeypot hits look successful to the bot, but we send nothing.
    if (result.code === "honeypot") return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, code: result.code }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Graceful fallback: tell the client to use the sms link instead.
    return NextResponse.json({ ok: false, code: "no_email" }, { status: 503 });
  }

  const to = process.env.STUDIO_CONTACT_TO || CONTACT.email;
  const from = process.env.STUDIO_CONTACT_FROM || "HuyBuilds Studio <studio@huybuilds.app>";
  const d = result.data;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: d.email || undefined,
      subject: `New studio inquiry — ${d.name}${d.business ? ` (${d.business})` : ""}`,
      text: [
        `Name: ${d.name}`,
        `Phone: ${d.phone || "—"}`,
        `Email: ${d.email || "—"}`,
        `Business: ${d.business || "—"}`,
        `Type: ${d.businessType || "—"}`,
        "",
        d.message,
      ].join("\n"),
    });
  } catch {
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
