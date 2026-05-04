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

  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  const pad = (value: number) => value.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function ServicesHero() {
  const [remainingMs, setRemainingMs] = useState(MOCK_DEADLINE - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingMs(MOCK_DEADLINE - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => formatCountdown(remainingMs), [remainingMs]);

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
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

          <h1 className="mt-8 font-poppins text-[38px] font-semibold leading-[1.1] text-[#E9E9E9] sm:text-[52px] lg:text-[60px]">
            {servicesHero.title}
          </h1>
          <p className="mt-6 font-poppins text-lg leading-[1.6] text-white/80 lg:text-[22px]">{servicesHero.subtitle}</p>

          <div className="mt-10 rounded-xl border border-[#54C6AA]/35 bg-[#0B0D14] p-6">
            <p className="font-roboto-mono text-[11px] uppercase tracking-[0.2em] text-[#54C6AA]">{servicesHero.date_label}</p>
            <p className="mt-2 font-poppins text-xl text-white">{servicesHero.date}</p>
            <p className="mt-4 font-roboto-mono text-3xl font-bold tracking-[0.14em] text-white">{countdown}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_center,rgba(84,198,170,0.22)_0%,transparent_70%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/40 p-5">
            <RemoteAssetImage
              src={iaAcademyAssets.hero_time}
              fallbackSrc={iaAcademyAssets.fallback_time}
              alt={servicesHero.image_alt}
              className="h-[430px] w-full object-contain lg:h-[520px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
