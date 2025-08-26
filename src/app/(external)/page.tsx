import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  X,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";


export default function Home() {
  const blogPosts = [
    {
      id: 1,
      title: "Preparing Students for the Digital Age",
      excerpt:
        "How Standard School integrates technology into our curriculum to prepare students for tomorrow's challenges.",
      date: "March 15, 2024",
      category: "Education",
      image: "/file.jpg",
    },
    {
      id: 2,
      title: "Excellence in Sports: Our Championship Journey",
      excerpt:
        "Celebrating our recent victories and the importance of sports in character development.",
      date: "March 10, 2024",
      category: "Sports",
      image: "/children.jpg",
    },
    {
      id: 3,
      title: "Parent-Teacher Partnership: Building Success Together",
      excerpt:
        "Exploring how collaboration between parents and teachers creates the best learning environment.",
      date: "March 5, 2024",
      category: "Community",
      image: "/pta.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="top" className="relative bg-gradient-to-br from-gold-50 to-ash-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/40 text-gold-800 hover:bg-gold-200">
                Excellence in Education Since 1998
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-ash-900 leading-tight">
                Shaping Tomorrow's
                <span className="text-primary"> Leaders</span>
              </h1>
              <p className="text-lg text-gray-500 max-w-lg">
                At Standard School, we provide world-class education that
                nurtures academic excellence, character development, and
                prepares students for success in an ever-changing world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/posts">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary text-white"
                  >
                    Stories & Insights
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-ash-300 text-ash-700 hover:bg-ash-50 bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/school_frontage_edited2.jpg"
                alt="Standard School Campus"
                width={600}
                height={350}
                className="rounded-lg shadow-xl p-0 h-full"
              />
            </div>
          </div>
        </div>
      </section>
       {/* <a href="#bottom" className="text-center absolute bottom-5">
        <button className=" p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300">
          ↓
        </button>
      </a> */}

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-ash-900 mb-4">
              Why Choose Standard School?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We offer a comprehensive educational experience that goes beyond
              academics to develop well-rounded individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-50 pt-0 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pt-5">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-ash-900">
                  Academic Excellence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500 text-center">
                  Rigorous curriculum designed to challenge and inspire students
                  to reach their full potential with personalized learning
                  approaches.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-gray-50 pt-0 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pt-5">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-ash-900">Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500 text-center">
                  Dedicated teachers with advanced degrees and years of
                  experience, committed to nurturing each student's unique
                  talents.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-gray-50 pt-0 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pt-5">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-ash-900">
                  Holistic Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500 text-center">
                  Comprehensive programs including sports, arts, leadership, and
                  community service to develop well-rounded individuals.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                1,200+
              </div>
              <div className="text-gray-500">Students</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                95%
              </div>
              <div className="text-gray-500">College Acceptance</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                50+
              </div>
              <div className="text-gray-500">Expert Teachers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                38
              </div>
              <div className="text-gray-500">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-ash-900 mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Stay informed about the latest happenings, achievements, and
              insights from our school community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="border-gray-50 pt-0 hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={post.image || "/file.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-ash-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <CardTitle className="text-ash-900 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-500 mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary hover:text-gold-700 font-medium inline-flex items-center"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={"/posts"}
              className="border-gold-500 border-2 p-4 rounded-md text-primary hover:bg-gold-50 bg-transparent"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="bottom" className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards your child's bright future. Schedule a
            campus tour or apply for admission today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-ash-50">
              Schedule Campus Tour
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
      {/* <a href="#top">
        <button className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300">
          top
        </button>
      </a> */}

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 ">
                  <Image
                    src="/images/school_logo_enhanced_brightness-no-bg.png"
                    alt="School Logo"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-xl font-bold">Standard School</span>
              </div>
              <p className="text-ash-300 mb-3">
                Committed to excellence in education and developing tomorrow's
                leaders through innovative learning experiences.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-ash-400 hover:text-gold-400 cursor-pointer" />
                <span className="[&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    color="white"
                    viewBox="0 0 512 512">
                    <path
                      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </span>
                <TwitterIcon className="h-5 w-5 text-ash-400 hover:text-gold-400 cursor-pointer" />
                <Instagram className="h-5 w-5 text-ash-400 hover:text-gold-400 cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-ash-300">
                <li>
                  <Link href="/about" className="hover:text-gold-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/academics" className="hover:text-gold-400">
                    Academic Programs
                  </Link>
                </li>
                <li>
                  <Link href="/enroll" className="hover:text-gold-400">
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link href="/academic-calendar" className="hover:text-gold-400">
                    Academic Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-gold-400">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Programs</h3>
              <ul className="space-y-2 text-ash-300">
                <li>
                  <Link href="#" className="hover:text-gold-400">
                    Creche & Nursery School
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gold-400">
                    Primary School
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gold-400">
                    High School
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gold-400">
                    Summer Programs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-ash-300">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gold-400" />
                  <span>123 Education Ave, Learning City, LC 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gold-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gold-400" />
                  <span>info@standardschool.edu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-ash-700 mt-12 pt-8 text-center text-ash-400">
            <p>
              &copy; {new Date().getFullYear()} Standard School. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
