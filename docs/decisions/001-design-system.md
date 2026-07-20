# 001 — Design System

## Status

This document did not exist before this pass — there was no prior
`docs/decisions/001-design-system.md` or `app/design-system/page.tsx` in the
repository. Per
[docs/planning/05-phase-1-exit-checklist.md](../planning/05-phase-1-exit-checklist.md),
"Design system" is Phase 2, Step 1, ahead of "Clerk authentication" (Step 3).
That order was not followed — authentication landed first
([002-authentication.md](002-authentication.md)) with only ad hoc styling.
This document and `app/design-system/page.tsx` retroactively fill in Step 1
so the two steps are reconciled before database work begins.

## Reference direction

An external visual reference was described (not committed to this repo) with
this direction: a high-contrast black/white foundation, translucent white
glass panels, soft rounded cards, minimal section gaps, bold tight
typography, a premium editorial landing-page feel, mobile-first layout, and
hover-scale interaction on primary CTAs. The reference itself was for an
unrelated (dental) product; only the visual system — not its content,
copy, or imagery — is adapted here.

## BrewMind's adaptation

The reference's pure black/white pairing is translated into a warmer,
coffee-appropriate palette rather than copied literally:

| Reference concept | BrewMind token | Value |
| --- | --- | --- |
| Black/white foundation | `background` (cream) / `foreground` (espresso) | `#faf3e8` / `#1b1310` |
| Black primary | `primary` / `primary-foreground` | `#1b1310` / `#faf3e8` |
| Accent (used sparingly) | `brand` / `brand-foreground` (caramel) | `#b5772e` / `#fffaf3` |
| Neutral surface | `muted` / `muted-foreground` (stone/oat) | `#efe9e1` / `#6b5d4f` |
| Structure | `border` | `rgba(27,19,16,0.12)` (light) / `rgba(250,243,232,0.14)` (dark) |

Dark mode inverts the same two anchor colors rather than falling back to a
generic near-black: the dark-mode `background` is the same espresso
(`#1b1310`) used as the light-mode `foreground`/`primary`, and the dark-mode
`foreground`/`primary` is the same cream (`#faf3e8`) used as the light-mode
`background`.

Caramel (`brand`) is intentionally used only as a small warmth accent (a dot
indicator, a highlight) rather than as a primary action color — primary
actions use the espresso/cream pairing so the black/white contrast from the
reference stays legible in the BrewMind palette.

Glass panels use `bg-white/70` (light) / `bg-white/5` (dark) with
`backdrop-blur-md` and a `border-border` hairline, on `rounded-2xl` (cards)
or `rounded-xl` (smaller controls). Headings are bold and tight
(`font-bold tracking-tight leading-[1.05]` on the hero). Primary CTAs use
`transition-transform hover:scale-105` rather than a color-only hover, per
the reference's hover-scale interaction pattern.

## Where this shows up

- `app/globals.css` — token definitions (`background`, `foreground`,
  `primary`, `brand`, `muted`, `border`) and a global `:focus-visible` style.
- `app/layout.tsx` — header wordmark and CTA styling.
- `app/page.tsx` — hero and three-step glass card section.
- `app/sign-in/[[...sign-in]]/page.tsx`, `app/sign-up/[[...sign-up]]/page.tsx`
  — glass auth card wrapper around Clerk's own `<SignIn />`/`<SignUp />`,
  styled only via the safe `appearance.variables` prop (no DOM/CSS overrides
  that fight Clerk's own markup).
- `app/dashboard/page.tsx`, `app/staff/page.tsx`, `app/admin/page.tsx` — same
  card language, spacing, and typography.
- `app/design-system/page.tsx` — living reference: color swatches, glass
  card example, CTA hover-scale example, status badges, and a static (non-
  functional) auth-card treatment preview.

## Explicitly deferred

- No splash screen.
- No layered/masked card background effects.
- No database, Prisma, Stripe, Azure, Terraform, AI, or business logic —
  this pass is visual only.
