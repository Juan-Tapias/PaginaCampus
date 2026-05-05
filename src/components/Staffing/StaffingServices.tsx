'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronDown } from 'lucide-react';
import data from '@/data/es.json';

const { services } = data.staffing_page;

interface Level {
  name: string;
  summary: string;
  details: string[];
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [levelsExpanded, setLevelsExpanded] = useState(false);
  const hasLevels = service.levels && service.levels.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-[240px_1fr] rounded-2xl overflow-hidden bg-[#111111]"
    >
      {/* Left Panel: Image / Placeholder */}
      <div className="relative min-h-[220px] lg:min-h-[unset] bg-[#0d0d0d] flex flex-col items-center justify-center p-6">
        {service.image && (
          <img
            src={service.image}
            alt={service.title}
            className={
              (service as any).imageSize === 'contain'
                ? 'absolute inset-0 w-full h-full object-contain p-1 opacity-70'
                : 'absolute inset-0 w-full h-full object-cover opacity-50'
            }
            style={(service as any).imageSize === 'contain' ? { objectPosition: '15% center' } : undefined}
          />
        )}
        {/* Tag Label — centrado y grande, siempre visible */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2">
          <span className="font-roboto-mono text-[16px] font-bold tracking-[0.3em] text-[#54C6AA] uppercase drop-shadow-[0_0_12px_rgba(84,198,170,0.5)]">
            {service.tag}
          </span>
          <div className="h-[1px] w-8 bg-[#54C6AA]/40 mx-auto" />
        </div>
      </div>

      {/* Right Panel: Content */}
      <div className="p-8 lg:p-10 flex flex-col gap-6">
        {/* Eyebrow + Title */}
        <div>
          <p className="font-roboto-mono text-[10px] uppercase tracking-[0.25em] text-[#54C6AA] mb-3">
            {service.eyebrow}
          </p>
          <h2 className="font-poppins text-[28px] sm:text-[36px] font-semibold text-white leading-tight">
            {service.title}
          </h2>
          <p className="mt-3 font-poppins text-[15px] text-[#A6A6A6] leading-relaxed max-w-xl">
            {service.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#54C6AA] shrink-0" strokeWidth={1.5} />
              <span className="font-poppins text-[14px] font-medium text-[#D0D0D0]">{feature}</span>
            </div>
          ))}
        </div>

        {/* Levels Section */}
        {hasLevels && (
          <div className="pt-4">
            <div className="grid grid-cols-3 gap-4 mb-2">
              {service.levels.map((level: Level) => (
                <div key={level.name}>
                  <p className="font-roboto-mono text-[9px] uppercase tracking-[0.2em] text-[#54C6AA] mb-1">
                    {level.name}
                  </p>
                  <p className="font-roboto-mono text-[13px] text-[#D0D0D0] leading-snug">
                    {level.summary}
                  </p>
                </div>
              ))}
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setLevelsExpanded(!levelsExpanded)}
              className="flex items-center gap-1 mt-1 text-[#A6A6A6] hover:text-white transition-colors"
              aria-label="Expandir niveles"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${levelsExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {levelsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-3 gap-4 pt-4 mt-3">
                    {service.levels.map((level: Level) => (
                      <div key={level.name}>
                        <p className="font-roboto-mono text-[9px] uppercase tracking-[0.2em] text-[#54C6AA] mb-2">
                          {level.name}
                        </p>
                        <ul className="space-y-1">
                          {level.details.map((d, i) => (
                            <li key={i} className="font-roboto-mono text-[12px] text-[#A6A6A6] leading-snug">
                              • {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2">
          <a
            href={service.cta_href}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#5E39DA] font-poppins text-sm font-medium text-white hover:bg-[#6D4AE0] transition-all duration-300 shadow-[0_0_30px_rgba(94,57,218,0.3)]"
          >
            {service.cta}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function StaffingServices() {
  return (
    <section id="staffing-services" className="relative py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-[1100px] flex flex-col gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
