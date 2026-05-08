'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { iaFormationPlans, iaPlans } from './iaAcademyData';

export default function FormationPlansSection() {
  const [activeIndex, setActiveIndex] = useState(2);

  const desktopCards = useMemo(
    () =>
      iaPlans.map((plan, index) => {
        // Layout estático basado en el centro (índice 2) para que no se muevan de lugar
        const layoutDistance = index - 2;
        const layoutAbsDistance = Math.abs(layoutDistance);
        const isActive = index === activeIndex;

        return {
          ...plan,
          x: layoutDistance * 222,
          y: (layoutAbsDistance === 0 ? 72 : layoutAbsDistance === 1 ? 38 : 0) - (isActive ? 20 : 0),
          scale: isActive ? 1.05 : 1,
          opacity: 1,
          zIndex: isActive ? 50 : 20 - layoutAbsDistance,
          blur: 0,
        };
      }),
    [activeIndex],
  );

  return (
    <section id="ia-plans" className="relative overflow-hidden px-6 pb-24 pt-14 lg:px-12 lg:pb-32 lg:pt-20">
      <div className="container relative mx-auto max-w-[1302px]">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[820px] text-center"
        >
          <p className="font-roboto-mono text-[16px] uppercase tracking-[0.14em] text-[#42CDB5]">
            {iaFormationPlans.eyebrow}
          </p>
          <h2 className="mt-3 font-poppins text-[34px] font-medium leading-none text-[#F2F2F2] sm:text-[38px] lg:text-[40px]">
            {iaFormationPlans.heading}
          </h2>
          {iaFormationPlans.description && (
            <p className="mx-auto mt-4 max-w-[760px] font-poppins text-[18px] leading-[1.45] text-[#E7E7E7] lg:text-[20px]">
              {iaFormationPlans.description}
            </p>
          )}
        </motion.div>

        <div className="relative mt-[78px] hidden h-[520px] items-start justify-center lg:flex">
          {desktopCards.map((card, index) => (
            <motion.button
              key={card.id}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              animate={{
                x: card.x,
                y: card.y,
                scale: card.scale,
                opacity: card.opacity,
                filter: `blur(${card.blur}px)`,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              className={`absolute flex h-[450px] w-[246px] flex-col overflow-hidden rounded-[9px] border px-6 py-7 text-left shadow-[0_18px_44px_rgba(0,0,0,0.36)] transition-colors duration-300 ${
                index === activeIndex 
                  ? 'border-[#54C6AA] bg-[linear-gradient(180deg,rgba(30,44,38,0.98)_0%,rgba(20,30,25,0.95)_100%)]' 
                  : 'border-[#5B5B64]/75 bg-[linear-gradient(180deg,rgba(29,27,39,0.96)_0%,rgba(30,44,38,0.92)_100%)]'
              }`}
              style={{ zIndex: card.zIndex as number }}
            >
              <p className="font-roboto-mono text-[12px] uppercase tracking-[0.02em] text-[#D6D1DC]">
                {card.mission}
              </p>
              <h3 className="mt-4 font-poppins text-[22px] font-medium leading-none text-[#F4F4F4]">
                {card.title}
              </h3>
              <p className="mt-5 font-poppins text-[26px] font-semibold leading-none text-[#9B7AFF]">{card.duration}</p>

              <div className="mt-8">
                <p className="font-roboto-mono text-[12px] uppercase tracking-[0.02em] text-[#888888]">{card.includes_label}</p>
                <ul className="mt-3 space-y-3">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 font-poppins text-[13px] leading-none text-[#EEEEEE]">
                      <span className="flex size-[14px] shrink-0 items-center justify-center rounded-full bg-[#38D6B7] text-[#13201D]">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="mt-auto inline-flex h-[36px] w-full items-center justify-center border border-[#B8B8B8]/85 bg-white/[0.03] font-roboto-mono text-[14px] uppercase tracking-[0.02em] text-[#E7E7E7]">
                {card.cta}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:hidden">
          {iaPlans.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-lg border p-5 text-left transition-colors ${activeIndex === index
                  ? 'border-[#54C6AA] bg-[#15171D] text-white'
                  : 'border-white/10 bg-[#0E1015] text-white/75'
                }`}
            >
              <p className="font-roboto-mono text-[10px] uppercase tracking-[0.2em] text-[#54C6AA]">{plan.mission}</p>
              <h3 className="mt-2 font-poppins text-2xl">{plan.title}</h3>
              <p className="mt-3 font-poppins text-xl font-semibold text-[#9B7AFF]">{plan.duration}</p>
              <ul className="mt-5 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 font-poppins text-sm">
                    <span className="flex size-[14px] shrink-0 items-center justify-center rounded-full bg-[#38D6B7] text-[#13201D]">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex h-10 w-full items-center justify-center border border-white/60 font-roboto-mono text-sm uppercase">
                {plan.cta}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
