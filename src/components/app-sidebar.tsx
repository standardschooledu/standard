"use client"


import { signOutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  Users,
  FileText,
  BarChart3,
  Bell,
  CreditCard,
  LucideProps,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronUp, User2 } from "lucide-react"
import { Button } from "./ui/button";
import Link from "next/link";
import { JSX } from "react";
import { useAuthStore } from "@/store/useStore";

type MenuItem = {
  title: string;
  url: string;
  icon: JSX.Element;
};

type Props = {
  menuItems: MenuItem[];
};


export function AppSidebar({menuItems}: Props) {
     const router = useRouter();
     const user = useAuthStore(state => state.user)

    const handleSignOut = async () => {
    try {
      await signOutUser();
      router.replace("/login"); // Optional redirect after logout
    } catch (err: any) {
      alert("Failed to log out: " + err.message);
    }
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-primary-foreground">
                  <Image src="/images/school_logo_enhanced_brightness-no-bg-Photoroom.png" alt="School Logo" width={40} height={40} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Standard School</span>
                  <span className="truncate text-xs">Admin Portal</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>School Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.title === "Dashboard"}>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gray-200"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" /> */}
                    <User />
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.email}</span>
                    <span className="truncate text-xs">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User2 />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button className="w-full rounded" onClick={handleSignOut}>Sign out</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
