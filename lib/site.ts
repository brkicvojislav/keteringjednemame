export const SITE_NAME = "Ketering Jedne Mame";

export const SITE_DESCRIPTION =
  "Kifle, rolati, mini pice i još mnogo toga. Sveže, ručno pripremljeno za Beograd i okolinu, sa dostavom na vrata za svaku priliku.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_TAGLINE = "Pravo domaće, od prave mame.";

/** Privremeno sakrivena puna meni sekcija (kartice). Cenovnik ostaje vidljiv. */
export const SHOW_MENU_SECTION = false;

export const OFFER_SECTION_LINK = SHOW_MENU_SECTION
  ? { label: "Meni", href: "#meni" as const }
  : { label: "Cenovnik", href: "#cenovnik" as const };

export type SiteNavLink = { label: string; href: string };

/** Glavna navigacija — redosled prati tok stranice za neodlučne posetioce. */
export const SITE_NAV_LINKS: SiteNavLink[] = [
  { label: "Zašto mi", href: "#zasto-mi" },
  { label: "Događaji", href: "#dogadjaji" },
  OFFER_SECTION_LINK,
  { label: "Galerija", href: "#galerija" },
  { label: "Utisci", href: "#utisci" },
  { label: "Kontakt", href: "#kontakt" },
];

/** Footer uključuje i sekciju o poručivanju. */
export const SITE_FOOTER_LINKS: SiteNavLink[] = [
  { label: "Zašto mi", href: "#zasto-mi" },
  { label: "Događaji", href: "#dogadjaji" },
  OFFER_SECTION_LINK,
  { label: "Galerija", href: "#galerija" },
  { label: "Poručivanje", href: "#kako" },
  { label: "Utisci", href: "#utisci" },
  { label: "Kontakt", href: "#kontakt" },
];
