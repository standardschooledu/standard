import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-50 pt-0 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href={'/'} className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Standard School
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#about"
            className="text-ash-700 hover:text-primary font-medium"
          >
            About
          </Link>
          <Link
            href="/posts"
            className="text-ash-700 hover:text-primary font-medium"
          >
            Blogs
          </Link>
          <Link
            href="#admissions"
            className="text-ash-700 hover:text-primary font-medium"
          >
            Admissions
          </Link>
          <Link
            href="#blog"
            className="text-ash-700 hover:text-primary font-medium"
          >
            News
          </Link>
          <Link
            href="#contact"
            className="text-ash-700 hover:text-primary font-medium"
          >
            Contact
          </Link>
        </nav>
        <Button className="bg-primary hover:bg-primary text-white">
          Apply Now
        </Button>
      </div>
    </header>
  );
};

export default Header;
