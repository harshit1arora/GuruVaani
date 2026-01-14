import { cn } from "@/lib/utils";
import { Zap, Target, Lightbulb, Users, Volume2, VolumeX } from "lucide-react";
import { useTTS } from "@/hooks/useTTS";

type CoachingType = "now" | "activity" | "explain" | "interaction";

interface CoachingCardProps {
  type: CoachingType;
  title: string;
  content: string;
  className?: string;
}

const coachingConfig = {
  now: {
    icon: Zap,
    bgClass: "bg-coaching-now",
    accentClass: "text-coaching-now-accent",
    iconBgClass: "bg-coaching-now-accent/10",
  },
  activity: {
    icon: Target,
    bgClass: "bg-coaching-activity",
    accentClass: "text-coaching-activity-accent",
    iconBgClass: "bg-coaching-activity-accent/10",
  },
  explain: {
    icon: Lightbulb,
    bgClass: "bg-coaching-explain",
    accentClass: "text-coaching-explain-accent",
    iconBgClass: "bg-coaching-explain-accent/10",
  },
  interaction: {
    icon: Users,
    bgClass: "bg-coaching-interaction",
    accentClass: "text-coaching-interaction-accent",
    iconBgClass: "bg-coaching-interaction-accent/10",
  },
};

const CoachingCard = ({ type, title, content, className }: CoachingCardProps) => {
  const config = coachingConfig[type];
  const Icon = config.icon;
  const { speak, stop, isSpeaking } = useTTS();

  const handleTTSClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(content);
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl",
        config.bgClass,
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", config.iconBgClass)}>
            <Icon className={cn("w-5 h-5", config.accentClass)} />
          </div>
          <h3 className={cn("font-semibold text-sm", config.accentClass)}>
            {title}
          </h3>
        </div>
        <button 
          className={cn(
            "p-2 rounded-full transition-colors",
            config.iconBgClass,
            "hover:opacity-80 active:scale-95"
          )}
          onClick={handleTTSClick}
          aria-label={isSpeaking ? "Stop audio" : "Play audio"}
        >
          {isSpeaking ? (
            <VolumeX className={cn("w-4 h-4", config.accentClass)} />
          ) : (
            <Volume2 className={cn("w-4 h-4", config.accentClass)} />
          )}
        </button>
      </div>
      <p className="text-foreground text-sm leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default CoachingCard;
