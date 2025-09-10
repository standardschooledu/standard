"use client"

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useStore";

import {
  getStudents,
  searchStudents,
  getUniqueClasses,
  getUniqueEducationalLevels,
  getUniqueStreams,
  groupStudentsByEducationalLevel,
  getEducationalLevelDisplayName,
  getStreamDisplayName,
  type Student,
  signOutUser,
} from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StudentDetailsModal } from "@/components/student-details-modal"
import { AddStudentModal } from "@/components/add-student-modal"
import {
  Search,
  LogOut,
  Users,
  GraduationCap,
  Filter,
  Calendar,
  TrendingUp,
  UserCheck,
  UserX,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function StudentDashboard() {
  const user = useAuthStore((state) => state.user)
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedEducationalLevel, setSelectedEducationalLevel] = useState<string>("all")
  const [selectedStream, setSelectedStream] = useState<string>("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [classes, setClasses] = useState<string[]>([])
  const [educationalLevels, setEducationalLevels] = useState<string[]>([])
  const [streams, setStreams] = useState<string[]>([])

  // NEW: Pagination state per class
  const [pageByClass, setPageByClass] = useState<Record<string, number>>({})
  const [itemsPerPage, setItemsPerPage] = useState(6) // default for desktop

  const handleViewMore = (student: Student) => {
    setSelectedStudent(student)
  }

  // Detect mobile screen for pagination size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2) // mobile → 2 per page
      } else {
        setItemsPerPage(6) // tablet/desktop → 6 per page
      }
    }

    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const studentData = await getStudents()
        setStudents(studentData)
        setFilteredStudents(studentData)
        setClasses(getUniqueClasses(studentData))
        setEducationalLevels(getUniqueEducationalLevels(studentData))
        setStreams(getUniqueStreams(studentData))
      } catch (error) {
        console.error("Failed to load students:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [])

  useEffect(() => {
    let filtered = searchStudents(students, searchQuery)

    if (selectedClass !== "all") {
      filtered = filtered.filter((student) => student.class_id === selectedClass)
    }
    if (selectedStatus !== "all") {
      filtered = filtered.filter((student) => student.status === selectedStatus)
    }
    if (selectedEducationalLevel !== "all") {
      filtered = filtered.filter((student) => student.educationalLevel === selectedEducationalLevel)
    }
    if (selectedStream !== "all") {
      filtered = filtered.filter((student) => student.stream === selectedStream)
    }

    setFilteredStudents(filtered)
  }, [students, searchQuery, selectedClass, selectedStatus, selectedEducationalLevel, selectedStream])

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const handleStudentAdded = (newStudent: Student) => {
    setStudents((prev) => [...prev, newStudent])
    const updatedStudents = [...students, newStudent]
    setClasses(getUniqueClasses(updatedStudents))
    setEducationalLevels(getUniqueEducationalLevels(updatedStudents))
    setStreams(getUniqueStreams(updatedStudents))
  }

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "bg-green-100 text-green-800"
    if (grade >= 80) return "bg-blue-100 text-blue-800"
    if (grade >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getStreamBadgeColor = (stream?: string) => {
    switch (stream) {
      case "science":
        return "bg-blue-100 text-blue-800"
      case "arts":
        return "bg-purple-100 text-purple-800"
      case "commercial":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    inactive: students.filter((s) => s.status === "inactive").length,
    averageGrade: Math.round(students.reduce((acc, s) => acc + s.grade!, 0) / students.length) || 0,
  }

  const groupedStudents = groupStudentsByEducationalLevel(filteredStudents)

  const handlePageChange = (className: string, newPage: number) => {
    setPageByClass((prev) => ({ ...prev, [className]: newPage }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-0 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
          <Button variant="outline" onClick={signOutUser} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6"><Users /> {stats.total} Total</CardContent></Card>
          <Card><CardContent className="p-6"><UserCheck /> {stats.active} Active</CardContent></Card>
          <Card><CardContent className="p-6"><UserX /> {stats.inactive} Inactive</CardContent></Card>
          <Card><CardContent className="p-6"><TrendingUp /> {stats.averageGrade}% Avg</CardContent></Card>
        </div>

        {/* Students */}
        {Object.entries(groupedStudents).map(([level, levelStudents]) => {
          const studentsByClass = levelStudents.reduce((acc, student) => {
            if (!acc[student.class_id]) acc[student.class_id] = []
            acc[student.class_id].push(student)
            return acc
          }, {} as Record<string, Student[]>)

          return (
            <div key={level} className="space-y-8 mb-12">
              {Object.entries(studentsByClass).map(([className, classStudents]) => {
                const currentPage = pageByClass[className] || 1
                const totalPages = Math.ceil(classStudents.length / itemsPerPage)
                const paginatedStudents = classStudents.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )

                return (
                  <div key={className}>
                    <h3 className="text-lg text- font-semibold">{className}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-0">
                      {paginatedStudents.map((student) => (
                        <Card key={student.id} className="hover:shadow-lg cursor-pointer" onClick={() => handleStudentClick(student)}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10"><AvatarFallback>{getInitials(student?.name)}</AvatarFallback></Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold truncate">{student?.name}</h3>
                                <div className="mt-2 space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>Class:</span><Badge>{student?.class_id}</Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Grade:</span><Badge className={getGradeColor(student.grade!)}>{student.grade}%</Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Fees:</span>
                                    <Badge variant={student.fees?.balance > 0 ? "destructive" : "default"}>
                                      {student.fees?.balance > 0 ? "Outstanding" : "Paid"}
                                    </Badge>
                                  </div>
                                  <div
                                    // size="sm"
                                    // variant="outline"
                                    onClick={() => handleViewMore(student)}
                                    className="flex items-center gap-1 text-xs md:text-sm text-primary p-0 border-0 text-md underline"
                                  >
                                    <Eye className="h-4 w-4" /> View More
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePageChange(className, Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePageChange(className, Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <AddStudentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onStudentAdded={handleStudentAdded} />
      <StudentDetailsModal student={selectedStudent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
