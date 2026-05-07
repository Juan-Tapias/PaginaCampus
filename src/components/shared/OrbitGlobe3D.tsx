'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import data from '@/data/es.json';

const { orbit3d, globeimagen } = data.se_un_camper.hero;

// 1. PRE-CARGA DEL MODELO
useGLTF.preload(`${orbit3d}&v=2`);

function Model() {  
  const { scene } = useGLTF(`${orbit3d}&v=2`);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.frustumCulled = false;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material = mesh.material.map(mat => mat.clone());
            } else {
              mesh.material = mesh.material.clone();
            }
          }
        }
      });
    }
  }, [clonedScene]);

  return (
    <group 
      scale={1.4} 
      position={[0, -0.1, 0.1]} 
      rotation={[0.4, 0.1, 0]} 
      dispose={null}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

export default function OrbitGlobe3D() {
  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative flex items-center justify-center">
      
      {/* Background Image */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] max-w-[450px] pointer-events-none z-0 flex justify-center opacity-90">
        <img 
          src={globeimagen} 
          alt="Globe Code Base" 
          className="w-[70%] h-auto object-contain drop-shadow-[0_0_25px_rgba(59,196,165,0.15)]"
        />
      </div>

      <Canvas
        shadows
        className="relative z-10"
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight 
          castShadow
          position={[10, 10, 5]} 
          intensity={2.5} 
          color="#ffffff" 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-10, 5, -5]} intensity={1.2} color="#3BC4A5" />
        <directionalLight position={[0, -10, 5]} intensity={0.8} color="#6637E8" />
                
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
        />
        
        <Suspense>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}