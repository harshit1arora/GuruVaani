import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page after 2 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="app-container min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        {/* GuruVani Logo */}
        <Logo size="xl" backgroundColor="bg-primary" textColor="text-primary-foreground" />
        
        {/* App Name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            GuruVani
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Teaching Coach
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
