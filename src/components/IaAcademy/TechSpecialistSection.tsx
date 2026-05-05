'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import RemoteAssetImage from './RemoteAssetImage';
import { iaAcademyAssets, iaTechSpecialist, specialistItems } from './iaAcademyData';

export default function TechSpecialistSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1320px] bg-gradient-to-r from-transparent via-[#2D4A50]/60 to-transparent" />
      <div className="container relative mx-auto grid max-w-[1302px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">
            {iaTechSpecialist.eyebrow}
          </p>
          <h2 className="mt-4 font-poppins text-[40px] font-semibold leading-[1.1] text-[#E9E9E9] sm:text-[48px] lg:text-[58px]">
            {iaTechSpecialist.heading}
          </h2>
          <div className="mt-10 grid gap-4">
            {specialistItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-[10px] border border-white/10 bg-[#171A20]/88 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.38)]"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#54C6AA]" size={18} />
                <p className="font-poppins text-[16px] leading-relaxed text-[#D9D9D9] lg:text-[18px]">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_center,rgba(88,160,255,0.26)_0%,transparent_74%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0B0D13]/86 p-5">
            <RemoteAssetImage
              src={iaAcademyAssets.hero_crossed}
              alt={iaTechSpecialist.image_alt}
              className="h-[420px] w-full object-contain lg:h-[470px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
