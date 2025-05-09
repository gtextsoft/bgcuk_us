"use client"

import { AnimatedSection } from "@/components/animated-section"
import { AnimatedText } from "@/components/animated-text"
import { SpeakerCard } from "@/components/speaker-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SpeakersSection() {
  const speakers = [
    {
      name: "Dr. Cosmas Maduka",
      title: "Distinguished Business Leader & Entrepreneur",
      bio: "Dr. Cosmas Maduka is a highly respected business leader known for his entrepreneurial excellence and business wisdom. His journey from humble beginnings to building a business empire has inspired countless entrepreneurs with practical strategies for sustainable growth.",
      topic: "CEO and Founder of Coscharis",
      image: "/images/Maduka.jpg",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Michael Chen",
      title: "Investment Banker & Venture Capital Advisor",
      bio: "Michael Chen is a former Goldman Sachs investment banker who now advises startups and SMEs on funding strategies. He has helped businesses secure over $100M in funding and specializes in creating investor-ready business models.",
      topic: "Funding Acquisition",
      image: "/placeholder.svg?height=400&width=400",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Jessica Williams",
      title: "Sales Psychology Expert & Revenue Strategist",
      bio: "Jessica Williams is renowned for her expertise in sales psychology and high-ticket closing strategies. Her methodologies have helped businesses increase conversion rates by an average of 43% and boost revenue without increasing marketing spend.",
      topic: "Sales Mastery",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
    },
    {
      name: "David Okafor",
      title: "Operations Scaling Specialist & Team Building Coach",
      bio: "David Okafor has scaled three businesses to 8 figures and specializes in operational efficiency and team building. His expertise lies in creating systems that allow businesses to scale without the founder becoming a bottleneck.",
      topic: "Team Building",
      image: "/placeholder.svg?height=400&width=400",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slideUp">
          <h2 className="text-4xl font-bold mb-4 text-center">
            <AnimatedText text="Expert Speakers" animation="highlight" />
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.2}>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            Learn from industry leaders who have successfully scaled businesses and mastered the art of sustainable
            growth.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={index}
              name={speaker.name}
              title={speaker.title}
              bio={speaker.bio}
              topic={speaker.topic}
              image={speaker.image}
              twitter={speaker.twitter}
              linkedin={speaker.linkedin}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="https://www.globalwealthfestival.com" target="_blank">Register to Meet Our Speakers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
