'use client';

import { motion } from 'framer-motion';
import { evolvingTeams, iaEvolvingTeams } from './iaAcademyData';

export default function EvolvingTeamsSection() {
  const carouselItems = [...evolvingTeams, ...evolvingTeams];

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:px-12 lg:pb-24 lg:pt-20">
      <div className="container relative mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[920px]">
          <h2 className="font-poppins text-[32px] font-semibold leading-[1.08] text-[#EDEDED] sm:text-[34px] lg:text-[42px]">
            {iaEvolvingTeams.heading}
          </h2>
          <p className="mt-4 font-poppins text-[17px] font-normal leading-[1.32] text-[#EFEFEF] sm:text-[18px] lg:text-[22px]">
            {iaEvolvingTeams.subtitle}
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent" />
          <motion.div
            className="flex w-max gap-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 72, ease: 'linear', repeat: Infinity }}
          >
            {carouselItems.map((item, index) => (
              <article
                key={`${item.author}-${index}`}
                className="w-[296px] shrink-0 border-r border-white/35 px-6 py-6 lg:w-[320px]"
                aria-label={`${iaEvolvingTeams.item_aria_prefix} ${index + 1}`}
              >
                <h3 className="font-poppins text-[15px] font-medium leading-[1.24] text-[#F2F2F2] lg:text-[14px]">
                  {item.author}
                </h3>
                <p className="mt-2 font-roboto-mono text-[13px] font-normal leading-[1.22] text-[#B9AFE8] lg:text-[13px]">
                  {item.role}
                  {item.company ? ` en ${item.company}` : ''}
                </p>
                <p className="mt-3.5 font-poppins text-[13px] font-normal leading-[1.45] text-[#F2F2F2] lg:text-[13px]">
                  {item.quote}
                </p>
                <p className="mt-7 font-roboto-mono text-[13px] font-normal leading-none text-[#DADADA] lg:text-[13px]">
                  {item.time_ago}
                </p>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#A2A2A2]/20 to-transparent" />
      </div>
    </section>
  );
}
