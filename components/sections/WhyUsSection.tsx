import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    title: "Pravi domaći ukus",
    description:
      "Recepti iz porodičnih sveski, bez konzervansa i prečica.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
        <path
          d="M16 6L6 14v10h8v-6h4v6h8V14L16 6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 22h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Tačni kao švajcarski sat",
    description:
      "Dogovoreni termin je svetinja. Uvek na vreme, uvek kompletno.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M16 10v6l4 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Za svaku priliku",
    description:
      "Od kućnih proslava do korporativnih događaja za 200+ gostiju.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
        <path
          d="M8 20c0-4 3.5-8 8-8s8 4 8 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 24h12M12 12l2-4M20 12l-2-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="22" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Sveže na dan dostave",
    description:
      "Ništa se ne priprema danima unapred. Sveže se sprema na dan dostave.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
        <path
          d="M10 18c0-6 4-10 6-12 2 2 6 6 6 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 22h16M12 26h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function WhyUsSection() {
  return (
    <section id="zasto-mi" className="bg-cream px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Zašto baš mi"
          title="Pripremamo kao za svoju porodicu"
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl p-4 transition-shadow duration-300 hover:shadow-md md:p-6"
            >
              <div className="mb-4 text-wine">{feature.icon}</div>
              <h3 className="mb-2 text-base font-bold text-charcoal md:text-lg">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
