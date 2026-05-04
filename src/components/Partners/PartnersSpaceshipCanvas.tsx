'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Spaceship from './Spaceship';

interface CanvasProps {
  modelScale?: any;
  modelRotation?: [number, number, number];
  modelPosition?: [number, number, number];
  customRotation?: any[];
  customPosition?: any[];
}

// Detecta si el dispositivo tiene recursos limitados — solo en cliente para evitar hydration mismatch
function useDeviceTier(): 'low' | 'high' {
  const [tier, setTier] = useState<'low' | 'high'>('high'); // 'high' como valor SSR seguro

  useEffect(() => {
    const nav = navigator as any;
    const cores = nav.hardwareConcurrency ?? 4;
    const mem = nav.deviceMemory ?? 4;
    setTier(cores <= 4 || mem <= 2 ? 'low' : 'high');
  }, []);

  return tier;
}

function Scene({
  modelScale,
  modelRotation,
  modelPosition,
  customRotation,
  customPosition,
}: CanvasProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const activeScale = modelScale;
    const activeRot = customRotation || modelRotation;
    const activePos = customPosition || modelPosition;

    const s = typeof activeScale?.get === 'function' ? activeScale.get() : (activeScale || 0.4);
    groupRef.current.scale.set(s, s, s);

    if (activeRot && Array.isArray(activeRot)) {
      groupRef.current.rotation.x = typeof activeRot[0]?.get === 'function' ? activeRot[0].get() : activeRot[0];
      groupRef.current.rotation.y = typeof activeRot[1]?.get === 'function' ? activeRot[1].get() : activeRot[1];
      groupRef.current.rotation.z = typeof activeRot[2]?.get === 'function' ? activeRot[2].get() : activeRot[2];
    }

    if (activePos && Array.isArray(activePos)) {
      groupRef.current.position.x = typeof activePos[0]?.get === 'function' ? activePos[0].get() : activePos[0];
      groupRef.current.position.y = typeof activePos[1]?.get === 'function' ? activePos[1].get() : activePos[1];
      groupRef.current.position.z = typeof activePos[2]?.get === 'function' ? activePos[2].get() : activePos[2];
    }
  });

  return (
    <group ref={groupRef}>
      <Spaceship scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </group>
  );
}

export default function PartnersSpaceshipCanvas({
  modelScale,
  modelRotation,
  modelPosition,
  customRotation,
  customPosition,
}: CanvasProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  const tier = useDeviceTier();

  if (!isClient) return null;

  const isLow = tier === 'low';

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        shadows={!isLow}
        gl={{
          antialias: !isLow,
          alpha: true,
          powerPreference: 'high-performance',
          // Reduce precision on low-end
          precision: isLow ? 'lowp' : 'highp',
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.shadowMap.type = THREE.PCFShadowMap;
          // Limit pixel ratio on low-end devices
          gl.setPixelRatio(isLow ? 1 : Math.min(window.devicePixelRatio, 1.5));
        }}
        dpr={isLow ? 1 : [1, 1.5]}
        frameloop={isLow ? 'demand' : 'always'}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />

        <Suspense fallback={null}>
          {/* 'sunset' es mucho más ligero que 'city' */}
          <Environment preset={isLow ? 'dawn' : 'city'} />

          <Scene
            modelScale={modelScale}
            modelRotation={modelRotation}
            modelPosition={modelPosition}
            customRotation={customRotation}
            customPosition={customPosition}
          />

          {/* ContactShadows eliminado en low-tier por ser muy costoso */}
          {!isLow && (
            <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[15, 15]} />
              <shadowMaterial opacity={0.2} />
            </mesh>
          )}
        </Suspense>

        <ambientLight intensity={isLow ? 0.4 : 0.05} />
        <spotLight
          position={[15, 20, 15]}
          angle={0.3}
          penumbra={1}
          intensity={isLow ? 0.8 : 1.2}
          castShadow={!isLow}
          shadow-mapSize={isLow ? [512, 512] : [1024, 1024]}
        />
      </Canvas>
    </div>
  );
}
