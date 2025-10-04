import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <ServicesOverview />
      <TestimonialsSection />
    </>
  );
}
