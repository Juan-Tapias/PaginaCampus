import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export interface Location {
  name: string;
  lat: number;
  lng: number;
  mapsUrl: string;
}

export interface MissionGlobeHandle {
  zoomToLocation: (loc: Location) => void;
  resetView: () => void;
  isZoomed: boolean;
}

const MissionGlobe = forwardRef<MissionGlobeHandle>((_, ref) => {
  const [isClient, setIsClient] = useState(false);
  const [showLocationLabel, setShowLocationLabel] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = !showLocationLabel;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = false;
    }
  }, [isClient, showLocationLabel]);

  const zoomToLocation = (loc: Location) => {
    if (globeRef.current) {
      setShowLocationLabel(false);
      setCurrentLocation(loc);
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 0.4 }, 2000);
      setTimeout(() => setShowLocationLabel(true), 2000);
    }
  };

  const resetView = () => {
    if (globeRef.current) {
      setShowLocationLabel(false);
      globeRef.current.pointOfView({ altitude: 2.5 }, 1500);
      setTimeout(() => {
        globeRef.current.controls().autoRotate = true;
      }, 1500);
    }
  };

  useImperativeHandle(ref, () => ({
    zoomToLocation,
    resetView,
    isZoomed: showLocationLabel
  }));

  if (!isClient) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="w-full flex justify-center items-center pointer-events-auto relative group"
    >
      <div className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] relative rounded-full overflow-hidden border border-white/5">
        <Globe
          ref={globeRef}
          width={600}
          height={600}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={true}
          atmosphereColor="#3ed896"
          atmosphereAltitude={0.15}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          pointsData={[
            { lat: 7.0547, lng: -73.0859, size: 0.8, color: '#3ed896', label: 'Santander (HQ)' },
            { lat: 7.8939, lng: -72.5078, size: 0.5, color: '#3ed896', label: 'Cúcuta' },
            { lat: 4.7110, lng: -74.0721, size: 0.5, color: '#3ed896', label: 'Bogotá' },
            { lat: 6.5583, lng: -73.1319, size: 0.5, color: '#3ed896', label: 'San Gil' },
            { lat: 14.6349, lng: -90.5069, size: 0.5, color: '#3ed896', label: 'Guatemala' },
          ]}
          pointColor="color"
          pointAltitude={0.01}
          pointRadius="size"
          ringsData={[
            { 
              lat: currentLocation?.lat || 7.0547, 
              lng: currentLocation?.lng || -73.0859, 
              color: '#3ed896', 
              maxR: currentLocation ? 8 : 5, 
              propagationSpeed: 2, 
              repeatPeriod: 1000 
            }
          ]}
          ringColor="color"
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
        />
        <div className="absolute inset-0 rounded-full bg-[#3ed896]/10 blur-[100px] pointer-events-none -z-10" />
        <div 
          className={`absolute inset-0 rounded-full shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none transition-opacity duration-1000 ${
            showLocationLabel ? 'opacity-20' : 'opacity-100'
          }`} 
        />

        <AnimatePresence>
          {showLocationLabel && currentLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.a
                href={currentLocation.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: '#3ed896', color: '#000' }}
                className="bg-black/80 backdrop-blur-xl border-2 border-[#3ed896] text-[#3ed896] px-6 py-3 rounded-xl text-sm font-bold pointer-events-auto flex items-center gap-2 shadow-[0_0_30px_rgba(62,216,150,0.4)]"
              >
                <X size={16} className="rotate-45" />
                Sede {currentLocation.name}: Abrir Maps
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-[#3ed896]/30 px-4 py-1 rounded-full text-[10px] text-[#3ed896] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Explora nuestras sedes tecnológicas
      </div>
    </motion.div>
  );
});

MissionGlobe.displayName = 'MissionGlobe';
export default MissionGlobe;
