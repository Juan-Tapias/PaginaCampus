'use client';

import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  lines: { text: string; color: string }[];
}

export default function TypewriterContent({ lines }: TypewriterProps) {
  const [cursor, setCursor] = useState<[number, number]>([0, 0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCursor([0, 0]);
    intervalRef.current = setInterval(() => {
      setCursor((prev) => {
        const [li, ci] = prev;
        if (li >= lines.length) return prev;

        if (ci < lines[li].text.length) {
          return [li, ci + 1];
        }

        if (li < lines.length - 1) {
          return [li + 1, 0];
        }

        setTimeout(() => {
          setCursor([0, 0]);
        }, 4000);

        return [li + 1, 0];
      });
    }, 55);
    return () => clearInterval(intervalRef.current!);
  }, [lines]);

  const [currentLine, currentChar] = cursor;

  return (
    <div className="h-[180px] md:h-[340px] overflow-hidden relative font-mono text-[11px] md:text-[20px] text-center tracking-tight px-4 flex flex-col items-center">
      <div 
        className="transition-transform duration-800 ease-in-out"
        style={{ transform: `translateY(-${Math.max(0, currentLine - 6) * 2.5}em)` }}
      >
        {lines.map((line, i) => {
          if (i < currentLine) {
            return (
              <div key={i} className={`min-h-[2.5em] flex items-center justify-center opacity-40 transition-all duration-700 ${line.color}`}>
                {line.text}
              </div>
            );
          }
          // Línea siendo escrita
          if (i === currentLine) {
            return (
              <div key={i} className={`min-h-[2.5em] flex items-center justify-center transition-all duration-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)] ${line.color}`}>
                {line.text.slice(0, currentChar)}
                <span className="animate-pulse text-cyan-400 ml-1">▌</span>
              </div>
            );
          }
          // Futuras líneas
          return <div key={i} className="min-h-[2.5em]" />;
        })}
      </div>
      
    </div>
  );
}
