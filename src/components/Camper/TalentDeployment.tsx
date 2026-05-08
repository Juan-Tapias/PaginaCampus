'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@/data/es.json';

const { talent_deployment } = data.se_un_camper;

export default function TalentDeployment() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = talent_deployment.steps;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="relative w-full py-12 overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[28px] md:text-[32px] font-medium text-white mb-4"
        >
          {talent_deployment.heading}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-20 font-light"
        >
          {talent_deployment.subheading}
        </motion.p>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 min-h-[400px]">

          {steps.map((step, index) => {
            const isActive = activeStep === index;
            
            return (
              <div 
                key={step.number}
                className="flex flex-col items-center w-full md:w-1/4 relative cursor-pointer group"
                onClick={() => setActiveStep(index)}
              >
                {/* Bubble */}
                <div className="relative mb-6">
                  {/* Outer Glow */}
                  <motion.div 
                    animate={{ 
                      scale: isActive ? [1, 1.1, 1] : 1,
                      opacity: isActive ? 1 : 0.4
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className={`absolute inset-0 rounded-full blur-xl transition-colors duration-500 ${
                      isActive ? 'bg-[#009B74]/40' : 'bg-[#0072FF]/20'
                    }`}
                  />

                  {/* Circle */}
                  <div className={`relative w-36 h-36 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? 'border-[#009B74] shadow-[0_0_35px_rgba(0,155,116,0.4)]' 
                      : 'border-[#0072FF]/30 shadow-[0_0_20px_rgba(0,114,255,0.1)]'
                  }`}>
                    <span className={`text-4xl font-bold transition-colors duration-500 ${
                      isActive ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Astronaut (Floats to the active bubble) */}
                  {isActive && (
                    <motion.div 
                      layoutId="astronaut"
                      initial={false}
                      transition={{ 
                        type: "tween",
                        ease: "easeInOut",
                        duration: 1.2
                      }}
                      animate={{ 
                        rotate: activeStep * 90 
                      }}
                      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                      <motion.img 
                        src={talent_deployment.orbit}
                        alt="Astronaut"
                        animate={{ 
                          y: [0, -15, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 4,
                          ease: "easeInOut"
                        }}
                        className="w-56 h-56 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Title */}
                <h3 className={`text-xl font-semibold mb-4 transition-colors duration-500 ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.title}
                </h3>

                {/* Description (Only shows for active) */}
                <div className="min-h-[100px] flex items-start justify-center w-full px-2">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.p
                        key={step.description}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400 text-sm md:text-[15px] font-light leading-relaxed max-w-[280px]"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
