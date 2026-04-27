'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Building2,
  FileCheck,
  Inbox,
  MessageCircle,
  UserCheck,
} from 'lucide-react';
import TypewriterContent from '@/components/shared/TypewriterContent';
import { partnersPage } from './partnersData';
import LazySpaceshipCanvas from './LazySpaceshipCanvas'

const { connection_cycle, assets } = partnersPage
const stepIcons = [BookOpen, UserCheck, Inbox, FileCheck, Building2, MessageCircle];

export default function ConnectionCycle() {
  const [activeStep, setActiveStep] = useState(0);

  const STEP_WIDTH = 304;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % connection_cycle.steps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="connection-cycle"
      className="relative overflow-hidden bg-black py-10 lg:min-h-[820px]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#54C6AA]/10 blur-[120px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-[1400px]">
        <div className="flex w-full flex-col overflow-hidden lg:flex-row lg:items-center lg:gap-10 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 0.9, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-[100px] hidden flex-col lg:flex lg:w-[500px] xl:w-[650px] h-fit min-h-[600px] pl-6 lg:pl-10"
          >
            <div className="h-full w-full">
              <TypewriterContent
                lines={connection_cycle.code_lines}
                align="left"
                scrolling={false}
                className="font-roboto-mono h-full text-[15px] xl:text-[16px] tracking-normal text-left"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          </motion.div>

          <div className="flex flex-1 flex-col overflow-hidden px-6 lg:px-10">
            <header className="mb-12 text-center lg:text-left">
              <h2 className="font-poppins text-[32px] font-semibold text-white sm:text-[40px] leading-tight">
                {connection_cycle.heading}
              </h2>
              <p className="mt-4 font-poppins text-gray-400 max-w-2xl mx-auto lg:mx-0">
                {connection_cycle.subheading}
              </p>
            </header>

            <div className="relative mt-4 w-full overflow-hidden pt-32">
              <div className="absolute left-0 right-0 top-[208px] h-px bg-gradient-to-r from-[#54C6AA]/30 via-[#2893E8]/30 to-transparent" />

              <div className="relative">
                <motion.div
                  animate={{ x: `calc(50% - 120px - ${activeStep * STEP_WIDTH}px)` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-16"
                >
                  <motion.div
                    animate={{
                      x: activeStep * STEP_WIDTH,
                      y: [0, -12, 0],
                      rotateZ: [0, 2, -2, 0],
                    }}
                    transition={{
                      x: { type: "spring", stiffness: 50, damping: 20 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute top-0 left-0 z-30 flex w-[240px] justify-center pointer-events-none"
                  >
                    <div className="relative h-[180px] w-[280px]">
                      <div className="absolute inset-0 bg-[#54C6AA]/10 blur-[80px] rounded-full scale-75" />
                      <LazySpaceshipCanvas
                        className=" mt-[-80px] h-[200px] w-full"
                        modelScale={0.25}
                        modelPosition={[0, 3, 0]}
                        modelRotation={[0.3, -Math.PI / 8, 0]}
                      />
                    </div>
                  </motion.div>

                  {connection_cycle.steps.map((step, index) => {
                    const Icon = stepIcons[index] ?? BookOpen;
                    const isActive = index === activeStep;

                    return (
                      <div
                        key={step.title}
                        className="relative flex w-[240px] shrink-0 flex-col items-center text-center"
                      >
                        <button
                          onClick={() => setActiveStep(index)}
                          className={` relative flex size-44 items-center justify-center rounded-full border transition-all duration-700 focus:outline-none ${isActive
                            ? 'border-[#54C6AA]/60 bg-black shadow-[0_0_60px_rgba(84,198,170,0.25)] scale-110'
                            : 'border-white/5 bg-[#080808] hover:border-white/20'
                            }`}
                        >
                          <Icon
                            size={48}
                            className={`transition-colors duration-500 ${isActive ? 'text-[#54C6AA]' : 'text-gray-700'}`}
                          />
                        </button>

                        <motion.div
                          animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 15 }}
                          className="mt-14"
                        >
                          <h3 className={`font-poppins text-xl font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
                            {step.title}
                          </h3>
                          <p className="mt-4 font-roboto-mono text-sm leading-relaxed text-gray-500">
                            {step.description}
                          </p>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            <div className="mt-16 flex justify-center gap-3 lg:justify-start">
              {connection_cycle.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === activeStep ? 'w-12 bg-[#54C6AA]' : 'w-4 bg-white/10 hover:bg-white/25'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
