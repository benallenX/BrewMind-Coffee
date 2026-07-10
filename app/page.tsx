import { Bookmark, Clock, CupSoda } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { HowItWorksSheet } from "@/components/brewmind/how-it-works-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    description: "Set your go-to order once, then skip the line every visit.",
  },
  {
    icon: Clock,
    title: "Pick up on schedule",
    description: "Choose a weekly day and a fifteen-minute pickup window.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <BrandMark />
          <Button variant="outline" size="sm">
            Sign in
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16 sm:px-8 sm:py-24">
          <h1 className="font-heading max-w-2xl text-4xl font-medium text-foreground sm:text-5xl">
            Your coffee, already in motion.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            BrewMind is a recurring coffee subscription: save one drink, pick a weekly
            pickup window, and let your credits take care of the rest. No re-ordering,
            no waiting in line.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg">Explore plans</Button>
            <HowItWorksSheet label="See how it works" variant="outline" />
          </div>
        </section>

        <Separator />

        <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  <span className="mb-2 inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <BrandMark size="sm" />
          <p className="text-sm text-muted-foreground">
            Subscription coffee prepared around your routine.
          </p>
        </div>
      </footer>
    </div>
  );
}
