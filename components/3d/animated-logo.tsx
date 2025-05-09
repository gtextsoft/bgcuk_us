"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Center, Float, PerspectiveCamera } from "@react-three/drei"
import { MathUtils } from "three"
import type * as THREE from "three"

// Replace the entire LogoText component with this simplified version
function LogoText() {
  const textRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = MathUtils.lerp(
        textRef.current.rotation.y,
        (hovered ? Math.PI * 0.02 : 0) + state.clock.elapsedTime * 0.05,
        0.05,
      )
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        {/* Use a simple box instead of Text3D to avoid buffer issues */}
        <mesh ref={textRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <boxGeometry args={[3, 1.5, 0.2]} />
          <meshStandardMaterial color="#e60000" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Use regular Text component which is more stable */}
        <Text position={[0, 0, 0.15]} fontSize={0.8} color="white" anchorX="center" anchorY="middle">
          BGC
        </Text>
      </Center>
    </Float>
  )
}

function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[2.5, 0, 0]}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="#e60000" metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

function AnimatedPyramid() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[-2.5, 0, 0]}
      scale={hovered ? 1.2 : 1}
      rotation={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Using tetrahedron with safe parameters */}
      <tetrahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial color="#e60000" metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

export function AnimatedLogo() {
  return (
    <div className="w-full h-[300px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <LogoText />
        <AnimatedCube />
        <AnimatedPyramid />
      </Canvas>
    </div>
  )
}
