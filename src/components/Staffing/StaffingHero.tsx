'use client';

import { motion } from 'framer-motion';
import data from '@/data/es.json';

const { hero } = data.staffing_page;

export default function StaffingHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center">

      <div className="relative z-20 container mx-auto px-6 lg:px-16 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
        
        {/* Left: Texto */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 max-w-xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-roboto-mono text-[11px] uppercase tracking-[0.25em] text-[#54C6AA]"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-poppins text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.1] text-white">
            {hero.heading}{' '}
            <span className="italic text-[#937AE6] drop-shadow-[0_0_20px_rgba(147,122,230,0.3)]">
              {hero.highlight}
            </span>
          </h1>

          <p className="font-poppins text-base lg:text-lg text-[#A6A6A6] leading-relaxed max-w-md">
            {hero.description}
          </p>

          <motion.a
            href="#staffing-services"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center justify-center mt-4 px-6 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm font-roboto-mono text-sm text-[#E9E9E9] hover:bg-white/10 hover:border-white/30 transition-all duration-300 self-start"
          >
            {hero.cta}
          </motion.a>
        </motion.div>

        {/* Right: Imagen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          {hero.hero_image ? (
            <img
              src={hero.hero_image}
              alt="Staffing Hero"
              className="w-full max-w-[800px] h-auto object-contain drop-shadow-[0_0_60px_rgba(147,122,230,0.15)]"
            />
          ) : (
            /* Placeholder cuando no hay imagen */
            <div className="w-full max-w-[480px] aspect-[4/5] rounded-2xl bg-[#0d0d0d] border border-white/5 flex items-center justify-center">
              <div className="text-center opacity-25">
                <div className="w-24 h-24 rounded-full border-2 border-[#54C6AA] mx-auto mb-4 flex items-center justify-center">
                  <span className="font-roboto-mono text-[#54C6AA] text-xs tracking-widest">FOTO</span>
                </div>
                <p className="font-roboto-mono text-[10px] text-[#54C6AA] tracking-[0.3em]">SUBIR DESDE FIREBASE</p>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
