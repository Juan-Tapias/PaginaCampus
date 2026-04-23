import React from 'react';
import es from '../../data/es.json';

export default function Footer() {
  const { social_heading, social_links, legal } = es.footer;

  return (
    <footer className="relative w-full bg-[#020202] pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="pt-20">
          <div className="flex flex-col items-center">
            <h3 className="text-white font-poppins text-2xl md:text-3xl font-medium mb-10 tracking-tight text-center">
              {social_heading}
            </h3>

            <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-8 lg:gap-12 mb-20">
              {social_links.map((link, idx) => (
                <React.Fragment key={link.name}>
                  <a target="_blank" rel="noopener noreferrer" href={link.url} className="flex items-center gap-3 text-[#3ed896] hover:text-white transition-all group">
                    <img
                      src={link.icon}
                      alt={link.name}
                      className="w-6 h-6 transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(62,216,150,0.6)]"
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(80%) sepia(62%) saturate(452%) hue-rotate(92deg) brightness(95%) contrast(89%)'
                      }}
                    />
                    <span className="font-mono font-bold text-xs md:text-sm uppercase tracking-widest transition-colors drop-shadow-[0_0_8px_rgba(62,216,150,0.2)]">{link.name}</span>
                  </a>
                  {idx < social_links.length - 1 && (
                    <div className="hidden md:block w-[1px] h-4 bg-white/100 self-center" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 py-10">
              <div className="flex flex-wrap gap-8">
                <a href="/PrivacyPolicy" className="text-white/30 hover:text-white text-[10px] md:text-xs transition-colors">{legal.privacy}</a>
                <a href="/TermsAndConditions" className="text-white/30 hover:text-white text-[10px] md:text-xs transition-colors">{legal.terms}</a>
              </div>

              <p className="text-white/20 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
                {legal.copyright}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Atmosphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none opacity-40">
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-indigo-500/10 to-transparent" />
      </div>
    </footer>
  );
}
