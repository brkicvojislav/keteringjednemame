const prefetched = new Set<string>();

export function prefetchGalleryImage(src: string) {
  if (typeof window === "undefined" || prefetched.has(src)) return;

  prefetched.add(src);
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

export function prefetchGalleryNeighbors(
  index: number,
  images: readonly { src: string }[]
) {
  const total = images.length;
  if (total === 0) return;

  const offsets = [0, 1, -1, 2, -2];
  for (const offset of offsets) {
    const i = (index + offset + total) % total;
    prefetchGalleryImage(images[i].src);
  }
}

export function prefetchGalleryBatch(
  images: readonly { src: string }[],
  startIndex = 0
) {
  for (let i = startIndex; i < images.length; i += 1) {
    prefetchGalleryImage(images[i].src);
  }
}
