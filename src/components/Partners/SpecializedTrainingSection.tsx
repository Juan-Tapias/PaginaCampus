import { motion, useInView } from 'framer-motion';
import { partnersPage } from './partnersData';
import { useMemo, useRef } from 'react';
import data from '@/data/es.json';

const { training } = partnersPage;

export default function SpecializedTrainingSection() {
  const tecnologias = data.partners_page.training.technologies;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "0px 0px 200px 0px" });

  const { positionedItems, getLogoSize } = useMemo(() => {
    // ... (rest of the useMemo content remains same)
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
      if (['html', 'css', 'javascript', 'js'].includes(n)) return "h-20 w-20 sm:h-19 sm:w-19";
      if (['mysql', 'python', 'postgresql', 'postgre', 'bootstrap', 'reactnative'].includes(n)) return "h-15 w-15 sm:h-19 sm:w-19";
      return "h-15 w-15 sm:h-19 sm:w-19";
    };

    return { positionedItems: items, getLogoSize };
  }, [tecnologias]);

  return (
    <section 
      id="specialized-training" 
      className="relative overflow-hidden py-20 lg:min-h-[760px] lg:py-0"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Optimizamos el blur pesado por un gradiente radial de CSS, mucho más eficiente */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[800px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(84, 198, 170, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container relative mx-auto px-6 lg:px-12">
        {/* Textos del Encabezado (Les damos z-20 para que estén sobre la nave) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75 }}
          className="relative z-20 mx-auto max-w-[1302px] text-center mb-16"
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

          {/* Capa 0: Imagen Central Orbit (Atrás de la nave global z-10) */}
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

          {/* Capa 1: Logos Flotantes Individuales (Al frente de la nave z-10) */}
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
                // Animación mucho más sutil y lenta para las tecnologías
                animate={isInView ? { 
                  y: [item.layout.y, item.layout.y - 8, item.layout.y],
                  rotate: [0, 1, -1, 0]
                } : { y: item.layout.y }}
                transition={{
                  duration: 7 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.layout.delay
                }}
              >
                <div className="group relative flex flex-col items-center">
                  {/* Simplificamos el brillo al hover para ser menos pesado */}
                  <div className="absolute inset-0 -z-10 bg-[#54C6AA]/5 blur-2xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-700" />

                  <img
                    src={item.logo}
                    alt={item.name}
                    className={`${getLogoSize(item.name)} object-contain transition-all duration-500 group-hover:scale-110`}
                  />

                  <span className="mt-6 font-roboto-mono text-[11px] text-white/50 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Capa 2: La Nave Espacial Base (Ahora global) */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
             {/* El espacio para la nave global que termina aquí */}
          </div>
        </div>
      </div>
    </section>
  );
}