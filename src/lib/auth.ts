// src/lib/auth.ts (or better: src/lib/students.ts)
import supabase from "@/lib/supabaseClient"
import  {Student}  from "@/types/student" 
import { calculateAge } from "@/utils/date"

// Mock authentication system for admin dashboard
export interface User {
  id: string
  email: string
  name: string
  role: string
}

// // Mock admin credentials
// const MOCK_ADMIN = {
//   id: "1",
//   email: "admin@school.edu",
//   name: "Admin User",
//   role: "admin" as const,
//   password: "admin123",
// }

const MOCK_ADMIN = {
  id: "c529a0fd-70d6-42af-9076-a89f38940c07",
  email: "olaleye349@gmail.com",
  password: "12345678",
  name: "Admin User",
  // role: "admin" | "student",
  role: "admin",
}




import { createClient } from "@supabase/supabase-js"

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error.message)
    return null
  }

  // ✅ Supabase gives you both user + session
  return {
    id: data.user?.id ?? "",
    email: data.user?.email ?? "",
    name: data.user?.user_metadata?.name ?? "", // depends on how you stored it
    role: data.user?.user_metadata?.role ?? "admin", // fallback role
  }
}

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Logout error:", error.message)
    throw error
  }
}
export const getStudents = async (): Promise<Student[]> => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false }) // optional: latest first

  if (error) {
    console.error("Error fetching students:", error.message)
    throw new Error(error.message)
  }

  return data as Student[]
}

export const searchStudents = (students: Student[], query: string): Student[] => {
  if (!query.trim()) return students

  const lowercaseQuery = query.toLowerCase()
  return students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(lowercaseQuery) ||
      student.lastName.toLowerCase().includes(lowercaseQuery) ||
      // student.email.toLowerCase().includes(lowercaseQuery) ||
      student.class_id.toLowerCase().includes(lowercaseQuery),
  )
}

export const getUniqueClasses = (students: Student[]): string[] => {
  return Array.from(new Set(students.map((student) => student.class_id))).sort((a, b) => {
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
    return classOrder.indexOf(a) - classOrder.indexOf(b)
  })
}

export const getUniqueEducationalLevels = (students: Student[]): string[] => {
  return Array.from(new Set(students.map((student) => student.educationalLevel))).sort()
}

export const getUniqueStreams = (students: Student[]): string[] => {
  return Array.from(new Set(students.filter((s) => s.stream).map((student) => student.stream!))).sort()
}

export const groupStudentsByEducationalLevel = (students: Student[]) => {
  return students.reduce(
    (groups, student) => {
      const level = student.educationalLevel
      if (!groups[level]) {
        groups[level] = []
      }
      groups[level].push(student)
      return groups
    },
    {} as Record<string, Student[]>,
  )
}

export const getEducationalLevelDisplayName = (level: string): string => {
  const displayNames: Record<string, string> = {
    "early-years": "Early Years (Creche - Nursery 2)",
    primary: "Primary School (Primary 1-6)",
    "junior-secondary": "Junior Secondary (JS1-3)",
    "senior-secondary": "Senior Secondary (SS1-3)",
  }
  return displayNames[level] || level
}

export const getStreamDisplayName = (stream: string): string => {
  const displayNames: Record<string, string> = {
    science: "Science",
    arts: "Arts",
    commercial: "Commercial",
  }
  return displayNames[stream] || stream
}

// Function to auto-assign subjects
const getSubjectsForLevel = (
  level: Student["educationalLevel"],
  stream?: Student["stream"],
  className?: string
) => {
  switch (level) {
    case "early-years":
      if (className === "Creche") return ["Play Activities", "Basic Recognition", "Motor Skills"]
      if (className?.startsWith("KG")) return ["Phonics", "Numbers", "Drawing", "Rhymes"]
      return ["Reading Readiness", "Number Concepts", "Creative Expression", "Social Skills"]

    case "primary":
      const baseSubjects = ["English", "Mathematics", "Basic Science", "Social Studies"]
      if (className === "Primary 1" || className === "Primary 2") {
        return [...baseSubjects, "CRK"]
      }
      return [...baseSubjects, "Computer Studies", "CRK"]

    case "junior-secondary":
      return [
        "English",
        "Mathematics",
        "Basic Science",
        "Social Studies",
        "Computer Studies",
        "CRK",
        "Physical Education",
        "French",
      ]

    case "senior-secondary":
      const coreSubjects = ["English", "Mathematics"]
      switch (stream) {
        case "science":
          return [...coreSubjects, "Physics", "Chemistry", "Biology", "Further Mathematics", "Computer Science"]
        case "arts":
          return [...coreSubjects, "Literature", "Government", "History", "CRK", "Fine Arts"]
        case "commercial":
          return [...coreSubjects, "Economics", "Accounting", "Commerce", "Business Studies", "Computer Studies"]
        default:
          return coreSubjects
      }

    default:
      return []
  }
}

// Utility to convert camelCase → snake_case
function toSnakeCase(obj: Record<string, any>) {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      newObj[snakeKey] = obj[key];
    }
  }
  return newObj;
}

export const addStudent = async (
  studentData: Omit<Student, "id" | "enrollmentDate">
): Promise<Student> => {
  // 1️⃣ Insert into students table
  const { data: studentInserted, error: studentError } = await supabase
    .from("students")
    .insert([
      {
        first_name: studentData.firstName,
        last_name: studentData.lastName,
        middle_name: studentData.middleName,
        dob: studentData.dob,
        gender: studentData.gender.toLowerCase(),
        email: studentData.email,
        // phone: studentData.phone,
        address: studentData.address,
        class_id: studentData.class_id,
        educational_level: studentData.educationalLevel,
        // enrollment_date: new Date().toISOString().split("T")[0],
      },
    ])
    .select("*")
    .single();

  if (studentError || !studentInserted) {
    console.error("Error inserting student:", studentError);
    throw new Error(studentError?.message || "Failed to add student");
  }

  const studentId = studentInserted.id;

  // 2️⃣ Insert into parents table
  if (studentData.parentContact) {
    const { error: parentError } = await supabase
      .from("parents")
      .insert([
        {
          student_id: studentId,
          name: studentData.parentContact.name,
          phone: studentData.parentContact.phone,
          email: studentData.parentContact.email,
        },
      ]);
    if (parentError) console.error(
      "Parent insert error:", parentError
    );
  }

  // 3️⃣ Insert into fees table
  if (studentData.fees) {
    const { error: feesError } = await supabase
      .from("fees")
      .insert([
        {
          student_id: studentId,
          tuition: studentData.fees.tuition,
          paid: studentData.fees.paid,
          balance: studentData.fees.tuition - studentData.fees.paid,
          due_date: studentData.fees.dueDate,
        },
      ]);
    if (feesError) console.error("Fees insert error:", feesError);
  }

  // 4️⃣ Insert into student_subjects table
  if (studentData.subjects?.length) {
    const subjectsToInsert = studentData.subjects.map((subject) => ({
      student_id: studentId,
      subject,
    }));
    const { error: subjectsError } = await supabase
      .from("student_subjects")
      .insert(subjectsToInsert);
    if (subjectsError) console.error("Subjects insert error:", subjectsError);
  }

  // 5️⃣ Results can be inserted later

  return studentInserted;
};




// Utility: snake_case <-> camelCase
// function toSnakeCase(obj: Record<string, any>) {
//   const newObj: Record<string, any> = {}
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
//       newObj[snakeKey] = obj[key]
//     }
//   }
//   return newObj
// }

function toCamelCase(obj: Record<string, any>) {
  const newObj: Record<string, any> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
      newObj[camelKey] = obj[key]
    }
  }
  return newObj
}

export const updateStudent = async (
  studentId: string,
  updates: Partial<Student>
): Promise<Student | null> => {
  const updatesPayload = toSnakeCase(updates)

  const { data, error } = await supabase
    .from("students")
    .update(updatesPayload)
    .eq("id", studentId)
    .select("*")
    .single()

  if (error) {
    console.error("Supabase update error:", error.message)
    throw new Error(error.message)
  }

  return data ? (toCamelCase(data) as Student) : null
}

export const deleteStudent = async (studentId: string): Promise<boolean> => {
  const { error } = await supabase.from("students").delete().eq("id", studentId)

  if (error) {
    console.error("Supabase delete error:", error.message)
    throw new Error(error.message)
  }

  return true
}


export  type { Student }

