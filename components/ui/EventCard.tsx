"use client";

import Image from "next/image";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import type { EventType } from "@/lib/types";

interface EventCardProps {
  event: EventType;
}

function EventIcon({ icon }: { icon: string }) {
  const icons: Record<string, ReactNode> = {
    cake: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
        <path
          d="M8 22h16v2H8v-2zM10 14h12v8H10v-8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 14v-3a2 2 0 014 0v3M16 14v-4a2 2 0 014 0v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    building: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
        <rect x="8" y="10" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 16h2M18 16h2M12 20h2M18 20h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 10V7h4v3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    rings: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
        <circle cx="13" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    graduation: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
        <path d="M6 14l10-6 10 6-10 6-10-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M26 14v6M16 20v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
        <path
          d="M16 6l1.5 5.5L23 13l-5.5 1.5L16 20l-1.5-5.5L9 13l5.5-1.5L16 6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M24 22l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
    home: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
        <path
          d="M16 7L7 15v9h7v-5h4v5h7v-9L16 7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return <>{icons[icon] ?? icons.home}</>;
}

export default function EventCard({ event }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setIsExpanded((prev) => !prev);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <article
      className="group/event relative aspect-[5/4] cursor-pointer overflow-hidden rounded-2xl sm:aspect-[4/3] md:cursor-default"
      data-expanded={isExpanded ? "true" : undefined}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${event.name}. ${isExpanded ? event.description : "Dodirnite za više detalja."}`}
    >
      <Image
        src={event.image}
        alt=""
        fill
        className="object-cover transition-transform duration-500 group-hover/event:scale-105 md:group-hover/event:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-charcoal/70 transition-colors duration-300 group-data-[expanded=true]/event:bg-charcoal/82 md:bg-charcoal/60 md:group-hover/event:bg-charcoal/78"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-3 py-4 text-center text-white transition-all duration-300 sm:gap-3 sm:px-4 sm:py-5 group-data-[expanded=true]/event:justify-start group-data-[expanded=true]/event:gap-2 group-data-[expanded=true]/event:pt-5 group-data-[expanded=true]/event:pb-4 md:group-hover/event:justify-start md:group-hover/event:gap-2.5 md:group-hover/event:pt-6 md:group-hover/event:pb-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-gold ring-1 ring-white/10">
          <EventIcon icon={event.icon} />
        </div>

        <h3 className="shrink-0 font-display text-base leading-tight text-balance sm:text-xl md:text-2xl">
          {event.name}
        </h3>

        <p className="max-h-0 overflow-hidden text-xs leading-snug text-white/90 opacity-0 transition-all duration-300 sm:text-sm group-data-[expanded=true]/event:max-h-32 group-data-[expanded=true]/event:opacity-100 md:group-hover/event:max-h-36 md:group-hover/event:opacity-100">
          {event.description}
        </p>
      </div>
    </article>
  );
}
