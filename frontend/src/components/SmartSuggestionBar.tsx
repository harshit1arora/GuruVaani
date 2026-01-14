import { useState, useEffect, useMemo } from "react";
import { Lightbulb, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Types for suggestion categories
interface Suggestion {
  id: string;
  text: string;
  category: "engagement" | "concept" | "management";
}

const SmartSuggestionBar = ({ visible = true }: { visible?: boolean }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(visible);
  const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion | null>(null);
  
  // Suggestions data
  const suggestions: Suggestion[] = useMemo(() => [
    // Engagement tips
    {
      id: "1",
      text: t.smartSuggestions.engagementTip1,
      category: "engagement"
    },
    {
      id: "2",
      text: t.smartSuggestions.engagementTip2,
      category: "engagement"
    },
    {
      id: "3",
      text: t.smartSuggestions.engagementTip3,
      category: "engagement"
    },
    {
      id: "4",
      text: t.smartSuggestions.engagementTip4,
      category: "engagement"
    },
    // Concept clarification cues
    {
      id: "5",
      text: t.smartSuggestions.conceptTip1,
      category: "concept"
    },
    {
      id: "6",
      text: t.smartSuggestions.conceptTip2,
      category: "concept"
    },
    {
      id: "7",
      text: t.smartSuggestions.conceptTip3,
      category: "concept"
    },
    {
      id: "8",
      text: t.smartSuggestions.conceptTip4,
      category: "concept"
    },
    // Classroom management nudges
    {
      id: "9",
      text: t.smartSuggestions.managementTip1,
      category: "management"
    },
    {
      id: "10",
      text: t.smartSuggestions.managementTip2,
      category: "management"
    },
    {
      id: "11",
      text: t.smartSuggestions.managementTip3,
      category: "management"
    },
    {
      id: "12",
      text: t.smartSuggestions.managementTip4,
      category: "management"
    },
  ], [t]);
  
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "engagement":
        return "bg-green-100 text-green-800";
      case "concept":
        return "bg-blue-100 text-blue-800";
      case "management":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "engagement":
        return "🎯";
      case "concept":
        return "💡";
      case "management":
        return "📋";
      default:
        return "✨";
    }
  };
  
  // Rotate suggestions every 10 seconds
  useEffect(() => {
    if (!isOpen) return;
    
    // Initial suggestion
    const initialIndex = Math.floor(Math.random() * suggestions.length);
    setCurrentSuggestion(suggestions[initialIndex]);
    
    // Rotate suggestions
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * suggestions.length);
      setCurrentSuggestion(suggestions[randomIndex]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isOpen, suggestions]);
  
  if (!isOpen || !currentSuggestion) {
    return null;
  }
  
  return (
    <div className="fixed bottom-24 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border z-50">
      <div className="max-w-md mx-auto bg-card rounded-xl p-4 shadow-lg flex items-start gap-3">
        {/* Category Indicator */}
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getCategoryColor(currentSuggestion.category)}`}
        >
          {getCategoryIcon(currentSuggestion.category)}
        </div>
        
        {/* Suggestion Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-foreground line-clamp-2">
              {currentSuggestion.text}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Category Label */}
          <div className="flex items-center gap-2 mt-2">
            <Lightbulb className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground capitalize">
              {t.smartSuggestions[currentSuggestion.category]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSuggestionBar;