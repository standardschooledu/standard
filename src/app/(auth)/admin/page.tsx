"use client";

import { OverviewCards } from "@/components/overview-cards";
import { RecentActivities } from "@/components/recent-activities";
import { EnrollmentChart } from "@/components/enrollment-charts";
import { QuickActions } from "@/components/quick-actions";

export default function Page() {
  return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="md:col-span-3">
                <OverviewCards />
              </div>
              {/* <div className="md:col-span-2">
                <EnrollmentChart />
              </div> */}
              <div className="md:col-span-1">
                <QuickActions />
              </div>
              {/* <div className="md:col-span-3">
                <RecentActivities />
              </div> */}
            </div>
          </div>
  );
}
