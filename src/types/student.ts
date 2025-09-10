export interface ParentContact {
  name: string;
  phone: string;
  email: string;
}

export interface Result {
  subject: string
  score: number
  grade: number
}

export interface Student {
  // age?: number;
  id: string
  firstName: string
  lastName: string
  middleName?: string
  email?: string
  gender: string
  dob: string
//   age: number
  address: string
  status: string              // <-- add
  grade?: number
  parentName: string
  parentContact: ParentContact
  educationalLevel: "early-years" | "primary" | "junior-secondary" | "senior-secondary"
  class_id: string
  stream?: "science" | "arts" | "commercial"
  enrollmentDate: string
  subjects: string[]
  results: {
    subject: string
    score: number
    grade: number
  }[]
  fees: {
    tuition: number
    paid: number
    balance: number
    dueDate: string
  }
  name: string
}

// export type Student = {

//   grade?: number
//   enrollmentDate: string
//   address?: string
//   parentContact?: {
//     name: string
//     phone?: string
//     email?: string
//   }
//   fees?: {
//     tuition: number
//     paid: number
//     balance: number
//     dueDate: string
//   }
//   subjects?: string[]
//   results?: {
//     subject: string
//     score: number
//     grade: string
//   }[]
// }


// export interface Student {
//   id: string
//   name: string
//   email: string
//   class: string
//   grade: number
//   age: number
//   enrollmentDate: string
//   status: "active" | "inactive"
//   avatar?: string
//   educationalLevel: "early-years" | "primary" | "junior-secondary" | "senior-secondary"
//   stream?: "science" | "arts" | "commercial" // For senior secondary only
//   subjects: string[]
  // results: {
  //   subject: string
  //   score: number
  //   grade: string
  // }[]
//   fees: {
//     tuition: number
//     paid: number
//     balance: number
//     dueDate: string
//   }
//   parentContact: {
//     name: string
//     phone: string
//     email: string
//   }
//   address: string
// }