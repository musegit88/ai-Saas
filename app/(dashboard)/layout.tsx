import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimmit } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCounter = await getApiLimmit();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0  bg-gray-900 md:w-72">
        <Sidebar apiLimitCounter={apiLimitCounter} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
