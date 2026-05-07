'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import data from '@/data/es.json';

const { success_stories } = data.se_un_camper;

export default function SuccessStories() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="relative w-full py-8 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center px-6 lg:px-12 relative z-10">
        
        {/* Header Grid */}
        <div className="mb-12 ml-32">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[32px] font-medium text-white mb-4"
          >
            {success_stories.title}
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-start gap-8">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-[16px] w-[470px] font-regular leading-relaxed"
            >
              {success_stories.description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden md:block bg-[#041611]/60 backdrop-blur-md border border-[#174635] p-2 rounded-xl rounded-br-none shadow-[0_0_20px_rgba(62,216,150,0.1)] -mt-16 ml-[-20px]"
            >
              <p className="text-[#3ed896] font-mono text-[11px] leading-relaxed uppercase tracking-wider w-[150px]">
                {success_stories.tooltip}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Videos Column */}
          <div className="flex flex-col mb-20 ml-32">
            {success_stories.videos.map((video: any, idx: number) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative aspect-video w-[480px] h-[270px] overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(video.url)}
              >
                <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                
                {/* Play Button */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                    <Play className="text-white fill-white w-6 h-6 ml-1" />
                  </div>
                </div>

                <img 
                  src={video.thumbnail} 
                  alt={`Success Story ${video.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>

          {/* Right: Orbit Astronaut */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start -mt-20 -ml-16"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full max-w-[480px] lg:max-w-none"
            >
              <img 
                src={success_stories.orbit_image} 
                alt="Orbit Astronaut" 
                className="w-[511px] h-[723px] drop-shadow-[0_0_50px_rgba(94,57,218,0.2)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <video 
                src={selectedVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5E39DA]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3ed896]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
