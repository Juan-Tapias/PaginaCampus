'use client';

import dynamic from 'next/dynamic';
import StarField from '@/components/shared/StarField';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CamperHero = dynamic(() => import('@/components/Camper/CamperHero'), { ssr: false });
const TrainingRoutes = dynamic(() => import('@/components/Camper/TrainingRoutes'), { ssr: false });

export default function CamperPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* Fondo estrellado global */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <StarField />
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <CamperHero />
        <TrainingRoutes />
        <Footer />
      </div>

      {/* Navbar encima de todo */}
      <Navbar />
    </main>
  );
}
