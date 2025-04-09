import React from "react"
import Image from "next/image"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  >
                  <Navbar/>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/img.png")' }}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}