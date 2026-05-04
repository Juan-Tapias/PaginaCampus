'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import RemoteAssetImage from './RemoteAssetImage';
import { iaAcademyAssets, iaTechSpecialist, specialistItems } from './iaAcademyData';

export default function TechSpecialistSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32">
      <div className="container relative mx-auto grid max-w-[1302px] grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">
            {iaTechSpecialist.eyebrow}
          </p>
          <h2 className="mt-4 font-poppins text-[34px] font-semibold leading-[1.15] text-[#E9E9E9] sm:text-[44px] lg:text-[56px]">
            {iaTechSpecialist.heading}
          </h2>
          <div className="mt-10 grid gap-4">
            {specialistItems.map((item) => (
              <div key={item} className="flex items-start gap-4 rounded-[8px] border border-white/10 bg-[#0B0D13] p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#54C6AA]" size={18} />
                <p className="font-poppins text-base leading-relaxed text-[#D9D9D9]">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto w-full max-w-[540px]"
        >
          <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(circle_at_center,rgba(84,198,170,0.25)_0%,transparent_72%)] blur-3xl" />
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40 p-5">
            <RemoteAssetImage
              src={iaAcademyAssets.hero_crossed}
              fallbackSrc={iaAcademyAssets.fallback_crossed}
              alt={iaTechSpecialist.image_alt}
              className="h-[420px] w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
