import Header from "@/components/Header";
import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { Settings2 } from "lucide-react";

export default async function SettingsPage() {
  const isPro = await checkSubscription();
  return (
    <div>
      <Header
        title="Settings"
        description=""
        icon={Settings2}
        iconColor="text-gary-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground space-y-4">
          {isPro
            ? "You are currently on PrimePRO plan"
            : "You are currently on free plan"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
}
