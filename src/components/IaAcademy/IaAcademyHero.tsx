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
          className="max-w-[560px] pt-10"
        >
          <h1 className="whitespace-pre-line font-poppins text-[42px] font-semibold leading-[1.1] text-[#E9E9E9] sm:text-[50px] lg:text-[40px]">
            {iaAcademyHero.heading}
            {' '}
            <span className="italic text-[#8871E3]">{iaAcademyHero.highlight}</span>
          </h1>

          <p className="mt-9 max-w-[560px] font-poppins text-[22px] italic leading-[1.42] text-[#D1D1D1]/90 lg:text-[21px]">
            {iaAcademyHero.quote}
          </p>
          <p className="mt-8 font-poppins text-[28px] italic leading-none text-[#BFBFBF] lg:text-[22px]">
            {iaAcademyHero.quote_author}
          </p>

          <div className="mt-10 max-w-[260px]">
            <RemoteAssetImage
              src={iaAcademyAssets.logo}
              fallbackSrc={iaAcademyAssets.fallback_logo}
              alt={iaAcademyHero.logo_alt}
              className="h-auto w-full object-contain"
            />
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
              fallbackSrc={iaAcademyAssets.fallback_hero}
              alt={iaAcademyHero.hero_image_alt}
              className="h-[330px] w-full object-contain sm:h-[360px] lg:h-[360px]"
            />

            <Link
              href={iaAcademyHero.next_masterclass.href}
              className="group relative mt-0 block rounded-[14px] border border-white/10 bg-[#222327]/94 px-6 pb-4 pt-5 shadow-[0_16px_36px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#292A2F]"
              id="ia-services-preview"
              aria-label={iaAcademyHero.next_masterclass.action_aria_label}
            >
              <div className="absolute -top-10 left-0 inline-flex h-9 items-center gap-2 rounded-full border border-[#00D4C3]/50 bg-[#07282A]/90 px-4 font-roboto-mono text-xs tracking-[0.08em] text-[#48E4D6]">
                <span className="size-2 rounded-full bg-[#1FE6D5]" />
                {iaAcademyHero.masterclass_badge}
              </div>

              <h2 className="font-poppins text-[19px] leading-[1.35] text-[#E9E9E9] sm:text-[20px] lg:whitespace-nowrap lg:text-[16px]">
                {iaAcademyHero.next_masterclass.title}
              </h2>

              <div className="mt-3 flex items-end gap-6 pr-8 sm:gap-7 sm:pr-10">
                <div className="min-w-[72px] sm:min-w-[78px]">
                  <p className="font-poppins text-[38px] leading-[0.95] text-white sm:text-[40px] lg:text-[32px]">
                    {iaAcademyHero.next_masterclass.day}
                  </p>
                  <p className="mt-1 font-poppins text-[20px] leading-none text-white/80 sm:text-[22px] lg:text-[16px]">
                    {iaAcademyHero.next_masterclass.month_year}
                  </p>
                </div>

                <div className="pb-1">
                  <p className="font-poppins text-[18px] text-white sm:text-[20px] lg:text-[12px]">
                    {iaAcademyHero.next_masterclass.speaker}
                  </p>
                  <p className="mt-1 font-poppins text-[16px] text-[#8B72E6] sm:text-[18px] lg:text-[12px]">
                    {iaAcademyHero.next_masterclass.role}
                  </p>
                  <p className="mt-1 font-poppins text-[20px] text-white/90 sm:text-[22px] lg:text-[13px]">
                    {iaAcademyHero.next_masterclass.time}
                  </p>
                </div>
              </div>

              <ChevronRight className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-white/85 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-[14px] bg-gradient-to-r from-transparent via-[#2DD5C8] to-transparent opacity-80" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
