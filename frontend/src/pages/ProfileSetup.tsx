import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { createProfile, getProfile } from "@/lib/api";
import Logo from "@/components/Logo";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  
  // State for profile setup
  const [fullName, setFullName] = useState<string>("");
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Available options
  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const subjects = ["Maths", "Hindi", "English", "Science", "EVS", "Social Science", "Computer Science"];
  
  // Check if profile already exists on component mount
  useEffect(() => {
    const checkProfileExists = async () => {
      try {
        // Try to fetch profile
        await getProfile();
        // If profile exists, redirect to home
        navigate("/home");
      } catch (error) {
        // If profile doesn't exist, continue with setup
        console.log("No existing profile found, continuing with setup");
      }
    };
    
    checkProfileExists();
  }, [navigate]);
  
  // Handlers
  const handleClassToggle = (classNum: number) => {
    setSelectedClasses(prev => 
      prev.includes(classNum)
        ? prev.filter(c => c !== classNum)
        : [...prev, classNum].sort((a, b) => a - b)
    );
  };
  
  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Prepare profile data in the format expected by the backend
      const profileData = {
        full_name: fullName,
        bio: "",
        expertise: selectedSubjects.join(", "),
        // Additional fields can be added here as needed
      };
      
      // Send data to backend
      await createProfile(profileData);
      
      // Save to local storage as backup
      localStorage.setItem("shiksha-mitra-profile", JSON.stringify({
        classes: selectedClasses,
        subjects: selectedSubjects,
        language
      }));
      
      // Navigate to home
      navigate("/home");
    } catch (err) {
      // If profile already exists error, redirect to home
      if (err instanceof Error && err.message.includes("already exists")) {
        navigate("/home");
        return;
      }
      
      // For other errors, show error message
      setError(err instanceof Error ? err.message : "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="app-container min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-5 pt-16 pb-8 text-center fade-in-up">
        <Logo size="lg" backgroundColor="bg-primary" textColor="text-primary-foreground" className="mx-auto mb-4" />
        <h1 className="text-xl font-bold text-foreground mb-2">
          Complete your profile
        </h1>
        <p className="text-sm text-muted-foreground">
          This helps us give more relevant suggestions.
        </p>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 px-5">
        <form className="space-y-8">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Full Name */}
          <div className="fade-in-up">
            <h2 className="text-base font-semibold text-foreground mb-4">
              Full Name
            </h2>
            <div className="space-y-2">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-14 px-4 border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>
          </div>
          
          {/* Classes Taught */}
          <div className="fade-in-up">
            <h2 className="text-base font-semibold text-foreground mb-4">
              Classes taught (select all that apply)
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {classes.map(classNum => (
                <div key={classNum} className="flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`class-${classNum}`} 
                      checked={selectedClasses.includes(classNum)}
                      onCheckedChange={() => handleClassToggle(classNum)}
                      className="h-5 w-5"
                    />
                    <label 
                      htmlFor={`class-${classNum}`} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {classNum}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Subjects Taught */}
          <div className="fade-in-up-delay-1">
            <h2 className="text-base font-semibold text-foreground mb-4">
              Subjects taught (select all that apply)
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map(subject => (
                <div key={subject} className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`subject-${subject}`} 
                      checked={selectedSubjects.includes(subject)}
                      onCheckedChange={() => handleSubjectToggle(subject)}
                      className="h-5 w-5"
                    />
                    <label 
                      htmlFor={`subject-${subject}`} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {subject}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Preferred Language */}
          <div className="fade-in-up-delay-2">
            <h2 className="text-base font-semibold text-foreground mb-4">
              Preferred language
            </h2>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as "en" | "hi")}
            >
              <SelectTrigger className="w-full h-14 text-base">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Submit Button */}
          <div className="fade-in-up-delay-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 text-base font-semibold rounded-xl"
            >
              {loading ? "Saving..." : "Continue"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileSetup;
