'use client';

import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, Environment, Float, Stars } from '@react-three/drei'
import data from '../../data/es.json'

const { models_3d } = data;

const orbitModelUrl = models_3d.orbit_head;

interface OrbitProps {
  alCargar: () => void
  referenciaBurbuja: React.RefObject<HTMLDivElement | null>
  estaHablando?: boolean
}

function OrbitModel({ url, alCargar, referenciaBurbuja, estaHablando }: { url: string, alCargar: () => void, referenciaBurbuja: React.RefObject<HTMLDivElement | null>, estaHablando?: boolean }) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = React.useState(false)
  const progressRef = useRef(0)

  const { scene: originalScene } = useGLTF(url, true) as any;

  const scene = useMemo(() => {
    const clone = originalScene.clone();
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        
        // Inyectamos el shader para la transformación en esfera
        child.material.onBeforeCompile = (shader: any) => {
          shader.uniforms.uMorphProgress = { value: 0.0 };
          shader.uniforms.uTime = { value: 0.0 };
          child.userData.shader = shader;

          shader.vertexShader = `
            uniform float uMorphProgress;
            uniform float uTime;
            varying vec3 vCustomPosition;
            ${shader.vertexShader}
          `;

          shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
            #include <begin_vertex>
            
            vCustomPosition = position;
            
            // Crear forma de esfera (Mucho más pequeña, tipo ChatGPT)
            vec3 positionEsferica = normalize(position) * 0.5; 
            
            // Deformación suave y orgánica (tipo blob/fluido), aún más lenta y sutil
            float waves = sin(uTime * 1.2 + position.y * 1.5) * 0.04;
            waves += cos(uTime * 0.8 + position.x * 1.0) * 0.02;
            positionEsferica += normal * waves * uMorphProgress;
            
            // Interpolar entre cabeza y esfera
            transformed = mix(position, positionEsferica, uMorphProgress);
          `);

          shader.fragmentShader = `
            uniform float uMorphProgress;
            uniform float uTime;
            varying vec3 vCustomPosition;
            ${shader.fragmentShader}
          `;

          shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
            #include <dithering_fragment>
            
            if (uMorphProgress > 0.0) {
              // Colores suaves y brillantes tipo ChatGPT / Siri
              vec3 colorAzul = vec3(0.2, 0.5, 1.0); 
              vec3 colorMorado = vec3(0.6, 0.2, 0.8);
              vec3 colorCian = vec3(0.3, 1.0, 0.9);
              vec3 colorBlanco = vec3(1.0, 1.0, 1.0);
              
              // Mezcla suave de colores basada en la posición
              float factor = sin(vCustomPosition.y * 4.0 + uTime * 2.0) * 0.5 + 0.5;
              vec3 colorEsfera = mix(colorAzul, colorMorado, factor);
              
              // Añadir destellos de cian
              float destellos = cos(vCustomPosition.x * 3.0 - uTime) * 0.5 + 0.5;
              colorEsfera = mix(colorEsfera, colorCian, destellos * 0.5);
              
              // Efecto de borde brillante (Fresnel) muy suave y luminoso
              float fresnel = 1.0 - abs(dot(normalize(vCustomPosition), vec3(0.0, 0.0, 1.0)));
              fresnel = pow(fresnel, 2.0);
              colorEsfera = mix(colorEsfera, colorBlanco, fresnel * 0.6);
              
              // Líneas de frecuencia súper sutiles y minimalistas en los bordes
              vec3 posNorm = normalize(vCustomPosition);
              float lados = smoothstep(0.7, 0.95, abs(posNorm.x));
              float lineas = step(0.9, sin(vCustomPosition.y * 60.0 - uTime * 40.0));
              colorEsfera = mix(colorEsfera, colorBlanco, lados * lineas * 0.2);
              
              // Mezclar el color original del modelo con el de la esfera
              gl_FragColor.rgb = mix(gl_FragColor.rgb, colorEsfera, uMorphProgress);
            }
          `);
        };
      }
    });
    return clone;
  }, [originalScene]);

  const _v3 = new THREE.Vector3()

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.sub(center)

      if (meshRef.current) {
        meshRef.current.rotation.y = -Math.PI / 2
      }
      alCargar()
    }
  }, [scene, alCargar])

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()
      const mouseNDC = state.pointer
      const esMovil = window.innerWidth < 768

      const mouse3D = _v3.set(mouseNDC.x * 2.8, mouseNDC.y * 2.8, 1.5)

      // Transición suave para el morph a esfera
      const targetProgress = estaHablando ? 1.0 : 0.0
      progressRef.current = THREE.MathUtils.lerp(progressRef.current, targetProgress, 0.03)

      scene.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh && child.userData.shader) {
          child.userData.shader.uniforms.uMorphProgress.value = progressRef.current
          child.userData.shader.uniforms.uTime.value = t
        }
      })

      // Respiración/pulso sutil al estar sobre el modelo
      const pulse = hovered ? Math.sin(t * 3.0) * 0.1 : 0
      const targetScale = (esMovil ? 2.0 : 3.2) + pulse
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))

      const rotFactor = hovered ? 0.7 : 0.4
      const targetRotY = -Math.PI / 2 + 0.4 + mouseNDC.x * rotFactor
      const targetRotX = -mouseNDC.y * (rotFactor * 0.5)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.04)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.04)

      // Seguimiento de posición leve con el mouse
      const targetX = esMovil ? 0 : -2.5 + mouseNDC.x * 0.5
      const targetY = mouseNDC.y * 0.4
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05)

      // Burbuja de saludo de Orbit
      if (referenciaBurbuja.current) {
        meshRef.current.getWorldPosition(_v3)
        const esMovilLocal = window.innerWidth < 768
        _v3.y += esMovilLocal ? 1.4 : 1.2
        _v3.x += esMovilLocal ? 0 : 1.9
        _v3.project(state.camera)

        const x = (_v3.x * 0.5 + 0.5) * state.size.width
        const y = (-_v3.y * 0.5 + 0.5) * state.size.height
        referenciaBurbuja.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`
      }
    }
  })

  return (
    <group
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <primitive object={scene} />
    </group>
  )
}

export function OrbitLienzo({ alCargar, referenciaBurbuja, estaHablando }: OrbitProps) {
  const [isClient, setIsClient] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setIsClient(true)

    // Optimización: Pausar el renderizado 3D cuando no esté en pantalla
    const observer = new IntersectionObserver(([entry]) => {
      setPaused(!entry.isIntersecting)
    }, { threshold: 0 })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    const handleVisibility = () => {
      if (document.hidden) setPaused(true)
      else setPaused(false)
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  if (!isClient) return null

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas
        frameloop={paused ? 'never' : 'always'}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={2} color="#7c4dff" />
        <Environment files="/hdri/dikhololo_night_1k.hdr" />

        <React.Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <OrbitModel url={orbitModelUrl} alCargar={alCargar} referenciaBurbuja={referenciaBurbuja} estaHablando={estaHablando} />
          </Float>
          <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
