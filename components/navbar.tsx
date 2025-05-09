"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Topics", href: "/#topics" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
    { label: "Register", href: "/#register" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-2">
              <span className="font-bold text-white">BGC</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">Business Growth Conference</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} className="text-zinc-300 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/#register">Register Now</Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-zinc-800 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-2">
                      <span className="font-bold text-white">BGC</span>
                    </div>
                    <span className="font-bold">Business Growth Conference</span>
                  </div>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>

                <nav className="flex flex-col p-4 space-y-4">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-4">
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/#register" onClick={() => setIsOpen(false)}>
                      Register Now
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
