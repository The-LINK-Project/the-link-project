import HeroSection from "@/components/shared/HeroSection";
import ProblemSection from "@/components/shared/ProblemSection";
import VideoDisplay from "@/components/shared/VideoDisplay";
import SolutionSection from "@/components/shared/SolutionSection";
import MobileAppSection from "@/components/shared/MobileAppSection";
import TeamSection from "@/components/shared/TeamSection";
import EventsSection from "@/components/shared/EventsSection";
import FAQ from "@/components/shared/FAQ";
import ShareIdeasSection from "@/components/shared/ShareIdeasSection";
import ObjectivesMarquee from "@/components/shared/ObjectivesMarquee";
import Footer from "@/components/shared/Footer";

export default function Home() {
    return (
        <div className="font-body text-ink">
            <HeroSection />
            <VideoDisplay />
            <ObjectivesMarquee />
            <ProblemSection />
            <SolutionSection />
            <MobileAppSection />
            <TeamSection />
            <EventsSection />
            <FAQ />
            <ShareIdeasSection />
            <Footer />
        </div>
    );
}
