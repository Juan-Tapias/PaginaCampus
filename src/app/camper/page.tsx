'use client';

import dynamic from 'next/dynamic';
import StarField from '@/components/shared/StarField';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CamperHero = dynamic(() => import('@/components/Camper/CamperHero'), { ssr: false });
const TrainingRoutes = dynamic(() => import('@/components/Camper/TrainingRoutes'), { ssr: false });
const TalentDeployment = dynamic(() => import('@/components/Camper/TalentDeployment'), { ssr: false });
const FinancingSection = dynamic(() => import('@/components/Camper/FinancingSection'), { ssr: false });
const RequirementsSection = dynamic(() => import('@/components/Camper/RequirementsSection'), { ssr: false });
const SuccessStories = dynamic(() => import('@/components/Camper/SuccessStories'), { ssr: false });

export default function CamperPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <StarField />
      </div>

      <div className="relative z-10 pt-20">
        <Navbar />
        <CamperHero />
        <TrainingRoutes />
        <TalentDeployment />
        <FinancingSection />
        <RequirementsSection />
        <SuccessStories />
        <Footer />
      </div>
    </main>
  );
}
