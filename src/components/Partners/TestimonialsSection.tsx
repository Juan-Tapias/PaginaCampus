import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { partnersPage } from './partnersData';
import PartnersSpaceshipCanvas from './PartnersSpaceshipCanvas';

const { testimonials, assets } = partnersPage;

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % testimonials.items.length);
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  const current = testimonials.items[active];

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:min-h-[715px] lg:py-0">
      <div className="container relative z-20 mx-auto grid min-h-[560px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[260px] opacity-70 sm:h-[360px] lg:h-[500px]"
        >
          <PartnersSpaceshipCanvas
            modelUrl={assets.spaceship}
            variant="showcase"
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-[#54C6AA]/60 to-transparent" />
        </motion.div>

        <div className="mx-auto max-w-[420px] text-center lg:mx-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.author}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55 }}
            >
              <p className="font-poppins text-[18px] leading-[1.5] text-[#E9E9E9] lg:text-[20px]">
                "{current.quote}"
              </p>
              <div className="mt-8">
                <p className="font-poppins text-base font-semibold text-[#E9E9E9]">
                  {current.author}
                </p>
                <p className="mt-1 font-roboto-mono text-xs uppercase leading-[1.5] text-[#54C6AA]">
                  {current.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.items.map((item, index) => (
              <button
                key={item.author}
                type="button"
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all ${
                  active === index ? 'w-8 bg-[#54C6AA]' : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Ver testimonio de ${item.author}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
