"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "@/data/gallery";
import { prefetchGalleryImage } from "@/lib/gallery-prefetch";

interface LightboxImageProps {
  image: GalleryImage;
}

export default function LightboxImage({ image }: LightboxImageProps) {
  const [fullLoaded, setFullLoaded] = useState(false);

  useEffect(() => {
    setFullLoaded(false);
    prefetchGalleryImage(image.src);

    const fullImage = new window.Image();
    fullImage.decoding = "async";

    const handleLoad = () => setFullLoaded(true);
    fullImage.addEventListener("load", handleLoad);
    fullImage.src = image.src;

    if (fullImage.complete) {
      setFullLoaded(true);
    }

    return () => {
      fullImage.removeEventListener("load", handleLoad);
    };
  }, [image.src]);

  return (
    <div className="relative h-full w-full">
      {/* Thumb je već u kešu iz grida — odmah vidljiv dok puna verzija stiže */}
      <img
        src={image.thumbSrc}
        alt=""
        aria-hidden={fullLoaded}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${
          fullLoaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        decoding="async"
      />
      <img
        src={image.src}
        alt={image.alt}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${
          fullLoaded ? "opacity-100" : "opacity-0"
        }`}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
