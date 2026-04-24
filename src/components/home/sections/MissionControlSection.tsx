import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import es from '../../../data/es.json';
import MissionGlobe, { MissionGlobeHandle, Location } from '../../shared/MissionGlobe';

const TourVirtual = dynamic(() => import('../TourVirtual'), { ssr: false });

const SEDES: Location[] = [
  { name: 'Bogotá', lat: 4.7110, lng: -74.0721, mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Campuslands+Bogota' },
  { name: 'Cúcuta', lat: 7.8939, lng: -72.5078, mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Campuslands+Cucuta' },
  { name: 'San Gil', lat: 6.5583, lng: -73.1319, mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Campuslands+San+Gil' },
  { name: 'Guatemala', lat: 14.6349, lng: -90.5069, mapsUrl: 'https://www.google.com/maps/place/Campuslands/@14.6222193,-100.270113,6z/data=!4m10!1m2!2m1!1sCampuslands+Guatemala!3m6!1s0x8589a3b61a018d91:0x3b8f5bb6cc476d2b!8m2!3d14.6222193!4d-90.5142536!15sChVDYW1wdXNsYW5kcyBHdWF0ZW1hbGGSARtzb2Z0d2FyZV90cmFpbmluZ19pbnN0aXR1dGXgAQA!16s%2Fg%2F11ys3sw_hd?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D' },
];

export default function MissionControlSection() {
  const { mission_control } = es.footer;
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [selectedSede, setSelectedSede] = useState<string>("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const globeRef = useRef<MissionGlobeHandle>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSedeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sedeName = e.target.value;
    setSelectedSede(sedeName);
    
    if (sedeName === "") {
      globeRef.current?.resetView();
    } else {
      const sede = SEDES.find(s => s.name === sedeName);
      if (sede && globeRef.current) {
        globeRef.current.zoomToLocation(sede);
      }
    }
  };

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
            preload="none"
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

      <div className="container mx-auto px-4 relative z-10 min-h-[700px] flex flex-col justify-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center relative z-20">
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

            <div className='flex flex-wrap gap-4 justify-center lg:justify-start items-center w-full max-w-xl'>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(62, 216, 150, 0.1)', borderColor: '#3ed896' }}
                whileTap={{ scale: 0.98 }}
                className={`border border-white/20 text-white px-6 md:px-8 py-3 rounded-full font-mono text-[11px] md:text-[13px] uppercase tracking-[0.2em] transition-all bg-black/50 backdrop-blur-sm`}
              >
                {mission_control.cta_button}
              </motion.button>
              
              <motion.button
                onClick={() => setShowTour(true)}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(62, 216, 150, 0.1)', borderColor: '#3ed896' }}
                whileTap={{ scale: 0.98 }}
                className={`border border-white/20 text-white px-6 md:px-8 py-3 rounded-full font-mono text-[11px] md:text-[13px] uppercase tracking-[0.2em] transition-all bg-black/50 backdrop-blur-sm`}
              >
                {mission_control.cta_button_2}
              </motion.button>

              {/* Selector de Sedes */}
              <div className="relative min-w-[200px]">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3ed896] pointer-events-none">
                  <MapPin size={16} />
                </div>
                <select
                  value={selectedSede}
                  onChange={handleSedeChange}
                  className="w-full bg-black/40 backdrop-blur-xl border border-[#3ed896]/30 text-white pl-11 pr-4 py-3 rounded-full font-mono text-[11px] md:text-[13px] appearance-none cursor-pointer focus:outline-none focus:border-[#3ed896] hover:bg-[#3ed896]/5 transition-all uppercase tracking-wider"
                >
                  <option value="" className="bg-[#090A0F]">Localizar Sede</option>
                  {SEDES.map(sede => (
                    <option key={sede.name} value={sede.name} className="bg-[#090A0F]">
                      {sede.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <MissionGlobe ref={globeRef} />
        </div>
      </div>

      <AnimatePresence>
        {showTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowTour(false)}
              className="absolute top-8 right-8 z-[110] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all"
            >
              <X size={24} />
            </motion.button>
            <TourVirtual />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
