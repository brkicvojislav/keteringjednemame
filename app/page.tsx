import ContactSection from "@/components/sections/ContactSection";
import EventTypesSection from "@/components/sections/EventTypesSection";
import GallerySection from "@/components/sections/GallerySection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import MenuSection from "@/components/sections/MenuSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyUsSection from "@/components/sections/WhyUsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <MenuSection />
      <HowItWorksSection />
      <EventTypesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
