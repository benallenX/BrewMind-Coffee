import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-cream px-4 py-16 text-cream-foreground">
      <div className="flex flex-col items-center gap-2 text-center">
        <Link href="/" className="text-2xl font-semibold tracking-tight text-brand">
          BrewMind
        </Link>
        <p className="max-w-sm text-sm text-cream-foreground/70">
          Create an account to choose a plan, save your drink, and set a
          weekly pickup time.
        </p>
      </div>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#6f4e37",
            colorBackground: "#fffaf3",
          },
        }}
      />
    </div>
  );
}
