'use client';

import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  lines: { text: string; color: string }[];
  className?: string;
  lineClassName?: string;
  align?: 'center' | 'left';
  scrolling?: boolean;
}

export default function TypewriterContent({
  lines,
  className,
  lineClassName,
  align = 'center',
  scrolling = true,
}: TypewriterProps) {
  const [cursor, setCursor] = useState<[number, number]>([0, 0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCursor((prev) => {
        const [li, ci] = prev;
        if (li >= lines.length) return [0, 0];

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

  const alignmentClass = align === 'left' ? 'items-start text-left' : 'items-center text-center';
  const lineAlignmentClass = align === 'left' ? 'justify-start' : 'justify-center';

  return (
    <div className={`relative flex flex-col overflow-hidden font-mono tracking-tight ${alignmentClass} ${className ?? 'h-[180px] md:h-[340px] text-[11px] md:text-[20px] px-4'}`}>
      <div 
        className="transition-transform duration-800 ease-in-out"
        style={{ transform: scrolling ? `translateY(-${Math.max(0, currentLine - 6) * 2.5}em)` : 'none' }}
      >
        {lines.map((line, i) => {
          if (i < currentLine) {
            return (
              <div key={i} className={`min-h-[2.5em] flex items-center ${lineAlignmentClass} transition-all duration-700 ${lineClassName ?? ''} ${line.color}`}>
                {line.text}
              </div>
            );
          }
          // Línea siendo escrita
          if (i === currentLine) {
            return (
              <div key={i} className={`min-h-[2.5em] flex items-center ${lineAlignmentClass} transition-all duration-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)] ${lineClassName ?? ''} ${line.color}`}>
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
