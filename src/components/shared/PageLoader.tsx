'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  onComplete: () => void;
}

interface Particle {
  width: number; height: number;
  left: number; top: number;
  opacity: number; duration: number; delay: number;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  // Generamos las partículas UNA SOLA VEZ en el cliente para evitar hydration mismatch
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 20 }, () => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
  );

  useEffect(() => {
    // Simula la carga del bundle JS (rápida)
    const stages = [
      { target: 30, duration: 400 },   // Parsing JS bundles
      { target: 55, duration: 600 },   // Iniciando canvas WebGL
      { target: 75, duration: 800 },   // Cargando modelo .glb
      { target: 90, duration: 500 },   // Texturas y materiales
    ];

    let current = 0;
    const timers: NodeJS.Timeout[] = [];

    let elapsed = 0;
    for (const stage of stages) {
      elapsed += stage.duration;
      timers.push(
        setTimeout(() => {
          setProgress(stage.target);
        }, elapsed)
      );
    }

    // Esperamos a que el modelo GLB realmente cargue via el evento de useGLTF
    // Polling: chequeamos si el canvas de Three.js tiene contenido
    let checkInterval: NodeJS.Timeout;
    const startCheck = () => {
      checkInterval = setInterval(() => {
        const canvas3D = document.querySelector('canvas[data-engine]') as HTMLCanvasElement | null;
        if (canvas3D) {
          // El canvas de R3F está montado => modelo cargado
          clearInterval(checkInterval);
          setProgress(100);
          setTimeout(() => {
            setPhase('done');
            setTimeout(onComplete, 600);
          }, 300);
        }
      }, 200);
    };

    // Empezamos el polling después de que el primer bundle cargue
    const pollTimer = setTimeout(startCheck, 1200);

    // Fallback: máximo 6 segundos de loader
    const fallback = setTimeout(() => {
      clearInterval(checkInterval);
      setProgress(100);
      setTimeout(() => {
        setPhase('done');
        setTimeout(onComplete, 600);
      }, 300);
    }, 6000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(pollTimer);
      clearTimeout(fallback);
      clearInterval(checkInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
        >
          {/* Partículas de fondo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#54C6AA]"
                style={{
                  width: p.width,
                  height: p.height,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  opacity: p.opacity,
                }}
                animate={{ opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4] }}
                transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <img
              src="/Logo_Horizontal_Blanco.webp"
              alt="Campuslands"
              className="h-8 w-auto opacity-90"
            />
          </motion.div>

          {/* Barra de progreso */}
          <div className="w-[280px] flex flex-col items-center gap-3">
            <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(to right, #54C6AA, #937AE6)',
                  boxShadow: '0 0 12px rgba(84,198,170,0.6)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <motion.span
                className="font-roboto-mono text-[10px] uppercase tracking-[0.2em] text-[#54C6AA]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress < 55
                  ? 'Iniciando sistemas...'
                  : progress < 75
                  ? 'Cargando módulo 3D...'
                  : progress < 95
                  ? 'Calibrando nave...'
                  : 'Listo para despegar'}
              </motion.span>
              <span className="font-roboto-mono text-[10px] text-white/30">
                {progress}%
              </span>
            </div>
          </div>

          {/* Indicador de escaneo */}
          <motion.div
            className="absolute bottom-12 flex items-center gap-2 opacity-30"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="h-[1px] w-8 bg-[#54C6AA]" />
            <span className="font-roboto-mono text-[9px] tracking-[0.3em] text-[#54C6AA] uppercase">Campuslands Emplea</span>
            <div className="h-[1px] w-8 bg-[#54C6AA]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
