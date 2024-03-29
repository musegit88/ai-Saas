import { Button } from "@/components/ui/button";
import Link from "next/link";

import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingContent from "@/components/LandingContent";

export default function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
