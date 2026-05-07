'use client';

import { useRef, useMemo, useState, useEffect, MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  consumingRef: MutableRefObject<boolean>
}

export default function UniversoInteractivo({ consumingRef }: Props) {
  const pointsRef   = useRef<THREE.Points>(null)
  const groupRef    = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const pulseProgress = useRef(0)

  const parameters = {
    count: isMobile ? 7000 : 16000,
    radius: 7.0,
    branches: 3,
    spin: 0.8,
    randomness: 0.6,
    randomnessPower: 3.5,
  }

  const [positions, colors, scales] = useMemo(() => {
    const pos  = new Float32Array(parameters.count * 3)
    const col  = new Float32Array(parameters.count * 3)
    const scal = new Float32Array(parameters.count)

    const colorInside  = new THREE.Color('#3a2b6e')
    const colorOutside = new THREE.Color('#3d5550')
    const grayColor    = new THREE.Color('#222222')

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        const radius      = Math.random() * parameters.radius
        const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2
        const spinAngle   = radius * parameters.spin
        const profileSpread = 1.0 - radius / parameters.radius

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * (radius + 0.2)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * (profileSpread * 0.7 + 0.1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * (radius + 0.2)

        pos[i3]     = Math.cos(branchAngle + spinAngle) * radius + randomX
        pos[i3 + 1] = randomY
        pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = new THREE.Color()
        mixedColor.copy(colorInside)
        mixedColor.lerp(colorOutside, radius / parameters.radius)
        mixedColor.lerp(grayColor, 0.75)

        col[i3]     = mixedColor.r
        col[i3 + 1] = mixedColor.g
        col[i3 + 2] = mixedColor.b

        scal[i] = (Math.random() * 0.5 + 0.5) * (1.0 + profileSpread * 0.5)
    }

    return [pos, col, scal]
  }, [isMobile]) 


  const plane    = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const uniforms = useMemo(() => ({
    uMouse3D:  { value: new THREE.Vector3(999, 999, 999) },
    uPulse:    { value: 0.0 }, // 0 = normal, 1 = absorción máxima
    uTime:     { value: 0.0 },
  }), [])

  useFrame((state, delta) => {
    const isConsuming = consumingRef.current

    // Suavizar la transición del pulso (lerp hacia 1 o hacia 0)
    pulseProgress.current = THREE.MathUtils.lerp(
      pulseProgress.current,
      isConsuming ? 1.0 : 0.0,
      Math.min(1.0, isConsuming ? delta * 3.0 : delta * 1.2)
    )

    const p = pulseProgress.current

    // — Rotación de la galaxia: acelera dramáticamente al consumir —
    if (pointsRef.current) {
      const baseSpeed     = 0.02
      const consumeSpeed  = 0.35 // ~17x más rápido
      pointsRef.current.rotation.y = (pointsRef.current.rotation.y + delta * THREE.MathUtils.lerp(baseSpeed, consumeSpeed, p)) % (Math.PI * 2)
    }

    // — Uniforms del shader —
    if (materialRef.current) {
      materialRef.current.uniforms.uPulse.value = p
      materialRef.current.uniforms.uTime.value  = state.clock.elapsedTime
    }

    // — Parallax de inclinación con el ratón —
    if (groupRef.current) {
      const targetX = state.mouse.y * Math.PI * 0.08 + Math.PI / 12
      const targetY = state.mouse.x * Math.PI * 0.1
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05)
    }

    // — Interactividad del ratón con partículas —
    if (materialRef.current && groupRef.current) {
      const target = new THREE.Vector3()
      state.raycaster.setFromCamera(state.pointer, state.camera)
      const intersect = state.raycaster.ray.intersectPlane(plane, target)
      if (intersect) {
        const localPos = intersect.clone()
        groupRef.current.worldToLocal(localPos)
        materialRef.current.uniforms.uMouse3D.value.lerp(localPos, 0.15)
      } else {
        materialRef.current.uniforms.uMouse3D.value.lerp(new THREE.Vector3(999, 999, 999), 0.1)
      }
    }
  })

  return (
    <group ref={groupRef}>
      <Stars radius={150} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
          <bufferAttribute attach="attributes-aScale"   args={[scales,    1]} />
        </bufferGeometry>

        <shaderMaterial
          ref={materialRef}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
          uniforms={uniforms}
          vertexShader={`
            uniform vec3  uMouse3D;
            uniform float uPulse;
            uniform float uTime;
            attribute float aScale;
            varying vec3 vColor;
            varying float vPulse;

            void main() {
              vColor = color;
              vPulse = uPulse;
              vec3 currentPos = position;

              // --- Efecto de Vórtice / Absorción ---
              // Al aumentar uPulse, las estrellas cercanas al centro son "atraídas"
              float distToCenter = length(currentPos.xz);
              if (uPulse > 0.01) {
                // Fuerza de atracción inversamente proporcional a la distancia
                float pullStrength = uPulse * (4.0 / (distToCenter + 0.5));
                vec3 towardCenter = normalize(vec3(-currentPos.x, 0.0, -currentPos.z));
                // También añadimos un giro en espiral
                float spiralAngle = uPulse * uTime * 2.0;
                vec3 spiralDir = vec3(
                  sin(spiralAngle) * currentPos.z - cos(spiralAngle) * currentPos.x,
                  0.0,
                  cos(spiralAngle) * currentPos.z + sin(spiralAngle) * currentPos.x
                );
                spiralDir = normalize(spiralDir) * 0.4;
                currentPos += (towardCenter * pullStrength + spiralDir * uPulse) * 0.6;

                // Brillo extra durante la absorción
                float pullGlow = pullStrength * 0.5;
                vColor = mix(vColor, vec3(0.7, 0.5, 1.0), min(pullGlow, 1.0) * uPulse);
              }

              // --- Interactividad del ratón ---
              float distM = distance(currentPos, uMouse3D);
              float sizeBoost = 0.0;
              if (distM < 2.0) {
                vec3 dir   = normalize(currentPos - uMouse3D);
                dir.y += 0.5;
                dir = normalize(dir);
                float force = pow((2.0 - distM) / 2.0, 2.0);
                currentPos += dir * force * 0.8;
                vColor     *= (1.0 + force * 2.5);
                sizeBoost   = force * 60.0;
              }

              vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
              gl_PointSize    = (75.0 + sizeBoost) * aScale * (1.0 / -mvPosition.z);
              gl_Position     = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3  vColor;
            varying float vPulse;

            void main() {
              float d = distance(gl_PointCoord, vec2(0.5));
              float strength = pow(max(0.0, 1.0 - d * 2.0), 2.5);
              float glow     = pow(max(0.0, 1.0 - d * 2.0), 6.0) * 0.6;
              // Durante la absorción toda la galaxia se intensifica levemente
              float brightBoost = 1.0 + vPulse * 1.5;
              vec3 finalColor = vColor * (strength + glow) * 2.0 * brightBoost;
              gl_FragColor = vec4(finalColor, strength);
              if (gl_FragColor.a < 0.001) discard;
            }
          `}
        />
      </points>
    </group>
  )
}
