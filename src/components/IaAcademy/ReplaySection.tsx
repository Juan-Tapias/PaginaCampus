'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { replayVideo } from './iaAcademyData';

export default function ReplaySection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 lg:px-12 lg:pb-32 lg:pt-24">
      <div className="container relative mx-auto max-w-[1302px]">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">VIDEO SESSION</p>
          <h2 className="mt-4 font-poppins text-[34px] font-semibold leading-[1.15] text-[#E9E9E9] sm:text-[44px]">
            {replayVideo.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] font-poppins text-[17px] leading-[1.65] text-white/75">
            {replayVideo.description}
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-[820px] justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-[52px] items-center gap-3 rounded-[4px] bg-[#5E39DA] px-7 font-roboto-mono text-base text-[#E9E9E9] transition-colors hover:bg-[#6D4AE0]"
          >
            <Play size={16} />
            Ver transmisión
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120000] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-4xl rounded-xl border border-white/15 bg-black p-4"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/70 p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  className="h-full w-full"
                  src={replayVideo.youtubeEmbed}
                  title="Última transmisión IA Academy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
