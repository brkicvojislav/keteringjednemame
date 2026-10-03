"use client";

import { dispatchOrderInquiry, scrollToContact } from "@/lib/order-inquiry";

export default function PackageInquiryButton({ note, packageName }: { note: string; packageName: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        dispatchOrderInquiry(note);
        scrollToContact();
      }}
      aria-label={`Zatraži ponudu za ${packageName.toLowerCase()}`}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine/90"
    >
      Zatraži ponudu
    </button>
  );
}
