'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Environment, ContactShadows } from '@react-three/drei';
import { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import es from '../../data/es.json';

useGLTF.preload(es.models_3d.orbit_intro, true);

function OrbitModel({ onImpact, onReady }: { onImpact: () => void; onReady?: () => void }) {
  const { scene, animations } = useGLTF(es.models_3d.orbit_intro, true);
  const { actions } = useAnimations(animations, scene);
  const impactTriggered = useRef(false);


  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.visible = true;
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.frustumCulled = false;
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.3;
            mat.metalness = 0.8;
            mat.envMapIntensity = 1.5;
            if (mat.color.getHex() === 0x000000) mat.color.setHex(0xcccccc);
          }
        }
      });
    }

    if (actions) {
      const animationName = Object.keys(actions)[0];
      const action = actions[animationName];
      if (action) {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.reset().play();
      }
    }
    if (onReady) onReady();
  }, [scene, actions, onReady]);

  useFrame(() => {
    const animationName = Object.keys(actions)[0];
    const action = actions[animationName];

    if (action && !impactTriggered.current && action.isRunning()) {
      const duration = action.getClip().duration;
      if (action.time >= duration * 0.18) {
        impactTriggered.current = true;
        onImpact();
      }
    }
  });

  return (
    <primitive
      object={scene}
      position={[0, -2, -2]}
      rotation={[0, Math.PI / 50, 0]}
      scale={2}
    />
  );
}

export default function OrbitIntro3D({ onImpact, onReady }: { onImpact: () => void; onReady?: () => void }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 90, pointerEvents: 'none' }}>
      <Canvas
        shadows
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {/* 1. Iluminación global (Reemplaza al Stage) */}
          <Environment preset="city" />

          {/* 2. Sombra de contacto opcional en el piso */}
          <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={20} blur={2} />

          {/* 3. Tu modelo libre de ataduras */}
          <OrbitModel onImpact={onImpact} onReady={onReady} />
        </Suspense>

        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}