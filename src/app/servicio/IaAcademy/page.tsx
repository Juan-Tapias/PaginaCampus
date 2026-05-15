'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StarField from '@/components/shared/StarField';
import IaAcademyHero from '@/components/IaAcademy/IaAcademyHero';
import IaFrustrationSection from '@/components/IaAcademy/IaFrustrationSection';
import FormationPlansSection from '@/components/IaAcademy/FormationPlansSection';
import TechSpecialistSection from '@/components/IaAcademy/TechSpecialistSection';
import EvolvingTeamsSection from '@/components/IaAcademy/EvolvingTeamsSection';
import IaMethodSection from '@/components/IaAcademy/IaMethodSection';
import AiTechnologiesSection from '@/components/IaAcademy/AiTechnologiesSection';
import IaContactSection from '@/components/IaAcademy/IaContactSection';
import IaExpertImplementationSection from '@/components/IaAcademy/IaExpertImplementationSection';

export default function IaAcademyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <StarField />
      </div>

      <div className="relative z-20">
        <IaAcademyHero />
        <IaFrustrationSection />
        <FormationPlansSection />
        <TechSpecialistSection />
        <EvolvingTeamsSection />
        <IaMethodSection />
        <AiTechnologiesSection />
        <IaContactSection />
        <IaExpertImplementationSection />
        <Footer />
      </div>

      <Navbar />
    </main>
  );
}
