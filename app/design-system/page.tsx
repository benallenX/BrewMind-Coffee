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
    </div>
  );
}
