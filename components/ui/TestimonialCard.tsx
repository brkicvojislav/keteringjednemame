import type { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena: ${rating} od 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? "text-gold" : "text-charcoal/15"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.26l-4.94 2.45.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <StarRating rating={testimonial.rating} />

      <blockquote className="mt-4 flex-1 font-display text-xl italic leading-relaxed text-charcoal md:text-2xl">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <footer className="mt-6 border-t border-charcoal/10 pt-4">
        <p className="font-semibold text-charcoal">{testimonial.name}</p>
        <p className="mt-0.5 text-sm text-charcoal/55">{testimonial.event}</p>
      </footer>
    </article>
  );
}
