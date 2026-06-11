import Link from "next/link";
import { CONTACT } from "@/lib/contact";

const quickLinks = [
  { label: "Ponuda", href: "#ponuda" },
  { label: "Meni", href: "#meni" },
  { label: "Galerija", href: "#galerija" },
  { label: "Događaji", href: "#dogadjaji" },
  { label: "Kontakt", href: "#kontakt" },
];

function PlateIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M10 14c1.5-2 3.5-3 6-3s4.5 1 6 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 text-center md:grid-cols-3 md:gap-8 md:text-left">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center gap-2.5 text-white md:justify-start">
              <PlateIcon className="h-8 w-8 shrink-0 text-wine" />
              <div className="leading-tight">
                <span className="font-display text-xl font-bold">Ketering</span>
                <span className="block text-xs font-semibold tracking-wide text-white/60">
                  jedne mame
                </span>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/60 md:mx-0">
              Pravo domaće, ručno pripremljeno — za svaku proslavu u Beogradu i
              okolini.
            </p>
          </div>

          {/* Brzi linkovi */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Brzi linkovi
            </h3>
            <ul className="flex flex-col items-center gap-2.5 md:items-start">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Kontakt
            </h3>
            <ul className="flex flex-col items-center gap-2.5 text-sm md:items-start">
              <li>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="transition-colors hover:text-white"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-white"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-white/60">{CONTACT.workingHours}</li>
              <li className="text-white/60">{CONTACT.deliveryZone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40 md:text-left">
          © {new Date().getFullYear()} Ketering Jedne Mame · Sva prava zadržana
        </div>
      </div>
    </footer>
  );
}
