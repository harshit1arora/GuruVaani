import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
      <p className="text-sm font-medium text-foreground mb-3">
        {t.profile.languageToggle}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setLanguage("en")}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all",
            language === "en"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {t.profile.english}
        </button>
        <button
          onClick={() => setLanguage("hi")}
          className={cn(
            "flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all",
            language === "hi"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {t.profile.hindi}
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
