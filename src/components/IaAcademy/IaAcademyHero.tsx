'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import RemoteAssetImage from './RemoteAssetImage';
import { iaAcademyAssets, iaAcademyHero } from './iaAcademyData';

export default function IaAcademyHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-28 lg:px-12 lg:pb-8 lg:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[14%] top-[16%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(84,176,255,0.28)_0%,rgba(84,176,255,0.08)_36%,transparent_72%)]" />
      </div>

      <div className="container relative z-10 mx-auto grid min-h-[610px] max-w-[1144px] grid-cols-1 items-start gap-14 lg:grid-cols-[520px_568px] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-[560px] pt-20"
        >
          <h1 className="whitespace-pre-line font-poppins text-[42px] font-semibold leading-[1.1] text-[#E9E9E9] sm:text-[50px] lg:text-[40px]">
            {iaAcademyHero.heading}
            <span className="italic text-[#8871E3]">{iaAcademyHero.highlight}</span>
            {' '}
            {iaAcademyHero.heading2}
          </h1>

          <p className="mt-9 max-w-[560px] font-poppins font-thin text-[20px] leading-[1.5] text-[#D1D1D1]/90">
            {iaAcademyHero.quote}
          </p>
          <p className="mt-8 font-poppins font-thin text-[20px] leading-[1.5] text-[#BFBFBF]">
            {iaAcademyHero.quote_author}{' '}
            <span className="font-semibold text-[#8871E3]">
              {iaAcademyHero.quote_highlight}
            </span>
          </p>

          <div className="relative z-30 mt-8 flex flex-row gap-4 sm:flex-row lg:-mt-3 py-8">
            <button className="h-[52px] w-[172px] bg-[#5E39DA] font-roboto-mono text-[16px] font-light text-[#E9E9E9] transition-colors hover:bg-[#7446F2]">
              {iaAcademyHero.hero_primary_cta}
            </button>
            <button className="h-[52px] w-[230px] border border-[#A6A6A6] bg-[#45454580] font-roboto-mono text-[16px] font-normal text-[#E8E8E8] transition-colors hover:border-[#C7C7C7] hover:bg-[#2A2A2A]">
              {iaAcademyHero.hero_secondary_cta}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative mx-auto w-full max-w-[620px] lg:pt-8"
        >
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(93,173,255,0.5)_0%,rgba(53,120,255,0.14)_45%,transparent_72%)] blur-2xl" />

          <div className="relative mx-auto w-full max-w-[568px]">
            <RemoteAssetImage
              src={iaAcademyAssets.hero_robot}
              alt={iaAcademyHero.hero_image_alt}
              className="h-[330px] w-full origin-center scale-[1.85] object-contain sm:h-[360px] sm:scale-[1.85] lg:h-[360px] lg:scale-[1.85] lg:translate-y-[50px]"
            />

            <Link
              href={iaAcademyHero.next_masterclass.href}
              className="group relative mt-0 block rounded-[12px] border border-[#2B2B2B] border-b-[#22C7BA] bg-[#1F1F1F] px-6 pb-4 pt-5 shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition-colors hover:bg-[#242424]"
              id="ia-services-preview"
              aria-label={iaAcademyHero.next_masterclass.action_aria_label}
            >
              <div className="absolute -top-10 left-0 inline-flex h-7 items-center gap-2 rounded-full border border-[#00D4C3]/65 bg-[rgba(0,20,28,0.32)] px-3.5 pb-[1px] font-roboto-mono text-[14px] tracking-[0.05em] text-[#3FE8DC] shadow-[inset_0_0_12px_rgba(0,212,195,0.16),0_0_12px_rgba(0,212,195,0.2)] backdrop-blur-[2px]">
                <motion.span
                  aria-hidden
                  className="size-[7px] rounded-full bg-[#1FE6D5] shadow-[0_0_6px_rgba(31,230,213,0.85)]"
                  animate={{ scale: [0.5, 1.2, 1], opacity: [0.9, 0.98, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                />
                {iaAcademyHero.masterclass_badge}
              </div>

              <h2 className="font-poppins text-[18px] leading-[1.35] text-[#EFEFEF] sm:text-[19px] lg:whitespace-nowrap lg:text-[17px]">
                {iaAcademyHero.next_masterclass.title}
              </h2>

              <div className="mt-3 flex items-end gap-6 pr-8 sm:gap-7 sm:pr-10">
                <div className="min-w-[72px] sm:min-w-[78px]">
                  <p className="font-poppins text-[38px] leading-[0.95] text-[#EDEDED] sm:text-[40px] lg:text-[32px] text-center pb-2">
                    {iaAcademyHero.next_masterclass.day}
                  </p>
                  <p className="mt-1 font-poppins text-[20px] leading-none text-[#DCDCDC] sm:text-[22px] lg:text-[16px]">
                    {iaAcademyHero.next_masterclass.month_year}
                  </p>
                </div>

                <div className="pb-1">
                  <p className="font-poppins text-[18px] text-[#EFEFEF] sm:text-[20px] lg:text-[12px]">
                    {iaAcademyHero.next_masterclass.speaker}
                  </p>
                  <p className="mt-1 font-poppins text-[16px] text-[#8B72E6] sm:text-[18px] lg:text-[12px]">
                    {iaAcademyHero.next_masterclass.role}
                  </p>
                  <p className="mt-1 font-poppins text-[20px] text-[#E2E2E2] sm:text-[22px] lg:text-[13px]">
                    {iaAcademyHero.next_masterclass.time}
                  </p>
                </div>
              </div>

              <ChevronRight className="absolute right-4 top-1/2 size-8 -translate-y-1/2 text-[#F2F2F2] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
