import SectionHeading from "@/components/ui/SectionHeading";
import PackageInquiryButton from "@/components/ui/PackageInquiryButton";
import { cateringPackages, packageProducts } from "@/data/packages";

export default function PackagesSection() {
  return (
    <section id="paketi" className="scroll-mt-20 bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sve za vašu trpezu"
          title="Paketi za proslave bez brige"
          subtitle="Od domaćeg peciva do roštilja i salata — izaberite gotov paket prema broju gostiju i prepustite nama pripremu."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {cateringPackages.map((pkg) => {
            const name = `Paket ${pkg.id}`;
            const note = [
              `Zainteresovan/a sam za ${name.toLowerCase()} (${pkg.guests} odraslih), cena ${pkg.price} din.`,
              ...packageProducts.map((product, index) => `${product}: ${pkg.quantities[index]}`),
            ].join("\n");

            return (
              <article
                key={pkg.id}
                aria-labelledby={`paket-${pkg.id}`}
                className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-wine/10 bg-white shadow-[0_8px_30px_-8px_rgba(107,39,55,0.18)] transition-shadow hover:shadow-[0_12px_36px_-8px_rgba(107,39,55,0.25)]"
              >
                <div className="border-b border-wine/10 bg-cream/60 px-5 pb-5 pt-6">
                  <h3 id={`paket-${pkg.id}`} className="font-display text-3xl leading-tight text-wine">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-charcoal/70">Za {pkg.guests} odraslih</p>
                  <p className="mt-4 text-3xl font-bold tracking-tight tabular-nums text-wine">
                    {pkg.price} <span className="text-sm font-semibold tracking-normal">din</span>
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <dl className="mb-6 space-y-3 text-sm leading-snug">
                    {packageProducts.map((product, index) => (
                      <div key={product} className="flex items-baseline gap-1.5">
                        <dt className="min-w-0 text-charcoal/80">{product}</dt>
                        <span aria-hidden="true" className="min-w-2 flex-1 translate-y-[-3px] border-b border-dotted border-wine/25" />
                        <dd className="shrink-0 text-right font-semibold tabular-nums text-wine">{pkg.quantities[index]}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-auto">
                    <PackageInquiryButton note={note} packageName={name} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
