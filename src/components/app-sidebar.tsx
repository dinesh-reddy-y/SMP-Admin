"use client";

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
  Settings,
  Shield,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AppSidebar() {
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
            <SidebarMenuButton isActive>
              <Home />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Users />
              Users
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Shield />
              Admin
            </SidebarMenuButton>
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
              <LogOut />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
