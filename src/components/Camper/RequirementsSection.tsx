'use client';

import { motion } from 'framer-motion';
import TypewriterContent from '@/components/shared/TypewriterContent';
import data from '@/data/es.json';

const { requirements } = data.se_un_camper;

export default function RequirementsSection() {
  return (
    <section className="relative w-full py-8 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto min-h-[70vh] flex flex-col justify-center px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[28px] md:text-[32px] font-medium text-white text-center md:text-left"
          >
            {requirements.title}
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#5E39DA] text-white font-roboto-mono font-medium text-sm w-[152px] h-[52px] uppercase tracking-widest rounded-sm hover:bg-[#6D4AE0] transition-all shadow-[0_0_30px_rgba(94,57,218,0.3)]"
          >
            <a href={requirements.cta_link} target="_blank">
            {requirements.cta}
            </a>
          </motion.button>
        </div>

        {/* Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto bg-[#000000] border-white/10 rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="bg-[#1A1A1A] px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5E39DA]" />
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <div className="w-3 h-3 rounded-full bg-[#3BC4A5]" />
            </div>
            <div className="text-white/40 font-mono text-[10px] md:text-xs uppercase tracking-widest">
              {requirements.terminal.header}
            </div>
            <div className="w-12" /> 
          </div>

          {/* Terminal Content */}
          <div className="bg-[#070707] p-6 min-h-[352px] max-w-[980px] w-full flex flex-col">
            <TypewriterContent 
              lines={requirements.terminal.lines} 
              align="left" 
              scrolling={false}
              loop={true}
              loopDelay={15000}
              className="h-auto text-sm md:text-lg"
            />

            {/* Status Line */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5 }}
              className='mt-auto'
            >
              <span className="font-mono text-gray-500 text-sm md:text-base">
                {requirements.terminal.status_label}
              </span>
              <span className="bg-[#3BC4A5]/10 text-[#3BC4A5] px-4 py-1.5 font-mono text-[12px] md:text-sm border border-[#3BC4A5]/20 rounded tracking-wider">
                {requirements.terminal.status_value}
              </span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
