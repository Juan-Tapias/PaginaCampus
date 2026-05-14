'use client';

import { useState, useEffect } from 'react';

interface GlitchTypewriterProps {
  text: string;
}

export default function GlitchTypewriter({ text }: GlitchTypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;
    const result = Array(text.length).fill('');
    let currentIdx = 0;
    let glitchCount = 0;
    const GLITCH_STEPS = 5; 

    const interval = setInterval(() => {
      if (currentIdx >= text.length) {
        setDisplayedText(text);
        clearInterval(interval);
        return;
      }

      if (glitchCount < GLITCH_STEPS) {
        const glitch = Math.random() > 0.5 ? '1' : '0';
        setDisplayedText(result.slice(0, currentIdx).join('') + glitch);
        glitchCount++;
      } else {
        result[currentIdx] = text[currentIdx];
        setDisplayedText(result.slice(0, currentIdx + 1).join(''));
        currentIdx++;
        glitchCount = 0;
      }
    }, 10); 

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}
