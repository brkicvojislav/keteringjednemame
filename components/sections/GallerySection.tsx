"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import LightboxImage from "@/components/gallery/LightboxImage";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  featuredGalleryImages,
  galleryImages,
  INSTAGRAM_URL,
} from "@/data/gallery";
import {
  prefetchGalleryBatch,
  prefetchGalleryImage,
  prefetchGalleryNeighbors,
} from "@/lib/gallery-prefetch";

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefetchStarted = useRef(false);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryImages.length
    );
  }, []);

  const openLightbox = (imageId: string) => {
    const index = galleryImages.findIndex((image) => image.id === imageId);
    if (index >= 0) {
      setLightboxIndex(index);
    }
  };

  const handleGridPointerDown = (imageId: string) => {
    const image = galleryImages.find((item) => item.id === imageId);
    if (image) {
      prefetchGalleryImage(image.src);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || lightboxIndex === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX === undefined) return;

    const delta = touchEndX - touchStartX.current;
    const swipeThreshold = 48;

    if (delta > swipeThreshold) {
      goToPrevious();
    } else if (delta < -swipeThreshold) {
      goToNext();
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefetchStarted.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || prefetchStarted.current) return;

        prefetchStarted.current = true;
        const schedule =
          typeof window.requestIdleCallback === "function"
            ? window.requestIdleCallback
            : (cb: IdleRequestCallback) => window.setTimeout(cb, 200);

        schedule(() => prefetchGalleryBatch(galleryImages));
      },
      { rootMargin: "200px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    prefetchGalleryNeighbors(lightboxIndex, galleryImages);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goToNext, goToPrevious]);

  const activeImage =
    lightboxIndex !== null ? galleryImages[lightboxIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="galerija"
      className="bg-white px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Naš rad"
          title="Galerija"
          subtitle="Pogledaj kako izgleda kada domaća hrana sretne pravu proslavu."
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {featuredGalleryImages.map((image, index) => {
            const isLastAloneOnMobile =
              index === featuredGalleryImages.length - 1 &&
              featuredGalleryImages.length % 2 !== 0;

            return (
              <button
                key={image.id}
                type="button"
                className={`group relative aspect-square overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2 ${
                  isLastAloneOnMobile ? "col-span-2 md:col-span-1" : ""
                }`}
                onPointerDown={() => handleGridPointerDown(image.id)}
                onClick={() => openLightbox(image.id)}
                aria-label={`Uvećaj sliku: ${image.alt}`}
              >
                <Image
                  src={image.thumbSrc}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={
                    isLastAloneOnMobile
                      ? "(max-width: 768px) 100vw, 33vw"
                      : "(max-width: 768px) 50vw, 33vw"
                  }
                />

                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-8 w-8 text-white"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {galleryImages.length > featuredGalleryImages.length && (
          <p className="mt-6 text-center text-sm text-charcoal/55">
            Klikni na sliku i listaj dalje za još{" "}
            {galleryImages.length - featuredGalleryImages.length} fotografija.
          </p>
        )}

        <p className="mt-10 text-center">
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-wine transition-colors hover:text-wine/80"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Prati nas na Instagramu
          </Link>
        </p>
      </div>

      {lightboxIndex !== null && activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Uvećana slika galerije"
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={closeLightbox}
            aria-label="Zatvori"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <p className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </p>

          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:left-4"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Prethodna slika"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-4"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Sledeća slika"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative h-[70vh] w-full max-w-4xl touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <LightboxImage key={activeImage.id} image={activeImage} />
          </div>
        </div>
      )}
    </section>
  );
}
