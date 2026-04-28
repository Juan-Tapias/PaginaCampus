'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Spaceship from './Spaceship';

interface CanvasProps {
  modelScale?: any; 
  modelRotation?: [number, number, number];
  modelPosition?: [number, number, number];
  customRotation?: any[]; 
  customPosition?: any[]; 
}

function Scene({ 
  modelScale, 
  modelRotation, 
  modelPosition,
  customRotation, 
  customPosition 
}: CanvasProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Prioridad: customValue (viaje global) > modelValue (local/estático)
    const activeScale = modelScale; 
    const activeRot = customRotation || modelRotation;
    const activePos = customPosition || modelPosition;

    // Aplicamos Escala (MotionValue o número)
    const s = typeof activeScale?.get === 'function' ? activeScale.get() : (activeScale || 0.4);
    groupRef.current.scale.set(s, s, s);

    // Aplicamos Rotación
    if (activeRot && Array.isArray(activeRot)) {
      groupRef.current.rotation.x = typeof activeRot[0]?.get === 'function' ? activeRot[0].get() : activeRot[0];
      groupRef.current.rotation.y = typeof activeRot[1]?.get === 'function' ? activeRot[1].get() : activeRot[1];
      groupRef.current.rotation.z = typeof activeRot[2]?.get === 'function' ? activeRot[2].get() : activeRot[2];
    }
    
    // Aplicamos Posición
    if (activePos && Array.isArray(activePos)) {
      groupRef.current.position.x = typeof activePos[0]?.get === 'function' ? activePos[0].get() : activePos[0];
      groupRef.current.position.y = typeof activePos[1]?.get === 'function' ? activePos[1].get() : activePos[1];
      groupRef.current.position.z = typeof activePos[2]?.get === 'function' ? activePos[2].get() : activePos[2];
    }
  });

  return (
    <group ref={groupRef}>
      <Spaceship
        scale={1} // El scale real lo maneja el groupRef
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

export default function PartnersSpaceshipCanvas({
  modelScale,
  modelRotation,
  modelPosition,
  customRotation,
  customPosition
}: CanvasProps) {
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
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
        dpr={[1, 1.5]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />

        <Suspense fallback={null}>
          <Environment preset="city" />

          <Scene 
            modelScale={modelScale} 
            modelRotation={modelRotation}
            modelPosition={modelPosition}
            customRotation={customRotation}
            customPosition={customPosition}
          />

          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.4}
            scale={15}
            blur={2}
            far={4.5}
          />
        </Suspense>

        <ambientLight intensity={0.05} />
        <spotLight 
          position={[15, 20, 15]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
      </Canvas>
    </div>
  );
}
