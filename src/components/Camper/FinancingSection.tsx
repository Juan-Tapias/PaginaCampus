'use client';

import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import data from '@/data/es.json';

const { financing } = data.se_un_camper;

// Versión estática y simplificada del UniversoInteractivo
function StaticGalaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const parameters = {
    count: 8000,
    radius: 5.0,
    branches: 3,
    spin: 1.0,
    randomness: 0.5,
    randomnessPower: 3,
  };

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(parameters.count * 3);
    const col = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color('#3a2b6e');
    const colorOutside = new THREE.Color('#1a1a1a');

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
      const spinAngle = radius * parameters.spin;

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius * 0.5;
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone().lerp(colorOutside, radius / parameters.radius);
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={0} />
    </group>
  );
}

function CompanyLogos() {
  const { financing } = data.se_un_camper;

  // Posiciones más centradas
  const logoPositions = [
    { x: -1.8, y: 0.8, z: 1 },
    { x: 1.4, y: 1.4, z: 1 },
    { x: -1.4, y: -0.8, z: 1 },
    { x: 2.0, y: -0.1, z: 1 },
    { x: 0.9, y: -1.4, z: 1 },
  ];

  if (!financing || !financing.partners) return null;

  return (
    <>
      {financing.partners.map((partner: any, index: number) => (
        <Float
          key={partner.name}
          speed={3}
          rotationIntensity={0.6}
          floatIntensity={1.0}
          position={[logoPositions[index]?.x || 0, logoPositions[index]?.y || 0, logoPositions[index]?.z || 1]}
        >
          <Html
            transform
            distanceFactor={12}
            pointerEvents="auto"
            occlude="blending"
          >
            <a
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group transition-all duration-300 hover:scale-110"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-16 h-auto object-contain brightness-90 group-hover:brightness-110 transition-all"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                    maxWidth: 'none'
                  }}
                />
              </div>
            </a>
          </Html>
        </Float>
      ))}
    </>
  );
}

export default function FinancingSection() {
  return (
    <section className="relative w-full py-12 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">

        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 z-10">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[28px] md:text-[32px] font-medium text-white mb-12"
          >
            {financing.title}
          </motion.h2>

          <div className="space-y-12 mb-16">
            {financing.options.map((option: any, index: number) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="max-w-md"
              >
                <h3 className="text-[#3BC4A5] font-mono text-lg mb-4 flex items-center gap-3">
                  <span className="text-[12px] opacity-70">{'>'}</span>
                  {option.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                  {option.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-white/20 text-white font-mono text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            {financing.cta}
          </motion.button>
        </div>

        {/* Right Side: Interactive Galaxy with Logos */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            <StaticGalaxy />
            <CompanyLogos />
          </Canvas>

          {/* Gradient Overlay for blending */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-transparent hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
