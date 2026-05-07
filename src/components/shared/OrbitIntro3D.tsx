'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, Sphere, useTexture, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, Suspense, useState } from 'react';
import * as THREE from 'three';
import es from '../../data/es.json';

useGLTF.preload(es.models_3d.orbit_intro, true);

function OrbitModel({ onImpact, onReady }: { onImpact: () => void; onReady?: () => void }) {
  const { scene, animations } = useGLTF(es.models_3d.orbit_intro, true);
  const { actions } = useAnimations(animations, scene);
  const impactTriggered = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
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
  }, [scene, actions]);

  useFrame(() => {
    const animationName = Object.keys(actions)[0];
    const action = actions[animationName];

    if (action && action.isRunning()) {
      // Solo mostramos el modelo y llamamos a onReady cuando la animación ya arrancó
      if (!isVisible) {
        setIsVisible(true);
        // Pequeño delay para asegurar que el motor ya renderizó el primer frame de movimiento
        setTimeout(() => {
          if (onReady) onReady();
        }, 50);
      }

      const duration = action.getClip().duration;
      if (action.time >= duration * 0.18 && !impactTriggered.current) {
        impactTriggered.current = true;
        onImpact();
      }
    }
  });

  return (
    <primitive
      object={scene}
      position={[0, -2, 0]}
      rotation={[0, Math.PI / 50, 0]}
      scale={2}
      visible={isVisible}
    />
  );
}

function RealisticMoon() {
  const moonRef = useRef<THREE.Mesh>(null);
  const moonTexture = useTexture(es.models_3d.moon) as THREE.Texture;

  useFrame((_, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = (moonRef.current.rotation.y - delta * 0.05) % (Math.PI * 2);
    }
  });

  return (
    <group position={[0, -12, 0]}>
      <Sphere ref={moonRef} args={[10, 32, 32]}>
        <meshStandardMaterial
          map={moonTexture}
          bumpMap={moonTexture}
          bumpScale={0.8}
          roughness={0.9}
          metalness={0.1}
          color="#999999"
        />
      </Sphere>
      
      {/* Resplandor atmosférico sutil */}
      <Sphere args={[10.2, 32, 32]}>
        <meshBasicMaterial
          color="#5E39DA"
          transparent={true}
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
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
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={35} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <RealisticMoon />

          <OrbitModel onImpact={onImpact} onReady={onReady} />
        </Suspense>

        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <spotLight position={[0, 10, 0]} intensity={2} color="#3ed896" />
      </Canvas>
    </div>
  );
}