import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  name: string;
  price: string;
  credits: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
  className?: string;
}

export function PlanCard({
  name,
  price,
  credits,
  features,
  highlighted = false,
  ctaLabel = "Select plan",
  className,
}: PlanCardProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        {highlighted && (
          <CardAction>
            <Badge variant="accent">Most popular</Badge>
          </CardAction>
        )}
        <CardDescription>
          <span className="font-heading text-2xl text-foreground">{price}</span>{" "}
          / month
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">{credits}</p>
        <Separator />
        <ul className="flex flex-col gap-2 text-sm text-foreground">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={highlighted ? "default" : "outline"}>
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
