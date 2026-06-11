import type { SectionHeadingProps } from "@/lib/types";

function HandDrawnLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M2 5.5C28 2.5 52 7.5 78 4.5C104 1.5 128 6.5 154 3.5C172 1.5 186 4 198 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  const textColor = light ? "text-white" : "text-charcoal";
  const eyebrowColor = light ? "text-white/70" : "text-wine";
  const subtitleColor = light ? "text-white/75" : "text-charcoal/70";
  const lineColor = light ? "text-gold" : "text-wine";

  return (
    <div
      className={`mb-10 md:mb-14 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-widest ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}

      <h2 className={`font-display text-4xl leading-tight md:text-5xl ${textColor}`}>
        {title}
      </h2>

      <HandDrawnLine
        className={`mt-3 h-2 w-32 md:mt-4 ${lineColor} ${centered ? "mx-auto" : ""}`}
      />

      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
