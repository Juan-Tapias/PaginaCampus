'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { partnersPage } from './partnersData';

const { selection } = partnersPage;

export default function PartnersSelectionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % selection.carrusel.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          {/* Subheader verde */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-roboto-mono text-xs uppercase tracking-[0.3em] text-[#54C6AA] mb-12"
          >
            {selection.subheader}
          </motion.p>

          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-center"
              >
                {/* Imagen del Slide */}
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-2xl shrink-0"
                  style={{ width: '334px', height: '582px' }}
                >
                  <img
                    src={selection.carrusel[activeIndex].slide}
                    alt={selection.carrusel[activeIndex].title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Contenido del Slide */}
                <div className="flex flex-col gap-10">
                  <h3 
                    className="font-poppins font-semibold text-white leading-[1.1]"
                    style={{ fontSize: '56px' }}
                    dangerouslySetInnerHTML={{ __html: selection.carrusel[activeIndex].title }}
                  />
                  
                  <div className="bg-[#111111] p-10 lg:p-14 rounded-2xl border border-white/5 max-w-md">
                    <p 
                      className="font-poppins text-gray-400 leading-relaxed"
                      style={{ fontSize: '20px' }}
                    >
                      {selection.carrusel[activeIndex].subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navegación por puntos */}
          <div className="mt-16 flex justify-center lg:justify-start gap-4">
            {selection.carrusel.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === activeIndex ? 'w-12 bg-[#54C6AA]' : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
