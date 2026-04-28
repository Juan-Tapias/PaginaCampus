'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PartnersSpaceshipCanvas from './PartnersSpaceshipCanvas';

export default function PartnersTravelingSpaceship() {
  const { scrollYProgress } = useScroll();

  const scrollRange = [0, 0.15, 0.3, 0.45, 0.65, 0.85];

  // X de pantalla: La movemos bien a la izquierda para dejar espacio al texto
  // En 0.45 a 0.65 (Tecnologías) se queda en 0vw para "frenar"
  const x = useTransform(scrollYProgress, scrollRange, ["25vw", "0vw", "-35vw", "0vw", "0vw", "-40vw"]);

  const y = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.45, 0.65, 1], 
    ["0vh", "15vh", "15vh", "15vh", "45vh"] // Se mantiene en 15vh durante Tecnologías (0.45 - 0.65)
  );

  // Escala equilibrada: se mantiene en 0.35 durante tecnologías
  const scale = useTransform(scrollYProgress, scrollRange, [0.25, 0.25, 0.7, 0.35, 0.35, 0.25]);

  const rotX = useTransform(scrollYProgress, scrollRange, [0.45, 0.2, 0, 0.01, 0.01, 0.1]);
  const rotY = useTransform(scrollYProgress, scrollRange, [-0.4, -0.8, -0.6, -1.6, -1.6, -1.8]);
  const rotZ = useTransform(scrollYProgress, scrollRange, [-0.1, 0, 0, 0, 0, 0]);

  const pos3DX = useTransform(scrollYProgress, scrollRange, [-1.7, 0, 8, 0, 0, 5]);
  const pos3DY = useTransform(scrollYProgress, scrollRange, [1.7, 1, -1, -2.2, -2.2, -3.5]);
  const pos3DZ = useTransform(scrollYProgress, scrollRange, [0, 0, 1.5, 0, 0, 0]);

  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.04, 0.06, 0.23, 0.25, 0.7, 0.75], 
    [1, 1, 0.5, 0.5, 1, 1, 0.4] 
  );
  const blur = useTransform(
    scrollYProgress, 
    [0.08, 0.1, 0.23, 0.25], 
    ["blur(0px)", "blur(40px)", "blur(40px)", "blur(0px)"]
  );

  // Springs para fluidez total (suavizamos el damping para que sea más orgánico)
  const springConfig = { stiffness: 40, damping: 26, mass: 1.2 };
  const sX = useSpring(x, springConfig);
  const sY = useSpring(y, springConfig);
  const sScale = useSpring(scale, springConfig);
  
  const sRotX = useSpring(rotX, springConfig);
  const sRotY = useSpring(rotY, springConfig);
  const sRotZ = useSpring(rotZ, springConfig);
  
  const sP3X = useSpring(pos3DX, springConfig);
  const sP3Y = useSpring(pos3DY, springConfig);
  const sP3Z = useSpring(pos3DZ, springConfig);

  // Máscara dinámica: Solo se activa en Testimonios (0.28 - 0.40)
  const mask = useTransform(
    scrollYProgress,
    [0, 0.15, 0.28, 0.40, 0.45],
    [
      'linear-gradient(to right, black 100%, black 100%)', // Héroe (Total)
      'linear-gradient(to right, black 100%, black 100%)', // Ciclo (Total)
      'linear-gradient(to right, black 30%, transparent 85%)', // Entrando a Testimonios
      'linear-gradient(to right, black 30%, transparent 85%)', // Testimonios
      'linear-gradient(to right, black 100%, black 100%)'  // Formación (Total)
    ]
  );

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      <motion.div
        style={{
          x: sX,
          y: sY,
          opacity: opacity,
          filter: blur,
          width: '100%',
          height: '100%',
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
        className="flex items-center justify-center"
      >
        {/* Wrapper adicional para el efecto de flotación (Idle animation) */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotateZ: [0, 0.5, -0.5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full flex items-center justify-center"
        >
          <PartnersSpaceshipCanvas
            modelScale={sScale}
            customRotation={[sRotX, sRotY, sRotZ]}
            customPosition={[sP3X, sP3Y, sP3Z]}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
