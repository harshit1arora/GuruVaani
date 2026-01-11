import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Clock, Users, BookOpen, Home, Sun, CloudRain, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

// Types for activity generator
interface ActivityConstraint {
  numStudents: string;
  learningLevel: string;
  timeLeft: string;
  physicalSpace: "indoor" | "outdoor";
  availableMaterials: string[];
}

interface GeneratedActivity {
  title: string;
  duration: string;
  description: string;
  roleCards: string[];
  timeLimits: string[];
  assessmentChecks: string[];
}

const ContextAwareActivityGenerator = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // State for constraints
  const [constraints, setConstraints] = useState<ActivityConstraint>({
    numStudents: "",
    learningLevel: "",
    timeLeft: "",
    physicalSpace: "indoor",
    availableMaterials: [],
  });
  
  // State for activity generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedActivity, setGeneratedActivity] = useState<GeneratedActivity | null>(null);
  const [customMaterial, setCustomMaterial] = useState("");
  
  // Available materials options
  const availableMaterialsOptions = [
    "Chalkboard",
    "Whiteboard",
    "Markers",
    "Chalk",
    "Paper",
    "Pencils",
    "Textbooks",
    "Flashcards",
    "Blocks",
    "Storybooks",
    "Scissors",
    "Glue",
    "Playdough",
    "Rulers",
    "Calculators",
  ];
  
  // Update constraint
  const updateConstraint = <K extends keyof ActivityConstraint>(key: K, value: ActivityConstraint[K]) => {
    setConstraints(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Add custom material
  const addCustomMaterial = () => {
    if (customMaterial.trim() && !constraints.availableMaterials.includes(customMaterial.trim())) {
      setConstraints(prev => ({
        ...prev,
        availableMaterials: [...prev.availableMaterials, customMaterial.trim()]
      }));
      setCustomMaterial("");
    }
  };
  
  // Remove material
  const removeMaterial = (material: string) => {
    setConstraints(prev => ({
      ...prev,
      availableMaterials: prev.availableMaterials.filter(m => m !== material)
    }));
  };
  
  // Generate activity
  const generateActivity = () => {
    // Validate constraints
    if (!constraints.numStudents || !constraints.learningLevel || !constraints.timeLeft) {
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // Mock activity generation based on constraints
      const mockActivity: GeneratedActivity = {
        title: `${constraints.learningLevel} Group Activity: ${constraints.physicalSpace === "indoor" ? "Classroom" : "Playground"} Edition`,
        duration: constraints.timeLeft,
        description: `A custom activity designed for ${constraints.numStudents} students at ${constraints.learningLevel} level. ${constraints.physicalSpace === "outdoor" ? "Conducted outside with ample space." : "Optimized for indoor classroom setting."} ${constraints.availableMaterials.length > 0 ? `Uses available materials: ${constraints.availableMaterials.join(", ")}.` : "No special materials required."}`,
        roleCards: [
          "Group Leader: Keeps everyone on task",
          "Recorder: Writes down group answers",
          "Presenter: Shares findings with class",
          "Timekeeper: Ensures time limits are followed"
        ],
        timeLimits: [
          `Introduction: ${Math.floor(parseInt(constraints.timeLeft) * 0.1)} minutes`,
          `Activity: ${Math.floor(parseInt(constraints.timeLeft) * 0.6)} minutes`,
          `Discussion: ${Math.floor(parseInt(constraints.timeLeft) * 0.2)} minutes`,
          `Assessment: ${Math.floor(parseInt(constraints.timeLeft) * 0.1)} minutes`
        ],
        assessmentChecks: [
          "Quick thumbs up/thumbs down",
          "Exit ticket with one key question",
          "Group self-assessment checklist"
        ]
      };
      
      setGeneratedActivity(mockActivity);
      setIsGenerating(false);
    }, 1500);
  };
  
  // Reset generator
  const resetGenerator = () => {
    setConstraints({
      numStudents: "",
      learningLevel: "",
      timeLeft: "",
      physicalSpace: "indoor",
      availableMaterials: [],
    });
    setGeneratedActivity(null);
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
          {t.activityGenerator.title}
        </h1>
      </header>
      
      {/* Info Banner */}
      <section className="px-5 mb-6 fade-in-up">
        <div className="bg-accent rounded-xl p-4 flex gap-3">
          <BookOpen className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-accent-foreground">
            {t.activityGenerator.infoBanner}
          </p>
        </div>
      </section>
      
      {/* Activity Generator */}
      <section className="px-5 mb-6">
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">{t.activityGenerator.constraints}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Number of Students */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t.activityGenerator.numStudents}
              </label>
              <Select 
                onValueChange={(value) => updateConstraint("numStudents", value)}
                value={constraints.numStudents}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t.activityGenerator.selectNumStudents} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-15">10-15 {t.activityGenerator.students}</SelectItem>
                  <SelectItem value="16-20">16-20 {t.activityGenerator.students}</SelectItem>
                  <SelectItem value="21-25">21-25 {t.activityGenerator.students}</SelectItem>
                  <SelectItem value="26-30">26-30 {t.activityGenerator.students}</SelectItem>
                  <SelectItem value="30+">30+ {t.activityGenerator.students}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Learning Level */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t.activityGenerator.learningLevel}
              </label>
              <Select 
                onValueChange={(value) => updateConstraint("learningLevel", value)}
                value={constraints.learningLevel}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t.activityGenerator.selectLearningLevel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">{t.activityGenerator.beginner}</SelectItem>
                  <SelectItem value="Intermediate">{t.activityGenerator.intermediate}</SelectItem>
                  <SelectItem value="Advanced">{t.activityGenerator.advanced}</SelectItem>
                  <SelectItem value="Mixed">{t.activityGenerator.mixed}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Time Left */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t.activityGenerator.timeLeft}
              </label>
              <Select 
                onValueChange={(value) => updateConstraint("timeLeft", value)}
                value={constraints.timeLeft}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t.activityGenerator.selectTimeLeft} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 {t.activityGenerator.minutes}</SelectItem>
                  <SelectItem value="20">20 {t.activityGenerator.minutes}</SelectItem>
                  <SelectItem value="30">30 {t.activityGenerator.minutes}</SelectItem>
                  <SelectItem value="45">45 {t.activityGenerator.minutes}</SelectItem>
                  <SelectItem value="60">60 {t.activityGenerator.minutes}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Physical Space */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  {constraints.physicalSpace === "indoor" ? (
                    <CloudRain className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                  {t.activityGenerator.physicalSpace}
                </label>
                <Switch 
                  checked={constraints.physicalSpace === "outdoor"}
                  onCheckedChange={(checked) => updateConstraint("physicalSpace", checked ? "outdoor" : "indoor")}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {constraints.physicalSpace === "indoor" ? t.activityGenerator.indoor : t.activityGenerator.outdoor}
              </p>
            </div>
            
            {/* Available Materials */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                {t.activityGenerator.availableMaterials}
              </label>
              
              {/* Material Selector */}
              <Select 
                onValueChange={(value) => {
                  if (!constraints.availableMaterials.includes(value)) {
                    updateConstraint("availableMaterials", [...constraints.availableMaterials, value]);
                  }
                }}
              >
                <SelectTrigger className="h-12 mb-3">
                  <SelectValue placeholder={t.activityGenerator.selectMaterial} />
                </SelectTrigger>
                <SelectContent>
                  {availableMaterialsOptions.map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Custom Material Input */}
              <div className="flex gap-2 mb-3">
                <Input 
                  placeholder={t.activityGenerator.customMaterial}
                  value={customMaterial}
                  onChange={(e) => setCustomMaterial(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={addCustomMaterial} 
                  variant="secondary"
                  disabled={!customMaterial.trim()}
                >
                  {t.add}
                </Button>
              </div>
              
              {/* Selected Materials */}
              {constraints.availableMaterials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {constraints.availableMaterials.map((material) => (
                    <div 
                      key={material}
                      className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full"
                    >
                      <Check className="w-3 h-3 text-primary" />
                      <span className="text-xs text-foreground">{material}</span>
                      <button 
                        onClick={() => removeMaterial(material)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-4 px-6">
            <Button 
              className="w-full h-12" 
              onClick={generateActivity}
              disabled={!constraints.numStudents || !constraints.learningLevel || !constraints.timeLeft || isGenerating}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  {t.activityGenerator.generating}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  {t.activityGenerator.generateActivity}
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      {/* Generated Activity */}
      {generatedActivity && (
        <section className="px-5 mb-6">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">{t.activityGenerator.generatedActivity}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={resetGenerator}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Activity Title */}
              <div>
                <h3 className="font-medium text-foreground mb-1">{generatedActivity.title}</h3>
                <p className="text-xs text-muted-foreground">{generatedActivity.duration} {t.activityGenerator.minutes}</p>
              </div>
              
              {/* Description */}
              <div>
                <p className="text-sm text-muted-foreground">{generatedActivity.description}</p>
              </div>
              
              {/* Role Cards */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t.activityGenerator.roleCards}</h4>
                <div className="space-y-2">
                  {generatedActivity.roleCards.map((role, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary font-medium">{index + 1}</span>
                      </div>
                      <p className="text-sm text-foreground">{role}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Time Limits */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t.activityGenerator.timeLimits}</h4>
                <div className="space-y-2">
                  {generatedActivity.timeLimits.map((limit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-foreground">{limit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Assessment Checks */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">{t.activityGenerator.assessmentChecks}</h4>
                <div className="space-y-2">
                  {generatedActivity.assessmentChecks.map((check, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-sm text-foreground">{check}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
      
      <BottomNav />
    </div>
  );
};

export default ContextAwareActivityGenerator;