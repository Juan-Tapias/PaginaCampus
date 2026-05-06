'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import data from '@/data/es.json';

const { orbit3d, globeimagen } = data.se_un_camper.hero;

// Preload the model
useGLTF.preload(orbit3d);

function Model() {
  const { scene, animations } = useGLTF(orbit3d);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
    return () => {
      mixer.current?.stopAllAction();
    };
  }, [animations, scene]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={0.1} 
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <primitive 
        object={scene} 
        scale={1.2} 
        position={[0, -1.5, 0]} 
        rotation={[0, 0.5, 0]}
      />
    </Float>
  );
}

export default function OrbitGlobe3D() {
  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center">
      
      {/* Imagen del Globo Base */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] max-w-[450px] pointer-events-none z-0 flex justify-center opacity-90">
        <img 
          src={globeimagen} 
          alt="Globe Code Base" 
          className="w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(59,196,165,0.15)]"
        />
      </div>

      <Canvas
        className="relative z-10"
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, 5, -5]} intensity={1} color="#3BC4A5" />
        <directionalLight position={[0, -10, 5]} intensity={0.5} color="#6637E8" />
        
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap={true}
            speed={2}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <Model />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
