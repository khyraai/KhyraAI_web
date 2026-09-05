import { TopBanner, SiteNav } from "@/components/site-nav";
import { FinalCTASection } from "@/components/landing/sections/FinalCTASection";
import { FeaturesSection } from "@/components/landing/sections/FeaturesSection";
import { FAQSection } from "@/components/landing/sections/FAQSection";
import { FooterSection } from "@/components/landing/sections/FooterSection";
import { HeroSection } from "@/components/landing/sections/HeroSection";
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection";
import { ImpactSection } from "@/components/landing/sections/ImpactSection";
import { LiveDemoSection } from "@/components/landing/sections/LiveDemoSection";
import { PillarsSection } from "@/components/landing/sections/PillarsSection";
import { TrustStrip } from "@/components/landing/sections/TrustStrip";
import { IndustryShowcaseSection } from "@/components/landing/sections/IndustryShowcaseSection";

export function Index() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />
      <HeroSection />
      <TrustStrip />
      <PillarsSection setActiveTab={() => {}} />
      <HowItWorksSection />
      <IndustryShowcaseSection />
      <LiveDemoSection />
      <FinalCTASection />
      <FeaturesSection />
      <ImpactSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
