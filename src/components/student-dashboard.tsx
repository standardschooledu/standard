"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
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
} from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StudentDetailsModal } from "@/components/student-details-modal"
import { AddStudentModal } from "@/components/add-student-modal"
import { Search, LogOut, Users, GraduationCap, Filter, TrendingUp, UserCheck, UserX, Eye, Plus } from "lucide-react"

export function StudentDashboard() {
  const { user, logout } = useAuth()
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
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>({})

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
      filtered = filtered.filter((student) => student.class === selectedClass)
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

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
    averageGrade: Math.round(students.reduce((acc, s) => acc + s.grade, 0) / students.length) || 0,
  }

  const groupedStudents = groupStudentsByEducationalLevel(filteredStudents)

  const toggleClassExpansion = (className: string) => {
    setExpandedClasses((prev) => ({
      ...prev,
      [className]: !prev[className],
    }))
  }

  const INITIAL_STUDENTS_PER_CLASS = 4

  const getClassOrder = (className: string) => {
    const classOrder = [
      "Creche",
      "KG1",
      "KG2",
      "Nursery 1",
      "Nursery 2",
      "Primary 1",
      "Primary 2",
      "Primary 3",
      "Primary 4",
      "Primary 5",
      "Primary 6",
      "JS1",
      "JS2",
      "JS3",
      "SS1",
      "SS2",
      "SS3",
    ]
    return classOrder.indexOf(className)
  }

  const getLevelStyling = (level: string) => {
    const styles = {
      "early-years": {
        bg: "bg-pink-50",
        border: "border-pink-200",
        icon: "bg-pink-500",
        text: "text-pink-700",
      },
      primary: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "bg-blue-500",
        text: "text-blue-700",
      },
      "junior-secondary": {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "bg-green-500",
        text: "text-green-700",
      },
      "senior-secondary": {
        bg: "bg-purple-50",
        border: "border-purple-200",
        icon: "bg-purple-500",
        text: "text-purple-700",
      },
    }
    return styles[level as keyof typeof styles] || styles["primary"]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Student Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className="flex items-center justify-center gap-2 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                  <UserCheck className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                  <UserX className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Inactive Students</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.inactive}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Average Grade</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.averageGrade}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              Search & Filter Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or class..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Select value={selectedEducationalLevel} onValueChange={setSelectedEducationalLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {educationalLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {getEducationalLevelDisplayName(level)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Streams</SelectItem>
                    {streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>
                        {getStreamDisplayName(stream)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        {Object.entries(groupedStudents).length > 0 ? (
          <div className="space-y-8 sm:space-y-12">
            {Object.entries(groupedStudents)
              .sort(([a], [b]) => {
                const levelOrder = ["early-years", "primary", "junior-secondary", "senior-secondary"]
                return levelOrder.indexOf(a) - levelOrder.indexOf(b)
              })
              .map(([level, levelStudents]) => {
                const studentsByClass = levelStudents.reduce(
                  (acc, student) => {
                    if (!acc[student.class]) acc[student.class] = []
                    acc[student.class].push(student)
                    return acc
                  },
                  {} as Record<string, Student[]>,
                )

                const isExpanded = expandedClasses[level] || false
                const studentsToShow = isExpanded ? levelStudents : levelStudents.slice(0, INITIAL_STUDENTS_PER_CLASS)
                const hasMoreStudents = levelStudents.length > INITIAL_STUDENTS_PER_CLASS

                const styling = getLevelStyling(level)

                return (
                  <div key={level} className={`p-4 sm:p-6 rounded-xl border-2 ${styling.bg} ${styling.border}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 sm:p-3 ${styling.icon} rounded-xl shadow-sm`}>
                          <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                          <h2 className={`text-xl sm:text-2xl font-bold ${styling.text}`}>
                            {getEducationalLevelDisplayName(level)}
                          </h2>
                          <p className="text-sm text-gray-600 mt-1">
                            {levelStudents.length} student{levelStudents.length !== 1 ? "s" : ""} enrolled
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`${styling.text} border-current sm:ml-auto`}>
                        {Object.keys(studentsByClass).length} class
                        {Object.keys(studentsByClass).length !== 1 ? "es" : ""}
                      </Badge>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                      {Object.entries(studentsByClass)
                        .sort(([a], [b]) => getClassOrder(a) - getClassOrder(b))
                        .map(([className, classStudents]) => {
                          const isClassExpanded = expandedClasses[className] || false
                          const studentsToShowInClass = isClassExpanded
                            ? classStudents
                            : classStudents.slice(0, INITIAL_STUDENTS_PER_CLASS)
                          const hasMoreStudentsInClass = classStudents.length > INITIAL_STUDENTS_PER_CLASS

                          return (
                            <div key={className}>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-1 w-6 sm:w-8 bg-gray-300 rounded"></div>
                                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{className}</h3>
                                  {level === "senior-secondary" && classStudents[0]?.stream && (
                                    <Badge className={getStreamBadgeColor(classStudents[0].stream)} variant="secondary">
                                      {getStreamDisplayName(classStudents[0].stream)}
                                    </Badge>
                                  )}
                                </div>
                                <Badge variant="outline" className="text-xs w-fit">
                                  {classStudents.length} student{classStudents.length !== 1 ? "s" : ""}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 ml-0 sm:ml-11">
                                {studentsToShowInClass.map((student) => (
                                  <Card
                                    key={student.id}
                                    className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01] bg-white border border-gray-200 hover:border-gray-300"
                                    onClick={() => handleStudentClick(student)}
                                  >
                                    <CardContent className="p-3 sm:p-4">
                                      <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                                            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-xs sm:text-sm">
                                              {getInitials(student.name)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 truncate text-sm">
                                              {student.name}
                                            </h4>
                                            <p className="text-xs text-gray-600 truncate">{student.email}</p>
                                          </div>
                                          <Badge
                                            variant={student.status === "active" ? "default" : "secondary"}
                                            className={`text-xs ${
                                              student.status === "active" ? "bg-green-100 text-green-800" : ""
                                            }`}
                                          >
                                            {student.status}
                                          </Badge>
                                        </div>

                                        <div className="space-y-2">
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-600">Grade:</span>
                                            <Badge
                                              className={`${getGradeColor(student.grade)} text-xs`}
                                              variant="secondary"
                                            >
                                              {student.grade}%
                                            </Badge>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-600">Age:</span>
                                            <span className="text-xs font-medium">{student.age} years</span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-600">Fees:</span>
                                            <Badge
                                              variant={student.fees.balance > 0 ? "destructive" : "default"}
                                              className={`text-xs ${
                                                student.fees.balance === 0 ? "bg-green-100 text-green-800" : ""
                                              }`}
                                            >
                                              {student.fees.balance > 0 ? "Due" : "Paid"}
                                            </Badge>
                                          </div>
                                          {student.stream && (
                                            <div className="flex items-center justify-between">
                                              <span className="text-xs text-gray-600">Stream:</span>
                                              <Badge
                                                className={`${getStreamBadgeColor(student.stream)} text-xs`}
                                                variant="secondary"
                                              >
                                                {getStreamDisplayName(student.stream)}
                                              </Badge>
                                            </div>
                                          )}
                                        </div>

                                        <div className="pt-2 border-t border-gray-100">
                                          <div className="flex items-center justify-center text-xs text-gray-500 gap-1">
                                            <Eye className="h-3 w-3" />
                                            View Details
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>

                              {hasMoreStudentsInClass && (
                                <div className="mt-4 flex justify-center ml-0 sm:ml-11">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleClassExpansion(className)}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    {isClassExpanded ? (
                                      <>
                                        Show Less
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 15l7-7 7 7"
                                          />
                                        </svg>
                                      </>
                                    ) : (
                                      <>
                                        Show More ({classStudents.length - INITIAL_STUDENTS_PER_CLASS} more)
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                          />
                                        </svg>
                                      </>
                                    )}
                                  </Button>
                                </div>
                              )}
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )
              })}
          </div>
        ) : (
          <Card className="mt-8">
            <CardContent className="p-8 sm:p-12 text-center">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No students found</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Try adjusting your search criteria or filters to find students.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onStudentAdded={handleStudentAdded}
      />

      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedStudent(null)
        }}
      />
    </div>
  )
}
