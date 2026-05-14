'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

export default function TypewriterText({ text, speed = 50 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');

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
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
