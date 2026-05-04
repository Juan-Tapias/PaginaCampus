'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StarField from '@/components/shared/StarField';
import IaAcademyHero from '@/components/IaAcademy/IaAcademyHero';
import FormationPlansSection from '@/components/IaAcademy/FormationPlansSection';
import TechSpecialistSection from '@/components/IaAcademy/TechSpecialistSection';
import EvolvingTeamsSection from '@/components/IaAcademy/EvolvingTeamsSection';
import AiTechnologiesSection from '@/components/IaAcademy/AiTechnologiesSection';
import IaContactSection from '@/components/IaAcademy/IaContactSection';

export default function IaAcademyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <StarField />
      </div>

      <div className="relative z-20">
        <IaAcademyHero />
        <FormationPlansSection />
        <TechSpecialistSection />
        <EvolvingTeamsSection />
        <AiTechnologiesSection />
        <IaContactSection />
        <Footer />
      </div>

      <Navbar />
    </main>
  );
}
