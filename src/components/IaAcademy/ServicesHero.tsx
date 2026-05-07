'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import RemoteAssetImage from './RemoteAssetImage';
import { iaAcademyAssets, servicesHero } from './iaAcademyData';

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-32 pt-32 lg:px-12 lg:pb-40 lg:pt-36">
      <div className="container relative mx-auto max-w-[1260px]">
        <Link
          href={servicesHero.back_href}
          className="absolute left-0 top-0 inline-flex items-center gap-3 font-roboto-mono text-[16px] font-normal text-[#E8E8E8] transition-colors hover:text-white"
        >
          <ArrowLeft size={18} strokeWidth={1.7} />
          {servicesHero.back_button_label}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mx-auto grid max-w-[1060px] grid-cols-1 items-center gap-10 pt-14 lg:grid-cols-[1fr_1fr] lg:gap-16"
        >
          <div className="relative h-[340px] w-full sm:h-[400px] lg:h-[420px]">
            <div className="pointer-events-none absolute left-1/2 top-[46%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(93,220,220,0.24)_0%,rgba(54,148,171,0.12)_34%,transparent_70%)] blur-xl" />
            <RemoteAssetImage
              src={iaAcademyAssets.hero_time}
              alt={servicesHero.image_alt}
              className="relative z-10 mx-auto h-full w-full object-contain object-bottom mix-blend-screen"
            />
            <div className="absolute left-1/2 top-[45%] z-20 -translate-x-1/2 -translate-y-1/2 font-roboto-mono text-[52px] font-bold leading-none tracking-[0.08em] text-white sm:text-[64px] lg:text-[70px]">
              {servicesHero.countdown}
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="font-poppins text-[24px] font-semibold leading-tight text-[#F4F4F4] sm:text-[28px] lg:text-[32px]">
              {servicesHero.title}
            </h1>
            <p className="mt-4 max-w-[440px] font-poppins text-[18px] font-normal leading-relaxed text-[#D9D9D9] sm:text-[20px]">
              {servicesHero.subtitle}
            </p>
            <button className="mt-7 h-[52px] w-[220px] rounded-[4px] bg-[#6637E8] font-roboto-mono text-[16px] font-normal text-white transition-colors hover:bg-[#7446F2]">
              {servicesHero.cta}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
