'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useProgress } from '@react-three/drei';
import OrbitIntro3D from './OrbitIntro3D';

import letterC from '../../assets/letter/c.svg';
import letterA from '../../assets/letter/a.svg';
import letterM from '../../assets/letter/m.svg';
import letterP from '../../assets/letter/p.svg';
import letterU from '../../assets/letter/u.svg';
import letterS from '../../assets/letter/s.svg';
import letterL from '../../assets/letter/l.svg';
import letterA2 from '../../assets/letter/a2.svg';
import letterN from '../../assets/letter/n.svg';
import letterD from '../../assets/letter/d.svg';
import letterS2 from '../../assets/letter/s2.svg';

const letters = [
  letterC, letterA, letterM, letterP, letterU, letterS,
  letterL, letterA2, letterN, letterD, letterS2
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [showTagline, setShowTagline] = useState(true);
  const [hasImpacted, setHasImpacted] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const { progress } = useProgress();

  const getStatusMessage = (p: number) => {
    if (p < 20) return 'Iniciando protocolos...';
    if (p < 40) return 'Descargando módulos 3D...';
    if (p < 70) return 'Sincronizando órbita...';
    if (p < 100) return 'Preparando ignición...';
    return 'Sistema listo';
  };

  const handleReady = useCallback(() => {
  setIsModelLoaded(true);
}, []);

const handleImpact = useCallback(() => {
  setHasImpacted(true);
  
  setTimeout(() => {
    onComplete();
  }, 1200); 
}, [onComplete]);


  return (
    <motion.div
      initial={{ y: 0 }}
      animate={hasImpacted ? { 
        x: [0, -4, 4, -4, 4, 0],
        transition: { duration: 0.4 } 
      } : {}}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.3, ease: "circOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080a] overflow-hidden"
    >
      {/* Escena 3D */}
      <OrbitIntro3D onImpact={handleImpact} onReady={handleReady} />

      <AnimatePresence>
        {(!hasImpacted && !isModelLoaded) && (
          <motion.div
            key="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-12 flex flex-col items-center gap-3 z-30"
          >
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#3ed896] shadow-[0_0_10px_#3ed896]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="font-mono text-[10px] tracking-[0.4em] text-[#3ed896]/80 uppercase"
              >
                {getStatusMessage(progress)}
              </motion.p>
              <span className="font-mono text-[9px] text-[#3ed896]/40 tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letras de CAMPUSLANDS */}
      <motion.div className="flex gap-2 md:gap-4 mb-8 px-4 flex-wrap justify-center items-end relative z-20">
        {letters.map((src, i) => (
          <motion.img
            key={i}
            src={typeof src === 'string' ? src : src.src}
            alt={`letter-${i}`}
            initial={{ y: 30, opacity: 0 }}
            animate={
              hasImpacted
                ? {
                    y: [0, -80, 50],
                    x: [0, (i - 5) * 30, (i - 5) * 45],
                    rotate: [0, (i - 5) * 15, (i - 5) * 25],
                    scale: [1, 1.2, 0.9],
                    filter: ["brightness(1) blur(0px)", "brightness(4) blur(2px)", "brightness(0.8) blur(0px)"],
                    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.01 }
                  }
                : {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, delay: i * 0.04, ease: "easeOut" }
                  }
            }
            exit={{ opacity: 1, y: -100 }}
            transition={{ duration: 0.3 }}
            className="h-12 sm:h-20 md:h-32 w-auto object-contain origin-bottom"
          />
        ))}
      </motion.div>

      {/* Tagline */}
      <AnimatePresence>
        {showTagline && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 1, y: -20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center relative z-20"
          >
            <motion.p
              className="font-roboto-mono text-sm md:text-xl tracking-[0.5em] text-cyan-400 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              Go for it
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2 w-32 md:w-48"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efecto CRT sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[101] pointer-events-none opacity-20" />
    </motion.div>
  );
}