import Link from "next/link";
import { Show } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-8 px-6 py-24 text-center">
        <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
          Your coffee order, on a schedule.
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Choose a monthly plan, save your favorite drink, and pick a weekly
          pickup window. BrewMind takes it from there.
        </p>
        <Show when="signed-out">
          <Link
            href="/sign-up"
            className="flex h-12 items-center justify-center rounded-full bg-brand px-6 text-base font-medium text-brand-foreground transition-colors hover:opacity-90"
          >
            Get started
          </Link>
        </Show>
        <Show when="signed-in">
          <Link
            href="/dashboard"
            className="flex h-12 items-center justify-center rounded-full bg-brand px-6 text-base font-medium text-brand-foreground transition-colors hover:opacity-90"
          >
            Go to dashboard
          </Link>
        </Show>
      </main>
    </div>
  );
}
