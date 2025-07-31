// 'use client'
// import AuthGuard from "@/components/AuthGuard";
// import { Button } from "@/components/ui/button";
// import { signOutUser } from "@/lib/auth";
// import { useRouter } from "next/navigation";
// import React from "react";

// const page = () => {
//   const router = useRouter();

//   const handleSignOut = async () => {
//     try {
//       await signOutUser();
//       router.replace("/login"); // Optional redirect after logout
//     } catch (err: any) {
//       alert("Failed to log out: " + err.message);
//     }
//   };

//   return (
//     <AuthGuard>
//       <div>Admin page</div>
//       <Button onClick={handleSignOut}>log Out</Button>
//     </AuthGuard>
//   );
// };

// export default page;
"use client";
import AuthGuard from "@/components/AuthGuard";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { OverviewCards } from "@/components/overview-cards";
import { RecentActivities } from "@/components/recent-activities";
import { EnrollmentChart } from "@/components/enrollment-charts";
import { QuickActions } from "@/components/quick-actions";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Page() {
  return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="md:col-span-3">
                <OverviewCards />
              </div>
              <div className="md:col-span-2">
                <EnrollmentChart />
              </div>
              <div className="md:col-span-1">
                <QuickActions />
              </div>
              <div className="md:col-span-3">
                <RecentActivities />
              </div>
            </div>
          </div>
  );
}
