'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { evolvingTeams, iaEvolvingTeams } from './iaAcademyData';

export default function EvolvingTeamsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % evolvingTeams.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const current = evolvingTeams[active];

  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1320px] bg-gradient-to-r from-transparent via-[#2D4A50]/60 to-transparent" />
      <div className="container relative mx-auto max-w-[1302px]">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">
            {iaEvolvingTeams.eyebrow}
          </p>
          <h2 className="mt-4 font-poppins text-[40px] font-semibold leading-[1.1] text-[#E9E9E9] sm:text-[48px] lg:text-[58px]">
            {iaEvolvingTeams.heading}
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-[980px] rounded-[16px] border border-white/10 bg-[#171A20]/90 p-8 shadow-[0_18px_56px_rgba(0,0,0,0.45)] lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.author}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-poppins text-[20px] italic leading-[1.7] text-[#E9E9E9] lg:text-[30px]">
                "{current.quote}"
              </p>
              <div className="mt-10">
                <p className="font-poppins text-[20px] font-semibold tracking-wide text-white lg:text-[22px]">{current.author}</p>
                <p className="mt-1 font-roboto-mono text-xs uppercase tracking-[0.2em] text-[#54C6AA]">
                  {current.role} · {current.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            {evolvingTeams.map((item, index) => (
              <button
                key={item.author}
                type="button"
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === active ? 'w-10 bg-[#54C6AA]' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`${iaEvolvingTeams.item_aria_prefix} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
