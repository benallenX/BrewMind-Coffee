# 02 — System Assumptions

These are **design assumptions**, not measured production traffic. BrewMind
has not launched; there is no analytics history to draw from. They exist to
give early architecture and capacity decisions a concrete target, and should
be replaced with measured data as soon as it exists.

## Capacity assumptions

| Assumption | Value |
| --- | --- |
| Registered test users | 100–500 |
| Daily active users | 25–100 |
| Peak concurrent users | 10–25 |
| Orders during a busy pickup hour | 25–75 |
| Store locations | 1 |
| Azure regions | 1 (initial deployment) |

## Performance objectives (initial)

- Normal API request p95 below 2 seconds.
- Main customer pages usable within 3 seconds on a typical mobile connection.
- Staff queue reflects new scheduled orders within 15 seconds.
- No duplicate recurring orders.
- No oversold pickup windows.

## Reliability objectives

- Initial availability objective: 99.5% during operating hours.
- Initial recovery-point objective (RPO): no more than 24 hours of data loss.
- Initial recovery-time objective (RTO): restore service within 4 hours.
- Automated database backups.
- A documented and tested database restore procedure.
- Idempotent recurring-order generation.
- Safe retries for webhooks and background jobs.

## Security objectives

- HTTPS in deployed environments.
- No raw payment-card data stored by BrewMind (Stripe holds card data).
- Server-side authentication and authorization on every mutating request.
- Ownership checks for customer records (a customer can only read/modify
  their own subscription, schedule, and orders).
- Role checks for staff and administrator actions.
- Stripe webhook signature verification on every incoming webhook.
- Input validation on all API boundaries.
- Secrets excluded from Git.
- Azure Key Vault for secret storage during cloud deployment.
- Rate limiting on sensitive endpoints (auth, checkout, webhooks).
- Audit logging for important staff and administrator actions.
- Never log tokens, passwords, card information, or secrets.

## Data principles

- Collect only data necessary to operate the service.
- Store customer timezone for scheduling.
- Store recurring schedules in a timezone-safe form (see the timezone risk in
  [04-risk-register.md](04-risk-register.md)).
- Use unique constraints and idempotency keys to prevent duplicate records
  (particularly recurring orders and webhook-driven writes).
- Separate Stripe identifiers (customer, subscription, invoice IDs) from
  internal database primary keys — store Stripe IDs as indexed foreign
  reference columns, never as the primary key.
- Define retention and deletion behavior before production use (deferred to
  Phase 2 polish; tracked as an open item in
  [05-phase-1-exit-checklist.md](05-phase-1-exit-checklist.md)).

## Payment and credit consistency

Payment and credit operations require strong consistency: a subscription
credit must be deducted exactly once per generated order, and a webhook that
is delivered more than once (Stripe's at-least-once delivery guarantee) must
not create duplicate orders or double-deduct credits. This is the primary
reason PostgreSQL was chosen over a non-relational store — see
[03-architecture-overview.md](03-architecture-overview.md) for the full
database decision.
