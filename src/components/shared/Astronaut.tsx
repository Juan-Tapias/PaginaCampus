'use client';

import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, PerspectiveCamera, Sphere, useAnimations, useTexture, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import data from '../../data/es.json'

const { models_3d } = data;
const orbitRunUrl = models_3d.orbit_run;
const moonTextureUrl = models_3d.moon;

const sharedState = {
  scrollY: 0,
  viewport: { width: 0, height: 0 },
  isMobile: false,
  progress: 0,
};

function RealisticMoon() {
  const moonRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const moonTexture = useTexture(moonTextureUrl) as THREE.Texture
  const lastScrollY = useRef(0)
  const scrollVel = useRef(0)

  useFrame((_, delta) => {
    const currentY = sharedState.scrollY
    const diff = currentY - lastScrollY.current
    lastScrollY.current = currentY

    if (currentY < sharedState.viewport.height * 1.2) {
      scrollVel.current = THREE.MathUtils.lerp(scrollVel.current, diff, 0.1)
    } else {
      scrollVel.current = 0
    }

    if (moonRef.current && glowRef.current) {
      moonRef.current.rotation.y = (moonRef.current.rotation.y - delta * 0.1) % (Math.PI * 2);

      const rollSpeed = 0.6;
      const turnFactor = Math.min(Math.max(scrollVel.current * 0.4, -1.2), 1.2);
      const p_static = Math.max(0, 1 - Math.abs(turnFactor));

      moonRef.current.rotation.x = (moonRef.current.rotation.x - delta * rollSpeed * p_static) % (Math.PI * 2);
      moonRef.current.rotation.z = (moonRef.current.rotation.z + delta * rollSpeed * turnFactor) % (Math.PI * 2);
    }
  })

  return (
    <group position={[0, -18.2, 0]}>      <Sphere ref={moonRef} args={[17, 28, 28]}>
        <meshStandardMaterial
          map={moonTexture}
          bumpMap={moonTexture}
          bumpScale={0.8}
          roughness={0.9}
          metalness={0.1}
          color="#999999"
        />
      </Sphere>

      <Sphere ref={glowRef} args={[17.2, 16, 16]}>
        <meshBasicMaterial
          color="#5E39DA"
          transparent={true}
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}

function SpeedLines() {
  const count = 70;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  const lines = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        pos: [
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40 + 5,
          (Math.random() - 0.5) * 80 - 20,
        ] as [number, number, number],
        length: Math.random() * 2 + 0.5,
        speed: Math.random() * 8 + 8,
      });
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const line = lines[i];
      line.pos[2] += delta * line.speed;
      if (line.pos[2] > 30) {
        line.pos[2] = -50;
      }

      tempObject.position.set(line.pos[0], line.pos[1], line.pos[2]);
      tempObject.scale.set(1, 1, line.length);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    meshRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI / 8, sharedState.progress);
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.03, 0.03, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

function ModeloSolido({ url }: { url: string }) {
  const groupRef = useRef<THREE.Group>(null)
  
  const { scene, animations } = useGLTF(url, true) as any;
  const { actions, names } = useAnimations(animations, groupRef)

  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh;
        m.castShadow = true;
        m.receiveShadow = true;

        if (m.material) {
          const mat = m.material as THREE.MeshStandardMaterial;
          mat.color.setHex(0xcccccc);
          mat.roughness = 0.3;
          mat.metalness = 0.6;
        }
      }
    });

    if (names.length > 0) {
      const action = actions[names[0]];
      if (action) {
        action.reset().fadeIn(0.5).play()
        action.timeScale = 0.85;
      }
    }
  }, [actions, names, scene])

  const lastScrollY = useRef(0)
  const scrollVel = useRef(0)

  useFrame((state) => {
    const currentY = sharedState.scrollY
    const diff = currentY - lastScrollY.current
    lastScrollY.current = currentY
    scrollVel.current = THREE.MathUtils.lerp(scrollVel.current, diff, 0.1)

    const threshold2 = sharedState.viewport.height * 0.95;

    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]!.timeScale = 0.45;
    }

    if (groupRef.current) {
      const turnFactor = (currentY < threshold2)
        ? Math.min(Math.max(scrollVel.current * 0.4, -1.2), 1.2)
        : 0;

      const targetRotY = turnFactor * (-Math.PI / 2);
      const targetRotX = Math.abs(turnFactor) * 0.15;

      const time = state.clock.elapsedTime;
      const lunarStride = time * 2.2;
      const bounceY = Math.abs(Math.sin(lunarStride)) * 0.35;
      const inertiaRotZ = Math.sin(lunarStride) * 0.06;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1)
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, inertiaRotZ, 0.1)

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, bounceY, 0.1);
    }
  })

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={sharedState.isMobile ? 3.0 : 4.4}
        position={[0, -1.4, 0]}
      />
    </group>
  )
}

function SceneManager({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  const smoothProgress = useRef(0);

  useFrame((_, delta) => {
    if (groupRef.current) {
      smoothProgress.current = THREE.MathUtils.lerp(
        smoothProgress.current,
        sharedState.progress,
        Math.min(1, delta * 3) 
      );
      
      const sp = smoothProgress.current;
      const isMobile = sharedState.isMobile;

      const startX = isMobile ? 0 : 5.2;
      const targetX = isMobile ? 0 : -11;

      groupRef.current.position.x = THREE.MathUtils.lerp(startX, targetX, sp);
      groupRef.current.position.y = -1;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.05);
    }
  });

  return (
    <group
      ref={groupRef}
      scale={sharedState.isMobile ? 0.6 : 0.75}
    >
      {children}
    </group>
  );
}

export default function Astronaut() {
  const [isClient, setIsClient] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      sharedState.viewport.width = window.innerWidth;
      sharedState.viewport.height = window.innerHeight;
      sharedState.isMobile = window.innerWidth < 768;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      sharedState.scrollY = currentScroll;
      sharedState.progress = Math.min(Math.max(currentScroll / window.innerHeight, 0), 1);
      
      const isOffScreen = currentScroll > window.innerHeight * 1.5;
      setPaused(document.hidden || isOffScreen);
    };

    const handleVisibility = () => {
      const isOffScreen = window.scrollY > window.innerHeight * 1.5;
      setPaused(document.hidden || isOffScreen);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas
        frameloop={paused ? 'never' : 'always'}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.2]}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 2, sharedState.isMobile ? 20 : 16]}
          fov={45}
        />

        <ambientLight intensity={0.2} color="#ffffff" />

        <directionalLight
          castShadow
          position={[5, 12, 10]}
          intensity={2.0}
          color="#ffffff"
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.0001}
        />

        {/* Luces de acento — intensidad reducida */}
        <pointLight position={[-10, 5, -5]} intensity={2.5} color="#5E39DA" />
        <pointLight position={[10, -5, 5]} intensity={1.5} color="#54C6AA" />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Environment preset="night" blur={sharedState.isMobile ? 0 : 0.8} />

        <React.Suspense fallback={null}>
          <SceneManager>
            <ModeloSolido url={orbitRunUrl} />
            <RealisticMoon />
          </SceneManager>
          <SpeedLines />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
