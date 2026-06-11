import { Resend } from "resend";
import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/contact";
import {
  buildContactInquiryEmail,
  parseContactInquiry,
  type ContactInquiryInput,
} from "@/lib/contact-inquiry";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    return NextResponse.json(
      { error: "Email servis nije podešen na serveru." },
      { status: 503 }
    );
  }

  let body: ContactInquiryInput;
  try {
    body = (await request.json()) as ContactInquiryInput;
  } catch {
    return NextResponse.json({ error: "Neispravan zahtev." }, { status: 400 });
  }

  const parsed = parseContactInquiry(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { subject, html, text } = buildContactInquiryEmail(parsed.data);
  const to = process.env.CONTACT_INQUIRY_TO_EMAIL ?? CONTACT.email;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: [to],
    replyTo: parsed.data.email,
    subject,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Došlo je do greške pri slanju. Pokušajte ponovo." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
