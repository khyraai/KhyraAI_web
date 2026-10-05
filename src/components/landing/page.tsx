import { TopBanner, SiteNav } from "@/components/site-nav";
import { HeroSection } from "@/components/landing/sections/HeroSection";
import { TrustStrip } from "@/components/landing/sections/TrustStrip";
import { WorkflowExecutionSection } from "@/components/landing/sections/WorkflowExecutionSection";
import { ProductShowcaseSection } from "@/components/landing/sections/ProductShowcaseSection";
import { PillarsSection } from "@/components/landing/sections/PillarsSection";
import { IndustryShowcaseSection } from "@/components/landing/sections/IndustryShowcaseSection";
import { FeaturesSection } from "@/components/landing/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection";
import { LiveDemoSection } from "@/components/landing/sections/LiveDemoSection";
import { FAQSection } from "@/components/landing/sections/FAQSection";
import { FinalCTASection } from "@/components/landing/sections/FinalCTASection";
import { FooterSection } from "@/components/landing/sections/FooterSection";

export function Index() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <SiteNav />
      {/* 1. Global Positioning & 10-Second Hero with Live Workflow Simulation */}
      <HeroSection />
      {/* 2. Operational Reality & Industry Breadth Strip */}
      <TrustStrip />
      {/* 3. The Core Execution Engine: Understand → Decide → Execute → Update → Escalate */}
      <WorkflowExecutionSection />
      {/* 4. Single Operational Workspace: The System Behind Every Interaction */}
      <ProductShowcaseSection />
      {/* 5. Operational Roles & Use Cases (Support, Reception, Sales, Scheduling, Dispatch) */}
      <PillarsSection />
      {/* 5. 5 Focused Industries with Role Mapping, Workflows, and System Connectors */}
      <IndustryShowcaseSection />
      {/* 6. Platform Architecture, Integrations, and Security */}
      <FeaturesSection />
      {/* 7. 6-Step Enterprise Implementation Methodology */}
      <HowItWorksSection />
      {/* 8. commented Interactive Live Prototype (Test without account creation) */}
      {/* <LiveDemoSection />  */}
      {/* 9. Honest Enterprise FAQs */}
      <FAQSection />
      {/* 10. High-Conversion Lead Capture CTA */}
      <FinalCTASection />
      {/* 11. Global Footer */}
      <FooterSection />
    </main>
  );
}
