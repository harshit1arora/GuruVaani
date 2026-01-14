import { cn } from "@/lib/utils";

interface SuggestionPillProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const SuggestionPill = ({ label, onClick, className }: SuggestionPillProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium",
        "bg-secondary text-secondary-foreground",
        "border border-border",
        "whitespace-nowrap",
        "transition-all duration-200",
        "hover:bg-primary hover:text-primary-foreground",
        "active:scale-95",
        className
      )}
    >
      {label}
    </button>
  );
};

export default SuggestionPill;
