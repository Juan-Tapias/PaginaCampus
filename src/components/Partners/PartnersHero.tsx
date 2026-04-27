'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import StarField from '@/components/shared/StarField';
import { partnersPage } from './partnersData';
import LazySpaceshipCanvas from './LazySpaceshipCanvas';

const { hero, assets } = partnersPage;

export default function PartnersHero() {
  const [isHired, setIsHired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHired(prev => !prev);
    }, 6000); // 4s animation + 2s pause
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-28 lg:min-h-[696px] lg:pt-0">
      <StarField />

      <div className="container relative z-20 mx-auto grid min-h-[calc(100vh-7rem)] grid-cols-1 items-center gap-8 px-6 pb-16 lg:min-h-[696px] lg:grid-cols-[0.82fr_1.18fr] lg:px-12 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 max-w-[535px] text-center lg:mt-20 lg:text-left"
        >
          <h1 className="font-poppins text-[40px] font-semibold leading-[1.14] tracking-normal text-[#E9E9E9] sm:text-5xl lg:text-[48px]">
            {hero.heading}{' '}
            <span className="block italic text-[#54C6AA] drop-shadow-[0_0_18px_rgba(84,198,170,0.24)]">
              {hero.highlight}
            </span>
          </h1>

          <p className="mt-7 max-w-[535px] font-poppins text-base leading-[1.5] text-[#CFCFCF] sm:text-lg lg:text-[20px]">
            {hero.subheading}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#partners-contact"
              className="flex min-h-[52px] items-center justify-center rounded-[4px] bg-[#5E39DA] px-6 font-roboto-mono text-base leading-[1.5] text-[#E9E9E9] shadow-[0_0_34px_rgba(94,57,218,0.28)] transition-colors hover:bg-[#6D4AE0]"
            >
              {hero.primary_cta}
            </a>
            <a
              href="#connection-cycle"
              className="flex min-h-[52px] items-center justify-center rounded-[4px] border border-[#A6A6A6]/70 bg-[#454545]/50 px-6 font-roboto-mono text-base leading-[1.5] text-[#E9E9E9] backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {hero.secondary_cta}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 36 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 h-[390px] lg:h-[570px]"
        >
          <LazySpaceshipCanvas
            modelScale={0.4}
            modelRotation={[0.5, -0.5, 0]}
            modelPosition={[0, 1, 0]}
            className="absolute inset-0 h-full w-full"
          />

          <div className="absolute bottom-7 left-1/2 flex w-full max-w-[580px] -translate-x-1/2 flex-col items-center lg:bottom-[72px]">
            <div className="relative w-full p-4">
              {/* Ping-Pong Scanner Line */}
              <motion.div
                initial={false}
                animate={{ left: isHired ? '0%' : '100%' }}
                transition={{ 
                  duration: 4, 
                  ease: "easeInOut",
                }}
                className="absolute top-0 bottom-0 z-50 w-[2px] pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent, #54C6AA, transparent)',
                  boxShadow: '0 0 15px #54C6AA, 0 0 30px rgba(84,198,170,0.5)'
                }}
              />

              <div className="grid w-full grid-cols-4 gap-3 sm:gap-4">
                {assets.campers.map((camper, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.5 + index * 0.08 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`relative flex size-[74px] items-center justify-center rounded-full border transition-all duration-700 sm:size-[88px] lg:size-[94px] ${
                      isHired 
                        ? 'border-[#54C6AA] shadow-[0_0_26px_rgba(84,198,170,0.35)]' 
                        : 'border-[#56B4FF] shadow-[0_0_26px_rgba(86,180,255,0.35)]'
                    } bg-black`}>
                      <div className="absolute inset-[-9px] rounded-full border border-[#54C6AA]/10" />
                      
                      <motion.div
                        initial={false}
                        animate={{ rotateY: isHired ? 180 : 0 }}
                        transition={{ 
                          duration: 1.2, 
                          delay: isHired ? (3 - index) * 0.8 : index * 0.8,
                          ease: "easeInOut" 
                        }}
                        className="relative h-full w-full [transform-style:preserve-3d]"
                      >
                        <img
                          src={camper}
                          alt="Talento"
                          className="absolute inset-0 size-full rounded-full object-cover [backface-visibility:hidden]"
                        />
                        <img
                          src={assets.helmet}
                          alt="Contratado"
                          className="absolute inset-0 size-full rounded-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)] p-2"
                        />
                      </motion.div>
                    </div>
                    
                    <motion.span 
                      animate={{ 
                        color: isHired ? '#54C6AA' : '#56B4FF',
                        opacity: [0, 1]
                      }}
                      transition={{ 
                        delay: isHired ? (3 - index) * 0.8 : index * 0.8,
                        duration: 0.4
                      }}
                      key={`${isHired}-${index}`}
                      className="mt-3 whitespace-nowrap font-roboto-mono text-[9px] uppercase leading-[1.5] sm:text-xs"
                    >
                      {isHired ? hero.hired_label : hero.talent_label}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <p className="mt-3 text-center font-poppins text-sm leading-[1.5] text-[#E9E9E9] sm:text-base">
              {hero.metric}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
