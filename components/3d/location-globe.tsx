"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, useTexture, Html } from "@react-three/drei"
import type * as THREE from "three"

interface LocationMarkerProps {
  position: [number, number, number]
  name: string
  date: string
}

function LocationMarker({ position, name, date }: LocationMarkerProps) {
  const [hovered, setHovered] = useState(false)

  // Ensure position is valid with safe defaults
  const safePosition: [number, number, number] =
    Array.isArray(position) && position.length === 3
      ? [
          isFinite(position[0]) ? position[0] : 0,
          isFinite(position[1]) ? position[1] : 0,
          isFinite(position[2]) ? position[2] : 0,
        ]
      : [0, 0, 0]

  return (
    <group position={safePosition}>
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#e60000" emissive="#ff0000" emissiveIntensity={hovered ? 2 : 0.5} />
      </mesh>

      {hovered && (
        <Html position={[0, 0.2, 0]} center distanceFactor={10}>
          <div className="bg-black/80 border border-red-600 text-white px-3 py-2 rounded-md text-xs whitespace-nowrap">
            <div className="font-bold">{name}</div>
            <div className="text-xs text-gray-300">{date}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null)
  const [textureLoaded, setTextureLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Use a simple earth texture with error handling
  const texture = useTexture(
    "/assets/3d/texture_earth.jpg",
    () => setTextureLoaded(true),
    () => setError(true),
  )

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  // Use fixed marker positions instead of lat/long calculations
  // This avoids the potential for invalid array lengths in calculations
  const usPosition: [number, number, number] = [0.3, 1.5, 1.5]
  const ukPosition: [number, number, number] = [-0.3, 1.3, 1.6]

  // If texture fails to load, use a basic material
  const material = error ? (
    <meshStandardMaterial color="#1a365d" metalness={0.1} roughness={0.7} />
  ) : (
    <meshStandardMaterial map={texture} metalness={0.1} roughness={0.7} />
  )

  return (
    <group>
      <mesh ref={globeRef}>
        {/* Use lower segment count to avoid buffer issues */}
        <sphereGeometry args={[2, 32, 32]} />
        {material}
      </mesh>

      {/* Only show markers when ready */}
      {(textureLoaded || error) && (
        <>
          <LocationMarker position={usPosition} name="US" date="23rd-24th August, 2025" />
          <LocationMarker position={ukPosition} name="UK" date="9th August, 2025" />
        </>
      )}
    </group>
  )
}

// Add WebGL detection
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")))
  } catch (e) {
    return false
  }
}

export function LocationGlobe() {
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    // Check for WebGL support on client side
    setWebGLSupported(hasWebGL())
  }, [])

  // Fallback when WebGL is not supported
  if (!webGLSupported) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-zinc-900 rounded-lg">
        <div className="text-center max-w-md px-4">
          <h3 className="text-xl font-bold mb-4">Event Locations</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-black p-4 rounded-lg border border-red-600/30">
              <h4 className="font-bold mb-2">UK</h4>
              <p className="text-sm text-zinc-400">9th August, 2025</p>
            </div>
            <div className="bg-black p-4 rounded-lg border border-red-600/30">
              <h4 className="font-bold mb-2">US</h4>
              <p className="text-sm text-zinc-400">23rd-24th August, 2025</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[500px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Globe />
      </Canvas>
    </div>
  )
}
