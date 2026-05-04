'use client';

import { motion } from 'framer-motion';
import { Clock3 } from 'lucide-react';
import { iaServicesView, upcomingSessions } from './iaAcademyData';

export default function UpcomingSessionsSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1320px] bg-gradient-to-r from-transparent via-[#2D4A50]/60 to-transparent" />
      <div className="container relative mx-auto max-w-[1302px]">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">
            {iaServicesView.upcoming_sessions.eyebrow}
          </p>
          <h2 className="mt-4 font-poppins text-[40px] font-semibold leading-[1.1] text-[#E9E9E9] sm:text-[48px] lg:text-[56px]">
            {iaServicesView.upcoming_sessions.heading}
          </h2>
        </div>

        <div className="mx-auto mt-12 max-h-[460px] max-w-[980px] space-y-4 overflow-y-auto pr-1">
          {upcomingSessions.map((session, index) => (
            <motion.article
              key={session.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="relative rounded-[14px] border border-white/10 bg-[#171A20]/90 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.4)] lg:p-6"
            >
              <h3 className="pr-16 font-poppins text-[22px] font-medium leading-[1.3] text-white lg:text-[25px]">
                {session.title}
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span className="font-roboto-mono uppercase tracking-[0.16em] text-[#54C6AA]">{session.date}</span>
                <span className="inline-flex items-center gap-2 font-roboto-mono uppercase tracking-[0.16em] text-white/65">
                  <Clock3 size={14} />
                  {session.duration}
                </span>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-[14px] bg-gradient-to-r from-transparent via-[#2DD5C8]/80 to-transparent" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
