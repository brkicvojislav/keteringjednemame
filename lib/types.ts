export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  minQuantity: number;
  pricePerPiece: number;
  image: string;
}

export interface Testimonial {
  name: string;
  event: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface EventType {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  guestCount: string;
  categories: string[];
  note: string;
}

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export interface WaveDividerProps {
  fillColor: string;
  flipY?: boolean;
}
