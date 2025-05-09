"use client"

import type React from "react"

import { Suspense, useState, useEffect } from "react"
import { ThreeDErrorBoundary } from "./3d-error-boundary"

interface ClientWrapperProps {
  component: React.ComponentType
  height?: string
  fallback?: React.ReactNode
}

export function ThreeDClientWrapper({ component: Component, height = "400px", fallback }: ClientWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    try {
      // Check for WebGL support
      const canvas = document.createElement("canvas")
      const hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      )

      if (!hasWebGL) {
        setHasError(true)
      } else {
        setIsMounted(true)
      }
    } catch (e) {
      console.error("WebGL detection error:", e)
      setHasError(true)
    }
  }, [])

  if (hasError) {
    return (
      <div className="w-full flex items-center justify-center bg-zinc-900 rounded-lg" style={{ height }}>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">3D Visualization Unavailable</h3>
          <p className="text-zinc-400">
            Your browser may not support 3D graphics, or there might be an issue with the 3D component.
          </p>
        </div>
      </div>
    )
  }

  if (!isMounted) {
    return (
      <div className="w-full flex items-center justify-center bg-zinc-900 rounded-lg" style={{ height }}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-red-600/30 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-zinc-700 rounded mb-2"></div>
          <div className="h-3 w-24 bg-zinc-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <ThreeDErrorBoundary
      fallback={
        fallback || (
          <div className="w-full flex items-center justify-center bg-zinc-900 rounded-lg" style={{ height }}>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">3D Visualization Unavailable</h3>
              <p className="text-zinc-400">
                Your browser may not support 3D graphics, or there might be an issue with the 3D component.
              </p>
            </div>
          </div>
        )
      }
    >
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center bg-zinc-900 rounded-lg" style={{ height }}>
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-16 w-16 bg-red-600/30 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-zinc-700 rounded mb-2"></div>
              <div className="h-3 w-24 bg-zinc-700 rounded"></div>
            </div>
          </div>
        }
      >
        <Component />
      </Suspense>
    </ThreeDErrorBoundary>
  )
}
