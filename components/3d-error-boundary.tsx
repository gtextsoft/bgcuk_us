"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ThreeDErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D component error:", error, errorInfo)

    // Log specific error details for debugging
    if (error.message.includes("Invalid typed array length")) {
      console.error(
        "Buffer allocation error detected. This is likely due to invalid geometry parameters or texture dimensions.",
      )
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">3D Visualization Unavailable</h3>
              <p className="text-zinc-400">
                Your browser may not support 3D graphics, or there might be an issue with the 3D component.
              </p>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
