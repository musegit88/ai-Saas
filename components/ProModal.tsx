import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "@/hooks/useProModal";
import { Badge } from "./ui/badge";
import { tabs } from "@/constants";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import {toast} from "react-hot-toast"

export default function ProModal() {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-center gap-y-4 pb-2 ">
            <div className="flex items-center gap-x-2 py-1 font-bold">
              Upgrade to Prime
              <Badge variant="gradient" className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tabs.map((tab) => (
              <Card
                key={tab.lable}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tab.bgColor)}>
                    <tab.icon className={cn("w-4 h-4", tab.color)} />
                  </div>
                  <div className="text-sm font-semibold">{tab.lable}</div>
                </div>
                <Check className="w-4 h-4" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            variant="gradient"
            className="w-full"
          >
            Upgrade <Zap className="w-4 h-4 fill-white ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
