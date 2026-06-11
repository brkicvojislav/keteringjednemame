export type ContactInquiryInput = {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  guestCount?: string;
  categories?: string;
  note?: string;
};

export type ContactInquiry = {
  name: string;
  phone: string;
  email?: string;
  date?: string;
  guestCount?: string;
  categories?: string;
  note?: string;
};

export function parseContactInquiry(
  input: ContactInquiryInput
): { ok: true; data: ContactInquiry } | { ok: false; error: string } {
  const name = input.name?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const date = input.date?.trim() ?? "";
  const guestCount = input.guestCount?.trim() ?? "";
  const categories = input.categories?.trim() ?? "";
  const note = input.note?.trim() ?? "";

  if (!name) {
    return { ok: false, error: "Ime je obavezno." };
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone) {
    return { ok: false, error: "Telefon je obavezan." };
  }
  if (phoneDigits.length < 8) {
    return { ok: false, error: "Unesite ispravan broj telefona." };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Unesite ispravnu email adresu." };
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      ...(email ? { email } : {}),
      ...(date ? { date } : {}),
      ...(guestCount ? { guestCount } : {}),
      ...(categories ? { categories } : {}),
      ...(note ? { note } : {}),
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;color:#444;">${escapeHtml(label)}</td><td style="padding:8px 0;vertical-align:top;color:#222;">${escapeHtml(value)}</td></tr>`;
}

export function buildContactInquiryEmail(data: ContactInquiry): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Novi upit sa sajta – ${data.name}`;

  const lines: [string, string][] = [
    ["Ime i prezime", data.name],
    ["Telefon", data.phone],
  ];

  if (data.email) lines.push(["Email", data.email]);
  if (data.date) lines.push(["Datum događaja", data.date]);
  if (data.guestCount) lines.push(["Broj gostiju", data.guestCount]);
  if (data.categories) lines.push(["Kategorije", data.categories]);
  if (data.note) lines.push(["Napomena", data.note]);

  const htmlRows = lines.map(([label, value]) => row(label, value)).join("");

  const html = `
    <div style="font-family:Nunito,Arial,sans-serif;max-width:560px;color:#222;">
      <h2 style="margin:0 0 16px;font-size:20px;color:#6b2737;">Novi upit sa sajta</h2>
      <table style="border-collapse:collapse;width:100%;">${htmlRows}</table>
    </div>
  `.trim();

  const text = lines.map(([label, value]) => `${label}: ${value}`).join("\n");

  return { subject, html, text };
}
