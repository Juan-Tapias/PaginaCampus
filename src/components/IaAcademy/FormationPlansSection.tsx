'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { iaFormationPlans, iaPlans } from './iaAcademyData';

export default function FormationPlansSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const desktopCards = useMemo(
    () =>
      iaPlans.map((plan, index) => {
        const distance = index - activeIndex;
        const absDistance = Math.abs(distance);

        return {
          ...plan,
          x: distance * 262,
          scale: absDistance === 0 ? 1 : absDistance === 1 ? 0.9 : 0.8,
          opacity: absDistance === 0 ? 1 : absDistance === 1 ? 0.62 : 0.3,
          zIndex: 20 - absDistance,
          blur: absDistance > 1 ? 3 : 0,
        };
      }),
    [activeIndex],
  );

  return (
    <section id="ia-plans" className="relative overflow-hidden px-6 pb-24 pt-16 lg:px-12 lg:pb-28 lg:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1320px] bg-gradient-to-r from-transparent via-[#2D4A50]/70 to-transparent" />
      <div className="container relative mx-auto max-w-[1302px]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[820px] text-center"
        >
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">
            {iaFormationPlans.eyebrow}
          </p>
          <h2 className="mt-4 font-poppins text-[42px] font-semibold leading-[1.08] text-[#E9E9E9] sm:text-[50px] lg:text-[58px]">
            {iaFormationPlans.heading}
          </h2>
          {iaFormationPlans.description && (
            <p className="mx-auto mt-5 max-w-[760px] font-poppins text-[17px] leading-[1.6] text-white/80 lg:text-[20px]">
              {iaFormationPlans.description}
            </p>
          )}
        </motion.div>

        <div className="relative mt-20 hidden h-[450px] items-center justify-center lg:flex">
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
              className="absolute h-[374px] w-[360px] rounded-[12px] border border-white/10 bg-[#16191F]/95 p-8 text-left shadow-[0_20px_70px_rgba(0,0,0,0.52)]"
              style={{ zIndex: card.zIndex as number }}
            >
              <p className="font-roboto-mono text-[10px] uppercase tracking-[0.2em] text-[#54C6AA]">
                {card.subtitle}
              </p>
              <h3 className="mt-5 font-poppins text-[26px] font-medium leading-[1.16] text-white lg:text-[30px]">
                {card.title}
              </h3>
              <p className="mt-6 font-poppins text-[18px] leading-[1.6] text-white/75">{card.description}</p>
              <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-[12px] bg-gradient-to-r from-transparent via-[#22CABC]/75 to-transparent" />
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
                  ? 'border-[#54C6AA] bg-[#15171D] text-white'
                  : 'border-white/10 bg-[#0E1015] text-white/75'
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
