import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Piši ili zovi",
    description:
      "Reci nam šta slaviš, koliko vas ima i šta želiš da poručiš. Viber, telefon ili formular, svejedno je.",
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

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-full min-h-[220px] flex-col rounded-2xl bg-white/70 p-6 text-center shadow-sm md:min-h-[240px] md:p-8">
      <span className="font-display text-3xl text-wine/30">{number}</span>
      <h3 className="mt-2 flex min-h-[3.25rem] items-center justify-center text-lg font-bold leading-snug text-charcoal md:text-xl">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
        {description}
      </p>
    </div>
  );
}

function DottedArrow() {
  return (
    <svg
      viewBox="0 0 80 16"
      fill="none"
      className="h-4 w-12 shrink-0 text-wine/40 md:w-16"
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
    <section id="kako" className="bg-[#fdf6ed] px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Kako funkcioniše"
          title="Tri koraka do savršene proslave"
          subtitle="Od prvog kontakta do stola punog hrane, jednostavno i bez stresa."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-4">
          {steps.flatMap((step, index) => {
            const card = (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            );

            if (index < steps.length - 1) {
              return [
                card,
                <div
                  key={`arrow-${step.number}`}
                  className="hidden items-center justify-center lg:flex"
                  aria-hidden="true"
                >
                  <DottedArrow />
                </div>,
              ];
            }

            return [card];
          })}
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
