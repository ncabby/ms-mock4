import { Hero } from "@/components/home/Hero";
import { ServiceCards } from "@/components/home/ServiceCards";
import { AboutSection } from "@/components/home/AboutSection";
import { NewsCards } from "@/components/home/NewsCards";
import { MissionSection } from "@/components/home/MissionSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <AboutSection />
      <NewsCards />
      <MissionSection />
    </>
  );
}
