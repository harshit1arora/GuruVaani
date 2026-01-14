import { useState, useEffect, useCallback } from 'react';

// Type declarations for SpeechRecognition API
interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface VoiceListenerOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export const useVoiceListener = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Check if Speech Recognition is supported in the browser
  useEffect(() => {
    interface WindowWithSpeechRecognition extends Window {
      SpeechRecognition?: new () => SpeechRecognition;
      webkitSpeechRecognition?: new () => SpeechRecognition;
    }
    
    const SpeechRecognition = (window as WindowWithSpeechRecognition).SpeechRecognition || (window as WindowWithSpeechRecognition).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      setRecognition(recognitionInstance);

      return () => {
        recognitionInstance.stop();
      };
    }
  }, []);

  // Configure recognition settings
  const configureRecognition = useCallback((options: VoiceListenerOptions = {}) => {
    if (!recognition) return;

    recognition.lang = options.lang || 'en-IN'; // Default to Indian English
    recognition.continuous = options.continuous || false;
    recognition.interimResults = options.interimResults || true;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update transcript with final or interim results
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [recognition]);

  // Start listening
  const startListening = useCallback((options: VoiceListenerOptions = {}) => {
    if (!recognition || isListening) return false;

    configureRecognition(options);
    recognition.start();
    return true;
  }, [recognition, isListening, configureRecognition]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognition || !isListening) return;
    recognition.stop();
    setIsListening(false);
  }, [recognition, isListening]);

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
    clearTranscript,
  };
};