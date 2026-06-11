import Image from "next/image";
import Link from "next/link";
import WaveDivider from "@/components/ui/WaveDivider";
import { OFFER_SECTION_LINK } from "@/lib/site";

const HERO_IMAGE = "/images/hero.webp";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen">
      <Image
        src={HERO_IMAGE}
        alt="Sveže pečene kiflice i domaća hrana pripremljena za ketering"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Blur on the text side — keeps food sharp on the right */}
      <div
        className="absolute inset-0 backdrop-blur-md [-webkit-mask-image:linear-gradient(to_right,black_50%,transparent_85%)] [mask-image:linear-gradient(to_right,black_50%,transparent_85%)]"
        aria-hidden="true"
      />

      {/* Darker gradient for title and button contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/68 to-charcoal/30"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 pb-20 pt-24 md:px-6 md:pb-24 md:pt-28">
        <div className="max-w-xl md:max-w-2xl lg:max-w-[55%]">
          <p className="mb-4 inline-block rounded-full bg-cream/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-wine">
            Ketering · Beograd i okolina
          </p>

          <h1 className="font-display text-5xl leading-[1.1] text-white md:text-6xl lg:text-7xl">
            Pravo domaće, od prave mame.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
            Kifle, rolati, mini pice i još mnogo toga. Sveže, ručno pripremljeno
            i dostavljeno na vrata.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={OFFER_SECTION_LINK.href}
              className="inline-flex items-center justify-center rounded-full bg-wine px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-wine/90"
            >
              Pogledaj {OFFER_SECTION_LINK.label.toLowerCase()}
            </Link>
            <Link
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Pošalji upit
            </Link>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
            <span aria-hidden="true">⭐</span>
            <span>600+ pratilaca na Instagramu</span>
          </p>
        </div>
      </div>

      <WaveDivider fillColor="#fef3e2" />
    </section>
  );
}
