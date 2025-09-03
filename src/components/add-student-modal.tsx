"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, User, GraduationCap, DollarSign } from "lucide-react"
import { addStudent, type Student } from "@/lib/auth"

interface AddStudentModalProps {
  isOpen: boolean
  onClose: () => void
  onStudentAdded: (student: Student) => void
}

export function AddStudentModal({ isOpen, onClose, onStudentAdded }: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    class: "",
    educationalLevel: "",
    stream: "",
    status: "active",
    grade: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    feesTotal: "",
    feesPaid: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const classOptions = {
    "early-years": ["Creche", "KG1", "KG2", "Nursery 1", "Nursery 2"],
    primary: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
    "junior-secondary": ["JS1", "JS2", "JS3"],
    "senior-secondary": ["SS1", "SS2", "SS3"],
  }

  const streamOptions = ["science", "arts", "commercial"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-set educational level based on class
    if (field === "class") {
      const level = Object.entries(classOptions).find(([_, classes]) => classes.includes(value))?.[0]
      if (level) {
        setFormData((prev) => ({
          ...prev,
          educationalLevel: level,
          // Reset stream if not senior secondary
          stream: level !== "senior-secondary" ? "" : prev.stream,
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newStudent: Omit<Student, "id" | "enrollmentDate"> = {
        name: formData.name,
        email: formData.email,
        age: Number.parseInt(formData.age),
        class: formData.class,
        educationalLevel: formData.educationalLevel as Student["educationalLevel"],
        stream: formData.stream as Student["stream"],
        status: formData.status as Student["status"],
        grade: Number.parseInt(formData.grade),
        parentContact: {
          name: formData.parentName,
          phone: formData.parentPhone,
          email: formData.parentEmail,
          address: formData.address,
        },
        fees: {
          total: Number.parseInt(formData.feesTotal),
          paid: Number.parseInt(formData.feesPaid),
          balance: Number.parseInt(formData.feesTotal) - Number.parseInt(formData.feesPaid),
        },
        subjects: [], // Will be populated based on class/stream
        results: [], // Empty for new students
      }

      const addedStudent = await addStudent(newStudent)
      onStudentAdded(addedStudent)
      onClose()

      // Reset form
      setFormData({
        name: "",
        email: "",
        age: "",
        class: "",
        educationalLevel: "",
        stream: "",
        status: "active",
        grade: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        address: "",
        feesTotal: "",
        feesPaid: "",
      })
    } catch (error) {
      console.error("Failed to add student:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    const required = ["name", "email", "age", "class", "grade", "parentName", "parentPhone", "feesTotal", "feesPaid"]
    return required.every((field) => formData[field as keyof typeof formData].trim() !== "")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            Add New Student
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Student Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter student's full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="student@school.edu"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        min="3"
                        max="25"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Age"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade">Current Grade (%) *</Label>
                      <Input
                        id="grade"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.grade}
                        onChange={(e) => handleInputChange("grade", e.target.value)}
                        placeholder="85"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="class">Class *</Label>
                    <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(classOptions).map(([level, classes]) => (
                          <div key={level}>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                              {level.replace("-", " ")}
                            </div>
                            {classes.map((className) => (
                              <SelectItem key={className} value={className}>
                                {className}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.educationalLevel === "senior-secondary" && (
                    <div>
                      <Label htmlFor="stream">Stream *</Label>
                      <Select value={formData.stream} onValueChange={(value) => handleInputChange("stream", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stream" />
                        </SelectTrigger>
                        <SelectContent>
                          {streamOptions.map((stream) => (
                            <SelectItem key={stream} value={stream}>
                              {stream.charAt(0).toUpperCase() + stream.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parent/Guardian Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-4 w-4 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Parent/Guardian Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange("parentName", e.target.value)}
                      placeholder="Enter parent's full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentPhone">Phone Number *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                      placeholder="+234 xxx xxx xxxx"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentEmail">Email Address</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                      placeholder="parent@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Home Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter home address"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fees Information */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Fees Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="feesTotal">Total Fees (₦) *</Label>
                  <Input
                    id="feesTotal"
                    type="number"
                    min="0"
                    value={formData.feesTotal}
                    onChange={(e) => handleInputChange("feesTotal", e.target.value)}
                    placeholder="150000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="feesPaid">Amount Paid (₦) *</Label>
                  <Input
                    id="feesPaid"
                    type="number"
                    min="0"
                    value={formData.feesPaid}
                    onChange={(e) => handleInputChange("feesPaid", e.target.value)}
                    placeholder="75000"
                    required
                  />
                </div>
                <div>
                  <Label>Balance (₦)</Label>
                  <div className="h-10 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 flex items-center">
                    <Badge
                      variant={
                        Number.parseInt(formData.feesTotal || "0") - Number.parseInt(formData.feesPaid || "0") > 0
                          ? "destructive"
                          : "default"
                      }
                      className={
                        Number.parseInt(formData.feesTotal || "0") - Number.parseInt(formData.feesPaid || "0") === 0
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                    >
                      ₦
                      {(
                        Number.parseInt(formData.feesTotal || "0") - Number.parseInt(formData.feesPaid || "0")
                      ).toLocaleString()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid() || isSubmitting}>
              {isSubmitting ? "Adding Student..." : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
