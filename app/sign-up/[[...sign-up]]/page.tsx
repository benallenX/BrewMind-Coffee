import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { BrewMindLogo } from "@/components/brewmind-logo";

export default function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-background px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <Link href="/">
          <BrewMindLogo wordmarkClassName="text-2xl" />
        </Link>
        <p className="max-w-sm text-sm text-foreground/70">
          Create an account to choose a plan, save your drink, and set a
          weekly pickup time.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-white/70 p-2 backdrop-blur-md dark:bg-white/5">
        <SignUp
          appearance={{
            variables: {
              colorPrimary: "var(--primary)",
              colorBackground: "transparent",
              colorForeground: "var(--foreground)",
            },
          }}
        />
      </div>
    </div>
  );
}
