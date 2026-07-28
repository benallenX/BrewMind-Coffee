# 003 — User Profile Sync and Authorization

## Status

Accepted. Implements the role and active-state gap identified in
[002-authentication.md](002-authentication.md) ("What role authorization
will be added later"), now that PostgreSQL and the `UserProfile` model
exist.

## Clerk owns identity and sessions; PostgreSQL owns roles and active status

Clerk remains solely responsible for credentials, sessions, and account
recovery — nothing here changes that. What this decision adds is the link
between a Clerk identity and BrewMind's own application state: `UserRole`
and active/inactive standing live only in the `UserProfile` table in
PostgreSQL. Clerk public/private metadata is never read as a role source,
and Clerk organizations are not used — BrewMind's roles are a flat,
single-tenant concept (`CUSTOMER`, `STAFF`, `ADMIN`), not an org membership
model.

## Hybrid synchronization: webhooks plus a first-request fallback

Two mechanisms keep `UserProfile` rows in sync with Clerk, for different
reasons:

- **Webhooks** (`app/api/webhooks/clerk/route.ts`) handle the normal
  lifecycle — they fire on every create/update/delete regardless of whether
  the affected user is actively browsing BrewMind at that moment.
- **`ensureUserProfile()`** (`lib/auth/user-profile.ts`) is a server-side
  fallback that creates a missing profile during the first authenticated
  request. Webhooks are asynchronous and eventually consistent — Svix
  delivery is fast but not instant, and can fail and retry. A user who signs
  up and immediately hits `/dashboard` should not see a broken page while
  waiting for a webhook that may not have arrived yet.

Neither path trusts the client: `ensureUserProfile()` reads the Clerk user ID
from the server-side session (`auth()`), never from a request body or query
parameter, and always creates new profiles as `CUSTOMER`.

## Supported webhook events

`user.created`, `user.updated`, `user.deleted`. All other event types are
acknowledged with `200` and cause no database write — BrewMind doesn't yet
have a use for session, organization, or billing events, and silently
succeeding avoids Svix retry storms for events that will never be handled.

## Primary-email normalization

Clerk users can have multiple email addresses; `email_addresses[0]` is not
guaranteed to be the primary one. `lib/auth/clerk-user-data.ts` selects the
primary address by matching the user's `primary_email_address_id` (webhook
payloads) or `primaryEmailAddressId` (canonical Backend User object, from
`clerkClient().users.getUser()`) against the `id` of each entry in the
corresponding email list. Missing values normalize to `null`, not an empty
string, so a missing name or email is distinguishable from one that was
explicitly cleared.

## Soft deactivation, not deletion

`user.deleted` sets `isActive = false` and never removes the row. BrewMind
keeps historical association with anything the user did (once orders and
subscriptions exist) without needing to reconstruct identity from Clerk
after the fact, and reversing a Clerk deletion (or an accidental one) can
simply flip `isActive` back rather than losing data. Sync operations are
idempotent `upsert`s whose `update` clause never includes `role` or
`isActive`, so a duplicate or delayed `user.created`/`user.updated` event
can never resurrect a deactivated account.

## Access matrix

| Database role | `/dashboard` | `/staff` | `/admin` |
|---|---:|---:|---:|
| `CUSTOMER` | Allow | Redirect to `/dashboard` | Redirect to `/dashboard` |
| `STAFF` | Allow | Allow | Redirect to `/dashboard` |
| `ADMIN` | Allow | Allow | Allow |
| Inactive profile | Deny | Deny | Deny |

Browser navigation redirects inactive users to `/`. Mutating API routes and
server actions must fail closed with `401` (unauthenticated) or `403`
(authenticated but unauthorized/inactive) instead of redirecting.

## Server-side authorization, enforced at route boundaries

`lib/auth/authorization.ts` centralizes the checks (`requireUserProfile`,
`requireActiveUser`, `requireStaff`, `requireAdmin`) as one shared module
usable from pages, layouts, server actions, and API routes. Each helper
throws a typed error (`UnauthenticatedError`, `InactiveUserError`,
`InsufficientRoleError`) rather than redirecting or building a response
itself — the caller decides how to fail: `app/dashboard/layout.tsx`,
`app/staff/layout.tsx`, and `app/admin/layout.tsx` catch these and
`redirect()`, since that's the correct behavior for a page boundary. A
future mutating API route or server action would catch the same errors and
return `401`/`403` instead. This keeps one set of rules instead of
duplicating role logic per surface, and keeps every check server-side —
nothing here relies on hidden UI or a role value read from the browser.

## Manual first-admin bootstrap

No public role-management endpoint or UI exists yet. The first administrator
is promoted by hand, directly in PostgreSQL, using a controlled tool such as
Prisma Studio (`npm run db:studio`): locate the `UserProfile` row for the
intended admin's account after they've signed in at least once (so the row
exists), and set `role` to `ADMIN`. Do this only for a trusted operator's own
account, and only outside of source control — no real email address or user
ID belongs in this document or in the codebase.

## Why no webhook audit table exists yet

An event-log table (recording every webhook received, for replay/debugging)
is a reasonable future addition, but this phase doesn't need it: the sync
operations are already idempotent, so replaying or duplicating an event is
harmless without one, and Clerk's own dashboard already supports replaying
failed webhooks. Adding an audit table now would be schema surface with no
current consumer.

## Why Prisma stays out of `proxy.ts`

`proxy.ts` continues to do exactly one job — session-based route protection
via `clerkMiddleware`/`auth.protect()` — and nothing else. Querying
PostgreSQL from middleware would mean every matched request pays a database
round trip before Next.js even resolves a route, and middleware has a
narrower, more constrained runtime than a Server Component or Route Handler.
Role and active-state checks belong at the layout/route level, where
`ensureUserProfile()` and the `require*` helpers already run with full
access to Prisma.
