'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import RemoteAssetImage from './RemoteAssetImage';
import { iaAcademyAssets, servicesHero } from './iaAcademyData';

const MOCK_DEADLINE = new Date(servicesHero.countdown_target_iso).getTime();

function formatCountdown(ms: number) {
  if (ms <= 0) return '00:00:00';

  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  const pad = (value: number) => value.toString().padStart(2, '0');

  if (days > 0) return `${pad(days)}D ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function ServicesHero() {
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    const updateRemaining = () => {
      setRemainingMs(MOCK_DEADLINE - Date.now());
    };

    updateRemaining();

    const timer = setInterval(() => {
      updateRemaining();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => formatCountdown(remainingMs), [remainingMs]);

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[16%] top-[18%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(84,198,170,0.18)_0%,rgba(84,198,170,0.04)_44%,transparent_76%)]" />
      </div>
      <div className="container relative mx-auto grid max-w-[1302px] grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[600px]"
        >
          <Link
            href={servicesHero.back_href}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 font-roboto-mono text-[11px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-white/10"
          >
            <ArrowLeft size={14} />
            {servicesHero.back_button_label}
          </Link>

          <h1 className="mt-8 font-poppins text-[38px] font-semibold leading-[1.1] text-[#E9E9E9] sm:text-[50px] lg:text-[58px]">
            {servicesHero.title}
          </h1>
          <p className="mt-6 max-w-[540px] font-poppins text-[18px] leading-[1.6] text-white/80 lg:text-[22px]">
            {servicesHero.subtitle}
          </p>

          <div className="relative mt-10 max-w-[520px] rounded-[16px] border border-white/10 bg-[#1A1C22]/95 p-6 shadow-[0_16px_42px_rgba(0,0,0,0.45)]">
            <p className="font-roboto-mono text-[11px] uppercase tracking-[0.2em] text-[#54C6AA]">{servicesHero.date_label}</p>
            <p className="mt-2 font-poppins text-xl text-white">{servicesHero.date}</p>
            <p className="mt-4 font-roboto-mono text-[34px] font-bold tracking-[0.14em] text-white">{countdown}</p>
            <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-[16px] bg-gradient-to-r from-transparent via-[#2DD5C8] to-transparent opacity-80" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_center,rgba(89,161,255,0.3)_0%,transparent_72%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/45 p-5">
            <RemoteAssetImage
              src={iaAcademyAssets.hero_time}
              alt={servicesHero.image_alt}
              className="h-[430px] w-full object-contain lg:h-[520px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
