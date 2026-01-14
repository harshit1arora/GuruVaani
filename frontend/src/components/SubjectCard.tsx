import { cn } from "@/lib/utils";
import { Calculator, BookOpen, Microscope, Leaf, Globe } from "lucide-react";

type SubjectType = "maths" | "hindi" | "science" | "evs" | "social";

interface SubjectCardProps {
  subject: SubjectType;
  isSelected: boolean;
  onClick: () => void;
}

const subjectConfig = {
  maths: {
    label: "Maths",
    icon: Calculator,
    bgClass: "bg-gradient-to-br from-[#1E40AF] to-[#3B82F6]",
    iconClass: "text-white",
    textClass: "text-white",
    selectedBorder: "border-[#60A5FA]",
  },
  hindi: {
    label: "Hindi",
    icon: BookOpen,
    bgClass: "bg-gradient-to-br from-[#4C1D95] to-[#8B5CF6]",
    iconClass: "text-white",
    textClass: "text-white",
    selectedBorder: "border-[#A78BFA]",
  },
  science: {
    label: "Science",
    icon: Microscope,
    bgClass: "bg-gradient-to-br from-[#0E7490] to-[#06B6D4]",
    iconClass: "text-white",
    textClass: "text-white",
    selectedBorder: "border-[#22D3EE]",
  },
  evs: {
    label: "EVS",
    icon: Leaf,
    bgClass: "bg-gradient-to-br from-[#15803D] to-[#22C55E]",
    iconClass: "text-white",
    textClass: "text-white",
    selectedBorder: "border-[#4ADE80]",
  },
  social: {
    label: "Social Science",
    icon: Globe,
    bgClass: "bg-gradient-to-br from-[#991B1B] to-[#EF4444]",
    iconClass: "text-white",
    textClass: "text-white",
    selectedBorder: "border-[#FCA5A5]",
  },
};

const SubjectCard = ({ subject, isSelected, onClick }: SubjectCardProps) => {
  const config = subjectConfig[subject];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300",
        "w-full h-28 relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        config.bgClass,
        isSelected
          ? `border-2 ${config.selectedBorder} shadow-2xl scale-105 z-10`
          : "border border-transparent hover:border-white/20 shadow-lg hover:shadow-xl hover:scale-105",
        "active:scale-95"
      )}
      aria-label={`Select ${config.label} subject`}
      aria-pressed={isSelected}
      role="option"
      aria-selected={isSelected}
    >
      {/* Background shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
      
      <Icon className={cn("w-10 h-10 mb-2 transition-all duration-300 group-hover:scale-110", config.iconClass)} />
      <span className={cn("font-semibold text-sm transition-all duration-300 group-hover:scale-105", config.textClass)}>
        {config.label}
      </span>
      
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </button>
  );
};

export default SubjectCard;
