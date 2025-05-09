"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, PerspectiveCamera, Float } from "@react-three/drei"
import type * as THREE from "three"

interface TopicCubeProps {
  topics: string[]
}

// Replace the RotatingCube component with this safer version
function RotatingCube({ topics }: TopicCubeProps) {
  const cubeRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (cubeRef.current) {
      // Slow down rotation when hovered
      const rotationSpeed = hovered ? 0.2 : 0.5
      cubeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2
      cubeRef.current.rotation.y += 0.005 * rotationSpeed
    }
  })

  // Ensure we have valid topics with fallbacks
  // Use Math.max to ensure array access is always valid
  const defaultTopics = [
    "Business Growth",
    "Sales Mastery",
    "Team Building",
    "Digital Leverage",
    "Funding",
    "Brand Building",
  ]
  const safeTopics = Array(6)
    .fill("")
    .map((_, i) => {
      // Ensure topics array exists and has valid entries
      if (!topics || !Array.isArray(topics)) return defaultTopics[i]
      // Use Math.min to ensure we don't access beyond array bounds
      const index = Math.min(i, topics.length - 1)
      return topics[index] || defaultTopics[i]
    })

  return (
    <group>
      <mesh ref={cubeRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Use simple box geometry with safe parameters */}
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color={hovered ? "#cc0000" : "#e60000"} metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Topic texts on each face - using Text instead of Text3D */}
      <Text position={[0, 0, 1.55]} fontSize={0.25} color="white">
        {safeTopics[0]}
      </Text>
      <Text position={[0, 0, -1.55]} fontSize={0.25} color="white" rotation={[0, Math.PI, 0]}>
        {safeTopics[1]}
      </Text>
      <Text position={[1.55, 0, 0]} fontSize={0.25} color="white" rotation={[0, Math.PI / 2, 0]}>
        {safeTopics[2]}
      </Text>
      <Text position={[-1.55, 0, 0]} fontSize={0.25} color="white" rotation={[0, -Math.PI / 2, 0]}>
        {safeTopics[3]}
      </Text>
      <Text position={[0, 1.55, 0]} fontSize={0.25} color="white" rotation={[-Math.PI / 2, 0, 0]}>
        {safeTopics[4]}
      </Text>
      <Text position={[0, -1.55, 0]} fontSize={0.25} color="white" rotation={[Math.PI / 2, 0, 0]}>
        {safeTopics[5]}
      </Text>
    </group>
  )
}

export function TopicCube({ topics }: TopicCubeProps) {
  return (
    <div className="w-full h-[400px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <RotatingCube topics={topics || []} />
        </Float>
      </Canvas>
    </div>
  )
}
