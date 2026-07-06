import { CircleAlert, CircleCheckBig, CirclePause, LoaderCircle } from "lucide-react";

import { Badge, type badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

export type SubscriptionStatus = "active" | "paused" | "processing" | "past_due";

const statusConfig: Record<
  SubscriptionStatus,
  {
    label: string;
    variant: VariantProps<typeof badgeVariants>["variant"];
    icon: React.ComponentType<{ className?: string }>;
    spin?: boolean;
  }
> = {
  active: { label: "Active", variant: "success", icon: CircleCheckBig },
  paused: { label: "Paused", variant: "secondary", icon: CirclePause },
  processing: { label: "Processing", variant: "accent", icon: LoaderCircle, spin: true },
  past_due: { label: "Past Due", variant: "destructive", icon: CircleAlert },
};

interface StatusBadgeProps {
  status: SubscriptionStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, variant, icon: Icon, spin } = statusConfig[status];

  return (
    <Badge variant={variant} className={className}>
      <Icon className={cn(spin && "animate-spin")} />
      {label}
    </Badge>
  );
}
