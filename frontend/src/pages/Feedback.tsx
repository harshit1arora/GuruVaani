import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Mic, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const Feedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const worked = location.state?.worked ?? true;

  const [reflection, setReflection] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="app-container min-h-screen flex items-center justify-center">
        <div className="text-center fade-in-up">
          <div className="w-16 h-16 rounded-full bg-coaching-explain flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-coaching-explain-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {t.feedback.thankYou}
          </h2>
          <p className="text-muted-foreground">
            {t.feedback.thankYouMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground ml-2">
          {t.feedback.title}
        </h1>
      </header>

      {/* Feedback Status */}
      <section className="px-5 mb-6 fade-in-up">
        <div
          className={cn(
            "rounded-xl p-4 text-center",
            worked ? "bg-coaching-explain" : "bg-secondary"
          )}
        >
          <p
            className={cn(
              "font-medium",
              worked ? "text-coaching-explain-accent" : "text-muted-foreground"
            )}
          >
            {worked
              ? t.feedback.workedMessage
              : t.feedback.tryAgainMessage}
          </p>
        </div>
      </section>

      {/* Reflection Input */}
      <section className="px-5 mb-6 fade-in-up-delay-1">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          {t.feedback.optionalReflection}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          {t.feedback.shareWhat}
        </p>

        <Textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={t.feedback.reflectionPlaceholder}
          className="min-h-[120px] resize-none mb-4"
        />

        <button
          onClick={() => setIsRecording(!isRecording)}
          className={cn(
            "w-full py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all",
            isRecording
              ? "border-destructive bg-destructive/5 text-destructive"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
          )}
        >
          <Mic className="w-5 h-5" />
          <span className="font-medium">
            {isRecording ? t.feedback.recording : t.feedback.recordVoice}
          </span>
        </button>
      </section>

      {/* Submit Button */}
      <section className="px-5 fade-in-up-delay-2">
        <Button onClick={handleSubmit} className="w-full h-14 text-base font-semibold rounded-xl">
          {reflection || isRecording ? t.feedback.submitReflection : t.feedback.skipHome}
        </Button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Feedback;
