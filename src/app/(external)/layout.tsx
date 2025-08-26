"use client"

import { useState, useEffect } from "react"
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default layout;



export function ScrollControls() {
  const [showScrollUp, setShowScrollUp] = useState(false)
  const [showScrollDown, setShowScrollDown] = useState(true)

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight

      // Show scroll up button if not at top
      setShowScrollUp(scrollY > 200)

      // Show scroll down button if not at bottom
      setShowScrollDown(scrollY + windowHeight < pageHeight - 200)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // run initially
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll up
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Scroll down
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3">
      {showScrollUp && (
        <button
          onClick={scrollToTop}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          ↑ Up
        </button>
      )}
      {showScrollDown && (
        <button
          onClick={scrollToBottom}
          className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition-all"
        >
          ↓ Down
        </button>
      )}
    </div>
  )
}

