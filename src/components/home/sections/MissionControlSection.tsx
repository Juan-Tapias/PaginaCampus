import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import es from '../../../data/es.json';

const TourVirtual = dynamic(() => import('../TourVirtual'), { ssr: false });

export default function MissionControlSection() {
  const { mission_control } = es.footer;
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [hasLocked, setHasLocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isClient) return null;

  return (
    <>
    <section className="relative w-full min-h-screen bg-transparent overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.99, once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-screen overflow-hidden shadow-[0_0_80px_rgba(62,216,150,0.1)] border border-white/10 group"
          >
            <video 
              ref={videoRef}
              src={mission_control.video_url} 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-6 right-6 z-30">
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-[#3ed896]/20 hover:border-[#3ed896]/40 transition-colors shadow-xl"
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                    >
                      <Pause size={20} fill="currentColor" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                    >
                      <Play size={20} className="ml-1" fill="currentColor" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none opacity-60" />
          </motion.div>
    </section>
      <div className="container mx-auto px-4 relative z-10 min-h-[700px] flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center relative z-20">


          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#3ed896] font-mono text-[10px] md:text-sm tracking-[0.4em] mb-4 uppercase"
            >
              {mission_control.badge}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white font-poppins text-3xl md:text-5xl lg:text-6xl font-medium mb-8 tracking-tighter leading-tight"
            >
              {mission_control.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-400 max-w-md text-sm md:text-lg mb-12 font-light leading-relaxed"
            >
              {mission_control.description}
            </motion.p>

            <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(62, 216, 150, 0.1)', borderColor: '#3ed896' }}
                whileTap={{ scale: 0.98 }}
                className={`border border-white/20 text-white px-8 md:px-12 py-4 rounded-full font-mono text-[13px] uppercase tracking-[0.2em] transition-all bg-black/50 backdrop-blur-sm`}
              >
                {mission_control.cta_button}
              </motion.button>
              <motion.button
                onClick={() => setShowTour(true)}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(62, 216, 150, 0.1)', borderColor: '#3ed896' }}
                whileTap={{ scale: 0.98 }}
                className={`border border-white/20 text-white px-8 md:px-12 py-4 rounded-full font-mono text-[13px] uppercase tracking-[0.2em] transition-all bg-black/50 backdrop-blur-sm`}
              >
                {mission_control.cta_button_2}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal del Tour Virtual */}
      <AnimatePresence>
        {showTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            {/* Botón para cerrar */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowTour(false)}
              className="absolute top-8 right-8 z-[110] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all"
            >
              <X size={24} />
            </motion.button>

            {/* Componente del Tour */}
            <TourVirtual />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
