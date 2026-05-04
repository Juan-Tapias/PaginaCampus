'use client';

import { Send } from 'lucide-react';
import { iaContactForm } from './iaAcademyData';

export default function IaContactSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 lg:px-12 lg:py-28">
      <div className="container relative mx-auto max-w-[1302px]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-roboto-mono text-xs uppercase tracking-[0.24em] text-[#54C6AA]">{iaContactForm.eyebrow}</p>
          <h2 className="mt-4 font-poppins text-[34px] font-semibold leading-[1.15] text-[#E9E9E9] sm:text-[44px]">
            {iaContactForm.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-poppins text-[17px] leading-[1.65] text-white/75">
            {iaContactForm.subtitle}
          </p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-14 grid w-full max-w-[760px] grid-cols-1 gap-9"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <label className="flex flex-col gap-3">
              <span className="font-roboto-mono text-[11px] uppercase tracking-[0.14em] text-[#CFCFCF]">
                {iaContactForm.fields.name}
              </span>
              <input
                type="text"
                className="h-11 border-0 border-b border-white/20 bg-transparent font-poppins text-white outline-none transition-colors focus:border-[#54C6AA]"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="font-roboto-mono text-[11px] uppercase tracking-[0.14em] text-[#CFCFCF]">
                {iaContactForm.fields.email}
              </span>
              <input
                type="email"
                className="h-11 border-0 border-b border-white/20 bg-transparent font-poppins text-white outline-none transition-colors focus:border-[#54C6AA]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <label className="flex flex-col gap-3">
              <span className="font-roboto-mono text-[11px] uppercase tracking-[0.14em] text-[#CFCFCF]">
                {iaContactForm.fields.team_size}
              </span>
              <input
                type="text"
                className="h-11 border-0 border-b border-white/20 bg-transparent font-poppins text-white outline-none transition-colors focus:border-[#54C6AA]"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="font-roboto-mono text-[11px] uppercase tracking-[0.14em] text-[#CFCFCF]">
                {iaContactForm.fields.goal}
              </span>
              <input
                type="text"
                className="h-11 border-0 border-b border-white/20 bg-transparent font-poppins text-white outline-none transition-colors focus:border-[#54C6AA]"
              />
            </label>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[4px] bg-[#5E39DA] px-7 font-roboto-mono text-base text-[#E9E9E9] transition-colors hover:bg-[#6D4AE0]"
            >
              <Send size={16} />
              {iaContactForm.cta}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
