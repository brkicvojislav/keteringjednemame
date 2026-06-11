"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import KiflaIcon from "@/components/ui/KiflaIcon";

const navLinks = [
  { label: "Ponuda", href: "#ponuda" },
  { label: "Meni", href: "#meni" },
  { label: "Galerija", href: "#galerija" },
  { label: "Događaji", href: "#dogadjaji" },
  { label: "Kontakt", href: "#kontakt" },
];

function Logo({
  light,
  onNavigate,
}: {
  light: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="#"
      className={`group flex items-center gap-2.5 transition-opacity hover:opacity-80 ${
        light ? "text-white" : "text-wine"
      }`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <KiflaIcon className="h-9 w-9 shrink-0" />
      <div className="leading-tight">
        <span className="font-display text-2xl font-bold tracking-tight">
          Ketering
        </span>
        <span
          className={`block text-xs font-semibold tracking-wide ${
            light ? "text-white/80" : "text-charcoal/70"
          }`}
        >
          jedne mame
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverHero(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const light = overHero && !isScrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          light
            ? "bg-gradient-to-b from-charcoal/75 via-charcoal/40 to-transparent"
            : "bg-white/95 shadow-md backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
          <Logo light={light} />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Glavna navigacija">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-wine ${
                  light ? "text-white/90 hover:text-white" : "text-charcoal/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#kontakt"
              className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex ${
                isScrolled
                  ? "bg-wine text-white hover:bg-wine/90"
                  : "bg-wine text-white hover:bg-wine/90"
              }`}
            >
              Naruči odmah
            </Link>

            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden ${
                light
                  ? "text-white hover:bg-white/10"
                  : "text-charcoal hover:bg-charcoal/5"
              }`}
              onClick={() => setIsOpen(true)}
              aria-label="Otvori meni"
              aria-expanded={isOpen}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-charcoal/50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobilna navigacija"
      >
        <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
          <Logo light={false} onNavigate={closeMenu} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-charcoal hover:bg-charcoal/5"
            onClick={closeMenu}
            aria-label="Zatvori meni"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-5 py-6" aria-label="Mobilna navigacija">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-lg font-semibold text-charcoal transition-colors hover:bg-cream hover:text-wine"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-charcoal/10 px-5 py-5">
          <Link
            href="#kontakt"
            className="flex w-full items-center justify-center rounded-full bg-wine px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-wine/90"
            onClick={closeMenu}
          >
            Naruči odmah
          </Link>
        </div>
      </div>
    </>
  );
}
