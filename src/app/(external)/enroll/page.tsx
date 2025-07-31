// app/enroll/page.tsx
import React from 'react';
import Link from 'next/link';

export default function EnrollPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 px-4 py-10">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Enroll Now</h1>
        <p className="text-lg text-center mb-10">
          Begin your journey with us. Follow the steps below to apply for admission into our school.
        </p>

        {/* Requirements */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Admission Requirements</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Completed Application Form</li>
            <li>Birth Certificate or Age Declaration</li>
            <li>Previous School Results / Transcripts</li>
            <li>Passport Photograph (recent)</li>
            <li>Entrance Exam (if applicable)</li>
          </ul>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">How to Enroll</h2>
          <ol className="list-decimal pl-5 space-y-3">
            <li>Create an account or log in</li>
            <li>Fill the online enrollment form</li>
            <li>Upload the required documents</li>
            <li>Pay the application/enrollment fee</li>
            <li>Submit your application</li>
            <li>Track your application status</li>
            <li>Accept admission and complete registration</li>
          </ol>
        </div>

        {/* Enrollment Button */}
        <div className="text-center mb-10">
          <Link href="/enroll/form">
            <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition">
              Start Enrollment
            </span>
          </Link>
        </div>


        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="mb-2">📧 Email: <a href="mailto:admissions@school.com" className="text-blue-600 hover:underline">admissions@school.com</a></p>
          <p className="mb-2">📞 Phone: <a href="tel:+2348012345678" className="text-blue-600 hover:underline">+234 801 234 5678</a></p>
          <p className="mb-2">💬 WhatsApp: <a href="https://wa.me/2348012345678" target="_blank" className="text-blue-600 hover:underline">Chat with us</a></p>
        </div>
      </section>
    </main>
  );
}
