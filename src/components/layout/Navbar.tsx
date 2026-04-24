
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import data from '../../data/es.json';

export default function Navbar() {
  const { logo, links, action_button } = data.navbar;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 50) {
            setIsScrolled(false);
            setIsVisible(true);
          } else {
            setIsScrolled(true);
            setIsVisible(currentScrollY < lastScrollY);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isCollapsed = isScrolled && !isHovered;
  const getLinkHref = (link: string) => {
    if (link === 'INICIO') return '/';
    if (link === 'PARTNERS') return '/Partners';
    return `/#${link.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const isActiveLink = (link: string) => {
    if (link === 'INICIO') return pathname === '/';
    if (link === 'PARTNERS') return pathname === '/Partners';
    return false;
  };

  return (
    <nav 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none flex justify-center w-full transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-[150%]'
      }`}
    >
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-black/20 backdrop-blur-xl border border-white/10 rounded-full py-[7px] px-[24px] h-[44px] flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] pointer-events-auto transition-all duration-500 ease-in-out hover:border-white/20 overflow-hidden ${isCollapsed ? 'gap-0' : 'gap-[32px]'}`}
      >
        
        <a href="/" className="flex items-center shrink-0" aria-label={logo}>
          <img 
            className="w-[125px] h-auto cursor-pointer hover:opacity-80 transition-opacity" 
            src="/Logo_Horizontal_Blanco.webp" 
            alt={logo} 
          />
        </a>

        {/* Contenedor que colapsa */}
        <div 
          className={`flex items-center transition-all duration-500 ease-in-out ${
            isCollapsed ? 'max-w-0 opacity-0 overflow-hidden' : 'max-w-[800px] opacity-100'
          }`}
        >
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-[32px] shrink-0">
            {links.map((link) => (
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
            ))}
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
