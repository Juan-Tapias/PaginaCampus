'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { replayVideo, upcomingSessions, iaServicesView } from './iaAcademyData';

export default function UpcomingSessionsSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-6 lg:px-12 lg:pb-24 lg:pt-10">
      <div className="container relative mx-auto max-w-[1220px]">
        <div className="grid items-start gap-16 lg:grid-cols-[520px_1fr] lg:gap-16">
          <div>
            <h2 className="font-poppins text-[24px] font-semibold leading-tight text-[#F3F3F3] lg:text-[26px]">
              {iaServicesView.upcoming_sessions.heading}
            </h2>

            <div className="mt-7 max-h-[460px] space-y-8 overflow-y-auto overscroll-contain pr-3 [scrollbar-color:rgba(255,255,255,0.22)_transparent] [scrollbar-width:thin]">
              {upcomingSessions.map((session) => (
                <article key={session.id} className="rounded-[13px] bg-[#1B1B1B] px-7 py-5">
                  <div className="grid grid-cols-[72px_1fr] gap-5">
                    <div className="pt-4 text-center">
                      <p className="font-poppins text-[32px] font-normal leading-none text-[#F2F2F2]">{session.day}</p>
                      <p className="mt-3 font-poppins text-[14px] font-normal leading-none text-[#DADADA]">{session.month_year}</p>
                    </div>

                    <div>
                      <h3 className="font-poppins text-[19px] font-normal leading-[1.35] text-[#EDEDED]">{session.title}</h3>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-roboto-mono text-[12px] leading-relaxed">
                        <span className="text-[#F0F0F0]">{session.speaker}</span>
                        <span className="text-[#A37AFF]">{session.role}</span>
                      </div>
                      <p className="mt-2 font-roboto-mono text-[12px] leading-none text-[#F0F0F0]">{session.time}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="pt-8 lg:pt-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#27BDA6]/70 bg-[#092A25]/55 px-4 py-2 font-roboto-mono text-[12px] leading-none text-[#41D8C0]">
              <span className="h-2 w-2 rounded-full bg-[#34D6B7]" />
              {replayVideo.eyebrow}
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group relative block w-full overflow-hidden bg-black text-left"
              aria-label={replayVideo.cta}
            >
              <video
                className="aspect-video w-full bg-[#111111] object-cover"
                src={replayVideo.video_url}
                preload="metadata"
                muted
                playsInline
              />
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-105">
                <Play size={20} fill="currentColor" strokeWidth={0} />
              </span>
            </button>

            <p className="mt-5 font-roboto-mono text-[12px] leading-relaxed text-[#F4F4F4]">{replayVideo.description}</p>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-5xl bg-black p-3"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-full border border-white/25 bg-black/70 p-2 text-white transition-colors hover:bg-white/10"
                aria-label={replayVideo.close_aria_label}
              >
                <X size={18} />
              </button>
              <video className="aspect-video w-full bg-black" src={replayVideo.video_url} controls autoPlay />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
