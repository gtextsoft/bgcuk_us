"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
  animation?: "fadeIn" | "slideUp" | "slideIn" | "scale"
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  once = true,
  animation = "fadeIn",
}: AnimatedSectionProps) {
  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    slideIn: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
  }

  return (
    <motion.div
      className={className}
      initial={variants[animation].initial}
      whileInView={variants[animation].animate}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
