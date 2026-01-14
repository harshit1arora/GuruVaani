import { useState, useEffect } from "react";
import { WifiOff, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Hide indicator after 3 seconds when back online
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Show indicator if already offline on mount
    if (!navigator.onLine) {
      setShowIndicator(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showIndicator) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 py-2 text-center text-sm font-medium transition-all",
        isOnline
          ? "bg-coaching-explain text-coaching-explain-accent"
          : "bg-secondary text-foreground"
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>Back online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>{t.offline.indicator}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{t.offline.available}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
