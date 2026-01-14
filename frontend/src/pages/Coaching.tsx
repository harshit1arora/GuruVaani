import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ThumbsUp, RotateCcw, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import CoachingCard from "@/components/CoachingCard";
import SuggestionPill from "@/components/SuggestionPill";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { queryCoach, CoachResponse } from "@/lib/api";

// Type for student performance level
type StudentLevel = "fast" | "onTrack" | "struggling";

const Coaching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<StudentLevel | null>(null);
  const [showPerformanceSection, setShowPerformanceSection] = useState(true);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coachData, setCoachData] = useState<CoachResponse | null>(null);
  
  const transcript = location.state?.transcript || "";
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCoaching = async () => {
      if (!transcript) {
        setError("No problem statement provided. Please try speaking again.");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        // Using fixed context for now as per instructions (Class 5, Maths)
        // In a real app, these would come from user session/profile
        const response = await queryCoach(
          "Grade 5", 
          "Maths", 
          transcript, 
          language === 'hi' ? "Hindi" : "English"
        );
        setCoachData(response);
      } catch (err) {
        console.error("Coaching Error:", err);
        setError(err instanceof Error ? err.message : "Failed to get AI coaching");
      } finally {
        setIsLoading(false);
      }
    };

    if (transcript && !hasFetched.current) {
      fetchCoaching();
      hasFetched.current = true;
    }
  }, [transcript, language]);

  const coachingCards = coachData ? [
    {
      type: "now" as const,
      title: coachData.now_fix.title,
      content: coachData.now_fix.text,
    },
    {
      type: "activity" as const,
      title: coachData.activity.title,
      content: coachData.activity.text,
    },
    {
      type: "explain" as const,
      title: coachData.explain.title,
      content: coachData.explain.text,
    },
  ] : [];

  const suggestions = [
    t.coaching.suggestions.another,
    t.coaching.suggestions.simpler,
    t.coaching.suggestions.local,
    t.coaching.suggestions.reduce,
  ];

  // Student performance-based suggestions
  const performanceSuggestions = {
    fast: [
      {
        title: t.coaching.performance.fastFinishers.challenge,
        content: "Provide extension activities: 'Create your own problem similar to what we're learning' or 'Explain this concept to a classmate.'",
      },
      {
        title: t.coaching.performance.fastFinishers.lead,
        content: "Assign them as peer helpers: 'Can you help a classmate who's still working?' This reinforces their learning while supporting others.",
      },
      {
        title: t.coaching.performance.fastFinishers.explore,
        content: "Give them a related real-world problem to solve: 'How would this concept work in our daily lives?'",
      },
    ],
    onTrack: [
      {
        title: t.coaching.performance.onTrack.reinforce,
        content: "Provide practice worksheets with varied difficulty levels to solidify their understanding.",
      },
      {
        title: t.coaching.performance.onTrack.collaborate,
        content: "Pair them with another on-track student for a peer-review activity: 'Check each other's work and explain your thinking.'",
      },
      {
        title: t.coaching.performance.onTrack.apply,
        content: "Ask them to demonstrate the concept using manipulatives or drawings to deepen their comprehension.",
      },
    ],
    struggling: [
      {
        title: t.coaching.performance.struggling.simplify,
        content: "Break the task into smaller, manageable steps: 'Let's do the first two problems together.'",
      },
      {
        title: t.coaching.performance.struggling.visualize,
        content: "Use visual aids: 'Let's draw this out step by step.' Diagrams help make abstract concepts concrete.",
      },
      {
        title: t.coaching.performance.struggling.support,
        content: "Offer targeted support: 'I'll sit with you for 5 minutes to help you get started.' Provide positive reinforcement for effort.",
      },
    ],
  };

  const handleFeedback = (worked: boolean) => {
    navigate("/feedback", { state: { worked } });
  };

  return (
    <div className="app-container pb-32 bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center sticky top-0 bg-background/95 backdrop-blur-sm z-10 shadow-lg border-b border-border">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors transform hover:scale-110 duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-semibold text-foreground">
            {t.coaching.title}
          </h1>
          <p className="text-xs text-muted-foreground">
            Class 5 • {t.subjects.maths}
          </p>
        </div>
      </header>

      {/* Problem Statement */}
      <section className="px-5 mb-6 animate-fade-in-up">
        <div className="bg-card rounded-xl p-4 border border-border shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground mb-1">{t.coaching.yourConcern}</p>
          <p className="text-foreground font-medium italic">
            "{transcript || "No problem recorded"}"
          </p>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="px-5 py-12 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-foreground font-medium">{t.coaching.aiThinking || "GuruVaani is thinking..."}</p>
          <p className="text-muted-foreground text-sm mt-1">Getting practical advice for your class</p>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="px-5 mb-6">
          <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-destructive font-medium">Error</p>
              <p className="text-sm text-destructive/80">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 border-destructive/20 text-destructive hover:bg-destructive/10"
                onClick={() => window.location.reload()}
              >
                <RotateCcw className="w-3.5 h-3.5 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Coaching Cards */}
      <section className="px-5 space-y-4 mb-6">
        {coachingCards.map((card, index) => (
          <CoachingCard
            key={index}
            type={card.type}
            title={card.title}
            content={card.content}
            className={`fade-in-up-delay-${index + 1} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          />
        ))}
        
        {!isLoading && !error && coachingCards.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Speak your classroom problem to get AI coaching.</p>
            <Button 
              className="mt-4" 
              onClick={() => navigate("/voice-input")}
            >
              Go to Voice Input
            </Button>
          </div>
        )}
      </section>

      {/* Suggestion Bar */}
      <section className="px-5 mb-8 animate-fade-in-up-delay-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
          {t.coaching.quickAdjustments}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {suggestions.map((suggestion) => (
            <SuggestionPill
              key={suggestion}
              label={suggestion}
              onClick={() => {}}
              className="hover:scale-105 transition-all duration-200"
            />
          ))}
        </div>
      </section>

      {/* Student Performance-Based Suggestions */}
      <section className="px-5 mb-8 animate-fade-in-up-delay-3">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:text-primary transition-colors"
          onClick={() => setShowPerformanceSection(!showPerformanceSection)}
        >
          <h2 className="text-base font-medium text-foreground">
            {t.coaching.performance.title}
          </h2>
          <ChevronDown 
            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${showPerformanceSection ? 'rotate-180' : ''}`}
          />
        </div>

        {showPerformanceSection && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {t.coaching.performance.subtitle}
            </p>
            
            {/* Student Level Selection */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setSelectedLevel(prev => prev === 'fast' ? null : 'fast')}
                className={`p-3 rounded-xl border transition-all duration-300 shadow-lg hover:shadow-xl ${selectedLevel === 'fast' 
                  ? 'border-primary bg-primary/10 text-primary transform scale-105'
                  : 'border-border bg-card hover:bg-secondary hover:border-primary/50'}`}
              >
                <p className="text-sm font-medium">{t.coaching.performance.fastFinishers.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.coaching.performance.fastFinishers.description}
                </p>
              </button>
              
              <button
                onClick={() => setSelectedLevel(prev => prev === 'onTrack' ? null : 'onTrack')}
                className={`p-3 rounded-xl border transition-all duration-300 shadow-lg hover:shadow-xl ${selectedLevel === 'onTrack' 
                  ? 'border-primary bg-primary/10 text-primary transform scale-105'
                  : 'border-border bg-card hover:bg-secondary hover:border-primary/50'}`}
              >
                <p className="text-sm font-medium">{t.coaching.performance.onTrack.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.coaching.performance.onTrack.description}
                </p>
              </button>
              
              <button
                onClick={() => setSelectedLevel(prev => prev === 'struggling' ? null : 'struggling')}
                className={`p-3 rounded-xl border transition-all duration-300 shadow-lg hover:shadow-xl ${selectedLevel === 'struggling' 
                  ? 'border-primary bg-primary/10 text-primary transform scale-105'
                  : 'border-border bg-card hover:bg-secondary hover:border-primary/50'}`}
              >
                <p className="text-sm font-medium">{t.coaching.performance.struggling.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.coaching.performance.struggling.description}
                </p>
              </button>
            </div>
            
            {/* Selected Level Suggestions */}
            {selectedLevel && (
              <div className="space-y-4">
                {performanceSuggestions[selectedLevel].map((suggestion, index) => (
                  <div 
                    key={index}
                    className={`bg-card rounded-xl p-4 border border-border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 fade-in-up-delay-${index + 1}`}
                  >
                    <h3 className="font-medium text-foreground text-sm mb-2">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.content}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Feedback Section */}
      <section className="px-5 animate-fade-in-up-delay-4">
        <p className="text-sm text-muted-foreground text-center mb-4">
          {t.coaching.didThisHelp}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleFeedback(true)}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-gradient-to-r from-coaching-explain to-coaching-explain/90 text-coaching-explain-accent font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-98"
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{t.coaching.thisWorked}</span>
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-card border border-border text-muted-foreground font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:border-primary/50 transform hover:-translate-y-0.5 active:scale-98"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t.coaching.tryAgain}</span>
          </button>
        </div>
      </section>

      {/* Peer Wisdom Button */}
      <section className="px-5 mt-6 animate-fade-in-up-delay-5">
        <Button
          onClick={() => navigate("/peer-wisdom")}
          variant="secondary"
          className="w-full h-14 text-base font-semibold rounded-xl bg-card hover:bg-card/80 text-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <span>{t.nav.peerWisdom}</span>
        </Button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Coaching;
