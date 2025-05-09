"use client"

import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="bg-black border-zinc-800 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <QuoteIcon className="h-8 w-8 text-red-500 mb-4" />
        </motion.div>

        <motion.p
          className="mb-8 text-zinc-300 flex-grow text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {quote}
        </motion.p>

        <motion.div
          className="flex items-center mt-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mr-3">
            <span className="font-bold text-sm">{author.charAt(0)}</span>
          </div>
          <div>
            <p className="font-semibold text-lg">{author}</p>
            <p className="text-sm text-zinc-400">[{role}]</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
