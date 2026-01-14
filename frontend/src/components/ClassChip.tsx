import { cn } from "@/lib/utils";

interface ClassChipProps {
  classNumber: number;
  isSelected: boolean;
  onClick: () => void;
}

const ClassChip = ({ classNumber, isSelected, onClick }: ClassChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-11 w-11 rounded-full font-semibold text-base transition-all duration-200",
        "flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-95",
        isSelected
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-card text-foreground border border-border hover:border-primary/30"
      )}
      aria-label={`Select Class ${classNumber}`}
      aria-pressed={isSelected}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {classNumber}
    </button>
  );
};

export default ClassChip;
