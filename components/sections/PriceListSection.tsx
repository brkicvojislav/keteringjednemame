import Link from "next/link";
import { menuItems, PRICE_LIST_GROUPS } from "@/data/menu";
import { formatMenuPrice } from "@/lib/menu-format";
import type { MenuItem } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";

function PriceListRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex items-baseline gap-2 py-1.5 sm:py-2">
      <span className="min-w-0 text-xs leading-snug text-charcoal/85 sm:text-sm">
        {item.name}
      </span>
      <span
        className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-charcoal/20"
        aria-hidden="true"
      />
      <span className="shrink-0 text-xs font-bold tabular-nums text-wine sm:text-sm">
        {formatMenuPrice(item)}
      </span>
    </li>
  );
}

export default function PriceListSection() {
  const groups = PRICE_LIST_GROUPS.map((group) => ({
    title: group.title,
    items: menuItems.filter((item) => group.categories.includes(item.category)),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="cenovnik" className="bg-cream px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Pregled cena" title="Cenovnik" />

        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-8">
          <div className="columns-1 gap-x-12 md:columns-2">
            {groups.map((group) => (
              <div key={group.title} className="mb-8 break-inside-avoid last:mb-0">
                <h3 className="mb-3 border-b border-wine/15 pb-2 font-display text-base text-wine md:text-lg">
                  {group.title}
                </h3>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <PriceListRow key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

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
            Cene su informativnog karaktera. Za tačnu ponudu kontaktirajte nas.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="#kalkulacija"
            className="inline-flex items-center justify-center rounded-full border-2 border-wine px-8 py-3.5 text-sm font-semibold text-wine transition-colors hover:bg-wine/5"
          >
            Brza kalkulacija
          </Link>
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
