import { SidebarTrigger } from "@/components/ui/sidebar";
import { Notifications } from "./notifications";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="ml-auto">
        <Notifications />
      </div>
    </header>
  );
}
