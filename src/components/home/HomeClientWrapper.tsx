'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '../shared/Loader';
import dynamic from 'next/dynamic';
import Astronaut from '../shared/Astronaut';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Hero = dynamic(() => import('./sections/Hero'), { ssr: false });
const ModulesSection = dynamic(() => import('./sections/ModulesSection'), { ssr: false });
const KPISection = dynamic(() => import('./sections/KPISection'), { ssr: false });
const PartnersSection = dynamic(() => import('./sections/PartnersSection'), { ssr: false });
const MissionControlSection = dynamic(() => import('./sections/MissionControlSection'), { ssr: false });
const HeadSection = dynamic(() => import('./sections/HeadSection'), { ssr: false });

export default function HomeClientWrapper() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#000000] min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="content" className="relative bg-[#000000]">
            
            <div className="relative">
              <div className="sticky top-0 h-screen w-full z-10 overflow-hidden pointer-events-none">
                <Astronaut />
              </div>

              <div className="relative z-20 -mt-[100vh]">
                <Hero />
                <ModulesSection />
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#08080a] to-transparent z-10 pointer-events-none" />
              </div>
            </div>

            <div className="relative z-40 bg-black">
              <KPISection />
              <PartnersSection />
              <HeadSection />
              <MissionControlSection />
              <Footer />
            </div>

            <Navbar />

          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
