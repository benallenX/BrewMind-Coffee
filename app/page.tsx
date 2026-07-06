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
  },
];

export default function Home() {
  return (
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
              className="flex h-12 items-center justify-center rounded-full border border-border px-6 text-base font-medium text-foreground"
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
    </div>
  );
}
