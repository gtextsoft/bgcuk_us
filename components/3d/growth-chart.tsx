"use client"
import { Canvas } from "@react-three/fiber"
import { Text, PerspectiveCamera, Line, Html } from "@react-three/drei"
import { Vector3 } from "three"

function GrowthLine() {
  // Define fixed points with safe values
  const points = [
    new Vector3(-3, -1.5, 0),
    new Vector3(-2, -1, 0),
    new Vector3(-1, 0, 0),
    new Vector3(0, 0.5, 0),
    new Vector3(1, 1.5, 0),
    new Vector3(2, 3, 0),
    new Vector3(3, 5, 0),
  ]

  // Ensure we have at least 2 points for the line
  const safePoints = points.length >= 2 ? points : [new Vector3(0, 0, 0), new Vector3(1, 1, 0)]

  return (
    <group>
      {/* Use safe points for the line */}
      <Line points={safePoints} color="#e60000" lineWidth={5} />

      {/* Data points with safe parameters */}
      {safePoints.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#e60000" />
        </mesh>
      ))}

      {/* Axis labels */}
      <Text position={[-3.5, -1.5, 0]} fontSize={0.3} color="white">
        Start
      </Text>
      <Text position={[3.5, 5, 0]} fontSize={0.3} color="white">
        10 Figures
      </Text>

      {/* Floating data point with HTML label */}
      <mesh position={[2, 3, 0]}>
        <Html position={[0, 0.5, 0]} center distanceFactor={10}>
          <div className="bg-red-600 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap">500% Growth</div>
        </Html>
      </mesh>
    </group>
  )
}

function AxisLines() {
  return (
    <group>
      {/* X-axis */}
      <Line points={[new Vector3(-3.5, -1.5, 0), new Vector3(3.5, -1.5, 0)]} color="white" lineWidth={2} />

      {/* Y-axis */}
      <Line points={[new Vector3(-3.5, -1.5, 0), new Vector3(-3.5, 5.5, 0)]} color="white" lineWidth={2} />
    </group>
  )
}

export function GrowthChart() {
  return (
    <div className="w-full h-[400px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        <group>
          <AxisLines />
          <GrowthLine />
        </group>
      </Canvas>
    </div>
  )
}
