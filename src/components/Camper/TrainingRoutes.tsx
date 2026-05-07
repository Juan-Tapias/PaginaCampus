'use client';

import { motion } from 'framer-motion';
import data from '@/data/es.json';
import { Check } from 'lucide-react';

const { training_routes } = data.se_un_camper;

export default function TrainingRoutes() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-24">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start max-w-md"
          >
            <div className="border border-[#009B74] rounded-lg px-4 py-2 mb-8 bg-[#009B74]/5">
              <p className="text-[#009B74] text-sm font-mono whitespace-pre-line leading-relaxed">
                {training_routes.badge}
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 whitespace-pre-line leading-tight">
              {training_routes.heading}
            </h2>

            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed font-light">
              {training_routes.description}
            </p>

            <div className="w-full max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#009B74] to-transparent opacity-50" />
          </motion.div>

          {/* Right Column - Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {training_routes.cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-[#1A1D20]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 flex flex-col h-full hover:bg-[#1f2327]/90 transition-colors"
              >
                <div className="mb-6">
                  <span className="text-gray-400 text-xs font-mono tracking-widest mb-2 block">
                    {card.mission}
                  </span>
                  <h3 className="text-3xl font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#7E61E1] text-xl font-medium">
                    {card.duration}
                  </p>
                </div>

                <div className="flex-grow">
                  <span className="text-gray-500 text-xs font-mono tracking-widest mb-4 block">
                    {card.includes_label}
                  </span>
                  <ul className="space-y-3 mb-8">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300 text-sm">
                        <div className="mr-3 mt-0.5 flex-shrink-0 bg-[#009B74] rounded-full p-0.5">
                          <Check className="w-3 h-3 text-[#1A1D20]" strokeWidth={3} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-3 px-6 border border-white/20 rounded text-gray-300 text-sm font-mono hover:bg-white/5 hover:text-white transition-all uppercase tracking-wider">
                  {card.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee and Banner Section */}
      <div className="w-full flex flex-col border-y border-white/10">
        
        {/* Top Marquee */}
        <div className="w-full overflow-hidden border-b border-white/10 bg-black/20 py-2">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="whitespace-nowrap flex"
          >
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xs font-mono text-gray-500 tracking-widest mx-4">
                {training_routes.ticker}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Banner Content */}
        <div className="w-full bg-black/40 py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-6">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/paginacampus.firebasestorage.app/o/logos%2FCAMPUS-LOGOS-02.svg?alt=media" 
                alt="Campuslands Logo" 
                className="w-32 opacity-80"
              />
              <div className="w-px h-12 bg-white/10 hidden md:block"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between flex-grow gap-6 w-full">
              <div className="text-center md:text-left">
                <h3 className="text-white font-mono text-sm md:text-base mb-2 tracking-wide uppercase">
                  {training_routes.banner.text}
                </h3>
                <a href="#" className="text-[#009B74] font-mono text-xs uppercase tracking-widest hover:text-[#3BC4A5] transition-colors">
                  {training_routes.banner.link_text}
                </a>
              </div>
              
              <button className="w-10 h-10 border border-white/20 rounded flex items-center justify-center hover:bg-white/5 transition-colors flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1V13M7 13L1 7M7 13L13 7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="w-full overflow-hidden border-t border-white/10 bg-black/20 py-2">
          <motion.div 
            animate={{ x: [-1000, 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="whitespace-nowrap flex"
          >
            {[...Array(5)].map((_, i) => (
              <span key={`bot-${i}`} className="text-xs font-mono text-gray-500 tracking-widest mx-4">
                {training_routes.ticker}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
