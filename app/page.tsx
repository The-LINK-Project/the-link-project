import { Button } from "@/components/ui/button";
import Image from "next/image"
import HeroSection from "@/components/shared/HeroSection";
import ProblemSection from "@/components/shared/ProblemSection";

export default function Home() {
  return (
    <div className="mt-44">
      <HeroSection></HeroSection>
      <ProblemSection></ProblemSection>
    </div>
  );
}
