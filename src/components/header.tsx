
"use client";

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Notifications } from "./notifications";
import { ThemeToggle } from './theme-toggle';

const getTitleFromPathname = (pathname: string): string => {
  if (pathname === '/dashboard') return 'Dashboard';

  const segments = pathname.split('/').filter(Boolean);
  const title = segments
    .map(segment =>
      segment
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join(' - ');

  return title;
};

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <Notifications />
        <ThemeToggle />
      </div>
    </header>
  );
}
