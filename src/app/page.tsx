'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Loader from '../components/shared/Loader';
import Astronaut from '../components/shared/Astronaut';
import HeadSection from '../components/home/sections/HeadSection';
import Navbar from '../components/layout/Navbar';

// Solo dejamos dinámicos los componentes de UI que no tienen 3D pesado directo o que son secundarios
const Hero = dynamic(() => import('../components/home/sections/Hero'), { ssr: false });
const ModulesSection = dynamic(() => import('../components/home/sections/ModulesSection'), { ssr: false });
const KPISection = dynamic(() => import('../components/home/sections/KPISection'), { ssr: false });
const PartnersSection = dynamic(() => import('../components/home/sections/PartnersSection'), { ssr: false });
const MissionControlSection = dynamic(() => import('../components/home/sections/MissionControlSection'), { ssr: false });
const Footer = dynamic(() => import('../components/layout/Footer'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#000000] min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="content" className="relative bg-[#000000]">
            {/* El viaje del astronauta: Hero + Módulos */}
            <div className="relative">
              {/* Contenedor Sticky para el Astronauta - subimos Z para asegurar visibilidad */}
              <div className="sticky top-0 h-screen w-full z-10 overflow-hidden pointer-events-none">
                <Astronaut />
              </div>

              {/* Contenido que scrollea encima */}
              <div className="relative z-20 -mt-[100vh]">
                <Hero />
                <ModulesSection />
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#08080a] to-transparent z-10 pointer-events-none" />
              </div>
            </div>
            <div className="relative z-40">
              <KPISection />
              <PartnersSection />
              <HeadSection />
              <MissionControlSection />
              <Footer />
            </div>
            {/* Navbar al final del DOM para asegurar stacking por encima de todo */}
            <Navbar />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
