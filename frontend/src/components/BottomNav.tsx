import { Calendar, Mic, MessageSquare, BookOpen, User, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: BarChart3, label: "My Support Space", path: "/dashboard" },
    { icon: Calendar, label: t.nav.planner, path: "/planner" },
    { icon: Mic, label: t.nav.ask, path: "/voice-input", isMain: true },
    { icon: BookOpen, label: t.nav.resources, path: "/resources" },
    { icon: User, label: t.nav.profile, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pb-safe-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isMain) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center -mt-6",
                  "w-16 h-16 rounded-full bg-primary text-primary-foreground",
                  "shadow-lg active:scale-95 transition-transform"
                )}
              >
                <Icon className="w-7 h-7" />
              </button>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3",
                "transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
