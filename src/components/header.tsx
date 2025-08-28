"use client"

import Link from "next/link"
import { useState } from "react"
import { BookOpen, Menu, X, Home, Info, Phone, FileText } from "lucide-react"
import Image from "next/image"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/posts", label: "Our Blog", icon: FileText },
    { href: "/academics", label: "Academic", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-50 pt-0 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href={"/"} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Image src="/images/school_logo_enhanced_brightness.png" alt="School Logo" width={40} height={40} />
            </div>
            <span className="text-xl font-bold text-gray-900">Standard School</span>
          </Link>

          {/* Desktop Navigation - Your existing nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-ash-700 hover:text-primary font-medium">
              About
            </Link>
            <Link href="/posts" className="text-ash-700 hover:text-primary font-medium">
              Our Blog
            </Link>
            <Link href="/academics" className="text-ash-700 hover:text-primary font-medium">
              Academic
            </Link>
            <Link href="/contact" className="text-ash-700 hover:text-primary font-medium">
              Contact
            </Link>
          </nav>

          {/* Desktop Enroll Button - Your existing button */}
          <div className="hidden md:block">
            <Link href="/enroll">
              <span className="inline-block bg-primary px-1 py-1 rounded-md text-lg font-medium hover:bg-primary text-white pl-7 pr-7 transition">
                Enroll
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Image src="/images/school_logo_enhanced_brightness.png" alt="School Logo" width={40} height={40} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Standard School</h2>
                <p className="text-xs text-gray-600">Excellence in Education</p>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 hover:text-primary text-ash-700 transition-colors duration-200 group"
              >
                <link.icon className="h-5 w-5 text-gray-500 group-hover:text-primary" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Enroll Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/enroll"
              onClick={closeMobileMenu}
              className="block w-full bg-primary hover:bg-primary/90 text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Enroll Now
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><a href="mailto:standardshs2017@gmail.com"></a>📧 standardshs2017@gmail.com</p>
              <p><a href="+2347068777735">📞 +234 7068777735,</a></p>
              <p><a href="+2348139345775">📞 +234 8139345775</a></p>
              <p>📍 Rara Road, Ife North West, Osun State.</p>
            </div>
          </div>

          {/* School Levels */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">School Levels</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Nursery School</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Primary School</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Secondary School</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
