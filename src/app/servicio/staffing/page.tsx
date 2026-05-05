'use client';

import dynamic from 'next/dynamic';
import StarField from '@/components/shared/StarField';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const StaffingHero = dynamic(() => import('@/components/Staffing/StaffingHero'), { ssr: false });
const StaffingServices = dynamic(() => import('@/components/Staffing/StaffingServices'), { ssr: false });

export default function StaffingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* Fondo estrellado global */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <StarField />
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <StaffingHero />
        <StaffingServices />
        <Footer />
      </div>

      {/* Navbar encima de todo */}
      <Navbar />
    </main>
  );
}
