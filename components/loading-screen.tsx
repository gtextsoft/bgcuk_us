"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-8">
        <motion.div
          className="w-16 h-16 bg-red-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-4 border-white rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <motion.h2
        className="text-2xl font-bold text-white mb-2"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        Business Growth Conference
      </motion.h2>

      <div className="flex space-x-2 mt-4">
        <motion.div
          className="w-3 h-3 bg-red-600 rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0,
          }}
        />
        <motion.div
          className="w-3 h-3 bg-red-600 rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-3 h-3 bg-red-600 rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </div>
    </motion.div>
  )
}
