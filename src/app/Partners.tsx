'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';

const PartnersHero = dynamic(() => import('@/components/Partners/PartnersHero'), { ssr: false });
const ConnectionCycle = dynamic(() => import('@/components/Partners/ConnectionCycle'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/Partners/TestimonialsSection'), { ssr: false });
const SpecializedTrainingSection = dynamic(
  () => import('@/components/Partners/SpecializedTrainingSection'),
  { ssr: false },
);
const RecruitersSection = dynamic(() => import('@/components/Partners/RecruitersSection'), { ssr: false });
const PartnersContactSection = dynamic(() => import('@/components/Partners/PartnersContactSection'), {
  ssr: false,
});

export default function PartnersPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <PartnersHero />
      <ConnectionCycle />
      <TestimonialsSection />
      <SpecializedTrainingSection />
      <RecruitersSection />
      <PartnersContactSection />
      <Footer />
    </main>
  );
}
