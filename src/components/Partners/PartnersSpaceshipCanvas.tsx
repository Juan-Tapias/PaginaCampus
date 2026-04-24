'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Spaceship from './Spaceship';

interface CanvasProps {
  modelScale?: number;
  modelPosition?: [number, number, number];
  modelRotation?: [number, number, number];
}

export default function PartnersSpaceshipCanvas({
  modelScale = 2.5,
  modelPosition = [0, 0, 0],
  modelRotation = [0, -Math.PI / 4, 0]
}: CanvasProps) {
  // SSR guard - igual que el astronauta, evita el fondo blanco en Next.js
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return null;

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          // Reemplazamos PCFSoftShadowMap (deprecated) por PCFShadowMap
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
        dpr={[1, 1.5]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />

        <Suspense fallback={null}>
          <Environment preset="city" />

          <Spaceship
            scale={modelScale}
            position={modelPosition}
            rotation={modelRotation}
          />

          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.4}
            scale={15}
            blur={2}
            far={4.5}
          />
        </Suspense>

        <ambientLight intensity={0.15} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.4} castShadow />
      </Canvas>
    </div>
  );
}