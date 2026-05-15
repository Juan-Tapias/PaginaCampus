'use client';

import { motion } from 'framer-motion';
import data from '@/data/es.json';

export default function IaExpertImplementationSection() {
  const { expert_implementation } = data.ia_academy.landing;

  return (
    <section className="relative z-20 py-16 lg:py-24 w-full flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-[1144px] flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-poppins text-[26px] md:text-[32px] lg:text-[36px] font-medium text-white mb-6"
        >
          {expert_implementation.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-poppins  text-[16px] lg:text-[18px] leading-[1.6] text-[#A6A6A6] max-w-[800px] mb-10"
        >
          {expert_implementation.subtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="h-[52px] px-8 bg-[#5E39DA] font-roboto-mono text-[15px] font-light text-white uppercase transition-colors hover:bg-[#7446F2] mb-16 lg:mb-20"
        >
          {expert_implementation.cta}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative w-full max-w-[1000px] mt-10"
        >
          <div className="absolute inset-0 flex items-end justify-center gap-1 md:gap-2 lg:gap-3 -z-10 h-full overflow-hidden pb-4 opacity-70">
            {[
              { h: '25%', c: '#333333' },
              { h: '40%', c: '#4B4B4B' },
              { h: '60%', c: '#3B82F6' },
              { h: '80%', c: '#3B82F6' },
              { h: '100%', c: '#3B82F6' },
              { h: '80%', c: '#3B82F6' },
              { h: '60%', c: '#3B82F6' },
              { h: '40%', c: '#4B4B4B' },
              { h: '25%', c: '#333333' },
            ].map((bar, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: bar.h }}
                transition={{ duration: 0.8, delay: 0.3 + (i * 0.05) }}
                className="w-2.5 md:w-5 lg:w-8"
                style={{
                  backgroundColor: bar.c,
                  boxShadow: bar.c === '#3B82F6' ? '0 0 15px rgba(59,130,246,0.3)' : 'none'
                }}
              />
            ))}
          </div>
          <div className='flex items-center justify-center w-full'>
            <img
              src={expert_implementation.image}
              alt="Team AI"
              className="relative z-10 w-full h-auto"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
