import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-2">
                <span className="font-bold text-white">BGC</span>
              </div>
              <span className="font-bold text-xl">Business Growth Conference</span>
            </div>
            <p className="text-zinc-400 mb-2">
              A Stephen Akintayo Foundation Initiative
            </p>
            <p className="text-zinc-400 mb-4">
              Join an exclusive, high-level business growth conference crafted for ambitious entrepreneurs and business
              owners.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-zinc-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#topics" className="text-zinc-400 hover:text-white">
                  Topics
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-zinc-400 hover:text-white">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-zinc-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="https://www.globalwealthfestival.com" target="_blank" className="text-zinc-400 hover:text-white">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-red-500" />
                <span className="text-zinc-400">products@stephenkintayo.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-red-500" />
                <span className="text-zinc-400">
                  +234 816 790 1719
                  <br />
                  +234 815 555 5616
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-red-500" />
                <span className="text-zinc-400">US & UK</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-zinc-400 mb-4">Stay updated with the latest news and upcoming events.</p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="bg-zinc-900 border-zinc-800" />
              <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-center">
          <p className="text-zinc-400">
            &copy; {new Date().getFullYear()} Business Growth Conference | Stephen Akintayo Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
