import ContactSection from "@/components/sections/ContactSection";
import EventTypesSection from "@/components/sections/EventTypesSection";
import GallerySection from "@/components/sections/GallerySection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import MenuSection from "@/components/sections/MenuSection";
import OrderCalculatorSection from "@/components/sections/OrderCalculatorSection";
import PriceListSection from "@/components/sections/PriceListSection";
import { SHOW_MENU_SECTION } from "@/lib/site";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyUsSection from "@/components/sections/WhyUsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      {SHOW_MENU_SECTION && <MenuSection />}
      <EventTypesSection />
      <PriceListSection />
      <OrderCalculatorSection />
      <GallerySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
