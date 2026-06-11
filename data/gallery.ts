import { CONTACT } from "@/lib/contact";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "/images/hero.webp",
    alt: "Sveže pečene kiflice na plehu",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop",
    alt: "Rolati sa pršutom na tanjiru",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80&auto=format&fit=crop",
    alt: "Mini pice sa sirom i bosiljkom",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&auto=format&fit=crop",
    alt: "Voćna torta za proslavu",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop",
    alt: "Elegantno servirani sto za događaj",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80&auto=format&fit=crop",
    alt: "Raznovrsni zalogaji na bufetu",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80&auto=format&fit=crop",
    alt: "Proslava sa gostima za stolom",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop",
    alt: "Domaća hrana pripremljena za goste",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80&auto=format&fit=crop",
    alt: "Pečena peciva i kolači na stolu",
  },
];

export const INSTAGRAM_URL = CONTACT.instagram;
