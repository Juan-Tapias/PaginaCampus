'use client';

import { partnersPage } from './partnersData';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const dataHelmet = partnersPage.assets.helmet;
const dataContactSection = partnersPage.form.fields;
const dataButton = partnersPage.form.cta;

export default function PartnersContactSection() {
  return (
    <section
      id="partners-contact"
      className="relative overflow-hidden bg-black flex items-center"
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center content-center lg:flex-row lg:items-center lg:justify-center">
        
        {/* Desktop Helmet - Placed in flex flow, cut exactly in half, smaller and shifted right */}
        <div className="hidden lg:block relative h-[500px] w-[250px] xl:h-[600px] xl:w-[300px] shrink-0 overflow-hidden lg:ml-10 xl:ml-16">
          <div className="relative h-full w-[500px] -ml-[250px] xl:w-[600px] xl:-ml-[300px]">
            <Image
              src={dataHelmet}
              alt="Casco Astronauta"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Difuminado para suavizar el corte en el borde izquierdo */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* Mobile Helmet (Hidden on Desktop) */}
        <div className="relative mb-12 h-[350px] w-[350px] lg:hidden overflow-hidden">
          <div className="relative h-full w-[700px] -ml-[175px]">
            <Image
              src={dataHelmet}
              alt="Casco Astronauta"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Difuminado para los bordes en móvil */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent" />
        </div>

        {/* Right Side: Contact Card & Title */}
        <div className=" flex justify-center lg:justify-start lg:pl-10 lg:pb-20 xl:pl-32">
          <div className="flex w-full max-w-[700px] flex-col items-center px-4 lg:px-0">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-wide text-white md:text-4xl w-full">
              {dataContactSection.title}
            </h2>

            <div className="w-full rounded-[10px] bg-[#1a1a1a] p-8 md:p-12 shadow-2xl">
              <div className="mb-5">
                <h3 className="mb-2 text-2xl text-white md:text-[28px]">
                  {dataContactSection.name}
                </h3>
                <p className="text-base text-gray-400 md:text-lg">
                  {dataContactSection.role}
                </p>
              </div>

              <div className="mb-10 space-y-5">
                <div className="flex items-center gap-4">
                  <Phone className="h-[22px] w-[22px] text-[#00A37B] flex-shrink-0" strokeWidth={2.5} />
                  <p className="text-base text-gray-300 md:text-lg">{dataContactSection.contact}</p>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-[22px] w-[22px] text-[#00A37B] flex-shrink-0" strokeWidth={2.5} />
                  <p className="text-base text-gray-300 md:text-lg break-all">{dataContactSection.email}</p>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="h-[22px] w-[22px] text-[#00A37B] flex-shrink-0" strokeWidth={2.5} />
                  <p className="text-base text-gray-300 md:text-lg">{dataContactSection.direction}</p>
                </div>
              </div>

              <button className="rounded-md bg-[#6c48f2] px-8 py-[14px] text-sm font-medium tracking-wider text-white transition-colors hover:bg-[#553c9a] md:text-base w-full md:w-auto text-center md:text-left">
                {dataButton}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
