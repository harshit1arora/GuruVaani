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
    <div className="app-container min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700">
      {/* Soft glow/ripple effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-blue-600/20 animate-pulse-slow"></div>
      </div>
      
      <div className="flex flex-col items-center gap-6 z-10">
        {/* GuruVani Logo with animation */}
        <div className="animate-fade-in-scale">
          <Logo size="xl" backgroundColor="bg-white/15" textColor="text-white" className="backdrop-blur-md shadow-lg border border-white/20" />
        </div>
        
        {/* App Name */}
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl font-bold text-white font-sans">
            GuruVani
          </h1>
          <p className="text-xl text-blue-100 mt-2 font-sans">
            Teaching Coach
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
