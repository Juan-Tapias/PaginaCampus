'use client';

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react'
import data from '../../data/es.json'
import './TourVirtual.css'

const { tour_virtual } = data;

type ViewKey = 'frontal' | 'lateral-izquierdo' | 'lateral-derecho' | 'fondo'

interface ViewConfig {
  name: string
  image: string
  links: {
    key: ViewKey
    label: string
    position: { x: number, y: number }
    direction: 'left' | 'right' | 'forward'
  }[]
}

const VIEWS: Record<ViewKey, ViewConfig> = tour_virtual.views as Record<ViewKey, ViewConfig>;

export function TourVirtual() {
  const [currentViewKey, setCurrentViewKey] = useState<ViewKey>('frontal')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({})
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Object.values(VIEWS).forEach(view => {
      const img = new Image()
      img.src = view.image
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [view.image]: true }))
      }
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const { width, height, left, top } = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 40 
    const y = ((e.clientY - top) / height - 0.5) * 20
    setMousePos({ x, y })
  }

  const changeView = (nextKey: ViewKey) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setCurrentViewKey(nextKey)
      setIsTransitioning(false)
    }, 400)
  }

  const currentView = VIEWS[currentViewKey]
  const isLoaded = imagesLoaded[currentView.image]

  return (
    <div 
      className="tour-wrapper bg-black w-full h-full relative overflow-hidden flex items-center justify-center font-outfit" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentViewKey}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className={`w-full h-full relative transition-all duration-700 ease-out ${isLoaded ? 'blur-0 scale-[1.02]' : 'blur-xl scale-110'}`}
            style={{
              transform: isLoaded ? `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.02)` : 'scale(1.1)'
            }}
          >
            <img 
              src={currentView.image} 
              alt={currentView.name} 
              className={`w-full h-full object-cover select-none brightness-[0.95] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              draggable="false"
            />
          </div>

          {/* Cargador minimalista si la imagen no está lista */}
          <AnimatePresence>
            {!isLoaded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-white/10 border-t-[#3ed896] rounded-full animate-spin" />
                  <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-light">{tour_virtual.loading_text}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay de Hotspots Minimalistas */}
          <div className="absolute inset-0 pointer-events-auto">
            {currentView.links.map((link) => (
              <motion.button
                key={link.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                className="absolute group z-20 flex flex-col items-center gap-3 transition-all"
                style={{
                  left: `${link.position.x}%`,
                  top: `${link.position.y}%`
                }}
                onClick={() => changeView(link.key)}
              >
                <div className="w-14 h-14 rounded-full border border-white/40 bg-black/40 backdrop-blur-md flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-[#3ed896]/30 group-hover:border-[#3ed896] group-hover:shadow-[0_0_20px_rgba(62,216,150,0.3)]">
                  {link.direction === 'left' && <ChevronLeft size={32} strokeWidth={1.5} />}
                  {link.direction === 'right' && <ChevronRight size={32} strokeWidth={1.5} />}
                  {link.direction === 'forward' && <ArrowUp size={28} strokeWidth={1.5} />}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 shadow-lg">
                  <span className="text-white text-[10px] uppercase font-bold tracking-[0.2em] whitespace-nowrap">{link.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none z-30">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#3ed896] shadow-[0_0_10px_#3ed896] animate-pulse" />
          <span className="text-white text-xs tracking-[0.2em] uppercase font-light">
            {tour_virtual.status_prefix} <span className="font-bold">{currentView.name}</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 opacity-50">
        <div className="px-4 py-2 text-[10px] text-white/40 uppercase tracking-[0.3em]">
          {tour_virtual.instruction_text}
        </div>
      </div>
    </div>
  )
}
