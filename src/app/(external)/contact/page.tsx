"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-gray-700 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl text-amber-100 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <Card className="bg-white/80 py-0 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="p-4 sm:p-7 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-t-lg">
                <CardTitle className="text-xl sm:text-2xl">Send us a Message</CardTitle>
                <CardDescription className="text-amber-100 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="border-amber-200 focus:border-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="border-amber-200 focus:border-amber-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    rows={5}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* School Info Card */}
            <Card className="bg-gradient-to-br from-white/95 to-amber-50/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-800">Standard School</CardTitle>
                <CardDescription className="text-amber-700">Excellence in Education Since 1985</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Address</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      123 Education Boulevard
                      <br />
                      Learning District, LD 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Phone Numbers</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Main Office: (555) 123-4567
                      <br />
                      Admissions: (555) 123-4568
                      <br />
                      Emergency: (555) 123-4569
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Email Addresses</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      General: info@standardschool.edu
                      <br />
                      Admissions: admissions@standardschool.edu
                      <br />
                      Support: support@standardschool.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-gray-600 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Office Hours</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Monday - Friday: 7:30 AM - 4:30 PM
                      <br />
                      Saturday: 9:00 AM - 2:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links Card */}
            <Card className="bg-gradient-to-br from-amber-50/90 to-gray-50/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-gray-800">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Button
                    variant="outline"
                    className="justify-start border-amber-200 hover:bg-amber-50 bg-transparent text-sm sm:text-base"
                  >
                    Admissions
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-amber-200 hover:bg-amber-50 bg-transparent text-sm sm:text-base"
                  >
                    Academic Programs
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-amber-200 hover:bg-amber-50 bg-transparent text-sm sm:text-base"
                  >
                    Student Portal
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-amber-200 hover:bg-amber-50 bg-transparent text-sm sm:text-base"
                  >
                    Parent Resources
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="bg-white/80 py-0 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-0">
                <div className="m-0 h-48 sm:h-64 bg-gradient-to-br from-amber-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-700 px-4">
                    <MapPin className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" />
                    <p className="font-semibold text-sm sm:text-base">Interactive Map</p>
                    <p className="text-xs sm:text-sm">Click to view directions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <Card className="mt-8 sm:mt-12 bg-gradient-to-r from-amber-50 to-gray-100 border-amber-300">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-center text-gray-800 text-lg sm:text-xl">Emergency Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-amber-700 mb-2 text-sm sm:text-base">Medical Emergency</h3>
                <p className="text-gray-700 text-sm sm:text-base">Call 911 immediately</p>
                <p className="text-xs sm:text-sm text-amber-600">Then notify school: (555) 123-4569</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-amber-700 mb-2 text-sm sm:text-base">School Emergency</h3>
                <p className="text-gray-700 text-sm sm:text-base">(555) 123-4569</p>
                <p className="text-xs sm:text-sm text-amber-600">Available 24/7</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-amber-700 mb-2 text-sm sm:text-base">After Hours</h3>
                <p className="text-gray-700 text-sm sm:text-base">emergency@standardschool.edu</p>
                <p className="text-xs sm:text-sm text-amber-600">Response within 2 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
