import { ArrowLeft, Award, LogOut, ChevronRight, Edit2, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { getProfile, updateProfile } from "@/lib/api";
import { Profile as ProfileType } from "@/lib/api";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    expertise: ""
  });

  // Check if user is authenticated
  const checkAuth = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  };

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Check if user is authenticated
        if (!checkAuth()) {
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);
        
        const data = await getProfile();
        setProfile(data);
        setFormData({
          full_name: data.full_name,
          bio: data.bio || "",
          expertise: data.expertise || ""
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // If profile doesn't exist, set default values
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="app-container flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="app-container min-h-screen flex flex-col items-center justify-center p-5">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-4xl font-bold text-primary">SM</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t.profile.title}</h1>
          <p className="text-muted-foreground">
            Please log in to view and manage your profile.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="w-full h-14 text-base font-semibold rounded-xl"
          >
            {t.login.appName}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground ml-2">
            {t.profile.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    full_name: profile?.full_name || "",
                    bio: profile?.bio || "",
                    expertise: profile?.expertise || ""
                  });
                }}
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
          <ThemeToggle />
        </div>
      </header>

      {/* Profile Info */}
      <section className="px-5 mb-6 fade-in-up">
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {profile?.full_name?.charAt(0) || "SM"}
              </span>
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <Input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="text-base"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {profile?.full_name || "Sunita Mishra"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    +91 98765 43210
                  </p>
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertise">Expertise</Label>
                <Input
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  placeholder="e.g., Mathematics, Science, Class 4-6"
                />
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">{t.profile.classes}</span>
                  <span className="text-sm font-medium text-foreground">
                    Class 4, 5, 6
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">{t.profile.subjects}</span>
                  <span className="text-sm font-medium text-foreground">
                    {t.subjects.maths}, {t.subjects.evs}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">{t.profile.language}</span>
                  <span className="text-sm font-medium text-foreground">
                    {t.subjects.hindi}
                  </span>
                </div>
              </div>
              {profile?.bio && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">Bio</p>
                  <p className="text-sm text-foreground">{profile.bio}</p>
                </div>
              )}
              {profile?.expertise && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">Expertise</p>
                  <p className="text-sm text-foreground">{profile.expertise}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Language Toggle */}
      <section className="px-5 mb-6 fade-in-up-delay-1">
        <LanguageToggle />
      </section>

      {/* Resources Section */}
      <section className="px-5 mb-6 fade-in-up-delay-1">
        <button
          onClick={() => navigate("/resources")}
          className="w-full bg-card rounded-xl p-4 border border-border shadow-sm flex items-center gap-4 hover:bg-muted/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xl">📚</span>
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-medium text-foreground">{t.resources.title}</h3>
            <p className="text-sm text-muted-foreground">
              Access teaching materials, lesson plans, and professional development resources
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </section>

      {/* Certificate Section */}
      <section className="px-5 mb-6 fade-in-up-delay-2">
        <button
          onClick={() => navigate("/certificate")}
          className="w-full bg-card rounded-xl p-4 border border-border shadow-sm flex items-center gap-4 hover:bg-muted/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <Award className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-medium text-foreground">{t.profile.certificate}</h3>
            <p className="text-sm text-muted-foreground">
              {t.profile.certificateDesc}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </section>

      {/* Logout */}
      <section className="px-5 fade-in-up-delay-3">
        <Button
          variant="outline"
          className="w-full gap-2 text-muted-foreground hover:text-destructive hover:border-destructive"
        >
          <LogOut className="w-4 h-4" />
          {t.profile.logout}
        </Button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Profile;
