# 002 — Authentication

## Why Clerk is used for identity

BrewMind uses Clerk for authentication rather than a hand-rolled
username/password system. Clerk owns credentials, sessions, and account
recovery, so the Next.js application never handles raw passwords or
long-lived secrets for end users. This matches the security objectives in
[docs/planning/02-system-assumptions.md](../planning/02-system-assumptions.md)
("Server-side authentication and authorization on every mutating request")
and the architecture decision in
[docs/planning/03-architecture-overview.md](../planning/03-architecture-overview.md)
("Clerk owns identity; the Next.js app never handles raw credentials").

## Why Stripe will remain responsible for billing

Clerk is identity-only. Payment instruments, subscription billing state, and
webhook-driven payment confirmation remain entirely Stripe's responsibility,
per [docs/planning/03-architecture-overview.md](../planning/03-architecture-overview.md).
This branch does not introduce Stripe, a database, or any billing logic —
those are later steps in the approved Phase 2 order (see
[docs/planning/05-phase-1-exit-checklist.md](../planning/05-phase-1-exit-checklist.md)).
Keeping identity and billing in separate systems avoids ever storing
payment-instrument data alongside account data.

## Public routes

- `/`
- `/design-system` (not yet implemented; remains public by default since
  `proxy.ts` only protects the routes listed below)
- `/sign-in(.*)`
- `/sign-up(.*)`

## Protected routes (authentication only)

- `/dashboard(.*)`
- `/staff(.*)`
- `/admin(.*)`

Protection is enforced in `proxy.ts` via `clerkMiddleware` and
`createRouteMatcher`, using a public-first strategy: everything is public
except the three route groups above, which require a signed-in session.

## What role authorization will be added later

This branch protects `/staff` and `/admin` by **authentication only** — any
signed-in user can currently reach them. There is no role or permission
check yet, and none is faked. Role-based access (customer vs. staff vs.
admin) is deferred until PostgreSQL and the user profile model exist (Phase
2, step 4 onward in
[docs/planning/05-phase-1-exit-checklist.md](../planning/05-phase-1-exit-checklist.md)),
because roles need a durable place to live and be managed. Both the staff
and admin placeholder pages carry an explicit on-page note about this gap so
it is not silently forgotten.

## Security rules for secrets and server-side authorization

- `CLERK_SECRET_KEY` is a server-only secret. It must never be imported into
  a client component, logged, or exposed in a client bundle.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is the only Clerk variable safe to
  expose to the browser.
- Real keys live only in `.env.local` (gitignored) and the deployment
  platform's secret store; `.env.example` lists variable names with empty
  values only.
- Authentication state from `proxy.ts` is necessary but not sufficient for
  authorization: once role checks exist, every mutating request must also
  verify the caller owns the record (or holds the right role) server-side,
  never relying on client-side checks or hidden UI alone.
