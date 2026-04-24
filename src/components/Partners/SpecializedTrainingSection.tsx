'use client';

import { motion } from 'framer-motion';
import { partnersPage } from './partnersData';
import LazySpaceshipCanvas from './LazySpaceshipCanvas';

const { training, assets } = partnersPage;

function TechOrbit({
  items,
  radiusX,
  radiusY,
  duration,
  reverse = false,
}: {
  items: string[];
  radiusX: number;
  radiusY: number;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[1px] w-[1px]"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ repeat: Infinity, duration, ease: 'linear' }}
    >
      {items.map((technology, index) => {
        const angle = (index / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;

        return (
          <span
            key={technology}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-3 py-1 font-roboto-mono text-[11px] leading-[1.5] text-[#54C6AA] shadow-[0_0_18px_rgba(84,198,170,0.2)] backdrop-blur-md"
            style={{ left: x, top: y }}
          >
            {technology}
          </span>
        );
      })}
    </motion.div>
  );
}

export default function SpecializedTrainingSection() {
  const outerTechnologies = training.technologies.filter((_, index) => index % 2 === 0);
  const innerTechnologies = training.technologies.filter((_, index) => index % 2 !== 0);

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:min-h-[928px]">
      <div className="container relative z-20 mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-[1302px] text-center"
        >
          <h2 className="font-poppins text-[32px] font-medium leading-[1.2] text-[#E9E9E9] sm:text-[40px]">
            {training.heading}
          </h2>
          <p className="mt-2 font-poppins text-[22px] leading-[1.3] text-[#E9E9E9]/90 sm:text-[32px]">
            {training.subheading}
          </p>
          <p className="mt-4 font-roboto-mono text-[11px] uppercase leading-[1.5] text-[#54C6AA] sm:text-xs">
            {training.track}
          </p>
        </motion.div>

        <div className="relative mx-auto mt-12 h-[560px] max-w-[760px] sm:h-[650px]">
          <div className="absolute left-1/2 top-[54%] h-[210px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#54C6AA]/20 [transform:translate(-50%,-50%)_rotate(-12deg)]" />
          <div className="absolute left-1/2 top-[54%] h-[150px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#56B4FF]/20 [transform:translate(-50%,-50%)_rotate(10deg)]" />

          <TechOrbit items={outerTechnologies} radiusX={310} radiusY={92} duration={30} />
          <TechOrbit items={innerTechnologies} radiusX={242} radiusY={62} duration={22} reverse />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-[50%] h-[360px] w-[250px] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute left-1/2 top-0 z-20 flex size-[150px] -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-[#D9D9D9]/10 shadow-[0_0_40px_rgba(255,255,255,0.12)]">
              <img
                src={assets.helmet}
                alt="Astronauta Campuslands"
                className="h-[135px] w-[135px] object-contain"
              />
            </div>
            <div className="absolute left-1/2 top-[128px] z-10 h-[190px] w-[138px] -translate-x-1/2 rounded-[46px_46px_34px_34px] border border-white/10 bg-gradient-to-b from-[#D8DCE2] via-[#9EA5AE] to-[#3F454F] shadow-[inset_0_0_32px_rgba(255,255,255,0.16),0_28px_80px_rgba(0,0,0,0.5)]">
              <div className="absolute left-1/2 top-9 h-14 w-20 -translate-x-1/2 rounded-[18px] border border-black/20 bg-black/50" />
              <div className="absolute -left-8 top-12 h-[118px] w-8 rotate-12 rounded-full bg-[#AAB0B8]" />
              <div className="absolute -right-8 top-12 h-[118px] w-8 -rotate-12 rounded-full bg-[#AAB0B8]" />
            </div>
            <div className="absolute bottom-0 left-1/2 h-16 w-[300px] -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-transparent via-[#B0B0B0]/35 to-transparent blur-sm" />
          </motion.div>

          <LazySpaceshipCanvas
            className="absolute bottom-8 left-1/2 h-[150px] w-[300px] -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}
