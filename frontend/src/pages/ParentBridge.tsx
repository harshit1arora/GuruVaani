import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Play, Square, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

// Types for parent communication
interface ParentMessage {
  id: string;
  title: string;
  content: string;
  week: string;
  class: string;
  subject: string;
  studentProgress: string[];
  homeActivities: string[];
}

const ParentBridge = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // State for message generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<ParentMessage | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    week: "Week 1",
    className: "Class 5",
    subject: "Mathematics",
    studentHighlight: "",
  });
  
  // Update form data
  const updateFormData = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Generate parent message
  const generateParentMessage = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // Mock AI-generated message
      const mockMessage: ParentMessage = {
        id: Date.now().toString(),
        title: `${formData.className} ${formData.subject} - ${formData.week}`,
        content: `Hello parents! This week in ${formData.className} ${formData.subject}, our students learned about ${formData.subject.toLowerCase()} fundamentals. They showed great progress in understanding basic concepts and participating in class activities. Here are some highlights from the week and simple activities you can do at home using local materials.`,
        week: formData.week,
        class: formData.className,
        subject: formData.subject,
        studentProgress: [
          `Students demonstrated improved understanding of ${formData.subject.toLowerCase()} basics`,
          "Active participation in group activities",
          "Progress in problem-solving skills",
          "Increased confidence in class discussions"
        ],
        homeActivities: [
          `Practice counting objects around the house (for ${formData.subject.toLowerCase()}) using stones or seeds`,
          `Create simple ${formData.subject.toLowerCase()} problems based on daily routines`,
          `Use local materials like leaves or sticks to demonstrate ${formData.subject.toLowerCase()} concepts`,
          `Ask your child to explain what they learned in class today`
        ]
      };
      
      setGeneratedMessage(mockMessage);
      setIsGenerating(false);
    }, 1500);
  };
  
  // Play/pause voice message
  const togglePlayback = () => {
    setIsPlaying(prev => !prev);
    // In real app, this would control actual voice playback
  };
  
  // Share message
  const shareMessage = () => {
    if (generatedMessage) {
      // In real app, this would handle sharing functionality
      alert(t.parentBridge.messageShared);
    }
  };
  
  return (
    <div className="app-container pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground ml-2">
          {t.parentBridge.title}
        </h1>
      </header>
      
      {/* Info Banner */}
      <section className="px-5 mb-6 fade-in-up">
        <div className="bg-accent rounded-xl p-4 flex gap-3">
          <Mic className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-accent-foreground">
            {t.parentBridge.infoBanner}
          </p>
        </div>
      </section>
      
      {/* Message Generator Form */}
      <section className="px-5 mb-6">
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">{t.parentBridge.generateMessage}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Week Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t.parentBridge.week}
              </label>
              <Select 
                onValueChange={(value) => updateFormData("week", value)}
                value={formData.week}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t.parentBridge.selectWeek} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Week 1">{t.parentBridge.week1}</SelectItem>
                  <SelectItem value="Week 2">{t.parentBridge.week2}</SelectItem>
                  <SelectItem value="Week 3">{t.parentBridge.week3}</SelectItem>
                  <SelectItem value="Week 4">{t.parentBridge.week4}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Class Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t.parentBridge.className}
              </label>
              <Select 
                onValueChange={(value) => updateFormData("className", value)}
                value={formData.className}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t.parentBridge.selectClass} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 1">{t.parentBridge.class1}</SelectItem>
                  <SelectItem value="Class 2">{t.parentBridge.class2}</SelectItem>
                  <SelectItem value="Class 3">{t.parentBridge.class3}</SelectItem>
                  <SelectItem value="Class 4">{t.parentBridge.class4}</SelectItem>
                  <SelectItem value="Class 5">{t.parentBridge.class5}</SelectItem>
                  <SelectItem value="Class 6">{t.parentBridge.class6}</SelectItem>
                  <SelectItem value="Class 7">{t.parentBridge.class7}</SelectItem>
                  <SelectItem value="Class 8">{t.parentBridge.class8}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Subject Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t.parentBridge.subject}
              </label>
              <Select 
                onValueChange={(value) => updateFormData("subject", value)}
                value={formData.subject}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t.parentBridge.selectSubject} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">{t.parentBridge.math}</SelectItem>
                  <SelectItem value="Science">{t.parentBridge.science}</SelectItem>
                  <SelectItem value="English">{t.parentBridge.english}</SelectItem>
                  <SelectItem value="Hindi">{t.parentBridge.hindi}</SelectItem>
                  <SelectItem value="Social Studies">{t.parentBridge.social}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-4 px-6">
            <Button 
              className="w-full h-12" 
              onClick={generateParentMessage}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  {t.parentBridge.generating}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  {t.parentBridge.generateButton}
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      {/* Generated Message */}
      {generatedMessage && (
        <section className="px-5 mb-6">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">{generatedMessage.title}</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={togglePlayback}
                  >
                    {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={shareMessage}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Message Content */}
              <div>
                <p className="text-sm text-foreground">{generatedMessage.content}</p>
              </div>
              
              {/* Student Progress Highlights */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t.parentBridge.progressHighlights}</h4>
                <div className="space-y-2">
                  {generatedMessage.studentProgress.map((progress, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-green-800 font-medium">✓</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{progress}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Home Activities */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t.parentBridge.homeActivities}</h4>
                <div className="space-y-3">
                  {generatedMessage.homeActivities.map((activity, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3 py-2">
                      <p className="text-sm text-foreground">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4 px-6 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full h-12"
                onClick={generateParentMessage}
              >
                {t.parentBridge.regenerate}
              </Button>
            </CardFooter>
          </Card>
        </section>
      )}
      
      <BottomNav />
    </div>
  );
};

export default ParentBridge;