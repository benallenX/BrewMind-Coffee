# 05 — Phase 1 Exit Checklist

Phase 1 is planning-only: no application code, UI components, configuration,
dependencies, CI, or infrastructure changes occur in this phase. This
checklist tracks whether each required Phase 1 deliverable exists and where.

| Requirement | Status | Evidence |
| --- | --- | --- |
| Problem and users documented | Done | [01-product-goal-and-scope.md](01-product-goal-and-scope.md) — Problem, Users and journeys |
| MVP scope and non-goals documented | Done | [01-product-goal-and-scope.md](01-product-goal-and-scope.md) — MVP scope, Out of scope for MVP |
| Customer and staff journeys documented | Done | [01-product-goal-and-scope.md](01-product-goal-and-scope.md) — Users and journeys |
| Wireframe path documented | Done | [docs/wireframes/mvpwireframe.png](../wireframes/mvpwireframe.png) — six-screen MVP flow (Homepage → Subscription Plans → Saved Drink Setup → Schedule Setup → Customer Dashboard → Staff Preparation Queue), consistent with the subscription-first scope in this planning set |
| Initial architecture documented | Done | [03-architecture-overview.md](03-architecture-overview.md) — Initial system architecture, system diagram |
| Database decision documented | Done | [03-architecture-overview.md](03-architecture-overview.md) — Database decision: PostgreSQL |
| API approach documented | Done | [03-architecture-overview.md](03-architecture-overview.md) — API decision: REST-style Next.js route handlers |
| Traffic and capacity assumptions documented | Done | [02-system-assumptions.md](02-system-assumptions.md) — Capacity assumptions |
| Performance, reliability, security, and data objectives documented | Done | [02-system-assumptions.md](02-system-assumptions.md) |
| Major risks and mitigations documented | Done | [04-risk-register.md](04-risk-register.md) |
| Success criteria are measurable | Done | [01-product-goal-and-scope.md](01-product-goal-and-scope.md) — Success criteria (ten pass/fail steps) |
| Phase 2 implementation order is approved | Done | See Phase 2 order below; approved as part of this planning pass |

## Phase 2 implementation order

1. Design system
2. Homepage foundation
3. Clerk authentication
4. PostgreSQL and Prisma
5. Subscription plans
6. Stripe checkout and webhooks
7. Saved drink
8. Recurring pickup schedule
9. Recurring-order engine
10. Customer dashboard
11. Staff preparation queue
12. Notifications and operational polish

## Unresolved items (do not block Phase 1, but are open)

These are called out explicitly rather than left implicit, per the
instruction not to claim Phase 1 is complete if something is missing. None of
them are required Phase 1 exit items, but they should be resolved early in
Phase 2:

- **README framing is stale.** [README.md](../../README.md) describes a
  broader menu/cart storefront with AI-powered drink recommendations and a
  wider technology list (Motion, Microsoft Foundry, Docker, Ansible, Azure
  Container Apps/Registry, Terraform, Playwright, Codex). This planning set
  defines a narrower subscription-first MVP. The README should be updated in
  Phase 2 to avoid two conflicting product descriptions in the repository.
  This task's instructions restrict this pass to the five planning documents,
  so the README was intentionally left unmodified.
- **No `components.json`.** The task asked to read `components.json`; it does
  not exist in the repository yet (no shadcn/ui setup yet — `package.json`
  currently only has Next.js/React/Tailwind). This is expected at this stage
  and is Phase 2, Step 1 (Design system).
- **`docs/architecture.md`, `docs/deployment.md`, `docs/testing.md` are
  empty placeholder files.** They were not populated as part of this pass
  since the task scoped documentation work to `docs/planning/`. They will
  need real content once Phase 2 produces something to document.
- **Data retention and deletion policy is deferred**, per
  [02-system-assumptions.md](02-system-assumptions.md) — must be defined
  before production use, not before Phase 1 exit.
- **Full stable error-code list is deferred** to each resource's Phase 2
  implementation, per [03-architecture-overview.md](03-architecture-overview.md)
  — Phase 1 documents the approach and representative codes, not the
  exhaustive list.

None of the above block Phase 1 completion as defined by the exit checklist
above; they are listed so Phase 2 does not silently inherit stale or missing
context.
