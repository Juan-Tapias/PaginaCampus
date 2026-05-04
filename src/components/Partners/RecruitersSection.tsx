'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { partnerCompanies, partnersPage, type PartnerCompany } from './partnersData';

const { recruiters, assets } = partnersPage;

const preferredCompanies = [
  'Aliaddo', 'Kontrol', 'SIO', 'Mantis', 'Vensure',
  'Wmwise', 'Wiedii', 'Globant', 'Conexalab', 'Syscom',
  'Amaris', 'Cure Latam', 'Iridian', 'Pensemos', 'IvoLegal',
  'SmartData', 'Dataglobbal', 'Digital Process', 'Software Medico',
  '2nv'
];

function getRecruiterLogos() {
  const byName = new Map(partnerCompanies.map((company) => [company.name, company]));
  const selected = preferredCompanies
    .map((name) => byName.get(name))
    .filter((company): company is PartnerCompany => Boolean(company));

  const unique = selected.filter(
    (company, index, companies) => companies.findIndex((item) => item.name === company.name) === index,
  );

  if (unique.length >= 20) return unique.slice(0, 20);

  const fallback = partnerCompanies.filter(
    (company) => !unique.some((selectedCompany) => selectedCompany.name === company.name),
  );

  return [...unique, ...fallback].slice(0, 20);
}

function RecruiterCard({ company, index }: { company: PartnerCompany, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showHelmet, setShowHelmet] = useState(false);

  // Dimensiones del grid 5x4
  const cols = 5;
  const rows = 4;
  const col = index % cols;
  const row = Math.floor(index / cols);

  // Cálculo de posición de fondo para formar la imagen completa
  const bgX = (col / (cols - 1)) * 100;
  const bgY = (row / (rows - 1)) * 100;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      setShowHelmet(true);
    } else {
      // Retraso de 2 segundos antes de volver al logo
      timer = setTimeout(() => {
        setShowHelmet(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <div 
      className="relative h-[138px] lg:h-[176px] border border-[#2A2A2A] bg-[#080808] overflow-hidden cursor-crosshair group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!showHelmet ? (
          <motion.div
            key="logo"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex h-full w-full items-center justify-center p-6"
          >
            <img
              src={company.image}
              alt={company.name}
              loading="lazy"
              decoding="async"
              className="max-h-[58px] max-w-[142px] object-contain brightness-0 invert grayscale opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        ) : (
          <motion.div
            key="helmet"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full"
            style={{
              backgroundImage: `url(${assets.helmet})`,
              backgroundSize: '500% 400%',
              backgroundPosition: `${bgX}% ${bgY}%`,
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(1.2) contrast(1.1)'
            }}
          >
            {/* Overlay de escaneo sutil (sin animación costosa) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#54C6AA]/5 to-transparent opacity-60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de esquina tecnológico */}
      <div className="absolute top-2 left-2 w-1 h-1 bg-[#54C6AA]/30 rounded-full" />
    </div>
  );
}

export default function RecruitersSection() {
  const companies = getRecruiterLogos();
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setGridVisible(true); obs.disconnect(); } },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-transparent py-24 lg:min-h-[1124px]">
      {/* Fondo de ambientación */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(84,198,170,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="container relative z-20 mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-[1302px] text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-roboto-mono text-xs uppercase leading-[1.5] text-[#54C6AA] tracking-widest"
          >
            {recruiters.eyebrow}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-poppins text-[32px] font-semibold leading-[1.2] text-[#E9E9E9] sm:text-[48px]"
          >
            {recruiters.heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 font-poppins text-lg leading-[1.6] text-[#A6A6A6] max-w-2xl mx-auto"
          >
            {recruiters.subheading}
          </motion.p>
        </div>

        <div ref={gridRef} className="mx-auto grid max-w-[1100px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-[#2A2A2A]">
          {gridVisible && companies.map((company, index) => (
            <RecruiterCard
              key={company.name}
              company={company}
              index={index}
            />
          ))}
          {!gridVisible && companies.map((company) => (
            <div key={company.name} className="h-[138px] lg:h-[176px] border border-[#2A2A2A] bg-[#080808]" />
          ))}
        </div>

        {/* Decoración inferior */}
        <div className="mt-16 flex justify-center items-center gap-4 opacity-30">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#54C6AA]" />
          <span className="font-roboto-mono text-[10px] text-[#54C6AA] tracking-[0.4em]">MISSION STATUS: ACTIVE</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#54C6AA]" />
        </div>
      </div>
    </section>
  );
}
