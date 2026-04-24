import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
import PartnersSpaceshipCanvas from './PartnersSpaceshipCanvas';

const { connection_cycle, assets } = partnersPage;
const CYCLE_MS = 2800;

const stepIcons = [BookOpen, UserCheck, Inbox, FileCheck, Building2, MessageCircle];

export default function ConnectionCycle() {
  const [activeStep, setActiveStep] = useState(0);
  const visibleOffset = useMemo(() => activeStep * 256, [activeStep]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % connection_cycle.steps.length);
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="connection-cycle"
      className="relative overflow-hidden bg-black py-20 lg:min-h-[659px] lg:py-[88px]"
    >
      <div className="container relative z-20 mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[469px_1fr] lg:gap-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 0.52, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75 }}
          className="relative hidden h-[483px] overflow-hidden blur-[0.4px] lg:block"
        >
          <TypewriterContent
            lines={connection_cycle.code_lines}
            align="left"
            className="h-[483px] w-[672px] overflow-hidden px-0 pt-4 font-poppins text-[14px] leading-[1.5] tracking-normal text-left"
            lineClassName="min-w-[640px] whitespace-pre"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black" />
        </motion.div>

        <div className="flex min-w-0 flex-col items-center lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="w-full text-center lg:text-right"
          >
            <h2 className="font-poppins text-[30px] font-medium leading-[1.2] text-[#E9E9E9] sm:text-[32px]">
              {connection_cycle.heading}
            </h2>
            <p className="mt-4 font-poppins text-sm leading-5 text-[#BEC7D3]">
              {connection_cycle.subheading}
            </p>
          </motion.div>

          <div className="relative mt-11 w-full overflow-hidden lg:h-[361px] lg:max-w-[673px]">
            <div className="absolute left-[68px] right-0 top-[98px] hidden h-px bg-[#1781B5] shadow-[0_0_16px_rgba(23,129,181,0.65)] lg:block" />
            <motion.div
              animate={{ x: typeof window === 'undefined' ? 0 : -visibleOffset }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-w-max gap-14 lg:absolute lg:left-0 lg:top-0"
            >
              {connection_cycle.steps.map((step, index) => {
                const Icon = stepIcons[index] ?? BookOpen;
                const isActive = index === activeStep;

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="group relative flex w-[200px] shrink-0 flex-col items-center pt-0 text-center focus:outline-none"
                    aria-pressed={isActive}
                  >
                    <span
                      className={`relative flex size-[128px] items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? 'border-[#54C6AA] bg-[#001D16] shadow-[0_0_42px_rgba(84,198,170,0.36)]'
                          : 'border-[#56B4FF] bg-black shadow-[0_0_28px_rgba(86,180,255,0.2)]'
                      }`}
                    >
                      <span className="absolute inset-[-24px] rounded-full border border-current opacity-10" />
                      <Icon
                        size={40}
                        strokeWidth={1.7}
                        className={isActive ? 'text-[#54C6AA]' : 'text-[#2893E8]'}
                      />
                    </span>

                    <span className="mt-9 font-poppins text-base font-medium leading-[1.5] text-[#E9E9E9] sm:text-lg">
                      {step.title}
                    </span>
                    <span
                      className={`mt-4 min-h-[84px] max-w-[289px] font-roboto-mono text-sm leading-[1.5] text-[#CFCFCF] transition-opacity duration-500 sm:text-base ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {step.description}
                    </span>

                    {isActive && (
                      <PartnersSpaceshipCanvas
                        modelUrl={assets.spaceship}
                        variant="timeline"
                        className="absolute left-1/2 top-[42px] h-[74px] w-[190px] -translate-x-1/2 -translate-y-full"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-8 flex gap-2 lg:mt-0">
            {connection_cycle.steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeStep ? 'w-8 bg-[#54C6AA]' : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Ver etapa ${step.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
