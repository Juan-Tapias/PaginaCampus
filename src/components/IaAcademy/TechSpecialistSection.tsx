'use client';

import { BrainCircuit } from 'lucide-react';
import RemoteAssetImage from './RemoteAssetImage';
import { iaAcademyAssets, iaTechSpecialist, specialistModules } from './iaAcademyData';

const desktopModulePositions = [
  'lg:left-[28px] lg:top-[162px]',
  'lg:left-[76px] lg:bottom-[118px]',
  'lg:right-[24px] lg:top-[162px]',
  'lg:right-[72px] lg:bottom-[118px]',
];

export default function TechSpecialistSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-12 lg:pb-20 lg:pt-28">
      <div className="container relative mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[1060px] text-center">
          <h2 className="font-poppins text-[30px] font-semibold leading-[1.16] tracking-[-0.01em] text-[#F1F1F1] sm:text-[36px] lg:text-[34px]">
            {iaTechSpecialist.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[1010px] font-poppins text-[17px] font-normal leading-[1.32] text-[#E5E5E5] sm:text-[20px] lg:text-[20px]">
            {iaTechSpecialist.description}
          </p>
        </div>

        <div className="relative mx-auto mt-12 min-h-[610px] max-w-[1070px] lg:mt-14">
          <RemoteAssetImage
            src={iaAcademyAssets.hero_crossed}
            alt={iaTechSpecialist.image_alt}
            className="relative z-10 mx-auto h-[430px] w-auto max-w-none mix-blend-screen sm:h-[520px] lg:h-[596px]"
          />

          <div className="relative z-20 mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
            {specialistModules.map((module, index) => (
              <div
                key={module.label}
                className={`flex flex-col items-center text-center lg:absolute lg:w-[250px] ${desktopModulePositions[index] || ''}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[7px] bg-[#342078] shadow-[0_0_28px_rgba(124,88,255,0.16)]">
                  <BrainCircuit size={21} strokeWidth={1.8} className="text-[#9B7AFF]" />
                </div>
                <p className="mt-7 font-roboto-mono text-[14px] font-normal uppercase leading-none tracking-[0.03em] text-[#2FE0BC]">
                  {module.label}
                </p>
                <h3 className="mt-3 font-poppins text-[21px] font-semibold leading-[1.12] text-[#F2F2F2]">
                  {module.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-30 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:-mt-3 p-8">
          <button className="h-[52px] w-[172px] bg-[#6637E8] font-roboto-mono text-[16px] font-normal text-white transition-colors hover:bg-[#7446F2]">
            {iaTechSpecialist.primary_cta}
          </button>
          <button className="h-[52px] w-[230px] border border-[#9A9A9A] bg-[#222222]/92 font-roboto-mono text-[16px] font-normal text-[#E8E8E8] transition-colors hover:border-[#C7C7C7] hover:bg-[#2A2A2A]">
            {iaTechSpecialist.secondary_cta}
          </button>
        </div>
      </div>
    </section>
  );
}
