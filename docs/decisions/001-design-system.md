# 001 — Design System Foundation

**Status:** Accepted
**Date:** 2026-07-05
**Branch:** `feature/design-system`

## Context

Phase 1 planning ([docs/planning](../planning/)) approved a subscription-first
MVP and a Phase 2 implementation order starting with a design system and a
homepage foundation, before any authentication, data, payment, or scheduling
logic is introduced. This decision record covers the first step: the visual
foundation (color tokens, typography, and a small set of reusable
components) that every later Phase 2 step will build on.

This work builds on top of an existing shadcn/ui setup (`base-nova` style,
Base UI primitives, Tailwind CSS v4) already installed on this branch, with
`badge`, `button`, `card`, `input`, `label`, `separator`, and `sheet`
components present in `components/ui/`.

## Decision

### Color tokens

`app/globals.css` defines semantic light/dark CSS variables (OKLCH) mapped to
the approved visual direction:

| Token | Role | Light | Dark |
| --- | --- | --- | --- |
| `--background` / `--foreground` | Warm cream page background, deep espresso text | cream | espresso |
| `--primary` | Roasted coffee-brown | dark roast brown | lightened for contrast on dark background |
| `--secondary` | Oat-colored surfaces | light oat | deeper oat-brown |
| `--accent` | Caramel | vivid caramel | vivid caramel |
| `--success` (new token) | Muted sage for positive states | sage | deeper sage |
| `--border` / `--input` | Soft borders | low-contrast warm greige | low-opacity white |
| `--ring` | Focus ring | caramel-based, high visibility against cream | caramel-based |

`--success` did not exist in the base shadcn theme and was added following
the documented customization pattern (define the variable, register it in
`@theme inline`, add matching component variants) rather than repurposing an
existing token — no other token maps to "positive/active" semantics.

Two badge variants (`success`, `accent`) were added to
`components/ui/badge.tsx` for the same reason: the base component only
shipped `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`,
none of which map to "active/positive" or "in progress" states needed for
subscription status badges.

Button, card, input, label, and separator components required no changes —
they already consume the semantic tokens, so restyling the palette restyled
every component automatically.

`--radius` was increased slightly (0.625rem → 0.75rem) for a softer, more
premium corner treatment, consistent with the "soft borders, restrained
shadows" direction. No box-shadow utilities were added to component
internals; elevation stays minimal (a 10%-opacity ring on cards, no drop
shadows) per "restrained shadows."

### Typography

Geist (sans) continues to carry interface text — body copy, labels, buttons
— unchanged. **Fraunces**, a variable serif optimized for display sizes, was
added via `next/font/google` with the `opsz` (optical size) axis enabled, and
wired to the existing `--font-heading` token (previously aliased to
`--font-sans`, i.e. no distinct heading face was in use). Because
`CardTitle` and `SheetTitle` already reference `font-heading`, this one
token change gave every existing and future component a serif heading for
free, with no per-component edits.

Fraunces was chosen over more novelty-leaning serif display faces because it
reads as premium and editorial rather than rustic or hand-lettered, matching
the "premium and modern, not overly rustic" direction while still pairing
comfortably with Geist.

A latent bug was also fixed while wiring this up: `--font-sans` in
`app/globals.css` was self-referential (`--font-sans: var(--font-sans)`)
instead of pointing at the `--font-geist-sans` variable Geist actually
exports, which meant the Geist font was not reliably applied to body text.
It now points at `--font-geist-sans` directly.

### Components

- `components/brand/brand-mark.tsx` — the BrewMind lockup (icon chip +
  wordmark), with `sm`/`default`/`lg` sizes, used in the homepage header,
  footer, and the design-system reference page.
- `components/brewmind/status-badge.tsx` — maps a subscription status
  (`active`, `paused`, `processing`, `past_due`) to the right badge variant,
  icon, and label in one place, so status color meaning stays consistent
  everywhere it's used later (customer dashboard, staff queue).
- `components/brewmind/plan-card.tsx` and `saved-drink-card.tsx` — reusable
  compositions of `Card`, `Badge`, `Button`, and `Separator` for the two
  domain objects the wireframe defines (a subscription plan, a saved drink).
  No pricing, plan, or drink data is wired to anything real yet — the props
  are presentational only.
- `components/brewmind/how-it-works-sheet.tsx` — the `Sheet` component wired
  to a "See how it works" trigger, reused on the homepage and referenced on
  the design-system page.
- `components/brewmind/saved-drink-form.tsx` — a static demonstration of
  labeled inputs in default, disabled, and invalid states. It does not
  submit anywhere.

### Pages

- `app/design-system/page.tsx` — an internal reference page: color tokens,
  typography scale, button variants, the four status badges, the plan card,
  the saved drink card, form controls, a spacing-scale reference, and a
  focus-state callout.
- `app/page.tsx` — replaces the default Next.js starter homepage with the
  BrewMind hero (header, tagline, supporting copy, "Explore plans" and "See
  how it works" CTAs) and the three-step value section (Choose your plan /
  Save your drink / Pick up on schedule) from the approved wireframe. It
  intentionally does not include real plan pricing cards or a real sign-in
  flow — those are later Phase 2 steps ("Subscription plans," "Clerk
  authentication").

### Package name

`package.json` was already named `brewmind-coffee` on this branch; no rename
was needed.

## Why Motion is postponed

Motion (the animation library listed in the project's planned technology
stack) is intentionally **not** added in this pass. Reasoning:

1. **Structure isn't settled yet.** This is the first design-system pass;
   the component set, layout patterns, and page structure are still likely
   to shift as Phase 2 steps 2–12 land. Animating a layout that's still
   moving means re-doing the animation work later, or animating an interim
   shape that never ships.
2. **Accessibility hasn't been reviewed yet.** Motion easily introduces
   layout shift, motion-sickness triggers, and focus-order surprises if
   applied before `prefers-reduced-motion` handling, focus management, and
   keyboard navigation are deliberately reviewed across the real component
   set. Static, keyboard-accessible components are the correct baseline to
   review first.
3. **shadcn/ui's own motion utilities (`shimmer`, `scroll-fade`) already
   cover the two animated states currently anticipated** (loading text,
   scrollable edges) without a new dependency, so there is no near-term gap
   Motion is needed to fill.

Motion should be introduced only after the structure above is reviewed and
approved, scoped to specific, deliberate interactions (e.g. pickup-window
selection feedback, order-status transitions) rather than applied broadly.

## Consequences

- Every component that reads `bg-primary`, `bg-secondary`, `bg-accent`,
  `bg-success`, `text-muted-foreground`, etc. now renders in the BrewMind
  palette automatically, in both light and dark mode, with no per-component
  color code.
- Two new semantic tokens (`--success` and the `accent`/`success` badge
  variants) are now part of the design system's public vocabulary and
  should be reused rather than re-invented in later Phase 2 steps.
- No Clerk, Stripe, Prisma, database, Azure, Terraform, AI, background job,
  or production business logic was introduced — every component and page in
  this pass is presentational.
