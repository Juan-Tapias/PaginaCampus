'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@/data/es.json';

export default function IaMethodSection() {
  const { method } = data.ia_academy.landing;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative z-20 py-20 lg:py-32 bg-black w-full overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start "
          >
            <h2 className="font-poppins text-[32px] lg:text-[42px] font-medium text-white mb-6 leading-tight">
              {method.title}
            </h2>
            <p className="font-poppins font-light text-[17px] lg:text-[19px] text-[#A6A6A6] max-w-[480px] mb-12 leading-relaxed">
              {method.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="h-[56px] px-10 bg-[#5E39DA] hover:bg-[#7446F2] transition-colors text-white font-mono text-[16px] flex items-center justify-center">
                {method.primary_cta}
              </button>
              <button className="h-[56px] px-10 border border-[#A6A6A6] hover:bg-white/5 transition-colors text-white font-mono text-[16px] flex items-center justify-center">
                {method.secondary_cta}
              </button>
            </div>
          </motion.div>

          <div 
            className="relative flex flex-col items-start"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex flex-row justify-between w-full mb-16 lg:mb-20">
              {method.pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                >
                  <div className="w-[85px] h-[85px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] rounded-full border border-[#3B82F6] group-hover:border-[#22C55E] flex items-center justify-center transition-colors duration-500 relative">
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle,rgba(34,197,94,0.15)_0%,transparent_70%)] transition-opacity duration-500" />
                    <span className="font-poppins text-[16px] md:text-[18px] lg:text-[22px] font-light text-[#E8E8E8] group-hover:text-white transition-colors">
                      {pillar.label}
                    </span>
                  </div>
                  <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle,rgba(34,197,94,0.2)_0%,transparent_70%)] transition-colors duration-500 -z-10" />
                </motion.div>
              ))}
            </div>

            <div className="min-h-[140px] w-full">
              <h3 className="font-poppins text-[18px] lg:text-[20px] font-medium text-white mb-8">
                {method.benefits_heading}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 w-full justify-center">
                {method.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col p-4 "
                  >
                    <li className="font-poppins font-light text-[12px] w-[130px] lg:text-[13px] text-[#A6A6A6] leading-[1.5]">
                      {benefit}
                    </li>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
