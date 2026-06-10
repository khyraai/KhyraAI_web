import { useState } from "react";
import { TopBanner, SiteNav } from "@/components/site-nav";
import { FinalCTASection } from "@/components/landing/sections/FinalCTASection";
import { FeaturesSection } from "@/components/landing/sections/FeaturesSection";
import { FAQSection } from "@/components/landing/sections/FAQSection";
import { FooterSection } from "@/components/landing/sections/FooterSection";
import { HeroSection } from "@/components/landing/sections/HeroSection";
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection";
import { ImpactSection } from "@/components/landing/sections/ImpactSection";
import { PillarsSection } from "@/components/landing/sections/PillarsSection";
import { TrustStrip } from "@/components/landing/sections/TrustStrip";
import { UseCasesSection } from "@/components/landing/sections/UseCasesSection";
import type { UseCaseTab } from "@/data/landing";

export function Index() {
  const [activeUseCaseTab, setActiveUseCaseTab] = useState<UseCaseTab>("Front Desk");

  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />
      <HeroSection />
      <TrustStrip />
      <PillarsSection setActiveTab={setActiveUseCaseTab} />
      <HowItWorksSection />
      <FinalCTASection />
      <FeaturesSection />
      <UseCasesSection activeTab={activeUseCaseTab} setActiveTab={setActiveUseCaseTab} />
      <ImpactSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
