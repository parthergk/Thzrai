import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { Footer } from "@/components/home/Footer";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import  FooterImage  from "@/components/home/FooterImage";
import FounderQuoteSection from "@/components/FounderQuoteSection";

export default function Home() {
  return (
    <div className="mt-16 w-full">
      <BackgroundBeamsWithCollision>
        <HeroSection />
      </BackgroundBeamsWithCollision>
      <FeaturesSection />
      <HowItWorksSection />
     <FounderQuoteSection/>
      {/* <BenefitsSection /> */}
      <FooterImage/>
      <Footer />
    </div>
  );
}
