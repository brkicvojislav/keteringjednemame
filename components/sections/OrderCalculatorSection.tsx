"use client";

import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  buildOrderInquiryNote,
  calculateCartTotal,
  calculateLineTotal,
  formatMoney,
  formatQuantityLabel,
  formatUnitPrice,
  getCartWarnings,
  getDefaultQuantity,
  getItemsForCategory,
  getMenuItemById,
  getMinQuantityLabel,
  getQuantityUnit,
  mergeCartLine,
  normalizeQuantity,
  parseQuantityInput,
  ORDER_CALCULATOR_CATEGORIES,
  QUANTITY_PRESETS_KG,
  validateAddToCart,
  type OrderCartLine,
} from "@/lib/order-calculator";
import { dispatchOrderInquiry, scrollToContact } from "@/lib/order-inquiry";

const labelClass = "mb-1.5 block min-h-5 text-sm font-semibold leading-5 text-charcoal";
const controlClass =
  "h-12 w-full rounded-xl border border-charcoal/15 bg-white px-4 text-sm text-charcoal transition-colors focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine";

function RemoveLineButton({
  itemName,
  onClick,
}: {
  itemName: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-wine ring-1 ring-wine/20 transition-colors hover:bg-wine/10 hover:ring-wine/35"
      aria-label={`Ukloni ${itemName}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    </button>
  );
}

type CalculatorCategory = (typeof ORDER_CALCULATOR_CATEGORIES)[number];

const initialCategory = ORDER_CALCULATOR_CATEGORIES[0];
const initialProduct = getItemsForCategory(initialCategory)[0];

export default function OrderCalculatorSection() {
  const [category, setCategory] = useState<CalculatorCategory>(initialCategory);
  const [productId, setProductId] = useState(initialProduct?.id ?? "");
  const [quantity, setQuantity] = useState<number>(
    initialProduct ? getDefaultQuantity(initialProduct) : 0.5
  );
  const [quantityInput, setQuantityInput] = useState(
    String(initialProduct ? getDefaultQuantity(initialProduct) : 0.5)
  );
  const [addError, setAddError] = useState("");
  const [lines, setLines] = useState<OrderCartLine[]>([]);

  const products = useMemo(() => getItemsForCategory(category), [category]);

  const selectedProduct = productId ? getMenuItemById(productId) : undefined;

  const handleCategoryChange = (nextCategory: CalculatorCategory) => {
    setCategory(nextCategory);
    const nextProducts = getItemsForCategory(nextCategory);
    const first = nextProducts[0];
    if (first) {
      const nextQuantity = getDefaultQuantity(first);
      setProductId(first.id);
      setQuantity(nextQuantity);
      setQuantityInput(String(nextQuantity));
    } else {
      setProductId("");
    }
    setAddError("");
  };

  const handleProductChange = (nextProductId: string) => {
    setProductId(nextProductId);
    const item = getMenuItemById(nextProductId);
    if (item) {
      const nextQuantity = getDefaultQuantity(item);
      setQuantity(nextQuantity);
      setQuantityInput(String(nextQuantity));
    }
    setAddError("");
  };

  const commitQuantityInput = () => {
    if (!selectedProduct) return;

    const parsed = parseQuantityInput(quantityInput);
    if (parsed === null) {
      const fallback = getDefaultQuantity(selectedProduct);
      setQuantity(fallback);
      setQuantityInput(String(fallback));
      return;
    }

    const normalized = normalizeQuantity(parsed, selectedProduct);
    setQuantity(normalized);
    setQuantityInput(String(normalized));
  };

  const handleQuantityChange = (raw: string) => {
    setQuantityInput(raw);
    const parsed = parseQuantityInput(raw);
    if (parsed !== null) {
      setQuantity(parsed);
    }
  };

  const handleAddLine = () => {
    if (!selectedProduct) {
      setAddError("Izaberite proizvod.");
      return;
    }

    commitQuantityInput();
    const parsed = parseQuantityInput(quantityInput);
    const quantityToAdd =
      parsed !== null ? normalizeQuantity(parsed, selectedProduct) : quantity;

    const validation = validateAddToCart(selectedProduct, quantityToAdd);
    if (!validation.ok) {
      setAddError(validation.message);
      return;
    }

    setQuantity(quantityToAdd);
    setQuantityInput(String(quantityToAdd));
    setLines((prev) => mergeCartLine(prev, selectedProduct.id, quantityToAdd));
    setAddError("");
  };

  const handleRemoveLine = (rowId: string) => {
    setLines((prev) => prev.filter((line) => line.rowId !== rowId));
  };

  const handleClear = () => {
    setLines([]);
    setAddError("");
  };

  const handleSendInquiry = () => {
    if (lines.length === 0) return;
    dispatchOrderInquiry(buildOrderInquiryNote(lines));
    scrollToContact();
  };

  const total = calculateCartTotal(lines);
  const warnings = getCartWarnings(lines);

  return (
    <section id="kalkulacija" className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Brza kalkulacija"
          title="Sastavi porudžbinu i vidi procenu"
          subtitle="Cene su informativne. Minimalna porudžbina 500 g po proizvodu (kroasani min. 1 kg). Dostava se dogovara posebno."
        />

        <div className="rounded-2xl border border-charcoal/10 bg-cream/40 p-5 shadow-sm md:p-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.7fr)_auto] lg:items-end">
            <div>
              <label htmlFor="calc-category" className={labelClass}>
                Kategorija
              </label>
              <select
                id="calc-category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as CalculatorCategory)}
                className={controlClass}
              >
                {ORDER_CALCULATOR_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="calc-product" className={labelClass}>
                Proizvod
              </label>
              <select
                id="calc-product"
                value={productId}
                onChange={(e) => handleProductChange(e.target.value)}
                className={controlClass}
              >
                {products.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="calc-quantity" className={labelClass}>
                Količina
                {selectedProduct && (
                  <span className="ml-1 font-normal text-charcoal/55">
                    ({getQuantityUnit(selectedProduct)})
                  </span>
                )}
              </label>
              <input
                id="calc-quantity"
                type="text"
                inputMode={selectedProduct?.priceUnit === "kom" ? "numeric" : "decimal"}
                value={quantityInput}
                onChange={(e) => handleQuantityChange(e.target.value)}
                onBlur={commitQuantityInput}
                placeholder={selectedProduct?.priceUnit === "kom" ? "1" : "1 ili 1,5"}
                className={controlClass}
              />
            </div>

            <div>
              <span className={`${labelClass} text-transparent`} aria-hidden="true">
                Dodaj
              </span>
              <button
                type="button"
                onClick={handleAddLine}
                className="h-12 w-full rounded-full bg-wine px-6 text-sm font-semibold text-white transition-colors hover:bg-wine/90 lg:w-auto lg:min-w-[7.5rem]"
              >
                + Dodaj
              </button>
            </div>
          </div>

          {selectedProduct && (
            <p className="mt-3 text-xs text-charcoal/55">
              {getMinQuantityLabel(selectedProduct)}
              {selectedProduct.priceUnit === "kg" && " · Ručno unesite ceo broj ili polovinu (0,5 · 1 · 1,5 · 2…)"}
            </p>
          )}

          {selectedProduct?.priceUnit === "kg" && (
            <div className="mt-3 flex flex-wrap gap-2">
              {QUANTITY_PRESETS_KG.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setQuantity(preset);
                    setQuantityInput(String(preset));
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    quantity === preset
                      ? "bg-wine text-white"
                      : "bg-white text-charcoal/70 ring-1 ring-charcoal/15 hover:bg-wine/10"
                  }`}
                >
                  {preset < 1 ? "500 g" : `${preset} kg`}
                </button>
              ))}
            </div>
          )}

          {addError && <p className="mt-3 text-sm text-wine">{addError}</p>}
        </div>

        <div className="mt-8">
          {lines.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-charcoal/15 bg-cream/30 px-6 py-10 text-center text-sm text-charcoal/55">
              Još nema stavki. Izaberi proizvod iznad i dodaj u porudžbinu.
            </p>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-2xl border border-charcoal/10 md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-cream/60 text-xs uppercase tracking-wide text-charcoal/55">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Proizvod</th>
                      <th className="px-5 py-3 font-semibold">Količina</th>
                      <th className="px-5 py-3 font-semibold">Cena</th>
                      <th className="px-5 py-3 font-semibold">Ukupno</th>
                      <th className="px-5 py-3" aria-label="Ukloni" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/10 bg-white">
                    {lines.map((line) => {
                      const item = getMenuItemById(line.itemId);
                      if (!item) return null;
                      const lineTotal = calculateLineTotal(item, line.quantity);
                      return (
                        <tr key={line.rowId}>
                          <td className="px-5 py-4 text-charcoal">{item.name}</td>
                          <td className="px-5 py-4 text-charcoal/80">
                            {formatQuantityLabel(line.quantity, item)}
                          </td>
                          <td className="px-5 py-4 text-charcoal/80">{formatUnitPrice(item)}</td>
                          <td className="px-5 py-4 font-semibold tabular-nums text-wine">
                            {formatMoney(lineTotal)}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <RemoveLineButton
                              itemName={item.name}
                              onClick={() => handleRemoveLine(line.rowId)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 md:hidden">
                {lines.map((line) => {
                  const item = getMenuItemById(line.itemId);
                  if (!item) return null;
                  const lineTotal = calculateLineTotal(item, line.quantity);
                  return (
                    <div
                      key={line.rowId}
                      className="rounded-2xl border border-charcoal/10 bg-cream/30 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-charcoal">{item.name}</p>
                        <RemoveLineButton
                          itemName={item.name}
                          onClick={() => handleRemoveLine(line.rowId)}
                        />
                      </div>
                      <dl className="mt-3 grid grid-cols-3 gap-2 text-xs sm:text-sm">
                        <div className="min-w-0">
                          <dt className="text-charcoal/55">Količina</dt>
                          <dd className="font-medium text-charcoal">
                            {formatQuantityLabel(line.quantity, item)}
                          </dd>
                        </div>
                        <div className="min-w-0">
                          <dt className="text-charcoal/55">Cena</dt>
                          <dd className="font-medium leading-snug text-charcoal">
                            {formatUnitPrice(item)}
                          </dd>
                        </div>
                        <div className="min-w-0 text-right">
                          <dt className="text-charcoal/55">Ukupno</dt>
                          <dd className="font-semibold tabular-nums text-wine">
                            {formatMoney(lineTotal)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-cream/50 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-charcoal/60">
                Stavki u porudžbini: <span className="font-semibold text-charcoal">{lines.length}</span>
              </p>
              <p className="mt-2 font-display text-3xl text-wine md:text-4xl">
                {formatMoney(total)}
              </p>
              <p className="mt-1 text-xs text-charcoal/55">
                Procenjena vrednost (bez dostave). Tačnu ponudu potvrđujemo posle upita.
              </p>
              {warnings.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-wine">
                  {warnings.map((warning) => (
                    <li key={warning}>⚠ {warning}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:min-w-[240px]">
              <button
                type="button"
                onClick={handleSendInquiry}
                disabled={lines.length === 0}
                className="inline-flex items-center justify-center rounded-full bg-wine px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-wine/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Pošalji upit sa ovom listom
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={lines.length === 0}
                className="inline-flex items-center justify-center rounded-full border border-charcoal/20 px-8 py-3.5 text-sm font-semibold text-charcoal/70 transition-colors hover:border-wine/30 hover:text-wine disabled:cursor-not-allowed disabled:opacity-50"
              >
                Isprazni porudžbinu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
