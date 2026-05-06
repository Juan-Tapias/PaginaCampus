'use client';

import dynamic from 'next/dynamic';
import StarField from '@/components/shared/StarField';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CamperHero = dynamic(() => import('@/components/home/sections/CamperHero'), { ssr: false });

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
        <Footer />
      </div>

      {/* Navbar encima de todo */}
      <Navbar />
    </main>
  );
}
