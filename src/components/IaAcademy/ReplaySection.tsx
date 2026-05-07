'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { replayVideo } from './iaAcademyData';

export default function ReplaySection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 lg:px-12 lg:pb-32 lg:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1320px] bg-gradient-to-r from-transparent via-[#2D4A50]/60 to-transparent" />
      <div className="container relative mx-auto max-w-[1302px]">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">{replayVideo.eyebrow}</p>
          <h2 className="mt-4 font-poppins text-[40px] font-semibold leading-[1.1] text-[#E9E9E9] sm:text-[48px] lg:text-[56px]">
            {replayVideo.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] font-poppins text-[17px] leading-[1.65] text-white/75 lg:text-[20px]">
            {replayVideo.description}
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-[860px] justify-center rounded-[16px] border border-white/10 bg-[#171A20]/88 px-6 py-10 shadow-[0_18px_52px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-[52px] items-center gap-3 rounded-[4px] bg-[#5E39DA] px-7 font-roboto-mono text-base text-[#E9E9E9] transition-colors hover:bg-[#6D4AE0]"
          >
            <Play size={16} />
            {replayVideo.cta}
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
                aria-label={replayVideo.close_aria_label}
              >
                <X size={18} />
              </button>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  className="h-full w-full"
                  src={replayVideo.youtube_embed}
                  title={replayVideo.iframe_title}
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
