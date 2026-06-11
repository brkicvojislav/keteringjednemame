"use client";

import { useCallback, useState, type TouchEvent } from "react";
import { testimonials } from "@/data/testimonials";
import TestimonialCard from "@/components/ui/TestimonialCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const total = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(((index % total) + total) % total);
    },
    [total]
  );

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
    setTouchStart(null);
  };

  const visibleDesktop = [
    testimonials[currentIndex % total],
    testimonials[(currentIndex + 1) % total],
    testimonials[(currentIndex + 2) % total],
  ];

  return (
    <section id="utisci" className="bg-cream px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Utisci"
          title="Šta kažu naši gosti"
          subtitle="Porodice, firme i mladi koji su nam ukazali poverenje."
        />

        {/* Mobile slider — 1 kartica */}
        <div
          className="md:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <TestimonialCard testimonial={testimonials[currentIndex]} />

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(currentIndex - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-wine shadow-sm transition-colors hover:bg-wine hover:text-white"
              aria-label="Prethodni utisak"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-6 bg-wine" : "w-2 bg-wine/30"
                  }`}
                  aria-label={`Utisak ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(currentIndex + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-wine shadow-sm transition-colors hover:bg-wine hover:text-white"
              aria-label="Sledeći utisak"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop — 3 kartice */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            {visibleDesktop.map((testimonial, i) => (
              <TestimonialCard key={`${testimonial.name}-${i}`} testimonial={testimonial} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(currentIndex - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-wine shadow-sm transition-colors hover:bg-wine hover:text-white"
              aria-label="Prethodni utisci"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "w-6 bg-wine" : "w-2 bg-wine/30"
                  }`}
                  aria-label={`Grupa utisaka od ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(currentIndex + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-wine shadow-sm transition-colors hover:bg-wine hover:text-white"
              aria-label="Sledeći utisci"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
