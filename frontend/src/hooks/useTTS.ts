import { useState, useEffect } from 'react';

interface TTSOptions {
  lang?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

export const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Check if TTS is supported in the browser
  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  // Create a new utterance when options change
  const createUtterance = (text: string, options: TTSOptions = {}) => {
    if (!isSupported) return null;

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.lang = options.lang || 'en-IN'; // Default to Indian English
    newUtterance.pitch = options.pitch || 1;
    newUtterance.rate = options.rate || 1;
    newUtterance.volume = options.volume || 1;

    newUtterance.onstart = () => setIsSpeaking(true);
    newUtterance.onend = () => setIsSpeaking(false);
    newUtterance.onerror = () => setIsSpeaking(false);

    return newUtterance;
  };

  // Speak text
  const speak = (text: string, options: TTSOptions = {}) => {
    if (!isSupported) return false;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const newUtterance = createUtterance(text, options);
    if (newUtterance) {
      setUtterance(newUtterance);
      window.speechSynthesis.speak(newUtterance);
      return true;
    }
    return false;
  };

  // Stop speaking
  const stop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Pause speaking
  const pause = () => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsSpeaking(false);
  };

  // Resume speaking
  const resume = () => {
    if (!isSupported) return;
    window.speechSynthesis.resume();
    setIsSpeaking(true);
  };

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
    pause,
    resume,
  };
};