'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import RemoteAssetImage from './RemoteAssetImage';
import { iaAcademyAssets, iaAcademyHero } from './iaAcademyData';

export default function IaAcademyHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[12%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(84,198,170,0.2)_0%,rgba(84,198,170,0)_72%)]" />
      </div>

      <div className="container relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1302px] grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.65 }}
          className="max-w-[620px]"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/5 p-2">
              <RemoteAssetImage
                src={iaAcademyAssets.logo}
                fallbackSrc={iaAcademyAssets.fallbackLogo}
                alt="IA Academy"
                className="size-full object-contain"
              />
            </div>
            <span className="font-roboto-mono text-xs uppercase tracking-[0.28em] text-[#54C6AA]">
              {iaAcademyHero.eyebrow}
            </span>
          </div>

          <h1 className="font-poppins text-[40px] font-semibold leading-[1.08] text-[#E9E9E9] sm:text-[52px] lg:text-[64px]">
            {iaAcademyHero.heading}
            <span className="mt-2 block italic text-[#54C6AA]">{iaAcademyHero.highlight}</span>
          </h1>

          <p className="mt-8 max-w-[580px] font-poppins text-lg leading-[1.55] text-[#CFCFCF] lg:text-[22px]">
            {iaAcademyHero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#ia-services-preview"
              className="inline-flex min-h-[50px] items-center justify-center rounded-[4px] bg-[#5E39DA] px-6 font-roboto-mono text-base text-[#E9E9E9] transition-colors hover:bg-[#6D4AE0]"
            >
              {iaAcademyHero.primaryCta}
            </a>
            <a
              href="#ia-plans"
              className="inline-flex min-h-[50px] items-center justify-center rounded-[4px] border border-white/30 bg-white/5 px-6 font-roboto-mono text-base text-[#E9E9E9] transition-colors hover:bg-white/10"
            >
              {iaAcademyHero.secondaryCta}
            </a>
          </div>

          <Link
            href={iaAcademyHero.nextMasterclass.href}
            className="group mt-12 block max-w-[560px] rounded-xl border border-[#54C6AA]/35 bg-[#0B0D14]/90 p-5 transition-all hover:border-[#54C6AA] hover:shadow-[0_0_30px_rgba(84,198,170,0.18)]"
            id="ia-services-preview"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-roboto-mono text-[11px] uppercase tracking-[0.24em] text-[#54C6AA]">
                  {iaAcademyHero.nextMasterclass.title}
                </p>
                <h2 className="mt-2 font-poppins text-xl font-medium text-white">
                  {iaAcademyHero.nextMasterclass.topic}
                </h2>
                <p className="mt-3 flex items-center gap-2 font-roboto-mono text-xs uppercase tracking-[0.18em] text-white/70">
                  <CalendarDays size={14} />
                  {iaAcademyHero.nextMasterclass.date}
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-[#54C6AA] transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative mx-auto w-full max-w-[640px]"
        >
          <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(94,57,218,0.28)_0%,rgba(84,198,170,0.06)_52%,transparent_78%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/45 p-6 backdrop-blur-xl">
            <RemoteAssetImage
              src={iaAcademyAssets.heroRobot}
              fallbackSrc={iaAcademyAssets.fallbackHero}
              alt="Representación IA Academy"
              className="h-[440px] w-full object-contain lg:h-[540px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
