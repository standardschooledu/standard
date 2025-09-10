"use client"

import type { Student } from "@/lib/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Mail, MapPin, Calendar, DollarSign, BookOpen, GraduationCap } from "lucide-react"

interface StudentDetailsModalProps {
  student: Student | null
  isOpen: boolean
  onClose: () => void
}

export function StudentDetailsModal({ student, isOpen, onClose }: StudentDetailsModalProps) {
  if (!student) return null

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B+":
      case "B":
        return "bg-blue-100 text-blue-800"
      case "B-":
      case "C+":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-red-100 text-red-800"
    }
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="truncate">{student?.name} - Detailed Information</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <GraduationCap className="h-4 w-4" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Student ID:</span>
                <span className="text-sm sm:text-base">{student.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Class:</span>
                <Badge variant="outline">{student.class_id}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Age:</span>
                <span className="text-sm sm:text-base">{student.age} years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Status:</span>
                <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
              </div>
              {student.stream && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm sm:text-base">Stream:</span>
                  <Badge className={getStreamBadgeColor(student.stream)}>
                    {student.stream.charAt(0).toUpperCase() + student.stream.slice(1)}
                  </Badge>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Enrollment Date:</span>
                <span className="text-sm sm:text-base">{new Date(student.enrollmentDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Phone className="h-4 w-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">{student.email}</span>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 text-sm sm:text-base">Parent/Guardian</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-gray-500 flex-shrink-0" />
                    <span className="break-words">{student.parentContact?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-500 flex-shrink-0" />
                    <span className="break-all">{student.parentContact?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-500 flex-shrink-0" />
                    <span className="break-all">{student.parentContact?.email}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base break-words">{student?.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Academic Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <BookOpen className="h-4 w-4" />
                Academic Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {student?.results?.map((result, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                    <span className="font-medium text-sm truncate flex-1 mr-2">{result?.subject}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm">{result?.score}%</span>
                      <Badge className={getGradeColor(String(result?.grade))} variant="secondary">
                        {result.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center font-medium">
                <span className="text-sm sm:text-base">Overall Average:</span>
                <Badge variant="outline" className="text-sm sm:text-base">
                  {student.grade}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Fees Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <DollarSign className="h-4 w-4" />
                Fees Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Tuition Fee:</span>
                <span className="text-sm sm:text-base">₦{student?.fees?.tuition.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Amount Paid:</span>
                <span className="text-green-600 text-sm sm:text-base">₦{student?.fees?.paid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Balance:</span>
                <span
                  className={`text-sm sm:text-base ${student?.fees?.balance > 0 ? "text-red-600" : "text-green-600"}`}
                >
                  ₦{student?.fees?.balance.toLocaleString()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm sm:text-base">Due Date:</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-gray-500" />
                  <span className="text-sm">{new Date(student?.fees?.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              {student?.fees?.balance > 0 && (
                <Badge variant="destructive" className="w-full justify-center">
                  Outstanding Balance
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Subjects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Enrolled Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {student.subjects?.map((subject, index) => (
                <Badge key={index} variant="outline" className="text-xs sm:text-sm">
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
