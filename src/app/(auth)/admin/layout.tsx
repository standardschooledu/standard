"use client";
import React from 'react'
import AuthGuard from "@/components/AuthGuard";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Bell, BookOpen, Calendar, CreditCard, FileText, GraduationCap, Home, MessageSquare, Settings, Users } from 'lucide-react';

// Menu items
const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <Home />,
  },
  {
    title: "Teachers",
    url: "/admin/teachers",
    icon: <Users />,
  }
]


const layout = ({children}: {children: React.ReactNode}) => {
  return (
        <AuthGuard>
      <SidebarProvider>
        <AppSidebar menuItems={menuItems} />
        <SidebarInset>
          <header className="flex sticky top-0 z-50 bg-white border-b mb-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">School Management</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}

export default layout