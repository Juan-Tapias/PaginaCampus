'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import data from '../../data/es.json';

export default function Navbar() {
  const { logo, links, action_button } = data.navbar;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  const serviceItems = [
    { name: 'Staffing', href: '/servicio/staffing'},
    { name: 'Emplea', href: '/servicio/emplea'},
    { name: 'FullService', href: '#'}, //Pendiente link 
    { name: 'Campuslands Internacional', href: '#'}, //Pendiente link
    { name: 'Campuslands IA Academy', href: '/IaAcademy'},
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkHref = (link: string) => {
    if (link === 'INICIO') return '/';
    if (link === 'SERVICIOS') return '#';
    return `/#${link.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const isActiveLink = (link: string) => {
    if (link === 'INICIO') return pathname === '/';
    if (link === 'SERVICIOS') {
      return (
        pathname.includes('/servicio') ||
        pathname.includes('/Partners') ||
        pathname.includes('/Services') ||
        pathname.includes('/IaAcademy')
      );
    }
    return false;
  };

  return (
    <nav 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100000] pointer-events-none flex justify-center w-full"
    >
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`backdrop-blur-xl border rounded-full py-[7px] px-[24px] h-[44px] flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] pointer-events-auto transition-all duration-700 ease-in-out gap-[32px] ${
          isScrolled && !isHovered 
            ? 'bg-black/20 opacity-80 border-white/5 scale-[0.98]' 
            : 'bg-black/40 opacity-100 border-white/10 scale-100'
        }`}
      >
        
        <a href="/" className="flex items-center shrink-0" aria-label={logo}>
          <img 
            className="w-[125px] h-auto cursor-pointer hover:opacity-80 transition-opacity" 
            src="/Logo_Horizontal_Blanco.webp" 
            alt={logo} 
          />
        </a>

        {/* Contenedor que NO colapsa */}
        <div className="flex items-center gap-[32px]">
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-[32px] shrink-0">
            {links.map((link) => {
              if (link === 'SERVICIOS') {
                return (
                  <div 
                    key={link}
                    className="relative"
                    onMouseEnter={() => setIsServicesHovered(true)}
                    onMouseLeave={() => setIsServicesHovered(false)}
                  >
                    <button
                      className={`text-[12px] font-roboto-mono font-bold transition-all duration-300 uppercase tracking-[0.1em] flex items-center gap-1 relative group whitespace-nowrap ${
                        isActiveLink(link) ? 'text-[#937AE6]' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />
                      <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#54C6AA] transition-all duration-300 ${isServicesHovered ? 'w-full' : 'w-0'}`}></span>
                    </button>

                    <AnimatePresence>
                      {isServicesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[260px] p-2 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[1000] pointer-events-auto"
                        >
                          <div className="flex flex-col gap-1">
                            {serviceItems.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group/item"
                              >
                                <div className="flex flex-col">
                                  <span className="text-[11px] font-bold text-gray-300 group-hover/item:text-white transition-colors uppercase tracking-wider">
                                    {item.name}
                                  </span>
                                </div>
                                <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover/item:opacity-100 text-gray-400 transition-all" />
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <a
                  key={link}
                  href={getLinkHref(link)}
                  className={`text-[12px] font-roboto-mono font-bold transition-all duration-300 uppercase tracking-[0.1em] relative group whitespace-nowrap ${
                    isActiveLink(link) ? 'text-[#937AE6]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#54C6AA] transition-all duration-300 group-hover:w-full"></span>
                </a>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="flex items-center ml-2 lg:ml-8 shrink-0 relative top-[-1px]">
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 h-[28px] rounded-full text-[11px] font-bold hover:bg-white hover:text-black transition-all duration-300 active:scale-95 whitespace-nowrap">
              {action_button}
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}
