"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
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
        {isSignedIn ? (
          <div className="flex items-center gap-2">
            <Link href={"/dashboard"}>
              <Button variant="outline" className="rounded-full">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="rounded-md">
              <Link href={"/sign-in"}>Signin</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="rounded-md"
            >
              <Link href={"/sign-up"}>Get started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
