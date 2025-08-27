import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google" // Changed font import
import "./globals.css"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] }) // Use desired weights

export const metadata: Metadata = {
  title: "Standard School - Excellence in Education",
  description: "Shaping tomorrow's leaders through world-class education and character development.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={poppins.className}> {/* Changed to poppins */}
        {children}
      </body>
    </html>
  )
}