<<<<<<< HEAD
import Link from "next/link";
import { Show } from "@clerk/nextjs";

const steps = [
  {
    title: "Choose plan",
    description: "Pick one of three monthly subscription plans.",
  },
  {
    title: "Save drink",
    description: "Set the one drink we'll prepare for you each pickup.",
  },
  {
    title: "Set pickup schedule",
    description: "Choose a recurring weekly pickup day and time.",
=======
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
>>>>>>> dev
  },
];

export default function Home() {
  return (
<<<<<<< HEAD
    <div className="flex flex-1 flex-col items-center bg-background">
      <section className="flex w-full max-w-2xl flex-col items-center gap-6 px-6 pt-16 pb-12 text-center sm:pt-24">
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Subscription coffee
        </span>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          Your coffee, already in motion.
        </h1>
        <p className="max-w-md text-lg leading-7 text-foreground/70">
          Choose a monthly plan, save your favorite drink, and pick a weekly
          pickup window. BrewMind takes it from there.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Show when="signed-out">
            <Link
              href="/sign-up"
              className="flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Get started
            </Link>
            <Link
              href="/sign-in"
              className="flex h-12 items-center justify-center rounded-full border border-border px-6 text-base font-medium text-foreground transition-transform hover:scale-105"
            >
              Sign in
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Go to dashboard
            </Link>
          </Show>
        </div>
      </section>

      <section className="w-full max-w-4xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-white/70 p-6 backdrop-blur-md dark:bg-white/5"
            >
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-brand"
              />
              <h2 className="mt-3 font-semibold tracking-tight text-foreground">
                {step.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-foreground/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
=======
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
>>>>>>> dev
    </div>
  );
}
