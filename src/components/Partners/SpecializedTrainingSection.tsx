'use client';

import { motion } from 'framer-motion';
import { partnersPage } from './partnersData';
import LazySpaceshipCanvas from './LazySpaceshipCanvas';
import { useMemo } from 'react';
import data from '@/data/es.json';

const { training } = partnersPage;

export default function SpecializedTrainingSection() {
  const tecnologias = data.partners_page.training.technologies;

  const { positionedItems, getLogoSize } = useMemo(() => {

    const layoutMap: Record<string, { x: number, y: number, scale: number, delay: number }> = {
      python: { x: -260, y: -160, scale: 1.2, delay: 0 },
      react: { x: 260, y: -140, scale: 1.2, delay: 0.3 },
      reactnative: { x: 260, y: -140, scale: 1.2, delay: 0.3 },
      bootstrap: { x: -420, y: -60, scale: 1.4, delay: 0.6 },
      mysql: { x: 420, y: -40, scale: 1.4, delay: 0.9 },
      postgresql: { x: -340, y: 40, scale: 1.1, delay: 1.2 },
      postgre: { x: -340, y: 40, scale: 1.1, delay: 1.2 },
      typescript: { x: 340, y: 30, scale: 1.1, delay: 1.5 },

      javascript: { x: -110, y: 170, scale: 1.3, delay: 0.4 },
      css: { x: 0, y: 190, scale: 1.3, delay: 0.7 },
      html: { x: 110, y: 170, scale: 1.3, delay: 1.0 },
    };

    const items = tecnologias.map((tech: any) => {
      const key = (tech.name || "").toLowerCase().trim();
      return {
        ...tech,
        layout: layoutMap[key] || { x: 0, y: 0, scale: 1, delay: 0 }
      };
    });

    const getLogoSize = (name: string) => {
      const n = name?.toLowerCase() || "";
      // logos grandes (Frontend)
      if (['html', 'css', 'javascript', 'js'].includes(n)) return "h-20 w-20 sm:h-19 sm:w-19";
      // Logos horizontales
      if (['mysql', 'python', 'postgresql', 'postgre', 'bootstrap', 'reactnative'].includes(n)) return "h-15 w-15 sm:h-19 sm:w-19";
      // Resto (TypeScript, React, etc)
      return "h-15 w-15 sm:h-19 sm:w-19";
    };

    return { positionedItems: items, getLogoSize };
  }, [tecnologias]);

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:min-h-[1000px]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[#54C6AA]/5 blur-[160px] rounded-full" />
      </div>

      <div className="container relative z-20 mx-auto px-6 lg:px-12">
        {/* Textos del Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-[1302px] text-center mb-16"
        >
          <h2 className="font-poppins text-[32px] font-medium leading-[1.2] text-[#E9E9E9] sm:text-[40px]">
            {training.heading}
          </h2>
          <p className="mt-2 font-poppins text-[22px] leading-[1.3] text-[#E9E9E9]/90 sm:text-[32px]">
            {training.subheading}
          </p>
          <p className="mt-4 font-roboto-mono text-[11px] uppercase tracking-[0.2em] leading-[1.5] text-[#54C6AA] sm:text-xs">
            {training.track}
          </p>
        </motion.div>

        {/* Contenedor del Escenario */}
        <div className="relative mx-auto h-[800px] w-full max-w-[1200px] flex items-center justify-center">

          {/* Capa 0: Imagen Central Orbit (Atrás de todo) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div
              className="absolute left-1/2 top-1/2 pointer-events-auto"
              style={{ x: '-50%', y: '-50%' }}
            >
              <div className="relative">
                <img
                  src={data.partners_page.training.orbit}
                  alt="Orbit Center"
                  className="w-[250px] h-[250px] sm:w-[550px] sm:h-[550px] object-contain opacity-70 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Capa 1: Logos Flotantes Individuales */}
          <div className="absolute inset-0 z-20 pointer-events-none">

            {positionedItems.map((item: any, index: number) => (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 pointer-events-auto"
                style={{
                  translateX: '-50%',
                  translateY: '-50%',
                  x: item.layout.x,
                  scale: item.layout.scale,
                }}
                animate={{ y: [item.layout.y, item.layout.y - 25, item.layout.y] }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.layout.delay
                }}
              >
                <div className="group relative flex flex-col items-center">
                  <div className="absolute inset-0 -z-10 bg-[#54C6AA]/10 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />

                  <img
                    src={item.logo}
                    alt={item.name}
                    className={`${getLogoSize(item.name)} object-contain drop-shadow-[0_0_20px_rgba(84,198,170,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_35px_rgba(84,198,170,0.6)]`}
                  />

                  <span className="mt-6 font-roboto-mono text-[11px] text-white/50 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Capa 2: La Nave Espacial Base */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <LazySpaceshipCanvas
              className="h-[1200px] w-full max-w-[1200px]"
              modelScale={0.35}
              modelPosition={[0, -2.2, 0]}
              modelRotation={[0.01, -1.6, 0]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}