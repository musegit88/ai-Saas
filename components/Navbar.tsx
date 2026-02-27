import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";
import { getApiLimmit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

export default async function Navbar() {
  const apiLimitCounter = await getApiLimmit();
  const isPro = await checkSubscription();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} apiLimitCounter={apiLimitCounter} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
