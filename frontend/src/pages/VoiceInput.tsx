import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, X, ArrowLeft, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoiceListener } from "@/hooks/useVoiceListener";
import { useSystemInsights } from "@/hooks/useSystemInsights";

const VoiceInput = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { logInsight } = useSystemInsights();
  const [recordingTime, setRecordingTime] = useState(0);
  const [manualText, setManualText] = useState("");
  const [showTextFallback, setShowTextFallback] = useState(false);

  const { 
    isListening: isRecording, 
    isSupported, 
    transcript, 
    error, 
    startListening, 
    stopListening, 
    clearTranscript 
  } = useVoiceListener();

  // Show text fallback automatically if there's a network error
  useEffect(() => {
    if (error === 'network') {
      setShowTextFallback(true);
    }
  }, [error]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMicClick = () => {
    if (isRecording) {
      // Stop recording and navigate to coaching with transcript
      stopListening();
      setRecordingTime(0);
      
      // Log insight: Voice input completed
      logInsight('voice-input', 'completed', {
        transcriptLength: (transcript || "").length.toString(),
        duration: recordingTime.toString()
      });

      // Navigate even if transcript is empty, coaching page will handle errors
      navigate("/coaching", { 
        state: { 
          transcript: transcript || "",
          timestamp: Date.now() // Force refresh
        } 
      });
      
      // CRITICAL: Reset recorder state immediately after submit
      clearTranscript();
    } else {
      // Start recording
      clearTranscript();
      setShowTextFallback(false);
      startListening({
        lang: t.lang === 'hi' ? 'hi-IN' : 'en-IN',
        continuous: false,
        interimResults: true
      });
      // Log insight: Voice input started
      logInsight('voice-input', 'started');
    }
  };

  const handleTextSubmit = () => {
    if (!manualText.trim()) return;

    // Log insight: Text input submitted
    logInsight('text-input', 'completed', {
      textLength: manualText.length.toString()
    });

    navigate("/coaching", { 
      state: { 
        transcript: manualText,
        timestamp: Date.now()
      } 
    });
  };

  const handleCancel = () => {
    stopListening();
    clearTranscript();
    setRecordingTime(0);
    // Log insight: Voice input cancelled
    logInsight('voice-input', 'cancelled');
  };

  return (
    <div className="app-container pb-24 flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground ml-2">
          {t.voice.title}
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        {/* Instruction Text */}
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {isRecording ? t.voice.listening : (showTextFallback ? t.voice.useTextFallback : t.voice.speakProblem)}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isRecording
              ? t.voice.tapToDone
              : (showTextFallback ? "" : t.voice.exampleHint)}
          </p>
        </div>

        {/* Text Input Fallback */}
        {showTextFallback ? (
          <div className="w-full max-w-md space-y-4 fade-in-up">
            <div className="relative">
              <Textarea
                placeholder={t.voice.typePlaceholder}
                className="min-h-[120px] text-base p-4 rounded-2xl border-2 focus-visible:ring-primary"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
              />
            </div>
            <Button 
              className="w-full h-12 rounded-xl text-base font-semibold"
              onClick={handleTextSubmit}
              disabled={!manualText.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              {t.voice.submitText}
            </Button>
            <button 
              onClick={() => setShowTextFallback(false)}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.voice.backToVoice || "Use Voice instead"}
            </button>
          </div>
        ) : (
          <>
            {/* Transcript Display */}
            {isRecording && (
              <div className="w-full max-w-md bg-card rounded-2xl p-6 mb-8 border border-border shadow-md">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{t.voice.transcript}</h3>
                <p className="text-base text-foreground min-h-[60px] leading-relaxed">
                  {transcript || (
                    <span className="text-muted-foreground italic">{t.voice.startSpeaking || "Start speaking..."}</span>
                  )}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="w-full max-w-md bg-destructive/10 rounded-xl p-4 mb-8 border border-destructive">
                <p className="text-sm text-destructive">
                  {t.voice.error} {error}
                </p>
                {error === 'network' && (
                  <button 
                    onClick={() => setShowTextFallback(true)}
                    className="mt-2 text-xs font-semibold text-destructive underline"
                  >
                    {t.voice.useTextFallback}
                  </button>
                )}
              </div>
            )}

            {/* Unsupported Message */}
            {!isSupported && (
              <div className="w-full max-w-md bg-secondary/50 rounded-xl p-4 mb-8 border border-border">
                <p className="text-sm text-muted-foreground">
                  {t.voice.notSupported}
                </p>
                <button 
                  onClick={() => setShowTextFallback(true)}
                  className="mt-2 text-xs font-semibold text-primary underline"
                >
                  {t.voice.useTextFallback}
                </button>
              </div>
            )}

            {/* Mic Button */}
            <div className="relative mb-8">
              {/* Outer ring animation when recording */}
              {isRecording && (
                <div className="absolute inset-0 -m-4 rounded-full bg-destructive/20 animate-ping" />
              )}
              
              <button
                onClick={handleMicClick}
                className={cn(
                  "relative w-32 h-32 rounded-full flex items-center justify-center",
                  "transition-all duration-300",
                  isRecording
                    ? "bg-destructive mic-recording"
                    : "bg-primary mic-breathing"
                )}
                disabled={!isSupported}
              >
                <Mic className="w-12 h-12 text-primary-foreground" />
              </button>
            </div>

            {/* Recording Timer */}
            {isRecording && (
              <div className="fade-in-up text-center">
                <p className="text-2xl font-semibold text-foreground mb-4">
                  {formatTime(recordingTime)}
                </p>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 mx-auto rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.cancel}</span>
                </button>
              </div>
            )}

            {/* Hint when not recording */}
            {!isRecording && (
              <div className="space-y-4 text-center">
                <p className="text-xs text-muted-foreground max-w-xs fade-in-up-delay-1">
                  {t.voice.micHint}
                </p>
                <button 
                  onClick={() => setShowTextFallback(true)}
                  className="text-sm font-medium text-primary hover:underline fade-in-up-delay-2"
                >
                  {t.voice.useTextFallback}
                </button>
              </div>
            )}
          </>
        )}

        {/* Peer Wisdom Button */}
        <div className="mt-12 fade-in-up-delay-2">
          <Button
            onClick={() => navigate("/peer-wisdom")}
            variant="secondary"
            className="w-full max-w-xs h-12 text-base font-semibold rounded-xl"
          >
            <span>{t.nav.peerWisdom}</span>
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default VoiceInput;
