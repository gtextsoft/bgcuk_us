"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  text: string | ReactNode
  className?: string
  once?: boolean
  delay?: number
  animation?: "fadeIn" | "slideUp" | "typewriter" | "highlight"
}

export function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  animation = "fadeIn",
}: AnimatedTextProps) {
  // For string text that needs to be split into words or characters
  const renderSplitText = () => {
    if (typeof text !== "string") return text

    // Split the text into words for certain animations
    if (animation === "typewriter") {
      return (
        <motion.span
          className={className}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once }}
          transition={{ duration: 1, delay, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      )
    }

    // For highlight animation
    if (animation === "highlight") {
      return (
        <motion.span
          className={`relative inline-block ${className}`}
          initial={{ color: "white" }}
          whileInView={{ color: "white" }}
          viewport={{ once }}
        >
          {text}
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600/70 -z-10"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once }}
            transition={{ duration: 0.8, delay, ease: "easeInOut" }}
          />
        </motion.span>
      )
    }

    // Default animations (fadeIn, slideUp)
    const variants = {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      },
      slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      },
    }

    return (
      <motion.span
        className={className}
        initial={variants[animation].initial}
        whileInView={variants[animation].animate}
        viewport={{ once }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      >
        {text}
      </motion.span>
    )
  }

  return renderSplitText()
}
