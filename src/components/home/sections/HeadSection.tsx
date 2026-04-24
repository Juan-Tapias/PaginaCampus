'use client';

import { useState, useRef, useCallback, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrbitLienzo } from '../../shared/Astronaut_head';
import es from '../../../data/es.json';

function TypewriterText({ text, speed = 50 }: { text: string, speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [iteration, setIteration] = useState(0);
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, iteration, speed]);
  
  return <span>{displayedText}</span>;
}

function GlitchTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;
    const result = Array(text.length).fill('');
    let currentIdx = 0;
    let glitchCount = 0;
    const GLITCH_STEPS = 3; // Menos pasos para que sea más rápido

    const interval = setInterval(() => {
      if (currentIdx >= text.length) {
        setDisplayedText(text);
        clearInterval(interval);
        return;
      }
      
      if (glitchCount < GLITCH_STEPS) {
        // Mostrar ceros y unos aleatorios en la posición actual
        const glitch = Math.random() > 0.5 ? '1' : '0';
        setDisplayedText(result.slice(0, currentIdx).join('') + glitch);
        glitchCount++;
      } else {
        // Revelar el carácter real y saltar al siguiente
        result[currentIdx] = text[currentIdx];
        setDisplayedText(result.slice(0, currentIdx + 1).join(''));
        currentIdx++;
        glitchCount = 0;
      }
    }, 10); // 10ms es muy rápido y estable
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}

export default function HeadSection() {
  const { orbit_chat } = es;
  const [loaded, setLoaded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'orbit'; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bubbleRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleLoad = useCallback(() => {
    setTimeout(() => setLoaded(true), 500);
  }, []);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);
    setIsLoading(true);

    try {
      const response = await fetch('https://chatbot-pagina-web-1.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: userMsg,
          history: messages 
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || 'Error del servidor');
      }

      const result = await response.json();
      const answer: string = result.answer || result.response || 'Sin respuesta.';
      setMessages(prev => [...prev, { role: 'orbit', text: answer }]);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error desconocido.';
      setMessages(prev => [...prev, { role: 'orbit', text: `⚠️ ${msg}` }]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-20 overflow-hidden">
      <div className="z-10 absolute inset-0">
        <OrbitLienzo alCargar={handleLoad} referenciaBurbuja={bubbleRef} />
      </div>

      <div ref={bubbleRef} className="absolute top-0 left-0 z-50 pointer-events-none" style={{ transition: 'transform 0.05s linear' }}>
        <AnimatePresence>
          {!chatOpen && loaded && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-[#041611]/60 backdrop-blur-md border border-[#174635] py-3 px-4 rounded-xl rounded-bl-none shadow-[0_0_20px_rgba(62,216,150,0.1)] whitespace-pre-line"
            >
              <p className="text-[#3ed896] font-mono text-xs leading-relaxed">
                <TypewriterText text={orbit_chat.greeting} />
                <span className="w-[4px] h-[15px] bg-[#3ed896] inline-block ml-1 animate-pulse align-middle" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="h-[40vh] lg:h-auto pointer-events-none" />
        <div className="flex flex-col text-left lg:pl-4">
          <AnimatePresence mode="wait">
            {!chatOpen ? (
              <motion.div key="content" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <p className="text-[#3ed896] font-mono text-sm mb-4">{orbit_chat.ui.subheading}</p>
                <h2 className="text-white font-poppins text-4xl md:text-6xl font-medium mb-6">{orbit_chat.ui.heading}</h2>
                <p className="text-gray-300/80 mb-16 max-w-xl">{orbit_chat.ui.description}</p>
                <motion.button onClick={() => setChatOpen(true)} className="bg-[#5E39DA] text-white font-mono px-8 py-3 rounded-[4px]">
                  {orbit_chat.ui.cta_button}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="chat" className="w-full max-w-xl bg-[#08080a]/80 backdrop-blur-xl border border-white/10 rounded-2xl h-[500px] flex flex-col">
                <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/10">
                  <span className="text-white font-mono text-xs uppercase">{orbit_chat.system_name}</span>
                  <button onClick={() => setChatOpen(false)} className="text-white/40">✕</button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  {messages.length === 0 && (
                    <div className="text-center text-white/20 font-mono text-xs mt-10">
                      {orbit_chat.empty_state}
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-xl font-mono text-sm ${msg.role === 'user'
                        ? 'bg-[#5E39DA] text-white rounded-br-none'
                        : 'bg-white/5 text-gray-300 border border-white/5 rounded-bl-none'
                      }`}>
                        {msg.role === 'orbit' ? <GlitchTypewriter text={msg.text} /> : msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/5 rounded-bl-none flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={orbit_chat.placeholder}
                    disabled={isLoading}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#5E39DA]/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white p-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {!loaded && (
          <motion.div
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-[#020202]"
          >
            <div className="w-10 h-10 border-2 border-[#5E39DA]/20 border-t-[#5E39DA] rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
