import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState, type ComponentProps } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import "./styles.css";

function Box({
  size = 10,
  mini = true,
  ...props
}: { size: number; mini: boolean } & ComponentProps<"mesh">) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const miniBoxes = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((x) => (
    <Box size={0.1} mini={false} position={[x, 0, 0]} />
  ));

  return (
    <group>
      <mesh {...props} ref={meshRef} receiveShadows>
        <boxGeometry args={[size, size, size]} />
        <meshNormalMaterial
          // color={hovered ? "hotpink" : "#2f74c0"}
          opacity={0.5}
          transparent
          //
        />
      </mesh>

      {mini && miniBoxes}
    </group>
  );
}

createRoot(document.getElementById("root")).render(
  <Canvas camera={{ position: [0, 0, 25] }}>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight
      position={[10, 10, 10]}
      angle={0.15}
      penumbra={1}
      decay={0}
      intensity={Math.PI}
    />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[0, 0, 0]} />

    <CameraControls />
  </Canvas>
);
