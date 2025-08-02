import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calendar, Bell } from "lucide-react"

const actions = [
  {
    title: "Add New Student",
    description: "Register a new student",
    icon: Plus,
    variant: "default" as const,
  },
  {
    title: "Create Announcement",
    description: "Send school-wide message",
    icon: Bell,
    variant: "outline" as const,
  },
  {
    title: "Schedule Event",
    description: "Add to school calendar",
    icon: Calendar,
    variant: "outline" as const,
  },
  {
    title: "Generate Report",
    description: "Create academic report",
    icon: FileText,
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action) => (
          <Button key={action.title} variant='outline' className="justify-start h-auto p-4">
            <action.icon className="mr-3 h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">{action.title}</div>
              <div className="text-xs text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
