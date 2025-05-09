"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TicketCardProps {
  location: string
  dates: string
  price: string
  features: string[]
}

export function TicketCard({ location, dates, price, features }: TicketCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 h-full">
      <CardContent className="p-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-1">{location}</h3>
          <p className="text-zinc-400">{dates}</p>
          <motion.div
            className="mt-4"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-4xl font-bold text-red-500">{price}</span>
          </motion.div>
        </motion.div>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <div className="h-5 w-5 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center mt-0.5 mr-2">
                <Check className="h-3 w-3" />
              </div>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
            <Link href="/register">Register Now</Link>
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}
