"use client";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { routes } from "./constants";
import { usePathname } from "next/navigation";
import FreeCounter from "./FreeCounter";
const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
});
interface SidebarProps {
  apiLimitCounter: number;
  isPro: boolean;
}

export default function Sidebar({
  apiLimitCounter = 0,
  isPro = false,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14 ">
          <div className="relative w-8 h-8 mr-4">{/* Logo */}</div>
          <h1
            className={cn(
              "text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent",
              poppins.className
            )}
          >
            Prime AI
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-star font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transtion ",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.lable}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCounter={apiLimitCounter} isPro={isPro} />
    </div>
  );
}
