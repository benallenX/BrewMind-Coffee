import { Coffee } from "lucide-react";

export function BrewMindLogo({
  className,
  wordmarkClassName,
}: {
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Coffee className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span
        className={`text-lg font-bold tracking-tight text-foreground ${
          wordmarkClassName ?? ""
        }`}
      >
        BrewMind
      </span>
    </span>
  );
}
