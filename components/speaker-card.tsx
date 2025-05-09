"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface SpeakerCardProps {
  name: string
  title: string
  bio: string
  topic: string
  image: string
  twitter?: string
  linkedin?: string
}

export function SpeakerCard({ name, title, bio, topic, image, twitter, linkedin }: SpeakerCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 h-full overflow-hidden">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-2">
                {topic}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-red-500 font-medium mb-4">{title}</p>
            <p className="text-zinc-300 mb-6 text-sm flex-grow">{bio}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-2 mt-auto"
          >
            {twitter && (
              <Button asChild variant="outline" size="icon" className="rounded-full">
                <Link href={twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            )}
            {linkedin && (
              <Button asChild variant="outline" size="icon" className="rounded-full">
                <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
