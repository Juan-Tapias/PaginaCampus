'use client';

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, Environment, Float, Stars } from '@react-three/drei'
import data from '../../data/es.json'

const { models_3d } = data;

// Ruta estática desde la carpeta public
const orbitModelUrl = models_3d.orbit_head;

interface OrbitProps {
  alCargar: () => void
  referenciaBurbuja: React.RefObject<HTMLDivElement | null>
}

function OrbitModel({ url, alCargar, referenciaBurbuja }: { url: string, alCargar: () => void, referenciaBurbuja: React.RefObject<HTMLDivElement | null> }) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = React.useState(false)
  
  const { scene } = useGLTF(url, true) as any;
  const _v3 = new THREE.Vector3()

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.sub(center)

      scene.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh
          m.castShadow = true
          m.receiveShadow = true

          if (m.material) {
            const mat = Array.isArray(m.material) ? m.material[0] : m.material
            mat.onBeforeCompile = (shader: any) => {
              shader.uniforms.uTime = { value: 0 }
              shader.uniforms.uMouse = { value: new THREE.Vector3(99, 99, 99) }

              m.userData.shader = shader

              shader.vertexShader = `
                uniform float uTime;
                uniform vec3 uMouse;
                varying float vDist;
                ${shader.vertexShader}
              `
              shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
                #include <begin_vertex>
                vec4 pGlobal = modelMatrix * vec4(position, 1.0);
                vDist = distance(pGlobal.xyz, uMouse);
                
                // 1. Radio de influencia (más pequeño y sutil)
                float d = smoothstep(2.5, 0.0, vDist);
                
                // 2. Efecto de atracción hacia el ratón (menos agresivo)
                vec3 dirToMouse = normalize(uMouse - pGlobal.xyz);
                transformed += dirToMouse * 0.08 * d;
                
                // 3. Efecto de ondulación gelatinosa (amplitud reducida)
                float onda = sin(uTime * 6.0 - vDist * 4.0) * 0.03 * d;
                transformed += normal * onda;
              `)
              shader.fragmentShader = `
                varying float vDist;
                ${shader.fragmentShader}
              `
              shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
                #include <dithering_fragment>
                // Brillo concentrado en un radio menor
                float gBrillo = smoothstep(2.0, 0.0, vDist);
                
                vec3 glowColor = mix(vec3(0.0, 1.0, 0.8), vec3(0.6, 0.2, 1.0), gBrillo);
                // Menos intensidad en el color final
                gl_FragColor.rgb = mix(gl_FragColor.rgb, glowColor * 1.8, gBrillo * 0.4);
              `)
            }
          }
        }
      })
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

      scene.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh && child.userData.shader) {
          child.userData.shader.uniforms.uTime.value = t
          const targetMouse = hovered ? mouse3D : new THREE.Vector3(99, 99, 99)
          child.userData.shader.uniforms.uMouse.value.copy(targetMouse)
        }
      })

      const targetScale = esMovil ? 2.0 : 3.2
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))

      const rotFactor = hovered ? 0.7 : 0.4
      const targetRotY = -Math.PI / 2 + 0.4 + mouseNDC.x * rotFactor
      const targetRotX = -mouseNDC.y * (rotFactor * 0.5)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.04)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.04)

      const targetX = esMovil ? 0 : -2.5
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1)

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

export function OrbitLienzo({ alCargar, referenciaBurbuja }: OrbitProps) {
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
        <Environment preset="night" />

        <React.Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <OrbitModel url={orbitModelUrl} alCargar={alCargar} referenciaBurbuja={referenciaBurbuja} />
          </Float>
          <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
        </React.Suspense>
      </Canvas>
    </div>
  )
}