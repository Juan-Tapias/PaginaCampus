import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
// ... rest of imports
import { partnersPage } from './partnersData';
import LazySpaceshipCanvas from './LazySpaceshipCanvas';

const { testimonials, assets } = partnersPage;

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);

  // Capturamos el progreso de entrada a la sección
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Animación de llegada (desde arriba, zoom-in y fade-in)
  const shipY = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const shipScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const shipOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % testimonials.items.length);
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  const current = testimonials.items[active];

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24 lg:min-h-[715px] lg:py-0">
      <div className="container relative z-20 mx-auto grid min-h-[560px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[260px] opacity-70 sm:h-[360px] lg:h-[500px]"
        >
          {/* El espacio para la nave global */}

          {/* Línea inferior brillante */}
          <div className="absolute inset-x-8 bottom-8 z-20 h-px bg-gradient-to-r from-transparent via-[#54C6AA]/60 to-transparent" />
        </motion.div>

        <div className="relative flex flex-col items-center justify-center lg:pl-16">
          {/* Vertical HUD Line - Left of text */}
          <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-white/10 lg:block">
             <div className="absolute top-1/4 h-20 w-[2px] bg-[#54C6AA]/30" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.author}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <p className="max-w-[480px] text-center font-poppins text-[17px] italic leading-[1.8] text-[#E9E9E9] lg:text-[19px]">
                "{current.quote}"
              </p>
              
              <div className="mt-12 flex flex-col items-center justify-center">
                <div className="mb-4 size-14 overflow-hidden rounded-full border border-white/20 bg-gray-800 shadow-xl">
                   <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                      <img
                        src={current.image}
                        alt={current.author}
                        className="h-full w-full object-cover"
                      />
                   </div>
                </div>

                <h3 className="text-center font-poppins text-base font-bold uppercase tracking-wider text-[#E9E9E9]">
                  {current.author}
                </h3>
                <p className="mt-1 text-center font-roboto-mono text-[11px] uppercase tracking-widest text-[#54C6AA]">
                  {current.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex gap-3">
            {testimonials.items.map((item, index) => (
              <button
                key={item.author}
                type="button"
                onClick={() => setActive(index)}
                className={`h-1 rounded-full transition-all duration-300 ${active === index ? 'w-8 bg-[#54C6AA]' : 'w-3 bg-white/10 hover:bg-white/30'
                  }`}
                aria-label={`Ver testimonio de ${item.author}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
