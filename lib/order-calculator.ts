import { menuItems, MENU_CATEGORIES } from "@/data/menu";
import { formatMenuPrice } from "@/lib/menu-format";
import type { MenuItem } from "@/lib/types";

export const ORDER_CALCULATOR_CATEGORIES = MENU_CATEGORIES.filter(
  (category) => category !== "Sve"
);

export type OrderCartLine = {
  rowId: string;
  itemId: string;
  quantity: number;
};

export function getMenuItemById(itemId: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === itemId);
}

export function getItemsForCategory(category: string): MenuItem[] {
  return menuItems
    .filter((item) => item.category === category)
    .sort((a, b) => a.name.localeCompare(b.name, "sr"));
}

export function getQuantityUnit(item: MenuItem): "kg" | "pak." {
  return item.priceUnit === "kom" ? "pak." : "kg";
}

export function getDefaultQuantity(item: MenuItem): number {
  return item.priceUnit === "kom" ? 1 : item.minQuantity;
}

export function getQuantityStep(item: MenuItem): number {
  return item.priceUnit === "kom" ? 1 : 0.5;
}

export function isValidQuantityStep(item: MenuItem, quantity: number): boolean {
  if (!Number.isFinite(quantity)) return false;
  if (item.priceUnit === "kom") {
    return Number.isInteger(quantity);
  }
  return Math.abs(quantity * 2 - Math.round(quantity * 2)) < 0.001;
}

export function normalizeQuantity(value: number, item: MenuItem): number {
  if (!Number.isFinite(value) || value <= 0) {
    return getDefaultQuantity(item);
  }

  if (item.priceUnit === "kom") {
    return Math.max(1, Math.round(value));
  }

  const stepped = Math.round(value * 2) / 2;
  return Math.max(item.minQuantity >= 1 ? 1 : 0.5, stepped);
}

export function parseQuantityInput(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  if (!normalized) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function formatQuantityLabel(quantity: number, item: MenuItem): string {
  const unit = getQuantityUnit(item);
  if (unit === "pak.") {
    return `${quantity} ${quantity === 1 ? "pak." : "pak."}`;
  }
  if (quantity < 1) {
    return `${Math.round(quantity * 1000)} g`;
  }
  const formatted = Number.isInteger(quantity)
    ? quantity.toString()
    : quantity.toLocaleString("sr-RS", { maximumFractionDigits: 1 });
  return `${formatted} kg`;
}

export function formatUnitPrice(item: MenuItem): string {
  if (item.priceUnit === "kom") {
    return `${item.price.toLocaleString("sr-RS")} RSD / pak.`;
  }
  return `${item.price.toLocaleString("sr-RS")} RSD / kg`;
}

export function formatMoney(amount: number): string {
  return `${Math.round(amount).toLocaleString("sr-RS")} RSD`;
}

export function calculateLineTotal(item: MenuItem, quantity: number): number {
  return item.price * quantity;
}

export function getMinQuantityLabel(item: MenuItem): string {
  if (item.priceUnit === "kom") {
    return "Min. 1 pak.";
  }
  if (item.minQuantity >= 1) {
    return `Min. ${item.minQuantity.toLocaleString("sr-RS")} kg`;
  }
  return "Min. 500 g";
}

export function isBelowMinimum(item: MenuItem, quantity: number): boolean {
  return quantity < item.minQuantity;
}

export function validateAddToCart(
  item: MenuItem,
  quantity: number
): { ok: true } | { ok: false; message: string } {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return { ok: false, message: "Unesite ispravnu količinu." };
  }

  if (item.priceUnit === "kom" && !Number.isInteger(quantity)) {
    return { ok: false, message: "Za pakovanja unesite ceo broj." };
  }

  if (item.priceUnit === "kg" && !isValidQuantityStep(item, quantity)) {
    return {
      ok: false,
      message: "Za količinu u kg unesite ceo broj ili polovinu (npr. 1 ili 1,5).",
    };
  }

  if (isBelowMinimum(item, quantity)) {
    return {
      ok: false,
      message: `Minimalna količina za ovaj proizvod je ${getMinQuantityLabel(item).replace("Min. ", "")}.`,
    };
  }

  return { ok: true };
}

export function mergeCartLine(
  lines: OrderCartLine[],
  itemId: string,
  quantity: number
): OrderCartLine[] {
  const existing = lines.find((line) => line.itemId === itemId);
  if (existing) {
    return lines.map((line) =>
      line.itemId === itemId
        ? { ...line, quantity: line.quantity + quantity }
        : line
    );
  }
  return [
    ...lines,
    { rowId: `${itemId}-${Date.now()}`, itemId, quantity },
  ];
}

export function getCartWarnings(lines: OrderCartLine[]): string[] {
  const warnings: string[] = [];

  for (const line of lines) {
    const item = getMenuItemById(line.itemId);
    if (item && isBelowMinimum(item, line.quantity)) {
      warnings.push(`${item.name}: ispod minimuma (${getMinQuantityLabel(item)})`);
    }
  }

  return warnings;
}

export function calculateCartTotal(lines: OrderCartLine[]): number {
  return lines.reduce((sum, line) => {
    const item = getMenuItemById(line.itemId);
    if (!item) return sum;
    return sum + calculateLineTotal(item, line.quantity);
  }, 0);
}

export function buildOrderInquiryNote(lines: OrderCartLine[]): string {
  const total = calculateCartTotal(lines);
  const itemLines = lines
    .map((line) => {
      const item = getMenuItemById(line.itemId);
      if (!item) return null;
      const lineTotal = calculateLineTotal(item, line.quantity);
      return `- ${item.name} — ${formatQuantityLabel(line.quantity, item)} — ${formatMoney(lineTotal)}`;
    })
    .filter(Boolean)
    .join("\n");

  return [
    "Brza kalkulacija sa sajta:",
    "",
    itemLines,
    "",
    `Procenjena vrednost: ${formatMoney(total)}`,
    "(Dostava se dogovara posebno. Tačnu ponudu potvrđujemo posle upita.)",
  ].join("\n");
}

export function formatProductOptionLabel(item: MenuItem): string {
  return `${item.name} (${formatMenuPrice(item)})`;
}

export const QUANTITY_PRESETS_KG = [0.5, 1, 2, 5] as const;
