"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ORDER_INQUIRY_EVENT } from "@/lib/order-inquiry";
import { MENU_FORM_CATEGORY_ROWS } from "@/data/menu";
import type { FormData } from "@/lib/types";

const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  date: "",
  guestCount: "",
  categories: [],
  note: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const handleOrderInquiry = (event: Event) => {
      const note = (event as CustomEvent<{ note: string }>).detail?.note;
      if (note) {
        setFormData((prev) => ({ ...prev, note }));
        setIsSuccess(false);
      }
    };

    window.addEventListener(ORDER_INQUIRY_EVENT, handleOrderInquiry);
    return () => window.removeEventListener(ORDER_INQUIRY_EVENT, handleOrderInquiry);
  }, []);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ime je obavezno.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon je obavezan.";
    } else if (phoneDigits.length < 8) {
      newErrors.phone = "Unesite ispravan broj telefona.";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Unesite ispravnu email adresu.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          date: formData.date || undefined,
          guestCount: formData.guestCount || undefined,
          categories: formData.categories.join(", ") || undefined,
          note: formData.note || undefined,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setSubmitError(
          result?.error ??
            "Došlo je do greške. Pokušajte ponovo ili nas pozovite direktno."
        );
        return;
      }

      setIsSuccess(true);
      setFormData(initialFormData);
    } catch {
      setSubmitError("Došlo je do greške. Pokušajte ponovo ili nas pozovite direktno.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm md:p-10">
        <p className="font-display text-3xl text-white md:text-4xl">
          Hvala! Javljamo se uskoro. 🎉
        </p>
        <p className="mt-4 text-white/70">
          Proverite telefon. Obično odgovaramo u roku od 24 sata.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-sm font-semibold text-gold underline-offset-2 hover:underline"
        >
          Pošalji novi upit
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white/90">
          Ime i prezime <span className="text-gold">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={inputClass}
          placeholder="Vaše ime"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-gold">{errors.name}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-white/90">
            Telefon <span className="text-gold">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClass}
            placeholder="06x xxx xxxx"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-gold">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white/90">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass}
            placeholder="vaš@email.rs"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-gold">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-semibold text-white/90">
            Datum događaja
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateField("date", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="guestCount" className="mb-1.5 block text-sm font-semibold text-white/90">
            Broj gostiju
          </label>
          <input
            id="guestCount"
            type="text"
            value={formData.guestCount}
            onChange={(e) => updateField("guestCount", e.target.value)}
            className={inputClass}
            placeholder="npr. 30"
          />
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-white/90">
          Šta vas zanima?
        </legend>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MENU_FORM_CATEGORY_ROWS[0].map((category) => {
              const isChecked = formData.categories.includes(category);
              return (
                <label
                  key={category}
                  className={`flex cursor-pointer items-center justify-center rounded-full px-2.5 py-1.5 text-center text-xs font-semibold leading-tight transition-colors sm:px-3 ${
                    isChecked
                      ? "bg-gold text-charcoal"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => toggleCategory(category)}
                  />
                  {category}
                </label>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MENU_FORM_CATEGORY_ROWS[1].map((category) => {
              const isChecked = formData.categories.includes(category);
              return (
                <label
                  key={category}
                  className={`flex cursor-pointer items-center justify-center rounded-full px-2.5 py-1.5 text-center text-xs font-semibold leading-tight transition-colors sm:px-3 ${
                    isChecked
                      ? "bg-gold text-charcoal"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => toggleCategory(category)}
                  />
                  {category}
                </label>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {MENU_FORM_CATEGORY_ROWS[2].map((category) => {
              const isChecked = formData.categories.includes(category);
              return (
                <label
                  key={category}
                  className={`flex cursor-pointer items-center justify-center rounded-full px-2.5 py-1.5 text-center text-xs font-semibold leading-tight transition-colors sm:px-3 ${
                    isChecked
                      ? "bg-gold text-charcoal"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => toggleCategory(category)}
                  />
                  {category}
                </label>
              );
            })}
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="note" className="mb-1.5 block text-sm font-semibold text-white/90">
          Napomena
        </label>
        <textarea
          id="note"
          rows={4}
          value={formData.note}
          onChange={(e) => updateField("note", e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Recite nam više o događaju..."
        />
      </div>

      {submitError && (
        <p className="text-sm text-gold">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-charcoal transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isLoading ? "Šaljem..." : "Pošalji upit"}
      </button>
    </form>
  );
}
