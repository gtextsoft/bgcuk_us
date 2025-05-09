"use client"

import { AnimatedSection } from "@/components/animated-section"
import { AnimatedText } from "@/components/animated-text"
import { Button } from "@/components/ui/button"
import { Award, BookOpen, Globe, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HostSection() {
  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slideUp">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <AnimatedText text="Meet Our Speaker" animation="highlight" />
          </h2>
        </AnimatedSection>

        {/* Stephen Akintayo - Convener */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <AnimatedSection animation="slideIn" delay={0.2}>
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-xl">
              <Image
                src="/images/dr-stephen.png"
                alt="Dr. Stephen Akintayo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={0.4}>
            <div className="space-y-6">
              <div className="inline-block bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-2">
                Convener
              </div>
              <h3 className="text-3xl font-bold">Dr. Stephen Akintayo</h3>
              <p className="text-xl text-zinc-300">Business Growth Strategist & Founder, Stephen Akintayo Foundation</p>

              <div className="space-y-4 text-zinc-300">
                <p>
                  Dr. Stephen Akintayo is a renowned business growth strategist, investor, and serial entrepreneur who
                  has helped thousands of business owners scale their operations to 7, 8, and 9 figures.
                </p>
                <p>
                  With over 15 years of experience in business development, Dr. Akintayo brings practical, actionable
                  strategies that have been tested and proven across multiple industries.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center text-zinc-300">
                  <Award className="w-5 h-5 mr-2 text-red-500" />
                  <span>Multiple Business Awards</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <BookOpen className="w-5 h-5 mr-2 text-red-500" />
                  <span>Bestselling Author</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <Globe className="w-5 h-5 mr-2 text-red-500" />
                  <span>Global Business Mentor</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4 mt-4">
                <Button asChild variant="outline" size="icon" className="rounded-full">
                  <Link href="https://twitter.com/stephenakintayo" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                  <Link href="https://linkedin.com/in/stephenakintayo" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="text-center mt-16">
          <Button asChild className="relative z-10 bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
            <Link href="https://www.globalwealthfestival.com" target="_blank">Register Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
