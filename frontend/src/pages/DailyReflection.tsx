import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, X, Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import SmartSuggestionBar from "@/components/SmartSuggestionBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useSystemInsights } from "@/hooks/useSystemInsights";

const DailyReflection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { logInsight } = useSystemInsights();
  
  // State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string[]>([]);
  
  // 60-second timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 60) {
            handleStopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording, handleStopRecording]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  const handleMicClick = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      // Log insight: Recording started
      logInsight('daily-reflection', 'recording-start');
    }
  };
  
  const handleStopRecording = useCallback(() => {
    setIsRecording(false);
    // Log insight: Recording stopped
    logInsight('daily-reflection', 'recording-stop', {
      recordingDuration: recordingTime.toString()
    });
    // Simulate AI analysis and generate feedback
    generateAIFeedback();
    setSubmitted(true);
  }, [logInsight, recordingTime, generateAIFeedback]);
  
  const handleCancel = () => {
    setIsRecording(false);
    setRecordingTime(0);
    // Log insight: Recording cancelled
    logInsight('daily-reflection', 'recording-cancel');
  };
  
  // Mock AI feedback generation based on "patterns"
  const generateAIFeedback = useCallback(() => {
    // Mock patterns - in real app, these would come from analyzing past reflections
    const mockPatterns = [
      "fast finishers",
      "zero confusion",
      "group work"
    ];
    
    const randomPattern = mockPatterns[Math.floor(Math.random() * mockPatterns.length)];
    let feedback: string[] = [];
    
    switch (randomPattern) {
      case "fast finishers":
        feedback = [
          "You've mentioned 'fast finishers' 3 times this week. Here are 5 extension activities:",
          "1. Create challenge cards with additional problems",
          "2. Set up a 'genius corner' with enrichment materials",
          "3. Ask them to create their own problems",
          "4. Pair them with peers who need support",
          "5. Introduce mini-projects related to the topic"
        ];
        break;
      case "zero confusion":
        feedback = [
          "You solved 'zero confusion' well! Share your method with other teachers?",
          "Your approach of using real-life examples really resonated with students.",
          "Consider documenting this strategy in the Peer Wisdom section."
        ];
        break;
      case "group work":
        feedback = [
          "Next week, try this one small new technique for group work:",
          "Assign clear roles (leader, recorder, presenter) to each group member.",
          "This helps distribute responsibility and keeps everyone engaged."
        ];
        break;
      default:
        feedback = [
          "Great reflection! Keep up the good work.",
          "Remember to celebrate small wins with your students.",
          "Consider trying a new classroom management technique this week."
        ];
    }
    
    setAiFeedback(feedback);
    
    // Log insight: Feedback generated
    logInsight('daily-reflection', 'feedback-generated', {
      patternType: randomPattern,
      feedbackLength: feedback.length.toString()
    });
    
    // Save reflection to local storage (mock data)
    saveReflectionToStorage(feedback);
  }, [logInsight, saveReflectionToStorage]);
  
  const saveReflectionToStorage = useCallback((feedback: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    const reflections = JSON.parse(localStorage.getItem('shiksha-mitra-reflections') || '[]');
    
    reflections.push({
      date: today,
      recordingTime: recordingTime,
      feedback: feedback
    });
    
    localStorage.setItem('shiksha-mitra-reflections', JSON.stringify(reflections));
  }, [recordingTime]);
  
  return (
    <div className="app-container pb-24 flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center">
        <button
          onClick={() => navigate("/home")}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground ml-2">
          {t.dailyReflection.title}
        </h1>
      </header>
      
      {!submitted ? (
        /* Recording Screen */
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          {/* Question Text */}
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {isRecording ? t.dailyReflection.recording : t.dailyReflection.question}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isRecording
                ? t.dailyReflection.recordingHint 
                : t.dailyReflection.instruction}
            </p>
          </div>
          
          {/* Recording Timer */}
          {isRecording && (
            <div className="mb-8 fade-in-up">
              <p className={`text-3xl font-semibold ${
                recordingTime > 50 ? "text-destructive" : "text-foreground"
              }`}>
                {formatTime(recordingTime)}/1:00
              </p>
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
                  ? "bg-destructive"
                  : "bg-primary"
              )}
            >
              <Mic className="w-12 h-12 text-primary-foreground" />
            </button>
          </div>
          
          {/* Cancel Button */}
          {isRecording && (
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="text-sm font-medium">{t.dailyReflection.cancel}</span>
            </button>
          )}
        </div>
      ) : (
        /* Feedback Screen */
        <div className="flex-1 px-5 py-8">
          {/* Success Indicator */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-coaching-explain flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-coaching-explain-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {t.dailyReflection.submitted}
            </h2>
            <p className="text-muted-foreground mt-2">
              {t.dailyReflection.feedbackTitle}
            </p>
          </div>
          
          {/* AI Feedback */}
          <div className="bg-secondary/50 rounded-xl p-6 border border-border space-y-3">
            {aiFeedback.map((line, index) => (
              <p key={index} className="text-sm text-foreground">
                {line}
              </p>
            ))}
          </div>
          
          {/* Done Button */}
          <div className="mt-8">
            <Button
              onClick={() => navigate("/home")}
              className="w-full h-14 text-base font-semibold rounded-xl"
            >
              {t.dailyReflection.done}
            </Button>
          </div>
        </div>
      )}
      
      <SmartSuggestionBar />
      <BottomNav />
    </div>
  );
};

export default DailyReflection;
