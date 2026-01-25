import HeroSection from "@/components/shared/HeroSection";
import ProblemSection from "@/components/shared/ProblemSection";
import VideoDisplay from "@/components/shared/VideoDisplay";
import SolutionSection from "@/components/shared/SolutionSection";
import FAQ from "@/components/shared/FAQ";
import ShareIdeasSection from "@/components/shared/ShareIdeasSection";
import LanguageOverlay from "@/components/shared/LanguageOverlay";

export default function Home() {
  return (
    <>
      <LanguageOverlay />

      <div className="mt-24">
        <HeroSection />
        <VideoDisplay />
        <ProblemSection />
        <SolutionSection />
        <FAQ />
        <ShareIdeasSection />
      </div>
    </>
  );
}
