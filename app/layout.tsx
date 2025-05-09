import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingScreen } from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Growth Conference | How To Scale to 10 Figures",
  description:
    "Join an exclusive, high-level business growth conference crafted for ambitious entrepreneurs and business owners who are ready to scale sustainably, increase profits, and minimise risk.",
    generator: 'Tee Shine'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LoadingScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
