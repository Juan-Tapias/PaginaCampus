'use client';

import { motion } from 'framer-motion';
import data from '@/data/es.json';

const AlertHexagonIcon = () => (
  <svg width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M22 2L40 12V36L22 46L4 36V12L22 2Z" 
      stroke="#FF6B6B" 
      strokeWidth="1.5" 
      fill="transparent"
      strokeLinejoin="round"
    />
    <path 
      d="M22 14V26" 
      stroke="#FF6B6B" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <circle cx="22" cy="34" r="2" fill="#FF6B6B"/>
  </svg>
);

export default function IaFrustrationSection() {
  const { frustration } = data.ia_academy.landing;

  return (
    <section className="relative z-20 py-16 lg:py-24 bg-transparent w-full">
      <div className="container mx-auto px-6 max-w-[1144px]">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-poppins text-[20px] md:text-[23px] lg:text-[23px] font-medium text-white mb-16 lg:mb-20 max-w-[1000px] mx-auto"
        >
          {frustration.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {frustration.cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#1C1C1C] flex flex-col items-center text-center justify-center p-8 lg:p-12 min-h-[260px] lg:min-h-[300px] hover:bg-[#222222] transition-colors"
            >
              <div className="mb-6 lg:mb-8">
                <AlertHexagonIcon />
              </div>
              <p className="font-poppins font-light text-[16px] lg:text-[18px] leading-[1.6] text-[#D1D1D1]">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 lg:mt-20 text-center flex flex-col items-center"
        >
          <p className="font-poppins font-light text-[14px] lg:text-[17px] text-[#E9E9E9] max-w-[860px] leading-[1.6] mb-10">
            {frustration.footer_text}
          </p>
          
          <button className="h-[52px] px-8 border border-[#A6A6A6] bg-white/5 font-roboto-mono text-[15px] tracking-wider font-light text-[#E9E9E9] uppercase transition-colors hover:border-[#C7C7C7] hover:bg-white/10">
            {frustration.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
