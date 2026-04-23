'use client';

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Users, Briefcase, AppWindow } from 'lucide-react';

function Counter({ from = 0, to, duration = 2.5, prefix = "", suffix = "", decimals = 0 }: { from?: number, to: number, duration?: number, prefix?: string, suffix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (inView && node) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (decimals > 0) {
            node.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
          } else {
            node.textContent = `${prefix}${Math.floor(value).toLocaleString('en-US')}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, duration, prefix, suffix, decimals]);

  const initialValue = decimals > 0 ? from.toFixed(decimals) : from.toLocaleString('en-US');
  return <span ref={nodeRef}>{prefix}{initialValue}{suffix}</span>;
}

export default function KPISection() {
  const marqueeText = "RECLUTANDO_NODO_BOGOTA... PROCESANDO_TALENTO_CALI... BÚSQUEDA_TALENTO_MEDELLÍN... DEPLOYING_TALENT_LATAM... ";
  
  return (
    <section className="relative w-full bg-[#000000] z-40 py-12 md:py-24 border-y border-white/5 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none border-b border-white/5 py-1">
        <motion.div 
          animate={{ x: ["0%", "-10%"] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="inline-block"
        >
          <span className="text-gray-200 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mr-4">
            {marqueeText.repeat(10)}
          </span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10 w-full pt-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-white/5 border-white/5">
          
          <div className="flex items-center justify-between md:justify-center gap-6 px-6 py-8 md:py-4">
            <div className="flex flex-col text-left md:text-center md:items-center w-40">
              <span className="text-white font-roboto-mono text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                <Counter to={1500} prefix="+" />
              </span>
              <span className="text-[#3ed896] font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
                CAMPERS_GRADUADOS
              </span>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
              <Users size={24} strokeWidth={1.5} />
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-center gap-6 px-6 py-8 md:py-4">
            <div className="flex flex-col text-left md:text-center md:items-center w-40">
              <span className="font-roboto-mono text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-white">
                <Counter to={98.4} decimals={1} suffix="%" />
              </span>
              <span className="text-[#3ed896] font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">
                MATCH_LABORAL
              </span>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shadow-lg">
              <Briefcase size={24} strokeWidth={1.5} />
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-center gap-6 px-6 py-8 md:py-4">
            <div className="flex flex-col text-left md:text-center md:items-center w-40">
              <span className="text-white font-roboto-mono text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                <Counter to={60} suffix="+" />
              </span>
              <span className="text-[#3ed896] font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
                EMPRESAS_TECH
              </span>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shadow-lg">
              <AppWindow size={24} strokeWidth={1.5} />
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none border-t border-white/5 py-1">
        <motion.div 
          animate={{ x: ["-10%", "0%"] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="inline-block"
        >
          <span className="text-gray-200 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mr-4">
            {marqueeText.repeat(10)}
          </span>
        </motion.div>
      </div>

    </section>
  );
}
