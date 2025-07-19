import { HeroSection } from "@/components/blocks/hero-section";
import ProblemSection from "@/components/shared/ProblemSection";
import SolutionSection from "@/components/shared/SolutionSection";
import FAQ from "@/components/shared/FAQ";
import ShareIdeasSection from "@/components/shared/ShareIdeasSection";

export default function Home() {
  return (
    <div className="mt-24">
      <HeroSection
        badge={{
          text: "New Feature",
          action: { text: "Learn More", href: "/about" },
        }}
        title="The LINK Project"
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
