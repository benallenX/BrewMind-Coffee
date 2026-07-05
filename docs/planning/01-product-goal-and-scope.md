# 01 — Product Goal and Scope

## Product goal

BrewMind Coffee is a subscription-first coffee ordering platform. Customers
commit to a monthly plan, save one preferred drink, and pick a recurring
weekly pickup window. The system automatically generates orders against the
customer's subscription credits, so the customer does not have to re-order
each week. Staff work from a single preparation queue that tells them what to
make, for whom, and when to have it ready.

> **Note on prior project framing:** the existing [README.md](../../README.md)
> describes a broader menu-and-cart storefront with AI-powered drink
> recommendations. That framing predates this planning pass. This document
> and the approved decisions below define the subscription-first MVP; the
> README's marketplace/AI-recommendation framing is not in scope for MVP and
> should be reconciled in Phase 2 (see [05-phase-1-exit-checklist.md](05-phase-1-exit-checklist.md)
> for the open item).

## Problem

Independent coffee shops often lose repeat customers to friction: customers
re-enter the same order every visit, staff have no advance notice of what is
coming, and there is no reliable way to turn a regular customer into a
predictable, prepaid relationship. BrewMind addresses this by making the
subscription — not the one-off order — the core unit of the product.

## Users and journeys

### Customers

- Create an account.
- Choose one of three monthly coffee plans.
- Save one preferred drink.
- Choose a recurring pickup day and time (weekly, fifteen-minute window).
- Have orders generated automatically against subscription credits.
- Pause, skip, resume, or cancel their schedule.
- View upcoming and previous orders.

### Staff

- View upcoming preparation orders.
- Update preparation status.
- See pickup time, customer, drink, and customization details for each order.

### Administrators

- Manage products, plans, availability, locations, and staff access.

## MVP scope

- One coffee-shop location.
- Pickup only (no delivery).
- Three monthly subscription plans.
- One saved recurring drink per customer.
- Weekly recurring schedules.
- Fifteen-minute pickup windows.
- Stripe test-mode subscriptions.
- Clerk authentication.
- Customer dashboard.
- Staff preparation queue.
- Basic email notifications.
- Mobile-first interface.

## Out of scope for MVP

- Delivery.
- Multiple locations.
- Family accounts.
- Loyalty points.
- Marketplace sellers.
- Multi-region infrastructure.
- Microservices.
- GraphQL.
- Redis.
- Kafka.
- Advanced inventory forecasting.
- Production payment processing (Stripe remains in test mode for MVP).

## Success criteria

The MVP is successful when a test customer can, end to end:

1. Create an account.
2. Select a subscription plan.
3. Complete Stripe test checkout.
4. Save a drink.
5. Choose a pickup schedule.
6. Receive one automatically generated order.
7. Have one credit deducted exactly once.
8. View the order in the customer dashboard.
9. Have staff see and update it in the preparation queue.
10. Pause, skip, or resume the recurring schedule.

Each criterion is a pass/fail behavioral test against a running system, not a
subjective judgment — this makes the list directly usable as an end-to-end
test plan in Phase 2.
