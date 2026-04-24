'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import StarField from '@/components/shared/StarField';
import { partnersPage } from './partnersData';
import PartnersSpaceshipCanvas from './PartnersSpaceshipCanvas';

const { hero, assets } = partnersPage;

export default function PartnersHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-28 lg:min-h-[696px] lg:pt-0">
      <Navbar />
      <StarField />

      <div className="container relative z-20 mx-auto grid min-h-[calc(100vh-7rem)] grid-cols-1 items-center gap-8 px-6 pb-16 lg:min-h-[696px] lg:grid-cols-[0.82fr_1.18fr] lg:px-12 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 max-w-[535px] text-center lg:mt-20 lg:text-left"
        >
          <h1 className="font-poppins text-[40px] font-semibold leading-[1.14] tracking-normal text-[#E9E9E9] sm:text-5xl lg:text-[48px]">
            {hero.heading}{' '}
            <span className="block italic text-[#54C6AA] drop-shadow-[0_0_18px_rgba(84,198,170,0.24)]">
              {hero.highlight}
            </span>
          </h1>

          <p className="mt-7 max-w-[535px] font-poppins text-base leading-[1.5] text-[#CFCFCF] sm:text-lg lg:text-[20px]">
            {hero.subheading}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#partners-contact"
              className="flex min-h-[52px] items-center justify-center rounded-[4px] bg-[#5E39DA] px-6 font-roboto-mono text-base leading-[1.5] text-[#E9E9E9] shadow-[0_0_34px_rgba(94,57,218,0.28)] transition-colors hover:bg-[#6D4AE0]"
            >
              {hero.primary_cta}
            </a>
            <a
              href="#connection-cycle"
              className="flex min-h-[52px] items-center justify-center rounded-[4px] border border-[#A6A6A6]/70 bg-[#454545]/50 px-6 font-roboto-mono text-base leading-[1.5] text-[#E9E9E9] backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {hero.secondary_cta}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 36 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 min-h-[390px] lg:min-h-[570px]"
        >
          <PartnersSpaceshipCanvas
            modelUrl={assets.spaceship}
            className="absolute left-1/2 top-0 h-[300px] w-[112vw] -translate-x-1/2 sm:h-[360px] lg:left-[52%] lg:h-[390px] lg:w-[760px]"
          />

          <div className="absolute bottom-7 left-1/2 flex w-full max-w-[520px] -translate-x-1/2 flex-col items-center lg:bottom-[72px]">
            <div className="grid w-full grid-cols-4 gap-3 sm:gap-4">
              {assets.campers.map((camper, index) => (
                <motion.div
                  key={camper}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.5 + index * 0.08 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative flex size-[74px] items-center justify-center rounded-full border border-[#56B4FF] bg-black shadow-[0_0_26px_rgba(86,180,255,0.35)] sm:size-[88px] lg:size-[94px]">
                    <div className="absolute inset-[-9px] rounded-full border border-[#54C6AA]/20" />
                    <img
                      src={camper}
                      alt={`${hero.talent_label} ${index + 1}`}
                      className="size-[66px] rounded-full object-cover sm:size-[78px] lg:size-[84px]"
                    />
                  </div>
                  <span className="mt-3 whitespace-nowrap font-roboto-mono text-[10px] uppercase leading-[1.5] text-[#56B4FF] sm:text-xs">
                    {hero.talent_label}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="mt-3 text-center font-poppins text-sm leading-[1.5] text-[#E9E9E9] sm:text-base">
              {hero.metric}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
