"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { LayoutDashboard, Sparkles } from "lucide-react";
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
        {isSignedIn ? (
          <Link href={"/dashboard"} className="flex justify-center">
            <Button
              variant="gradient"
              className="flex gap-2 md:text-lg p-4 md:p-6 rounded-full font-medium"
            >
              <LayoutDashboard />
              <p>Dashboard</p>
            </Button>
          </Link>
        ) : (
          <Link href={"/sign-up"} className="flex justify-center">
            <Button
              variant="gradient"
              className="flex gap-2 md:text-lg p-4 md:p-6 rounded-full font-medium"
            >
              <Sparkles />
              Try PRIME AI for free
            </Button>
          </Link>
        )}
        {!isSignedIn && (
          <div className="text-zinc-400 text-xs md:text-sm font-normal mt-1">
            No credit card required
          </div>
        )}
      </div>
    </div>
  );
}
