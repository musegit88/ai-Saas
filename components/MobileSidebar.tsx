"use client";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface MobileSidebarProps {
  apiLimitCounter: number;
  isPro: boolean;
}

export default function MobileSidebar({
  apiLimitCounter = 0,
  isPro = false,
}: MobileSidebarProps) {
  const [isStart, setIsStart] = useState(false);
  useEffect(() => {
    setIsStart(true);
  }, []);
  if (!isStart) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isPro} apiLimitCounter={apiLimitCounter} />
      </SheetContent>
    </Sheet>
  );
}
