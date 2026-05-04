'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StarField from '@/components/shared/StarField';
import ServicesHero from '@/components/IaAcademy/ServicesHero';
import UpcomingSessionsSection from '@/components/IaAcademy/UpcomingSessionsSection';
import ReplaySection from '@/components/IaAcademy/ReplaySection';
import IaContactSection from '@/components/IaAcademy/IaContactSection';

export default function IaAcademyServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <StarField />
      </div>

      <div className="relative z-20">
        <ServicesHero />
        <UpcomingSessionsSection />
        <ReplaySection />
        <IaContactSection />
        <Footer />
      </div>

      <Navbar />
    </main>
  );
}
