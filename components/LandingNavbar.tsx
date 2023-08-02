"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
});

export default function landingNavbar() {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative ">
          <h1
            className={cn(
              "text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent",
              poppins.className
            )}
          >
            PRIME AI
          </h1>
        </div>
      </Link>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
