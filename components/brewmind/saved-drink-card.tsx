import { Coffee, Pencil } from "lucide-react";

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
import { cn } from "@/lib/utils";

interface SavedDrinkCardProps {
  name: string;
  details: string[];
  className?: string;
}

export function SavedDrinkCard({ name, details, className }: SavedDrinkCardProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <span className="mb-1 inline-flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
          <Coffee className="size-4" aria-hidden="true" />
        </span>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardAction>
          <Badge variant="outline">Saved</Badge>
        </CardAction>
        <CardDescription>Your go-to order, ready every pickup.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-wrap gap-1.5">
          {details.map((detail) => (
            <li key={detail}>
              <Badge variant="secondary">{detail}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Pencil data-icon="inline-start" />
          Edit drink
        </Button>
      </CardFooter>
    </Card>
  );
}
