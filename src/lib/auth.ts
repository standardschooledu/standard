// Mock authentication system for admin dashboard
export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface Student {
  id: string
  name: string
  email: string
  class: string
  grade: number
  age: number
  enrollmentDate: string
  status: "active" | "inactive"
  avatar?: string
  educationalLevel: "early-years" | "primary" | "junior-secondary" | "senior-secondary"
  stream?: "science" | "arts" | "commercial" // For senior secondary only
  subjects: string[]
  results: {
    subject: string
    score: number
    grade: string
  }[]
  fees: {
    tuition: number
    paid: number
    balance: number
    dueDate: string
  }
  parentContact: {
    name: string
    phone: string
    email: string
  }
  address: string
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


export const MOCK_STUDENTS: Student[] = [
  // Early Years (Creche, KG1, KG2, Nursery 1, Nursery 2)
  {
    id: "1",
    name: "Adunni Adebayo",
    email: "adunni.adebayo@school.edu",
    class: "Creche",
    grade: 95,
    age: 2,
    enrollmentDate: "2024-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Play Activities", "Basic Recognition", "Motor Skills"],
    results: [
      { subject: "Play Activities", score: 95, grade: "A" },
      { subject: "Basic Recognition", score: 90, grade: "A" },
      { subject: "Motor Skills", score: 88, grade: "B+" },
    ],
    fees: { tuition: 150000, paid: 150000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Mrs. Adebayo", phone: "08012345678", email: "mrs.adebayo@email.com" },
    address: "12 Victoria Island, Lagos",
  },
  {
    id: "2",
    name: "Chinedu Okafor",
    email: "chinedu.okafor@school.edu",
    class: "KG1",
    grade: 88,
    age: 4,
    enrollmentDate: "2024-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Phonics", "Numbers", "Drawing", "Rhymes"],
    results: [
      { subject: "Phonics", score: 85, grade: "B+" },
      { subject: "Numbers", score: 90, grade: "A" },
      { subject: "Drawing", score: 88, grade: "B+" },
      { subject: "Rhymes", score: 92, grade: "A" },
    ],
    fees: { tuition: 180000, paid: 90000, balance: 90000, dueDate: "2024-12-15" },
    parentContact: { name: "Mr. Okafor", phone: "08023456789", email: "mr.okafor@email.com" },
    address: "45 Ikeja GRA, Lagos",
  },
  {
    id: "3",
    name: "Fatima Abdullahi",
    email: "fatima.abdullahi@school.edu",
    class: "KG2",
    grade: 92,
    age: 5,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading", "Writing", "Mathematics", "Social Studies"],
    results: [
      { subject: "Reading", score: 95, grade: "A" },
      { subject: "Writing", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Social Studies", score: 90, grade: "A" },
    ],
    fees: { tuition: 200000, paid: 200000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Abdullahi", phone: "08034567890", email: "abdullahi@email.com" },
    address: "78 Garki, Abuja",
  },
  {
    id: "4",
    name: "Emeka Nwankwo",
    email: "emeka.nwankwo@school.edu",
    class: "Nursery 1",
    grade: 85,
    age: 3,
    enrollmentDate: "2024-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Basic Literacy", "Numeracy", "Creative Arts"],
    results: [
      { subject: "Basic Literacy", score: 82, grade: "B" },
      { subject: "Numeracy", score: 88, grade: "B+" },
      { subject: "Creative Arts", score: 85, grade: "B+" },
    ],
    fees: { tuition: 170000, paid: 85000, balance: 85000, dueDate: "2024-12-15" },
    parentContact: { name: "Mrs. Nwankwo", phone: "08045678901", email: "mrs.nwankwo@email.com" },
    address: "23 New Haven, Enugu",
  },
  {
    id: "16",
    name: "Tunde Adebisi",
    email: "tunde.adebisi@school.edu",
    class: "Nursery 2",
    grade: 90,
    age: 4,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading Readiness", "Number Concepts", "Creative Expression", "Social Skills"],
    results: [
      { subject: "Reading Readiness", score: 88, grade: "B+" },
      { subject: "Number Concepts", score: 92, grade: "A" },
      { subject: "Creative Expression", score: 90, grade: "A" },
      { subject: "Social Skills", score: 89, grade: "B+" },
    ],
    fees: { tuition: 190000, paid: 190000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Mrs. Adebisi", phone: "08067890123", email: "mrs.adebisi@email.com" },
    address: "56 Surulere, Lagos",
  },
   {
    id: "17",
    name: "Fatima Abdullahi",
    email: "fatima.abdullahi@school.edu",
    class: "KG2",
    grade: 92,
    age: 5,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading", "Writing", "Mathematics", "Social Studies"],
    results: [
      { subject: "Reading", score: 95, grade: "A" },
      { subject: "Writing", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Social Studies", score: 90, grade: "A" },
    ],
    fees: { tuition: 200000, paid: 200000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Abdullahi", phone: "08034567890", email: "abdullahi@email.com" },
    address: "78 Garki, Abuja",
  },
   {
    id: "18",
    name: "Fatima Abdullahi",
    email: "fatima.abdullahi@school.edu",
    class: "KG2",
    grade: 92,
    age: 5,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading", "Writing", "Mathematics", "Social Studies"],
    results: [
      { subject: "Reading", score: 95, grade: "A" },
      { subject: "Writing", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Social Studies", score: 90, grade: "A" },
    ],
    fees: { tuition: 200000, paid: 200000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Abdullahi", phone: "08034567890", email: "abdullahi@email.com" },
    address: "78 Garki, Abuja",
  },
   {
    id: "19",
    name: "Fatima Abdullahi",
    email: "fatima.abdullahi@school.edu",
    class: "KG2",
    grade: 92,
    age: 5,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading", "Writing", "Mathematics", "Social Studies"],
    results: [
      { subject: "Reading", score: 95, grade: "A" },
      { subject: "Writing", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Social Studies", score: 90, grade: "A" },
    ],
    fees: { tuition: 200000, paid: 200000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Abdullahi", phone: "08034567890", email: "abdullahi@email.com" },
    address: "78 Garki, Abuja",
  },
   {
    id: "20",
    name: "Fatima Abdullahi",
    email: "fatima.abdullahi@school.edu",
    class: "KG2",
    grade: 92,
    age: 5,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading", "Writing", "Mathematics", "Social Studies"],
    results: [
      { subject: "Reading", score: 95, grade: "A" },
      { subject: "Writing", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Social Studies", score: 90, grade: "A" },
    ],
    fees: { tuition: 200000, paid: 200000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Abdullahi", phone: "08034567890", email: "abdullahi@email.com" },
    address: "78 Garki, Abuja",
  },
   {
    id: "21",
    name: "Fatima Abdullahi",
    email: "fatima.abdullahi@school.edu",
    class: "KG2",
    grade: 92,
    age: 5,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading", "Writing", "Mathematics", "Social Studies"],
    results: [
      { subject: "Reading", score: 95, grade: "A" },
      { subject: "Writing", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Social Studies", score: 90, grade: "A" },
    ],
    fees: { tuition: 200000, paid: 200000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Abdullahi", phone: "08034567890", email: "abdullahi@email.com" },
    address: "78 Garki, Abuja",
  },
   {
    id: "22",
    name: "Fatima Abdullahi",
    email: "fatima.abdullahi@school.edu",
    class: "KG2",
    grade: 92,
    age: 5,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading", "Writing", "Mathematics", "Social Studies"],
    results: [
      { subject: "Reading", score: 95, grade: "A" },
      { subject: "Writing", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Social Studies", score: 90, grade: "A" },
    ],
    fees: { tuition: 200000, paid: 200000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Abdullahi", phone: "08034567890", email: "abdullahi@email.com" },
    address: "78 Garki, Abuja",
  },
   {
    id: "23",
    name: "Fatima Abdullahi",
    email: "fatima.abdullahi@school.edu",
    class: "KG2",
    grade: 92,
    age: 5,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "early-years",
    subjects: ["Reading", "Writing", "Mathematics", "Social Studies"],
    results: [
      { subject: "Reading", score: 95, grade: "A" },
      { subject: "Writing", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Social Studies", score: 90, grade: "A" },
    ],
    fees: { tuition: 200000, paid: 200000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Abdullahi", phone: "08034567890", email: "abdullahi@email.com" },
    address: "78 Garki, Abuja",
  },

  // Primary (Primary 1-6)
  {
    id: "5",
    name: "Blessing Okoro",
    email: "blessing.okoro@school.edu",
    class: "Primary 1",
    grade: 85,
    age: 6,
    enrollmentDate: "2024-09-01",
    status: "active",
    educationalLevel: "primary",
    subjects: ["English", "Mathematics", "Basic Science", "Social Studies", "CRK"],
    results: [
      { subject: "English", score: 85, grade: "B+" },
      { subject: "Mathematics", score: 88, grade: "B+" },
      { subject: "Basic Science", score: 82, grade: "B" },
      { subject: "Social Studies", score: 90, grade: "A" },
      { subject: "CRK", score: 87, grade: "B+" },
    ],
    fees: { tuition: 250000, paid: 125000, balance: 125000, dueDate: "2024-12-15" },
    parentContact: { name: "Mr. Okoro", phone: "08056789012", email: "mr.okoro@email.com" },
    address: "67 Trans Amadi, Port Harcourt",
  },
  {
    id: "17",
    name: "Amina Hassan",
    email: "amina.hassan@school.edu",
    class: "Primary 2",
    grade: 86,
    age: 7,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "primary",
    subjects: ["English", "Mathematics", "Basic Science", "Social Studies", "Hausa"],
    results: [
      { subject: "English", score: 84, grade: "B+" },
      { subject: "Mathematics", score: 88, grade: "B+" },
      { subject: "Basic Science", score: 85, grade: "B+" },
      { subject: "Social Studies", score: 87, grade: "B+" },
      { subject: "Hausa", score: 90, grade: "A" },
    ],
    fees: { tuition: 260000, paid: 130000, balance: 130000, dueDate: "2024-12-15" },
    parentContact: { name: "Mallam Hassan", phone: "08078901234", email: "mallam.hassan@email.com" },
    address: "34 Wuse II, Abuja",
  },
  {
    id: "6",
    name: "Ibrahim Musa",
    email: "ibrahim.musa@school.edu",
    class: "Primary 3",
    grade: 92,
    age: 8,
    enrollmentDate: "2022-09-01",
    status: "active",
    educationalLevel: "primary",
    subjects: ["English", "Mathematics", "Basic Science", "Social Studies", "Hausa", "Computer Studies"],
    results: [
      { subject: "English", score: 90, grade: "A" },
      { subject: "Mathematics", score: 95, grade: "A" },
      { subject: "Basic Science", score: 88, grade: "B+" },
      { subject: "Social Studies", score: 92, grade: "A" },
      { subject: "Hausa", score: 96, grade: "A" },
      { subject: "Computer Studies", score: 89, grade: "B+" },
    ],
    fees: { tuition: 280000, paid: 280000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Mallam Musa", phone: "08067890123", email: "mallam.musa@email.com" },
    address: "34 Sabon Gari, Kano",
  },
  {
    id: "18",
    name: "Olumide Bakare",
    email: "olumide.bakare@school.edu",
    class: "Primary 4",
    grade: 79,
    age: 9,
    enrollmentDate: "2021-09-01",
    status: "active",
    educationalLevel: "primary",
    subjects: ["English", "Mathematics", "Basic Science", "Social Studies", "Yoruba", "Computer Studies"],
    results: [
      { subject: "English", score: 78, grade: "B" },
      { subject: "Mathematics", score: 82, grade: "B" },
      { subject: "Basic Science", score: 76, grade: "B" },
      { subject: "Social Studies", score: 80, grade: "B" },
      { subject: "Yoruba", score: 85, grade: "B+" },
      { subject: "Computer Studies", score: 74, grade: "B-" },
    ],
    fees: { tuition: 300000, paid: 150000, balance: 150000, dueDate: "2024-12-15" },
    parentContact: { name: "Chief Bakare", phone: "08089012345", email: "chief.bakare@email.com" },
    address: "67 Abeokuta, Ogun",
  },
  {
    id: "7",
    name: "Chioma Eze",
    email: "chioma.eze@school.edu",
    class: "Primary 6",
    grade: 78,
    age: 11,
    enrollmentDate: "2019-09-01",
    status: "active",
    educationalLevel: "primary",
    subjects: ["English", "Mathematics", "Basic Science", "Social Studies", "Igbo", "Computer Studies", "French"],
    results: [
      { subject: "English", score: 75, grade: "B" },
      { subject: "Mathematics", score: 80, grade: "B" },
      { subject: "Basic Science", score: 78, grade: "B" },
      { subject: "Social Studies", score: 82, grade: "B" },
      { subject: "Igbo", score: 85, grade: "B+" },
      { subject: "Computer Studies", score: 76, grade: "B" },
      { subject: "French", score: 70, grade: "C+" },
    ],
    fees: { tuition: 320000, paid: 160000, balance: 160000, dueDate: "2024-12-15" },
    parentContact: { name: "Chief Eze", phone: "08078901234", email: "chief.eze@email.com" },
    address: "89 Independence Layout, Enugu",
  },
  {
    id: "19",
    name: "Hauwa Aliyu",
    email: "hauwa.aliyu@school.edu",
    class: "Primary 5",
    grade: 93,
    age: 10,
    enrollmentDate: "2020-09-01",
    status: "active",
    educationalLevel: "primary",
    subjects: ["English", "Mathematics", "Basic Science", "Social Studies", "Hausa", "Computer Studies", "Arabic"],
    results: [
      { subject: "English", score: 91, grade: "A" },
      { subject: "Mathematics", score: 95, grade: "A" },
      { subject: "Basic Science", score: 92, grade: "A" },
      { subject: "Social Studies", score: 94, grade: "A" },
      { subject: "Hausa", score: 96, grade: "A" },
      { subject: "Computer Studies", score: 90, grade: "A" },
      { subject: "Arabic", score: 93, grade: "A" },
    ],
    fees: { tuition: 310000, paid: 310000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Dr. Aliyu", phone: "08090123456", email: "dr.aliyu@email.com" },
    address: "45 Minna, Niger",
  },

  // Junior Secondary (JS1-3)
  {
    id: "8",
    name: "Aisha Bello",
    email: "aisha.bello@school.edu",
    class: "JS1",
    grade: 88,
    age: 12,
    enrollmentDate: "2024-09-01",
    status: "active",
    educationalLevel: "junior-secondary",
    subjects: [
      "English",
      "Mathematics",
      "Basic Science",
      "Social Studies",
      "French",
      "Computer Studies",
      "CRK",
      "Physical Education",
    ],
    results: [
      { subject: "English", score: 85, grade: "B+" },
      { subject: "Mathematics", score: 90, grade: "A" },
      { subject: "Basic Science", score: 88, grade: "B+" },
      { subject: "Social Studies", score: 87, grade: "B+" },
      { subject: "French", score: 82, grade: "B" },
      { subject: "Computer Studies", score: 92, grade: "A" },
      { subject: "CRK", score: 89, grade: "B+" },
      { subject: "Physical Education", score: 95, grade: "A" },
    ],
    fees: { tuition: 400000, paid: 200000, balance: 200000, dueDate: "2024-12-15" },
    parentContact: { name: "Dr. Bello", phone: "08089012345", email: "dr.bello@email.com" },
    address: "12 Maitama, Abuja",
  },
  {
    id: "9",
    name: "Kemi Adeyemi",
    email: "kemi.adeyemi@school.edu",
    class: "JS2",
    grade: 95,
    age: 13,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "junior-secondary",
    subjects: [
      "English",
      "Mathematics",
      "Basic Science",
      "Social Studies",
      "Yoruba",
      "Computer Studies",
      "Business Studies",
      "Home Economics",
    ],
    results: [
      { subject: "English", score: 95, grade: "A" },
      { subject: "Mathematics", score: 98, grade: "A" },
      { subject: "Basic Science", score: 92, grade: "A" },
      { subject: "Social Studies", score: 94, grade: "A" },
      { subject: "Yoruba", score: 96, grade: "A" },
      { subject: "Computer Studies", score: 97, grade: "A" },
      { subject: "Business Studies", score: 93, grade: "A" },
      { subject: "Home Economics", score: 91, grade: "A" },
    ],
    fees: { tuition: 420000, paid: 420000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Prof. Adeyemi", phone: "08090123456", email: "prof.adeyemi@email.com" },
    address: "56 Bodija, Ibadan",
  },
  {
    id: "10",
    name: "Daniel Okonkwo",
    email: "daniel.okonkwo@school.edu",
    class: "JS3",
    grade: 73,
    age: 14,
    enrollmentDate: "2022-09-01",
    status: "active",
    educationalLevel: "junior-secondary",
    subjects: [
      "English",
      "Mathematics",
      "Basic Science",
      "Social Studies",
      "Agricultural Science",
      "Computer Studies",
      "Fine Arts",
      "Music",
    ],
    results: [
      { subject: "English", score: 70, grade: "C+" },
      { subject: "Mathematics", score: 75, grade: "B" },
      { subject: "Basic Science", score: 72, grade: "B-" },
      { subject: "Social Studies", score: 78, grade: "B" },
      { subject: "Agricultural Science", score: 80, grade: "B" },
      { subject: "Computer Studies", score: 68, grade: "C+" },
      { subject: "Fine Arts", score: 85, grade: "B+" },
      { subject: "Music", score: 88, grade: "B+" },
    ],
    fees: { tuition: 450000, paid: 225000, balance: 225000, dueDate: "2024-12-15" },
    parentContact: { name: "Mrs. Okonkwo", phone: "08001234567", email: "mrs.okonkwo@email.com" },
    address: "43 Awka Road, Onitsha",
  },

  // Senior Secondary Science (SS1-3)
  {
    id: "11",
    name: "Funmi Oladele",
    email: "funmi.oladele@school.edu",
    class: "SS1",
    grade: 90,
    age: 15,
    enrollmentDate: "2024-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "science",
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Further Mathematics", "Computer Science"],
    results: [
      { subject: "English", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Physics", score: 89, grade: "B+" },
      { subject: "Chemistry", score: 91, grade: "A" },
      { subject: "Biology", score: 90, grade: "A" },
      { subject: "Further Mathematics", score: 85, grade: "B+" },
      { subject: "Computer Science", score: 94, grade: "A" },
    ],
    fees: { tuition: 500000, paid: 250000, balance: 250000, dueDate: "2024-12-15" },
    parentContact: { name: "Engr. Oladele", phone: "08012345678", email: "engr.oladele@email.com" },
    address: "78 Lekki Phase 1, Lagos",
  },
  {
    id: "12",
    name: "Abdulrahman Yakubu",
    email: "abdulrahman.yakubu@school.edu",
    class: "SS2",
    grade: 82,
    age: 16,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "science",
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Geography", "Computer Science"],
    results: [
      { subject: "English", score: 80, grade: "B" },
      { subject: "Mathematics", score: 85, grade: "B+" },
      { subject: "Physics", score: 82, grade: "B" },
      { subject: "Chemistry", score: 84, grade: "B+" },
      { subject: "Biology", score: 81, grade: "B" },
      { subject: "Geography", score: 78, grade: "B" },
      { subject: "Computer Science", score: 88, grade: "B+" },
    ],
    fees: { tuition: 520000, paid: 520000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Yakubu", phone: "08023456789", email: "alhaji.yakubu@email.com" },
    address: "23 Kaduna South, Kaduna",
  },
  {
    id: "20",
    name: "Chidi Okafor",
    email: "chidi.okafor@school.edu",
    class: "SS3",
    grade: 88,
    age: 17,
    enrollmentDate: "2022-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "science",
    subjects: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Further Mathematics"],
    results: [
      { subject: "English", score: 85, grade: "B+" },
      { subject: "Mathematics", score: 90, grade: "A" },
      { subject: "Physics", score: 88, grade: "B+" },
      { subject: "Chemistry", score: 89, grade: "B+" },
      { subject: "Biology", score: 87, grade: "B+" },
      { subject: "Further Mathematics", score: 91, grade: "A" },
    ],
    fees: { tuition: 530000, paid: 265000, balance: 265000, dueDate: "2024-12-15" },
    parentContact: { name: "Prof. Okafor", phone: "08001234567", email: "prof.okafor@email.com" },
    address: "78 Nsukka, Enugu",
  },

  // Senior Secondary Arts (SS1-3)
  {
    id: "13",
    name: "Grace Nnenna",
    email: "grace.nnenna@school.edu",
    class: "SS1",
    grade: 87,
    age: 15,
    enrollmentDate: "2024-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "arts",
    subjects: ["English", "Mathematics", "Literature", "Government", "History", "CRK", "Fine Arts"],
    results: [
      { subject: "English", score: 92, grade: "A" },
      { subject: "Mathematics", score: 78, grade: "B" },
      { subject: "Literature", score: 95, grade: "A" },
      { subject: "Government", score: 88, grade: "B+" },
      { subject: "History", score: 85, grade: "B+" },
      { subject: "CRK", score: 90, grade: "A" },
      { subject: "Fine Arts", score: 94, grade: "A" },
    ],
    fees: { tuition: 480000, paid: 240000, balance: 240000, dueDate: "2024-12-15" },
    parentContact: { name: "Rev. Nnenna", phone: "08034567890", email: "rev.nnenna@email.com" },
    address: "67 Owerri Municipal, Imo",
  },
  {
    id: "21",
    name: "Zainab Usman",
    email: "zainab.usman@school.edu",
    class: "SS2",
    grade: 91,
    age: 16,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "arts",
    subjects: ["English", "Mathematics", "Literature", "Government", "History", "Geography", "CRK"],
    results: [
      { subject: "English", score: 94, grade: "A" },
      { subject: "Mathematics", score: 85, grade: "B+" },
      { subject: "Literature", score: 96, grade: "A" },
      { subject: "Government", score: 90, grade: "A" },
      { subject: "History", score: 92, grade: "A" },
      { subject: "Geography", score: 88, grade: "B+" },
      { subject: "CRK", score: 93, grade: "A" },
    ],
    fees: { tuition: 500000, paid: 500000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Usman", phone: "08012345678", email: "alhaji.usman@email.com" },
    address: "23 Bauchi Road, Bauchi",
  },
  {
    id: "22",
    name: "Ngozi Okwu",
    email: "ngozi.okwu@school.edu",
    class: "SS3",
    grade: 89,
    age: 17,
    enrollmentDate: "2022-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "arts",
    subjects: ["English", "Mathematics", "Literature", "Government", "History", "Fine Arts", "Music"],
    results: [
      { subject: "English", score: 92, grade: "A" },
      { subject: "Mathematics", score: 82, grade: "B" },
      { subject: "Literature", score: 94, grade: "A" },
      { subject: "Government", score: 87, grade: "B+" },
      { subject: "History", score: 90, grade: "A" },
      { subject: "Fine Arts", score: 96, grade: "A" },
      { subject: "Music", score: 93, grade: "A" },
    ],
    fees: { tuition: 510000, paid: 255000, balance: 255000, dueDate: "2024-12-15" },
    parentContact: { name: "Mrs. Okwu", phone: "08023456789", email: "mrs.okwu@email.com" },
    address: "67 Awka, Anambra",
  },

  // Senior Secondary Commercial (SS1-3)
  {
    id: "14",
    name: "Yusuf Garba",
    email: "yusuf.garba@school.edu",
    class: "SS2",
    grade: 91,
    age: 16,
    enrollmentDate: "2023-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "commercial",
    subjects: ["English", "Mathematics", "Economics", "Accounting", "Commerce", "Business Studies", "Computer Studies"],
    results: [
      { subject: "English", score: 88, grade: "B+" },
      { subject: "Mathematics", score: 90, grade: "A" },
      { subject: "Economics", score: 94, grade: "A" },
      { subject: "Accounting", score: 92, grade: "A" },
      { subject: "Commerce", score: 91, grade: "A" },
      { subject: "Business Studies", score: 89, grade: "B+" },
      { subject: "Computer Studies", score: 93, grade: "A" },
    ],
    fees: { tuition: 490000, paid: 490000, balance: 0, dueDate: "2024-12-15" },
    parentContact: { name: "Alhaji Garba", phone: "08045678901", email: "alhaji.garba@email.com" },
    address: "45 Sokoto Road, Sokoto",
  },
  {
    id: "23",
    name: "Samuel Adamu",
    email: "samuel.adamu@school.edu",
    class: "SS1",
    grade: 85,
    age: 15,
    enrollmentDate: "2024-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "commercial",
    subjects: ["English", "Mathematics", "Economics", "Accounting", "Commerce", "Business Studies", "Computer Studies"],
    results: [
      { subject: "English", score: 83, grade: "B+" },
      { subject: "Mathematics", score: 87, grade: "B+" },
      { subject: "Economics", score: 85, grade: "B+" },
      { subject: "Accounting", score: 88, grade: "B+" },
      { subject: "Commerce", score: 84, grade: "B+" },
      { subject: "Business Studies", score: 86, grade: "B+" },
      { subject: "Computer Studies", score: 89, grade: "B+" },
    ],
    fees: { tuition: 480000, paid: 240000, balance: 240000, dueDate: "2024-12-15" },
    parentContact: { name: "Mr. Adamu", phone: "08034567890", email: "mr.adamu@email.com" },
    address: "45 Jos, Plateau",
  },
  {
    id: "15",
    name: "Precious Udo",
    email: "precious.udo@school.edu",
    class: "SS3",
    grade: 94,
    age: 17,
    enrollmentDate: "2022-09-01",
    status: "active",
    educationalLevel: "senior-secondary",
    stream: "commercial",
    subjects: ["English", "Mathematics", "Economics", "Accounting", "Commerce", "Government", "Computer Studies"],
    results: [
      { subject: "English", score: 95, grade: "A" },
      { subject: "Mathematics", score: 92, grade: "A" },
      { subject: "Economics", score: 96, grade: "A" },
      { subject: "Accounting", score: 94, grade: "A" },
      { subject: "Commerce", score: 93, grade: "A" },
      { subject: "Government", score: 91, grade: "A" },
      { subject: "Computer Studies", score: 97, grade: "A" },
    ],
    fees: { tuition: 510000, paid: 255000, balance: 255000, dueDate: "2024-12-15" },
    parentContact: { name: "Dr. Udo", phone: "08056789012", email: "dr.udo@email.com" },
    address: "89 Uyo Township, Akwa Ibom",
  },
]

import { createClient } from "@supabase/supabase-js"

// 👇 Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return MOCK_STUDENTS
}

export const searchStudents = (students: Student[], query: string): Student[] => {
  if (!query.trim()) return students

  const lowercaseQuery = query.toLowerCase()
  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(lowercaseQuery) ||
      student.email.toLowerCase().includes(lowercaseQuery) ||
      student.class.toLowerCase().includes(lowercaseQuery),
  )
}

export const getUniqueClasses = (students: Student[]): string[] => {
  return Array.from(new Set(students.map((student) => student.class))).sort((a, b) => {
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

export const addStudent = async (studentData: Omit<Student, "id" | "enrollmentDate">): Promise<Student> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate new ID
  const newId = (Math.max(...MOCK_STUDENTS.map((s) => Number.parseInt(s.id))) + 1).toString()

  // Auto-assign subjects based on educational level and stream
  const getSubjectsForLevel = (level: Student["educationalLevel"], stream?: Student["stream"], className?: string) => {
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

  const newStudent: Student = {
    ...studentData,
    id: newId,
    enrollmentDate: new Date().toISOString().split("T")[0],
    subjects: getSubjectsForLevel(studentData.educationalLevel, studentData.stream, studentData.class),
    results: [], // New students start with no results
  }

  // Add to mock data
  MOCK_STUDENTS.push(newStudent)

  return newStudent
}

export const updateStudent = async (studentId: string, updates: Partial<Student>): Promise<Student | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const studentIndex = MOCK_STUDENTS.findIndex((s) => s.id === studentId)
  if (studentIndex === -1) return null

  MOCK_STUDENTS[studentIndex] = { ...MOCK_STUDENTS[studentIndex], ...updates }
  return MOCK_STUDENTS[studentIndex]
}

export const deleteStudent = async (studentId: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const studentIndex = MOCK_STUDENTS.findIndex((s) => s.id === studentId)
  if (studentIndex === -1) return false

  MOCK_STUDENTS.splice(studentIndex, 1)
  return true
}
