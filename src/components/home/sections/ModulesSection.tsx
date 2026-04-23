'use client';

import { motion } from "framer-motion";
import data from "../../../data/es.json";

export default function ModulesSection() {
  return (
    <section className="relative w-full min-h-screen z-40 flex items-center justify-center py-24 select-none">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-[#54C6AA] font-roboto-mono text-sm tracking-[0.2em] mb-4 uppercase">{data.mission_control.subheading}</h3>
            <h2 className="text-white font-poppins text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              {data.mission_control.heading}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:max-w-xs mt-8 md:mt-0 text-right"
          >
            <p className="text-gray-400 font-poppins text-sm md:text-base leading-relaxed hidden md:block">
              {data.mission_control.description}
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-end w-full lg:w-[90%] ml-auto">
          {data.mission_control.cards.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "backOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex-1 rounded-[1.5rem] p-8 md:p-10 border border-white/10 backdrop-blur-xl ${
                i === 1 
                  ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-[0_0_40px_rgba(255,255,255,0.05)] translate-y-0 lg:-translate-y-8' 
                  : 'bg-[#18181A]/80'
              }`}
            >
              <h3 className="text-white font-poppins text-2xl font-semibold mb-6">{mod.title}</h3>
              <div className="w-full h-[1px] bg-gradient-to-r from-[#1781b5] to-[#54C6AA] mb-6 opacity-60"></div>
              <p className="text-gray-400 font-poppins leading-relaxed text-sm md:text-base mb-10 min-h-[80px]">
                {mod.description}
              </p>
              <button className="text-[#1781b5] font-roboto-mono text-xs font-bold tracking-[0.2em] hover:text-[#54C6AA] transition-colors flex items-center gap-2 group">
                {mod.link}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
