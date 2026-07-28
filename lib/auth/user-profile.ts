import "server-only";

import { auth, clerkClient } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";

import {
  normalizeBackendUser,
  normalizeWebhookUser,
  type ClerkWebhookUserPayload,
  type NormalizedClerkUser,
} from "./clerk-user-data";

/** Thrown by `ensureUserProfile()` when there is no authenticated Clerk session. */
export class UnauthenticatedError extends Error {
  constructor() {
    super("No authenticated Clerk user.");
    this.name = "UnauthenticatedError";
  }
}

/**
 * Idempotent identity upsert shared by the create and update sync paths.
 *
 * The `update` clause intentionally omits `role` and `isActive` — Prisma
 * leaves omitted fields untouched on an existing row, so this can never
 * promote a user or reactivate a deactivated account. Only the `create`
 * branch (a genuinely new row) sets `role: CUSTOMER` and `isActive: true`.
 */
async function upsertCustomerIdentity(normalized: NormalizedClerkUser) {
  return prisma.userProfile.upsert({
    where: { clerkUserId: normalized.clerkUserId },
    create: {
      clerkUserId: normalized.clerkUserId,
      email: normalized.email,
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      role: "CUSTOMER",
      isActive: true,
    },
    update: {
      email: normalized.email,
      firstName: normalized.firstName,
      lastName: normalized.lastName,
    },
  });
}

/**
 * Handle a Clerk `user.created` webhook event.
 *
 * Idempotent: a duplicate or delayed `user.created` for a user who was
 * already deactivated will not reactivate them, because `isActive` is never
 * part of the `update` clause.
 */
export async function syncCreatedClerkUser(data: ClerkWebhookUserPayload) {
  return upsertCustomerIdentity(normalizeWebhookUser(data));
}

/**
 * Handle a Clerk `user.updated` webhook event.
 *
 * Updates only identity fields (email, first name, last name). Role and
 * `isActive` are never touched. If no row exists yet — `user.updated` can
 * arrive before `user.created` — this safely creates a `CUSTOMER` profile.
 */
export async function syncUpdatedClerkUser(data: ClerkWebhookUserPayload) {
  return upsertCustomerIdentity(normalizeWebhookUser(data));
}

/**
 * Handle a Clerk `user.deleted` webhook event.
 *
 * Soft-deletes: sets `isActive = false` and never removes the row. Uses
 * `updateMany` so a missing row (or a repeated deletion event) is a safe
 * no-op rather than an error.
 */
export async function deactivateClerkUserProfile(clerkUserId: string) {
  if (!clerkUserId) return;

  await prisma.userProfile.updateMany({
    where: { clerkUserId },
    data: { isActive: false },
  });
}

/**
 * Server-only fallback: guarantee the authenticated Clerk user has a
 * `UserProfile` row, creating one on first authenticated access if the
 * webhook hasn't landed yet.
 *
 * - Throws `UnauthenticatedError` if there is no signed-in Clerk session.
 * - Returns the existing row without calling Clerk if one is already found.
 * - Otherwise fetches the canonical user from Clerk's server API, normalizes
 *   it, and upserts a `CUSTOMER` profile. The upsert's `update: {}` is a
 *   deliberate no-op: if a concurrent request (or a webhook) created the row
 *   first, this returns that row unchanged rather than overwriting it.
 */
export async function ensureUserProfile() {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated || !userId) {
    throw new UnauthenticatedError();
  }

  const existing = await prisma.userProfile.findUnique({
    where: { clerkUserId: userId },
  });

  if (existing) {
    return existing;
  }

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);
  const normalized = normalizeBackendUser(clerkUser);

  return prisma.userProfile.upsert({
    where: { clerkUserId: normalized.clerkUserId },
    create: {
      clerkUserId: normalized.clerkUserId,
      email: normalized.email,
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      role: "CUSTOMER",
      isActive: true,
    },
    update: {},
  });
}
