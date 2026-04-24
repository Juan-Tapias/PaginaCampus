import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Environment,
  Float,
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';

type SpaceshipVariant = 'hero' | 'timeline' | 'showcase' | 'training';

type PartnersSpaceshipCanvasProps = {
  modelUrl: string;
  variant?: SpaceshipVariant;
  className?: string;
};

const VARIANT_CONFIG: Record<
  SpaceshipVariant,
  {
    camera: [number, number, number];
    fov: number;
    scale: number;
    position: [number, number, number];
    rotation: [number, number, number];
    light: number;
  }
> = {
  hero: {
    camera: [0, 0.25, 6.4],
    fov: 34,
    scale: 4.5,
    position: [0.15, -0.1, 0],
    rotation: [0.14, -0.5, 0.02],
    light: 2.6,
  },
  timeline: {
    camera: [0, 0.15, 6.5],
    fov: 42,
    scale: 1.35,
    position: [0, 0, 0],
    rotation: [0.12, -0.62, 0],
    light: 2.2,
  },
  showcase: {
    camera: [0, 0.35, 7.2],
    fov: 36,
    scale: 3.2,
    position: [-0.2, -0.05, 0],
    rotation: [0.16, -0.72, 0.02],
    light: 2.8,
  },
  training: {
    camera: [0, 0.25, 7],
    fov: 38,
    scale: 1.65,
    position: [0.1, -0.1, 0],
    rotation: [0.1, -0.55, 0],
    light: 2.1,
  },
};

function useElementVisibility(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.02 },
    );

    const handleVisibility = () => {
      setIsDocumentHidden(document.hidden);
    };

    observer.observe(node);
    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [containerRef]);

  return isVisible && !isDocumentHidden;
}

function SpaceshipModel({
  modelUrl,
  variant,
}: {
  modelUrl: string;
  variant: SpaceshipVariant;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelUrl) as { scene: THREE.Group };
  const config = VARIANT_CONFIG[variant];

  const { normalizedScene, baseScale } = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = Array.isArray(child.material)
          ? child.material.map((material) => material.clone())
          : child.material.clone();
      }
    });

    cloned.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;

    cloned.position.sub(center);

    return {
      normalizedScene: cloned,
      baseScale: 1 / maxAxis,
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const idle = Math.sin(state.clock.elapsedTime * 0.8) * 0.025;
    groupRef.current.rotation.y += delta * (variant === 'hero' ? 0.055 : 0.04);
    groupRef.current.position.y = config.position[1] + idle;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.32}>
      <group
        ref={groupRef}
        position={config.position}
        rotation={config.rotation}
        scale={config.scale * baseScale}
      >
        <primitive object={normalizedScene} />
      </group>
    </Float>
  );
}

export default function PartnersSpaceshipCanvas({
  modelUrl,
  variant = 'hero',
  className = '',
}: PartnersSpaceshipCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldRender = useElementVisibility(containerRef);
  const config = VARIANT_CONFIG[variant];

  return (
    <div ref={containerRef} className={`pointer-events-none ${className}`}>
      <Canvas
        frameloop={shouldRender ? 'always' : 'never'}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.25]}
      >
        <PerspectiveCamera makeDefault position={config.camera} fov={config.fov} />
        <ambientLight intensity={0.42} />
        <directionalLight position={[4, 4, 5]} intensity={config.light} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} intensity={1.8} color="#54C6AA" />
        <pointLight position={[3, -2, 2]} intensity={1.2} color="#937AE6" />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Environment preset="night" blur={0.6} />
        <Suspense fallback={null}>
          <SpaceshipModel modelUrl={modelUrl} variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
