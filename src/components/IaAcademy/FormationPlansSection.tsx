'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { iaPlans } from './iaAcademyData';

export default function FormationPlansSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const desktopCards = useMemo(
    () =>
      iaPlans.map((plan, index) => {
        const distance = index - activeIndex;
        const absDistance = Math.abs(distance);

        return {
          ...plan,
          x: distance * 230,
          scale: absDistance === 0 ? 1 : absDistance === 1 ? 0.9 : 0.78,
          opacity: absDistance === 0 ? 1 : absDistance === 1 ? 0.74 : 0.42,
          zIndex: 20 - absDistance,
          blur: absDistance > 1 ? 2 : 0,
        };
      }),
    [activeIndex],
  );

  return (
    <section id="ia-plans" className="relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32">
      <div className="container relative mx-auto max-w-[1302px]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[820px] text-center"
        >
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">
            PLANES DE FORMACIÓN ESPACIAL
          </p>
          <h2 className="mt-4 font-poppins text-[34px] font-semibold leading-[1.15] text-[#E9E9E9] sm:text-[44px] lg:text-[56px]">
            Diseñados para ejecución IA por etapas
          </h2>
        </motion.div>

        <div className="relative mt-16 hidden h-[420px] items-center justify-center lg:flex">
          {desktopCards.map((card, index) => (
            <motion.button
              key={card.id}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              animate={{
                x: card.x,
                scale: card.scale,
                opacity: card.opacity,
                filter: `blur(${card.blur}px)`,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              className="absolute h-[350px] w-[340px] rounded-[10px] border border-white/10 bg-[#0E1018]/95 p-8 text-left shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              style={{ zIndex: card.zIndex as number }}
            >
              <p className="font-roboto-mono text-[11px] uppercase tracking-[0.2em] text-[#54C6AA]">
                {card.subtitle}
              </p>
              <h3 className="mt-5 font-poppins text-[28px] font-medium leading-[1.2] text-white">
                {card.title}
              </h3>
              <p className="mt-6 font-poppins text-[17px] leading-[1.6] text-white/75">{card.description}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:hidden">
          {iaPlans.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-lg border p-5 text-left transition-colors ${
                activeIndex === index
                  ? 'border-[#54C6AA] bg-[#0E1018] text-white'
                  : 'border-white/10 bg-[#0B0C11] text-white/75'
              }`}
            >
              <p className="font-roboto-mono text-[10px] uppercase tracking-[0.2em] text-[#54C6AA]">{plan.subtitle}</p>
              <h3 className="mt-2 font-poppins text-2xl">{plan.title}</h3>
              <p className="mt-3 font-poppins text-sm leading-relaxed">{plan.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
