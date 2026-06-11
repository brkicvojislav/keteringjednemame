export const ORDER_INQUIRY_EVENT = "ketering-order-inquiry";

export function dispatchOrderInquiry(note: string): void {
  window.dispatchEvent(
    new CustomEvent(ORDER_INQUIRY_EVENT, { detail: { note } })
  );
}

export function scrollToContact(): void {
  const target = document.getElementById("kontakt");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.hash = "kontakt";
}
