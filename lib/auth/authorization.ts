import "server-only";

import type { UserProfile, UserRole } from "@/lib/generated/prisma/client";

import { ensureUserProfile, UnauthenticatedError } from "./user-profile";

export { UnauthenticatedError };

/** Thrown when the authenticated profile exists but is deactivated. */
export class InactiveUserError extends Error {
  constructor() {
    super("BrewMind profile is inactive.");
    this.name = "InactiveUserError";
  }
}

/** Thrown when the authenticated, active profile does not hold a required role. */
export class InsufficientRoleError extends Error {
  constructor(
    public readonly requiredRoles: readonly UserRole[],
    public readonly actualRole: UserRole,
  ) {
    super(
      `Role "${actualRole}" is not one of the required roles: ${requiredRoles.join(", ")}.`,
    );
    this.name = "InsufficientRoleError";
  }
}

const STAFF_ROLES: readonly UserRole[] = ["STAFF", "ADMIN"];
const ADMIN_ROLES: readonly UserRole[] = ["ADMIN"];

/**
 * Central server-side authorization. Every helper throws a typed error on
 * failure rather than redirecting or returning a response itself — pages
 * and layouts should catch these and `redirect()`, while API routes and
 * server actions should catch these and return `401`/`403`. This keeps one
 * set of rules shared across both kinds of callers.
 *
 * Role and active-state come only from the PostgreSQL `UserProfile` row via
 * `ensureUserProfile()` — never from the browser, and never from Clerk
 * public metadata.
 */

/** Require an authenticated Clerk session with a BrewMind profile (any state). */
export async function requireUserProfile(): Promise<UserProfile> {
  return ensureUserProfile();
}

/** Require an authenticated, active BrewMind profile. */
export async function requireActiveUser(): Promise<UserProfile> {
  const profile = await requireUserProfile();

  if (!profile.isActive) {
    throw new InactiveUserError();
  }

  return profile;
}

/** Require an active profile with the STAFF or ADMIN role. */
export async function requireStaff(): Promise<UserProfile> {
  const profile = await requireActiveUser();

  if (!STAFF_ROLES.includes(profile.role)) {
    throw new InsufficientRoleError(STAFF_ROLES, profile.role);
  }

  return profile;
}

/** Require an active profile with the ADMIN role. */
export async function requireAdmin(): Promise<UserProfile> {
  const profile = await requireActiveUser();

  if (!ADMIN_ROLES.includes(profile.role)) {
    throw new InsufficientRoleError(ADMIN_ROLES, profile.role);
  }

  return profile;
}
