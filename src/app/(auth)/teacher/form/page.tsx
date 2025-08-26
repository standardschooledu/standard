import TeacherForm from '@/components/TeachersForm'
import React from 'react'

const Page = () => {
  return (
    <main className='p-4'>
      <h1 className='text-center text-2xl font-600'>Teacher's Form</h1>
      <p className='text-center text-sm text-gray-400'>Complete this form to get started</p>
      <TeacherForm />
    </main>
  )
}

export default Page