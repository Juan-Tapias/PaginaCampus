'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { partnersPage } from './partnersData';
import LazySpaceshipCanvas from './LazySpaceshipCanvas'

const { connection_cycle } = partnersPage

export default function ConnectionCycle() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "0px 0px 100px 0px" });

  useEffect(() => {
    if (!isInView || !isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % connection_cycle.steps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isInView, isAutoPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false); // Detenemos el carrusel al interactuar
  };

  return (
    <section
      ref={sectionRef}
      id="connection-cycle"
      className="relative overflow-hidden py-24 lg:min-h-[900px]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(84, 198, 170, 0.1) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-20 mx-auto w-full px-10 lg:px-20">
        <header className="mb-24 text-center">
          <motion.h2 className="font-poppins text-[40px] font-semibold text-white sm:text-[56px] leading-tight">
            {connection_cycle.heading}
          </motion.h2>
          <motion.p className="mt-6 font-poppins text-gray-400 max-w-4xl mx-auto text-xl">
            {connection_cycle.subheading}
          </motion.p>
        </header>

        <div className="relative w-full pt-10 pb-20">

          <div className="relative flex justify-between items-start w-full">
            <motion.div
              animate={{
                left: `${((activeStep + 0.5) / connection_cycle.steps.length) * 100}%`,
              }}
              transition={{
                left: { type: "spring", stiffness: 45, damping: 25 },
              }}
              className="absolute top-[136px] z-30 flex w-[1px] h-[1px] -translate-x-1/2 -translate-y-1/2 justify-center items-center pointer-events-none"
            >
              <div className="relative h-[440px] w-[600px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[#54C6AA]/10 blur-[120px] rounded-full scale-125" />
                <LazySpaceshipCanvas
                  className="h-full w-full"
                  modelScale={0.2}
                  modelPosition={[0, 2, 0]} 
                  modelRotation={[0.3, -Math.PI / 8, 0]}
                />
              </div>
            </motion.div>

            {connection_cycle.steps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                  style={{ width: `${100 / connection_cycle.steps.length}%` }}
                >
                  <button
                    onClick={() => handleStepClick(index)}
                    className={` relative z-10 flex size-48 items-center justify-center rounded-full border transition-all duration-700 focus:outline-none ${isActive
                      ? 'border-[#54C6AA]/90 bg-[#54C6AA]/10 shadow-[0_0_100px_rgba(84,198,170,0.4)] scale-110'
                      : 'border-white/10 bg-[#080808] hover:border-white/30'
                      }`}
                  >
                    <div className={`size-3 rounded-full transition-all duration-500 ${isActive ? 'bg-[#54C6AA] shadow-[0_0_20px_#54C6AA] scale-125' : 'bg-white/10'}`} />
                  </button>

                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0.2, y: isActive ? 0 : 20 }}
                    className="mt-16 px-4"
                  >
                    <h3 className={`font-poppins text-xl font-medium transition-colors lg:text-2xl ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {step.title}
                    </h3>
                    <p className="mt-4 font-roboto-mono text-xs leading-relaxed text-gray-500 lg:text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-6">
          {connection_cycle.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => handleStepClick(i)}
              className={`h-2.5 rounded-full transition-all duration-700 ${i === activeStep ? 'w-24 bg-[#54C6AA]' : 'w-6 bg-white/5'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
