'use client';

import { useState, useRef } from 'react';

export function useSpeech() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const timeoutRef = useRef<any>(null);

  const speak = (text: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsSpeaking(true);
    
    const duration = text.length * 60; 

    timeoutRef.current = setTimeout(() => {
      setIsSpeaking(false);
    }, duration);
  };

  const startListening = (onResult: (text: string, isFinal: boolean) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const currentText = finalTranscript + interimTranscript;
      onResult(currentText, !!finalTranscript);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    return recognition;
  };

  return { isListening, isSpeaking, speak, startListening };
}
