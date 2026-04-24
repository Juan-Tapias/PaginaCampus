'use client';

import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import UniversoInteractivo from '../../shared/UniversoInteractivo'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import data from "../../../data/es.json";

const { strategic_partners } = data;

const DISPLAY_MS = 5000;
const EXIT_MS = 1200;

function getUniformPositions(count: number) {
  const positions: { top: string; left: string }[] = [
    { top: '50%', left: '50%' },
  ];

  if (count <= 1) return positions;

  const cx = 50;
  const cy = 50;
  const rx = 22;
  const ry = 18;

  for (let i = 1; i < count; i++) {
    const angle = ((i - 1) / (count - 1)) * 2 * Math.PI - Math.PI / 2;
    const left = cx + rx * Math.cos(angle);
    const top = cy + ry * Math.sin(angle);
    positions.push({ top: `${top.toFixed(1)}%`, left: `${left.toFixed(1)}%` });
  }

  return positions;
}

function createBatches<T>(items: T[], batchSize: number, minLast = 3): T[][] {
  const batches: T[][] = []
  let i = 0
  while (i < items.length) {
    const remaining = items.length - i
    if (remaining > batchSize && remaining - batchSize < minLast) {
      batches.push(items.slice(i))
      break
    }
    batches.push(items.slice(i, i + batchSize))
    i += batchSize
  }
  return batches
}

export default function PartnersSection() {
  const allPartners = strategic_partners.companies;
  const itemsPerPage = 7;
  const batches = createBatches(allPartners, itemsPerPage);
  const totalBatches = batches.length;

  const [batch, setBatch] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const consumingRef = useRef(false);

  useEffect(() => {
    const cycle = setInterval(() => {
      consumingRef.current = true;
      setIsExiting(true);

      setTimeout(() => {
        setBatch(prev => (prev + 1 >= totalBatches ? 0 : prev + 1));
        setIsExiting(false);
        setTimeout(() => { consumingRef.current = false; }, 600);
      }, EXIT_MS);

    }, DISPLAY_MS + EXIT_MS);

    const handleVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(cycle);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [totalBatches]);

  const currentPartners = batches[batch] ?? [];
  const positions = getUniformPositions(currentPartners.length);

  return (
    <section className="relative w-full min-h-screen bg-transparent overflow-hidden flex flex-col items-start justify-start">

      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 8, 18], fov: 45 }}
          frameloop={paused ? 'never' : 'always'}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.2]}
        >
          <UniversoInteractivo consumingRef={consumingRef} />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </div>

      {/* Nebulosas decorativas detrás de los logos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.15, 0.05],
            y: [0, -40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[130px]"
        />
      </div>

      <div className="relative z-20 w-full container mx-auto px-6 text-center pt-24 pb-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#54C6AA] font-roboto-mono text-sm tracking-[0.3em] uppercase mb-3"
        >
          {strategic_partners.subheading}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white font-poppins text-4xl md:text-5xl lg:text-6xl font-semibold mb-3"
        >
          {strategic_partners.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-400 font-poppins max-w-2xl mx-auto text-base"
        >
          {strategic_partners.description}
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div key={`batch-${batch}`} className="absolute inset-0 z-10 pointer-events-none">
            {currentPartners.map((partner, i) => {
              const pos = positions[i] ?? positions[0];

              return (
                <motion.div
                  key={`${partner.name}-${batch}`}
                  className="absolute pointer-events-auto group cursor-pointer"
                  style={{ translateX: '-50%', translateY: '-50%' }}
                  initial={{
                    top: '50%',
                    left: '50%',
                    scale: 0,
                    opacity: 0,
                    rotate: -240,
                    filter: 'blur(16px)',
                  }}
                  animate={{
                    top: pos.top,
                    left: pos.left,
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 1.8,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  exit={{
                    top: '50%',
                    left: '50%',
                    scale: 0,
                    opacity: 0,
                    rotate: 300,
                    filter: 'blur(20px)',
                    transition: {
                      duration: 1.2,
                      delay: (currentPartners.length - 1 - i) * 0.09,
                      ease: [0.6, 0, 1, 0.4],
                    },
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center w-32 md:w-44 h-20 md:h-24 transition-all duration-500 group/logo">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="max-w-[70%] max-h-[70%] w-auto h-auto object-contain grayscale brightness-0 invert opacity-70 group-hover/logo:opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-400 relative z-10"
                      />
                    </div>
                    <motion.div
                      className="h-[1px] bg-[#54C6AA] mt-2 origin-center"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 0.7 }}
                      style={{ width: '2rem' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer: indicadores + CTAs — anclados muy abajo */}
      <div className="relative z-20 w-full flex flex-col items-center gap-5 mt-auto pt-[70vh] pb-12">
        {/* Indicadores de batch */}
        <div className="flex gap-2">
          {Array.from({ length: totalBatches }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                consumingRef.current = true;
                setIsExiting(true);
                setTimeout(() => {
                  setBatch(i);
                  setIsExiting(false);
                  setTimeout(() => { consumingRef.current = false; }, 600);
                }, EXIT_MS);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === batch ? 'bg-[#54C6AA] scale-125' : 'bg-white/20 hover:bg-white/40'
                }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#5E39DA] text-white font-roboto-mono px-12 py-4 text-sm tracking-widest hover:bg-[#6D4AE0] transition-colors shadow-[0_0_30px_rgba(94,57,218,0.2)]"
          >
            CONTRATAR TALENTO
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/20 text-white font-roboto-mono px-12 py-4 text-sm tracking-widest backdrop-blur-sm transition-colors"
          >
            INYECTAR CAPITAL
          </motion.button>
        </div>
      </div>

    </section>
  )
}
