"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
export default function LandingHero() {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold space-y-5">
        <h1>PRIME AI for</h1>
        <div className="bg-gradient-to-r from-lime-500 to-green-400 bg-clip-text text-transparent">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot",
                "Code Generation",
                "Image Generation",
                "Video Generation",
                "Music Generation",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="gradient"
            className="md:text-lg p-4 md:p-6 rounded-full font-medium"
          >
            Try PRIME AI for free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required
      </div>
    </div>
  );
}
