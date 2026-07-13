<<<<<<< HEAD
import { BrewMindLogo } from "@/components/brewmind-logo";

const swatches = [
  { name: "Background / cream", className: "bg-background", value: "#faf3e8" },
  { name: "Foreground / espresso", className: "bg-foreground", value: "#1b1310" },
  { name: "Primary", className: "bg-primary", value: "#1b1310" },
  { name: "Brand / caramel", className: "bg-brand", value: "#b5772e" },
  { name: "Muted / oat", className: "bg-muted", value: "#efe9e1" },
];

const badges = [
  { label: "Active", className: "bg-brand/15 text-brand" },
  { label: "Pending", className: "border border-border text-foreground" },
  { label: "Paused", className: "bg-muted text-muted-foreground" },
];

export default function DesignSystemPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-16">
      <div className="flex w-full max-w-4xl flex-col gap-16">
        <header className="flex flex-col gap-2">
          <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Internal reference
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            BrewMind design system
          </h1>
          <p className="max-w-2xl text-foreground/70">
            Espresso black and cream/white foundation, translucent glass
            panels, soft rounded cards, and bold, tight editorial typography.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Logo
          </h2>
          <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-white/70 p-6 backdrop-blur-md dark:bg-white/5">
            <BrewMindLogo />
            <BrewMindLogo wordmarkClassName="text-2xl" />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Color direction
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {swatches.map((swatch) => (
              <div key={swatch.name} className="flex flex-col gap-2">
                <div
                  className={`h-16 rounded-2xl border border-border ${swatch.className}`}
                />
                <div className="text-sm font-medium text-foreground">
                  {swatch.name}
                </div>
                <div className="text-xs text-foreground/60">{swatch.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Glass cards
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {["Choose plan", "Save drink", "Set pickup schedule"].map(
              (title) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-white/70 p-6 backdrop-blur-md dark:bg-white/5"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-brand"
                  />
                  <h3 className="mt-3 font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-foreground/70">
                    Translucent panel over the cream background, rounded-2xl,
                    subtle border and blur.
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            CTA hover scale
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="h-12 cursor-pointer rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Primary action
            </button>
            <button
              type="button"
              className="h-12 cursor-pointer rounded-full border border-border px-6 text-base font-medium text-foreground transition-transform hover:scale-105"
            >
              Secondary action
            </button>
          </div>
          <p className="text-sm text-foreground/60">
            Important CTAs scale slightly on hover (transform, not color) to
            stay confident without feeling noisy.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Status badges
          </h2>
          <div className="flex flex-wrap gap-3">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badge.className}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Auth card treatment
          </h2>
          <p className="text-sm text-foreground/60">
            Static preview only — the real sign-in/sign-up pages render
            Clerk&apos;s own components inside this same glass wrapper.
          </p>
          <div className="w-full max-w-sm rounded-2xl border border-border bg-white/70 p-6 backdrop-blur-md dark:bg-white/5">
            <div className="flex justify-center">
              <BrewMindLogo />
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <div className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground/60">
                Email address
              </div>
              <div className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">
                Continue
              </div>
            </div>
          </div>
        </section>
      </div>
=======
import type { Metadata } from "next";

import { BrandMark } from "@/components/brand/brand-mark";
import { HowItWorksSheet } from "@/components/brewmind/how-it-works-sheet";
import { PlanCard } from "@/components/brewmind/plan-card";
import { SavedDrinkCard } from "@/components/brewmind/saved-drink-card";
import { SavedDrinkForm } from "@/components/brewmind/saved-drink-form";
import { StatusBadge, type SubscriptionStatus } from "@/components/brewmind/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Design system — BrewMind Coffee",
};

const colorTokens: { name: string; variable: string; className: string }[] = [
  { name: "Background", variable: "--background", className: "bg-background text-foreground border" },
  { name: "Foreground", variable: "--foreground", className: "bg-foreground text-background" },
  { name: "Primary", variable: "--primary", className: "bg-primary text-primary-foreground" },
  { name: "Secondary", variable: "--secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "Accent (caramel)", variable: "--accent", className: "bg-accent text-accent-foreground" },
  { name: "Success (sage)", variable: "--success", className: "bg-success text-success-foreground" },
  { name: "Muted", variable: "--muted", className: "bg-muted text-muted-foreground" },
  { name: "Destructive", variable: "--destructive", className: "bg-destructive/10 text-destructive border" },
  { name: "Card", variable: "--card", className: "bg-card text-card-foreground border" },
  { name: "Border", variable: "--border", className: "bg-transparent text-foreground border-2" },
];

const buttonVariants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;

const statusExamples: SubscriptionStatus[] = ["active", "paused", "processing", "past_due"];

const spacingScale = [
  { step: 1, gap: "gap-1" },
  { step: 2, gap: "gap-2" },
  { step: 3, gap: "gap-3" },
  { step: 4, gap: "gap-4" },
  { step: 6, gap: "gap-6" },
  { step: 8, gap: "gap-8" },
  { step: 12, gap: "gap-12" },
] as const;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-medium text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-12 sm:px-8">
      <header className="flex flex-col gap-4">
        <BrandMark size="lg" />
        <p className="max-w-xl text-muted-foreground">
          Internal reference for the BrewMind design system: color tokens, typography,
          and the reusable components that make up the customer and staff experience.
        </p>
      </header>

      <Section
        title="Color tokens"
        description="Warm cream and espresso anchor the palette, with roasted coffee-brown as primary, oat as secondary surfaces, caramel as accent, and muted sage reserved for positive states."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {colorTokens.map((token) => (
            <div key={token.variable} className="flex flex-col gap-1.5">
              <div className={`flex h-16 items-end rounded-lg p-2 ${token.className}`}>
                <span className="text-xs font-medium">Aa</span>
              </div>
              <p className="text-xs font-medium text-foreground">{token.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{token.variable}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Typography"
        description="Geist carries interface text; a serif display face (Fraunces) is reserved for major headings."
      >
        <div className="flex flex-col gap-3">
          <p className="font-heading text-4xl font-medium text-foreground">
            Your coffee, already in motion.
          </p>
          <p className="font-heading text-2xl font-medium text-foreground">
            Choose your plan
          </p>
          <p className="font-heading text-lg font-medium text-foreground">
            Saved drink details
          </p>
          <Separator />
          <p className="text-base text-foreground">
            Body copy uses Geist for clarity at small sizes across the customer dashboard
            and staff preparation queue.
          </p>
          <p className="text-sm text-muted-foreground">
            Muted text is used for secondary detail, such as timestamps and helper copy.
          </p>
        </div>
      </Section>

      <Section title="Buttons" description="Built-in variants, no custom color overrides.">
        <div className="flex flex-wrap items-center gap-3">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant[0].toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </Section>

      <Section
        title="Subscription status badges"
        description="Active uses muted sage, Paused uses the oat secondary tone, Processing uses caramel, and Past Due uses the destructive token."
      >
        <div className="flex flex-wrap gap-3">
          {statusExamples.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
      </Section>

      <Section title="Subscription plan card">
        <div className="flex flex-wrap gap-6">
          <PlanCard
            name="Regular"
            price="$34"
            credits="20 drink credits per month"
            features={["Customize & save 2 drinks", "Scheduled pickup", "Pause or skip anytime", "Member pricing"]}
            highlighted
          />
        </div>
      </Section>

      <Section title="Saved drink card">
        <div className="flex flex-wrap gap-6">
          <SavedDrinkCard
            name="Latte"
            details={["Medium (12 oz)", "Oat milk", "50% sweetness", "Extra shot"]}
          />
        </div>
      </Section>

      <Section
        title="Form controls"
        description="Labeled inputs, disabled state, and an invalid state with a clear error message."
      >
        <SavedDrinkForm />
      </Section>

      <Section
        title="Spacing scale"
        description="Layout spacing uses Tailwind's gap-* scale rather than space-x-*/space-y-*."
      >
        <div className="flex flex-col gap-3">
          {spacingScale.map(({ step, gap }) => (
            <div key={step} className="flex items-center gap-4">
              <span className="w-14 font-mono text-xs text-muted-foreground">
                gap-{step}
              </span>
              <div className={`flex ${gap}`}>
                <span className="size-3 rounded-sm bg-primary" />
                <span className="size-3 rounded-sm bg-primary" />
                <span className="size-3 rounded-sm bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Focus states"
        description="Every interactive element shows a visible caramel-toned focus ring on keyboard navigation. Tab through the controls below to preview it."
      >
        <div className="flex flex-wrap items-end gap-4">
          <Button variant="outline">Focusable button</Button>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="focus-demo-input">Focusable input</Label>
            <Input id="focus-demo-input" placeholder="Tab into me" className="w-48" />
          </div>
          <HowItWorksSheet />
        </div>
      </Section>
>>>>>>> dev
    </div>
  );
}
