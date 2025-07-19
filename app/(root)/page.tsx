import HeroSection from "@/components/shared/HeroSection";
import ProblemSection from "@/components/shared/ProblemSection";
import VideoDisplay from "@/components/shared/VideoDisplay";
import SolutionSection from "@/components/shared/SolutionSection";
import FAQ from "@/components/shared/FAQ";
import ShareIdeasSection from "@/components/shared/ShareIdeasSection";
import { HeroSection as ShadcnHeroSection } from "@/components/blocks/hero-section";

export default function Home() {
  return (
    <div className="mt-24">
      <ShadcnHeroSection
        badge={{
          text: "New Feature",
          action: { text: "Learn More", href: "/about" },
        }}
        title="Welcome to The LINK Project"
        description="Learn English with personalized, AI-powered lessons built for the real world."
        actions={[
          { text: "Get Started", href: "/sign-up", variant: "default" },
          { text: "Learn More", href: "/about" },
        ]}
        image={{
          light: "/assets/Example3.png",
          dark: "/assets/Example3.png",
          alt: "App Example 3 preview",
        }}
      />
      <ProblemSection />
      <SolutionSection />
      <FAQ />
      <ShareIdeasSection />
    </div>
  );
}
