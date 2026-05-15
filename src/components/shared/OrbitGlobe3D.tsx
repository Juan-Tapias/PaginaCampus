'use client';

import { Suspense, useEffect, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, useAnimations, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import data from '@/data/es.json';

const { orbit_run } = data.models_3d;
const { orbit3d } = data.se_un_camper.hero;

// Pre-carga de ambos modelos
useGLTF.preload(`${orbit_run}`);
useGLTF.preload(`${orbit3d}`);

function Model() {
  const { scene, animations } = useGLTF(`${orbit_run}`);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.frustumCulled = false;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
    }

    if (actions) {
      const animationName = Object.keys(actions)[0];
      const action = actions[animationName];
      if (action) {
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.timeScale = 0.5; // Hacer la animación más lenta
        action.reset().play();
      }
    }
  }, [scene, actions]);

  return (
    <group
      scale={1.2}
      position={[0, -0.6, 0]}
      rotation={[0, 0, 0]}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
}

function CodeSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  const lines = [
    "'use client';",
    "import { Suspense, useEffect, useRef, useState } from 'react';",
    "import { Canvas, useFrame } from '@react-three/fiber';",
    "import { useGLTF, OrbitControls, useAnimations, Sphere } from '@react-three/drei';",
    "import * as THREE from 'three';",
    "import data from '@/data/es.json';",
    "",
    "const { orbit_run } = data.models_3d;",
    "",
    "useGLTF.preload(`${orbit_run}`);",
    "",
    "function Model() {",
    "  const { scene, animations } = useGLTF(`${orbit_run}`);",
    "  const { actions } = useAnimations(animations, scene);",
    "",
    "  useEffect(() => {",
    "    if (scene) {",
    "      scene.traverse((child) => {",
    "        if ((child as THREE.Mesh).isMesh) {",
    "          child.castShadow = true;",
    "          child.receiveShadow = true;",
    "        }",
    "      });",
    "    }",
    "    if (actions) {",
    "      const animationName = Object.keys(actions)[0];",
    "      actions[animationName]?.play();",
    "    }",
    "  }, [scene, actions]);",
    "",
    "  return <primitive object={scene} scale={1.2} />;",
    "}",
    "",
    "export default function OrbitGlobe3D() {",
    "  return (",
    "    <div className='w-full h-full relative'>",
    "      <Canvas shadows>",
    "        <ambientLight intensity={1.5} />",
    "        <directionalLight position={[10, 10, 5]} intensity={2.5} />",
    "        <Suspense fallback={null}>",
    "          <Model />",
    "          <CodeSphere />",
    "        </Suspense>",
    "      </Canvas>",
    "    </div>",
    "  );",
    "}",
    "",
    "function CodeSphere() {",
    "  const sphereRef = useRef<THREE.Mesh>(null);",
    "  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);",
    "",
    "  useFrame((state, delta) => {",
    "    if (sphereRef.current) {",
    "      sphereRef.current.rotation.x -= delta * 0.2;",
    "    }",
    "    // Update canvas texture...",
    "  });",
    "",
    "  return <Sphere ref={sphereRef} args={[0.8, 64, 64]} position={[0, -1.4, 0]} />;",
    "}"
  ];

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    canvasRef.current = canvas;

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    textureRef.current = tex;
    setTexture(tex);
  }, []);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x -= delta * 0.2; // Rotación frontal hacia atrás
    }

    const canvas = canvasRef.current;
    const tex = textureRef.current;
    if (canvas && tex) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Fondo
        ctx.fillStyle = '#050510';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = 'bold 12px monospace';

        const numLines = 40;
        const lineHeight = 12;

        const time = state.clock.getElapsedTime();
        const charsToShow = Math.floor(time * 1000);

        let currentChars = 0;

        for (let i = 0; i < numLines; i++) {
          const y = 15 + i * lineHeight;

          for (let col = 0; col < 3; col++) {
            const lineText = lines[(i + col * 7) % lines.length];

            if (currentChars >= charsToShow) break;

            const availableChars = charsToShow - currentChars;
            const textToDraw = lineText.substring(0, availableChars);

            ctx.fillStyle = (i % 3 === 0) ? '#6637E8' : '#3BC4A5';
            ctx.fillText(textToDraw, 10 + col * 340, y);

            currentChars += lineText.length;
          }
          if (currentChars >= charsToShow) break;
        }

        tex.needsUpdate = true; // Forzar actualización de la textura
      }
    }
  });

  if (!texture) return null;

  return (
    <Sphere ref={sphereRef} args={[0.8, 64, 64]} position={[0, -1.4, 0]} rotation={[0.2, -Math.PI /2, 0]}>
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.2}
        emissive="#000000"
      />
    </Sphere>
  );
}

export default function OrbitGlobe3D() {
  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative flex items-center justify-center">

      <Canvas
        shadows
        className="relative z-10"
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.5} />
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
          enableRotate={true}
        />

        <Suspense fallback={null}>
          <Model />
          <CodeSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}