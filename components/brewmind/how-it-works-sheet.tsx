import { Bookmark, Clock, CupSoda } from "lucide-react";

import { Button, type buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const steps = [
  {
    icon: CupSoda,
    title: "Choose your plan",
    description: "Pick the monthly plan that matches how much coffee you drink.",
  },
  {
    icon: Bookmark,
    title: "Save your drink",
    description: "Set your go-to order once so it's ready every time.",
  },
  {
    icon: Clock,
    title: "Pick up on schedule",
    description: "Choose a weekly day and a fifteen-minute pickup window.",
  },
];

interface HowItWorksSheetProps {
  label?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

export function HowItWorksSheet({
  label = "See how it works",
  variant = "outline",
}: HowItWorksSheetProps) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant={variant} />}>{label}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>How BrewMind works</SheetTitle>
          <SheetDescription>
            Three steps between you and coffee that&apos;s already waiting.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <step.icon className="size-4" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="font-heading text-sm font-medium text-foreground">
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && <Separator />}
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button className="w-full">Explore plans</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
