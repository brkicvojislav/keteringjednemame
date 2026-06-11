import { CONTACT } from "@/lib/contact";

export interface GalleryImage {
  id: string;
  src: string;
  thumbSrc: string;
  alt: string;
  featured: boolean;
}

const galleryManifest: Omit<GalleryImage, "src" | "thumbSrc">[] = [
  {
    id: "g01",
    alt: "Raznovrsno domaće pecivo na drvenoj dasci za ketering",
    featured: true,
  },
  {
    id: "g02",
    alt: "Zalogaji u obliku cigare sa dip sosom na drvenoj dasci",
    featured: true,
  },
  {
    id: "g03",
    alt: "Mini pice pripremljene za pečenje",
    featured: true,
  },
  {
    id: "g04",
    alt: "Kiflice sa makom, susamom i sirom u kutiji za dostavu",
    featured: true,
  },
  {
    id: "g05",
    alt: "Slani rolati sa spanaćem i paprikom na tanjiru",
    featured: true,
  },
  {
    id: "g06",
    alt: "Slatka ponuda sa kroasanima i krem pufnicama",
    featured: true,
  },
  {
    id: "g07",
    alt: "Lisnati štapići sa susamom i slanim prelivom",
    featured: true,
  },
  {
    id: "g08",
    alt: "Pita spiral u tepsiji, pečena do zlatne boje",
    featured: true,
  },
  {
    id: "g09",
    alt: "Slani rolati spremni za serviranje u kutijama",
    featured: false,
  },
  {
    id: "g10",
    alt: "Kiflice, pite i peciva u kutijama za ketering",
    featured: true,
  },
  {
    id: "g11",
    alt: "Bavarske kiflice sa šunkom i salatom",
    featured: false,
  },
  {
    id: "g12",
    alt: "Miks bavarskih, slanih i posnih sendvičića",
    featured: false,
  },
  {
    id: "g13",
    alt: "Mini sendvičići sa maslinama za proslavu",
    featured: false,
  },
  {
    id: "g14",
    alt: "Ukrasno slatko pecivo u kutiji",
    featured: false,
  },
  {
    id: "g15",
    alt: "Kiflica sa sirom i viršlom, presek",
    featured: false,
  },
  {
    id: "g16",
    alt: "Kiflica sa domaćim džemom, presek",
    featured: false,
  },
  {
    id: "g17",
    alt: "Sveže pečena lepinja na roštilju",
    featured: false,
  },
];

function toGalleryImage(item: (typeof galleryManifest)[number]): GalleryImage {
  return {
    ...item,
    src: `/images/gallery/${item.id}.webp`,
    thumbSrc: `/images/gallery/${item.id}-thumb.webp`,
  };
}

export const galleryImages: GalleryImage[] = galleryManifest.map(toGalleryImage);

export const featuredGalleryImages = galleryImages.filter((image) => image.featured);

export const INSTAGRAM_URL = CONTACT.instagram;
