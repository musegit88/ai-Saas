"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import ProModal from "./ProModal";
import { useProModal } from "@/hooks/useProModal";

interface FreeCounterProps {
  apiLimitCounter: number;
  isPro: boolean;
}

export default function FreeCounter({
  apiLimitCounter = 0,
  isPro = false,
}: FreeCounterProps) {
  const proModal = useProModal();
  const [started, SetStarted] = useState(false);
  useEffect(() => {
    SetStarted(true);
  }, []);
  if (!started) {
    return null;
  }
  if (isPro) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-4">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCounter} / {MAX_FREE_COUNTS} Free Generation
            </p>
            <Progress
              className="h-4 "
              value={(apiLimitCounter / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            className="w-full"
            variant="gradient"
            onClick={proModal.onOpen}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
