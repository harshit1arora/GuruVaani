import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import { useSystemInsights } from "@/hooks/useSystemInsights";
import OfflineIndicator from "@/components/OfflineIndicator";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import SplashScreen from "./pages/SplashScreen";
import VoiceInput from "./pages/VoiceInput";
import Coaching from "./pages/Coaching";
import Planner from "./pages/Planner";
import Resources from "./pages/Resources";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import Certificate from "./pages/Certificate";
import PeerWisdom from "./pages/PeerWisdom";
import DailyReflection from "./pages/DailyReflection";
import Login from "./pages/Login";
import ProfileSetup from "./pages/ProfileSetup";
import ContextAwareActivityGenerator from "./pages/ContextAwareActivityGenerator";
import ParentBridge from "./pages/ParentBridge";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  // Initialize service worker for offline support
  useServiceWorker();
  // Initialize system insights for anonymized usage tracking
  useSystemInsights();

  return (
    <>
      <OfflineIndicator />
      <Routes>
        {/* Redirect to dashboard by default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Keep splash screen accessible via /splash */}
        <Route path="/splash" element={<SplashScreen />} />
        
        {/* Wrap all other routes with page transition */}
        <Route path="/*" element={<PageTransition />}>
          {/* Redirect home to dashboard */}
          <Route path="home" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="voice-input" element={<VoiceInput />} />
          <Route path="coaching" element={<Coaching />} />
          <Route path="planner" element={<Planner />} />
          <Route path="resources" element={<Resources />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="profile" element={<Profile />} />
          <Route path="certificate" element={<Certificate />} />
          <Route path="peer-wisdom" element={<PeerWisdom />} />
          <Route path="daily-reflection" element={<DailyReflection />} />
          <Route path="login" element={<Login />} />
          <Route path="profile-setup" element={<ProfileSetup />} />
          <Route path="activity-generator" element={<ContextAwareActivityGenerator />} />
          <Route path="parent-bridge" element={<ParentBridge />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
