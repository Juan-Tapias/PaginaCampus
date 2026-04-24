'use client';

import { Send } from 'lucide-react';
import { partnersPage } from './partnersData';

const { form } = partnersPage;

export default function PartnersContactSection() {
  return (
    <section
      id="partners-contact"
      className="relative overflow-hidden bg-black py-24 lg:min-h-[662px] lg:py-[138px]"
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="relative z-20 mx-auto flex w-[calc(100%-48px)] max-w-[608px] flex-col gap-12"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[296px_1fr]">
          <label className="flex flex-col gap-3">
            <span className="font-roboto-mono text-[11px] uppercase leading-[1.5] text-[#CFCFCF]">
              {form.fields.name}
            </span>
            <input
              name="name"
              type="text"
              className="h-10 border-0 border-b border-[#313131] bg-transparent font-poppins text-sm text-[#E9E9E9] outline-none transition-colors placeholder:text-white/25 focus:border-[#54C6AA]"
              autoComplete="name"
            />
          </label>

          <label className="flex flex-col gap-3">
            <span className="font-roboto-mono text-[11px] uppercase leading-[1.5] text-[#CFCFCF]">
              {form.fields.email}
            </span>
            <input
              name="email"
              type="email"
              className="h-10 border-0 border-b border-[#313131] bg-transparent font-poppins text-sm text-[#E9E9E9] outline-none transition-colors placeholder:text-white/25 focus:border-[#54C6AA]"
              autoComplete="email"
            />
          </label>
        </div>

        <label className="flex flex-col gap-3">
          <span className="font-roboto-mono text-[11px] uppercase leading-[1.5] text-[#CFCFCF]">
            {form.fields.reason}
          </span>
          <textarea
            name="reason"
            rows={3}
            className="min-h-[84px] resize-none border-0 border-b border-[#313131] bg-transparent font-poppins text-sm text-[#E9E9E9] outline-none transition-colors placeholder:text-white/25 focus:border-[#54C6AA]"
          />
        </label>

        <div className="flex flex-col items-center gap-6">
          <button
            type="submit"
            className="group flex min-h-[52px] items-center justify-center gap-3 rounded-[4px] bg-[#5E39DA] px-6 font-roboto-mono text-base leading-[1.5] text-[#E9E9E9] shadow-[0_0_30px_rgba(94,57,218,0.24)] transition-colors hover:bg-[#6D4AE0]"
          >
            <Send size={18} strokeWidth={1.8} className="transition-transform group-hover:translate-x-1" />
            {form.cta}
          </button>
          <p className="text-center font-roboto-mono text-[10px] uppercase leading-[1.5] text-[#CFCFCF]/70">
            {form.legal}
          </p>
        </div>
      </form>
    </section>
  );
}
