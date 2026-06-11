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
          subtitle="Sveže, ručno pripremljeno — biraj po kategoriji ili pogledaj celu ponudu."
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

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-charcoal/55">
          Cene su orijentacione i zavise od količine i datuma događaja. Za
          tačnu kalkulaciju pošaljite upit — odgovaramo u roku od 24 sata.
        </p>

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
