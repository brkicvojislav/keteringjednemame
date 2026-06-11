import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Piši ili zovi",
    description:
      "Reci nam šta slaviš, koliko vas ima i šta želiš da poručiš. Viber, telefon ili formular — svejedno.",
  },
  {
    number: "02",
    title: "Dogovorimo sve",
    description:
      "Šaljemo kalkulaciju, potvrđujemo termin i dogovaramo detalje. Bez komplikacija.",
  },
  {
    number: "03",
    title: "Ti uživaš, mi donosimo",
    description:
      "Sveže, upakovano i spremno na tvojim vratima. Ostaje ti samo da poređaš na sto.",
  },
];

function DottedArrow() {
  return (
    <svg
      viewBox="0 0 80 16"
      fill="none"
      className="hidden h-4 w-16 shrink-0 text-wine/40 lg:block"
      aria-hidden="true"
    >
      <line
        x1="2"
        y1="8"
        x2="68"
        y2="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      <path
        d="M72 8l-6-4v8l6-4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="bg-[#fdf6ed] px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Kako funkcioniše"
          title="Tri koraka do savršene proslave"
          subtitle="Od prvog kontakta do stola punog hrane — jednostavno i bez stresa."
        />

        <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-1 items-center gap-4">
              <div className="flex-1 rounded-2xl bg-white/70 p-6 text-center shadow-sm md:p-8">
                <span className="font-display text-3xl text-wine/30">
                  {step.number}
                </span>
                <h3 className="mt-2 text-xl font-bold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && <DottedArrow />}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="#kontakt"
            className="inline-flex items-center justify-center rounded-full bg-wine px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-wine/90"
          >
            Pošalji upit
          </Link>
        </div>
      </div>
    </section>
  );
}
