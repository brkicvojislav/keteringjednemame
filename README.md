# Ketering Jedne Mame

Jednostranični sajt za domaći ketering — Next.js 15+, TypeScript, Tailwind CSS v4.

## Pokretanje lokalno

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000).

## Environment varijable

Kopiraj `.env.local.example` u `.env.local` i popuni:

| Varijabla | Opis |
|-----------|------|
| `RESEND_API_KEY` | API ključ sa [Resend](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Pošiljalac, npr. `Ketering <noreply@tvoj-domen.rs>` (domen mora biti verifikovan u Resend-u) |
| `CONTACT_INQUIRY_TO_EMAIL` | Mejl na koji stižu upiti (opciono; podrazumevano iz `lib/contact.ts`) |
| `NEXT_PUBLIC_SITE_URL` | Produkcijski URL (npr. `https://tvoj-domen.rs`) — za SEO i OG slike |

Za lokalni test bez domena koristi `RESEND_FROM_EMAIL=Ketering <onboarding@resend.dev>` — Resend tada šalje samo na mejl povezan sa tvojim nalogom.

## Struktura projekta

```
app/              → layout, page, globals.css, SEO (robots, sitemap, OG)
components/
  layout/         → Navbar, Footer
  sections/       → Hero, WhyUs, Menu, HowItWorks, Events, Gallery, Testimonials, Contact
  ui/             → SectionHeading, MenuCard, EventCard, ContactForm...
data/             → menu.ts, events.ts, testimonials.ts, gallery.ts
lib/              → types.ts, contact.ts, site.ts
public/images/    → lokalne slike (zamena za Unsplash placeholder-e)
```

## Izmena sadržaja

- **Meni i cene** → `data/menu.ts`
- **Tipovi događaja** → `data/events.ts`
- **Utisci** → `data/testimonials.ts`
- **Galerija** → `data/gallery.ts`
- **Kontakt podaci** → `lib/contact.ts`

## Build i lint

```bash
npm run build
npm run lint
```

## Deploy na Vercel

1. Push projekat na GitHub
2. Importuj repo na [vercel.com](https://vercel.com)
3. U Vercel → Settings → Environment Variables dodaj:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CONTACT_INQUIRY_TO_EMAIL` (opciono)
   - `NEXT_PUBLIC_SITE_URL` (npr. `https://ketering-jedne-mame.vercel.app`)
4. Deploy — svaki push na `main` automatski deployuje

### Custom domen

Vercel → Settings → Domains → dodaj domen i prati DNS uputstva.

## Zamena placeholder slika

Trenutno se koriste Unsplash slike. Za produkciju:

1. Dodaj slike u `public/images/`
2. Ažuriraj putanje u `data/menu.ts`, `data/events.ts`, `data/gallery.ts` i `HeroSection.tsx`
3. Primer: `/images/hero.jpg` umesto Unsplash URL-a

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Resend (kontakt forma → email)
- Vercel (hosting)
