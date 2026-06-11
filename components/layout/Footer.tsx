import Link from "next/link";
import KiflaIcon from "@/components/ui/KiflaIcon";
import { CONTACT } from "@/lib/contact";
import { SITE_FOOTER_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 text-center md:grid-cols-3 md:gap-8 md:text-left">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center gap-2.5 text-white md:justify-start">
              <KiflaIcon className="h-8 w-8 shrink-0 text-wine" />
              <div className="leading-tight">
                <span className="font-display text-xl font-bold">Ketering</span>
                <span className="block text-xs font-semibold tracking-wide text-white/60">
                  jedne mame
                </span>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/60 md:mx-0">
              Pravo domaće, ručno pripremljeno za svaku proslavu u Beogradu i
              okolini.
            </p>
          </div>

          {/* Brzi linkovi */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Brzi linkovi
            </h3>
            <ul className="flex flex-col items-center gap-2.5 md:items-start">
              {SITE_FOOTER_LINKS.map((link) => (
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
