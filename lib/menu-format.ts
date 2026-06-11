import type { MenuItem } from "@/lib/types";

export function formatMenuPrice(item: MenuItem): string {
  if (item.priceUnit === "kg") {
    return `${item.price.toLocaleString("sr-RS")} RSD / kg`;
  }
  return `${item.price.toLocaleString("sr-RS")} RSD / pak.`;
}

export function formatMenuMinLabel(item: MenuItem): string {
  if (item.priceUnit === "kom") {
    return "Min. 1 pak.";
  }
  if (item.minQuantity >= 1) {
    return `Min. ${item.minQuantity.toLocaleString("sr-RS")} kg`;
  }
  return "Min. 500 g";
}
