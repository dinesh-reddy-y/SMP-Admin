
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Users,
  Package,
  LogOut,
  ChevronRight,
  Home,
  LayoutGrid,
  UserPlus,
  UserCog,
  PictureInPicture,
  BadgePercent,
  TicketPercent,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function AppSidebar() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(pathname.startsWith('/users'));
  const [clientAppMenuOpen, setClientAppMenuOpen] = useState(pathname.startsWith('/client-app'));

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Package className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold">ShipMypack</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" passHref>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                <span>
                  <Home />
                  Dashboard
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem asChild>
            <Collapsible open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Users />
                  <span>User Section</span>
                  <ChevronRight className={cn("ml-auto h-4 w-4 transition-transform", userMenuOpen && "rotate-90")} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/users/new" passHref>
                      <SidebarMenuButton asChild isActive={pathname === "/users/new"}>
                        <span>
                          <UserPlus />
                          New Users
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/users/existing" passHref>
                      <SidebarMenuButton asChild isActive={pathname === "/users/existing"}>
                        <span>
                          <Users />
                          Existing Users
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/users/add-admin" passHref>
                      <SidebarMenuButton asChild isActive={pathname === "/users/add-admin"}>
                        <span>
                          <UserCog />
                          Add Admin
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>

          <SidebarMenuItem asChild>
            <Collapsible open={clientAppMenuOpen} onOpenChange={setClientAppMenuOpen}>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <LayoutGrid />
                  <span>Client App</span>
                  <ChevronRight className={cn("ml-auto h-4 w-4 transition-transform", clientAppMenuOpen && "rotate-90")} />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/client-app/carousel" passHref>
                      <SidebarMenuButton asChild isActive={pathname === "/client-app/carousel"}>
                        <span>
                          <PictureInPicture />
                          Carousel
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/client-app/ads" passHref>
                      <SidebarMenuButton asChild isActive={pathname === "/client-app/ads"}>
                        <span>
                          <BadgePercent />
                          Ads
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/client-app/promocodes" passHref>
                      <SidebarMenuButton asChild isActive={pathname === "/client-app/promocodes"}>
                        <span>
                          <TicketPercent />
                          Promocodes
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://picsum.photos/seed/avatar/100/100" data-ai-hint="profile avatar" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sm truncate">Admin User</span>
            <span className="text-xs text-muted-foreground truncate">admin@shipmypack.com</span>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>
                <LogOut />
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
