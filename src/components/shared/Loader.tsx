
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

// Importar cada letra individualmente para que el bundler las procese correctamente desde assets
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
  letterC,
  letterA,
  letterM,
  letterP,
  letterU,
  letterS,
  letterL,
  letterA2,
  letterN,
  letterD,
  letterS2
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [showTagline, setShowTagline] = useState(false);
  const { progress } = useProgress();
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsAssetsLoaded(true);
    }
  }, [progress]);

  useEffect(() => {
    // Después de que caigan todas las letras (aprox 1.2s), mostramos el tagline
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 1200);

    // Terminamos la carga completa tras el tiempo mínimo Y carga real de assets
    const minTimeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(minTimeTimer);
    };
  }, [onComplete, isAssetsLoaded, progress]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080a] overflow-hidden"
    >
      {/* Contenedor de letras SVG cayendo */}
      <div className="flex gap-2 md:gap-4 mb-8 px-4 flex-wrap justify-center items-end">
        {letters.map((src, i) => (
          <motion.img
            key={i}
            // En Next.js, las importaciones de imágenes devuelven un objeto con la propiedad .src
            src={typeof src === 'string' ? src : src.src}
            alt={`letter-${i}`}
            initial={{ y: -500, opacity: 0, scaleY: 1.5, scaleX: 0.8 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              scaleY: [1.5, 0.6, 1],
              scaleX: [0.8, 1.3, 1],
              filter: ["brightness(1)", "brightness(2.5)", "brightness(1)"],
            }}
            transition={{ 
              duration: 0.28,      
              ease: "circIn",     
              delay: i * 0.1,     
              times: [0, 0.8, 1] 
            }}
            className="h-10 sm:h-16 md:h-28 w-auto object-contain origin-bottom"
          />
        ))}
      </div>

      {/* Tagline Brillante */}
      <AnimatePresence>
        {showTagline && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <motion.p 
              className="font-roboto-mono text-sm md:text-xl tracking-[0.5em] text-cyan-400 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut" 
              }}
            >
              Go for it
            </motion.p>
            
            {/* Línea decorativa brillante */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2 w-32 md:w-48"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efecto de partículas de polvo al caer */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
    </motion.div>
  );
}
