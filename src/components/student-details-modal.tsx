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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {student.name} - Detailed Information
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Student ID:</span>
                <span>{student.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Class:</span>
                <Badge variant="outline">{student.class}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{student.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
              </div>
              {student.stream && (
                <div className="flex justify-between">
                  <span className="font-medium">Stream:</span>
                  <Badge className={getStreamBadgeColor(student.stream)}>
                    {student.stream.charAt(0).toUpperCase() + student.stream.slice(1)}
                  </Badge>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Enrollment Date:</span>
                <span>{new Date(student.enrollmentDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{student.email}</span>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Parent/Guardian</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-gray-500" />
                    <span>{student.parentContact.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-500" />
                    <span>{student.parentContact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-500" />
                    <span>{student.parentContact.email}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="text-sm">{student.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Academic Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Academic Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {student.results.map((result, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                    <span className="font-medium text-sm">{result.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{result.score}%</span>
                      <Badge className={getGradeColor(result.grade)} variant="secondary">
                        {result.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center font-medium">
                <span>Overall Average:</span>
                <Badge variant="outline" className="text-base">
                  {student.grade}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Fees Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Fees Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Tuition Fee:</span>
                <span>₦{student.fees.tuition.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Amount Paid:</span>
                <span className="text-green-600">₦{student.fees.paid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Balance:</span>
                <span className={student.fees.balance > 0 ? "text-red-600" : "text-green-600"}>
                  ₦{student.fees.balance.toLocaleString()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Due Date:</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-gray-500" />
                  <span className="text-sm">{new Date(student.fees.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              {student.fees.balance > 0 && (
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
            <CardTitle>Enrolled Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {student.subjects.map((subject, index) => (
                <Badge key={index} variant="outline">
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
