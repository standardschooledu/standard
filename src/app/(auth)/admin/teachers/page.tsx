"use client"

import { useState } from "react"
import { Search, Plus, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Teacher {
  id: number
  name: string
  email: string
  subject: string
  joinDate: string
}

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@school.edu",
    subject: "Mathematics",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@school.edu",
    subject: "Physics",
    joinDate: "2022-08-20",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@school.edu",
    subject: "English Literature",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@school.edu",
    subject: "History",
    joinDate: "2021-09-05",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@school.edu",
    subject: "Chemistry",
    joinDate: "2023-02-28",
  },
]

export default function TeachersComponent() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers)
  const [searchTerm, setSearchTerm] = useState("")
  const [newTeacherEmail, setNewTeacherEmail] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTeacher = () => {
    if (newTeacherEmail.trim()) {
      // Extract name from email (simple approach for demo)
      const emailName = newTeacherEmail.split("@")[0]
      const formattedName = emailName
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")

      const newTeacher: Teacher = {
        id: Math.max(...teachers.map((t) => t.id)) + 1,
        name: formattedName,
        email: newTeacherEmail.trim(),
        subject: "Not Assigned",
        joinDate: new Date().toISOString().split("T")[0],
      }

      setTeachers([...teachers, newTeacher])
      setNewTeacherEmail("")
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">Manage and view all teachers in your institution</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Add New Teacher
              </DialogTitle>
              <DialogDescription>
                Enter the email address of the new teacher to send them an invitation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="teacher@school.edu"
                    value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                    className="pl-10"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTeacher()
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddTeacher} disabled={!newTeacherEmail.trim()}>
                Add Teacher
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Teachers Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Join Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell className="text-muted-foreground">{teacher.email}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.joinDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No teachers found matching your search." : "No teachers found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTeachers.length} of {teachers.length} teachers
      </div>
    </div>
  )
}