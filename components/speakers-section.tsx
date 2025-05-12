"use client"

import { AnimatedSection } from "@/components/animated-section"
import { AnimatedText } from "@/components/animated-text"
import { SpeakerCard } from "@/components/speaker-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Define speaker type
interface Speaker {
  name: string;
  title: string;
  bio: string;
  topic: string;
  image: string;
  twitter?: string;
  linkedin?: string;
}

// Speakers data
const speakers: Speaker[] = [];

export function SpeakersSection() {
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
          {speakers.map((speaker: Speaker, index: number) => (
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
