"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MENU_CATEGORIES, menuItems } from "@/data/menu";
import MenuCard from "@/components/ui/MenuCard";
import MenuFilter from "@/components/ui/MenuFilter";
import SectionHeading from "@/components/ui/SectionHeading";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("Sve");

  const filteredItems = useMemo(() => {
    if (activeCategory === "Sve") {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="meni" className="bg-white px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Naša ponuda"
          title="Meni"
          subtitle="Sveže, ručno pripremljeno. Biraj po kategoriji ili pogledaj celu ponudu."
        />

        <MenuFilter
          categories={MENU_CATEGORIES}
          activeCategory={activeCategory}
          onFilter={setActiveCategory}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="py-12 text-center text-charcoal/60">
            Nema stavki u ovoj kategoriji.
          </p>
        )}

        <div className="mx-auto mt-12 max-w-2xl space-y-3 text-center text-sm leading-relaxed text-charcoal/55">
          <p>
            Minimalna porudžbina je <strong className="font-semibold text-charcoal/70">500 g po proizvodu</strong>
            {" "}(kroasani min. 1 kg). Svi proizvodi mogu biti <strong className="font-semibold text-charcoal/70">HALAL</strong>.
          </p>
          <p>
            Ketering dobijate u kutijama. Aranžiranje peciva na daske je moguće na
            zahtev (daske se vraćaju u roku od 3 dana).
          </p>
          <p>
            Za tačnu kalkulaciju pošaljite upit. Odgovaramo u roku od 24 sata.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="#kontakt"
            className="inline-flex items-center justify-center rounded-full bg-wine px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-wine/90"
          >
            Zatraži ponudu
          </Link>
        </div>
      </div>
    </section>
  );
}
