'use client';

import dynamic from 'next/dynamic';
import { useScroll, useTransform, motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import StarField from '@/components/shared/StarField';

const PartnersHero = dynamic(() => import('@/components/Partners/PartnersHero'), { ssr: false });
const ConnectionCycle = dynamic(() => import('@/components/Partners/ConnectionCycle'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/Partners/TestimonialsSection'), { ssr: false });
const PartnersSelectionCarousel = dynamic(() => import('@/components/Partners/PartnersSelectionCarousel'), { ssr: false });
const SpecializedTrainingSection = dynamic(
  () => import('@/components/Partners/SpecializedTrainingSection'),
  { ssr: false },
);
const RecruitersSection = dynamic(() => import('@/components/Partners/RecruitersSection'), { ssr: false });
const PartnersContactSection = dynamic(() => import('@/components/Partners/PartnersContactSection'), {
  ssr: false,
});

const PartnersTravelingSpaceship = dynamic(() => import('@/components/Partners/PartnersTravelingSpaceship'), { ssr: false });

export default function EmpleaPage() {
  const { scrollYProgress } = useScroll();
  
  // Las estrellas se vuelven más sutiles después del Hero
  const starOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3]);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* Fondo de Estrellas Global */}
      <motion.div 
        style={{ opacity: starOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <StarField />
      </motion.div>

      <div className="relative">
        {/* Contenedor Sticky para la Nave */}
        <div className="sticky top-0 h-screen w-full z-10 overflow-hidden pointer-events-none">
          <PartnersTravelingSpaceship />
        </div>

        {/* Contenido que scrollea encima */}
        <div className="relative z-20 -mt-[100vh]">
          <PartnersHero />
          <ConnectionCycle />
          <TestimonialsSection />
        </div>
      </div>

      <div className="relative z-40 bg-transparent">
        <PartnersSelectionCarousel />
        <SpecializedTrainingSection />
        <RecruitersSection />
        <PartnersContactSection />
        <Footer />
      </div>

      {/* Navbar al final para asegurar visibilidad sobre secciones 3D */}
      <Navbar />
    </main>
  );
}
