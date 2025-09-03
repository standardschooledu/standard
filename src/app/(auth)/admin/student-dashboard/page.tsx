"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentsPage() {
  // Dummy data (replace later with real DB fetch)
  const [students, setStudents] = useState([
    {
      id: "1",
      firstName: "David",
      lastName: "Taiwo",
      class: "SS2",
      gender: "Male",
      email: "david@example.com",
      phone: "08012345678",
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Okafor",
      class: "JS3",
      gender: "Female",
      email: "sarah@example.com",
      phone: "08123456789",
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Adeyemi",
      class: "SS1",
      gender: "Male",
      email: "michael@example.com",
      phone: "08098765432",
    },
  ]);

  // Dummy delete handler
  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <Card className="p-4 shadow-md">
      <CardContent>
        <h1 className="text-2xl font-bold mb-4">All Students</h1>

        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="border p-2">
                  {student.firstName} {student.lastName}
                </td>
                <td className="border p-2">{student.class}</td>
                <td className="border p-2">{student.gender}</td>
                <td className="border p-2">{student.email}</td>
                <td className="border p-2">{student.phone}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <Button size="sm" variant="outline">
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(student.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
