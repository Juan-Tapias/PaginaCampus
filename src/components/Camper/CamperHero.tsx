'use client';

import { motion } from 'framer-motion';
import OrbitGlobe3D from '../shared/OrbitGlobe3D';
import data from '@/data/es.json';

export default function CamperHero() {
  const { hero } = data.se_un_camper;

  return (
    <section id="sé-un-camper" className="relative w-full flex items-center min-h-[100vh] lg:h-screen overflow-hidden bg-transparent pt-32 pb-20 lg:pt-0 lg:pb-0">
      
      <div className="container relative z-40 mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-0 h-full">
        
        <div className="w-full lg:w-[45%] h-[400px] sm:h-[500px] lg:h-full flex justify-center items-center relative">
          <OrbitGlobe3D />
        </div>

        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-poppins text-4xl sm:text-5xl md:text-[56px] font-semibold tracking-tight mb-6 leading-[1.2] text-white"
          >
            {hero.heading_line1}
            <br className="hidden sm:block" />
            <span className="text-[#3BC4A5] italic text-[56px] font-semibold">
              {hero.heading_highlight}
            </span>
            <span className="text-white"> y</span>
            <br className="hidden sm:block" />
            <span className="text-white">{hero.heading_line2.replace(' y ', '')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-poppins text-gray-300 text-regular text-[20px] md:text-lg max-w-xl mb-10 leading-relaxed font-light"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button className="bg-[#6637E8] text-white w-full sm:w-auto px-8 h-[50px] rounded-[4px] font-roboto-mono text-[15px] hover:bg-[#7446F2] transition-colors shadow-[0_0_20px_rgba(102,55,232,0.3)]">
              {hero.primary_cta}
            </button>
            <button className="bg-transparent border border-gray-500 text-gray-300 w-full sm:w-auto px-6 h-[50px] rounded-[4px] font-roboto-mono text-[15px] hover:border-gray-300 hover:text-white transition-colors flex items-center justify-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"/>
                <path d="M9 8h1"/>
                <path d="M9 12h1"/>
                <path d="M9 16h1"/>
                <path d="M14 8h1"/>
                <path d="M14 12h1"/>
                <path d="M14 16h1"/>
                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
              </svg>
              {hero.secondary_cta}
            </button>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
