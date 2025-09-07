"use client";

import { useState } from "react";
import { OverviewCards } from "@/components/overview-cards";
import { RecentActivities } from "@/components/recent-activities";
import { EnrollmentChart } from "@/components/enrollment-charts";
import { QuickActions } from "@/components/quick-actions";
import { AddStudentModal } from "@/components/add-student-modal";

// export default function StudentDashboardOverview() {
  // state to track modal open/close

//   return (
//     <div>
//       {/* Pass down a function to QuickAction so button can open modal */}
//       <QuickAction onQuickActionClick={() => setIsAddStudentOpen(true)} />

//       {/* The modal itself */}
//       <AddStudentModal 
//         open={isAddStudentOpen} 
//         onClose={() => setIsAddStudentOpen(false)} 
//       />
//     </div>
//   )
// }

export default function Page() {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)

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
                 {/* Pass down a function to QuickAction so button can open modal */}
                <QuickActions onQuickActionClick={() => setIsAddStudentOpen(true)} />

                {/* The modal itself */}
                <AddStudentModal 
                  isOpen={isAddStudentOpen} 
                  onClose={() => setIsAddStudentOpen(false)}
                   onStudentAdded={() => {
                  // ✅ do something after student is added
                  console.log("Student added successfully!")
                  setIsAddStudentOpen(false) // close modal after adding
                }}
                />
              </div>
              {/* <div className="md:col-span-3">
                <RecentActivities />
              </div> */}
            </div>
          </div>
  );
}
