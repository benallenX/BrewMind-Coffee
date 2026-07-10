import { Coffee } from "lucide-react";

import { cn } from "@/lib/utils";

const sizes = {
  sm: {
    chip: "size-6 rounded-md",
    icon: "size-3.5",
    wordmark: "text-sm",
  },
  default: {
    chip: "size-8 rounded-lg",
    icon: "size-4",
    wordmark: "text-lg",
  },
  lg: {
    chip: "size-10 rounded-xl",
    icon: "size-5",
    wordmark: "text-2xl",
  },
} as const;

interface BrandMarkProps {
  size?: keyof typeof sizes;
  showWordmark?: boolean;
  className?: string;
}

export function BrandMark({
  size = "default",
  showWordmark = true,
  className,
}: BrandMarkProps) {
  const tokens = sizes[size];

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center bg-primary text-primary-foreground",
          tokens.chip
        )}
      >
        <Coffee className={tokens.icon} aria-hidden="true" />
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-heading leading-none font-semibold tracking-tight text-foreground",
            tokens.wordmark
          )}
        >
          BrewMind <span className="text-primary">Coffee</span>
        </span>
      )}
    </div>
  );
}
